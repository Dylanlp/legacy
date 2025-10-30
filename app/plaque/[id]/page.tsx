import { Metadata } from 'next'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import WikidataPortrait from './WikidataPortrait'
import { Button } from '@/components/ui/button'

type Props = {
  params: Promise<{ id: string }>
}

type Plaque = {
  id: string
  plaqueId?: string
  title?: string
  subtitle?: string
  latitude?: number
  longitude?: number
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

// Helper function to read plaque data (merges base data with enrichments)
async function getPlaqueData(id: string): Promise<Plaque | null> {
  try {
    // Load both data files
    const basePath = path.join(process.cwd(), 'public', 'data', 'openplaques_uk.json')
    const enrichedPath = path.join(process.cwd(), 'public', 'data', 'plaques.json')

    const baseData = fs.readFileSync(basePath, 'utf8')
    const enrichedData = fs.readFileSync(enrichedPath, 'utf8')

    const basePlaques = JSON.parse(baseData)
    const enrichments = JSON.parse(enrichedData)

    // Find the base plaque
    const basePlaque = basePlaques.find((p: any) => String(p.id) === id)
    if (!basePlaque) return null

    // Filter for Central London only (lat 51.48-51.54, lon -0.18 to -0.08)
    const lat = basePlaque.latitude
    const lon = basePlaque.longitude
    if (!lat || !lon || lat < 51.48 || lat > 51.54 || lon < -0.18 || lon > -0.08) {
      return null
    }

    // Find enrichment data if it exists
    const enrichment = enrichments.find((e: any) => e.id === id || e.plaqueId === id)

    // Extract photos from OpenPlaques data
    const photos = basePlaque.photos || []
    const plaquePhoto = photos.find((p: any) =>
      p.shot_name?.toLowerCase().includes('plaque') ||
      p.shot_name?.toLowerCase().includes('close')
    )
    const sitePhoto = photos.find((p: any) =>
      p.shot_name?.toLowerCase().includes('establish') ||
      p.shot_name?.toLowerCase().includes('building') ||
      p.shot_name?.toLowerCase().includes('long')
    )

    // Merge data (enrichment overrides base, but only if enrichment value exists)
    const merged: Plaque = {
      id: String(basePlaque.id),
      title: basePlaque.title,
      subtitle: basePlaque.inscription || basePlaque.address,
      latitude: basePlaque.latitude,
      longitude: basePlaque.longitude,
      url: basePlaque.uri,
      addressOnly: basePlaque.address,
      inscriptionOnly: basePlaque.inscription,
      // Add OpenPlaques photos if enriched versions don't exist
      plaqueImageURL: enrichment?.plaqueImageURL || plaquePhoto?.thumbnail_url,
      siteImageURL: enrichment?.siteImageURL || sitePhoto?.thumbnail_url || photos[0]?.thumbnail_url,
      // Add enriched data if available (this will override the above if enrichment has these fields)
      ...enrichment
    }

    return merged
  } catch (error) {
    console.error('Error reading plaque data:', error)
    return null
  }
}

// Helper function to format name (capitalize properly)
function formatName(name: string | undefined): string {
  if (!name) return 'Unknown'

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
      <div className="min-h-screen">
        <div className="px-4 py-16">
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-bold text-gray-900">
              Plaque Not Found
            </h1>
            <p className="text-lg text-gray-600">
              Explore 2,000+ London blue plaques with the Legacy app.
            </p>
            <Link
              href="https://apps.apple.com/us/app/explore-london-legacy/id6754275366"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105"
            >
              Download Legacy App
            </Link>
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
    <div className="min-h-screen">
      <div className="px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900">
              {formattedName}
            </h1>
            {plaque.profession && (
              <p className="text-lg text-blue-600">
                {plaque.profession}
              </p>
            )}
            {lifespan && (
              <p className="text-sm text-gray-600">
                {lifespan}
              </p>
            )}
          </div>

          {/* Images - Horizontal Scroll */}
          <div className="overflow-x-auto">
            <div className="flex gap-3 pb-2">
              {/* Wikidata Portrait - First Image */}
              <WikidataPortrait
                name={plaque.title || 'Unknown'}
                className="w-52 h-52 object-cover flex-shrink-0"
              />
              {plaque.portraitImageURL && (
                <img
                  src={plaque.portraitImageURL}
                  alt={formattedName}
                  className="w-52 h-52 object-cover flex-shrink-0"
                  style={{ borderRadius: '24px' }}
                />
              )}
              {plaque.plaqueImageURL && (
                <img
                  src={plaque.plaqueImageURL}
                  alt="Blue Plaque"
                  className="w-52 h-52 object-cover flex-shrink-0"
                  style={{ borderRadius: '24px' }}
                />
              )}
              {plaque.siteImageURL && (
                <img
                  src={plaque.siteImageURL}
                  alt="Location"
                  className="w-52 h-52 object-cover flex-shrink-0"
                  style={{ borderRadius: '24px' }}
                />
              )}
            </div>
          </div>

          {/* Open in App CTA */}
          <div className="text-center">
            <Button asChild size="lg">
              <Link href={`legacy://plaque/${id}`}>
                Open in Legacy App
              </Link>
            </Button>
          </div>

          {/* Location Story */}
          {plaque.locationStory && (
            <div className="bg-white rounded-2xl p-6 space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">
                Connection to This Location
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {plaque.locationStory.length > 300
                  ? plaque.locationStory.slice(0, 300) + '...'
                  : plaque.locationStory}
              </p>
            </div>
          )}

          {/* Key Facts */}
          {plaque.keyFacts && plaque.keyFacts.length > 0 && (
            <div className="bg-white rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Key Facts
              </h2>
              <div className="space-y-3">
                {plaque.keyFacts.slice(0, 3).map((fact, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <p className="text-gray-700 flex-1">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fun Facts */}
          {plaque.funFacts && plaque.funFacts.length > 0 && (
            <div className="bg-white rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">✨</span>
                <h2 className="text-lg font-semibold text-gray-900">
                  Did You Know?
                </h2>
              </div>
              <div className="space-y-3">
                {plaque.funFacts.slice(0, 3).map((fact, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-yellow-600 font-semibold">
                      {index + 1}.
                    </span>
                    <p className="text-gray-700 flex-1">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Biography */}
          {plaque.biography && (
            <div className="bg-white rounded-2xl p-6 space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">
                About
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {plaque.biography.length > 400
                  ? plaque.biography.slice(0, 400) + '...'
                  : plaque.biography}
              </p>
            </div>
          )}

          {/* Address & Inscription */}
          {(plaque.addressOnly || plaque.inscriptionOnly) && (
            <div className="bg-white rounded-2xl p-6 space-y-3">
              {plaque.addressOnly && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Location
                  </h3>
                  <p className="text-gray-900">{plaque.addressOnly}</p>
                </div>
              )}
              {plaque.inscriptionOnly && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Inscription
                  </h3>
                  <p className="text-gray-900 italic">{plaque.inscriptionOnly}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
