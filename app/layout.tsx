import type { Metadata } from "next";
import { Instrument_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { MurekkepIz } from "@/components/MurekkepIz";

// UI / etiket / buton — zarif modern sans (CSS değişkeni tarihsel olarak --font-grotesk)
const grotesk = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
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

// OG/twitter görselleri app/opengraph-image.tsx + app/twitter-image.tsx tarafından üretilir.

export const metadata: Metadata = {
  title: {
    default: "Berkay Doğan | Şair & Yazar",
    template: "%s — Berkay Doğan",
  },
  description: "Berkay Doğan — İstanbul'da yaşayan şair ve yazar. Kitaplar: Mürekkep ve Köz ile Tasfiye.",
  keywords: ["Berkay Doğan", "şair", "yazar", "İstanbul", "Tasfiye", "Mürekkep ve Köz", "Türk şiiri", "Türk edebiyatı"],
  authors: [{ name: "Berkay Doğan" }],
  creator: "Berkay Doğan",
  metadataBase: new URL("https://www.berkaydogan.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Berkay Doğan — Şair & Yazar",
    description: "İstanbul'da yaşayan şair ve yazar. Kitaplar: Mürekkep ve Köz ile Tasfiye.",
    url: "https://www.berkaydogan.co",
    siteName: "berkaydogan.co",
    locale: "tr_TR",
    alternateLocale: ["en_US", "fr_FR"],
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
    <html lang="tr" data-theme="dark" suppressHydrationWarning className={`${grotesk.variable} ${fraunces.variable}`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('bd-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();",
          }}
        />
        {children}
        <MurekkepIz />
        <Analytics />
      </body>
    </html>
  );
}
