import type { Metadata } from "next";
import Link from "next/link";
import { RETAILERS, REVIEWS, TRENDYOL_URL, GOODREADS_URL, VERSES } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Mürekkep ve Köz — Berkay Doğan" },
  description: "Mürekkep ve Köz: Bir Şairin Hesabı (2025). Boğucu bir yalnızlığın, ulusal kaosun ve varoluşsal krizin içinden sökülerek yazılan 200'den fazla şiir. ISBN 978-625-9620-32-9.",
  alternates: { canonical: "/kitap/murekkep" },
  openGraph: {
    title: "Mürekkep ve Köz — Berkay Doğan",
    description: "Bir Şairin Hesabı. 200'den fazla şiir. #1 Trendyol Şiir.",
    url: "https://www.berkaydogan.co/kitap/murekkep",
    type: "book",
    images: [{ url: "https://www.berkaydogan.co/murekkep-ve-koz-on-kapak.jpg" }],
  },
};

const THEMES = [
  { k: "Yıkım ve yeniden doğuş", v: "Küllerinden doğmayı seçmiş bir ruhun sesi — kitabın omurgası." },
  { k: "Yalnızlık", v: "Boğucu bir yalnızlığın içinden, ona rağmen ve onun sayesinde yazılan dizeler." },
  { k: "Hesaplaşma", v: "Toplumla, geçmişle ve en çok da insanın kendisiyle: bir şairin hesabı." },
  { k: "Umut", v: "“Geleceğime âşığım” — karanlığın içinden geleceğe uzanan damar." },
];

const FACTS: { k: string; v: string }[] = [
  { k: "Tür", v: "Şiir" },
  { k: "Yayınevi", v: "İskenderiye Yayınları" },
  { k: "Yıl", v: "2025" },
  { k: "ISBN", v: "978-625-9620-32-9" },
  { k: "Hacim", v: "200'den fazla şiir" },
  { k: "Başarı", v: "#1 Trendyol Şiir · 10/10 1000Kitap" },
];

function schema() {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Mürekkep ve Köz: Bir Şairin Hesabı",
    author: { "@type": "Person", name: "Berkay Doğan", url: "https://www.berkaydogan.co" },
    publisher: { "@type": "Organization", name: "İskenderiye Yayınları" },
    isbn: "978-625-9620-32-9",
    datePublished: "2025-12",
    inLanguage: "tr",
    genre: "Şiir",
    image: "https://www.berkaydogan.co/murekkep-ve-koz-on-kapak.jpg",
    url: "https://www.berkaydogan.co/kitap/murekkep/",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "10", bestRating: "10", ratingCount: "5" },
    offers: { "@type": "Offer", price: "269", priceCurrency: "TRY", availability: "https://schema.org/InStock", url: TRENDYOL_URL },
  };
}

