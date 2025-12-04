import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      name: "María González",
      role: "Enfermera en Los Ángeles",
      content: "Finalmente entiendo a dónde va cada centavo cuando envío dinero a mi familia. La transparencia de Fintaak me ha ahorrado cientos de dólares al año.",
      rating: 5,
      image: "/testimonials/maria.jpg", // Placeholder
    },
    {
      name: "Carlos Ramírez",
      role: "Construcción en Texas",
      content: "Antes perdía dinero sin saberlo. Ahora con Fintaak veo todo claro: la comisión, el tipo de cambio, todo. Mi familia recibe más y yo me siento tranquilo.",
      rating: 5,
      image: "/testimonials/carlos.jpg", // Placeholder
    },
    {
      name: "Ana Martínez",
      role: "Administradora en Chicago",
      content: "La calculadora me ayudó a comparar todos los servicios antes de decidir. Es increíble cómo esconden los costos otras apps. Con Fintaak todo es claro desde el inicio.",
      rating: 5,
      image: "/testimonials/ana.jpg", // Placeholder
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[--charcoal] mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Lo Que Dicen Nuestros Usuarios
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Miles de familias ya confían en Fintaak para sus envíos de dinero
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <div className="w-12 h-12 bg-[--trust-blue] rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div 
                    className="font-semibold text-[--charcoal]"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div 
              className="text-4xl font-bold text-[--trust-blue] mb-2"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              10K+
            </div>
            <div className="text-sm text-gray-600">Usuarios Activos</div>
          </div>
          <div className="text-center">
            <div 
              className="text-4xl font-bold text-[--trust-blue] mb-2"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              $5M+
            </div>
            <div className="text-sm text-gray-600">Enviados</div>
          </div>
          <div className="text-center">
            <div 
              className="text-4xl font-bold text-[--trust-blue] mb-2"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              4.9/5
            </div>
            <div className="text-sm text-gray-600">Calificación</div>
          </div>
          <div className="text-center">
            <div 
              className="text-4xl font-bold text-[--trust-blue] mb-2"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              99.9%
            </div>
            <div className="text-sm text-gray-600">Entregas Exitosas</div>
          </div>
        </div>
      </div>
    </section>
  );
}
