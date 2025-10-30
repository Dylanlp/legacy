import { Metadata } from 'next'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

type Props = {
  params: Promise<{ id: string }>
}

type Plaque = {
  id: string
  plaqueId?: string
  title: string
  subtitle: string
  latitude: number
  longitude: number
  url?: string
  year?: string
  inscriptionOnly?: string
  addressOnly?: string
  profession?: string
  plaqueImageURL?: string
  siteImageURL?: string
  portraitImageURL?: string
  biography?: string
  keyFacts?: string[]
  funFacts?: string[]
  relatedPlaqueIds?: string[]
  birthYear?: number
  deathYear?: number
  locationStory?: string
}

// Helper function to read plaque data
async function getPlaqueData(id: string): Promise<Plaque | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'plaques.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const plaques: Plaque[] = JSON.parse(fileContents)

    const plaque = plaques.find((p) => p.id === id || p.plaqueId === id)
    return plaque || null
  } catch (error) {
    console.error('Error reading plaque data:', error)
    return null
  }
}

// Helper function to format name (capitalize properly)
function formatName(name: string): string {
  if (name.includes(',')) {
    const [lastName, firstName] = name.split(',').map(s => s.trim())
    return `${firstName} ${lastName}`
  }
  return name
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const plaque = await getPlaqueData(id)

  if (!plaque) {
    return {
      title: 'Blue Plaque - Legacy',
      description: 'Discover this London Blue Plaque with the Legacy app',
    }
  }

  const formattedName = formatName(plaque.title)
  const profession = plaque.profession ? ` - ${plaque.profession}` : ''
  const address = plaque.addressOnly || plaque.subtitle

  const title = `${formattedName}${profession} | London Blue Plaque`
  const description = plaque.locationStory
    ? plaque.locationStory.slice(0, 160) + '...'
    : `Discover the blue plaque commemorating ${formattedName} at ${address}. Learn about their legacy with the Legacy app.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://legacyrun.vercel.app/plaque/${id}`,
      siteName: 'Legacy',
      type: 'website',
      images: plaque.portraitImageURL ? [
        {
          url: plaque.portraitImageURL,
          width: 1200,
          height: 630,
          alt: `${formattedName}`,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: plaque.portraitImageURL ? [plaque.portraitImageURL] : undefined,
    },
  }
}

export default async function PlaquePage({ params }: Props) {
  const { id } = await params
  const plaque = await getPlaqueData(id)

  if (!plaque) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-blue-600 rounded-3xl shadow-2xl flex items-center justify-center">
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Plaque Not Found
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Explore 2,000+ London blue plaques with the Legacy app.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="https://apps.apple.com/us/app/explore-london-legacy/id6754275366"
                className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105"
              >
                Download Legacy App
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const formattedName = formatName(plaque.title)
  const address = plaque.addressOnly || plaque.subtitle
  const lifespan = (plaque.birthYear && plaque.deathYear)
    ? `${plaque.birthYear}-${plaque.deathYear}`
    : plaque.year

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-8">
          {/* App Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-blue-600 rounded-3xl shadow-2xl flex items-center justify-center">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>

          {/* Plaque Info */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {formattedName}
            </h1>
            {plaque.profession && (
              <p className="text-xl text-gray-700 dark:text-gray-300">
                {plaque.profession}
              </p>
            )}
            {lifespan && (
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {lifespan}
              </p>
            )}
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {address}
            </p>
          </div>

          {/* Portrait Image */}
          {plaque.portraitImageURL && (
            <div className="flex justify-center">
              <img
                src={plaque.portraitImageURL}
                alt={formattedName}
                className="w-64 h-64 object-cover rounded-2xl shadow-lg"
              />
            </div>
          )}

          {/* Location Story */}
          {plaque.locationStory && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                About This Location
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {plaque.locationStory}
              </p>
            </div>
          )}

          {/* Plaque Images */}
          {(plaque.plaqueImageURL || plaque.siteImageURL) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plaque.plaqueImageURL && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                    The Plaque
                  </h3>
                  <img
                    src={plaque.plaqueImageURL}
                    alt="Blue Plaque"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
              {plaque.siteImageURL && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                    The Location
                  </h3>
                  <img
                    src={plaque.siteImageURL}
                    alt="Location"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          )}

          {/* CTA Button */}
          <div className="text-center pt-4">
            <Link
              href="https://apps.apple.com/us/app/explore-london-legacy/id6754275366"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105"
            >
              Explore More in the Legacy App
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md text-center">
              <div className="text-3xl mb-2">🗺️</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Explore
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Find 2,000+ blue plaques on an interactive map
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md text-center">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Collect
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Visit plaques and build your collection
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md text-center">
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
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center pt-8">
            If you have the Legacy app installed, this link will open automatically.
          </p>
        </div>
      </div>
    </div>
  )
}
