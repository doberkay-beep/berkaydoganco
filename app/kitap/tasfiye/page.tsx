import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Tasfiye — Berkay Doğan" },
  description: "Tasfiye (25 Ağustos 2026): Sahnede bir mahkeme, sanık koltuğunda yazarın kendisi. Modern dünyanın enkazından bir yüzleşme. ISBN 978-625-92142-2-1.",
  alternates: { canonical: "/kitap/tasfiye" },
  openGraph: {
    title: "Tasfiye — Berkay Doğan",
    description: "Yıkmak değil; temizlemek. 25 Ağustos 2026.",
    url: "https://www.berkaydogan.co/kitap/tasfiye",
    type: "book",
    images: [{ url: "https://www.berkaydogan.co/tasfiye-on-kapak.jpg" }],
  },
};

const THEMES = [
  { k: "Yüzleşme", v: "Sahnede bir mahkeme, sanık koltuğunda yazarın kendisi — bu bir suçlama değil, bir hesap." },
  { k: "Modern enkaz", v: "Modern dünyanın enkazından, giyotinini kendi taşıyan insana uzanan bir bakış." },
  { k: "Görmezden gelinenler", v: "“Görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isim.”" },
  { k: "Temizlik", v: "Tasfiye, yıkmak değil; temizlemektir. Kaybettiğimiz felsefi dozun hayata geri çağrılması." },
];

const FACTS: { k: string; v: string }[] = [
  { k: "Tür", v: "Deneme" },
  { k: "Yayınevi", v: "İskenderiye Yayınları" },
  { k: "Çıkış", v: "25 Ağustos 2026" },
  { k: "ISBN", v: "978-625-92142-2-1" },
  { k: "Yayın No", v: "223" },
];

function schema() {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Tasfiye",
    author: { "@type": "Person", name: "Berkay Doğan", url: "https://www.berkaydogan.co" },
    publisher: { "@type": "Organization", name: "İskenderiye Yayınları" },
    isbn: "978-625-92142-2-1",
    datePublished: "2026-08-25",
    inLanguage: "tr",
    genre: "Deneme",
    image: "https://www.berkaydogan.co/tasfiye-on-kapak.jpg",
    url: "https://www.berkaydogan.co/kitap/tasfiye/",
  };
}

const S = {
  eyebrow: { display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--ink)" } as React.CSSProperties,
  dot: { width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" } as React.CSSProperties,
  secLabel: { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem" } as React.CSSProperties,
  sec: { marginTop: "clamp(3rem, 7vh, 5rem)", borderTop: "1px solid var(--line)", paddingTop: "2.5rem" } as React.CSSProperties,
};

export default function TasfiyePage() {
  return (
    <main style={{ maxWidth: "980px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema()) }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em" }}>Berkay Doğan</Link>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← berkaydogan.co</Link>
      </div>

      {/* HERO */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(200px, 300px) 1fr", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "center" }}>
        <img src="/tasfiye-on-kapak.jpg" alt="Tasfiye — ön kapak" style={{ width: "100%", borderRadius: "4px", boxShadow: "0 30px 70px rgba(0,0,0,0.45)" }} />
        <div>
          <span style={S.eyebrow}><span style={S.dot} />Deneme · 25 Ağustos 2026</span>
          <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.6rem, 7vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.95, margin: "1.25rem 0 0.75rem" }}>Tasfiye</h1>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.15rem, 2.4vw, 1.5rem)", color: "var(--muted)" }}>Bir Yazarın Hesabı</p>
          <p style={{ marginTop: "1.25rem", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(1.05rem, 2vw, 1.3rem)", lineHeight: 1.6, color: "var(--ink)", maxWidth: "48ch" }}>
            Perde açılıyor: Sahnede bir mahkeme, sanık koltuğunda yazarın kendisi. Bu bir suçlama değil, bir hesap. Modern dünyanın enkazından, giyotinini kendi taşıyan insana uzanan bir yüzleşme. Tasfiye, yıkmak değil; temizlemektir.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
            <Link href="/#books" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-grotesk)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", padding: "0.95rem 1.6rem", borderRadius: "100px", background: "var(--accent)", color: "var(--accent-ink)" }}>Lansmanı kaçırma →</Link>
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
        <p style={S.secLabel}>Kitabın izleği</p>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {THEMES.map((t) => (
            <div key={t.k} style={{ padding: "1.5rem 1.6rem", border: "1px solid var(--line)", borderRadius: "12px", background: "var(--bg-2)" }}>
              <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.01em", marginBottom: "0.6rem", color: "var(--ink)" }}>{t.k}</p>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.65, color: "var(--muted)" }}>{t.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EPİGRAF */}
      <section style={S.sec}>
        <blockquote style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.5rem, 4vw, 2.6rem)", lineHeight: 1.4, color: "var(--ink)", maxWidth: "26ch" }}>
          “Görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isim.”
        </blockquote>
        <p style={{ marginTop: "1.25rem", fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)" }}>— Arka kapaktan</p>
      </section>

      {/* ÖNCEKİ KİTAP */}
      <section style={S.sec}>
        <Link href="/kitap/murekkep" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <span>
            <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>İlk kitap</span>
            <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.03em", color: "var(--ink)" }}>← Mürekkep ve Köz</span>
          </span>
          <span style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)" }}>#1 Trendyol Şiir</span>
        </Link>
      </section>
    </main>
  );
}
