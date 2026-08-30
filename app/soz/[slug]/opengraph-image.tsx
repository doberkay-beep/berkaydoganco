import { ImageResponse } from "next/og";
import { SOZLER, sozSlug, sozBul, KITAP_ADI } from "@/lib/sozler";

/* Her söz sayfasına derlemede üretilen markalı paylaşım kartı. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return SOZLER.map((x) => ({ slug: sozSlug(x.s) }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const soz = sozBul(slug) ?? SOZLER[0];
  const boy = soz.s.length > 130 ? 38 : soz.s.length > 80 ? 46 : 56;

  return new ImageResponse(
    (
      <div style={{
        height: "100%", width: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        background: "linear-gradient(160deg, #241a13 0%, #0b0a09 55%, #060504 100%)",
        padding: "70px 90px",
      }}>
        <div style={{ display: "flex", width: 84, height: 4, background: "#E5402A", marginBottom: 42 }} />
        <div style={{ display: "flex", fontSize: boy, fontStyle: "italic", color: "#F1EDE4", lineHeight: 1.4, maxWidth: 1000 }}>
          {`“${soz.s}”`}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 46 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 58, height: 58, borderRadius: 29, border: "3px solid rgba(241,237,228,0.8)", position: "relative" }}>
            <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: "#F1EDE4" }}>BD</div>
            <div style={{ display: "flex", position: "absolute", top: -8, left: 21, width: 12, height: 12, borderRadius: 6, background: "#E5402A" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: "#E5402A", letterSpacing: 2 }}>BERKAY DOĞAN</div>
            <div style={{ display: "flex", fontSize: 19, color: "#9a948a" }}>{`${KITAP_ADI[soz.k]}${soz.p ? ` · s. ${soz.p}` : ""} — berkaydogan.co`}</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
