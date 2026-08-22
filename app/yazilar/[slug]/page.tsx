import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { YAZILAR } from "@/lib/yazilar";
import { MEDIA, SUBSTACK_URL } from "@/lib/site";

export const dynamic = "force-static";

const SITE = "https://www.berkaydogan.co";

export function generateStaticParams() {
  return YAZILAR.map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const y = YAZILAR.find((x) => x.slug === slug);
  if (!y) return {};
  return {
    title: { absolute: `${y.title} — Berkay Doğan` },
    description: y.dek,
    alternates: { canonical: `/yazilar/${y.slug}` },
    robots: y.taslak ? { index: false, follow: false } : undefined,
    openGraph: {
      title: y.title,
      description: y.dek,
      url: `${SITE}/yazilar/${y.slug}`,
      type: "article",
      publishedTime: y.dateISO,
      authors: ["Berkay Doğan"],
    },
  };
}

export default async function YaziPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const y = YAZILAR.find((x) => x.slug === slug);
  if (!y) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: y.title,
    description: y.dek,
    datePublished: y.dateISO,
    inLanguage: "tr",
    author: { "@type": "Person", name: "Berkay Doğan", url: SITE },
    publisher: { "@type": "Person", name: "Berkay Doğan", url: SITE },
    mainEntityOfPage: `${SITE}/yazilar/${y.slug}/`,
    image: `${SITE}/opengraph-image`,
  };

  return (
    <main style={{ maxWidth: "700px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      {!y.taslak && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em" }}>Berkay Doğan</Link>
        <Link href="/yazilar" style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← Yazılar</Link>
      </div>

      {y.taslak && (
        <p style={{ display: "inline-block", fontFamily: "var(--font-grotesk)", fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", border: "1px solid var(--accent)", borderRadius: "100px", padding: "0.4rem 0.8rem", marginBottom: "1.5rem" }}>
        Taslak — yayın öncesi önizleme</p>
      )}

      <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem" }}>{y.dateText}</p>
      <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.2rem, 6vw, 3.8rem)", letterSpacing: "-0.03em", lineHeight: 1.02, marginBottom: "1.1rem", textWrap: "balance" }}>{y.title}</h1>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.15rem, 2.2vw, 1.45rem)", color: "var(--muted)", maxWidth: "44ch", lineHeight: 1.5 }}>{y.dek}</p>

      <article style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)", borderTop: "1px solid var(--line)", paddingTop: "2.5rem" }}>
        {y.paras.map((p, i) => {
          if (p === "[[video]]") {
            return (
              <a key={i} href={`https://www.youtube.com/watch?v=${MEDIA.youtube}`} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "0.9rem", margin: "0.5rem 0 1.6rem", padding: "1.1rem 1.3rem", border: "1px solid var(--line)", borderRadius: "12px", background: "var(--bg-2)" }}>
                <span style={{ color: "var(--accent)", fontSize: "1.2rem" }} aria-hidden="true">▶</span>
                <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 500, fontSize: "0.95rem", color: "var(--ink)" }}>Bahsettiğim video — YouTube'da izle ↗</span>
              </a>
            );
          }
          const isSign = p.startsWith("— ");
          const isFirst = i === 0;
          return (
            <p key={i} style={{
              fontSize: isSign ? "1.05rem" : "1.08rem",
              lineHeight: 1.85,
              color: isSign ? "var(--accent)" : "var(--ink)",
              fontFamily: isSign ? "var(--font-serif)" : "inherit",
              fontStyle: isSign ? "italic" : "normal",
              marginBottom: "1.6rem",
              marginTop: isSign ? "2.2rem" : 0,
            }}>
              {isFirst ? (
                <>
                  <span style={{ float: "left", fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "3.6em", lineHeight: 0.82, paddingRight: "0.12em", color: "var(--accent)" }}>{p.charAt(0)}</span>
                  {p.slice(1)}
                </>
              ) : p}
            </p>
          );
        })}
      </article>

      <footer style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)", borderTop: "1px solid var(--line)", paddingTop: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {y.substackUrl && (
          <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
            Bu yazı ilk olarak{" "}
            <a href={y.substackUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>Substack&apos;te</a>{" "}
            yayımlandı.
          </p>
        )}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a href={`${SUBSTACK_URL}/subscribe`} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-grotesk)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", padding: "0.9rem 1.5rem", borderRadius: "100px", background: "var(--accent)", color: "var(--accent-ink)" }}>
            Yeni yazılar e-postana gelsin →
          </a>
          <Link href="/yazilar"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-grotesk)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", padding: "0.9rem 1.5rem", borderRadius: "100px", border: "1px solid var(--line)", color: "var(--ink)" }}>
            Tüm yazılar
          </Link>
        </div>
      </footer>
    </main>
  );
}
