import { sanityFetch } from '@/sanity/lib/fetch'
import { postsQuery } from '@/sanity/lib/queries'
import { BlogPostCard } from '@/sanity/types'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Blog | Fintaak',
  description: 'Aprende sobre transferencias internacionales, educación financiera y más.',
}

const categoryLabels: Record<string, string> = {
  educacion: 'Educación Financiera',
  guias: 'Guías',
  noticias: 'Noticias',
  consejos: 'Consejos',
}

export default async function BlogPage() {
  const posts = await sanityFetch<BlogPostCard[]>({
    query: postsQuery,
    tags: ['post'],
  })

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1
              className="text-4xl sm:text-5xl font-bold text-[--charcoal] mb-4"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Blog de Fintaak
            </h1>
            <p className="text-lg text-gray-600">
              Guías, consejos y recursos para entender mejor tus transferencias internacionales
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No hay artículos publicados todavía.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <Link href={`/blog/${post.slug.current}`}>
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={urlFor(post.featuredImage).width(600).height(400).url()}
                          alt={post.featuredImage.alt}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <span className="inline-block px-3 py-1 text-xs font-medium text-[--trust-blue] bg-blue-50 rounded-full mb-3">
                      {categoryLabels[post.category] || post.category}
                    </span>

                    {/* Title */}
                    <Link href={`/blog/${post.slug.current}`}>
                      <h2
                        className="text-xl font-semibold text-[--charcoal] mb-2 hover:text-[--trust-blue] transition-colors line-clamp-2"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                      >
                        {post.title}
                      </h2>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="text-[--trust-blue] font-medium hover:underline"
                      >
                        Leer más →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
