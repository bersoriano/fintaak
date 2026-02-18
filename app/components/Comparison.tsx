export default function Comparison() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2D3142] mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Lo Que Estamos Construyendo Para Ti
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Una nueva forma de enviar dinero, clara desde el inicio.
          </p>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Column 1 — Hoy */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h3
              className="text-2xl font-semibold text-[#2D3142] mb-6"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Hoy
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D32F2F]/10 flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#D32F2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                <span className="text-gray-600">Costos ocultos en el tipo de cambio</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D32F2F]/10 flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#D32F2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                <span className="text-gray-600">Comisiones poco claras</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D32F2F]/10 flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#D32F2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                <span className="text-gray-600">Difícil saber cuánto recibe tu familia</span>
              </li>
            </ul>
          </div>

          {/* Column 2 — Con Fintaak */}
          <div className="bg-white rounded-2xl border-2 border-[#2E7D32]/20 p-8 shadow-sm">
            <h3
              className="text-2xl font-semibold text-[#2E7D32] mb-6"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Con Fintaak
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2E7D32]/10 flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-600">Costos visibles desde el inicio</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2E7D32]/10 flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-600">Tipo de cambio explicado</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2E7D32]/10 flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-600">Claridad total antes de enviar</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