const S = {
  eyebrow: { display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--ink)" } as React.CSSProperties,
  dot: { width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" } as React.CSSProperties,
  secLabel: { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem" } as React.CSSProperties,
  sec: { marginTop: "clamp(3rem, 7vh, 5rem)", borderTop: "1px solid var(--line)", paddingTop: "2.5rem" } as React.CSSProperties,
};

export default function MurekkepPage() {
  return (
    <main style={{ maxWidth: "980px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema()) }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em" }}>Berkay Doğan</Link>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← berkaydogan.co</Link>
      </div>

      {/* HERO */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(200px, 300px) 1fr", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "center" }}>
        <img src="/murekkep-ve-koz-on-kapak.jpg" alt="Mürekkep ve Köz — ön kapak" style={{ width: "100%", borderRadius: "4px", boxShadow: "0 30px 70px rgba(0,0,0,0.35)" }} />
        <div>
          <span style={S.eyebrow}><span style={S.dot} />Şiir · 2025</span>
          <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.4rem, 6vw, 4.4rem)", letterSpacing: "-0.04em", lineHeight: 0.95, margin: "1.25rem 0 0.75rem" }}>Mürekkep<br />ve Köz</h1>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.15rem, 2.4vw, 1.5rem)", color: "var(--muted)" }}>Bir Şairin Hesabı</p>
          <p style={{ marginTop: "1.25rem", fontSize: "1.02rem", lineHeight: 1.75, color: "var(--muted)", maxWidth: "52ch" }}>
            Boğucu bir yalnızlığın, ulusal kaosun ve varoluşsal krizin içinden sökülerek yazılan 200&apos;den fazla şiir. Yıkımın ortasından küllerinden doğmayı seçen bir sesin ilk kitabı.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
            <a href={TRENDYOL_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-grotesk)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", padding: "0.95rem 1.6rem", borderRadius: "100px", background: "var(--accent)", color: "var(--accent-ink)" }}>Satın al →</a>
            <a href={GOODREADS_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-grotesk)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", padding: "0.95rem 1.6rem", borderRadius: "100px", border: "1px solid var(--line)", color: "var(--ink)" }}>Goodreads ↗</a>
          </div>
        </div>
      </div>

      {/* KÜNYE */}
      <section style={S.sec}>
        <p style={S.secLabel}>Künye</p>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(120px, 180px) 1fr" }}>
          {FACTS.map((f) => (
            <div key={f.k} style={{ display: "contents" }}>
              <div style={{ padding: "0.85rem 0", borderTop: "1px solid var(--line)", fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)" }}>{f.k}</div>
              <div style={{ padding: "0.85rem 0", borderTop: "1px solid var(--line)", fontSize: "1rem", color: "var(--ink)" }}>{f.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEMALAR */}
      <section style={S.sec}>
        <p style={S.secLabel}>Temalar</p>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {THEMES.map((t) => (
            <div key={t.k} style={{ padding: "1.5rem 1.6rem", border: "1px solid var(--line)", borderRadius: "12px", background: "var(--bg-2)" }}>
              <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.01em", marginBottom: "0.6rem", color: "var(--ink)" }}>{t.k}</p>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.65, color: "var(--muted)" }}>{t.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TADIMLIK DİZELER */}
      <section style={S.sec}>
        <p style={S.secLabel}>Kitaptan dizeler</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", maxWidth: "60ch" }}>
          {VERSES.slice(0, 5).map((v) => (
            <blockquote key={v} style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "1.25rem", fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.2rem, 2.6vw, 1.6rem)", lineHeight: 1.45, color: "var(--ink)" }}>
              “{v}”
            </blockquote>
          ))}
        </div>
        <Link href="/evren" style={{ display: "inline-block", marginTop: "2rem", fontFamily: "var(--font-grotesk)", fontSize: "0.74rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>Köz Evreni&apos;nde keşfet ✦</Link>
      </section>

      {/* OKUR SESLERİ */}
      <section style={S.sec}>
        <p style={S.secLabel}>Okurlardan</p>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {REVIEWS.map((r, i) => (
            <figure key={i} style={{ padding: "1.6rem 1.7rem", border: "1px solid var(--line)", borderRadius: "12px", background: "var(--bg-2)" }}>
              <blockquote style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.02rem", lineHeight: 1.6, color: "var(--ink)" }}>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption style={{ marginTop: "1rem", fontSize: "0.64rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)" }}>{r.source}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* NEREDEN ALINIR */}
      <section style={S.sec}>
        <p style={S.secLabel}>Nereden alınır</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
          {RETAILERS.map((r) => (
            <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.82rem", padding: "0.7rem 1.2rem", borderRadius: "100px", border: "1px solid var(--line)", color: "var(--ink)" }}>{r.name} ↗</a>
          ))}
        </div>
      </section>

      {/* SIRADAKİ */}
      <section style={S.sec}>
        <Link href="/kitap/tasfiye" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <span>
            <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>Sıradaki kitap</span>
            <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Tasfiye →</span>
          </span>
          <span style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)" }}>25 Ağustos 2026</span>
        </Link>
      </section>
    </main>
  );
}
