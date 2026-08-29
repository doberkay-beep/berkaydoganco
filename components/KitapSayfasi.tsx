import Link from "next/link";
import type { Kitap } from "@/lib/kitaplar";

/* Kitap sayfası şablonu — brief'teki yapı, sitenin mevcut görsel diliyle:
   üst bant → kapak+künye → arka kapak → nereden alınır → kitaptan → diğer kitap.
   Hairline ayrımlar, keyline'lı kapak, tek aksan (84×3 çizgi + etiket). */

const SITE = "https://www.berkaydogan.co";

const mono: React.CSSProperties = {
  fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500,
  letterSpacing: "0.16em", textTransform: "uppercase",
};

export function KitapSayfasi({ kitap, diger }: { kitap: Kitap; diger: Kitap }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: kitap.ad,
    alternateName: kitap.altBaslik,
    author: { "@type": "Person", name: "Berkay Doğan", url: SITE },
    publisher: { "@type": "Organization", name: "İskenderiye Yayınları" },
    ...(kitap.isbn ? { isbn: kitap.isbn } : {}),
    ...(kitap.sayfaSayisi ? { numberOfPages: kitap.sayfaSayisi } : {}),
    datePublished: kitap.datePublished,
    inLanguage: "tr",
    genre: kitap.tur,
    image: `${SITE}${kitap.kapak}`,
    url: `${SITE}/kitaplar/${kitap.slug}/`,
    offers: {
      "@type": "Offer",
      url: `${SITE}/git/${kitap.kanallar[0].git}/`,
      ...(kitap.fiyat ? { price: kitap.fiyat } : {}),
      priceCurrency: "TRY",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main style={{ maxWidth: "980px", margin: "0 auto", padding: "clamp(3rem, 8vh, 5.5rem) clamp(1.5rem, 6vw, 6rem) 6rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Site içi dönüş */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(2.5rem, 6vh, 4rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>Berkay Doğan</Link>
        <Link href="/kitaplar" style={{ ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← Kitaplar</Link>
      </div>

      {/* a. Üst bant */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
        <span style={{ ...mono, color: "var(--accent)" }}>{kitap.etiket}</span>
        <span style={{ ...mono, color: "var(--muted)" }}>{kitap.cikis}</span>
      </div>
      <hr style={{ border: "none", borderTop: "1px solid var(--line)", margin: "1.1rem 0 clamp(2.5rem, 6vh, 4rem)" }} />

      {/* b. Kapak + künye */}
      <div className="ks-hero">
        <img
          src={kitap.kapak}
          srcSet={`${kitap.kapak400} 400w, ${kitap.kapak} ${kitap.kapakW}w`}
          sizes="(max-width: 860px) 82vw, 420px"
          alt={`${kitap.ad} — ön kapak`}
          style={{ width: "100%", maxWidth: "420px", border: "1px solid var(--line)", padding: "0", display: "block" }}
        />
        <div>
          <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.6rem, 7vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--ink)" }}>{kitap.ad}</h1>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.15rem, 2.4vw, 1.5rem)", color: "var(--muted)", marginTop: "0.6rem" }}>{kitap.altBaslik}</p>
          {kitap.epigraf && (
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.05rem", color: "var(--ink)", marginTop: "1.1rem" }}>&ldquo;{kitap.epigraf}&rdquo;</p>
          )}
          <div style={{ marginTop: "1.75rem" }}>
            {kitap.kunye.map((f) => (
              <div key={f.k} style={{ display: "flex", gap: "1rem", padding: "0.65rem 0", borderTop: "1px solid var(--line)" }}>
                <span style={{ ...mono, fontSize: "0.68rem", color: "var(--muted)", minWidth: "9ch", paddingTop: "0.15rem" }}>{f.k}</span>
                <span style={{ fontSize: "0.95rem", color: "var(--ink)" }}>{f.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* c. Arka kapak metni */}
      <section style={{ marginTop: "clamp(3rem, 8vh, 5rem)" }}>
        <span aria-hidden="true" style={{ display: "block", width: "84px", height: "3px", background: "var(--accent)", marginBottom: "1.75rem" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", maxWidth: "62ch" }}>
          {kitap.arkaKapak.map((p, i) => (
            <p key={i} style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.1rem, 2vw, 1.25rem)", lineHeight: 1.7, color: "var(--ink)" }}>{p}</p>
          ))}
        </div>
      </section>

      {/* d. Satın alma */}
      <section style={{ marginTop: "clamp(3rem, 8vh, 5rem)" }}>
        <p style={{ ...mono, color: "var(--muted)", marginBottom: "0.75rem" }}>Nereden alınır</p>
        <div>
          {kitap.kanallar.map((k) => (
            <a key={k.git} href={`/git/${k.git}/`} rel="noopener" className="ks-kanal">
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.25rem, 2.6vw, 1.5rem)", color: "var(--ink)" }}>{k.name}</span>
              <span aria-hidden="true" style={{ color: "var(--accent)", fontSize: "1.1rem" }}>→</span>
            </a>
          ))}
        </div>
      </section>

      {/* e. Alıntılar */}
      {kitap.alintilar.length > 0 && (
        <section style={{ marginTop: "clamp(3rem, 8vh, 5rem)" }}>
          <p style={{ ...mono, color: "var(--muted)", marginBottom: "0.5rem" }}>Kitaptan</p>
          <div>
            {kitap.alintilar.map((a, i) => (
              <blockquote key={i} style={{ padding: "2rem 0", borderTop: i === 0 ? "none" : "1px solid var(--line)", margin: 0 }}>
                <p style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(1.4rem, 3.4vw, 2rem)", lineHeight: 1.45, color: "var(--ink)", maxWidth: "30ch" }}>&ldquo;{a.text}&rdquo;</p>
                <span style={{ ...mono, fontSize: "0.66rem", color: "var(--muted)", opacity: 0.7, display: "block", marginTop: "0.9rem" }}>{a.sayfa}</span>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {/* f. Alt bant — diğer kitap */}
      <hr style={{ border: "none", borderTop: "1px solid var(--line)", margin: "clamp(3rem, 8vh, 5rem) 0 0" }} />
      <Link href={`/kitaplar/${diger.slug}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", flexWrap: "wrap", padding: "1.75rem 0 0" }}>
        <span style={{ ...mono, fontSize: "0.68rem", color: "var(--muted)" }}>Diğer kitap</span>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 3vw, 1.7rem)", color: "var(--ink)" }}>{diger.ad} <span style={{ color: "var(--accent)" }}>→</span></span>
      </Link>

      <style>{`
        .ks-hero { display: grid; grid-template-columns: minmax(220px, 420px) 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: start; }
        @media (max-width: 860px) { .ks-hero { grid-template-columns: 1fr; } }
        .ks-kanal { display: flex; justify-content: space-between; align-items: center; gap: 1rem;
          padding: 1.1rem 0; border-top: 1px solid var(--line); text-decoration: none;
          transition: padding-left 0.25s ease; }
        .ks-kanal:hover { padding-left: 0.5rem; }
        .ks-kanal:last-child { border-bottom: 1px solid var(--line); }
      `}</style>
    </main>
  );
}
