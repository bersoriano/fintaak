export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Crea Tu Cuenta",
      description: "Regístrate en minutos. Un proceso claro y sencillo.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Ver el Desglose Completo",
      description: "Ingresa el monto que quieras enviar y verás un desglose con: la comisión del servicio, la diferencia del tipo de cambio y el total antes de confirmar.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Envía y Listo",
      description: "Confirma tu transferencia y tu familia recibe el dinero. Sin complicaciones y sin preocupaciones.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white" id="como-funciona">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[--charcoal] mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Cómo Funciona
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Envía dinero a casa en 3 simples pasos
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connection Lines (hidden on mobile) */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[--trust-blue] via-[--trust-blue] to-[--trust-blue] opacity-20" style={{ width: 'calc(100% - 120px)', left: '60px' }}></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[--trust-blue] to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    {step.icon}
                  </div>
                  <span 
                    className="text-5xl font-bold text-gray-200"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {step.number}
                  </span>
                </div>
                
                {/* Step Content */}
                <h3 
                  className="text-xl font-semibold text-[--charcoal] mb-3"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Mobile Arrow */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <svg className="w-6 h-6 text-[--trust-blue]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center bg-[--empowerment-green] text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-base font-semibold min-h-[44px] shadow-lg"
          >
            Comienza Ahora
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
