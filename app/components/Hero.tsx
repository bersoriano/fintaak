"use client";

import Image from "next/image";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import CalculatorPanel, { SharedCalculatorProps } from "./CalculatorPanel";

export default function Hero(props: SharedCalculatorProps) {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero1.jpg"
          alt="Fondo de la página principal de Fintaak"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-white/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left lg:max-w-xl">
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#2D3142] mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Aprende a Calcular el Costo Real de Enviar Dinero a Casa
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl lg:max-w-lg mx-auto lg:mx-0">
              Usa nuestra calculadora gratis y recibe artículos educativos. Sé de los primeros en acceder a la app cuando lancemos, que te muestra todo claro desde el inicio.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="#newsletter"
                onClick={() => sendGAEvent("event", "hero_cta_clicked", { button: "waitlist" })}
                className="bg-[#2E7D32] text-white px-8 py-4 rounded-lg hover:bg-green-800 transition-colors text-base font-semibold min-h-[44px] flex items-center justify-center shadow-lg"
              >
                Únete a la Lista de Espera
              </Link>
            </div>
          </div>

          <div className="w-full lg:justify-self-end">
            <CalculatorPanel
              {...props}
              variant="hero"
              className="bg-white/95 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
