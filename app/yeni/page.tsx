import type { Metadata } from "next";
import Link from "next/link";
import { KITAPLAR } from "@/lib/kitaplar";
import { SOZLER, sozSlug } from "@/lib/sozler";
import { EMAIL, TRENDYOL_URL, TASFIYE_URL, YOUTUBE_URL, INSTAGRAM_URL, SUBSTACK_URL } from "@/lib/site";

export const dynamic = "force-static";

// Ana sayfa yeniden tasarım ÖNİZLEMESİ — "Edebiyat Dergisi" karakteri.
// Gerçek ana sayfa değişmedi; onaylanırsa app/page.tsx ile değiştirilir.
export const metadata: Metadata = {
  title: { absolute: "Berkay Doğan — Edebiyat (önizleme)" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/yeni" },
};

const tasfiye = KITAPLAR.find((k) => k.slug === "tasfiye")!;
const murekkep = KITAPLAR.find((k) => k.slug === "murekkep-ve-koz")!;
const kapakSoz = SOZLER[0]; // "Yıkılamadım, yıktım."
const secme = [3, 20, 55, 88, 120, 160].map((i) => SOZLER[i % SOZLER.length]).filter(Boolean);

const ICINDEKILER = [
  { ad: "Sözler", yol: "/sozler", not: "iki kitaptan 200 cümle" },
  { ad: "Kavramlar Sözlüğü", yol: "/sozluk", not: "yazarın kendi tanımları" },
  { ad: "Yazılar", yol: "/yazilar", not: "denemeler & notlar" },
  { ad: "Zihin Atlası", yol: "/atlas", not: "sözlerin tema haritası" },
  { ad: "Okuma Odası", yol: "/oda", not: "ambiyans & radyo" },
  { ad: "Basın", yol: "/press", not: "medya kiti" },
];

export default function YeniPage() {
  return (
    <main className="mg">
      <div className="mg-ribbon">önizleme · gerçek ana sayfa değişmedi · <Link href="/" style={{ color: "inherit", textDecoration: "underline" }}>mevcut sayfa</Link></div>

      {/* Manşet / Masthead */}
      <header className="mg-mast">
        <div className="mg-meta">
          <span>berkaydogan.co</span>
          <span>Şair &amp; Yazar</span>
          <span>İstanbul — MMXXVI</span>
        </div>
        <div className="mg-rule" />
        <h1 className="mg-name">Berkay Doğan</h1>
        <div className="mg-rule" />
        <p className="mg-tag">Edebiyat · Şiir · Deneme</p>
      </header>

      {/* Kapak alıntısı */}
      <section className="mg-cover">
        <blockquote className="mg-pull">&ldquo;{kapakSoz.s}&rdquo;</blockquote>
        <Link href={`/soz/${sozSlug(kapakSoz.s)}`} className="mg-kick">Mürekkep ve Köz — sözün sayfası →</Link>
      </section>

      {/* İçindekiler / kapak dosyaları */}
      <section className="mg-grid">
        {[tasfiye, murekkep].map((b, idx) => (
          <article key={b.slug} className="mg-story">
            <span className="mg-label">{idx === 0 ? "Kapak Dosyası" : "Kitaplık"} · {b.tur}</span>
            <div className="mg-story-in">
              <Link href={`/kitaplar/${b.slug}`} className="mg-cover-img">
                <img src={b.kapak400} alt={`${b.ad} — kapak`} loading="lazy" decoding="async" />
              </Link>
              <div>
                <h2 className="mg-title">{b.ad}</h2>
                <p className="mg-desc">{b.desc}</p>
                <p className="mg-small">{b.tur} · {b.cikis}{b.sayfaSayisi ? ` · ${b.sayfaSayisi} s.` : ""}</p>
                <div className="mg-links">
                  <a href={b.slug === "tasfiye" ? TASFIYE_URL : TRENDYOL_URL} target="_blank" rel="noopener noreferrer" className="mg-btn">Satın al →</a>
                  <Link href={`/kitaplar/${b.slug}`} className="mg-btn ghost">Kitabın sayfası</Link>
                  <Link href={`/kitaplar/${b.slug}/dunya`} className="mg-btn ghost">İç dünya</Link>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* İçindekiler dizini */}
        <aside className="mg-index">
          <span className="mg-label">İçindekiler</span>
          <ul>
            {ICINDEKILER.map((x) => (
              <li key={x.yol}>
                <Link href={x.yol}>
                  <span className="mg-idx-ad">{x.ad}</span>
                  <span className="mg-dot" />
                  <span className="mg-idx-not">{x.not}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* Seçme sözler */}
      <section className="mg-quotes">
        <span className="mg-label">Seçme Sözler</span>
        <div className="mg-qgrid">
          {secme.map((q) => (
            <Link key={q.s} href={`/soz/${sozSlug(q.s)}`} className="mg-q">&ldquo;{q.s}&rdquo;</Link>
          ))}
        </div>
        <Link href="/sozler" className="mg-kick">Bütün sözler →</Link>
      </section>

      {/* Künye */}
      <footer className="mg-colophon">
        <div className="mg-rule" />
        <a href={`mailto:${EMAIL}`} className="mg-email">{EMAIL}</a>
        <div className="mg-social">
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">Substack</a>
          <Link href="/press">Basın</Link>
        </div>
      </footer>

      <style>{`
        .mg { max-width: 1120px; margin: 0 auto; padding: 0 clamp(1.1rem, 4vw, 3rem) 5rem; color: var(--ink); }
        .mg-ribbon { text-align:center; font-family: var(--font-grotesk); font-size:0.66rem; letter-spacing:0.14em; text-transform:uppercase; color: var(--muted); padding:0.7rem 0; border-bottom:1px solid var(--line); margin-bottom: clamp(2rem,5vh,3.5rem); }
        .mg-meta { display:flex; justify-content:space-between; font-family: var(--font-grotesk); font-size:0.66rem; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; color: var(--muted); }
        .mg-rule { height:1px; background: var(--ink); opacity:0.85; margin:0.9rem 0; }
        .mg-name { font-family: var(--font-serif); font-weight:500; text-align:center; font-size: clamp(3rem, 12vw, 8.5rem); line-height:0.9; letter-spacing:-0.02em; margin:0; }
        .mg-tag { text-align:center; font-family: var(--font-grotesk); font-size:0.72rem; font-weight:500; letter-spacing:0.4em; text-transform:uppercase; color: var(--muted); margin:0.5rem 0 0; }
        .mg-cover { text-align:center; padding: clamp(3rem,9vh,6rem) 0; }
        .mg-pull { margin:0 auto; max-width: 22ch; font-family: var(--font-serif); font-style:italic; font-weight:300; font-size: clamp(2rem, 6vw, 4.4rem); line-height:1.25; }
        .mg-kick { display:inline-block; margin-top:1.4rem; font-family: var(--font-grotesk); font-size:0.72rem; letter-spacing:0.14em; text-transform:uppercase; color: var(--muted); border-bottom:1px solid var(--accent); padding-bottom:2px; }
        .mg-grid { display:grid; grid-template-columns: 1.2fr 1.2fr 0.9fr; gap: clamp(1.5rem, 4vw, 3rem); border-top:1px solid var(--line); padding-top: clamp(2rem,5vh,3.5rem); }
        @media (max-width: 900px){ .mg-grid { grid-template-columns:1fr; } }
        .mg-label { display:inline-block; font-family: var(--font-grotesk); font-size:0.64rem; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color: var(--accent-2); margin-bottom:1rem; }
        .mg-story-in { display:flex; gap:1.2rem; }
        .mg-cover-img img { width:120px; border:1px solid var(--line); display:block; box-shadow:0 16px 34px rgba(0,0,0,0.4); }
        .mg-title { font-family: var(--font-serif); font-weight:500; font-size: clamp(1.6rem,3.5vw,2.4rem); margin:0 0 0.6rem; letter-spacing:-0.015em; }
        .mg-desc { font-family: var(--font-serif); font-style:italic; font-weight:300; font-size:1.02rem; line-height:1.55; color: var(--ink); margin:0 0 0.7rem; }
        .mg-small { font-family: var(--font-grotesk); font-size:0.66rem; letter-spacing:0.12em; text-transform:uppercase; color: var(--muted); margin:0 0 1rem; }
        .mg-links { display:flex; flex-wrap:wrap; gap:0.5rem; }
        .mg-btn { font-family: var(--font-grotesk); font-size:0.72rem; font-weight:500; letter-spacing:0.06em; padding:0.6rem 1.1rem; border-radius:100px; background: var(--accent); color: var(--accent-ink); text-decoration:none; }
        .mg-btn.ghost { background:transparent; color: var(--ink); border:1px solid var(--line); }
        .mg-index ul { list-style:none; padding:0; margin:0; }
        .mg-index li { border-top:1px solid var(--line); }
        .mg-index li:last-child { border-bottom:1px solid var(--line); }
        .mg-index a { display:flex; align-items:baseline; gap:0.5rem; padding:0.85rem 0; text-decoration:none; color: var(--ink); }
        .mg-idx-ad { font-family: var(--font-serif); font-size:1.1rem; white-space:nowrap; }
        .mg-idx-not { font-family: var(--font-grotesk); font-size:0.66rem; letter-spacing:0.06em; text-transform:uppercase; color: var(--muted); white-space:nowrap; }
        .mg-dot { flex:1; border-bottom:1px dotted var(--line); transform: translateY(-3px); }
        .mg-quotes { border-top:1px solid var(--line); margin-top: clamp(2.5rem,6vh,4rem); padding-top: clamp(2rem,5vh,3rem); text-align:center; }
        .mg-qgrid { columns: 3 240px; column-gap: 2.5rem; margin:1rem 0 1.4rem; }
        @media (max-width:640px){ .mg-qgrid{ columns:1; } }
        .mg-q { display:block; break-inside:avoid; padding:0.9rem 0; font-family: var(--font-serif); font-style:italic; font-size:1.12rem; line-height:1.5; color: var(--ink); text-decoration:none; border-bottom:1px solid var(--line); text-align:left; }
        .mg-colophon { margin-top: clamp(3rem,7vh,5rem); text-align:center; }
        .mg-email { display:inline-block; margin-top:1.6rem; font-family: var(--font-serif); font-size: clamp(1.3rem,3.5vw,2.4rem); letter-spacing:-0.02em; color: var(--ink); text-decoration:none; }
        .mg-social { display:flex; justify-content:center; gap:1.4rem; flex-wrap:wrap; margin-top:1.2rem; font-family: var(--font-grotesk); font-size:0.78rem; }
        .mg-social a { color: var(--muted); text-decoration:none; }
        .mg-social a:hover { color: var(--accent-2); }
      `}</style>
    </main>
  );
}
