export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Spacer */}
      <div className="h-16" />

      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Badge */}
          <div className="h-6 bg-gray-200 rounded-full w-32 mb-6 animate-pulse" />

          {/* Title */}
          <div className="h-12 bg-gray-200 rounded-lg w-full mb-4 animate-pulse" />
          <div className="h-12 bg-gray-200 rounded-lg w-3/4 mb-6 animate-pulse" />

          {/* Meta */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <article className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          <div className="h-96 bg-gray-200 rounded-2xl mb-12 animate-pulse" />

          {/* Content Skeleton */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                  {i % 3 === 0 && <div className="h-8" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
