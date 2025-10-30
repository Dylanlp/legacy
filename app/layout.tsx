import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
// import PainterlyBackground from "@/components/PainterlyBackground";
import CloudySkyBackground from "@/components/CloudySkyBackground";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Legacy - Discover London's Blue Plaques",
  description: "Explore and collect 1,625+ Blue Plaques across London. Turn your walks and runs into historical adventures with interactive maps and route generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${geist.variable} font-sans antialiased flex flex-col min-h-screen bg-white`}
      >
        <CloudySkyBackground />
        <div
          className="fixed inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: 'url(/paper-texture.jpeg)',
            backgroundRepeat: 'repeat',
            backgroundSize: '400px 400px',
            opacity: 0.15,
            zIndex: 1
          }}
        />
        <div className="max-w-2xl mx-auto w-full relative z-10">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
