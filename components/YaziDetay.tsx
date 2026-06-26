import Link from "next/link";
import type { Yazi, YaziMeta } from "@/lib/yazilar";
import type { Lang } from "@/lib/content";

export function YaziDetay({
  yazi,
  lang,
  prev = null,
  next = null,
}: {
  yazi: Yazi;
  lang: Lang;
  prev?: YaziMeta | null;
  next?: YaziMeta | null;
}) {
  const base = lang === "en" ? "/en" : "";
  const back = lang === "en" ? "← ALL WRITINGS" : "← TÜM YAZILAR";
  const readLabel = lang === "en" ? `${yazi.readingTime} min read` : `${yazi.readingTime} dk okuma`;
  const prevLabel = lang === "en" ? "PREVIOUS" : "ÖNCEKİ";
  const nextLabel = lang === "en" ? "NEXT" : "SONRAKİ";

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .yazi-content p { font-family: var(--font-mono); font-size: 1rem; line-height: 2; color: var(--text-soft); margin-bottom: 1.6rem; }
        .yazi-content h2 { font-family: var(--font-grotesk); font-size: 1.5rem; font-weight: 700; color: var(--text); margin: 3rem 0 1.5rem; }
        .yazi-content em { font-style: italic; color: var(--text); }
        .yazi-content blockquote { border-left: 2px solid var(--border-bright); padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: var(--text-muted); }
        .yazi-adjacent { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); border-top: 1px solid var(--border); }
        .yazi-adjacent > a, .yazi-adjacent > div { background: var(--bg); padding: 2.5rem 4rem; transition: background 0.25s; }
        .yazi-adjacent > a:hover { background: var(--bg-panel); }
        .yazi-adjacent .nav-next { text-align: right; }
        @media (max-width: 768px) {
          .yazi-hero { padding: 4rem 1.5rem 3rem !important; }
          .yazi-body { padding: 3rem 1.5rem 5rem !important; }
          .yazi-adjacent { grid-template-columns: 1fr !important; }
          .yazi-adjacent > a, .yazi-adjacent > div { padding: 2rem 1.5rem !important; }
          .yazi-adjacent .nav-next { text-align: left !important; }
        }
      `}</style>

      <article>
        <div className="yazi-hero" style={{ padding: "5rem 4rem 3rem", borderBottom: "1px solid var(--border)", maxWidth: "820px", margin: "0 auto", width: "100%" }}>
          <Link href={`${base}/yazilar`} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--text-dim)", display: "inline-block", marginBottom: "2.5rem" }}>{back}</Link>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--text-dim)", marginBottom: "1.5rem" }}>{formatDate(yazi.date, lang)} · {readLabel}</p>
          <h1 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.025em", color: "var(--text)" }}>{yazi.title}</h1>
        </div>

        <div className="yazi-body yazi-content" style={{ padding: "4rem 4rem 6rem", maxWidth: "820px", margin: "0 auto", width: "100%" }} dangerouslySetInnerHTML={{ __html: yazi.contentHtml }} />

        {(prev || next) && (
          <nav className="yazi-adjacent" aria-label={lang === "en" ? "Adjacent writings" : "Komşu yazılar"}>
            {prev ? (
              <Link href={`${base}/yazilar/${prev.slug}`} className="nav-prev">
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "0.9rem" }}>← {prevLabel}</p>
                <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{prev.title}</p>
              </Link>
            ) : (
              <div aria-hidden="true" />
            )}
            {next ? (
              <Link href={`${base}/yazilar/${next.slug}`} className="nav-next">
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "0.9rem" }}>{nextLabel} →</p>
                <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{next.title}</p>
              </Link>
            ) : (
              <div aria-hidden="true" />
            )}
          </nav>
        )}

        <div style={{ borderTop: "1px solid var(--border)", padding: "3rem 4rem", textAlign: "center" }}>
          <Link href={`${base}/yazilar`} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--text-dim)" }}>{back}</Link>
        </div>
      </article>
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
