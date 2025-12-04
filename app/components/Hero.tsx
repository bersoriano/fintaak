import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[--charcoal] mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Aprende a Calcular el Costo Real de Enviar Dinero a Casa
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Usa nuestra calculadora gratis y recibe artículos educativos. Sé de los primeros en acceder a la app cuando lancemos, que te muestra todo claro desde el inicio.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="#waitlist"
                className="bg-[--trust-blue] text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-base font-semibold min-h-[44px] flex items-center justify-center shadow-lg"
              >
                Únete a la Lista de Espera
              </Link>
              <Link
                href="#calculadora"
                className="border-2 border-[--trust-blue] text-[--trust-blue] px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors text-base font-semibold min-h-[44px] flex items-center justify-center"
              >
                Prueba la Calculadora
              </Link>
            </div>
          </div>

          {/* Right Side - Calculator Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md border border-gray-100">
              <h3 
                className="text-xl font-semibold text-[--charcoal] mb-6"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Calculadora de Costos
              </h3>
              
              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad a Enviar
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                    $
                  </span>
                  <input
                    type="text"
                    value="300.00"
                    readOnly
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg text-lg font-semibold text-[--charcoal] bg-gray-50"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    USD
                  </span>
                </div>
              </div>

              {/* Destination */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destino
                </label>
                <input
                  type="text"
                  value="México (MXN)"
                  readOnly
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base text-[--charcoal] bg-gray-50"
                />
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Cost Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tipo de cambio (mid-market)</span>
                  <span className="font-medium text-[--charcoal]">$20.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Comisión del servicio</span>
                  <span className="font-medium text-[--empowerment-green]">$2.99</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Margen de tipo de cambio</span>
                  <span className="font-medium text-[--empowerment-green]">$7.50</span>
                </div>
              </div>

              {/* Total */}
              <div className="bg-[--empowerment-green] bg-opacity-10 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[--charcoal]">Costo Total</span>
                  <span className="text-2xl font-bold text-[--empowerment-green]" style={{ fontFamily: 'var(--font-poppins)' }}>
                    $10.49
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Tu familia recibe: $5,938.53 MXN
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
