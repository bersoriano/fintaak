"use client";

import { useState } from "react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[--trust-blue] to-blue-700" id="waitlist">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          Únete a la Lista de Espera
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Sé de los primeros en acceder a Fintaak cuando lancemos. Recibe contenido educativo exclusivo y aprende a proteger tu dinero.
        </p>

        {/* Email Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex-1 px-6 py-4 rounded-lg text-[--charcoal] text-base focus:outline-none focus:ring-2 focus:ring-white min-h-[44px]"
              />
              <button
                type="submit"
                className="bg-[--empowerment-green] text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap min-h-[44px] shadow-lg"
              >
                Únete Ahora
              </button>
            </div>
          </form>
        ) : (
          <div className="max-w-md mx-auto mb-8 bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur">
            <div className="flex items-center justify-center gap-2 text-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold">¡Gracias! Revisa tu email para confirmar.</span>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-white">
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="font-semibold text-sm">Contenido Educativo</span>
            <span className="text-blue-200 text-sm">Aprende sobre remesas y finanzas</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="font-semibold text-sm">Acceso Anticipado</span>
            <span className="text-blue-200 text-sm">Prueba la app antes que nadie</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            <span className="font-semibold text-sm">Ofertas Exclusivas</span>
            <span className="text-blue-200 text-sm">Beneficios para miembros fundadores</span>
          </div>
        </div>

        {/* Trust Note */}
        <p className="mt-8 text-sm text-blue-200">
          📧 Enviamos un email semanal con consejos útiles. Sin spam, cancela cuando quieras.
        </p>
      </div>
    </section>
  );
}
