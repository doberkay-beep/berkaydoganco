import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deneme — Berkay Doğan",
  description: "Berkay Doğan'ın deneme yazıları.",
};

export default function Deneme() {
  return (
    <div style={{ paddingTop: "56px" }}>
      <section style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "4rem",
        borderBottom: "1px solid #1a1a1a",
      }}>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          color: "var(--grey-muted)",
          marginBottom: "2rem",
        }}>
          DENEME YAZILARI
        </p>
        <h1 style={{
          fontFamily: "var(--font-grotesk)",
          fontSize: "clamp(3rem, 10vw, 8rem)",
          fontWeight: 700,
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
          color: "var(--white)",
        }}>
          DENEME
        </h1>
      </section>

      <section style={{
        padding: "6rem 4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
      }}>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          color: "var(--grey-muted)",
        }}>
          — YAKINDA —
        </p>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          lineHeight: 1.8,
          color: "var(--grey-subtle)",
          textAlign: "center",
          maxWidth: "400px",
        }}>
          Deneme yazıları bu sayfada yayımlanacak.
          Tasfiye kitabının çıkışıyla birlikte içerik eklenecek.
        </p>

        <style>{`
          @media (max-width: 768px) {
            section:last-child { padding: 4rem 1.5rem !important; }
          }
        `}</style>
      </section>
    </div>
  );
}
