import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { Button } from '@/components/ui/button'

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
  wikidataProfileImage?: string
  biography?: string
  keyFacts?: string[]
  funFacts?: string[]
  relatedPlaqueIds?: string[]
  birthYear?: number
  deathYear?: number
  locationStory?: string
}

function formatName(name: string | undefined): string {
  if (!name) return 'Unknown'

  if (name.includes(',')) {
    const [lastName, firstName] = name.split(',').map(s => s.trim())
    return `${firstName} ${lastName}`
  }
  return name
}

async function getAllPlaques(): Promise<Plaque[]> {
  try {
    // Load both data files
    const basePath = path.join(process.cwd(), 'public', 'data', 'openplaques_uk.json')
    const enrichedPath = path.join(process.cwd(), 'public', 'data', 'plaques.json')

    const baseData = fs.readFileSync(basePath, 'utf8')
    const enrichedData = fs.readFileSync(enrichedPath, 'utf8')

    const basePlaques = JSON.parse(baseData)
    const enrichments = JSON.parse(enrichedData)

    // Filter for Central London plaques (lat 51.48-51.54, lon -0.18 to -0.08)
    const londonPlaques = basePlaques.filter((p: any) => {
      const lat = p.latitude
      const lon = p.longitude
      return lat && lon && lat >= 51.48 && lat <= 51.54 && lon >= -0.18 && lon <= -0.08
    })

    // Merge plaques with enrichments
    const plaques = londonPlaques.slice(0, 100).map((basePlaque: any) => {
      const enrichment = enrichments.find((e: any) =>
        e.id === String(basePlaque.id) || e.plaqueId === String(basePlaque.id)
      )

      // Extract photos from OpenPlaques data
      const photos = basePlaque.photos || []
      const plaquePhoto = photos.find((p: any) =>
        p.shot_name?.toLowerCase().includes('plaque') ||
        p.shot_name?.toLowerCase().includes('close')
      )

      return {
        id: String(basePlaque.id),
        title: basePlaque.title,
        subtitle: basePlaque.inscription || basePlaque.address,
        latitude: basePlaque.latitude,
        longitude: basePlaque.longitude,
        addressOnly: basePlaque.address,
        inscriptionOnly: basePlaque.inscription,
        plaqueImageURL: enrichment?.plaqueImageURL || plaquePhoto?.thumbnail_url,
        portraitImageURL: enrichment?.portraitImageURL,
        profession: enrichment?.profession,
        birthYear: enrichment?.birthYear,
        deathYear: enrichment?.deathYear,
        ...enrichment
      }
    })

    return plaques
  } catch (error) {
    console.error('Error loading plaques:', error)
    return []
  }
}

export default async function PlaquesIndexPage() {
  const plaques = await getAllPlaques()

  return (
    <div className="min-h-screen">
      <div className="px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            London Blue Plaques
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6">
          {plaques.map((plaque) => {
            const formattedName = formatName(plaque.title)
            const lifespan = (plaque.birthYear && plaque.deathYear)
              ? `${plaque.birthYear}-${plaque.deathYear}`
              : ''

            return (
              <Link
                key={plaque.id}
                href={`/plaque/${plaque.id}`}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden transition-all transform hover:scale-105">
                  {/* Image */}
                  {(plaque.wikidataProfileImage || plaque.portraitImageURL || plaque.plaqueImageURL) && (
                    <div className="aspect-square bg-gray-200 relative overflow-hidden">
                      <img
                        src={plaque.wikidataProfileImage || plaque.portraitImageURL || plaque.plaqueImageURL || ''}
                        alt={formattedName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {!(plaque.wikidataProfileImage || plaque.portraitImageURL || plaque.plaqueImageURL) && (
                    <div className="aspect-square bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-base line-clamp-2 mb-1">
                      {formattedName}
                    </h3>
                    {plaque.profession && (
                      <p className="text-sm text-blue-600 mb-1">
                        {plaque.profession}
                      </p>
                    )}
                    {lifespan && (
                      <p className="text-xs text-gray-500">
                        {lifespan}
                      </p>
                    )}
                    {plaque.addressOnly && (
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                        {plaque.addressOnly}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="https://apps.apple.com/us/app/explore-london-legacy/id6754275366">
              Download Legacy App
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Explore all 2,000+ plaques on the go
          </p>
        </div>
      </div>
    </div>
  )
}
