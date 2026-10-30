import type { Metadata } from "next";
import { TekSoz } from "@/components/TekSoz";

export const metadata: Metadata = {
  title: { absolute: "Tek Söz — Berkay Doğan" },
  description: "Bugün nasılsın? Ruh hâlini seç, Berkay Doğan'ın kitaplarından bir söz gelsin; bazıları İstanbul'dan gerçek görüntülerle.",
  alternates: { canonical: "/tek-soz" },
  openGraph: { title: "Tek Söz — Berkay Doğan", description: "Ruh hâlini seç, kitaplardan bir söz gelsin.", images: ["/tek-soz/bir-umut.jpg"] },
};

const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" };

export default function Sayfa() {
  return (
    <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "clamp(5rem, 12vh, 7rem) clamp(1.25rem, 5vw, 3rem) 6rem" }}>
      <header style={{ maxWidth: "640px", marginBottom: "clamp(2.5rem, 6vh, 4rem)" }}>
        <p style={mono}>Tek söz</p>
        <h1 style={{ fontFamily: "var(--font-serif, Georgia), Georgia, serif", fontSize: "clamp(2.6rem, 7vw, 4.4rem)", lineHeight: 1.02, fontWeight: 500, margin: ".6rem 0 1rem" }}>
          Bir hâl, <em>bir söz.</em>
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.6 }}>
          Ruh hâlini seç; Mürekkep ve Köz ile Tasfiye&apos;den bir söz gelsin. Bazıları kendi çektiğim İstanbul görüntüleriyle.
        </p>
      </header>
      <TekSoz />
    </main>
  );
}
