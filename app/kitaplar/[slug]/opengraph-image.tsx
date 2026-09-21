import { ImageResponse } from "next/og";
import { KITAPLAR } from "@/lib/kitaplar";

/* Her kitap sayfasına derlemede üretilen markalı paylaşım kartı. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return KITAPLAR.map((k) => ({ slug: k.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const k = KITAPLAR.find((x) => x.slug === slug) ?? KITAPLAR[0];
  const boy = k.ad.length > 20 ? 78 : 100;

  return new ImageResponse(
    (
      <div style={{
        height: "100%", width: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "flex-start",
        background: "linear-gradient(160deg, #241a13 0%, #0b0a09 55%, #060504 100%)",
        padding: "80px 90px",
      }}>
        <div style={{ display: "flex", fontSize: 22, fontWeight: 700, color: "#3A5BD9", letterSpacing: 3, marginBottom: 26 }}>
          {`KİTAP · ${k.tur.toLocaleUpperCase("tr")}`}
        </div>
        <div style={{ display: "flex", fontSize: boy, fontWeight: 500, color: "#F1EDE4", lineHeight: 1.05, maxWidth: 1020 }}>
          {k.ad}
        </div>
        <div style={{ display: "flex", fontSize: 27, fontStyle: "italic", color: "#b8b1a6", lineHeight: 1.4, marginTop: 28, maxWidth: 920 }}>
          {k.desc.length > 130 ? `${k.desc.slice(0, 127)}…` : k.desc}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 44 }}>
          <div style={{ display: "flex", width: 40, height: 4, background: "#3A5BD9" }} />
          <div style={{ display: "flex", fontSize: 22, fontWeight: 700, color: "#3A5BD9", letterSpacing: 2 }}>BERKAY DOĞAN</div>
          <div style={{ display: "flex", fontSize: 20, color: "#9a948a" }}>· berkaydogan.co</div>
        </div>
      </div>
    ),
    size
  );
}
