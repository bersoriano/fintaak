"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  calcProvider,
  formatMXN,
  formatUSD,
  MID_RATE,
  PRESETS,
  providers,
} from "./calculatorData";

export interface SharedCalculatorProps {
  amount: number;
  customAmount: string;
  isCustom: boolean;
  selectedProviderId: string;
  onCustomAmountBlur: (source: "hero" | "main") => void;
  onCustomAmountChange: (source: "hero" | "main", value: string) => void;
  onPresetSelect: (source: "hero" | "main", value: number) => void;
  onProviderSelect: (source: "hero" | "main", providerId: string) => void;
}

interface CalculatorPanelProps extends SharedCalculatorProps {
  className?: string;
  variant?: "default" | "hero";
}

export default function CalculatorPanel({
  amount,
  className,
  customAmount,
  isCustom,
  onCustomAmountBlur,
  onCustomAmountChange,
  onPresetSelect,
  onProviderSelect,
  selectedProviderId,
  variant = "default",
}: CalculatorPanelProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isHeroVariant = variant === "hero";
  const eventSource = isHeroVariant ? "hero" : "main";

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

  const selectedProvider = useMemo(
    () => providers.find((provider) => provider.id === selectedProviderId) ?? providers[0],
    [selectedProviderId]
  );
  const stats = useMemo(
    () => calcProvider(selectedProvider, amount),
    [amount, selectedProvider]
  );

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden ${className ?? ""}`.trim()}
    >
      <div className={isHeroVariant ? "" : "grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"}>
        <div className={`p-6 sm:p-8 ${isHeroVariant ? "" : "border-b border-gray-200 lg:border-b-0 lg:border-r"}`}>
          <div className={`grid gap-6 ${isHeroVariant ? "grid-cols-1" : "grid-cols-1 xl:grid-cols-2"}`}>
            <div className="relative" ref={dropdownRef}>
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
                Proveedor
              </label>
              <button
                onClick={() => setDropdownOpen((open) => !open)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white border border-gray-200 text-[#2D3142] hover:border-gray-300 transition-colors"
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
                  {providers.map((provider) => {
                    const providerStats = calcProvider(provider, amount);

                    return (
                      <button
                        key={provider.id}
                        onClick={() => {
                          onProviderSelect(eventSource, provider.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          provider.id === selectedProviderId ? "bg-gray-100" : ""
                        }`}
                      >
                        <span className="text-[#2D3142] text-sm">
                          {provider.emoji} {provider.name}
                        </span>
                        <span className="text-[#2E7D32] text-sm font-medium">
                          {formatMXN(providerStats.received)} MXN
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
                Monto a Enviar (USD)
              </label>
              <div
                className={`grid mb-2 ${
                  isHeroVariant
                    ? "grid-cols-2 gap-3"
                    : "grid-cols-2 sm:grid-cols-4 gap-2"
                }`}
              >
                {PRESETS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => onPresetSelect(eventSource, preset)}
                    className={`rounded-lg text-sm font-semibold transition-all ${
                      isHeroVariant ? "px-4 py-3" : "py-2.5"
                    } ${
                      !isCustom && amount === preset
                        ? "bg-[#2E7D32] text-white shadow-md"
                        : "bg-white border border-gray-200 text-[#2D3142] hover:border-gray-300"
                    }`}
                  >
                    ${preset === 1000 ? "1,000" : preset === 2000 ? "2,000" : preset}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Cantidad personalizada"
                value={customAmount}
                onBlur={() => onCustomAmountBlur(eventSource)}
                onChange={(e) => onCustomAmountChange(eventSource, e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg bg-white text-[#2D3142] placeholder-gray-400 outline-none transition-colors ${
                  isCustom
                    ? "border-2 border-[#2E7D32]"
                    : "border border-gray-200"
                }`}
              />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[#2E7D32]/20 bg-green-50 p-6 text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-[#2E7D32] mb-2">
              Tu Familia Recibe
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span
                className="text-4xl sm:text-[40px] font-bold text-[#2D3142] leading-none"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {formatMXN(stats.received)}
              </span>
              <span className="text-xl font-bold text-[#2D3142] leading-none">
                MXN
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Sin comisión ni diferencia en el tipo de cambio recibirían MXN{" "}
              {formatMXN(stats.idealReceived)}
            </p>
            <p className="text-sm text-[#F57C00] font-medium mt-1">
              MXN {formatMXN(stats.lostMXN)} menos por comisión y tipo de cambio
            </p>
          </div>
        </div>

        {!isHeroVariant && (
          <div className="p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <div className="flex items-baseline justify-between mb-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Costo Total
                  </p>
                  <div className="text-right">
                    <span
                      className="text-2xl font-bold text-[#2D3142]"
                      style={{ fontFamily: "var(--font-poppins)" }}
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
                    <span className="text-gray-600">Comisión</span>
                    <span className="text-[#2D3142] font-medium">
                      ${formatUSD(stats.fixedFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-[#F57C00] font-medium">Margen por tipo de cambio</span>
                      <span className="text-gray-400 text-xs ml-1">
                        ({stats.markupPct}% sobre ${amount.toLocaleString()})
                      </span>
                    </div>
                    <span className="text-[#F57C00] font-medium">
                      ${formatUSD(stats.hiddenFxCost)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 mb-1">
                      Tasa de {selectedProvider.name}
                    </p>
                    <p
                      className="text-xl font-bold text-[#2D3142]"
                      style={{ fontFamily: "var(--font-poppins)" }}
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
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {MID_RATE.toFixed(4)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  La tasa mid-market es el tipo de cambio real que ves en Google o XE. Los proveedores aplican un tipo de cambio menos favorable; esa diferencia es el margen del tipo de cambio.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
