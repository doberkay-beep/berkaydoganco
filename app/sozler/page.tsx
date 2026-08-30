import type { Metadata } from "next";
import Link from "next/link";
import { SOZLER, sozSlug, KITAP_ADI, TEMA_ADI, TEMALAR } from "@/lib/sozler";

export const metadata: Metadata = {
  title: { absolute: "Berkay Doğan Sözleri — 200 Söz" },
  description: "Berkay Doğan'ın Mürekkep ve Köz ile Tasfiye kitaplarından 200 söz — temalara göre: umut, yalnızlık, aşk, özgürlük, kimlik, yüzleşme ve daha fazlası.",
  alternates: { canonical: "/sozler" },
  openGraph: {
    title: "Berkay Doğan Sözleri",
    description: "İki kitaptan 200 söz — her birinin kendi sayfası ve paylaşım kartı.",
    url: "https://www.berkaydogan.co/sozler",
    type: "website",
  },
};

const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" };

export default function SozlerPage() {
  return (
    <main style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>Berkay Doğan</Link>
        <Link href="/" style={{ ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← berkaydogan.co</Link>
      </div>

      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", ...mono, letterSpacing: "0.26em", color: "var(--ink)" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />Sözler
      </span>
      <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.6rem, 7vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.95, margin: "1.5rem 0 1rem", color: "var(--ink)" }}>200 söz</h1>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.15rem, 2.4vw, 1.6rem)", color: "var(--muted)", maxWidth: "44ch" }}>
        İki kitaptan, sayfa sayfa seçildi. Her sözün kendi sayfası, kendi kartı var — tıkla, indir, paylaş.
      </p>

      {/* Tema çipleri */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", margin: "2.25rem 0 0" }}>
        <Link href="/takvim" style={{ ...mono, fontSize: "0.66rem", color: "var(--accent-ink)", background: "var(--accent)", borderRadius: "100px", padding: "0.5rem 0.95rem" }}>Bugünün sözü →</Link>
        <Link href="/posterler" style={{ ...mono, fontSize: "0.66rem", color: "var(--muted)", border: "1px solid var(--line)", borderRadius: "100px", padding: "0.5rem 0.95rem" }}>Posterler</Link>
        <Link href="/gom" style={{ ...mono, fontSize: "0.66rem", color: "var(--muted)", border: "1px solid var(--line)", borderRadius: "100px", padding: "0.5rem 0.95rem" }}>Sitene göm</Link>
        {TEMALAR.map((tema) => (
          <Link key={tema} href={`/tema/${tema}`} style={{ ...mono, fontSize: "0.66rem", color: "var(--muted)", border: "1px solid var(--line)", borderRadius: "100px", padding: "0.5rem 0.95rem" }}>
            {TEMA_ADI[tema]}
          </Link>
        ))}
      </div>

      <section style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)" }}>
        {SOZLER.map((soz, i) => (
          <Link key={i} href={`/soz/${sozSlug(soz.s)}`} style={{ display: "block", padding: "1.15rem 0", borderTop: "1px solid var(--line)" }}>
            <span style={{ display: "block", fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.02rem, 2.2vw, 1.25rem)", lineHeight: 1.5, color: "var(--ink)" }}>&ldquo;{soz.s}&rdquo;</span>
            <span style={{ display: "block", marginTop: "0.4rem", ...mono, fontSize: "0.6rem", color: "var(--muted)" }}>{KITAP_ADI[soz.k]}{soz.p ? ` · s. ${soz.p}` : ""}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
