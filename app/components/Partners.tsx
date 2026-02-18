export default function Partners() {
  const indicators = [
    {
      title: "Encriptación de nivel bancario",
      description: "Tus datos y transferencias protegidos con cifrado de extremo a extremo.",
      color: "#1565C0",
      icon: (
        /* Lock/padlock — encryption */
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4" />
          <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    },
    {
      title: "Cumplimiento regulatorio completo",
      description: "Operamos bajo todas las regulaciones financieras aplicables en EE.UU. y México.",
      color: "#2E7D32",
      icon: (
        /* Document with checkmark — compliance */
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5" />
        </svg>
      )
    },
    {
      title: "Protección contra fraudes 24/7",
      description: "Monitoreo constante de cada transacción para detectar y prevenir actividad sospechosa.",
      color: "#F57C00",
      icon: (
        /* Shield with eye — fraud monitoring */
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="12" r="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12c1-2.5 3-3.5 4-3.5s3 1 4 3.5c-1 2.5-3 3.5-4 3.5s-3-1-4-3.5z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2D3142] mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Confianza y Seguridad
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tu dinero está protegido por los más altos estándares de seguridad financiera
          </p>
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {indicators.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${item.color}15`, color: item.color }}
              >
                {item.icon}
              </div>
              <h4
                className="font-semibold text-[#2D3142] mb-2"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {item.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
