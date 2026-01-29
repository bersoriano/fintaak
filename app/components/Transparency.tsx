export default function Transparency() {
  return (
    <section className="py-16 md:py-24 bg-white" id="calculadora">
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

          {/* Visual Flow Diagram */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 sm:p-12 mb-12 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              {/* Amount to Send */}
              <div className="bg-white rounded-lg px-6 py-4 shadow-md min-w-[140px] text-center">
                <div className="text-sm text-gray-500 mb-1">Monto</div>
                <div className="text-xl font-bold text-[#2D3142]" style={{ fontFamily: 'var(--font-poppins)' }}>
                  $300
                </div>
              </div>

              {/* Arrow/Plus */}
              <div className="text-[#1565C0] transform rotate-90 sm:rotate-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* Service Fee */}
              <div className="bg-white rounded-lg px-6 py-4 shadow-md min-w-[140px] text-center">
                <div className="text-sm text-gray-500 mb-1">Comisión</div>
                <div className="text-xl font-bold text-[#1565C0]" style={{ fontFamily: 'var(--font-poppins)' }}>
                  $2.99
                </div>
              </div>

              {/* Plus */}
              <div className="text-[#2D3142] text-2xl font-bold">+</div>

              {/* Exchange Rate Difference */}
              <div className="bg-white rounded-lg px-6 py-4 shadow-md min-w-[140px] text-center">
                <div className="text-sm text-gray-500 mb-1">Tipo de Cambio</div>
                <div className="text-xl font-bold text-[#1565C0]" style={{ fontFamily: 'var(--font-poppins)' }}>
                  $7.50
                </div>
              </div>

              {/* Equals */}
              <div className="text-[#2D3142] text-2xl font-bold">=</div>

              {/* Total Cost */}
              <div className="bg-[--empowerment-green] rounded-lg px-6 py-4 shadow-md min-w-[140px] text-center">
                <div className="text-sm text-white mb-1">Costo Total</div>
                <div className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
                  $10.49
                </div>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#1565C0] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#1565C0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#2D3142] mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                Sin Sorpresas
              </h3>
              <p className="text-sm text-gray-600">
                Ves todos los costos antes de confirmar tu envío
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#1565C0] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#1565C0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#2D3142] mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                100% Transparente
              </h3>
              <p className="text-sm text-gray-600">
                Desglose completo de cada peso que pagas
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#1565C0] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#1565C0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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
