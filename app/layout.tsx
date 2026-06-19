import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageTransition } from "@/components/PageTransition";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: "Berkay Doğan — Tasfiye",
    template: "%s — Berkay Doğan",
  },
  description: "Yıkmak, kurmanın tek yoludur. 161 sayfalık bir varoluş infazına hoş geldiniz. Berkay Doğan'ın resmi sitesi — şair ve yazar.",
  keywords: ["Berkay Doğan", "Tasfiye", "Mürekkep ve Köz", "Türk şiir", "şair", "yazar", "deneme kitabı", "İskenderiye Yayınları"],
  authors: [{ name: "Berkay Doğan" }],
  creator: "Berkay Doğan",
  metadataBase: new URL("https://berkaydogan.co"),
  alternates: {
    canonical: "/",
    languages: {
      tr: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "Berkay Doğan — Tasfiye",
    description: "Yıkmak, kurmanın tek yoludur. Şair ve yazar Berkay Doğan'ın resmi sitesi.",
    url: "https://berkaydogan.co",
    siteName: "berkaydogan.co",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Berkay Doğan — Tasfiye",
    description: "Yıkmak, kurmanın tek yoludur.",
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
    <html lang="tr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <Nav />
          <main><PageTransition>{children}</PageTransition></main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
