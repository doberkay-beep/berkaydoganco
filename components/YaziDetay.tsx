import Link from "next/link";
import type { Yazi } from "@/lib/yazilar";
import type { Lang } from "@/lib/content";

export function YaziDetay({ yazi, lang }: { yazi: Yazi; lang: Lang }) {
  const base = lang === "en" ? "/en" : "";
  const back = lang === "en" ? "← ALL WRITINGS" : "← TÜM YAZILAR";

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .yazi-content p { font-family: var(--font-mono); font-size: 1rem; line-height: 2; color: var(--text-soft); margin-bottom: 1.6rem; }
        .yazi-content h2 { font-family: var(--font-grotesk); font-size: 1.5rem; font-weight: 700; color: var(--text); margin: 3rem 0 1.5rem; }
        .yazi-content em { font-style: italic; color: var(--text); }
        .yazi-content blockquote { border-left: 2px solid var(--border-bright); padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: var(--text-muted); }
        @media (max-width: 768px) {
          .yazi-hero { padding: 4rem 1.5rem 3rem !important; }
          .yazi-body { padding: 3rem 1.5rem 5rem !important; }
        }
      `}</style>

      <article>
        <div className="yazi-hero" style={{ padding: "5rem 4rem 3rem", borderBottom: "1px solid var(--border)", maxWidth: "820px", margin: "0 auto", width: "100%" }}>
          <Link href={`${base}/yazilar`} style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--text-dim)", display: "inline-block", marginBottom: "2.5rem" }}>{back}</Link>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--text-dim)", marginBottom: "1.5rem" }}>{formatDate(yazi.date, lang)}</p>
          <h1 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--text)" }}>{yazi.title}</h1>
        </div>

        <div className="yazi-body yazi-content" style={{ padding: "4rem 4rem 6rem", maxWidth: "820px", margin: "0 auto", width: "100%" }} dangerouslySetInnerHTML={{ __html: yazi.contentHtml }} />

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
