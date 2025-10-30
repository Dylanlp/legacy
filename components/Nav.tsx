import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  return (
    <nav className="bg-white dark:bg-gray-900">
      <div className="px-4">
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
            <Link href="https://apps.apple.com/us/app/explore-london-legacy/id6754275366">
              <Image
                src="/app-store-badge.svg"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
