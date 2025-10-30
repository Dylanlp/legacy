import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Nav() {
  return (
    <nav className="border-b bg-white dark:bg-gray-900">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/appicon.png"
              alt="Legacy"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Legacy
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/plaques"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Plaques
            </Link>
            <Button asChild size="sm">
              <Link href="https://apps.apple.com/us/app/explore-london-legacy/id6754275366">
                Download App
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
