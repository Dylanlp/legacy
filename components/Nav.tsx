import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Nav() {
  return (
    <nav>
      <div className="px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/appicon.png"
                alt="Legacy"
                width={32}
                height={32}
                className="rounded-lg"
              />
            </Link>
            <Link
              href="/plaques"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Plaques
            </Link>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            <Button asChild size="sm">
              <Link href="https://apps.apple.com/us/app/explore-london-legacy/id6754275366">
                Download
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
