import Image from "next/image";

export default function Benefits() {
  const benefits = [
    {
      title: "Sabes Exactamente Lo Que Pagas",
      description: "Te enseñamos cómo funcionan las remesas, cómo identificar costos ocultos y cómo entender el tipo de cambio para que sepas lo que realmente estás pagando.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Lo Que Ves Es Lo Que Pagas",
      description: "Siempre verás la comisión, la diferencia del tipo de cambio, y el monto exacto que pagarás antes de enviar, sin sorpresas ni promociones engañosas.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Transferencias Instantáneas",
      description: "Tu familia recibe el dinero al instante, sin tiempos de espera ni preocupaciones.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Tu Dinero Seguro",
      description: "Tu dinero está protegido desde el momento que lo envías hasta que tu familia lo recibe. Cada transferencia pasa por canales seguros y regulados.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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
          <div className="grid grid-cols-1 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1565C0] bg-opacity-10 rounded-lg flex items-center justify-center text-[#1565C0]">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-semibold text-[#2D3142] mb-3"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
