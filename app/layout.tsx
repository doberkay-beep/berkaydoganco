import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import "./yeni-dil.css";
import "./yazar-noir.css";
import { Analytics } from "@vercel/analytics/next";
import { SiteMenu } from "@/components/SiteMenu";

// Yazar-noir: tek aile, sıkı aralıklı grotesk. Eski değişken adları (--font-yazi,
// --font-baslik) yazar-noir.css'te buna bağlanır; eski bileşenler bozulmaz.
const sans = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-sans",
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
    <html lang="tr" data-theme="light" suppressHydrationWarning className={sans.variable}>
      <body>
        <a href="#main" className="skip-link">İçeriğe geç</a>
        <SiteMenu />
        <div id="main">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
