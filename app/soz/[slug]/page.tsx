import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SOZLER, sozSlug, sozBul, KITAP_ADI, TEMA_ADI, ilgiliSozler } from "@/lib/sozler";
import { SozAksiyon } from "@/components/SozAksiyon";
import { AUTHOR_REF } from "@/lib/site";
import { sozKaynak, sozAnahtar, sozTitle, sozDescription, YAYINEVI } from "@/lib/sozSeo";

export const dynamic = "force-static";

const SITE = "https://www.berkaydogan.co";

export function generateStaticParams() {
  return SOZLER.map((x) => ({ slug: sozSlug(x.s) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const soz = sozBul(slug);
  if (!soz) return {};
  const title = sozTitle(soz);
  const description = sozDescription(soz);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/soz/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/soz/${slug}/`,
      type: "article",
      authors: ["Berkay Doğan"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
  const ilgili = ilgiliSozler(soz, 6);
  const kaynakMetni = `${KITAP_ADI[soz.k]}${soz.p ? `, s. ${soz.p}` : ""}`;
  const kaynak = sozKaynak(soz);
  const kitapSayfa = kaynak.sayfa;
  const sayfaUrl = `${SITE}/soz/${slug}/`;
  const gitKanal = soz.k === "mvk" ? "mvk-trendyol" : "trendyol";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": `${sayfaUrl}#soz`,
    text: soz.s,
    creator: AUTHOR_REF,
    author: AUTHOR_REF,
    inLanguage: "tr",
    url: sayfaUrl,
    mainEntityOfPage: sayfaUrl,
    keywords: soz.t.map((t) => TEMA_ADI[t]).join(", "),
    isPartOf: {
      "@type": "Book",
      "@id": `${SITE}${kitapSayfa}/#book`,
      name: kaynak.tamAd,
      author: AUTHOR_REF,
      publisher: { "@type": "Organization", name: YAYINEVI },
      datePublished: kaynak.kitap.datePublished,
      genre: kaynak.kitap.tur,
      inLanguage: "tr",
      ...(kaynak.kitap.isbn ? { isbn: kaynak.kitap.isbn } : {}),
      ...(kaynak.kitap.sayfaSayisi ? { numberOfPages: kaynak.kitap.sayfaSayisi } : {}),
      url: `${SITE}${kitapSayfa}/`,
    },
  };

  const kirintiLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Berkay Doğan", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Sözler", item: `${SITE}/sozler/` },
      { "@type": "ListItem", position: 3, name: sozAnahtar(soz.s, 60), item: sayfaUrl },
    ],
  };

  const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" };

  return (
    <main style={{ maxWidth: "760px", margin: "0 auto", minHeight: "100svh", display: "flex", flexDirection: "column", padding: "clamp(2.5rem, 6vh, 4rem) clamp(1.25rem, 5vw, 2rem) 4rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(kirintiLd).replace(/</g, "\\u003c") }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>Berkay Doğan</Link>
        <Link href="/sozler" style={{ ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← Tüm sözler</Link>
      </div>

      <article style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "3rem 0" }}>
        <span aria-hidden="true" style={{ display: "block", width: "84px", height: "3px", background: "var(--accent)", marginBottom: "2rem" }} />
        <blockquote cite={`${SITE}${kitapSayfa}/`} style={{ margin: 0 }}>
          <h1 style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: soz.s.length > 100 ? "clamp(1.5rem, 4vw, 2.3rem)" : "clamp(1.9rem, 5.5vw, 3.2rem)", lineHeight: 1.4, letterSpacing: "normal", color: "var(--ink)", textWrap: "balance" as never }}>
            &ldquo;{soz.s}&rdquo;
          </h1>
        </blockquote>
        <p style={{ ...mono, color: "var(--accent-2)", marginTop: "1.75rem" }}>— Berkay Doğan</p>
        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", lineHeight: 1.6, color: "var(--muted)", maxWidth: "52ch" }}>
          Berkay Doğan&apos;ın{" "}
          <Link href={kitapSayfa} style={{ color: "var(--ink)", borderBottom: "1px solid var(--accent)" }}>{kaynak.tamAd}</Link>{" "}
          ({kaynak.tur}, {YAYINEVI}, {kaynak.yil}) kitabından{soz.p ? `, s. ${soz.p}` : ""}.{" "}
          <Link href={kitapSayfa} style={{ ...mono, fontSize: "0.62rem", color: "var(--accent-2)", whiteSpace: "nowrap" }}>Kitap sayfası →</Link>
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
          <span style={{ color: "var(--accent-2)" }} aria-hidden="true">→</span>
        </a>
      </article>

      {ilgili.length > 0 && (
        <section style={{ borderTop: "1px solid var(--line)", paddingTop: "1.75rem", marginBottom: "1.5rem" }} aria-labelledby="benzer-sozler">
          <h2 id="benzer-sozler" style={{ ...mono, fontSize: "0.66rem", color: "var(--muted)", marginBottom: "1rem" }}>Benzer sözler</h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {ilgili.map((o) => (
              <li key={sozSlug(o.s)}>
                <Link
                  href={`/soz/${sozSlug(o.s)}`}
                  style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.02rem", lineHeight: 1.5, color: "var(--ink)", borderBottom: "1px solid transparent" }}
                >
                  &ldquo;{o.s}&rdquo;
                </Link>{" "}
                <span style={{ ...mono, fontSize: "0.58rem", color: "var(--muted)" }}>{KITAP_ADI[o.k]}</span>
              </li>
            ))}
          </ul>
          <p style={{ display: "flex", gap: "0.4rem 1rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
            {soz.t.map((tema) => (
              <Link key={tema} href={`/tema/${tema}`} style={{ ...mono, fontSize: "0.6rem", color: "var(--accent-2)" }}>
                Tüm {TEMA_ADI[tema]} sözleri →
              </Link>
            ))}
            <Link href="/sozler" style={{ ...mono, fontSize: "0.6rem", color: "var(--muted)" }}>Berkay Doğan sözleri →</Link>
          </p>
        </section>
      )}

      <nav style={{ display: "flex", justifyContent: "space-between", gap: "1rem", borderTop: "1px solid var(--line)", paddingTop: "1.5rem" }} aria-label="Sözler arası gezinme">
        <Link href={`/soz/${sozSlug(onceki.s)}`} style={{ ...mono, fontSize: "0.68rem", color: "var(--muted)", maxWidth: "45%" }}>← önceki söz</Link>
        <Link href={`/soz/${sozSlug(sonraki.s)}`} style={{ ...mono, fontSize: "0.68rem", color: "var(--muted)", maxWidth: "45%", textAlign: "right" }}>sonraki söz →</Link>
      </nav>
    </main>
  );
}
