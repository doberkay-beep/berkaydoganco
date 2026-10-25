import type { Metadata } from "next";
import { KARELER } from "@/lib/goruntu";

export const metadata: Metadata = {
  title: { absolute: "Görüntü ve Dize — Berkay Doğan" },
  description: "Berkay Doğan'ın fotoğrafları ve her birinin yanında kitaplarından bir dize: Mürekkep ve Köz ve Tasfiye.",
  alternates: { canonical: "/goruntu" },
  openGraph: { title: "Görüntü ve Dize — Berkay Doğan", description: "Fotoğraflar ve kitaplardan dizeler.", images: ["/goruntu/0219.jpg"] },
};

const KITAP = { mvk: "Mürekkep ve Köz", tas: "Tasfiye" };
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" };

export default function Sayfa() {
  return (
    <main style={{ maxWidth: "1180px", margin: "0 auto", padding: "clamp(5rem, 12vh, 7rem) clamp(1.25rem, 5vw, 3rem) 6rem" }}>
      <style>{`
        .gd-izgara{columns:1;column-gap:clamp(1.5rem,3vw,2.5rem)}
        @media (min-width:700px){.gd-izgara{columns:2}}
        @media (min-width:1100px){.gd-izgara{columns:3}}
        .gd-kare{break-inside:avoid;margin:0 0 clamp(2rem,5vw,3rem)}
        .gd-kare img{display:block;width:100%;height:auto;border-radius:4px}
      `}</style>
      <header style={{ maxWidth: "640px", marginBottom: "clamp(3rem, 8vh, 5rem)" }}>
        <p style={mono}>Fotoğraf</p>
        <h1 className="ed-display" style={{ fontSize: "clamp(2.8rem, 8vw, 5rem)", marginTop: "0.8rem" }}>Görüntü ve Dize</h1>
        <p className="cg-serif" style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.4rem)", lineHeight: 1.6, marginTop: "1.2rem", color: "var(--muted)" }}>
          Bir şehri yürürken çektiğim kareler. Her birinin yanında, kitaplarımdan o kareyle konuşan bir dize.
        </p>
      </header>
      <div className="gd-izgara">
        {KARELER.map((k) => (
          <figure key={k.no} className="gd-kare">
            <img src={`/goruntu/${k.no}.jpg`} alt={k.s} width={k.w} height={k.h} loading="lazy" decoding="async" />
            <figcaption style={{ marginTop: "0.9rem" }}>
              <span className="cg-serif" style={{ display: "block", fontStyle: "italic", fontSize: "1.15rem", lineHeight: 1.45 }} lang="tr">{k.s}</span>
              <span style={{ ...mono, display: "block", marginTop: "0.45rem" }}>{KITAP[k.k]}{k.p ? `, s. ${k.p}` : ""}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p style={{ ...mono, marginTop: "2rem" }}>Fotoğraflar: Berkay Doğan · Canon EOS R50</p>
    </main>
  );
}
