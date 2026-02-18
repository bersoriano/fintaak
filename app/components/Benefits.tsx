import Image from "next/image";

export default function Benefits() {
  const benefits = [
    {
      title: "Sabes Exactamente Lo Que Pagas",
      description: "Te enseñamos cómo funcionan las remesas, cómo identificar costos ocultos y cómo entender el tipo de cambio para que sepas lo que realmente estás pagando.",
      color: "#2E7D32",
      icon: (
        /* Receipt with dollar — knowing the full cost */
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
        </svg>
      )
    },
    {
      title: "Lo Que Ves Es Lo Que Pagas",
      description: "Siempre verás la comisión, la diferencia del tipo de cambio, y el monto exacto que pagarás antes de enviar, sin sorpresas ni promociones engañosas.",
      color: "#1565C0",
      icon: (
        /* Eye with checkmark — clarity and visibility */
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 12l1.5 1.5L14 11" />
        </svg>
      )
    },
    {
      title: "Transferencias Instantáneas",
      description: "Tu familia recibe el dinero al instante, sin tiempos de espera ni preocupaciones.",
      color: "#F57C00",
      icon: (
        /* Clock with arrow — speed and instant delivery */
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5l2 2m-2 0l2-2" />
        </svg>
      )
    },
    {
      title: "Tu Dinero Seguro",
      description: "Tu dinero está protegido desde el momento que lo envías hasta que tu familia lo recibe. Cada transferencia pasa por canales seguros y regulados.",
      color: "#1565C0",
      icon: (
        /* Shield with checkmark — security and trust */
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="mision">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2D3142] mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            ¿Por Qué Elegir Fintaak?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transparencia total en cada transferencia. Sin costos ocultos, sin sorpresas.
          </p>
        </div>

        {/* Content Grid - Image and Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/young-man-w-phone1.jpg"
              alt="Pareja usando la aplicación Fintaak"
              fill
              className="object-cover"
            />
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${benefit.color}10`, color: benefit.color }}
                >
                  {benefit.icon}
                </div>
                <h3
                  className="text-lg font-semibold text-[#2D3142] mb-2"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
