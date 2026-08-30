"use client";

import { useState } from "react";
import Link from "next/link";

/* /gom — "sitene günün közünü göm" aracı: canlı önizleme + kopyalanabilir kod. */

const KOD = `<!-- Günün Közü — berkaydogan.co -->
<iframe src="https://www.berkaydogan.co/embed/gunun-sozu/"
  title="Günün Közü — Berkay Doğan"
  style="width:100%;max-width:420px;height:210px;border:1px solid rgba(128,128,128,0.25);border-radius:14px"
  loading="lazy"></iframe>`;

const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" };

export default function GomAraci() {
  const [kopyalandi, setKopyalandi] = useState(false);
  const kopyala = async () => {
    try {
      await navigator.clipboard.writeText(KOD);
      setKopyalandi(true);
      window.setTimeout(() => setKopyalandi(false), 1800);
    } catch { /* yoksay */ }
  };

  return (
    <main style={{ maxWidth: "760px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 2rem) 6rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>Berkay Doğan</Link>
        <Link href="/sozler" style={{ ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← Sözler</Link>
      </div>

      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", ...mono, letterSpacing: "0.26em", color: "var(--ink)" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />Göm
      </span>
      <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.2rem, 6vw, 3.8rem)", letterSpacing: "-0.04em", lineHeight: 0.98, margin: "1.5rem 0 1rem", color: "var(--ink)" }}>Sitene günün közünü göm</h1>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.1rem, 2.3vw, 1.5rem)", color: "var(--muted)", maxWidth: "44ch", lineHeight: 1.5 }}>
        Blogun ya da siten varsa, aşağıdaki tek parça kodu yapıştır — her gün taze bir söz, kendiliğinden.
      </p>

      <section style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)" }}>
        <p style={{ ...mono, color: "var(--muted)", marginBottom: "1rem" }}>Canlı önizleme</p>
        <iframe src="/embed/gunun-sozu/" title="Günün Közü — önizleme"
          style={{ width: "100%", maxWidth: "420px", height: "210px", border: "1px solid var(--line)", borderRadius: "14px" }} />
      </section>

      <section style={{ marginTop: "2.5rem" }}>
        <p style={{ ...mono, color: "var(--muted)", marginBottom: "1rem" }}>Kod</p>
        <pre style={{ background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: "12px", padding: "1.25rem 1.4rem", fontSize: "0.78rem", lineHeight: 1.7, overflowX: "auto", color: "var(--ink)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
          {KOD}
        </pre>
        <button onClick={kopyala} className="cg-btn cg-btn-fill" style={{ marginTop: "1rem" }}>
          {kopyalandi ? "Kopyalandı ✓" : "Kodu kopyala"}
        </button>
      </section>

      <p style={{ marginTop: "2.5rem", fontSize: "0.85rem", color: "var(--muted)", maxWidth: "58ch", lineHeight: 1.7 }}>
        Kart karanlık temalıdır ve her ziyaretçiye o günün sözünü gösterir. Boyutu <code style={{ color: "var(--accent)" }}>max-width</code> ve <code style={{ color: "var(--accent)" }}>height</code> ile ayarlayabilirsin.
      </p>
    </main>
  );
}
