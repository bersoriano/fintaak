"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al enviar");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error al enviar el mensaje");
    }
  };

  return (
    <div id="contacto" className="mt-12 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <h3
        className="text-xl font-semibold text-[#2D3142] mb-2"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        ¿Tienes más preguntas?
      </h3>
      <p className="text-gray-600 mb-6">
        Nuestro equipo de soporte está listo para ayudarte
      </p>

      {status === "success" ? (
        <div className="bg-green-50 border border-[#2E7D32]/20 rounded-lg p-6 text-center">
          <svg className="w-10 h-10 text-[#2E7D32] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="font-semibold text-[#2D3142]">¡Mensaje enviado!</p>
          <p className="text-sm text-gray-600 mt-1">Te responderemos lo antes posible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[#2D3142] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-colors"
              placeholder="Tu nombre"
              disabled={status === "loading"}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[#2D3142] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-colors"
              placeholder="tu@email.com"
              disabled={status === "loading"}
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[#2D3142] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-colors resize-none"
              placeholder="¿En qué podemos ayudarte?"
              disabled={status === "loading"}
            />
          </div>

          {status === "error" && (
            <p className="text-[#D32F2F] text-sm">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#2E7D32] text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors font-semibold min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : (
              "Enviar Mensaje"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
