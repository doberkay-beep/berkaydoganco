import type { Metadata } from "next";
import Link from "next/link";
import { KITAPLAR } from "@/lib/kitaplar";

export const metadata: Metadata = {
  title: { absolute: "Kitaplar — Berkay Doğan" },
  description: "Berkay Doğan'ın kitapları: Tasfiye (deneme, 2026) ve Mürekkep ve Köz (şiir, 2025).",
  alternates: { canonical: "/kitaplar" },
  openGraph: {
    title: "Kitaplar — Berkay Doğan",
    description: "Tasfiye (deneme) ve Mürekkep ve Köz (şiir).",
    url: "https://www.berkaydogan.co/kitaplar",
    type: "website",
  },
};

export default function KitaplarPage() {
  return (
    <main style={{ maxWidth: "980px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.5rem, 6vw, 6rem) 6rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>Berkay Doğan</Link>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← berkaydogan.co</Link>
      </div>

      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--ink)" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />Kitaplar
      </span>
      <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(2.6rem, 7vw, 5rem)", letterSpacing: "-0.015em", lineHeight: 0.95, margin: "1.5rem 0 1rem", color: "var(--ink)" }}>Kitaplar</h1>

      <div className="kl-grid">
        {KITAPLAR.map((k) => (
          <Link key={k.slug} href={`/kitaplar/${k.slug}`} className="kl-card">
            <img src={k.kapak400} alt={`${k.ad} — kapak`} style={{ width: "100%", border: "1px solid var(--line)", display: "block" }} />
            <span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 3vw, 1.7rem)", color: "var(--ink)", marginTop: "1.1rem" }}>{k.ad}</span>
            <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginTop: "0.4rem" }}>{k.tur} · {k.cikis}</span>
          </Link>
        ))}
      </div>

      <style>{`
        .kl-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 380px)); gap: clamp(1.5rem, 5vw, 4rem); margin-top: clamp(2.5rem, 6vh, 4rem); }
        @media (max-width: 640px) { .kl-grid { grid-template-columns: 1fr; max-width: 340px; } }
        .kl-card { text-decoration: none; transition: transform 0.3s ease; }
        .kl-card:hover { transform: translateY(-4px); }
      `}</style>
    </main>
  );
}
