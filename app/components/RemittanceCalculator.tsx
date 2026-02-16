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
    note: "No fixed fee, low markup — often the cheapest option.",
  },
  {
    id: "paysend",
    name: "Paysend",
    emoji: "💳",
    getFixedFee: () => 0.99,
    getMarkupPct: () => 0.85,
    note: "Low fixed fee with competitive exchange rate.",
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
    note: "Higher fixed fees but very low FX markup. Fixed fee may vary on weekends.",
  },
  {
    id: "western-union",
    name: "Western Union",
    emoji: "🟡",
    getFixedFee: () => 1.99,
    getMarkupPct: (amount) => (amount < 400 ? 1.85 : 1.15),
    note: "FX spread improves significantly at $400+.",
  },
  {
    id: "ria",
    name: "Ria Money Transfer",
    emoji: "🟢",
    getFixedFee: () => 1.99,
    getMarkupPct: (amount) => (amount < 600 ? 1.2 : 1.1),
    note: "FX spread improves slightly at $600+.",
  },
  {
    id: "felix-pago",
    name: "Felix Pago",
    emoji: "🦊",
    getFixedFee: () => 2.99,
    getMarkupPct: () => 1.7,
    note: "Higher fixed fee with moderate markup.",
  },
  {
    id: "remitly",
    name: "Remitly",
    emoji: "📲",
    getFixedFee: () => 1.99,
    getMarkupPct: (amount) => (amount < 500 ? 3.88 : 1.45),
    note: "⚠️ Very high markup under $500. Improves considerably at $500+.",
  },
  {
    id: "worldremit",
    name: "WorldRemit",
    emoji: "🌍",
    getFixedFee: () => 1.99,
    getMarkupPct: () => 2.3,
    note: "Consistently high FX markup regardless of amount sent.",
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
    <section className="w-full py-16 px-4 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      <div className="mx-auto max-w-[480px]">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Transparency Tool
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">
            Remittance Cost Calculator
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            USD → MXN · Bank Transfer · Data from Jan 2026
          </p>
        </div>

        {/* Provider Selector */}
        <div className="mb-6 relative" ref={dropdownRef}>
          <label className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">
            Provider
          </label>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-white hover:border-white/20 transition-colors"
          >
            <span className="text-base">
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
            <div className="absolute z-50 mt-1 w-full rounded-lg bg-[#1a2236] border border-white/10 shadow-xl overflow-hidden">
              {providers.map((p) => {
                const pStats = calcProvider(p, amount);
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProviderId(p.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/[0.06] transition-colors ${
                      p.id === selectedProviderId ? "bg-white/[0.08]" : ""
                    }`}
                  >
                    <span className="text-white text-sm">
                      {p.emoji} {p.name}
                    </span>
                    <span className="text-emerald-400 text-sm font-medium">
                      {formatMXN(pStats.received)} MXN
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Amount Selector */}
        <div className="mb-6">
          <label className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">
            You Send (USD)
          </label>
          <div className="flex gap-2 mb-2">
            {PRESETS.map((val) => (
              <button
                key={val}
                onClick={() => handlePreset(val)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  !isCustom && amount === val
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-white/[0.04] border border-white/10 text-gray-300 hover:border-white/20"
                }`}
              >
                ${val === 1000 ? "1,000" : val === 2000 ? "2,000" : val}
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => handleCustomChange(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg bg-white/[0.04] text-white placeholder-gray-500 outline-none transition-colors ${
              isCustom
                ? "border-2 border-emerald-500"
                : "border border-white/10"
            }`}
          />
        </div>

        {/* Hero Section — Recipient Gets */}
        <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] p-6 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-400 mb-2">
            Recipient Gets
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-[40px] font-bold text-white leading-none">
              {formatMXN(stats.received)}
            </span>
            <span className="text-[40px] font-bold text-white leading-none">
              MXN
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            If there were no fees or markup, they&apos;d get MXN{" "}
            {formatMXN(stats.idealReceived)}
          </p>
          <p className="text-sm text-amber-400 mt-1">
            That&apos;s MXN {formatMXN(stats.lostMXN)} less due to fees and
            exchange rate markup
          </p>
        </div>

        {/* Cost Breakdown Card */}
        <div className="mb-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
          <div className="flex items-baseline justify-between mb-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Total Cost
            </p>
            <div className="text-right">
              <span className="text-2xl font-bold text-white">
                ${formatUSD(stats.totalCost)}
              </span>
              <span className="text-sm text-gray-400 ml-2">
                ({stats.totalPct.toFixed(2)}%)
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Fixed Fee</span>
              <span className="text-white font-medium">
                ${formatUSD(stats.fixedFee)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <span className="text-amber-400">Hidden FX Cost</span>
                <span className="text-gray-500 text-xs ml-1">
                  ({stats.markupPct}% markup × ${amount.toLocaleString()})
                </span>
              </div>
              <span className="text-amber-400 font-medium">
                ${formatUSD(stats.hiddenFxCost)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">FX Markup</span>
              <span className="text-white font-medium">
                {stats.markupPct.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Exchange Rate Card */}
        <div className="mb-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg bg-white/[0.04] p-4">
              <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 mb-1">
                Provider Rate
              </p>
              <p className="text-xl font-bold text-white">
                {stats.providerRate.toFixed(4)}
              </p>
            </div>
            <div className="rounded-lg bg-emerald-500/[0.08] border border-emerald-500/20 p-4">
              <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-400 mb-1">
                Mid-Market Rate
              </p>
              <p className="text-xl font-bold text-emerald-400">
                {MID_RATE.toFixed(4)}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            The mid-market rate is the real exchange rate you see on Google or
            XE. Providers profit by offering a worse rate — the difference
            between their rate and the mid-market rate is the hidden FX markup.
          </p>
        </div>

        {/* Ranking Card */}
        <div className="mb-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-4">
            How Does {selectedProvider.name} Compare?
          </p>
          <div className="flex gap-1 mb-4">
            {ranking.map((r, i) => {
              const isSelected = r.id === selectedProviderId;
              let color = "bg-white/[0.06]";
              if (isSelected) {
                if (i === 0) color = "bg-emerald-500";
                else if (i === ranking.length - 1) color = "bg-red-500";
                else color = "bg-indigo-500";
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
          <p className="text-white font-semibold">
            #{selectedRank} of 8
          </p>
          {selectedRank === 1 ? (
            <p className="text-sm text-emerald-400 mt-1">
              This is the cheapest option for ${amount.toLocaleString()}.
            </p>
          ) : (
            <p className="text-sm text-gray-400 mt-1">
              {cheapest.emoji} {cheapest.name} is the cheapest — you could save{" "}
              <span className="text-emerald-400 font-medium">
                $
                {formatUSD(
                  stats.totalCost - calcProvider(
                    providers.find((p) => p.id === cheapest.id)!,
                    amount
                  ).totalCost
                )}
              </span>{" "}
              by switching.
            </p>
          )}
        </div>

        {/* Provider Note */}
        <div className="mb-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
          <p className="text-sm text-gray-300">
            <span className="mr-2">💡</span>
            <span className="font-medium text-white">
              {selectedProvider.name}:
            </span>{" "}
            {selectedProvider.note}
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] text-gray-600 leading-relaxed mt-6">
          Data manually collected from provider websites and apps. Rates and
          fees are estimates and may vary by time of day, payment method, and
          delivery speed. Always verify on the provider&apos;s site before
          sending.
        </p>
      </div>
    </section>
  );
}
