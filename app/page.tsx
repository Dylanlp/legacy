import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Trophy, Route } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32">
        <div className="text-center space-y-6">
          <Image
            src="/appicon.png"
            alt="Legacy App Icon"
            width={80}
            height={80}
            className="mx-auto mb-6"
            priority
          />
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
      <section className="px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
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
    </div>
  );
}
