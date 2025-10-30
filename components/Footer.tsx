import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="px-4 py-8">
        <div className="flex justify-between items-start">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Legacy</h3>
            <p className="text-sm text-gray-600">
              Discover and collect 2,000+ London Blue Plaques
            </p>
          </div>

          {/* Links */}
          <div>
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

        <div className="mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Legacy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
