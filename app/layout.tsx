import type { Metadata } from "next";
import { Libre_Caslon_Display, Libre_Caslon_Text, Libre_Franklin } from "next/font/google";
import "./globals.css";
import "./yeni-dil.css";
import "./yazar-noir.css";
import "./gazete.css";
import { Analytics } from "@vercel/analytics/next";
import { SiteMenu } from "@/components/SiteMenu";
import { TEMA_BETIGI } from "@/lib/tema";

// Gazete: manşet Libre Caslon Display, metin Libre Caslon Text, künye ve menü Libre Franklin.
// Eski bileşenler --font-sans'a bağlı; o değişken artık metin yazısını taşır (gazete.css).
const manset = Libre_Caslon_Display({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-manset", display: "swap" });
const metin = Libre_Caslon_Text({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});
const kunye = Libre_Franklin({ subsets: ["latin", "latin-ext"], weight: ["400", "600"], variable: "--font-etiket", display: "swap" });

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
    <html lang="tr" data-theme="light" suppressHydrationWarning className={`${manset.variable} ${metin.variable} ${kunye.variable}`}>
      <head>
        {/* Tema ilk boyamadan önce: kayıtlı seçim > sistem tercihi > aydınlık */}
        <script dangerouslySetInnerHTML={{ __html: TEMA_BETIGI }} />
      </head>
      <body>
        <a href="#main" className="skip-link">İçeriğe geç</a>
        <SiteMenu />
        <div id="main">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
