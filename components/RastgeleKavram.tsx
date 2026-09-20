"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Rastgele keşif — verilen slug listesinden birine götürür. Sitede kalma +
// içerik keşfi. Statik export uyumlu (istemci tarafında seçer).
export function RastgeleKavram({ slugs, etiket = "Rastgele bir kavram →" }: { slugs: string[]; etiket?: string }) {
  const router = useRouter();
  const [gidiyor, setGidiyor] = useState(false);

  function git() {
    if (!slugs.length) return;
    setGidiyor(true);
    const s = slugs[Math.floor(Math.random() * slugs.length)];
    router.push(`/sozluk/${s}`);
  }

  return (
    <button
      onClick={git}
      disabled={gidiyor}
      style={{
        fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 500,
        letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)",
        background: "transparent", border: "none", borderBottom: "1px solid var(--accent)",
        paddingBottom: "2px", cursor: "pointer",
      }}
    >
      {etiket}
    </button>
  );
}
