"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { YaziMeta } from "@/lib/yazilar";
import type { Lang } from "@/lib/content";
import { Newsletter } from "./Newsletter";

export function YazilarList({ yazilar, lang }: { yazilar: YaziMeta[]; lang: Lang }) {
  const base = lang === "en" ? "/en" : "";
  const kicker = lang === "en" ? "WRITINGS" : "YAZILAR";
  const intro = lang === "en"
    ? "Essays, fragments, and notes."
    : "Denemeler, kesitler ve notlar.";
  const empty = lang === "en" ? "No writings yet." : "Henüz yazı yok.";
  const allLabel = lang === "en" ? "ALL" : "TÜMÜ";

  const allTags = useMemo(() => {
    const set = new Set<string>();
    yazilar.forEach((y) => y.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [yazilar]);

  const [active, setActive] = useState<string | null>(null);
  const filtered = active ? yazilar.filter((y) => y.tags.includes(active)) : yazilar;

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .yazi-row { transition: background 0.25s, padding-left 0.25s; }
        .yazi-row:hover { background: var(--bg-panel); padding-left: 4.5rem !important; }
        .tag-chip { transition: color 0.2s, border-color 0.2s, background 0.2s; }
        .tag-chip:hover { color: var(--text); border-color: var(--border-bright); }
        @media (max-width: 768px) {
          .yazilar-hero { padding: 4rem 1.5rem !important; }
          .yazi-filter { padding: 1.5rem 1.5rem !important; }
          .yazi-row { padding: 2rem 1.5rem !important; }
          .yazi-row:hover { padding-left: 1.5rem !important; }
        }
      `}</style>

      <section className="yazilar-hero" style={{ minHeight: "45vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "4rem", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "2rem" }}>{kicker}</p>
        <h1 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(3rem, 9vw, 7rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.035em", color: "var(--text)", marginBottom: "1.5rem" }}>{kicker}</h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "440px", lineHeight: 1.8 }}>{intro}</p>
      </section>

      {allTags.length > 0 && (
        <section className="yazi-filter" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center", padding: "1.75rem 4rem", borderBottom: "1px solid var(--border)" }}>
          <button
            className="tag-chip"
            onClick={() => setActive(null)}
            style={{
              fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "0.5rem 0.95rem", borderRadius: "999px", cursor: "pointer",
              border: `1px solid ${active === null ? "var(--text)" : "var(--border-bright)"}`,
              color: active === null ? "var(--bg)" : "var(--text-muted)",
              background: active === null ? "var(--text)" : "transparent",
            }}
          >
            {allLabel}
          </button>
          {allTags.map((tag) => {
            const on = active === tag;
            return (
              <button
                key={tag}
                className="tag-chip"
                onClick={() => setActive(on ? null : tag)}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "0.5rem 0.95rem", borderRadius: "999px", cursor: "pointer",
                  border: `1px solid ${on ? "var(--text)" : "var(--border-bright)"}`,
                  color: on ? "var(--bg)" : "var(--text-muted)",
                  background: on ? "var(--text)" : "transparent",
                }}
              >
                {tag}
              </button>
            );
          })}
        </section>
      )}

      <section>
        {filtered.length === 0 ? (
          <div style={{ padding: "6rem 4rem", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-dim)", letterSpacing: "0.1em" }}>{empty}</p>
          </div>
        ) : (
          filtered.map((y) => (
            <Link key={y.slug} href={`${base}/yazilar/${y.slug}`} className="yazi-row" style={{ display: "block", padding: "2.75rem 4rem", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "2rem", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "min(260px, 100%)" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--text-dim)", marginBottom: "0.85rem" }}>
                    {formatDate(y.date, lang)} · {lang === "en" ? `${y.readingTime} min read` : `${y.readingTime} dk okuma`}
                  </p>
                  <h2 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 700, color: "var(--text)", marginBottom: "0.85rem", letterSpacing: "-0.01em" }}>{y.title}</h2>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", lineHeight: 1.7, color: "var(--text-muted)", maxWidth: "560px" }}>{y.excerpt}</p>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--text-dim)" }}>→</span>
              </div>
            </Link>
          ))
        )}
      </section>

      <Newsletter lang={lang} />
    </div>
  );
}

function formatDate(date: string, lang: Lang): string {
  if (!date) return "";
  const d = new Date(date);
  const months = lang === "en"
    ? ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    : ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
