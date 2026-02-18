export default function HowItWorks() {
  const steps = [
    {
      title: "Crea Tu Cuenta",
      description: "Regístrate en minutos. Un proceso claro y sencillo.",
      color: "#1565C0",
      icon: (
        /* User with plus — account creation */
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a4 4 0 10-8 0 4 4 0 008 0zM3 21a8 8 0 0112 0" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 8v6m3-3h-6" />
        </svg>
      )
    },
    {
      title: "Ve el Desglose Completo",
      description: "Ingresa el monto que quieras enviar y verás un desglose con: la comisión del servicio, la diferencia del tipo de cambio y el total antes de confirmar.",
      color: "#2E7D32",
      icon: (
        /* List with breakdown lines — cost transparency */
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5h6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h4" />
        </svg>
      )
    },
    {
      title: "Envía y Listo",
      description: "Confirma tu transferencia y tu familia recibe el dinero. Sin complicaciones y sin preocupaciones.",
      color: "#F57C00",
      icon: (
        /* Paper plane — sending money */
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L15 22l-4-9-9-4 20-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50" id="como-funciona">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2D3142] mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Cómo Funciona
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Envía dinero a casa en 3 simples pasos
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300 text-center flex flex-col"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: `${step.color}12`, color: step.color }}
              >
                {step.icon}
              </div>
              <h3
                className="text-lg font-semibold text-[#2D3142] mb-3"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#newsletter"
            className="inline-flex items-center justify-center bg-[#2E7D32] text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-base font-semibold min-h-[44px] shadow-lg"
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
