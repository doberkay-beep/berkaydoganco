"use client";

import { useEffect } from "react";

/* /git/[kanal] ara sayfası — Vercel Analytics görüntülemeyi saydıktan sonra
   hedefe geçer. location.replace: geri tuşu ara sayfaya düşmesin. */
export function Yonlendir({ hedef, kanal }: { hedef: string; kanal: string }) {
  useEffect(() => {
    const id = window.setTimeout(() => window.location.replace(hedef), 150);
    return () => window.clearTimeout(id);
  }, [hedef]);

  return (
    <main style={{
      minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: "1.1rem", background: "#0b0a09", color: "#F1EDE4",
      padding: "2rem", textAlign: "center",
    }}>
      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E5402A" }} aria-hidden="true" />
      <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#9a948a" }}>
        Yönlendiriliyorsunuz — {kanal}
      </p>
      <a href={hedef} rel="noopener" style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.8rem", color: "#F1EDE4", borderBottom: "1px solid #E5402A", paddingBottom: "2px" }}>
        Devam etmek için tıklayın
      </a>
    </main>
  );
}
