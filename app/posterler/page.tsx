import type { Metadata } from "next";
import Link from "next/link";
import { POSTERLER } from "@/lib/posterler";
import { Muhur } from "@/components/Muhur";

export const metadata: Metadata = {
  title: { absolute: "Posterler — Berkay Doğan" },
  description: "Berkay Doğan'ın sözlerinden 12 basılabilir A4 poster — ücretsiz indir, yazdır, duvarına as.",
  alternates: { canonical: "/posterler" },
  openGraph: {
    title: "Posterler — Berkay Doğan",
    description: "12 basılabilir söz posteri — ücretsiz PDF.",
    url: "https://www.berkaydogan.co/posterler",
    type: "website",
  },
};

const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" };

export default function PosterlerPage() {
  return (
    <main style={{ maxWidth: "1020px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>Berkay Doğan</Link>
        <Link href="/sozler" style={{ ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← Sözler</Link>
      </div>

      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", ...mono, letterSpacing: "0.26em", color: "var(--ink)" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />Posterler
      </span>
      <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.4rem, 6.5vw, 4.4rem)", letterSpacing: "-0.04em", lineHeight: 0.95, margin: "1.5rem 0 1rem", color: "var(--ink)" }}>Duvarına as</h1>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.15rem, 2.4vw, 1.6rem)", color: "var(--muted)", maxWidth: "44ch" }}>
        12 söz, basılabilir A4 poster olarak — ücretsiz. Vektör metin: A3&apos;e büyütsen de keskin kalır.
      </p>

      <div className="ps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "1.25rem", marginTop: "clamp(2.5rem, 6vh, 4rem)" }}>
        {POSTERLER.map((p) => (
          <a key={p.dosya} href={`/posterler/${p.dosya}.pdf`} download
            style={{ display: "flex", flexDirection: "column", border: "1px solid var(--line)", borderRadius: "10px", overflow: "hidden", background: "var(--bg-2)", transition: "transform 0.3s ease, border-color 0.3s ease" }}>
            {/* Mini önizleme — posterin canlı CSS kopyası */}
            <span aria-hidden="true" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", aspectRatio: "210 / 297", background: "#0b0a09", padding: "1.4rem 1rem", textAlign: "center" }}>
              <span style={{ width: "34px", height: "2px", background: "#E5402A" }} />
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: p.s.length > 40 ? "0.82rem" : "1.02rem", lineHeight: 1.4, color: "#F1EDE4", maxWidth: "20ch" }}>&ldquo;{p.s}&rdquo;</span>
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
                <Muhur size={20} style={{ color: "#F1EDE4" }} />
                <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "0.5rem", letterSpacing: "0.24em", color: "#E5402A" }}>BERKAY DOĞAN</span>
              </span>
            </span>
            <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.8rem 1rem" }}>
              <span style={{ ...mono, fontSize: "0.58rem", color: "var(--muted)" }}>{p.kaynak}</span>
              <span style={{ ...mono, fontSize: "0.62rem", color: "var(--accent)" }}>PDF ↓</span>
            </span>
          </a>
        ))}
      </div>

      <p style={{ marginTop: "2.5rem", fontSize: "0.85rem", color: "var(--muted)", maxWidth: "60ch", lineHeight: 1.7 }}>
        Kişisel kullanım için serbesttir — yazdır, as, hediye et. Paylaşırken <Link href="/" style={{ color: "var(--accent)" }}>berkaydogan.co</Link>&apos;yu anman yeter.
      </p>
    </main>
  );
}
