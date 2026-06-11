import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim — Berkay Doğan",
  description: "Berkay Doğan ile iletişim.",
};

export default function Iletisim() {
  return (
    <div style={{ paddingTop: "56px" }}>
      <style>{`
        .contact-link { transition: color 0.2s; color: var(--grey-subtle); }
        .contact-link:hover { color: var(--white) !important; }
      `}</style>

      <section style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "4rem", borderBottom: "1px solid #1a1a1a" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--grey-muted)", marginBottom: "2rem" }}>İLETİŞİM</p>
        <h1 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(3rem, 10vw, 8rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", color: "var(--white)", marginBottom: "2rem" }}>
          YAZI,<br /><span style={{ color: "var(--grey-mid)" }}>GERÇEKTEN</span>
        </h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--grey-subtle)", maxWidth: "400px", lineHeight: 1.8 }}>
          Havadan sudan konuşmak için değil, gerçekten kanayan bir yaran varsa yaz.
        </p>
      </section>

      <section style={{ borderBottom: "1px solid #1a1a1a", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ padding: "3rem 4rem", borderRight: "1px solid #1a1a1a" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.25em", color: "var(--grey-muted)", marginBottom: "1rem" }}>E-POSTA</p>
          <a href="mailto:do.berkay@icloud.com" className="contact-link" style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
            do.berkay@icloud.com
          </a>
        </div>
        <div style={{ padding: "3rem 4rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.25em", color: "var(--grey-muted)", marginBottom: "1rem" }}>INSTAGRAM</p>
          <a href="https://instagram.com/berkaydgn__" target="_blank" rel="noopener noreferrer" className="contact-link" style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
            @berkaydgn__
          </a>
        </div>

        <style>{`
          @media (max-width: 640px) {
            section:nth-child(2) { grid-template-columns: 1fr !important; }
            section:nth-child(2) > div { border-right: none !important; border-bottom: 1px solid #1a1a1a; padding: 2.5rem 1.5rem !important; }
          }
        `}</style>
      </section>
    </div>
  );
}
