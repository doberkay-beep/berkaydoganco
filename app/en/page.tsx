import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL, INSTAGRAM_URL, YOUTUBE_URL, SUBSTACK_URL, SITE_URL, PERSON_ID } from "@/lib/site";
import { BIO_KISA_EN, BIO_ORTA_EN } from "@/lib/basinKiti";
import { EN_BOOKS, EN_FACTS, EN_RECOGNITION, EN_TOPICS, EN_IMAGES } from "@/lib/en";
import { KITAPLAR } from "@/lib/kitaplar";
import { KopyalaMetin } from "@/components/KopyalaMetin";
import { Masada } from "@/components/Masada";
import { Muhur } from "@/components/Muhur";

/* /en/ — tek sayfalık İngilizce tanıtım + basın kiti (TASLAK, en-taslak dalı).
   Sunucuda İngilizce render edilir: Google bu sayfayı İngilizce olarak dizinler,
   ana sayfayla hreflang çifti kurar (app/page.tsx). Dize ÇEVRİLMEZ — kitaptan
   gösterilen tek satır Türkçe aslıyla, lang="tr". */

const DESC =
  "Berkay Doğan is an Istanbul-based Turkish poet and writer: author of Mürekkep ve Köz (poetry, 2025) and Tasfiye (essays, 2026), founder of ŞİMDİ. Biography, books, press kit and contact in English.";

export const metadata: Metadata = {
  title: { absolute: "Berkay Doğan — Turkish Poet & Writer (in English)" },
  description: DESC,
  alternates: {
    canonical: "/en/",
    languages: { tr: "/", en: "/en/", "x-default": "/" },
  },
  openGraph: {
    title: "Berkay Doğan — Turkish Poet & Writer",
    description: DESC,
    url: `${SITE_URL}/en/`,
    siteName: "berkaydogan.co",
    locale: "en_US",
    alternateLocale: ["tr_TR"],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Berkay Doğan — Turkish Poet & Writer",
    description: "Books: Mürekkep ve Köz (poetry) and Tasfiye (essays). Press kit in English.",
  },
};

/* ---- Stil kısayolları (press sayfasıyla aynı dil) ---- */
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" };
const secStil: React.CSSProperties = { marginTop: "clamp(3rem, 7vh, 5rem)", borderTop: "1px solid var(--line)", paddingTop: "2.5rem" };
const secBaslik: React.CSSProperties = { ...mono, letterSpacing: "0.22em", color: "var(--accent-2)", marginBottom: "1.5rem" };
const kutu: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "0.35rem", padding: "1.2rem 1.3rem", border: "1px solid var(--line)", borderRadius: "10px", background: "var(--bg-2)" };

const CONTENTS: [string, string][] = [
  ["#about", "About"], ["#books", "Books"], ["#recognition", "Recognition"],
  ["#film-radio", "Film & radio"], ["#press-kit", "Press kit"], ["#topics", "Interview topics"], ["#contact", "Contact"],
];

function Bio({ title, text }: { title: string; text: string }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", marginBottom: "0.8rem", flexWrap: "wrap" }}>
        <span style={{ ...mono, fontSize: "0.66rem", color: "var(--muted)" }}>{title}</span>
        <KopyalaMetin metin={text} etiket="Copy" tamam="Copied ✓" />
      </div>
      <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--ink)", maxWidth: "72ch" }}>{text}</p>
    </div>
  );
}

