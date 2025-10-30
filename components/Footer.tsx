import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white mt-auto">
      <div className="px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Legacy</h3>
            <p className="text-sm text-gray-600">
              Discover and collect 2,000+ London Blue Plaques
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/plaques"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Browse Plaques
                </Link>
              </li>
              <li>
                <Link
                  href="https://apps.apple.com/us/app/explore-london-legacy/id6754275366"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Download App
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">About</h4>
            <p className="text-sm text-gray-600 mb-3">
              Turn your walks and runs into historical adventures with interactive maps and route generation.
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Legacy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
