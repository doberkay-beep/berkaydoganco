import type { Metadata } from "next";
import Link from "next/link";
import KozTakvimi from "@/components/KozTakvimi";

export const metadata: Metadata = {
  title: { absolute: "Köz Takvimi — Her Güne Bir Söz" },
  description: "Berkay Doğan'dan her güne bir söz — 200 sözlük döngü. Bugünün sözünü gör, kartını indir, paylaş.",
  alternates: { canonical: "/takvim" },
  openGraph: {
    title: "Köz Takvimi — Her Güne Bir Söz",
    description: "Her güne bir söz — 200 sözlük döngü.",
    url: "https://www.berkaydogan.co/takvim",
    type: "website",
  },
};

export default function TakvimPage() {
  return (
    <main style={{ minHeight: "100svh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "980px", margin: "0 auto", padding: "1.5rem clamp(1.25rem, 4vw, 3.25rem) 0", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>Berkay Doğan</Link>
        <Link href="/sozler" style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← Tüm sözler</Link>
      </div>
      <div style={{ maxWidth: "980px", margin: "2rem auto 0", padding: "0 clamp(1.25rem, 4vw, 3.25rem)" }}>
        <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.2rem, 6vw, 3.6rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--ink)" }}>Köz Takvimi</h1>
      </div>
      <KozTakvimi />
    </main>
  );
}
