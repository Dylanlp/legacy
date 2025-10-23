import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Trophy, Route } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="secondary" className="mb-4">
            iOS App
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Discover London&apos;s
            <br />
            Hidden History
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore and collect 2000+ Blue Plaques across London. Turn your walks and runs into historical adventures.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <MapPin className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Interactive Map</CardTitle>
              <CardDescription>
                Browse 2000+ Blue Plaques across London with real-time location tracking and proximity alerts
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Trophy className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Collect & Track</CardTitle>
              <CardDescription>
                Automatically collect plaques when you&apos;re within 30 meters. Track your progress and discover new historical figures
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Route className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Running Routes</CardTitle>
              <CardDescription>
                Generate 5K or 10K routes that guide you through nearby unvisited plaques. History meets fitness
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Legacy. All rights reserved.</p>
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
