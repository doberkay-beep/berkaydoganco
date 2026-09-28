"use client";

import Link from "next/link";
import { satinAlTikla } from "@/lib/olcum";

/* Yazı sonu kitap çağrısı — yazıyı bitiren okura sıcak, kısa bir köprü. */

export function KitapCagrisi() {
  return (
    <aside
      style={{
        marginTop: "3rem", padding: "1.4rem 1.5rem", border: "1px solid var(--line)",
        borderRadius: "14px", background: "var(--bg-2)",
        display: "flex", gap: "1.2rem", alignItems: "center", flexWrap: "wrap",
      }}
    >
      <img
        src="/tasfiye-kapak-400.jpg"
        alt="Tasfiye — kapak"
        loading="lazy"
        decoding="async"
        style={{ width: "72px", borderRadius: "4px", boxShadow: "0 12px 26px rgba(0,0,0,0.35)" }}
      />
      <div style={{ flex: 1, minWidth: "220px" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.02rem", lineHeight: 1.5, color: "var(--ink)" }}>
          Bu yazıyı sevdiysen, Tasfiye&apos;de bu sesin 151 sayfası var.
        </p>
        <div style={{ marginTop: "0.7rem", display: "flex", gap: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
          <a
            href="/git/trendyol/"
            rel="noopener"
            onClick={() => satinAlTikla("trendyol", "yazi-karti")}
            style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.76rem", fontWeight: 600, letterSpacing: "0.08em", padding: "0.65rem 1.2rem", borderRadius: "100px", background: "var(--accent)", color: "var(--accent-ink)" }}
          >
            Satın al →
          </a>
          <Link href="/kitaplar/tasfiye" style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>
            Kitabı incele
          </Link>
        </div>
      </div>
    </aside>
  );
}
