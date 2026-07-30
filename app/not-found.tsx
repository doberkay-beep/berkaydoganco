import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Lost",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "var(--bg)", color: "var(--ink)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem 1.5rem" }}>
      <p style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "2.25rem" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />404 — Lost
      </p>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.7rem, 5vw, 3.2rem)", lineHeight: 1.4, maxWidth: "22ch" }}>
        This page was cleared away too. Some emptiness is not meant to be filled.
      </p>
      <Link href="/" style={{ marginTop: "2.75rem", fontFamily: "var(--font-grotesk)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.1em", padding: "0.9rem 1.6rem", borderRadius: "100px", background: "var(--accent)", color: "var(--accent-ink)" }}>
        ← Back home
      </Link>
    </div>
  );
}
