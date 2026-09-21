import { ImageResponse } from "next/og";
import { YAZILAR } from "@/lib/yazilar";

/* Her yazı sayfasına derlemede üretilen markalı paylaşım kartı. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return YAZILAR.map((y) => ({ slug: y.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const y = YAZILAR.find((x) => x.slug === slug) ?? YAZILAR[0];
  const boy = y.title.length > 44 ? 58 : y.title.length > 26 ? 72 : 88;

  return new ImageResponse(
    (
      <div style={{
        height: "100%", width: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "flex-start", textAlign: "left",
        background: "linear-gradient(160deg, #241a13 0%, #0b0a09 55%, #060504 100%)",
        padding: "80px 90px",
      }}>
        <div style={{ display: "flex", fontSize: 22, fontWeight: 700, color: "#3A5BD9", letterSpacing: 3, marginBottom: 26 }}>YAZI</div>
        <div style={{ display: "flex", fontSize: boy, fontWeight: 500, color: "#F1EDE4", lineHeight: 1.08, maxWidth: 1020 }}>
          {y.title}
        </div>
        {y.dek ? (
          <div style={{ display: "flex", fontSize: 28, fontStyle: "italic", color: "#b8b1a6", lineHeight: 1.4, marginTop: 28, maxWidth: 900 }}>
            {y.dek.length > 120 ? `${y.dek.slice(0, 117)}…` : y.dek}
          </div>
        ) : null}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 46 }}>
          <div style={{ display: "flex", width: 40, height: 4, background: "#3A5BD9" }} />
          <div style={{ display: "flex", fontSize: 22, fontWeight: 700, color: "#3A5BD9", letterSpacing: 2 }}>BERKAY DOĞAN</div>
          <div style={{ display: "flex", fontSize: 20, color: "#9a948a" }}>· berkaydogan.co</div>
        </div>
      </div>
    ),
    size
  );
}
