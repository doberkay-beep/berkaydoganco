import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KAVRAMLAR, kavramSlug, kavramBul, ilgiliKavramlar } from "@/lib/sozluk";
import { sozSlug, KITAP_ADI } from "@/lib/sozler";
import { AUTHOR_REF } from "@/lib/site";

export const dynamic = "force-static";

const SITE = "https://www.berkaydogan.co";
const KITAP_SAYFA: Record<"mvk" | "tas", string> = {
  mvk: "/kitaplar/murekkep-ve-koz",
  tas: "/kitaplar/tasfiye",
};
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" };

export function generateStaticParams() {
  const gorulen = new Set<string>();
  const out: { terim: string }[] = [];
  for (const k of KAVRAMLAR) {
    const s = kavramSlug(k.ad);
    if (gorulen.has(s)) continue;
    gorulen.add(s);
    out.push({ terim: s });
  }
  return out;
}

export async function generateMetadata({ params }: { params: Promise<{ terim: string }> }): Promise<Metadata> {
  const { terim } = await params;
  const k = kavramBul(terim);
  if (!k) return {};
  const baslik = `${k.ad} nedir? — Berkay Doğan`;
  return {
    title: { absolute: baslik },
    description: k.tanim,
    alternates: { canonical: `/sozluk/${terim}` },
    openGraph: {
      title: `${k.ad} nedir?`,
      description: k.tanim,
      url: `${SITE}/sozluk/${terim}`,
      type: "article",
    },
  };
}

export default async function KavramPage({ params }: { params: Promise<{ terim: string }> }) {
  const { terim } = await params;
  const k = kavramBul(terim);
  if (!k) notFound();
  const ilgili = ilgiliKavramlar(k);
  const kitapYol = KITAP_SAYFA[k.k];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        name: k.ad,
        description: k.tanim,
        inLanguage: "tr",
        url: `${SITE}/sozluk/${terim}/`,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Berkay Doğan — Kavramlar Sözlüğü",
          url: `${SITE}/sozluk/`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Berkay Doğan", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Sözlük", item: `${SITE}/sozluk/` },
          { "@type": "ListItem", position: 3, name: k.ad, item: `${SITE}/sozluk/${terim}/` },
        ],
      },
    ],
  };

  return (
    <main style={{ maxWidth: "760px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>Berkay Doğan</Link>
        <Link href="/sozluk" style={{ ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← Sözlük</Link>
      </div>

      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", ...mono, letterSpacing: "0.26em", color: "var(--ink)" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />Kavram
      </span>
      <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(2.6rem, 7vw, 4.6rem)", letterSpacing: "-0.015em", lineHeight: 0.98, margin: "1.4rem 0 1.2rem", color: "var(--ink)" }}>{k.ad}</h1>
      <blockquote style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.3rem, 3vw, 1.9rem)", lineHeight: 1.5, color: "var(--ink)" }}>
        &ldquo;{k.tanim}&rdquo;
      </blockquote>

      <p style={{ marginTop: "1.6rem" }}>
        <Link href={kitapYol} style={{ ...mono, fontSize: "0.66rem", color: "var(--accent)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>
          {KITAP_ADI[k.k]}{k.p ? ` · s. ${k.p}` : ""}
        </Link>
        <Link href={`/soz/${sozSlug(k.tanim)}`} style={{ marginLeft: "1.2rem", ...mono, fontSize: "0.66rem", color: "var(--muted)" }}>
          bu cümlenin sayfası →
        </Link>
      </p>

      <section style={{ marginTop: "clamp(2.75rem, 7vh, 4.5rem)", borderTop: "1px solid var(--line)", paddingTop: "2rem" }}>
        <h2 style={{ ...mono, fontSize: "0.66rem", color: "var(--muted)", marginBottom: "1.2rem" }}>Diğer kavramlar</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
          {ilgili.map((o) => (
            <Link key={o.ad} href={`/sozluk/${kavramSlug(o.ad)}`}
              style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.9rem", color: "var(--ink)", border: "1px solid var(--line)", borderRadius: "100px", padding: "0.5rem 1rem" }}>
              {o.ad}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
