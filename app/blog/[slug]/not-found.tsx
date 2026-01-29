import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 pt-24">
        <div className="text-center">
          <h1
            className="text-6xl font-bold text-[--charcoal] mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            404
          </h1>
          <h2
            className="text-2xl font-semibold text-gray-700 mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Artículo no encontrado
          </h2>
          <p className="text-gray-600 mb-8">
            Lo sentimos, no pudimos encontrar el artículo que buscas.
          </p>
          <Link
            href="/blog"
            className="bg-[#1565C0] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Volver al Blog
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
