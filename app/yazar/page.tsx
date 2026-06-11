import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yazar — Berkay Doğan",
  description: "Berkay Doğan, İstanbul'da yaşayan şair ve yazardır.",
};

export default function Yazar() {
  return (
    <div style={{ paddingTop: "56px" }}>
      <style>{`
        @media (max-width: 768px) {
          .yazar-about { grid-template-columns: 1fr !important; padding: 4rem 1.5rem !important; }
          .yazar-eserler > div { grid-template-columns: 1fr !important; padding: 2rem 1.5rem !important; }
        }
      `}</style>

      <section style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "4rem", borderBottom: "1px solid #1a1a1a" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--grey-muted)", marginBottom: "2rem" }}>YAZAR — BİYOGRAFİ</p>
        <h1 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(3rem, 10vw, 8rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", color: "var(--white)", marginBottom: "2rem" }}>
          BERKAY<br />DOĞAN
        </h1>
      </section>

      <section className="yazar-about" style={{ padding: "6rem 4rem", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", borderBottom: "1px solid #1a1a1a" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--grey-muted)" }}>HAKKINDA</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", lineHeight: 1.9, color: "var(--grey-subtle)" }}>
            Berkay Doğan, İstanbul'da yaşayan Türk şair ve yazardır. Şiirleri Valsanat Dergisi'nde yayımlanmış; okur platformlarında yüksek puanlar almıştır.
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", lineHeight: 1.9, color: "var(--grey-subtle)" }}>
            İlk şiir kitabı <em>Mürekkep ve Köz: Bir Şairin Hesabı</em> Aralık 2025'te İskenderiye Yayınları'ndan çıktı. İkinci kitabı <em>Tasfiye</em>, bir deneme kitabı olarak Aralık 2026'da yayımlanacak.
          </p>
        </div>
      </section>

      <section className="yazar-eserler" style={{ borderBottom: "1px solid #1a1a1a" }}>
        {[
          { yil: "2025", eser: "Mürekkep ve Köz: Bir Şairin Hesabı", tur: "Şiir", yayin: "İskenderiye Yayınları" },
          { yil: "2026", eser: "Tasfiye", tur: "Deneme", yayin: "TBD" },
        ].map((item, i) => (
          <div key={i} style={{ padding: "2.5rem 4rem", borderBottom: i === 0 ? "1px solid #1a1a1a" : "none", display: "grid", gridTemplateColumns: "100px 1fr auto", gap: "2rem", alignItems: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--grey-muted)" }}>{item.yil}</p>
            <div>
              <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "1rem", fontWeight: 700, color: "var(--white)", marginBottom: "0.25rem" }}>{item.eser}</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--grey-muted)" }}>{item.yayin}</p>
            </div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--grey-muted)" }}>{item.tur.toUpperCase()}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
