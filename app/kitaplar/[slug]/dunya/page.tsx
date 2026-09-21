import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KITAPLAR } from "@/lib/kitaplar";
import { SOZLER, sozSlug, TEMA_ADI } from "@/lib/sozler";
import { KAVRAMLAR, kavramSlug } from "@/lib/sozluk";
import { AUTHOR_REF } from "@/lib/site";

export const dynamic = "force-static";

const SITE = "https://www.berkaydogan.co";
// Kitap slug'ı → söz/kavram korpusundaki kod.
const KOD: Record<string, "mvk" | "tas"> = { "murekkep-ve-koz": "mvk", tasfiye: "tas" };
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" };

export function generateStaticParams() {
  return KITAPLAR.filter((k) => KOD[k.slug]).map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const k = KITAPLAR.find((x) => x.slug === slug);
  if (!k || !KOD[slug]) return {};
  return {
    title: { absolute: `${k.ad}: İç Dünya — Berkay Doğan` },
    description: `${k.ad} kitabının iç dünyası: sözleri, kavramları ve temaları tek bir gezilebilir haritada.`,
    alternates: { canonical: `/kitaplar/${slug}/dunya` },
    openGraph: {
      title: `${k.ad}: İç Dünya`,
      description: `${k.ad} — sözler, kavramlar, temalar bir arada.`,
      url: `${SITE}/kitaplar/${slug}/dunya`,
      type: "website",
    },
  };
}

export default async function DunyaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kitap = KITAPLAR.find((x) => x.slug === slug);
  const kod = KOD[slug];
  if (!kitap || !kod) notFound();

  const sozler = SOZLER.filter((x) => x.k === kod);
  const kavramlar = KAVRAMLAR.filter((x) => x.k === kod);

  const temaSay = new Map<string, number>();
  for (const s of sozler) for (const t of s.t) temaSay.set(t, (temaSay.get(t) || 0) + 1);
  const temalar = [...temaSay.entries()].sort((a, b) => b[1] - a[1]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Book",
        name: kitap.ad,
        author: AUTHOR_REF,
        inLanguage: "tr",
        genre: kitap.tur,
        url: `${SITE}/kitaplar/${slug}/`,
        ...(kitap.isbn ? { isbn: kitap.isbn } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Berkay Doğan", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Kitaplar", item: `${SITE}/kitaplar/` },
          { "@type": "ListItem", position: 3, name: kitap.ad, item: `${SITE}/kitaplar/${slug}/` },
          { "@type": "ListItem", position: 4, name: "İç Dünya", item: `${SITE}/kitaplar/${slug}/dunya/` },
        ],
      },
    ],
  };

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(2.5rem, 7vh, 4rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>Berkay Doğan</Link>
        <Link href={`/kitaplar/${slug}`} style={{ ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← {kitap.ad}</Link>
      </div>

      {/* Hero */}
      <div style={{ display: "flex", gap: "clamp(1.5rem, 4vw, 3rem)", alignItems: "flex-start", flexWrap: "wrap" }}>
        <img src={kitap.kapak400 ?? kitap.kapak} alt={`${kitap.ad} — kapak`} loading="lazy" decoding="async"
          style={{ width: "150px", borderRadius: "4px", boxShadow: "0 20px 44px rgba(0,0,0,0.45)", border: "1px solid var(--line)" }} />
        <div style={{ flex: 1, minWidth: "260px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", ...mono, letterSpacing: "0.24em", color: "var(--ink)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)" }} />İç Dünya
          </span>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(2.2rem, 6vw, 3.8rem)", letterSpacing: "-0.015em", lineHeight: 1, margin: "1rem 0 0.8rem", color: "var(--ink)" }}>{kitap.ad}</h1>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)", color: "var(--muted)", lineHeight: 1.5, maxWidth: "42ch" }}>{kitap.desc}</p>
          <p style={{ ...mono, fontSize: "0.68rem", color: "var(--muted)", marginTop: "1.2rem" }}>
            {sozler.length} söz · {kavramlar.length} kavram · {temalar.length} tema · {kitap.tur}
          </p>
        </div>
      </div>

      {/* Temalar */}
      {temalar.length > 0 && (
        <section style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)", borderTop: "1px solid var(--line)", paddingTop: "2rem" }}>
          <h2 style={{ ...mono, fontSize: "0.66rem", color: "var(--muted)", marginBottom: "1.2rem" }}>Duygu haritası</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {temalar.map(([t, n]) => (
              <Link key={t} href={`/tema/${t}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-grotesk)", fontSize: "0.9rem", color: "var(--ink)", border: "1px solid var(--line)", borderRadius: "100px", padding: "0.5rem 1rem" }}>
                {TEMA_ADI[t] ?? t}<span style={{ color: "var(--accent-2)", fontWeight: 700 }}>{n}</span>
              </Link>
            ))}
          </div>
          <Link href="/atlas" style={{ display: "inline-block", marginTop: "1rem", ...mono, fontSize: "0.66rem", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>Zihin Atlası'nda gör →</Link>
        </section>
      )}

      {/* Kavramlar */}
      {kavramlar.length > 0 && (
        <section style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)", borderTop: "1px solid var(--line)", paddingTop: "2rem" }}>
          <h2 style={{ ...mono, fontSize: "0.66rem", color: "var(--muted)", marginBottom: "1.2rem" }}>Kavramlar</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
            {kavramlar.map((kv) => (
              <Link key={kv.ad} href={`/sozluk/${kavramSlug(kv.ad)}`} style={{ display: "block", padding: "1rem 1.1rem", border: "1px solid var(--line)", borderRadius: "12px", color: "var(--ink)" }}>
                <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1rem", color: "var(--accent-2)" }}>{kv.ad}</span>
                <span style={{ display: "block", marginTop: "0.4rem", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.92rem", lineHeight: 1.45, color: "var(--muted)" }}>
                  {kv.tanim.length > 90 ? `${kv.tanim.slice(0, 87)}…` : kv.tanim}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Sözler */}
      <section style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)", borderTop: "1px solid var(--line)", paddingTop: "2rem" }}>
        <h2 style={{ ...mono, fontSize: "0.66rem", color: "var(--muted)", marginBottom: "1.2rem" }}>Bütün sözler ({sozler.length})</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {sozler.map((s) => (
            <Link key={s.s} href={`/soz/${sozSlug(s.s)}`} style={{ display: "block", padding: "0.85rem 0", borderTop: "1px solid var(--line)", color: "var(--ink)", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.08rem", lineHeight: 1.5 }}>
              &ldquo;{s.s}&rdquo;{s.p ? <span style={{ ...mono, fontSize: "0.6rem", color: "var(--muted)", marginLeft: "0.6rem" }}>s. {s.p}</span> : null}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
