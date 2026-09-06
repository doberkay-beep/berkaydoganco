"use client";

import { useState } from "react";

/* Basın kiti — metni tek tıkla panoya kopyalayan küçük düğme. */
export function KopyalaMetin({ metin, etiket = "Kopyala" }: { metin: string; etiket?: string }) {
  const [ok, setOk] = useState(false);
  const kopyala = async () => {
    try {
      await navigator.clipboard.writeText(metin);
      setOk(true);
      window.setTimeout(() => setOk(false), 1800);
    } catch { /* yoksay */ }
  };
  return (
    <button onClick={kopyala} style={{
      display: "inline-flex", alignItems: "center", gap: "0.4rem", cursor: "pointer",
      fontFamily: "var(--font-grotesk)", fontSize: "0.64rem", fontWeight: 500,
      letterSpacing: "0.12em", textTransform: "uppercase",
      padding: "0.45rem 0.9rem", borderRadius: "100px",
      background: "transparent", color: ok ? "var(--accent)" : "var(--muted)",
      border: `1px solid ${ok ? "var(--accent)" : "var(--line)"}`,
      transition: "color 0.2s ease, border-color 0.2s ease",
    }}>
      {ok ? "Kopyalandı ✓" : etiket}
    </button>
  );
}
