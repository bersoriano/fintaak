"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Cómo Funciona", href: "#como-funciona" },
    { label: "Calculadora", href: "#calculadora" },
    { label: "Blog", href: "/blog" },
    { label: "Nuestra Misión", href: "#mision" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[--trust-blue]" style={{ fontFamily: 'var(--font-poppins)' }}>
              Fintaak
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[--charcoal] hover:text-[--trust-blue] transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#newsletter"
              className="bg-[--trust-blue] text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              Únete al Newsletter
            </Link>
          </div>

          {/* Mobile Menu Button & CTA */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="#newsletter"
              className="bg-[--trust-blue] text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              Newsletter
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[--charcoal] p-2 min-h-[44px] min-w-[44px]"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-3 text-base font-medium text-[--charcoal] hover:text-[--trust-blue] hover:bg-gray-50 rounded-md min-h-[44px]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
