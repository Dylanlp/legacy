import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Trophy, Route } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="px-4 py-10 md:py-16 relative z-10">
        <div className="text-center space-y-5">
          <Image
            src="/appicon.png"
            alt="Legacy App Icon"
            width={80}
            height={80}
            className="mx-auto mb-4"
            priority
          />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Discover London&apos;s
            <br />
            Hidden History
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Explore and collect 1,625+ Blue Plaques across London. Turn your walks and runs into historical adventures.
          </p>
          <Link href="https://apps.apple.com/us/app/explore-london-legacy/id6754275366">
            <Image
              src="/app-store-badge.svg"
              alt="Download on the App Store"
              width={160}
              height={53}
              className="mx-auto hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-6 md:py-10 relative z-10">
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-0">
            <CardHeader>
              <CardTitle>Interactive Map</CardTitle>
              <CardDescription>
                Browse 1,625+ Blue Plaques across London with real-time location tracking and proximity alerts
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0">
            <CardHeader>
              <CardTitle>Collect & Track</CardTitle>
              <CardDescription>
                Automatically collect plaques when you&apos;re within 30 meters. Track your progress and discover new historical figures
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0">
            <CardHeader>
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
