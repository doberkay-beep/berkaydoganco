import type { Metadata } from "next";
import { Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

// UI / başlık / etiket — modern grotesk (CSS'te var(--font-grotesk))
const grotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

// Edebi vurgu — yumuşak yüksek kontrastlı serif (CSS'te var(--font-serif))
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Berkay Doğan — Poet & Writer",
};

export const metadata: Metadata = {
  title: {
    default: "Berkay Doğan | Poet & Writer",
    template: "%s — Berkay Doğan",
  },
  description: "Berkay Doğan — poet and writer based in Istanbul. Writing is the quietest confession of existence. Books: Ink and Ember, Tasfiye.",
  keywords: ["Berkay Doğan", "poet", "writer", "Istanbul", "Tasfiye", "Ink and Ember", "Mürekkep ve Köz", "Turkish poetry"],
  authors: [{ name: "Berkay Doğan" }],
  creator: "Berkay Doğan",
  metadataBase: new URL("https://berkaydogan.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Berkay Doğan — Poet & Writer",
    description: "Poet and writer based in Istanbul. Writing is the quietest confession of existence.",
    url: "https://berkaydogan.co",
    siteName: "berkaydogan.co",
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Berkay Doğan — Poet & Writer",
    description: "Writing is the quietest confession of existence.",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${fraunces.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
