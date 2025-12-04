export default function Pricing() {
  const plans = [
    {
      name: "Básico",
      price: "2.99",
      description: "Perfecto para envíos ocasionales",
      features: [
        "Transferencias ilimitadas",
        "Tipo de cambio mid-market",
        "Desglose de costos completo",
        "Soporte por email",
      ],
      cta: "Comenzar",
      popular: false,
    },
    {
      name: "Premium",
      price: "0",
      description: "Para quienes envían regularmente",
      features: [
        "Todo de Básico",
        "Sin comisión en transferencias",
        "Solo pagas el margen FX",
        "Soporte prioritario 24/7",
        "Análisis de ahorros mensuales",
      ],
      cta: "Más Popular",
      popular: true,
    },
    {
      name: "Empresa",
      price: "Contactar",
      description: "Soluciones para negocios",
      features: [
        "Todo de Premium",
        "API personalizada",
        "Gestión de múltiples beneficiarios",
        "Gerente de cuenta dedicado",
        "Reportes personalizados",
      ],
      cta: "Contactar Ventas",
      popular: false,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[--charcoal] mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Planes Transparentes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades. Sin costos ocultos, sin sorpresas.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular
                  ? 'border-2 border-[--trust-blue] transform md:scale-105'
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[--trust-blue] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3
                  className="text-2xl font-semibold text-[--charcoal] mb-2"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  {plan.price !== "Contactar" && (
                    <span className="text-gray-500 text-lg">$</span>
                  )}
                  <span
                    className="text-5xl font-bold text-[--charcoal]"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {plan.price}
                  </span>
                  {plan.price !== "Contactar" && (
                    <span className="text-gray-500 text-sm">USD por envío</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[--empowerment-green] flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors min-h-[44px] ${
                  plan.popular
                    ? 'bg-[--trust-blue] text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-[--charcoal] hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Todos los planes incluyen nuestro compromiso de transparencia total. 
            <a href="#" className="text-[--trust-blue] hover:underline ml-1">
              Comparar planes en detalle →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
