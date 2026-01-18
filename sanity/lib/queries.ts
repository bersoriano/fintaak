import { groq } from 'next-sanity'

// Query for all published posts (for blog listing page)
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  _createdAt,
  title,
  slug,
  excerpt,
  featuredImage {
    asset,
    alt
  },
  category,
  publishedAt
}`

// Query for a single post by slug
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  title,
  slug,
  excerpt,
  featuredImage {
    asset,
    alt
  },
  category,
  content,
  publishedAt,
  author
}`

// Query for recent posts (for sidebar or related posts)
export const recentPostsQuery = groq`*[_type == "post"] | order(publishedAt desc)[0..2] {
  _id,
  title,
  slug,
  excerpt,
  featuredImage {
    asset,
    alt
  },
  publishedAt
}`

// Query for posts by category
export const postsByCategoryQuery = groq`*[_type == "post" && category == $category] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage {
    asset,
    alt
  },
  category,
  publishedAt
}`
