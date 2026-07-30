import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Kayıp",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#F0ECE4",
        color: "#1a1a1a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem 1.5rem",
        fontFamily: "var(--font-grotesk)",
      }}
    >
      <p style={{ fontSize: "0.72rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#8B1A1A", marginBottom: "2.5rem" }}>
        404 — Kayıp
      </p>
      <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.7rem, 5vw, 3.2rem)", lineHeight: 1.4, maxWidth: "22ch" }}>
        Aradığın sayfa da tasfiye edildi. Bazı boşluklar doldurulmak için değildir.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "3rem",
          fontSize: "0.72rem",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "#1a1a1a",
          borderBottom: "1px solid rgba(139,26,26,0.5)",
          paddingBottom: "2px",
        }}
      >
        ← Karanlığa dön
      </Link>
    </div>
  );
}
