import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SOZLER, sozSlug, sozBul, KITAP_ADI, TEMA_ADI } from "@/lib/sozler";
import { SozAksiyon } from "@/components/SozAksiyon";

export const dynamic = "force-static";

const SITE = "https://www.berkaydogan.co";

export function generateStaticParams() {
  return SOZLER.map((x) => ({ slug: sozSlug(x.s) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const soz = sozBul(slug);
  if (!soz) return {};
  const kisa = soz.s.length > 60 ? soz.s.slice(0, 57) + "…" : soz.s;
  return {
    title: { absolute: `“${kisa}” — Berkay Doğan` },
    description: `Berkay Doğan, ${KITAP_ADI[soz.k]}${soz.p ? ` (s. ${soz.p})` : ""}: ${soz.s}`,
    alternates: { canonical: `/soz/${slug}` },
    openGraph: {
      title: `“${kisa}”`,
      description: `Berkay Doğan — ${KITAP_ADI[soz.k]}`,
      url: `${SITE}/soz/${slug}`,
      type: "article",
    },
  };
}

export default async function SozPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const soz = sozBul(slug);
  if (!soz) notFound();

  const idx = SOZLER.indexOf(soz);
  const onceki = SOZLER[(idx - 1 + SOZLER.length) % SOZLER.length];
  const sonraki = SOZLER[(idx + 1) % SOZLER.length];
  const kaynakMetni = `${KITAP_ADI[soz.k]}${soz.p ? `, s. ${soz.p}` : ""}`;
  const kitapSayfa = soz.k === "mvk" ? "/kitaplar/murekkep-ve-koz" : "/kitaplar/tasfiye";
  const gitKanal = soz.k === "mvk" ? "mvk-trendyol" : "trendyol";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quotation",
    text: soz.s,
    creator: { "@type": "Person", name: "Berkay Doğan", url: SITE },
    isPartOf: {
      "@type": "Book",
      name: KITAP_ADI[soz.k],
      author: { "@type": "Person", name: "Berkay Doğan" },
      url: `${SITE}${kitapSayfa}/`,
    },
    inLanguage: "tr",
    url: `${SITE}/soz/${slug}/`,
  };

  const kirintiLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Berkay Doğan", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Sözler", item: `${SITE}/sozler/` },
      { "@type": "ListItem", position: 3, name: soz.s.length > 60 ? `${soz.s.slice(0, 57)}…` : soz.s },
    ],
  };

  const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" };

  return (
    <main style={{ maxWidth: "760px", margin: "0 auto", minHeight: "100svh", display: "flex", flexDirection: "column", padding: "clamp(2.5rem, 6vh, 4rem) clamp(1.25rem, 5vw, 2rem) 4rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(kirintiLd) }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>Berkay Doğan</Link>
        <Link href="/sozler" style={{ ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← Tüm sözler</Link>
      </div>

      <article style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "3rem 0" }}>
        <span aria-hidden="true" style={{ display: "block", width: "84px", height: "3px", background: "var(--accent)", marginBottom: "2rem" }} />
        <blockquote style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: soz.s.length > 100 ? "clamp(1.5rem, 4vw, 2.3rem)" : "clamp(1.9rem, 5.5vw, 3.2rem)", lineHeight: 1.4, color: "var(--ink)", textWrap: "balance" as never }}>
          &ldquo;{soz.s}&rdquo;
        </blockquote>
        <p style={{ ...mono, color: "var(--accent)", marginTop: "1.75rem" }}>— Berkay Doğan</p>
        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "var(--muted)" }}>
          <Link href={kitapSayfa} style={{ color: "var(--muted)", borderBottom: "1px solid var(--line)" }}>{kaynakMetni}</Link>
        </p>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
          {soz.t.map((tema) => (
            <Link key={tema} href={`/tema/${tema}`} style={{ ...mono, fontSize: "0.62rem", color: "var(--muted)", border: "1px solid var(--line)", borderRadius: "100px", padding: "0.4rem 0.8rem" }}>
              {TEMA_ADI[tema]}
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "2.25rem" }}>
          <SozAksiyon soz={soz.s} kaynak={kaynakMetni} />
        </div>

        <a href={`/git/${gitKanal}/`} rel="noopener" style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: "0.6rem", marginTop: "2rem", padding: "1rem 1.3rem", border: "1px solid var(--line)", borderRadius: "12px", background: "var(--bg-2)" }}>
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.98rem", color: "var(--ink)" }}>Bu söz {KITAP_ADI[soz.k]}&apos;den — kitabı al</span>
          <span style={{ color: "var(--accent)" }} aria-hidden="true">→</span>
        </a>
      </article>

      <nav style={{ display: "flex", justifyContent: "space-between", gap: "1rem", borderTop: "1px solid var(--line)", paddingTop: "1.5rem" }} aria-label="Sözler arası gezinme">
        <Link href={`/soz/${sozSlug(onceki.s)}`} style={{ ...mono, fontSize: "0.68rem", color: "var(--muted)", maxWidth: "45%" }}>← önceki söz</Link>
        <Link href={`/soz/${sozSlug(sonraki.s)}`} style={{ ...mono, fontSize: "0.68rem", color: "var(--muted)", maxWidth: "45%", textAlign: "right" }}>sonraki söz →</Link>
      </nav>
    </main>
  );
}
