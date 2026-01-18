import { client } from './client'

export async function sanityFetch<T = any>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, any>
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: 60, // Revalidate every 60 seconds
      tags,
    },
  })
}
