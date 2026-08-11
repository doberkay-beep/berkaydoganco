import type { Metadata } from "next";
import Link from "next/link";
import { site, EMAIL, INSTAGRAM_URL, YOUTUBE_URL, SUBSTACK_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Press Kit — Berkay Doğan" },
  description: "Press kit for Berkay Doğan — poet and writer based in Istanbul. Bio, facts, downloadable photos and book covers.",
};

const FACTS: { k: string; v: string }[] = [
  { k: "Name", v: "Berkay Doğan" },
  { k: "Role", v: "Poet & Writer" },
  { k: "Based in", v: "Istanbul, Türkiye" },
  { k: "Publisher", v: "İskenderiye Yayınları" },
  { k: "Book I — Poetry", v: "Mürekkep ve Köz (2025) · ISBN 978-625-9620-32-9" },
  { k: "Book II — Essay", v: "Tasfiye (25 August 2026)" },
  { k: "Recognition", v: "#1 Poetry on Trendyol · 10/10 on 1000Kitap · Valsanat No. 51" },
  { k: "Contact", v: EMAIL },
];

const ASSETS: { label: string; href: string; note: string }[] = [
  { label: "Author portrait", href: "/images/portre.jpg", note: "B&W · JPG" },
  { label: "Mürekkep ve Köz — front cover", href: "/murekkep-ve-koz-on-kapak.jpg", note: "800×1244 · JPG" },
  { label: "Mürekkep ve Köz — back cover", href: "/murekkep-ve-koz-arka-kapak.jpg", note: "800×1244 · JPG" },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--ink)" }}>
      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />{children}
    </span>
  );
}

export default function PressPage() {
  const en = site.en;
  const tr = site.tr;
  return (
    <main style={{ maxWidth: "980px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em" }}>Berkay Doğan</Link>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← berkaydogan.co</Link>
      </div>

      <Label>Press kit · Basın kiti</Label>
      <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.6rem, 7vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.95, margin: "1.5rem 0 1rem" }}>Press kit</h1>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.2rem, 2.4vw, 1.7rem)", color: "var(--muted)", maxWidth: "40ch" }}>
        Everything a journalist needs — facts, bio, and downloadable images. Free to use with credit.
      </p>

      {/* KÜNYE / AT A GLANCE */}
      <section style={{ marginTop: "clamp(3rem, 7vh, 5rem)", borderTop: "1px solid var(--line)", paddingTop: "2.5rem" }}>
        <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem" }}>At a glance</p>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(140px, 200px) 1fr" }}>
          {FACTS.map((f) => (
            <div key={f.k} style={{ display: "contents" }}>
              <div style={{ padding: "0.9rem 0", borderTop: "1px solid var(--line)", fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)" }}>{f.k}</div>
              <div style={{ padding: "0.9rem 0", borderTop: "1px solid var(--line)", fontSize: "1rem", color: "var(--ink)" }}>{f.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BIO */}
      <section style={{ marginTop: "clamp(3rem, 7vh, 5rem)", borderTop: "1px solid var(--line)", paddingTop: "2.5rem" }}>
        <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.75rem" }}>Bio — English</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "70ch" }}>
          {en.about.paras.map((p, i) => (
            <p key={i} style={{ fontSize: "1.02rem", lineHeight: 1.75, color: i === 0 ? "var(--ink)" : "var(--muted)" }}>{p}</p>
          ))}
        </div>
        <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", margin: "2.75rem 0 1.75rem" }}>Biyografi — Türkçe</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "70ch" }}>
          {tr.about.paras.map((p, i) => (
            <p key={i} style={{ fontSize: "1.02rem", lineHeight: 1.75, color: i === 0 ? "var(--ink)" : "var(--muted)" }}>{p}</p>
          ))}
        </div>
      </section>

      {/* ASSETS */}
      <section style={{ marginTop: "clamp(3rem, 7vh, 5rem)", borderTop: "1px solid var(--line)", paddingTop: "2.5rem" }}>
        <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem" }}>Downloads · Görseller</p>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {ASSETS.map((a) => (
            <a key={a.href} href={a.href} download style={{ display: "flex", flexDirection: "column", gap: "0.4rem", padding: "1.4rem 1.5rem", border: "1px solid var(--line)", borderRadius: "10px", background: "var(--bg-2)" }}>
              <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 500, fontSize: "1rem", color: "var(--ink)" }}>{a.label}</span>
              <span style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>{a.note} — Download ↓</span>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ marginTop: "clamp(3rem, 7vh, 5rem)", borderTop: "1px solid var(--line)", paddingTop: "2.5rem" }}>
        <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>Press contact</p>
        <a href={`mailto:${EMAIL}`} style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(1.3rem, 3vw, 2rem)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{EMAIL}</a>
        <div style={{ display: "flex", gap: "1.75rem", marginTop: "1.5rem", fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">Substack</a>
        </div>
      </section>
    </main>
  );
}
