import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

// Başlıklar: Cormorant Garamond (300/400 + italik) — CSS'te var(--font-grotesk)
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// Metin/etiket: JetBrains Mono (300/400) — CSS'te var(--font-mono)
const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-jetbrains",
  display: "swap",
});

const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Berkay Doğan — Tasfiye",
};

export const metadata: Metadata = {
  title: {
    default: "Berkay Doğan | Şair & Yazar — Tasfiye, Mürekkep ve Köz",
    template: "%s — Berkay Doğan",
  },
  description: "Yıkmak, kurmanın tek yoludur. 161 sayfalık bir varoluş infazına hoş geldiniz. Berkay Doğan'ın resmi sitesi — şair ve yazar.",
  keywords: ["Berkay Doğan", "Tasfiye", "Mürekkep ve Köz", "Türk şiir", "şair", "yazar", "deneme kitabı", "İskenderiye Yayınları"],
  authors: [{ name: "Berkay Doğan" }],
  creator: "Berkay Doğan",
  metadataBase: new URL("https://berkaydogan.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Berkay Doğan — Şair, Yazar",
    description: "Trajedilere elveda deyip, dinginliğin zuhur etmesi. Şair ve yazar Berkay Doğan'ın resmi sitesi.",
    url: "https://berkaydogan.co",
    siteName: "berkaydogan.co",
    locale: "tr_TR",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Berkay Doğan — Tasfiye",
    description: "Yıkmak, kurmanın tek yoludur.",
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
    <html lang="tr" className={`${cormorant.variable} ${jetbrains.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
