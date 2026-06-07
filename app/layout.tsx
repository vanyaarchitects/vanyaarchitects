import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import JsonLd from "@/components/JsonLd";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Analytics } from "@vercel/analytics/react";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | VANYA Architecture",
    default: "VANYA Architecture | Luxury Architecture Studio",
  },
  description:
    "VANYA Architecture is a luxury architectural design studio crafting spaces that tell a story, celebrate identity, and shape sustainable legacies through functional and thoughtful design.",
  metadataBase: new URL("https://vanyaarchitecture.com"),
  openGraph: {
    title: "VANYA Architecture | Luxury Architecture Studio",
    description:
      "Crafting spaces that tell a story, celebrate identity, and shape sustainable legacies through functional and thoughtful design.",
    url: "https://vanyaarchitecture.com",
    siteName: "VANYA Architecture",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VANYA Architecture | Luxury Architecture Studio",
    description:
      "Crafting spaces that tell a story, celebrate identity, and shape sustainable legacies through functional and thoughtful design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${cormorant.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CustomCursor />
        <JsonLd />
        <Navbar />
        <main className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
