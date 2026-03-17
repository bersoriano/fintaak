"use client";

import { useEffect, useMemo, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import CalculatorPanel, { SharedCalculatorProps } from "./CalculatorPanel";
import { calcProvider, formatUSD, providers } from "./calculatorData";

export default function RemittanceCalculator({
  amount,
  customAmount,
  isCustom,
  onCustomAmountBlur,
  onCustomAmountChange,
  onPresetSelect,
  onProviderSelect,
  selectedProviderId,
}: SharedCalculatorProps) {
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const section = document.getElementById("calculadora");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView.current) {
          hasTrackedView.current = true;
          sendGAEvent("event", "calculator_section_viewed");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const selectedProvider = useMemo(
    () => providers.find((provider) => provider.id === selectedProviderId) ?? providers[0],
    [selectedProviderId]
  );
  const stats = useMemo(() => calcProvider(selectedProvider, amount), [amount, selectedProvider]);

  const ranking = useMemo(() => {
    const all = providers.map((provider) => ({
      id: provider.id,
      name: provider.name,
      emoji: provider.emoji,
      totalCost: calcProvider(provider, amount).totalCost,
    }));
    all.sort((a, b) => a.totalCost - b.totalCost);
    return all;
  }, [amount]);

  const selectedRank =
    ranking.findIndex((r) => r.id === selectedProviderId) + 1;
  const cheapest = ranking[0];
  const cheapestStats = useMemo(
    () => calcProvider(providers.find((provider) => provider.id === cheapest.id) ?? providers[0], amount),
    [amount, cheapest]
  );

  return (
    <section className="py-16 md:py-24 bg-white" id="calculadora">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2D3142]"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Calculadora: ¿Cuánto recibe tu familia?
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            USD → MXN · Transferencia Bancaria · Datos de Ene 2026
          </p>
        </div>

        <CalculatorPanel
          amount={amount}
          customAmount={customAmount}
          isCustom={isCustom}
          onCustomAmountBlur={onCustomAmountBlur}
          onCustomAmountChange={onCustomAmountChange}
          onPresetSelect={onPresetSelect}
          onProviderSelect={onProviderSelect}
          selectedProviderId={selectedProviderId}
        />

        {/* Ranking Section — Full Width */}
        <div className="mt-8 rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4 gap-2">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              ¿Cómo se compara {selectedProvider.name}?
            </p>
            <div className="flex items-baseline gap-2">
              <p
                className="text-[#2D3142] font-semibold"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                #{selectedRank} de 8
              </p>
              {selectedRank !== 1 && (
                <span className="text-sm text-gray-600">
                  — Podrías ahorrar{" "}
                  <span className="text-[#2E7D32] font-medium">
                    ${formatUSD(stats.totalCost - cheapestStats.totalCost)}
                  </span>{" "}
                  con {cheapest.emoji} {cheapest.name}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {ranking.map((r, i) => {
              return (
                <div
                  key={r.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-gray-50 transition-colors"
                >
                  <span className="text-gray-400 w-4 text-right text-xs">{i + 1}</span>
                  <span className="flex-1 text-gray-600">
                    {r.emoji} {r.name}
                  </span>
                  <span className="font-medium tabular-nums text-gray-500">
                    ${formatUSD(r.totalCost)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Savings Nudge */}
          <div className="mt-4 rounded-lg bg-amber-50 border border-[#F57C00]/20 p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm text-gray-700">
              <span className="font-medium text-[#2D3142]">
                💡 Hay opciones más económicas para este envío
              </span>{" "}
              — podrías ahorrar{" "}
              <span className="font-semibold text-[#2E7D32]">
                ${formatUSD(stats.totalCost - cheapestStats.totalCost)}
              </span>{" "}
              cambiando de proveedor.
            </p>
            <a
              href="#newsletter"
              onClick={() =>
                sendGAEvent("event", "savings_nudge_clicked", {
                  cheapest_provider: cheapest.name,
                  amount,
                  savings_usd: formatUSD(stats.totalCost - cheapestStats.totalCost),
                })
              }
              className="text-sm font-semibold text-[#1565C0] hover:underline whitespace-nowrap"
            >
              Únete a la lista de espera →
            </a>
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
