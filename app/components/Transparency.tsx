export default function Transparency() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2D3142] mb-6"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Toma el Control de Tu Dinero
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              La mayoría de apps y servicios de remesas te muestran una comisión baja pero esconden su ganancia en el tipo de cambio. Es tu derecho saber el costo completo antes de enviar. Por eso te mostramos tanto la comisión del servicio como la diferencia del tipo de cambio, para que entiendas exactamente a dónde va tu dinero.
            </p>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 mb-12 shadow-lg border border-gray-200">
            {/* Send Amount Header */}
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Ejemplo: envías</p>
              <div
                className="text-4xl sm:text-5xl font-bold text-[#2D3142]"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                $300 <span className="text-lg font-medium text-gray-400">USD</span>
              </div>
            </div>

            {/* Cost Components */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Service Fee */}
              <div className="rounded-xl border border-[#1565C0]/20 bg-[#1565C0]/[0.04] p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#1565C0]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#1565C0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-600">Comisión del servicio</span>
                </div>
                <div
                  className="text-2xl font-bold text-[#1565C0]"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  $1.99
                </div>
                <p className="text-xs text-gray-500 mt-1">Lo que cobra el proveedor por enviar</p>
              </div>

              {/* Exchange Rate Margin */}
              <div className="rounded-xl border border-[#F57C00]/20 bg-[#F57C00]/[0.04] p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F57C00]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#F57C00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-600">Margen del tipo de cambio</span>
                </div>
                <div
                  className="text-2xl font-bold text-[#F57C00]"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  $2.10
                </div>
                <p className="text-xs text-gray-500 mt-1">La diferencia vs. el tipo de cambio real</p>
              </div>
            </div>

            {/* Divider with equals */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200"></div>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-400">=</span>
              </div>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Total */}
            <div className="rounded-xl bg-[#2E7D32]/[0.06] border border-[#2E7D32]/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#2E7D32]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Costo total real</p>
                  <p className="text-xs text-gray-500">$1.99 comisión + $2.10 tipo de cambio</p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div
                  className="text-3xl font-bold text-[#2E7D32]"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  $4.09
                </div>
                <p className="text-sm font-medium text-[#2E7D32]/70">1.36% del monto</p>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sin Sorpresas */}
            <div className="text-center">
              <div className="w-14 h-14 bg-[#2E7D32]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {/* Eye with checkmark */}
                <svg className="w-7 h-7 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 12l1.5 1.5L14 11" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#2D3142] mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                Sin Sorpresas
              </h3>
              <p className="text-sm text-gray-600">
                Ves todos los costos antes de confirmar tu envío
              </p>
            </div>

            {/* 100% Transparente */}
            <div className="text-center">
              <div className="w-14 h-14 bg-[#1565C0]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {/* Magnifying glass over list */}
                <svg className="w-7 h-7 text-[#1565C0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5h6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h2m-2 4h4" />
                  <circle cx="16" cy="16" r="2.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18l1.5 1.5" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#2D3142] mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                100% Transparente
              </h3>
              <p className="text-sm text-gray-600">
                Desglose completo de cada peso que pagas
              </p>
            </div>

            {/* Educación Primero */}
            <div className="text-center">
              <div className="w-14 h-14 bg-[#F57C00]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {/* Lightbulb */}
                <svg className="w-7 h-7 text-[#F57C00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#2D3142] mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                Educación Primero
              </h3>
              <p className="text-sm text-gray-600">
                Te enseñamos a entender cada detalle de tu transferencia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
