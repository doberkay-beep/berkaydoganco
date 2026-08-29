"use client";

import { useEffect, useRef, useState } from "react";
import { site, LANGS, type Lang, type Copy } from "@/lib/site";
import { Muhur } from "./Muhur";

/* Site kabuğu — nav + mobil menü + dil/tema durumu + mikro-etkileşimler.
   Tüm bölüm sayfaları bunu sarar; içerik render-prop ile (lang, t) alır.
   Stiller globals.css'te (cg-*). */

export function Reveal({ children, as: Tag = "div", delay = 0, className, style }: {
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

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--ink)" }}>
      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />{children}
    </span>
  );
}

export function Kabuk({ children }: { children: (lang: Lang, t: Copy) => React.ReactNode }) {
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
    const id = window.setTimeout(() => {
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
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  /* Menü scroll'da katılaşır */
  useEffect(() => {
    const onScroll = () => { if (navRef.current) navRef.current.dataset.solid = window.scrollY > 40 ? "1" : "0"; };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Mikro-etkileşimler: mıknatıs butonlar + kartlarda ışık takibi (yalnız masaüstü) */
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let magnet: HTMLElement | null = null;
    const onMove = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      const btn = el?.closest?.(".cg-btn") as HTMLElement | null;
      if (magnet && magnet !== btn) { magnet.style.translate = ""; magnet = null; }
      if (btn) {
        const r = btn.getBoundingClientRect();
        const dx = ((e.clientX - r.left) / r.width - 0.5) * 6;
        const dy = ((e.clientY - r.top) / r.height - 0.5) * 5;
        btn.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
        magnet = btn;
      }
      const card = el?.closest?.(".bento-card, .prj-card, .cg-playlist, .cg-review-card") as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => { document.removeEventListener("pointermove", onMove); if (magnet) magnet.style.translate = ""; };
  }, []);

  const navLinks: [string, string][] = [
    ["/kitaplar", t.nav.books],
    ["/deneyimler", t.nav.experiences],
    ["/film", t.nav.film],
    ["/yazilar", t.nav.writing],
    ["/hakkimda", t.nav.about],
    ["/#contact", t.nav.contact],
  ];
  const menuLinks: [string, string][] = [
    ...navLinks.slice(0, 5),
    ["/medya", t.nav.media],
    ["/projeler", t.nav.projects],
    ["/#contact", t.nav.contact],
  ];

  return (
    <div>
      {/* MENÜ */}
      <nav ref={navRef as React.RefObject<HTMLElement>} className="cg-nav cg" data-solid="0">
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.02em" }}>
          <Muhur size={22} />
          Berkay Doğan
        </a>
        <div className="cg-nav-links">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} className="cg-link">{label}</a>
          ))}
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
          {menuLinks.map(([href, label]) => (
            <a key={href + label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </div>
      )}

      {children(lang, t)}
    </div>
  );
}
