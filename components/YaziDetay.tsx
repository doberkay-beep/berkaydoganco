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
        .yazi-content p { font-family: var(--font-mono); font-weight: 300; font-size: 0.95rem; line-height: 2.05; color: var(--text-soft); margin-bottom: 1.7rem; }
        .yazi-content h2 { font-family: var(--font-grotesk); font-weight: 400; font-size: 1.9rem; letter-spacing: -0.01em; color: var(--cream); margin: 3.25rem 0 1.5rem; }
        .yazi-content em { font-style: italic; color: var(--cream); }
        .yazi-content strong { font-weight: 400; color: var(--cream); }
        .yazi-content a { color: var(--accent); border-bottom: 1px solid var(--dim); }
        .yazi-content a:hover { border-color: var(--accent); }
        .yazi-content blockquote {
          border-left: 1px solid var(--bordo);
          padding-left: 1.75rem;
          margin: 2.5rem 0;
          font-family: var(--font-grotesk);
          font-style: italic;
          font-weight: 300;
          font-size: 1.35rem;
          line-height: 1.7;
          color: var(--gray);
        }
        .yazi-content blockquote p { font-family: inherit; font-size: inherit; line-height: inherit; color: inherit; }
        .yazi-adjacent { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--dim); border-top: 1px solid var(--border); }
        .yazi-adjacent > a, .yazi-adjacent > div { background: var(--bg); padding: 2.5rem 2.75rem; transition: background 0.28s ease; }
        .yazi-adjacent > a:hover { background: var(--bg2); }
        .yazi-adjacent > a:hover .adj-title { color: var(--accent); }
        .adj-title { transition: color 0.25s ease; }
        .yazi-adjacent .nav-next { text-align: right; }
        .yazi-back { transition: color 0.25s ease; }
        .yazi-back:hover { color: var(--accent) !important; }
        @media (max-width: 768px) {
          .yazi-hero { padding: 4rem 1.5rem 3rem !important; }
          .yazi-body { padding: 3rem 1.5rem 5rem !important; }
          .yazi-adjacent { grid-template-columns: 1fr !important; }
          .yazi-adjacent > a, .yazi-adjacent > div { padding: 2rem 1.5rem !important; }
          .yazi-adjacent .nav-next { text-align: left !important; }
        }
      `}</style>

      <article>
        <div className="yazi-hero" style={{ padding: "5rem 2.75rem 3rem", borderBottom: "1px solid var(--border)", maxWidth: "820px", margin: "0 auto", width: "100%" }}>
          <Link href={`${base}/yazilar`} className="yazi-back sec-meta" style={{ display: "inline-block", marginBottom: "2.5rem" }}>{back}</Link>
          <p className="sec-meta" style={{ marginBottom: "1.5rem" }}>{formatDate(yazi.date, lang)} · {readLabel}</p>
          <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, fontSize: "clamp(2.2rem, 5vw, 3.4rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--cream)" }}>{yazi.title}</h1>
        </div>

        <div className="yazi-body yazi-content" style={{ padding: "4rem 2.75rem 6rem", maxWidth: "820px", margin: "0 auto", width: "100%" }} dangerouslySetInnerHTML={{ __html: yazi.contentHtml }} />

        {(prev || next) && (
          <nav className="yazi-adjacent" aria-label={lang === "en" ? "Adjacent writings" : "Komşu yazılar"}>
            {prev ? (
              <Link href={`${base}/yazilar/${prev.slug}`} className="nav-prev">
                <p className="sec-meta" style={{ marginBottom: "0.9rem" }}>← {prevLabel}</p>
                <p className="adj-title" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "1.25rem", letterSpacing: "-0.01em", lineHeight: 1.3, color: "var(--cream)" }}>{prev.title}</p>
              </Link>
            ) : (
              <div aria-hidden="true" />
            )}
            {next ? (
              <Link href={`${base}/yazilar/${next.slug}`} className="nav-next">
                <p className="sec-meta" style={{ marginBottom: "0.9rem" }}>{nextLabel} →</p>
                <p className="adj-title" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 400, fontSize: "1.25rem", letterSpacing: "-0.01em", lineHeight: 1.3, color: "var(--cream)" }}>{next.title}</p>
              </Link>
            ) : (
              <div aria-hidden="true" />
            )}
          </nav>
        )}

        <div style={{ borderTop: "1px solid var(--border)", padding: "3rem 2.75rem", textAlign: "center" }}>
          <Link href={`${base}/yazilar`} className="yazi-back sec-meta">{back}</Link>
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
