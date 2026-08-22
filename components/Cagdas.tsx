"use client";

import { useEffect, useRef, useState } from "react";
import {
  site, LANGS, type Lang,
  TRENDYOL_URL, SUBSTACK_URL, YOUTUBE_URL, INSTAGRAM_URL, EMAIL,
  RETAILERS, REVIEWS, MEDIA, EMBER_FRAGMENTS, VERSES, PLAYLISTS, TEASER_LINES,
} from "@/lib/site";
import { TasfiyeDuvari } from "./TasfiyeDuvari";
import { GununKozu } from "./GununKozu";
import { Kahin } from "./Kahin";
import { TasfiyeReveal } from "./TasfiyeReveal";
import { BentoHub } from "./BentoHub";
import { Projeler } from "./Projeler";
import { AlintiKarti } from "./AlintiKarti";

/* ---------- Scroll ile beliren sarmalayıcı (akışkan) ---------- */
function Reveal({ children, as: Tag = "div", delay = 0, className, style }: {
  children: React.ReactNode; as?: React.ElementType; delay?: number; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = window.setTimeout(() => setShown(true), 0); return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }), { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={className} style={{
      opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`, ...style,
    }}>{children}</Tag>
  );
}

/* ---------- Geri sayım (25 Ağustos 2026) ---------- */
function Countdown({ labels }: { labels: string[] }) {
  const [v, setV] = useState<number[] | null>(null);
  useEffect(() => {
    const tick = () => {
      const d = Math.max(0, new Date("2026-08-25T00:00:00").getTime() - Date.now());
      setV([Math.floor(d / 86400000), Math.floor((d % 86400000) / 3600000), Math.floor((d % 3600000) / 60000)]);
    };
    tick(); const id = setInterval(tick, 30000); return () => clearInterval(id);
  }, []);
  const d = v ?? [0, 0, 0];
  return (
    <div style={{ display: "flex", gap: "1.5rem" }}>
      {d.map((n, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <span suppressHydrationWarning style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", lineHeight: 1, color: "var(--accent)", fontVariantNumeric: "tabular-nums" }}>{String(n).padStart(2, "0")}</span>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--muted)" }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--ink)" }}>
      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />{children}
    </span>
  );
}

function NotifyForm({ t }: { t: { title: string; placeholder: string; button: string; note: string } }) {
  const [email, setEmail] = useState("");
  const submit = () => {
    const e = email.trim();
    const url = e ? `${SUBSTACK_URL}/subscribe?email=${encodeURIComponent(e)}` : `${SUBSTACK_URL}/subscribe`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <div style={{ marginTop: "1.75rem", width: "100%", maxWidth: "380px" }}>
      <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 500, fontSize: "0.95rem", marginBottom: "0.75rem" }}>{t.title}</p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          placeholder={t.placeholder}
          aria-label={t.title}
          style={{ flex: 1, background: "transparent", border: "1px solid var(--line)", borderRadius: "100px", color: "var(--ink)", fontFamily: "var(--font-grotesk)", fontSize: "0.85rem", padding: "0.7rem 1.1rem", outline: "none" }}
        />
        <button className="cg-btn cg-btn-fill" onClick={submit} style={{ padding: "0.7rem 1.3rem", whiteSpace: "nowrap" }}>{t.button}</button>
      </div>
      <p style={{ marginTop: "0.7rem", fontSize: "0.68rem", color: "var(--muted)" }}>{t.note}</p>
    </div>
  );
}

export function Cagdas() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const navRef = useRef<HTMLElement | null>(null);
  const t = site[lang];

  useEffect(() => {
    const id = window.setTimeout(() => {
      const cur = document.documentElement.getAttribute("data-theme");
      if (cur === "light" || cur === "dark") setTheme(cur);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("bd-theme", next); } catch { /* yoksay */ }
      return next;
    });
  };

  const changeLang = (l: Lang) => {
    setLang(l);
    try { localStorage.setItem("bd-lang", l); } catch { /* yoksay */ }
  };

  /* Açılışta: kayıtlı seçim > tarayıcı dili > EN */
  useEffect(() => {
    const t = window.setTimeout(() => {
      let next: Lang | null = null;
      try {
        const saved = localStorage.getItem("bd-lang");
        if (saved === "tr" || saved === "en" || saved === "fr") next = saved;
      } catch { /* yoksay */ }
      if (!next) {
        const nav = (navigator.language || "").toLowerCase();
        next = nav.startsWith("tr") ? "tr" : nav.startsWith("fr") ? "fr" : "en";
      }
      setLang(next);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  /* Menü scroll'da katılaşır */
  useEffect(() => {
    const onScroll = () => { if (navRef.current) navRef.current.dataset.solid = window.scrollY > 40 ? "1" : "0"; };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const b = t.books;

  return (
    <div>
      <TasfiyeReveal lang={lang} />
      <style>{`
        .cg a { color: inherit; }
        .cg-link { position: relative; transition: color 0.3s ease; }
        .cg-link::after { content: ""; position: absolute; left: 0; right: 0; bottom: -3px; height: 1px; background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform 0.35s cubic-bezier(0.22,1,0.36,1); }
        .cg-link:hover { color: var(--accent); }
        .cg-link:hover::after { transform: scaleX(1); }

        .cg-btn { display: inline-flex; align-items: center; gap: 0.5rem; font-family: var(--font-grotesk); font-size: 0.78rem; font-weight: 500; letter-spacing: 0.08em; padding: 0.95rem 1.6rem; border-radius: 100px; border: 1px solid transparent; cursor: pointer; transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease, border-color 0.3s ease; }
        .cg-btn-fill { background: var(--accent); color: var(--accent-ink); }
        .cg-btn-fill:hover { transform: translateY(-2px); }
        .cg-btn-ghost { border-color: var(--line); color: var(--ink); }
        .cg-btn-ghost:hover { border-color: var(--ink); transform: translateY(-2px); }

        .cg-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between; padding: 1.1rem clamp(1.25rem, 4vw, 3.25rem); transition: background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease; }
        .cg-nav[data-solid="1"] { background: var(--nav-bg); backdrop-filter: blur(16px) saturate(150%); -webkit-backdrop-filter: blur(16px) saturate(150%); box-shadow: 0 1px 0 var(--line); }
        .cg-theme { background: none; border: none; cursor: pointer; color: var(--ink); font-size: 1rem; line-height: 1; padding: 0.2rem; transition: color 0.25s ease, transform 0.4s ease; }
        .cg-theme:hover { color: var(--accent); transform: rotate(20deg); }
        .cg-nav-links { display: flex; gap: clamp(1.1rem, 2vw, 2.2rem); font-size: 0.76rem; letter-spacing: 0.04em; }
        .cg-lang { display: flex; gap: 0.5rem; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; }
        .cg-lang button { background: none; border: none; cursor: pointer; color: var(--muted); padding: 0.2rem; transition: color 0.25s ease; }
        .cg-lang button[data-on="1"] { color: var(--accent); font-weight: 700; }
        .cg-lang button:hover { color: var(--ink); }
        @media (max-width: 800px) { .cg-nav-links { display: none; } }

        .cg-hero { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: clamp(2rem, 5vw, 5rem); align-items: center; min-height: 100svh; padding: 7rem clamp(1.25rem, 4vw, 3.25rem) 4rem; }
        .cg-portrait-wrap { position: relative; }
        .cg-portrait-wrap::before { content: ""; position: absolute; inset: auto -14px -14px auto; width: 62%; height: 78%; background: var(--accent); border-radius: 4px; z-index: 0; }
        .cg-portrait { position: relative; z-index: 1; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: 62% 40%; border-radius: 4px; filter: grayscale(100%) contrast(1.05); }
        @media (max-width: 860px) {
          .cg-hero { grid-template-columns: 1fr; min-height: auto; padding-top: 6rem; gap: 2.5rem; }
          .cg-portrait-wrap { order: -1; max-width: 420px; }
        }

        .cg-section { padding: clamp(5rem, 12vh, 9rem) clamp(1.25rem, 4vw, 3.25rem); border-top: 1px solid var(--line); }
        .cg-about-grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: clamp(2rem, 6vw, 6rem); max-width: 1200px; margin: 0 auto; }
        @media (max-width: 860px) { .cg-about-grid { grid-template-columns: 1fr; gap: 2.5rem; } }
        .cg-book { display: grid; grid-template-columns: 1fr 1.15fr; gap: clamp(2rem, 5vw, 4.5rem); align-items: center; max-width: 1100px; margin: 0 auto; }
        .cg-book + .cg-book { margin-top: clamp(4rem, 9vh, 7rem); }
        @media (max-width: 780px) { .cg-book { grid-template-columns: 1fr; gap: 2.25rem; text-align: left; } .cg-book.rev .cg-book-media { order: -1; } }

        .cg-huge { font-family: var(--font-grotesk); font-weight: 700; letter-spacing: -0.04em; line-height: 0.92; }
        .cg-serif { font-family: var(--font-serif); font-weight: 300; font-style: italic; }

        /* Tanınırlık tile'ları */
        .cg-tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(1.5rem, 4vw, 3rem); margin-top: clamp(2.5rem, 6vh, 4rem); }
        @media (max-width: 720px) { .cg-tiles { grid-template-columns: 1fr; gap: 2rem; } }
        .cg-press-row { transition: color 0.3s ease; }
        .cg-press-row:hover { color: var(--accent); }

        /* Okur yorumları */
        .cg-reviews { columns: 3; column-gap: 1.5rem; }
        .cg-review-card { break-inside: avoid; margin-bottom: 1.5rem; display: flex; flex-direction: column; padding: 1.75rem; background: var(--bg); border: 1px solid var(--line); border-radius: 4px; }
        @media (max-width: 900px) { .cg-reviews { columns: 2; } }
        @media (max-width: 600px) { .cg-reviews { columns: 1; } }

        /* Medya gömü çerçevesi */
        .cg-embed { border: 1px solid var(--line); border-radius: 8px; overflow: hidden; background: var(--bg-2); }

        /* Playlist link-kartları */
        .cg-playlist { display: flex; flex-direction: column; gap: 0.5rem; padding: 1.5rem 1.6rem; border: 1px solid var(--line); border-radius: 10px; background: var(--bg); transition: border-color 0.28s ease, transform 0.28s ease, background 0.28s ease; }
        .cg-playlist:hover { border-color: var(--accent); transform: translateY(-3px); background: var(--bg-2); }
        .cg-playlist-icon { font-size: 1.1rem; color: var(--accent); line-height: 1; }
        .cg-playlist-name { font-family: var(--font-grotesk); font-weight: 500; font-size: 1.15rem; letter-spacing: -0.01em; color: var(--ink); }
        .cg-playlist-meta { font-family: var(--font-grotesk); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); transition: color 0.28s ease; }
        .cg-playlist:hover .cg-playlist-meta { color: var(--accent); }

        /* Sağ aksiyon grubu + mobil menü */
        .cg-actions { display: flex; align-items: center; gap: 1.25rem; }
        .cg-burger { display: none; background: none; border: none; cursor: pointer; font-family: var(--font-grotesk); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink); }
        @media (max-width: 800px) { .cg-burger { display: inline-block; } }
        .cg-menu { position: fixed; inset: 0; z-index: 60; background: var(--bg); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2.25rem; animation: cgMenuIn 0.3s ease both; }
        @keyframes cgMenuIn { from { opacity: 0; } to { opacity: 1; } }
        .cg-menu a { font-family: var(--font-grotesk); font-weight: 500; font-size: clamp(1.7rem, 7vw, 2.4rem); letter-spacing: -0.01em; color: var(--ink); }
        .cg-menu a:hover { color: var(--accent); }
        .cg-menu-close { position: absolute; top: 1.4rem; right: clamp(1.25rem, 4vw, 3.25rem); background: none; border: none; cursor: pointer; font-size: 1.4rem; color: var(--ink); line-height: 1; }

        /* Erişilebilirlik — görünür odak halkası */
        a:focus-visible, button:focus-visible, input:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }
      `}</style>

      {/* MENÜ */}
      <nav ref={navRef as React.RefObject<HTMLElement>} className="cg-nav cg" data-solid="0">
        <a href="#top" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.02em" }}>Berkay Doğan</a>
        <div className="cg-nav-links">
          <a href="#books" className="cg-link">{t.nav.books}</a>
          <a href="#about" className="cg-link">{t.nav.about}</a>
          <a href="#projects" className="cg-link">{t.nav.projects}</a>
          <a href="#writing" className="cg-link">{t.nav.writing}</a>
          <a href="#contact" className="cg-link">{t.nav.contact}</a>
        </div>
        <div className="cg-actions">
          <div className="cg-lang">
            {LANGS.map((l) => (
              <button key={l} data-on={l === lang ? "1" : "0"} onClick={() => changeLang(l)} aria-label={l.toUpperCase()}>{l.toUpperCase()}</button>
            ))}
          </div>
          <button className="cg-theme" onClick={toggleTheme} aria-label={theme === "dark" ? "Light theme" : "Dark theme"}>{theme === "dark" ? "☀" : "☾"}</button>
          <button className="cg-burger" onClick={() => setMenuOpen(true)} aria-label="Menu" aria-expanded={menuOpen}>Menu</button>
        </div>
      </nav>

      {menuOpen && (
        <div className="cg-menu" role="dialog" aria-modal="true">
          <button className="cg-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close">✕</button>
          {[["#books", t.nav.books], ["#about", t.nav.about], ["#projects", t.nav.projects], ["#writing", t.nav.writing], ["#contact", t.nav.contact]].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </div>
      )}

      <main className="cg" id="top">
        {/* HERO */}
        <section className="cg-hero">
          <div>
            <Reveal><Eyebrow>{t.hero.role}</Eyebrow></Reveal>
            <Reveal delay={0.08} as="h1" className="cg-huge" style={{ fontSize: "clamp(3.2rem, 9vw, 8rem)", margin: "1.5rem 0 1.75rem" }}>
              Berkay<br />Doğan
            </Reveal>
            <Reveal delay={0.16} as="p" className="cg-serif" style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)", lineHeight: 1.35, maxWidth: "20ch", color: "var(--ink)" }}>
              {t.hero.line}
            </Reveal>
            <Reveal delay={0.24} as="p" style={{ marginTop: "1.5rem", fontSize: "1rem", lineHeight: 1.7, color: "var(--muted)", maxWidth: "42ch" }}>
              {t.hero.sub}
            </Reveal>
            <Reveal delay={0.32} style={{ marginTop: "2.25rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href="#books" className="cg-btn cg-btn-fill">{t.hero.ctaBooks} →</a>
              <a href="#about" className="cg-btn cg-btn-ghost">{t.hero.ctaAbout}</a>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="cg-portrait-wrap">
            <img src="/images/portre.jpg" alt="Berkay Doğan" className="cg-portrait" />
          </Reveal>
        </section>

        {/* BENTO PANO — masaüstü için modüler kontrol paneli */}
        <BentoHub lang={lang} />

        {/* GÜNÜN KÖZÜ — her gün senin bir dizen */}
        <GununKozu t={t.kozu} verses={VERSES} />

        {/* HAKKIMDA */}
        <section id="about" className="cg-section">
          <div className="cg-about-grid">
            <div>
              <Reveal><Eyebrow>{t.about.label}</Eyebrow></Reveal>
              <Reveal delay={0.06} as="h2" className="cg-huge" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", marginTop: "1.25rem" }}>{t.about.heading}</Reveal>
              <Reveal delay={0.12} style={{ marginTop: "2.5rem" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>{t.about.worksLabel}</p>
                {t.about.works.map((w, i) => (
                  <div key={i} style={{ display: "flex", gap: "1.25rem", alignItems: "baseline", padding: "0.9rem 0", borderTop: "1px solid var(--line)" }}>
                    <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, color: "var(--accent)", fontSize: "0.9rem", minWidth: "3ch" }}>{w.year}</span>
                    <span style={{ flex: 1 }}>
                      <span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: "1.15rem", lineHeight: 1.25 }}>{w.title}</span>
                      <span style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{w.kind}</span>
                    </span>
                  </div>
                ))}
              </Reveal>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {t.about.paras.map((p, i) => (
                <Reveal key={i} as="p" delay={i * 0.07} style={{ fontSize: i === 0 ? "clamp(1.15rem, 2vw, 1.5rem)" : "1.02rem", fontFamily: i === 0 ? "var(--font-serif)" : "var(--font-grotesk)", fontWeight: i === 0 ? 400 : 400, lineHeight: i === 0 ? 1.5 : 1.75, color: i === 0 ? "var(--ink)" : "var(--muted)" }}>{p}</Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* KİTAPLAR */}
        <section id="books" className="cg-section">
          <Reveal style={{ maxWidth: "1100px", margin: "0 auto clamp(3.5rem, 8vh, 6rem)" }}><Eyebrow>{b.label}</Eyebrow></Reveal>

          {/* Mürekkep ve Köz */}
          <Reveal className="cg-book">
            <div className="cg-book-media" style={{ display: "flex", justifyContent: "center" }}>
              <img src="/murekkep-ve-koz-on-kapak.jpg" alt={b.murekkep.title} loading="lazy" style={{ width: "clamp(180px, 24vw, 260px)", borderRadius: "3px", boxShadow: "0 24px 55px rgba(20,18,15,0.22)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.1rem" }}>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent-ink)", background: "var(--accent)", padding: "0.4rem 0.65rem", borderRadius: "100px" }}>{b.murekkep.badge}</span>
              <h3 className="cg-huge" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)" }}>{b.murekkep.title}</h3>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{b.murekkep.meta}</p>
              <p className="cg-serif" style={{ fontStyle: "italic", fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)", lineHeight: 1.55, color: "var(--ink)", maxWidth: "36ch" }}>{b.murekkep.desc}</p>
              <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "1rem", margin: "0.3rem 0" }}>
                <span style={{ display: "block", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.4rem" }}>{t.taste}</span>
                <p className="cg-serif" style={{ fontStyle: "italic", fontSize: "1.1rem", lineHeight: 1.5, color: "var(--muted)" }}>{b.murekkep.excerpt}</p>
              </div>
              <a href={TRENDYOL_URL} target="_blank" rel="noopener noreferrer" className="cg-btn cg-btn-fill" style={{ marginTop: "0.5rem" }}>{b.murekkep.cta} →</a>
              <div style={{ marginTop: "0.5rem" }}>
                <span style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.6rem" }}>{b.buyMore}</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem 1.1rem" }}>
                  {RETAILERS.slice(1).map((r) => (
                    <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="cg-link" style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{r.name}</a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tasfiye */}
          <Reveal className="cg-book rev">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.1rem" }}>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", border: "1px solid var(--accent)", padding: "0.4rem 0.65rem", borderRadius: "100px" }}>{b.tasfiye.badge}</span>
              <h3 className="cg-huge" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)" }}>{b.tasfiye.title}</h3>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{b.tasfiye.meta}</p>
              <p className="cg-serif" style={{ fontStyle: "italic", fontSize: "clamp(1rem, 1.7vw, 1.2rem)", lineHeight: 1.6, color: "var(--ink)", maxWidth: "40ch" }}>{b.tasfiye.desc}</p>
              <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "1rem" }}>
                <span style={{ display: "block", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.4rem" }}>{t.taste}</span>
                <p className="cg-serif" style={{ fontStyle: "italic", fontSize: "1.1rem", lineHeight: 1.5, color: "var(--muted)" }}>{b.tasfiye.excerpt}</p>
              </div>
              <div style={{ marginTop: "0.75rem" }}><Countdown labels={b.countdown} /></div>
              <NotifyForm t={t.notify} />
            </div>
            <div className="cg-book-media" style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative" }}>
                <img src="/tasfiye-on-kapak.jpg" alt={b.tasfiye.title} loading="lazy" style={{ width: "clamp(180px, 24vw, 260px)", borderRadius: "3px", boxShadow: "0 24px 55px rgba(0,0,0,0.4)" }} />
                <span style={{ position: "absolute", top: "0.7rem", left: "0.7rem", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F1EDE4", background: "rgba(229,64,42,0.9)", padding: "0.35rem 0.6rem", borderRadius: "100px" }}>{b.tasfiye.badge}</span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* KİTAPTAN TEASER — Berkay'ın dizeleri, satın almaya çeker */}
        <section className="cg-section" style={{ textAlign: "center" }}>
          <Reveal style={{ display: "inline-flex" }}><Eyebrow>{t.teaser.label}</Eyebrow></Reveal>
          <div style={{ margin: "2rem auto 2.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "22ch" }}>
            {TEASER_LINES.map((l, i) => (
              <Reveal key={i} as="p" delay={i * 0.07} className="cg-serif" style={{ fontStyle: "italic", fontSize: "clamp(1.5rem, 4vw, 2.8rem)", lineHeight: 1.35, color: "var(--ink)" }}>{l}</Reveal>
            ))}
          </div>
          <Reveal delay={0.14}>
            <a href={TRENDYOL_URL} target="_blank" rel="noopener noreferrer" className="cg-btn cg-btn-ghost">{t.teaser.cta} →</a>
          </Reveal>
        </section>

        {/* TASFİYE DUVARI — arınma ritüeli (koyu bölüm) */}
        <TasfiyeDuvari t={t.duvari} fragments={EMBER_FRAGMENTS} />

        {/* TANINIRLIK / BASINDA */}
        <section id="recognition" className="cg-section">
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <Reveal><Eyebrow>{t.recognition.label}</Eyebrow></Reveal>
            <Reveal delay={0.05} as="h2" className="cg-huge" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", marginTop: "1.25rem", maxWidth: "16ch" }}>{t.recognition.heading}</Reveal>
            <div className="cg-tiles">
              {t.recognition.tiles.map((tile, i) => (
                <Reveal key={i} delay={i * 0.07} style={{ borderTop: "2px solid var(--accent)", paddingTop: "1.25rem" }}>
                  <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", lineHeight: 1, color: "var(--accent)", letterSpacing: "-0.03em" }}>{tile.value}</span>
                  <span style={{ display: "block", marginTop: "0.85rem", fontSize: "0.82rem", lineHeight: 1.5, color: "var(--muted)" }}>{tile.label}</span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1} style={{ marginTop: "clamp(3rem, 6vh, 4.5rem)", borderTop: "1px solid var(--line)", paddingTop: "2rem" }}>
              <span style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>{t.recognition.pressLabel}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {t.recognition.press.map((p) => (
                  <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="cg-press-row" style={{ display: "flex", gap: "1rem", alignItems: "baseline", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 500, fontSize: "1.05rem", minWidth: "9ch" }}>{p.name}</span>
                    <span style={{ color: "var(--muted)", fontSize: "0.92rem" }}>{p.detail} <span style={{ color: "var(--accent)" }}>↗</span></span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* OKUR YORUMLARI */}
        <section id="reviews" className="cg-section" style={{ background: "var(--bg-2)" }}>
          <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
            <Reveal><Eyebrow>{t.reviews.label}</Eyebrow></Reveal>
            <Reveal delay={0.05} as="h2" className="cg-huge" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", marginTop: "1.25rem", marginBottom: "clamp(2.5rem, 6vh, 4rem)" }}>{t.reviews.heading}</Reveal>
            <div className="cg-reviews">
              {REVIEWS.map((r, i) => (
                <Reveal key={i} delay={(i % 3) * 0.06} className="cg-review-card">
                  <blockquote style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: "1.1rem", lineHeight: 1.55, color: "var(--ink)" }}>&ldquo;{r.text}&rdquo;</blockquote>
                  <span style={{ marginTop: "1.25rem", fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)" }}>{r.source}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* MEDYA — Podcast + YouTube */}
        <section id="media" className="cg-section">
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <Reveal><Eyebrow>{t.media.label}</Eyebrow></Reveal>
            <Reveal delay={0.05} as="h2" className="cg-huge" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", marginTop: "1.25rem" }}>{t.media.heading}</Reveal>
            <Reveal delay={0.1} as="p" style={{ marginTop: "1.25rem", fontSize: "1rem", lineHeight: 1.7, color: "var(--muted)", maxWidth: "48ch" }}>{t.media.podcastDesc}</Reveal>

            <Reveal delay={0.12} style={{ marginTop: "2.5rem" }}>
              <span style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>{t.media.podcast}</span>
              <div className="cg-embed">
                <iframe title="Şairin Hesabı — Spotify" src={`https://open.spotify.com/embed/show/${MEDIA.spotifyShow}?utm_source=generator`} width="100%" height="232" frameBorder="0" allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ display: "block" }} />
              </div>
              <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
                {MEDIA.episodes.map((ep, i) => (
                  <div key={i} className="cg-embed">
                    <iframe title={`Bölüm ${i + 1}`} src={`https://open.spotify.com/embed/episode/${ep}?utm_source=generator`} width="100%" height="152" frameBorder="0" allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ display: "block" }} />
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.14} style={{ marginTop: "2.75rem" }}>
              <span style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>{t.media.video}</span>
              <div className="cg-embed" style={{ aspectRatio: "16 / 9" }}>
                <iframe title="YouTube — Berkay Doğan" src={`https://www.youtube.com/embed/${MEDIA.youtube}`} width="100%" height="100%" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" style={{ display: "block" }} />
              </div>
            </Reveal>

            {PLAYLISTS.length > 0 && (
              <Reveal delay={0.16} style={{ marginTop: "2.75rem" }}>
                <span style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>
                  {lang === "tr" ? "Şu sıralar dinlediklerim" : lang === "fr" ? "Ce que j'écoute en ce moment" : "What I'm listening to"}
                </span>
                <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                  {PLAYLISTS.map((pl) => (
                    <a key={pl.path} href={`https://music.apple.com${pl.path}`} target="_blank" rel="noopener noreferrer" className="cg-playlist">
                      <span className="cg-playlist-icon" aria-hidden="true">♪</span>
                      <span className="cg-playlist-name">{pl.name}</span>
                      <span className="cg-playlist-meta">Apple Music →</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* PROJELER — kitap dışı işler (ŞİMDİ / necaliyor.co) */}
        <Projeler lang={lang} />

        {/* KÂHİN — bir kelime söyle, sana bir dize düşsün */}
        <Kahin t={t.kahin} verses={VERSES} />

        {/* ALINTI KARTI — dize seç, indir, paylaş */}
        <AlintiKarti lang={lang} />

        {/* YAZILAR */}
        <section id="writing" className="cg-section" style={{ textAlign: "center" }}>
          <Reveal style={{ display: "inline-flex" }}><Eyebrow>{t.writing.label}</Eyebrow></Reveal>
          <Reveal delay={0.06} as="p" className="cg-serif" style={{ margin: "2rem auto 2.25rem", fontStyle: "italic", fontSize: "clamp(1.6rem, 4vw, 2.8rem)", lineHeight: 1.35, maxWidth: "22ch", color: "var(--ink)" }}>{t.writing.line}</Reveal>
          <Reveal delay={0.1} style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/yazilar" className="cg-btn cg-btn-fill">{lang === "tr" ? "Tüm yazılar" : lang === "fr" ? "Tous les écrits" : "All writing"} →</a>
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="cg-btn cg-btn-ghost">{t.writing.cta} ↗</a>
          </Reveal>
        </section>

        {/* İLETİŞİM */}
        <section id="contact" className="cg-section" style={{ background: "var(--bg-2)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <Reveal><span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />{t.contact.label}</span></Reveal>
            <Reveal delay={0.06} as="p" className="cg-serif" style={{ margin: "1.75rem 0 2.5rem", fontStyle: "italic", fontSize: "clamp(1.7rem, 4.5vw, 3.4rem)", lineHeight: 1.3, maxWidth: "20ch" }}>{t.contact.line}</Reveal>
            <Reveal delay={0.12}>
              <a href={`mailto:${EMAIL}`} className="cg-huge" style={{ display: "inline-block", fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)", color: "var(--ink)", letterSpacing: "-0.02em" }}>{EMAIL}</a>
            </Reveal>
            <Reveal delay={0.18} style={{ marginTop: "3rem", display: "flex", gap: "2rem", flexWrap: "wrap", fontSize: "0.76rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="cg-link">YouTube</a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="cg-link">Instagram</a>
              <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="cg-link">Substack</a>
              <a href="/press" className="cg-link">{lang === "tr" ? "Basın kiti" : lang === "fr" ? "Presse" : "Press kit"}</a>
            </Reveal>
            <p style={{ marginTop: "4rem", fontSize: "0.66rem", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.5 }}>© 2026 Berkay Doğan</p>
          </div>
        </section>
      </main>
    </div>
  );
}
