"use client";

import { useState } from "react";
import ContactForm from "./ContactForm";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "¿Cómo funciona el tipo de cambio en Fintaak?",
      answer: "Usamos el tipo de cambio mid-market (el tipo de cambio real sin márgenes ocultos) y te mostramos claramente cualquier diferencia que aplicamos. Siempre verás el desglose completo antes de confirmar tu transferencia: la comisión del servicio + el margen del tipo de cambio = costo total.",
    },
    {
      question: "¿Cuánto tiempo tarda en llegar el dinero?",
      answer: "La mayoría de las transferencias llegan al instante. En casos excepcionales, puede tomar hasta 24 horas dependiendo del banco receptor. Siempre te mantendremos informado del estado de tu transferencia en tiempo real.",
    },
    {
      question: "¿Es seguro enviar dinero con Fintaak?",
      answer: "Absolutamente. Utilizamos encriptación de nivel bancario y cumplimos con todas las regulaciones financieras. Tu dinero está protegido desde que lo envías hasta que tu familia lo recibe. Además, monitoreamos todas las transacciones 24/7 para prevenir fraudes.",
    },
    {
      question: "¿Hay un monto mínimo o máximo para enviar?",
      answer: "El monto mínimo es de $10 USD y el máximo depende de tu perfil de verificación. Para usuarios verificados básicos, el límite es de $2,999 USD por transacción. Usuarios con verificación avanzada pueden enviar hasta $10,000 USD por transacción.",
    },
    {
      question: "¿Qué necesito para crear una cuenta?",
      answer: "Solo necesitas una identificación oficial vigente, un número de teléfono, y una cuenta bancaria o tarjeta de débito/crédito válida. El proceso de registro toma menos de 5 minutos y es completamente digital.",
    },
    {
      question: "¿Puedo cancelar una transferencia?",
      answer: "Puedes cancelar una transferencia antes de que sea procesada. Una vez procesada y enviada, no es posible cancelarla ya que el dinero está en camino a tu beneficiario. Te recomendamos revisar todos los detalles antes de confirmar.",
    },
    {
      question: "¿Cobran comisiones ocultas?",
      answer: "No, nunca. Nuestra promesa es transparencia total. Verás exactamente cuánto pagas en comisiones y en el margen del tipo de cambio antes de confirmar. Lo que ves es lo que pagas, sin sorpresas ni letras pequeñas.",
    },
    {
      question: "¿Cómo me ayuda la calculadora de Fintaak?",
      answer: "Nuestra calculadora te permite ver y comparar el costo real de enviar dinero. Te mostramos el desglose completo: monto a enviar + comisión + diferencia de tipo de cambio = costo total. Así puedes tomar decisiones informadas y comparar con otros servicios.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2D3142] mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-gray-600">
            Todo lo que necesitas saber sobre Fintaak
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors min-h-[44px]"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span
                  className="font-semibold text-[#2D3142] pr-4"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-[#1565C0] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div
                  className="px-6 pb-5 text-gray-600 leading-relaxed"
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </section>
  );
}
