import type { Metadata } from "next";
import Link from "next/link";
import { site, SUBSTACK_URL } from "@/lib/site";
import { YAYINDA } from "@/lib/yazilar";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: { absolute: "Yazılar — Berkay Doğan" },
  description: "Berkay Doğan'ın yazıları — şiir, edebiyat ve düşünceler üzerine. Substack'ten derlenmiştir.",
  alternates: { canonical: "/yazilar" },
  openGraph: {
    title: "Yazılar — Berkay Doğan",
    description: "Şiir, edebiyat ve düşünceler üzerine yazılar.",
    url: "https://www.berkaydogan.co/yazilar",
    type: "website",
  },
};

type Post = { title: string; link: string; date: string; snippet: string };

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => { try { return String.fromCodePoint(parseInt(h, 16)); } catch { return ""; } })
    .replace(/&#(\d+);/g, (_, n) => { try { return String.fromCodePoint(Number(n)); } catch { return ""; } })
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&quot;/g, '"')
    .trim();
}
function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : "";
}
function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function fmtDate(raw: string): string {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return "";
  try { return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(d); }
  catch { return ""; }
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${SUBSTACK_URL}/feed`, { cache: "force-cache" });
    if (!res.ok) return [];
    const xml = await res.text();
    const blocks = xml.split("<item>").slice(1).map((b) => b.split("</item>")[0]);
    return blocks
      .slice(0, 12)
      .map((b) => ({
        title: tag(b, "title"),
        link: tag(b, "link"),
        date: fmtDate(tag(b, "pubDate")),
        snippet: stripHtml(tag(b, "description")).slice(0, 180),
      }))
      .filter((p) => p.title && p.link);
  } catch {
    return [];
  }
}

export default async function YazilarPage() {
  const t = site.tr.yazilar;
  // Sitede tam metni olanlar RSS listesinde tekrarlanmasın
  const onSite = new Set(YAYINDA.map((y) => y.title.toLocaleLowerCase("tr")));
  const posts = (await getPosts()).filter((p) => !onSite.has(p.title.toLocaleLowerCase("tr")));

  return (
    <main style={{ maxWidth: "820px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em" }}>Berkay Doğan</Link>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← berkaydogan.co</Link>
      </div>

      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--ink)" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />{t.title}
      </span>
      <h1 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.6rem, 7vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.95, margin: "1.5rem 0 1rem" }}>{t.title}</h1>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.2rem, 2.4vw, 1.7rem)", color: "var(--muted)", maxWidth: "44ch" }}>{t.sub}</p>

      {/* Sitede tam metin */}
      <section style={{ marginTop: "clamp(3rem, 7vh, 5rem)" }}>
        {YAYINDA.map((y) => (
          <Link key={y.slug} href={`/yazilar/${y.slug}`} style={{ display: "block", padding: "1.75rem 0", borderTop: "1px solid var(--line)" }}>
            <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.6rem" }}>{y.dateText}</span>
            <span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 3vw, 1.9rem)", lineHeight: 1.2, color: "var(--ink)", marginBottom: "0.6rem" }}>{y.title}</span>
            <span style={{ display: "block", fontSize: "0.98rem", lineHeight: 1.6, color: "var(--muted)" }}>{y.dek}</span>
            <span style={{ display: "inline-block", marginTop: "0.9rem", fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>{t.read} →</span>
          </Link>
        ))}
      </section>

      <section>
        {posts.length === 0 ? (
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: "2.5rem" }}>
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="cg-btn cg-btn-fill" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-grotesk)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", padding: "0.95rem 1.6rem", borderRadius: "100px", background: "var(--accent)", color: "var(--accent-ink)" }}>{t.all} →</a>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {posts.map((p) => (
              <a key={p.link} href={p.link} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "1.75rem 0", borderTop: "1px solid var(--line)" }}>
                {p.date && <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.6rem" }}>{p.date}</span>}
                <span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 3vw, 1.9rem)", lineHeight: 1.2, color: "var(--ink)", marginBottom: "0.6rem" }}>{p.title}</span>
                {p.snippet && <span style={{ display: "block", fontSize: "0.98rem", lineHeight: 1.6, color: "var(--muted)" }}>{p.snippet}…</span>}
                <span style={{ display: "inline-block", marginTop: "0.9rem", fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>{t.read} {t.on} ↗</span>
              </a>
            ))}
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: "2.5rem", marginTop: "1rem" }}>
              <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="cg-btn cg-btn-fill" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-grotesk)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", padding: "0.95rem 1.6rem", borderRadius: "100px", background: "var(--accent)", color: "var(--accent-ink)" }}>{t.all} →</a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
