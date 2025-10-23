import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - Legacy",
  description: "Privacy policy for Legacy iOS app",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-4">
              Privacy Policy
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Our Commitment to Your Privacy</CardTitle>
              <CardDescription>
                Legacy is committed to protecting your privacy. This policy explains our data practices.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">No Data Collection</h3>
                <p className="text-muted-foreground">
                  Legacy does not collect, store, or transmit any personal data. All information remains on your device.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Location Data</h3>
                <p className="text-muted-foreground">
                  The app uses your device&apos;s location services to show nearby Blue Plaques and enable auto-collection features.
                  Location data is processed entirely on your device and is never sent to our servers or third parties.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Local Storage</h3>
                <p className="text-muted-foreground">
                  Your collection progress and preferences are stored locally on your device using standard iOS storage mechanisms.
                  This data remains private and under your control.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">No Analytics or Tracking</h3>
                <p className="text-muted-foreground">
                  We do not use any analytics services, tracking tools, or advertising networks. Your usage of the app is completely private.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Third-Party Services</h3>
                <p className="text-muted-foreground">
                  The app fetches Blue Plaque data from public sources (ArcGIS Feature Server and English Heritage) but does not share any information about you with these services.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Data Deletion</h3>
                <p className="text-muted-foreground">
                  You can delete all app data at any time by using the reset function within the app or by uninstalling the app from your device.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Changes to This Policy</h3>
                <p className="text-muted-foreground">
                  We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated date.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Contact</h3>
                <p className="text-muted-foreground">
                  If you have any questions about this privacy policy, please contact us through our GitHub repository.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
