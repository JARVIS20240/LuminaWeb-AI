import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/layout/SmoothScrolling";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ui/ChatWidget";
import PageTransition from "@/components/ui/PageTransition";
import ScrollRestoration from "@/components/utilities/ScrollRestoration";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://luminaweb.ai"),
  title: {
    template: "%s | LuminaWeb AI",
    default: "LuminaWeb AI | Freelance Web & AI Solutions",
  },
  description: "Professional web development, branding, SEO marketing, and AI integration services by LuminaWeb AI.",
  keywords: ["Web Development", "AI Integration", "Freelance", "Branding", "SEO Marketing", "Next.js", "React"],
  authors: [{ name: "Karan Mistry", url: "https://luminaweb.ai" }],
  openGraph: {
    title: "LuminaWeb AI | Freelance Web & AI Solutions",
    description: "Professional web development, branding, SEO marketing, and AI integration services.",
    url: "https://luminaweb.ai",
    siteName: "LuminaWeb AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuminaWeb AI | Freelance Web & AI Solutions",
    description: "Professional web development and AI integration services.",
    creator: "@karanmistry",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-foreground selection:text-background bg-background text-foreground">
        <SmoothScrolling>
          <ScrollRestoration />
          <Navbar />
          <PageTransition />
          <main className="flex-grow flex flex-col relative overflow-hidden">
            {children}
            {/* Global Bottom Viewport Blur - Sticky so it scrolls away when reaching footer */}
            <div className="sticky bottom-0 w-full h-20 z-[40] pointer-events-none backdrop-blur-[20px] bg-background/15 [mask-image:linear-gradient(to_top,white_10%,transparent_90%)] [-webkit-mask-image:linear-gradient(to_top,white_10%,transparent_90%)] mt-auto -mb-20" />
          </main>
          <Footer />
          <ChatWidget />
        </SmoothScrolling>
      </body>
    </html>
  );
}
