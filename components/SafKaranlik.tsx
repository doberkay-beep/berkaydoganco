"use client";

import { useEffect, useRef, useState } from "react";
import { Countdown } from "./Countdown";

const TRENDYOL_URL =
  "https://www.trendyol.com/iskenderiye-kitap/murekkep-ve-koz-berkay-dogan-p-1072536167";
const SUBSTACK_URL = "https://doberkay.substack.com";
const YOUTUBE_URL = "https://youtube.com/@yazarberkaydogan";
const INSTAGRAM_URL = "https://instagram.com/berkaydgn__";
const EMAIL = "do.berkay@icloud.com";

/* ---------- Renk yardımcıları (karanlık→ışık interpolasyonu) ---------- */
const hexToRgb = (h: string) => {
  const s = h.replace("#", "");
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
};
const mix = (c1: string, c2: string, t: number) => {
  const a = hexToRgb(c1), b = hexToRgb(c2);
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
};
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ---------- Scroll ile beliren sarmalayıcı ---------- */
function Reveal({
  children, as: Tag = "div", delay = 0, className, style,
}: {
  children: React.ReactNode; as?: React.ElementType; delay?: number;
  className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = window.setTimeout(() => setShown(true), 0);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
    }, { threshold: 0.14 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* ---------- Küçük etiket ---------- */
function Label({ children, tone = "gray" }: { children: React.ReactNode; tone?: "gray" | "bordo" }) {
  return (
    <span style={{
      display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.4em",
      textTransform: "uppercase", color: tone === "bordo" ? "var(--bordo)" : "currentColor",
      opacity: tone === "bordo" ? 1 : 0.5,
    }}>{children}</span>
  );
}

/* ---------- Full-bleed karartılmış görsel arka plan ---------- */
function Backdrop({ src, position = "center", strength = 0.6 }: { src: string; position?: string; strength?: number }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
      <img src={src} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: position, filter: "grayscale(100%) contrast(1.1) brightness(0.42)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, rgba(8,8,8,${strength}), rgba(8,8,8,${strength - 0.1}) 45%, rgba(8,8,8,0.92))` }} />
    </div>
  );
}

export function SafKaranlik() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const [entered, setEntered] = useState(false);

  /* Tiyatral açılış */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => setEntered(true), reduce ? 0 : 60);
    return () => window.clearTimeout(id);
  }, []);

  /* Karanlık → ışık + menü görünürlüğü (scroll'a bağlı) */
  useEffect(() => {
    const root = rootRef.current;
    const closing = closingRef.current;
    if (!root || !closing) return;
    let ticking = false;
    const compute = () => {
      ticking = false;
      const vh = window.innerHeight;
      const rect = closing.getBoundingClientRect();
      const start = vh * 1.05, end = -vh * 0.15;
      const p = clamp((start - rect.top) / (start - end), 0, 1);
      root.style.setProperty("--sk-bg", mix("#080808", "#F0ECE4", p));
      root.style.setProperty("--sk-text", mix("#F0ECE4", "#1a1a1a", p));
      root.style.setProperty("--sk-vignette", String(0.55 * (1 - p)));
      // Menü açılıştan sonra belirir
      if (navRef.current) {
        const show = window.scrollY > vh * 0.42;
        navRef.current.style.opacity = show ? "1" : "0";
        navRef.current.style.pointerEvents = show ? "auto" : "none";
      }
    };
    const onScroll = () => {
      compute();
      if (!ticking && typeof requestAnimationFrame !== "undefined") { ticking = true; requestAnimationFrame(compute); }
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const poem = [
    "Bu kendimden emin olma hali,",
    "Bu zamanı avucumun içinde yakalama hali,",
    "İstediğim vakit, istediğim yerde olma arzusu…",
    "Klasiklerin keskin, sivri uçlarımı törpülemesi hali,",
    "Kendimi bir okyanusta yatar halde bulma isteği,",
    "Kalabalıklar içinde, zekâ arama hali…",
    "Trajedilere elveda deyip",
    "Hayata, dinginliğin zuhur etmesi hali…",
  ];

  return (
    <div
      ref={rootRef}
      style={{
        // @ts-expect-error CSS custom props
        "--sk-bg": "#080808", "--sk-text": "#F0ECE4", "--sk-vignette": "0.55",
        background: "var(--sk-bg)", color: "var(--sk-text)", minHeight: "100vh", overflow: "hidden",
      }}
    >
      <style>{`
        .sk a { color: inherit; text-decoration: none; }
        .sk-link { border-bottom: 1px solid rgba(139,26,26,0.5); padding-bottom: 2px; transition: color 0.4s ease, border-color 0.4s ease; }
        .sk-link:hover { color: var(--bordo); border-color: var(--bordo); }

        /* MENÜ — açılıştan sonra belirir, ışıkta koyulaşır (renk var(--sk-text)) */
        .sk-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 40;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.4rem clamp(1.5rem, 4vw, 3.5rem);
          color: var(--sk-text);
          opacity: 0; transition: opacity 0.8s ease, color 0.2s linear;
        }
        .sk-nav-logo { font-size: 1.15rem; letter-spacing: 0.14em; }
        .sk-nav-links { display: flex; gap: clamp(1.2rem, 2.4vw, 2.4rem); font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase; }
        .sk-nav-links a { opacity: 0.62; transition: opacity 0.3s ease, color 0.3s ease; }
        .sk-nav-links a:hover { opacity: 1; color: var(--bordo); }
        @media (max-width: 720px) { .sk-nav-links { display: none; } }

        /* Işık huzmesi (açılış) */
        .sk-beam { position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(58% 44% at 50% -6%, rgba(240,236,228,0.16), rgba(240,236,228,0.05) 42%, transparent 68%), radial-gradient(30% 90% at 50% 0%, rgba(240,236,228,0.06), transparent 60%);
          opacity: 0; transition: opacity 1.6s ease; }
        .sk-beam.on { opacity: 1; }
        .sk-open-line, .sk-open-by, .sk-open-cue { opacity: 0; transform: translateY(14px); }
        .sk-open.on .sk-open-line { opacity: 1; transform: translateY(0); transition: opacity 1.4s ease 0.9s, transform 1.4s ease 0.9s; }
        .sk-open.on .sk-open-by   { opacity: 1; transform: translateY(0); transition: opacity 1.2s ease 1.9s, transform 1.2s ease 1.9s; }
        .sk-open.on .sk-open-cue  { opacity: 0.5; transform: translateY(0); transition: opacity 1.2s ease 2.6s, transform 1.2s ease 2.6s; }
        @keyframes skCue { 0%,100% { transform: translateY(0); opacity: 0.5; } 50% { transform: translateY(6px); opacity: 0.2; } }

        /* Editoryal kitap satırı — masaüstünde yatay, mobilde dikey */
        .sk-book-row { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 6vw, 6rem); align-items: center; max-width: 1100px; margin: 0 auto; width: 100%; }
        .sk-book-row + .sk-book-row { margin-top: clamp(4rem, 10vh, 8rem); }
        .sk-book-media { display: flex; justify-content: center; }
        @media (max-width: 820px) {
          .sk-book-row { grid-template-columns: 1fr !important; gap: 2.5rem !important; text-align: center; }
          .sk-book-row .sk-book-text { align-items: center !important; }
          .sk-book-row.rev .sk-book-media { order: -1; }
        }

        .sk-grain { position: fixed; inset: 0; z-index: 50; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
          opacity: 0.05; mix-blend-mode: overlay; }
        .sk-vignette { position: fixed; inset: 0; z-index: 49; pointer-events: none; box-shadow: inset 0 0 220px rgba(0,0,0,var(--sk-vignette)); }

        @media (prefers-reduced-motion: reduce) {
          .sk-beam, .sk-nav, .sk-open.on .sk-open-line, .sk-open.on .sk-open-by, .sk-open.on .sk-open-cue { transition: none; }
          .sk-open-cue { animation: none !important; }
        }
      `}</style>

      <div className="sk-grain" aria-hidden="true" />
      <div className="sk-vignette" aria-hidden="true" />

      {/* MENÜ */}
      <nav ref={navRef as React.RefObject<HTMLElement>} className="sk-nav sk">
        <a href="#top" className="sk-nav-logo">Berkay Doğan</a>
        <div className="sk-nav-links">
          <a href="#manifest">Manifest</a>
          <a href="#kitaplar">Kitaplar</a>
          <a href="#yazilar">Yazılar</a>
          <a href="#kapanis">İletişim</a>
        </div>
      </nav>

      <main className="sk" id="top">
        {/* ---------------- AÇILIŞ ---------------- */}
        <section className={`sk-open${entered ? " on" : ""}`} style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem 1.5rem" }}>
          <div className={`sk-beam${entered ? " on" : ""}`} aria-hidden="true" />
          <h1 className="sk-open-line" style={{ position: "relative", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.8rem, 5vw, 4rem)", lineHeight: 1.32, letterSpacing: "-0.01em", maxWidth: "22ch", margin: "0 auto" }}>
            trajedilere elveda deyip, dinginliğin zuhur etmesi.
          </h1>
          <p className="sk-open-by" style={{ position: "relative", marginTop: "2.75rem", fontSize: "0.72rem", letterSpacing: "0.42em", textTransform: "uppercase", opacity: 0.55 }}>
            Berkay Doğan — şair, yazar
          </p>
          <span className="sk-open-cue" aria-hidden="true" style={{ position: "absolute", bottom: "2.2rem", fontSize: "0.7rem", letterSpacing: "0.3em", animation: "skCue 2.6s ease-in-out infinite 3.6s" }}>↓</span>
        </section>

        {/* ---------------- MANİFEST (karartılmış gece şehri) ---------------- */}
        <section id="manifest" style={{ position: "relative", padding: "clamp(7rem, 20vh, 14rem) 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <Backdrop src="/images/gece-sehir.jpg" position="center 55%" strength={0.68} />
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Reveal><Label tone="bordo">Manifest</Label></Reveal>
            <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "0.9rem", maxWidth: "26ch" }}>
              {poem.map((line, i) => {
                const finale = i >= poem.length - 2;
                return (
                  <Reveal key={i} as="p" delay={i * 0.05} style={{ fontStyle: "italic", fontWeight: 300, fontSize: finale ? "clamp(1.6rem, 4vw, 2.8rem)" : "clamp(1.3rem, 3vw, 2.05rem)", lineHeight: 1.5, opacity: finale ? 1 : 0.85 }}>
                    {line}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- SİNEMATİK ARA (Boğaz köprüsü) ---------------- */}
        <section style={{ position: "relative", minHeight: "78vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem 1.5rem" }}>
          <Backdrop src="/images/bogaz-kopru.jpg" position="center 42%" strength={0.5} />
          <Reveal as="p" style={{ position: "relative", zIndex: 1, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.2rem, 7vw, 5rem)", lineHeight: 1.25, letterSpacing: "-0.02em", maxWidth: "16ch" }}>
            Yıkılamadım, yıktım.
          </Reveal>
        </section>

        {/* ---------------- KİTAPLAR (editoryal) ---------------- */}
        <section id="kitaplar" style={{ padding: "clamp(6rem, 14vh, 11rem) clamp(1.5rem, 5vw, 4rem)", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Reveal style={{ textAlign: "center", marginBottom: "clamp(3.5rem, 8vh, 6rem)" }}><Label tone="bordo">Kitaplar</Label></Reveal>

          {/* Mürekkep ve Köz — görsel sol, metin sağ */}
          <Reveal className="sk-book-row">
            <div className="sk-book-media">
              <img src="/murekkep-ve-koz-on-kapak.jpg" alt="Mürekkep ve Köz — kapak" loading="lazy" style={{ width: "clamp(160px, 22vw, 240px)", height: "auto", borderRadius: "2px", boxShadow: "0 30px 70px rgba(0,0,0,0.6)" }} />
            </div>
            <div className="sk-book-text" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.25rem" }}>
              <span style={{ fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--cream)", background: "var(--bordo)", padding: "0.35rem 0.6rem", borderRadius: "2px" }}>#1 Trendyol Şiir</span>
              <h3 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1 }}>Mürekkep ve Köz</h3>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.5 }}>Şiir · İskenderiye Kitap · 2025</p>
              <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.1rem, 2vw, 1.4rem)", lineHeight: 1.6, opacity: 0.85, maxWidth: "34ch" }}>Bir Şairin Hesabı. Boğucu bir yalnızlığın, ulusal kaosun ve varoluşsal krizin içinden sökülerek yazılan 200’den fazla şiir.</p>
              <a href={TRENDYOL_URL} target="_blank" rel="noopener noreferrer" className="sk-link" style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: "0.5rem" }}>Kitaba git →</a>
            </div>
          </Reveal>

          {/* Tasfiye — metin sol, gizem sağ (ters) */}
          <Reveal className="sk-book-row rev">
            <div className="sk-book-text" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.25rem" }}>
              <span style={{ fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--bordo)", border: "1px solid var(--bordo)", padding: "0.35rem 0.6rem", borderRadius: "2px" }}>Yakında</span>
              <h3 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1 }}>Tasfiye</h3>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.5 }}>Deneme · İskenderiye Kitap · Ağustos 2026</p>
              <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.1rem, 2vw, 1.4rem)", lineHeight: 1.6, opacity: 0.85, maxWidth: "32ch" }}>görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isim.</p>
              <div style={{ marginTop: "0.75rem" }}><Countdown labels={["GÜN", "SAAT", "DK"]} /></div>
            </div>
            <div className="sk-book-media">
              <div style={{ width: "clamp(160px, 22vw, 240px)", aspectRatio: "150 / 233", border: "1px solid var(--bordo)", borderRadius: "2px", background: "repeating-linear-gradient(45deg, rgba(139,26,26,0.10) 0, rgba(139,26,26,0.10) 1px, transparent 1px, transparent 12px), var(--bg2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.25rem" }}>
                <span style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 300, lineHeight: 1, color: "var(--bordo)" }}>?</span>
                <span style={{ fontSize: "0.5rem", letterSpacing: "0.24em", textTransform: "uppercase", opacity: 0.55 }}>Kapak yakında</span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------------- YAZILAR ---------------- */}
        <section id="yazilar" style={{ padding: "clamp(6rem, 14vh, 10rem) 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", borderTop: "1px solid var(--dim)" }}>
          <Reveal><Label tone="bordo">Yazılar</Label></Reveal>
          <Reveal as="p" delay={0.05} style={{ marginTop: "2.5rem", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.4rem, 3.4vw, 2.4rem)", lineHeight: 1.5, maxWidth: "24ch" }}>
            Aklımdan geçenler, gürültüsüz — bir e-posta uzaklıkta.
          </Reveal>
          <Reveal delay={0.1} style={{ marginTop: "2.25rem" }}>
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="sk-link" style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Substack&apos;te oku →</a>
          </Reveal>
        </section>

        {/* ---------------- KAPANIŞ (IŞIĞA GEÇİŞ) ---------------- */}
        <section id="kapanis" ref={closingRef as React.RefObject<HTMLElement>} style={{ minHeight: "128vh", padding: "clamp(8rem, 22vh, 16rem) 1.5rem clamp(6rem, 14vh, 10rem)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <Reveal><Label tone="bordo">Kapanış</Label></Reveal>
          <Reveal as="p" delay={0.05} style={{ marginTop: "3rem", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2rem, 6.5vw, 4.6rem)", lineHeight: 1.3, maxWidth: "18ch" }}>
            Karanlığı gördük. Şimdi ışık.
          </Reveal>
          <Reveal delay={0.1} style={{ marginTop: "clamp(4rem, 10vh, 7rem)", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <a href={`mailto:${EMAIL}`} className="sk-link" style={{ fontSize: "1.2rem" }}>{EMAIL}</a>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center", fontSize: "0.72rem", letterSpacing: "0.24em", textTransform: "uppercase" }}>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="sk-link">YouTube</a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="sk-link">Instagram</a>
              <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="sk-link">Substack</a>
            </div>
            <p style={{ marginTop: "2.5rem", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.45 }}>© 2026 Berkay Doğan</p>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
