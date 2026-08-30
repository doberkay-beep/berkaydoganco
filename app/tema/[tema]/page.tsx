import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SOZLER, sozSlug, KITAP_ADI, TEMA_ADI, TEMALAR } from "@/lib/sozler";

export const dynamic = "force-static";

export function generateStaticParams() {
  return TEMALAR.map((tema) => ({ tema }));
}

export async function generateMetadata({ params }: { params: Promise<{ tema: string }> }): Promise<Metadata> {
  const { tema } = await params;
  const ad = TEMA_ADI[tema];
  if (!ad) return {};
  const sayi = SOZLER.filter((x) => x.t.includes(tema)).length;
  return {
    title: { absolute: `${ad} Sözleri — Berkay Doğan` },
    description: `Berkay Doğan'dan ${ad.toLocaleLowerCase("tr")} üzerine ${sayi} söz — Mürekkep ve Köz ile Tasfiye kitaplarından.`,
    alternates: { canonical: `/tema/${tema}` },
    openGraph: {
      title: `${ad} Sözleri — Berkay Doğan`,
      description: `${ad} üzerine ${sayi} söz.`,
      url: `https://www.berkaydogan.co/tema/${tema}`,
      type: "website",
    },
  };
}

const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" };

export default async function TemaPage({ params }: { params: Promise<{ tema: string }> }) {
  const { tema } = await params;
  const ad = TEMA_ADI[tema];
  if (!ad) notFound();
  const liste = SOZLER.filter((x) => x.t.includes(tema));

  return (
    <main style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>Berkay Doğan</Link>
        <Link href="/sozler" style={{ ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← Tüm sözler</Link>
      </div>

      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", ...mono, letterSpacing: "0.26em", color: "var(--ink)" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />Tema
      </span>
      <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.2rem, 6vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 0.98, margin: "1.5rem 0 1rem", color: "var(--ink)" }}>{ad}</h1>
      <p style={{ ...mono, fontSize: "0.68rem", color: "var(--muted)" }}>{liste.length} söz</p>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", margin: "1.75rem 0 0" }}>
        {TEMALAR.filter((x) => x !== tema).map((x) => (
          <Link key={x} href={`/tema/${x}`} style={{ ...mono, fontSize: "0.62rem", color: "var(--muted)", border: "1px solid var(--line)", borderRadius: "100px", padding: "0.4rem 0.8rem" }}>{TEMA_ADI[x]}</Link>
        ))}
      </div>

      <section style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)" }}>
        {liste.map((soz, i) => (
          <Link key={i} href={`/soz/${sozSlug(soz.s)}`} style={{ display: "block", padding: "1.15rem 0", borderTop: "1px solid var(--line)" }}>
            <span style={{ display: "block", fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.02rem, 2.2vw, 1.25rem)", lineHeight: 1.5, color: "var(--ink)" }}>&ldquo;{soz.s}&rdquo;</span>
            <span style={{ display: "block", marginTop: "0.4rem", ...mono, fontSize: "0.6rem", color: "var(--muted)" }}>{KITAP_ADI[soz.k]}{soz.p ? ` · s. ${soz.p}` : ""}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
