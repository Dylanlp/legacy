import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Read the plaques data file
    const filePath = path.join(process.cwd(), 'public', 'data', 'plaques.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const plaques: Plaque[] = JSON.parse(fileContents)

    // Find the plaque by ID
    const plaque = plaques.find((p) => p.id === id || p.plaqueId === id)

    if (!plaque) {
      return NextResponse.json(
        { error: 'Plaque not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(plaque)
  } catch (error) {
    console.error('Error fetching plaque:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
