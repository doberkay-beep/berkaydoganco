import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tasfiye — Berkay Doğan",
  description: "Tasfiye, görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isimdir. Deneme kitabı. Aralık 2026.",
};

const bolumler = [
  { no: "I", baslik: "Modern Dünyanın Enkazı", alt: "Toplumsal Eleştiri", count: 16 },
  { no: "II", baslik: "Toplumsal Klinik", alt: "İnsanın İfşası", count: 2 },
  { no: "III", baslik: "Büyük Tasfiye", alt: "Arınma", count: 8 },
];

export default function Tasfiye() {
  return (
    <div style={{ paddingTop: "56px" }}>
      <style>{`
        .btn-primary { transition: all 0.2s; }
        .btn-primary:hover { background: var(--white) !important; color: var(--black) !important; }
        .link-muted { transition: color 0.2s; }
        .link-muted:hover { color: var(--white) !important; }
        @media (max-width: 768px) {
          .tasfiye-hero { padding: 3rem 1.5rem 2.5rem !important; }
          .tasfiye-meta { grid-template-columns: 1fr 1fr !important; }
          .tasfiye-about { grid-template-columns: 1fr !important; padding: 4rem 1.5rem !important; gap: 1.5rem !important; }
          .tasfiye-bolum { padding: 2rem 1.5rem !important; }
          .tasfiye-cta { padding: 4rem 1.5rem !important; }
        }
        @media (max-width: 640px) {
          .tasfiye-meta { grid-template-columns: 1fr 1fr !important; }
          .tasfiye-meta > div { border-bottom: 1px solid #1a1a1a; }
        }
      `}</style>

      {/* HERO */}
      <section className="tasfiye-hero" style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "4rem", borderBottom: "1px solid #1a1a1a", position: "relative", overflow: "hidden" }}>
        <span style={{ position: "absolute", bottom: "-2rem", right: "-1rem", fontFamily: "var(--font-grotesk)", fontSize: "clamp(8rem, 25vw, 22rem)", fontWeight: 700, color: "rgba(255,255,255,0.03)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>TAS</span>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--grey-muted)", marginBottom: "2rem", position: "relative", zIndex: 2 }}>BERKAY DOĞAN — DENEME — ARALIK 2026</p>
        <h1 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(4rem, 12vw, 10rem)", fontWeight: 700, lineHeight: 0.88, letterSpacing: "-0.02em", color: "var(--white)", position: "relative", zIndex: 2, marginBottom: "2.5rem" }}>TASFİYE</h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", lineHeight: 1.8, color: "var(--grey-subtle)", maxWidth: "480px", position: "relative", zIndex: 2 }}>
          Tasfiye, görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isimdir.
        </p>
      </section>

      {/* META */}
      <section className="tasfiye-meta" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "1px solid #1a1a1a" }}>
        {[{ label: "YIL", value: "2026" }, { label: "TÜR", value: "DENEME" }, { label: "SAYFA", value: "161" }, { label: "DURUM", value: "YAKINLAŞIYOR" }].map((item, i) => (
          <div key={i} style={{ padding: "2rem", borderRight: i < 3 ? "1px solid #1a1a1a" : "none" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.25em", color: "var(--grey-muted)", marginBottom: "0.75rem" }}>{item.label}</p>
            <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.05em", color: "var(--white)" }}>{item.value}</p>
          </div>
        ))}
      </section>

      {/* HAKKINDA */}
      <section className="tasfiye-about" style={{ padding: "6rem 4rem", borderBottom: "1px solid #1a1a1a", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--grey-muted)", paddingTop: "0.4rem" }}>KİTAP HAKKINDA</div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", lineHeight: 1.9, color: "var(--grey-subtle)" }}>
          Tasfiye, görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isimdir. Deneme kitabı. Aralık 2026.
        </p>
      </section>

      {/* BÖLÜMLER */}
      <section style={{ borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ padding: "2rem 4rem", borderBottom: "1px solid #1a1a1a" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--grey-muted)" }}>İÇİNDEKİLER</p>
        </div>
        {bolumler.map((b, i) => (
          <div key={i} className="tasfiye-bolum" style={{ padding: "2.5rem 4rem", borderBottom: i < bolumler.length - 1 ? "1px solid #1a1a1a" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "2rem" }}>
              <span style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 700, color: "var(--grey-muted)", letterSpacing: "0.15em" }}>{b.no}</span>
              <div>
                <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(1rem, 2.5vw, 1.4rem)", fontWeight: 700, color: "var(--white)", marginBottom: "0.25rem" }}>{b.baslik}</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--grey-muted)" }}>{b.alt}</p>
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--grey-muted)", whiteSpace: "nowrap" }}>{b.count} METİN</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="tasfiye-cta" style={{ padding: "6rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--grey-muted)", marginBottom: "1rem" }}>ÇIKIŞ TARİHİ: ARALIK 2026</p>
          <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(1.2rem, 3vw, 2rem)", fontWeight: 700, color: "var(--white)" }}>Perde açılıyor.</p>
        </div>
        <a href="https://berkaydoganpoetry.com/tr/denemeler" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", padding: "0.75rem 1.5rem", border: "1px solid var(--white)", color: "var(--white)", display: "inline-block" }}>
          ÖN OKUMA →
        </a>
      </section>
    </div>
  );
}
