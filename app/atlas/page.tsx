import type { Metadata } from "next";
import Link from "next/link";
import { SOZLER, sozSlug, TEMA_ADI, TEMALAR } from "@/lib/sozler";
import Atlas, { type AtlasData, type AtlasNode, type AtlasEdge } from "@/components/Atlas";

export const dynamic = "force-static";

const SITE = "https://www.berkaydogan.co";

export const metadata: Metadata = {
  title: { absolute: "Zihin Atlası — Berkay Doğan" },
  description: "Berkay Doğan'ın kitaplarındaki bütün sözler, temalara göre gezilebilir bir harita. Bir bölgeye dokun; o duygunun bütün cümleleri açılsın.",
  alternates: { canonical: "/atlas" },
  openGraph: {
    title: "Zihin Atlası — Berkay Doğan",
    description: "Sözlerin temalara göre haritası. Gezilebilir bir zihin atlası.",
    url: `${SITE}/atlas`,
    type: "website",
  },
};

function atlasVerisi(): AtlasData {
  const cx = 500, cy = 430, R = 330;
  const nodes: AtlasNode[] = TEMALAR.map((slug, i) => {
    const q = SOZLER.filter((x) => x.t.includes(slug));
    const count = q.length;
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / TEMALAR.length;
    const r = Math.min(58, 22 + Math.sqrt(count) * 7);
    return {
      slug,
      ad: TEMA_ADI[slug] ?? slug,
      count,
      mvk: q.filter((x) => x.k === "mvk").length,
      tas: q.filter((x) => x.k === "tas").length,
      x: Math.round(cx + R * Math.cos(angle)),
      y: Math.round(cy + R * Math.sin(angle)),
      r: Math.round(r),
    };
  });

  const edges: AtlasEdge[] = [];
  for (let i = 0; i < TEMALAR.length; i++) {
    for (let j = i + 1; j < TEMALAR.length; j++) {
      const w = SOZLER.filter((x) => x.t.includes(TEMALAR[i]) && x.t.includes(TEMALAR[j])).length;
      if (w > 0) edges.push({ a: i, b: j, w });
    }
  }

  const quotes: AtlasData["quotes"] = {};
  for (const slug of TEMALAR) {
    quotes[slug] = SOZLER.filter((x) => x.t.includes(slug)).map((x) => ({
      s: x.s, slug: sozSlug(x.s), k: x.k, p: x.p,
    }));
  }

  return { nodes, edges, quotes, toplamSoz: SOZLER.length };
}

export default function AtlasPage() {
  const data = atlasVerisi();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Zihin Atlası — Berkay Doğan",
        url: `${SITE}/atlas/`,
        description: "Berkay Doğan'ın sözlerinin temalara göre gezilebilir haritası.",
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Berkay Doğan", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Zihin Atlası", item: `${SITE}/atlas/` },
        ],
      },
    ],
  };

  const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" };

  return (
    <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1rem, 4vw, 3rem) 5rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(2.5rem, 7vh, 4rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>Berkay Doğan</Link>
        <Link href="/sozler" style={{ ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← Sözler</Link>
      </div>

      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", ...mono, letterSpacing: "0.26em", color: "var(--ink)" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />Zihin Atlası
      </span>
      <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(2.4rem, 6.5vw, 4.4rem)", letterSpacing: "-0.015em", lineHeight: 0.98, margin: "1.4rem 0 1rem", color: "var(--ink)" }}>
        Bir zihnin haritası
      </h1>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.15rem, 2.4vw, 1.6rem)", color: "var(--muted)", maxWidth: "52ch", lineHeight: 1.5 }}>
        {data.toplamSoz} söz, {TEMALAR.length} duygu bölgesine dağılmış. Birbirine değen temalar,
        aynı cümlede buluştukları için ışıktan çizgilerle bağlı. Bir bölgeye dokun — o duygunun bütün sözleri açılsın.
      </p>

      <div style={{ marginTop: "clamp(2rem, 5vh, 3.5rem)" }}>
        <Atlas data={data} />
      </div>
    </main>
  );
}
