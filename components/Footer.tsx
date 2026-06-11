"use client";
export function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid #1a1a1a",
      padding: "3rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      flexWrap: "wrap",
      gap: "1.5rem",
    }}>
      <div>
        <p style={{
          fontFamily: "var(--font-grotesk)",
          fontSize: "1.2rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "var(--white)",
          marginBottom: "0.5rem",
        }}>
          BERKAY DOĞAN
        </p>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--grey-muted)",
          letterSpacing: "0.1em",
        }}>
          berkaydogan.co
        </p>
      </div>

      <div style={{
        display: "flex",
        gap: "2rem",
        alignItems: "center",
      }}>
        {[
          { label: "Instagram", href: "https://instagram.com/berkaydgn__" },
          { label: "YouTube", href: "https://youtube.com/@yazarberkaydogan" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "var(--grey-muted)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--grey-muted)")}
          >
            {s.label.toUpperCase()}
          </a>
        ))}
      </div>

      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.6rem",
        color: "var(--grey-muted)",
        letterSpacing: "0.08em",
        width: "100%",
        borderTop: "1px solid #1a1a1a",
        paddingTop: "1.5rem",
        marginTop: "0.5rem",
      }}>
        © 2026 Berkay Doğan — Bütün yalanlar düzenin, kelimeler Berkay Doğan'ındır.
      </p>
    </footer>
  );
}
