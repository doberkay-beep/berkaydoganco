"use client";

import { useState } from "react";

// Web Share API + kopyala yedeği. Detay sayfalarında "paylaş" butonu.
export function Paylas({ url, title }: { url: string; title: string }) {
  const [durum, setDurum] = useState<"" | "kopyalandi">("");

  async function paylas() {
    const tam = url.startsWith("http") ? url : `https://www.berkaydogan.co${url}`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, url: tam });
        return;
      }
      await navigator.clipboard.writeText(tam);
      setDurum("kopyalandi");
      setTimeout(() => setDurum(""), 1600);
    } catch {
      // iptal / desteklenmiyor — sessiz
    }
  }

  return (
    <button
      onClick={paylas}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        fontFamily: "var(--font-grotesk)", fontSize: "0.78rem", fontWeight: 500,
        letterSpacing: "0.08em", padding: "0.9rem 1.5rem", borderRadius: "100px",
        border: "1px solid var(--line)", color: "var(--ink)", background: "transparent",
        cursor: "pointer",
      }}
    >
      {durum === "kopyalandi" ? "Bağlantı kopyalandı ✓" : "Paylaş"}
    </button>
  );
}
