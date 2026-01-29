import { client } from '@/sanity/lib/client'
import { postBySlugQuery, postsQuery } from '@/sanity/lib/queries'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug') || 'como-calcular-costo-real-remesas-mexico'

    // Test 1: Fetch all posts
    const allPosts = await client.fetch(postsQuery)

    // Test 2: Fetch specific post by slug
    const post = await client.fetch(postBySlugQuery, { slug })

    // Test 3: Try to fetch with previewDrafts perspective
    const draftClient = client.withConfig({ perspective: 'previewDrafts' })
    const draftPost = await draftClient.fetch(postBySlugQuery, { slug })

    return NextResponse.json({
      success: true,
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
      allPostsCount: allPosts?.length || 0,
      allPostsSlugs: allPosts?.map((p: any) => p.slug?.current) || [],
      post: post || 'Not found with published perspective',
      draftPost: draftPost || 'Not found with draft perspective',
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    )
  }
}
