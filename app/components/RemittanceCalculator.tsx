"use client";

import { useState, useMemo, useRef, useEffect } from "react";

const MID_RATE = 17.4;

interface Provider {
  id: string;
  name: string;
  emoji: string;
  getFixedFee: (amount: number) => number;
  getMarkupPct: (amount: number) => number;
  note: string;
}

const providers: Provider[] = [
  {
    id: "sendwave",
    name: "Sendwave",
    emoji: "⚡",
    getFixedFee: () => 0,
    getMarkupPct: () => 0.75,
    note: "Sin comisión fija, margen bajo — generalmente la opción más económica.",
  },
  {
    id: "paysend",
    name: "Paysend",
    emoji: "💳",
    getFixedFee: () => 0.99,
    getMarkupPct: () => 0.85,
    note: "Comisión fija baja con tipo de cambio competitivo.",
  },
  {
    id: "moneygram",
    name: "Moneygram",
    emoji: "🟠",
    getFixedFee: (amount) => {
      if (amount <= 200) return 3.9;
      if (amount <= 500) return 5.5;
      if (amount <= 1000) return 6.99;
      return 7.99;
    },
    getMarkupPct: () => 0.55,
    note: "Comisiones fijas más altas pero margen cambiario muy bajo. La comisión puede variar los fines de semana.",
  },
  {
    id: "western-union",
    name: "Western Union",
    emoji: "🟡",
    getFixedFee: () => 1.99,
    getMarkupPct: (amount) => (amount < 400 ? 1.85 : 1.15),
    note: "El margen cambiario mejora significativamente a partir de $400+.",
  },
  {
    id: "ria",
    name: "Ria Money Transfer",
    emoji: "🟢",
    getFixedFee: () => 1.99,
    getMarkupPct: (amount) => (amount < 600 ? 1.2 : 1.1),
    note: "El margen cambiario mejora ligeramente a partir de $600+.",
  },
  {
    id: "felix-pago",
    name: "Felix Pago",
    emoji: "🦊",
    getFixedFee: () => 2.99,
    getMarkupPct: () => 1.7,
    note: "Comisión fija más alta con margen moderado.",
  },
  {
    id: "remitly",
    name: "Remitly",
    emoji: "📲",
    getFixedFee: () => 1.99,
    getMarkupPct: (amount) => (amount < 500 ? 3.88 : 1.45),
    note: "Margen muy alto por debajo de $500. Mejora considerablemente a partir de $500+.",
  },
  {
    id: "worldremit",
    name: "WorldRemit",
    emoji: "🌍",
    getFixedFee: () => 1.99,
    getMarkupPct: () => 2.3,
    note: "Margen cambiario consistentemente alto sin importar el monto enviado.",
  },
];

function calcProvider(provider: Provider, amount: number) {
  const fixedFee = provider.getFixedFee(amount);
  const markupPct = provider.getMarkupPct(amount);
  const providerRate = MID_RATE * (1 - markupPct / 100);
  const hiddenFxCost = (markupPct / 100) * amount;
  const totalCost = fixedFee + hiddenFxCost;
  const totalPct = (totalCost / amount) * 100;
  const received = amount * providerRate;
  const idealReceived = amount * MID_RATE;
  const lostMXN = idealReceived - received;
  return {
    fixedFee,
    markupPct,
    providerRate,
    hiddenFxCost,
    totalCost,
    totalPct,
    received,
    idealReceived,
    lostMXN,
  };
}

const PRESETS = [200, 500, 1000, 2000];

