import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Berkay Doğan — Poet & Writer";
export const dynamic = "force-static";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF9F6",
          padding: "72px 84px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#14120F", fontSize: 27, letterSpacing: 7 }}>
          <div style={{ width: 16, height: 16, borderRadius: 8, background: "#E5402A" }} />
          POET &amp; WRITER — ISTANBUL
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 156, fontWeight: 800, color: "#14120F", lineHeight: 1, letterSpacing: -5 }}>Berkay Doğan</div>
          <div style={{ fontSize: 46, color: "#6B675F", marginTop: 26 }}>Writing is the quietest confession of existence.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#14120F", fontSize: 27 }}>
          <div>berkaydogan.co</div>
          <div style={{ color: "#E5402A", fontWeight: 700 }}>Tasfiye — Aug 2026</div>
        </div>
      </div>
    ),
    size
  );
}
