export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Spacer */}
      <div className="h-16" />

      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-12 bg-gray-200 rounded-lg w-3/4 mx-auto mb-6 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded-lg w-1/2 mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Blog Grid Skeleton */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                {/* Image Skeleton */}
                <div className="h-48 bg-gray-200 animate-pulse" />

                {/* Content Skeleton */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="h-6 bg-gray-200 rounded-full w-1/3 mb-4 animate-pulse" />

                  {/* Title */}
                  <div className="h-8 bg-gray-200 rounded-lg w-full mb-3 animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded-lg w-2/3 mb-4 animate-pulse" />

                  {/* Excerpt */}
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                  </div>

                  {/* Date */}
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
