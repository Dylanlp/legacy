import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Mail } from "lucide-react";

export const metadata = {
  title: "Support - Legacy",
  description: "Get support for Legacy iOS app",
};

export default function Support() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-4">
              Support
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Support</h1>
            <p className="text-muted-foreground">Need help with Legacy? We&apos;re here to assist you.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Have questions, feedback, or need assistance? Get in touch with us.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href="mailto:contact@dy-lan.com"
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  contact@dy-lan.com
                </a>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-3">Common Topics</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Bug reports and technical issues</li>
                  <li>• Feature requests and suggestions</li>
                  <li>• Questions about Blue Plaques data</li>
                  <li>• Privacy and data concerns</li>
                  <li>• General feedback</li>
                </ul>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-muted-foreground">
                  We typically respond to inquiries within 24-48 hours during business days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