export default function EnglishPage() {
  const profileLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE_URL}/en/`,
    name: "Berkay Doğan — Turkish poet and writer",
    inLanguage: "en",
    mainEntity: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return (
    <main lang="en" style={{ maxWidth: "980px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>
          <Muhur size={22} /> Berkay Doğan
        </Link>
        <Link href="/" hrefLang="tr" lang="tr" style={{ ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>Türkçe →</Link>
      </div>

      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", ...mono, letterSpacing: "0.26em", color: "var(--ink)" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />In English
      </span>
      <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(2.6rem, 7vw, 5rem)", letterSpacing: "-0.015em", lineHeight: 0.95, margin: "1.5rem 0 1rem", color: "var(--ink)" }}>Berkay Doğan</h1>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.15rem, 2.4vw, 1.6rem)", color: "var(--muted)", maxWidth: "44ch" }}>
        Turkish poet and writer, Istanbul. Founder of ŞİMDİ. His books are published in Turkish; this page is for international readers, editors and press.
      </p>

      <nav aria-label="Contents" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "2rem" }}>
        {CONTENTS.map(([href, ad]) => (
          <a key={href} href={href} style={{ ...mono, fontSize: "0.64rem", color: "var(--muted)", border: "1px solid var(--line)", borderRadius: "100px", padding: "0.45rem 0.9rem" }}>{ad}</a>
        ))}
      </nav>

      {/* ABOUT */}
      <section id="about" style={secStil}>
        <p style={secBaslik}>About</p>
        <Bio title="One line" text={BIO_KISA_EN} />
        <Bio title="Short paragraph" text={BIO_ORTA_EN} />
        <div style={{ display: "grid", gridTemplateColumns: "minmax(120px, 180px) 1fr", marginTop: "0.5rem" }}>
          {EN_FACTS.map((f) => (
            <div key={f.k} style={{ display: "contents" }}>
              <div style={{ padding: "0.85rem 0", borderTop: "1px solid var(--line)", ...mono, fontSize: "0.68rem", color: "var(--muted)" }}>{f.k}</div>
              <div style={{ padding: "0.85rem 0", borderTop: "1px solid var(--line)", fontSize: "0.98rem", color: "var(--ink)" }}>{f.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKS */}
      <section id="books" style={secStil}>
        <p style={secBaslik}>Books · published in Turkish</p>
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
          {EN_BOOKS.map((b) => {
            const k = KITAPLAR.find((x) => x.slug === b.slug);
            return (
              <article key={b.slug} id={b.slug} style={{ border: "1px solid var(--line)", borderRadius: "14px", padding: "1.5rem 1.6rem", background: "var(--bg-2)" }}>
                <div style={{ display: "flex", gap: "1.1rem", alignItems: "flex-start" }}>
                  {k && <img src={k.kapak400} alt={`${b.title} — cover`} loading="lazy" decoding="async" style={{ width: "76px", borderRadius: "3px", boxShadow: "0 12px 26px rgba(0,0,0,0.35)" }} />}
                  <div>
                    <h2 lang="tr" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.02em", color: "var(--ink)" }}>{b.title}</h2>
                    <p lang="tr" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.92rem", color: "var(--muted)", marginTop: "0.2rem" }}>{b.subtitle}</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.35rem" }}>{b.gloss}</p>
                  </div>
                </div>
                <div style={{ marginTop: "1.1rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  {[["Genre", b.genre], ["Publisher", "İskenderiye Yayınları"], ["Published", b.published], ["Pages", String(b.pages)], ["ISBN", b.isbn], ["Language", "Turkish"]].map(([kk, v]) => (
                    <div key={kk} style={{ display: "flex", gap: "0.8rem", fontSize: "0.84rem" }}>
                      <span style={{ ...mono, fontSize: "0.6rem", color: "var(--muted)", minWidth: "9ch", paddingTop: "0.12rem" }}>{kk}</span>
                      <span style={{ color: "var(--ink)" }}>{v}</span>
                    </div>
                  ))}
                </div>
                {b.blurb.map((p, i) => (
                  <p key={i} style={{ marginTop: "1rem", fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink)" }}>{p}</p>
                ))}
                {b.original && (
                  <figure style={{ margin: "1.1rem 0 0" }}>
                    <blockquote lang="tr" style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.5, color: "var(--muted)" }}>&ldquo;{b.original}&rdquo;</blockquote>
                    <figcaption style={{ ...mono, fontSize: "0.56rem", color: "var(--muted)", marginTop: "0.4rem" }}>From the book, in the original Turkish</figcaption>
                  </figure>
                )}
                <Link href={`/kitaplar/${b.slug}`} hrefLang="tr" style={{ display: "inline-block", marginTop: "1.1rem", ...mono, fontSize: "0.62rem", color: "var(--accent-2)" }}>Book page (Turkish) →</Link>
              </article>
            );
          })}
        </div>
        <p style={{ marginTop: "1.25rem", fontSize: "0.85rem", color: "var(--muted)", maxWidth: "72ch" }}>
          Both books are sold by Turkish online booksellers, including Trendyol and the publisher’s own shop. For review copies, please write to {EMAIL}.
        </p>
        <Masada lang="en" />
      </section>

      {/* RECOGNITION */}
      <section id="recognition" style={secStil}>
        <p style={secBaslik}>Recognition</p>
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}>
          {EN_RECOGNITION.map((r) => (
            <div key={r.label} style={{ borderTop: "2px solid var(--accent)", paddingTop: "0.9rem" }}>
              <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", lineHeight: 1, color: "var(--accent-2)", letterSpacing: "-0.03em" }}>{r.value}</span>
              <span style={{ display: "block", marginTop: "0.55rem", fontSize: "0.78rem", lineHeight: 1.45, color: "var(--muted)" }}>{r.label}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "1.25rem", fontSize: "0.85rem", color: "var(--muted)" }}>
          Coverage in the Turkish press is collected in the <Link href="/press#basinda" hrefLang="tr" style={{ color: "var(--accent-2)" }}>Press Room (Turkish)</Link>.
        </p>
      </section>

      {/* FILM & RADIO */}
      <section id="film-radio" style={secStil}>
        <p style={secBaslik}>Film & radio</p>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}>
          <Link href="/film" style={kutu}>
            <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "1rem", color: "var(--ink)" }}>TASFİYE: Film</span>
            <span style={{ fontSize: "0.88rem", lineHeight: 1.55, color: "var(--muted)" }}>An 8-minute short film built from the text of Tasfiye and narrated by the author in Turkish. Released on YouTube, September 2026.</span>
            <span style={{ ...mono, fontSize: "0.6rem", color: "var(--accent-2)" }}>Watch →</span>
          </Link>
          <a href="https://necaliyor.co" target="_blank" rel="noopener noreferrer" style={kutu}>
            <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "1rem", color: "var(--ink)" }}>ŞİMDİ — necaliyor.co</span>
            <span style={{ fontSize: "0.88rem", lineHeight: 1.55, color: "var(--muted)" }}>Founded by Berkay Doğan in 2026: a live view of what is playing right now across Turkey’s radio stations, and counted. A poet’s radio project, built around listening.</span>
            <span style={{ ...mono, fontSize: "0.6rem", color: "var(--accent-2)" }}>Open ↗</span>
          </a>
        </div>
      </section>

      {/* PRESS KIT */}
      <section id="press-kit" style={secStil}>
        <p style={secBaslik}>Press kit · free to use with credit</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.7rem" }}>
          <a href="/basin/berkay-dogan-basin-kiti.zip" download className="cg-pill" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "0.92rem", padding: "0.85rem 1.4rem", borderRadius: "100px", background: "var(--accent)", color: "var(--accent-ink)", textDecoration: "none" }}>
            Download press kit · ZIP ↓
          </a>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "1.5rem" }}>Includes biographies in Turkish and English, the author portrait, covers and logo. The fact sheet, quotes and one-page press release inside are in Turkish.</p>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}>
          {EN_IMAGES.map((g) => (
            <a key={g.file} href={g.file} download style={kutu}>
              <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 500, fontSize: "0.95rem", color: "var(--ink)" }}>{g.name}</span>
              <span style={{ ...mono, fontSize: "0.6rem", color: "var(--accent-2)" }}>{g.note} — Download ↓</span>
            </a>
          ))}
        </div>
        <p style={{ marginTop: "1.25rem", fontSize: "0.82rem", color: "var(--muted)" }}>All images may be used for news and promotional purposes. Credit: Berkay Doğan / berkaydogan.co</p>
      </section>

      {/* TOPICS */}
      <section id="topics" style={secStil}>
        <p style={secBaslik}>Interview & story ideas</p>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" }}>
          {EN_TOPICS.map((k, i) => (
            <li key={i} style={{ display: "flex", gap: "1rem", padding: "0.9rem 0", borderTop: "1px solid var(--line)", alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, color: "var(--accent-2)", fontSize: "0.85rem", minWidth: "2ch" }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--ink)" }}>{k}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CONTACT */}
      <section id="contact" style={secStil}>
        <p style={secBaslik}>Contact</p>
        <a href={`mailto:${EMAIL}`} style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(1.3rem, 3vw, 2rem)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{EMAIL}</a>
        <p style={{ marginTop: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Interviews, reviews, events and other enquiries.</p>
        <div style={{ display: "flex", gap: "1.75rem", marginTop: "1.5rem", flexWrap: "wrap", ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)" }}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">Substack (Turkish)</a>
        </div>
      </section>
    </main>
  );
}
