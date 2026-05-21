import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/layout/SmoothScrolling";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ui/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LuminaWeb AI | Freelance Web & AI Solutions",
  description: "Professional web development and AI integration services by LuminaWeb AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-black selection:text-white">
        <SmoothScrolling>
          <Navbar />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </SmoothScrolling>
      </body>
    </html>
  );
}
