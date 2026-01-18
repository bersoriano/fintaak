import { PortableTextBlock } from '@portabletext/react'

export interface BlogPost {
  _id: string
  _createdAt: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  featuredImage: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt: string
  }
  category: 'educacion' | 'guias' | 'noticias' | 'consejos'
  content: PortableTextBlock[]
  publishedAt: string
  author: string
}

export interface BlogPostCard {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  featuredImage: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt: string
  }
  category: string
  publishedAt: string
}
