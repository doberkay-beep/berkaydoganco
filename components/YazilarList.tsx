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

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .yazi-row { transition: background 0.25s, padding-left 0.25s; }
        .yazi-row:hover { background: var(--bg-panel); padding-left: 4.5rem !important; }
        @media (max-width: 768px) {
          .yazilar-hero { padding: 4rem 1.5rem !important; }
          .yazi-row { padding: 2rem 1.5rem !important; }
          .yazi-row:hover { padding-left: 1.5rem !important; }
        }
      `}</style>

      <section className="yazilar-hero" style={{ minHeight: "45vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "4rem", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "2rem" }}>{kicker}</p>
        <h1 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(3rem, 9vw, 7rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "1.5rem" }}>{kicker}</h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "440px", lineHeight: 1.8 }}>{intro}</p>
      </section>

      <section>
        {yazilar.length === 0 ? (
          <div style={{ padding: "6rem 4rem", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-dim)", letterSpacing: "0.1em" }}>{empty}</p>
          </div>
        ) : (
          yazilar.map((y, i) => (
            <Link key={y.slug} href={`${base}/yazilar/${y.slug}`} className="yazi-row" style={{ display: "block", padding: "2.75rem 4rem", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "2rem", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "260px" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--text-dim)", marginBottom: "0.85rem" }}>{formatDate(y.date, lang)}</p>
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
