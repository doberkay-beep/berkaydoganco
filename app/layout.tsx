import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";
import "./yeni-dil.css";
import { Analytics } from "@vercel/analytics/next";
import { MurekkepIz } from "@/components/MurekkepIz";
import GlassHover from "@/components/GlassHover";
import { SiteMenu } from "@/components/SiteMenu";

// Tek yazı ailesi: müze kataloğu gibi. CSS değişkenleri eski adlarıyla kalır.
const yazi = Newsreader({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-yazi",
  display: "swap",
});

// OG/twitter görselleri app/opengraph-image.tsx + app/twitter-image.tsx tarafından üretilir.

export const metadata: Metadata = {
  title: {
    default: "Berkay Doğan | Şair & Yazar",
    template: "%s — Berkay Doğan",
  },
  description: "Berkay Doğan — İstanbul'da yaşayan şair ve yazar; Mürekkep ve Köz (şiir, 2025) ve Tasfiye (deneme, 2026) kitaplarının yazarı, nowby radyosunun kurucusu.",
  keywords: ["Berkay Doğan", "şair", "yazar", "İstanbul", "Tasfiye", "Mürekkep ve Köz", "Türk şiiri", "Türk edebiyatı"],
  authors: [{ name: "Berkay Doğan" }],
  creator: "Berkay Doğan",
  metadataBase: new URL("https://www.berkaydogan.co"),
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "Berkay Doğan — Yazılar" }] },
  },
  openGraph: {
    title: "Berkay Doğan — Şair & Yazar",
    description: "İstanbul'da yaşayan şair ve yazar; Mürekkep ve Köz (şiir, 2025) ve Tasfiye (deneme, 2026) kitaplarının yazarı, nowby radyosunun kurucusu.",
    url: "https://www.berkaydogan.co",
    siteName: "berkaydogan.co",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Berkay Doğan — Şair & Yazar",
    description: "Kitaplar: Mürekkep ve Köz ile Tasfiye.",
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
    <html lang="tr" data-theme="light" suppressHydrationWarning className={yazi.variable}>
      <body>
        <a href="#main" className="skip-link">İçeriğe geç</a>
        <div className="aurora" aria-hidden="true" />
        <SiteMenu />
        <div id="main">{children}</div>
        <MurekkepIz />
        <GlassHover />
        <Analytics />
      </body>
    </html>
  );
}
