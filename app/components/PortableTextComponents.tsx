import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { PortableTextComponents } from '@portabletext/react'

export const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2
        className="text-3xl font-bold text-[--charcoal] mt-12 mb-4"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="text-2xl font-semibold text-[--charcoal] mt-8 mb-3"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        className="text-xl font-semibold text-[--charcoal] mt-6 mb-2"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[--trust-blue] pl-6 py-2 my-6 italic text-gray-700 bg-blue-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-[--charcoal]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 text-[--empowerment-green] px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const isExternal = value?.href?.startsWith('http')
      return (
        <Link
          href={value?.href || '#'}
          className="text-[--trust-blue] hover:underline font-medium"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </Link>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <div className="relative w-full h-96">
            <Image
              src={urlFor(value).width(1200).height(600).url()}
              alt={value.alt || 'Blog image'}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    code: ({ value }) => {
      return (
        <div className="my-8">
          {value.filename && (
            <div className="bg-[--charcoal] text-white px-4 py-2 rounded-t-lg text-sm font-mono">
              {value.filename}
            </div>
          )}
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
            <code className={`language-${value.language || 'text'}`}>{value.code}</code>
          </pre>
        </div>
      )
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 ml-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-gray-700">{children}</li>,
    number: ({ children }) => <li className="text-gray-700">{children}</li>,
  },
}
