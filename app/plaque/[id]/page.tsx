import { Metadata } from 'next'
import Link from 'next/link'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  return {
    title: `Blue Plaque - Legacy`,
    description: `Discover this London Blue Plaque with the Legacy app`,
    openGraph: {
      title: `Blue Plaque - Legacy`,
      description: `Discover this London Blue Plaque with the Legacy app`,
      url: `https://legacyrun.vercel.app/plaque/${id}`,
      siteName: 'Legacy',
      type: 'website',
    },
  }
}

export default async function PlaquePage({ params }: Props) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center space-y-8">
          {/* App Icon/Logo */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-blue-600 rounded-3xl shadow-2xl flex items-center justify-center">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Discover London's Blue Plaques
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Explore the history of this location and 2,000+ other blue plaques across London with the Legacy app.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link
              href="https://apps.apple.com/app/legacy"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105"
            >
              Download Legacy App
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <div className="text-3xl mb-2">🗺️</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Explore
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Find 2,000+ blue plaques on an interactive map
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Collect
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Visit plaques and build your collection
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <div className="text-3xl mb-2">🏃</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Run
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Create running routes to visit historic landmarks
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-gray-500 dark:text-gray-400 pt-8">
            If you have the Legacy app installed, this link will open automatically.
          </p>
        </div>
      </div>
    </div>
  )
}
