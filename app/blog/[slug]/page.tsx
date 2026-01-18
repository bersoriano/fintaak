import { sanityFetch } from '@/sanity/lib/fetch'
import { postBySlugQuery, recentPostsQuery } from '@/sanity/lib/queries'
import { BlogPost, BlogPostCard } from '@/sanity/types'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import { notFound } from 'next/navigation'
import { components } from '@/app/components/PortableTextComponents'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await sanityFetch<BlogPost>({
    query: postBySlugQuery,
    params: { slug },
  })

  if (!post) return {}

  return {
    title: `${post.title} | Fintaak Blog`,
    description: post.excerpt,
  }
}

const categoryLabels: Record<string, string> = {
  educacion: 'Educación Financiera',
  guias: 'Guías',
  noticias: 'Noticias',
  consejos: 'Consejos',
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, recentPosts] = await Promise.all([
    sanityFetch<BlogPost>({
      query: postBySlugQuery,
      params: { slug },
      tags: [`post:${slug}`],
    }),
    sanityFetch<BlogPostCard[]>({
      query: recentPostsQuery,
      tags: ['post'],
    }),
  ])

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <article className="pt-24 pb-16">
        {/* Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          {/* Category */}
          <span className="inline-block px-3 py-1 text-sm font-medium text-[--trust-blue] bg-blue-50 rounded-full mb-4">
            {categoryLabels[post.category] || post.category}
          </span>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl font-bold text-[--charcoal] mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{post.author}</span>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative w-full h-96 mb-12">
            <Image
              src={urlFor(post.featuredImage).width(1200).height(600).url()}
              alt={post.featuredImage.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.content} components={components} />
          </div>
        </div>
      </article>

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl font-bold text-[--charcoal] mb-8"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Artículos Recientes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts
                .filter((recentPost) => recentPost._id !== post._id)
                .slice(0, 3)
                .map((recentPost) => (
                  <article
                    key={recentPost._id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {recentPost.featuredImage && (
                      <Link href={`/blog/${recentPost.slug.current}`}>
                        <div className="relative h-40 w-full">
                          <Image
                            src={urlFor(recentPost.featuredImage).width(400).height(300).url()}
                            alt={recentPost.featuredImage.alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    )}
                    <div className="p-4">
                      <Link href={`/blog/${recentPost.slug.current}`}>
                        <h3 className="text-lg font-semibold text-[--charcoal] mb-2 hover:text-[--trust-blue] line-clamp-2">
                          {recentPost.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 line-clamp-2">{recentPost.excerpt}</p>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
