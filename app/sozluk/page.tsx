import type { Metadata } from "next";
import Link from "next/link";
import { KAVRAMLAR, kavramSlug } from "@/lib/sozluk";
import { KITAP_ADI } from "@/lib/sozler";
import { RastgeleKavram } from "@/components/RastgeleKavram";
import { Reveal } from "@/components/Kabuk";

export const metadata: Metadata = {
  title: { absolute: "Kavramlar Sözlüğü — Berkay Doğan" },
  description: "Tasfiye nedir? Özgürlük, kimlik, yalnızlık… Berkay Doğan'ın kitaplarındaki anahtar kavramlar, yazarın kendi tanım cümleleriyle.",
  alternates: { canonical: "/sozluk" },
  openGraph: {
    title: "Kavramlar Sözlüğü — Berkay Doğan",
    description: "Kitaplardaki anahtar kavramlar, yazarın kendi cümleleriyle.",
    url: "https://www.berkaydogan.co/sozluk",
    type: "website",
  },
};

const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" };

export default function SozlukPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Berkay Doğan — Kavramlar Sözlüğü",
    url: "https://www.berkaydogan.co/sozluk/",
    hasDefinedTerm: KAVRAMLAR.map((k) => ({
      "@type": "DefinedTerm",
      name: k.ad,
      description: k.tanim,
    })),
  };

  return (
    <main style={{ maxWidth: "820px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>Berkay Doğan</Link>
        <Link href="/sozler" style={{ ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← Sözler</Link>
      </div>

      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", ...mono, letterSpacing: "0.26em", color: "var(--ink)" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />Sözlük
      </span>
      <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(2.4rem, 6.5vw, 4.4rem)", letterSpacing: "-0.015em", lineHeight: 0.95, margin: "1.5rem 0 1rem", color: "var(--ink)" }}>Kavramlar Sözlüğü</h1>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.15rem, 2.4vw, 1.6rem)", color: "var(--muted)", maxWidth: "44ch" }}>
        Kitaplardaki anahtar kavramlar — sözlük tanımıyla değil, yazarın kendi cümlesiyle.
      </p>
      <div style={{ marginTop: "1.5rem" }}>
        <RastgeleKavram slugs={KAVRAMLAR.map((k) => kavramSlug(k.ad))} />
      </div>

      <Reveal as="section" style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {KAVRAMLAR.map((kv) => (
            <Link key={kv.ad} href={`/sozluk/${kavramSlug(kv.ad)}`} className="glass-card" style={{ display: "block", padding: "1.4rem 1.5rem", color: "var(--ink)" }}>
              <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.02em", color: "var(--accent-2)" }}>{kv.ad}</span>
              <span style={{ display: "block", margin: "0.7rem 0 0", fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.5, color: "var(--ink)" }}>
                &ldquo;{kv.tanim}&rdquo;
              </span>
              <span style={{ display: "block", marginTop: "0.85rem", ...mono, fontSize: "0.58rem", color: "var(--muted)" }}>
                {KITAP_ADI[kv.k]}{kv.p ? ` · s. ${kv.p}` : ""}
              </span>
            </Link>
          ))}
        </div>
      </Reveal>
    </main>
  );
}
