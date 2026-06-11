import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Berkay Doğan — Tasfiye",
  description: "Yıkmak, kurmanın tek yoludur. 161 sayfalık bir varoluş infazına hoş geldiniz.",
  metadataBase: new URL("https://berkaydogan.co"),
  openGraph: {
    title: "Berkay Doğan — Tasfiye",
    description: "Yıkmak, kurmanın tek yoludur.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
