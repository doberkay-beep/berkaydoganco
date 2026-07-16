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

  const chipStyle = (on: boolean): React.CSSProperties => ({
    fontFamily: "var(--font-mono)",
    fontSize: "0.6rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    padding: "0.5rem 0.95rem",
    borderRadius: "2px",
    cursor: "pointer",
    border: `1px solid ${on ? "var(--bordo)" : "var(--dim)"}`,
    color: on ? "var(--cream)" : "var(--gray)",
    background: on ? "var(--bordo)" : "transparent",
  });

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .yazi-row { transition: background 0.28s ease, padding-left 0.28s ease; }
        .yazi-row:hover { background: var(--bg2); padding-left: 3.5rem !important; }
        .yazi-row:hover .yazi-title { color: var(--accent); }
        .yazi-title { transition: color 0.25s ease; }
        .tag-chip { transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease; }
        .tag-chip:hover { border-color: var(--bordo) !important; color: var(--cream) !important; }
        @media (max-width: 768px) {
          .yazilar-hero { padding: 4rem 1.5rem !important; }
          .yazi-filter { padding: 1.5rem 1.5rem !important; }
          .yazi-row { padding: 2rem 1.5rem !important; }
          .yazi-row:hover { padding-left: 1.5rem !important; }
        }
      `}</style>

      <section className="yazilar-hero" style={{ minHeight: "45vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "4rem 2.75rem", borderBottom: "1px solid var(--border)" }}>
        <p className="eyebrow" style={{ marginBottom: "2rem" }}>{kicker}</p>
        <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 0.95, letterSpacing: "-0.035em", color: "var(--cream)", marginBottom: "1.25rem" }}>{kicker}</h1>
        <p style={{ fontFamily: "var(--font-grotesk)", fontStyle: "italic", fontWeight: 300, fontSize: "1.25rem", color: "var(--gray)", maxWidth: "440px", lineHeight: 1.6 }}>{intro}</p>
      </section>

      {allTags.length > 0 && (
        <section className="yazi-filter" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center", padding: "1.75rem 2.75rem", borderBottom: "1px solid var(--border)" }}>
          <button className="tag-chip" onClick={() => setActive(null)} style={chipStyle(active === null)}>
            {allLabel}
          </button>
          {allTags.map((tag) => {
            const on = active === tag;
            return (
              <button key={tag} className="tag-chip" onClick={() => setActive(on ? null : tag)} style={chipStyle(on)}>
                {tag}
              </button>
            );
          })}
        </section>
      )}

      <section>
        {filtered.length === 0 ? (
          <div style={{ padding: "6rem 2.75rem", textAlign: "center" }}>
            <p className="sec-meta">{empty}</p>
          </div>
        ) : (
          filtered.map((y) => (
            <Link key={y.slug} href={`${base}/yazilar/${y.slug}`} className="yazi-row" style={{ display: "block", padding: "2.75rem", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "2rem", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "min(260px, 100%)" }}>
                  <p className="sec-meta" style={{ marginBottom: "0.85rem" }}>
                    {formatDate(y.date, lang)} · {lang === "en" ? `${y.readingTime} min read` : `${y.readingTime} dk okuma`}
                  </p>
                  <h2 className="yazi-title" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "clamp(1.5rem, 3vw, 2.1rem)", letterSpacing: "-0.01em", color: "var(--cream)", marginBottom: "0.85rem" }}>{y.title}</h2>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.8, color: "var(--text-muted)", maxWidth: "560px" }}>{y.excerpt}</p>
                </div>
                <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--text-dim)" }}>→</span>
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