function formatMXN(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatUSD(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function RemittanceCalculator() {
  const [selectedProviderId, setSelectedProviderId] = useState("sendwave");
  const [amount, setAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedProvider = providers.find((p) => p.id === selectedProviderId)!;
  const stats = useMemo(
    () => calcProvider(selectedProvider, amount),
    [selectedProvider, amount]
  );

  const ranking = useMemo(() => {
    const all = providers.map((p) => ({
      id: p.id,
      name: p.name,
      emoji: p.emoji,
      totalCost: calcProvider(p, amount).totalCost,
    }));
    all.sort((a, b) => a.totalCost - b.totalCost);
    return all;
  }, [amount]);

  const selectedRank =
    ranking.findIndex((r) => r.id === selectedProviderId) + 1;
  const cheapest = ranking[0];

  function handlePreset(val: number) {
    setAmount(val);
    setIsCustom(false);
    setCustomAmount("");
  }

  function handleCustomChange(val: string) {
    setCustomAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    }
    setIsCustom(true);
  }

  return (
    <section className="py-16 md:py-24 bg-white" id="calculadora">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2E7D32]">
            Herramienta de Transparencia
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2D3142] mt-2"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Calculadora de Costos de Remesas
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            USD → MXN · Transferencia Bancaria · Datos de Ene 2026
          </p>
        </div>

        {/* Two-column desktop / single-column mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT COLUMN — Controls & Recipient */}
          <div className="space-y-6">
            {/* Provider Selector */}
            <div className="relative" ref={dropdownRef}>
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
                Proveedor
              </label>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white border border-gray-200 text-[#2D3142] hover:border-gray-300 transition-colors shadow-sm"
              >
                <span className="text-base font-medium">
                  {selectedProvider.emoji} {selectedProvider.name}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute z-50 mt-1 w-full rounded-lg bg-white border border-gray-200 shadow-xl overflow-hidden">
                  {providers.map((p) => {
                    const pStats = calcProvider(p, amount);
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedProviderId(p.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          p.id === selectedProviderId ? "bg-gray-100" : ""
                        }`}
                      >
                        <span className="text-[#2D3142] text-sm">
                          {p.emoji} {p.name}
                        </span>
                        <span className="text-[#2E7D32] text-sm font-medium">
                          {formatMXN(pStats.received)} MXN
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Amount Selector */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
                Monto a Enviar (USD)
              </label>
              <div className="flex gap-2 mb-2">
                {PRESETS.map((val) => (
                  <button
                    key={val}
                    onClick={() => handlePreset(val)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      !isCustom && amount === val
                        ? "bg-[#2E7D32] text-white shadow-md"
                        : "bg-white border border-gray-200 text-[#2D3142] hover:border-gray-300"
                    }`}
                  >
                    ${val === 1000 ? "1,000" : val === 2000 ? "2,000" : val}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Cantidad personalizada"
                value={customAmount}
                onChange={(e) => handleCustomChange(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg bg-white text-[#2D3142] placeholder-gray-400 outline-none transition-colors ${
                  isCustom
                    ? "border-2 border-[#2E7D32]"
                    : "border border-gray-200"
                }`}
              />
            </div>

            {/* Recipient Gets — Hero Card */}
            <div className="rounded-xl border border-[#2E7D32]/20 bg-green-50 p-6 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-[#2E7D32] mb-2">
                Tu Familia Recibe
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span
                  className="text-4xl sm:text-[40px] font-bold text-[#2D3142] leading-none"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {formatMXN(stats.received)}
                </span>
                <span className="text-xl font-bold text-[#2D3142] leading-none">
                  MXN
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Sin comisiones ni markup recibirían MXN{" "}
                {formatMXN(stats.idealReceived)}
              </p>
              <p className="text-sm text-[#F57C00] font-medium mt-1">
                MXN {formatMXN(stats.lostMXN)} menos por comisiones y markup
              </p>
            </div>

            {/* Provider Note */}
            <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
              <p className="text-sm text-gray-600">
                <span className="mr-2">💡</span>
                <span className="font-medium text-[#2D3142]">
                  {selectedProvider.name}:
                </span>{" "}
                {selectedProvider.note}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN — Breakdown & Analysis */}
          <div className="space-y-6">
            {/* Cost Breakdown Card */}
            <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
              <div className="flex items-baseline justify-between mb-5">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Costo Total
                </p>
                <div className="text-right">
                  <span
                    className="text-2xl font-bold text-[#2D3142]"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    ${formatUSD(stats.totalCost)}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({stats.totalPct.toFixed(2)}%)
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Comisión Fija</span>
                  <span className="text-[#2D3142] font-medium">
                    ${formatUSD(stats.fixedFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-[#F57C00] font-medium">Costo Oculto FX</span>
                    <span className="text-gray-400 text-xs ml-1">
                      ({stats.markupPct}% markup × ${amount.toLocaleString()})
                    </span>
                  </div>
                  <span className="text-[#F57C00] font-medium">
                    ${formatUSD(stats.hiddenFxCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Markup FX</span>
                  <span className="text-[#2D3142] font-medium">
                    {stats.markupPct.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Exchange Rate Card */}
            <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 mb-1">
                    Tasa del Proveedor
                  </p>
                  <p
                    className="text-xl font-bold text-[#2D3142]"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {stats.providerRate.toFixed(4)}
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 border border-[#2E7D32]/20 p-4">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-[#2E7D32] mb-1">
                    Tasa Mid-Market
                  </p>
                  <p
                    className="text-xl font-bold text-[#2E7D32]"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {MID_RATE.toFixed(4)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                La tasa mid-market es el tipo de cambio real que ves en Google o XE. Los proveedores ganan ofreciendo una tasa peor — la diferencia es el markup oculto.
              </p>
            </div>

            {/* Ranking Card */}
            <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-4">
                ¿Cómo se compara {selectedProvider.name}?
              </p>
              <div className="flex gap-1 mb-4">
                {ranking.map((r, i) => {
                  const isSelected = r.id === selectedProviderId;
                  let color = "bg-gray-200";
                  if (isSelected) {
                    if (i === 0) color = "bg-[#2E7D32]";
                    else if (i === ranking.length - 1) color = "bg-[#D32F2F]";
                    else color = "bg-[#1565C0]";
                  }
                  return (
                    <div
                      key={r.id}
                      className={`flex-1 h-3 rounded-full ${color} transition-colors`}
                      title={`${r.emoji} ${r.name}: $${formatUSD(r.totalCost)}`}
                    />
                  );
                })}
              </div>
              <p
                className="text-[#2D3142] font-semibold"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                #{selectedRank} de 8
              </p>
              {selectedRank === 1 ? (
                <p className="text-sm text-[#2E7D32] font-medium mt-1">
                  Esta es la opción más económica para ${amount.toLocaleString()}.
                </p>
              ) : (
                <p className="text-sm text-gray-600 mt-1">
                  {cheapest.emoji} {cheapest.name} es la más económica — podrías ahorrar{" "}
                  <span className="text-[#2E7D32] font-medium">
                    $
                    {formatUSD(
                      stats.totalCost - calcProvider(
                        providers.find((p) => p.id === cheapest.id)!,
                        amount
                      ).totalCost
                    )}
                  </span>{" "}
                  cambiando de proveedor.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] text-gray-400 leading-relaxed mt-8 max-w-2xl mx-auto">
          Datos recopilados manualmente de sitios web y apps de proveedores. Las tasas y comisiones son estimaciones y pueden variar según la hora, método de pago y velocidad de entrega. Siempre verifica en el sitio del proveedor antes de enviar.
        </p>
      </div>
    </section>
  );
}
