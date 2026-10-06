import type { Metadata } from "next";
import Link from "next/link";
import { NOTLAR } from "@/lib/notlar";
import { BreadcrumbSchema } from "@/components/Schema";
import { Reveal } from "@/components/Kabuk";

export const metadata: Metadata = {
  title: { absolute: "Gece Vardiyası Notları — Berkay Doğan" },
  description: "Berkay Doğan'ın gece vardiyasında, molada yazdığı kısa notlar. Saat damgasıyla, olduğu gibi.",
  alternates: { canonical: "/notlar" },
  openGraph: {
    title: "Gece Vardiyası Notları — Berkay Doğan",
    description: "Gece vardiyasında, molada yazılmış kısa notlar.",
    url: "https://www.berkaydogan.co/notlar",
    type: "website",
  },
};

const ust: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase" };

export default function NotlarPage() {
  return (
    <main style={{ maxWidth: "820px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      <BreadcrumbSchema name="Notlar" path="/notlar/" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em" }}>Berkay Doğan</Link>
        <Link href="/" style={{ ...ust, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← berkaydogan.co</Link>
      </div>

      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", ...ust, letterSpacing: "0.26em", color: "var(--ink)" }}>
        <span className="bd-nabiz" />Gece vardiyası
      </span>
      <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(2.6rem, 7vw, 5rem)", letterSpacing: "-0.015em", lineHeight: 0.95, margin: "1.5rem 0 1rem" }}>Notlar</h1>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.2rem, 2.4vw, 1.7rem)", color: "var(--muted)", maxWidth: "44ch" }}>
        Gece vardiyasında, molada yazılanlar. Saat damgasıyla, olduğu gibi.
      </p>

      <Reveal as="section" style={{ marginTop: "clamp(3rem, 7vh, 5rem)" }}>
        {NOTLAR.map((n) => (
          <article key={n.no} id={`not-${String(n.no).padStart(2, "0")}`} style={{ padding: "2.25rem 0", borderTop: "1px solid var(--line)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", ...ust, color: "var(--muted)" }}>
              <span>Not {String(n.no).padStart(2, "0")} · {new Date(n.tarihISO).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span style={{ color: "var(--ink)", fontWeight: 700, letterSpacing: "0.12em" }}>{n.saat}</span>
            </div>
            <span style={{ display: "block", width: "48px", height: "2px", background: "var(--accent)", margin: "1.6rem 0 1.4rem" }} />
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(1.45rem, 3.4vw, 2.2rem)", lineHeight: 1.35, color: "var(--ink)", maxWidth: "30ch" }}>{n.metin}</p>
          </article>
        ))}
      </Reveal>
    </main>
  );
}
