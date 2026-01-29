export default function Partners() {
  return (
    <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Confianza y Seguridad
          </p>
          <h3 className="text-lg text-[#2D3142] max-w-2xl mx-auto">
            Tu dinero está protegido por los más altos estándares de seguridad financiera
          </h3>
        </div>

        {/* Placeholder for partner logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50">
          {[1, 2, 3, 4].map((item) => (
            <div 
              key={item}
              className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
            >
              <span className="text-gray-400 text-xs">Logo {item}</span>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#1565C0] mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
              🔒
            </div>
            <p className="text-sm text-gray-600">Encriptación de nivel bancario</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#1565C0] mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
              ✓
            </div>
            <p className="text-sm text-gray-600">Cumplimiento regulatorio completo</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#1565C0] mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
              🛡️
            </div>
            <p className="text-sm text-gray-600">Protección contra fraudes 24/7</p>
          </div>
        </div>
      </div>
    </section>
  );
}
