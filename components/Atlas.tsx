"use client";

import { useState } from "react";
import Link from "next/link";

export type AtlasNode = { slug: string; ad: string; count: number; mvk: number; tas: number; x: number; y: number; r: number };
export type AtlasEdge = { a: number; b: number; w: number };
export type AtlasQuote = { s: string; slug: string; k: "mvk" | "tas"; p?: number };

export type AtlasData = {
  nodes: AtlasNode[];
  edges: AtlasEdge[];
  quotes: Record<string, AtlasQuote[]>;
  toplamSoz: number;
};

// Zihin Atlası — 12 tema bir haritanın bölgeleri; ortak sözler onları bağlar.
// Bir bölgeye tıkla, o temanın bütün sözleri açılsın. Köz Evreni rastgele
// süzülür; bu yapılandırılmış, gezilebilir bir atlastır.
export default function Atlas({ data }: { data: AtlasData }) {
  const [secili, setSecili] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const aktif = secili ?? hover;
  const aktifIdx = aktif ? data.nodes.findIndex((n) => n.slug === aktif) : -1;

  const komsu = (i: number) =>
    aktifIdx >= 0 && (data.edges.some((e) => (e.a === aktifIdx && e.b === i) || (e.b === aktifIdx && e.a === i)));

  const seciliNode = secili ? data.nodes.find((n) => n.slug === secili) : null;
  const seciliSozler = secili ? data.quotes[secili] ?? [] : [];

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox="0 0 1000 920" style={{ width: "100%", height: "auto", display: "block", touchAction: "manipulation" }} role="group" aria-label="Zihin Atlası — tema haritası">
        <defs>
          <radialGradient id="koz" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="#6E8BFF" />
            <stop offset="55%" stopColor="#3A5BD9" />
            <stop offset="100%" stopColor="#1E2F7D" />
          </radialGradient>
        </defs>

        {/* Kenarlar — ortak sözlü temalar */}
        {data.edges.map((e, i) => {
          const A = data.nodes[e.a], B = data.nodes[e.b];
          const iliskili = aktifIdx === e.a || aktifIdx === e.b;
          const op = aktifIdx >= 0 ? (iliskili ? 0.55 : 0.05) : Math.min(0.28, 0.06 + e.w * 0.05);
          return (
            <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
              stroke={iliskili ? "#3A5BD9" : "#FAFAFA"} strokeOpacity={op}
              strokeWidth={iliskili ? 1.6 : Math.min(2.4, 0.5 + e.w * 0.35)} />
          );
        })}

        {/* Düğümler — temalar */}
        {data.nodes.map((n, i) => {
          const iliskili = aktifIdx < 0 || i === aktifIdx || komsu(i);
          const secim = secili === n.slug;
          return (
            <g key={n.slug} transform={`translate(${n.x},${n.y})`}
              style={{ cursor: "pointer", opacity: iliskili ? 1 : 0.28, transition: "opacity 0.35s ease" }}
              tabIndex={0} role="button" aria-pressed={secim}
              aria-label={`${n.ad} — ${n.count} söz`}
              onMouseEnter={() => setHover(n.slug)} onMouseLeave={() => setHover(null)}
              onClick={() => setSecili(secim ? null : n.slug)}
              onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setSecili(secim ? null : n.slug); } }}>
              {secim && <circle r={n.r + 10} fill="none" stroke="#3A5BD9" strokeWidth={1.4} strokeOpacity={0.7} />}
              <circle r={n.r} fill="url(#koz)" stroke="#6E8BFF" strokeOpacity={secim ? 0.9 : 0.35} strokeWidth={1} />
              <text y={n.r + 22} textAnchor="middle" fill="#FAFAFA" fontSize={17}
                style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, letterSpacing: "0.01em" }}>{n.ad}</text>
              <text y={5} textAnchor="middle" fill="#050505" fontSize={Math.max(13, n.r * 0.6)}
                style={{ fontFamily: "var(--font-grotesk)", fontWeight: 800 }}>{n.count}</text>
            </g>
          );
        })}
      </svg>

      {/* Seçili tema paneli */}
      {seciliNode && (
        <div style={{
          position: "sticky", bottom: 0, marginTop: "1rem",
          background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: "16px",
          padding: "1.5rem", maxHeight: "50vh", overflowY: "auto", boxShadow: "0 -10px 40px rgba(0,0,0,0.4)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "var(--ink)", margin: 0 }}>
              {seciliNode.ad}
            </h2>
            <button onClick={() => setSecili(null)} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>kapat ✕</button>
          </div>
          <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginTop: "0.4rem" }}>
            {seciliNode.count} söz · Mürekkep ve Köz {seciliNode.mvk} · Tasfiye {seciliNode.tas}
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "1.2rem 0 0", display: "flex", flexDirection: "column", gap: "0.1rem" }}>
            {seciliSozler.map((q) => (
              <li key={q.slug}>
                <Link href={`/soz/${q.slug}`} style={{ display: "block", padding: "0.7rem 0", borderTop: "1px solid var(--line)", color: "var(--ink)", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.08rem", lineHeight: 1.5 }}>
                  &ldquo;{q.s}&rdquo;
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
