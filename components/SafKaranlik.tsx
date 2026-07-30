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

/* ---------- Scroll ile beliren sarmalayıcı (austere, minimal) ---------- */
function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = window.setTimeout(() => setShown(true), 0);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.14 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 1s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 1s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* ---------- Ortak küçük etiket ---------- */
function Label({ children, tone = "gray" }: { children: React.ReactNode; tone?: "gray" | "bordo" }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.7rem",
        letterSpacing: "0.4em",
        textTransform: "uppercase",
        color: tone === "bordo" ? "var(--bordo)" : "currentColor",
        opacity: tone === "bordo" ? 1 : 0.5,
      }}
    >
      {children}
    </span>
  );
}

export function SafKaranlik() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef<HTMLElement | null>(null);
  const [entered, setEntered] = useState(false);

  /* Tiyatral açılış zamanlaması */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => setEntered(true), reduce ? 0 : 60);
    return () => window.clearTimeout(id);
  }, []);

  /* Karanlık → ışık: kapanış bölümüne göre scroll'a bağlı renk geçişi */
  useEffect(() => {
    const root = rootRef.current;
    const closing = closingRef.current;
    if (!root || !closing) return;

    let ticking = false;
    const compute = () => {
      ticking = false;
      const rect = closing.getBoundingClientRect();
      const vh = window.innerHeight;
      // Daha kademeli "sabaha çıkış": kapanış ekranın altına girerken başlar,
      // üstü hafif geçince tamamlanır (~1.2vh'lik yumuşak bant).
      const start = vh * 1.05;
      const end = -vh * 0.15;
      const p = clamp((start - rect.top) / (start - end), 0, 1);
      root.style.setProperty("--sk-bg", mix("#080808", "#F0ECE4", p));
      root.style.setProperty("--sk-text", mix("#F0ECE4", "#1a1a1a", p));
      root.style.setProperty("--sk-vignette", String(0.55 * (1 - p)));
    };
    const onScroll = () => {
      // Görünür sekmede rAF ile yumuşat; her ihtimale karşı doğrudan da hesapla
      compute();
      if (!ticking && typeof requestAnimationFrame !== "undefined") {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
        "--sk-bg": "#080808",
        "--sk-text": "#F0ECE4",
        "--sk-vignette": "0.55",
        background: "var(--sk-bg)",
        color: "var(--sk-text)",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <style>{`
        .sk a { color: inherit; }
        .sk-link {
          position: relative;
          border-bottom: 1px solid rgba(139,26,26,0.5);
          padding-bottom: 2px;
          transition: color 0.4s ease, border-color 0.4s ease;
        }
        .sk-link:hover { color: var(--bordo); border-color: var(--bordo); }
        .sk-beam {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(58% 44% at 50% -6%, rgba(240,236,228,0.16), rgba(240,236,228,0.05) 42%, transparent 68%),
            radial-gradient(30% 90% at 50% 0%, rgba(240,236,228,0.06), transparent 60%);
          opacity: 0; transition: opacity 1.6s ease;
        }
        .sk-beam.on { opacity: 1; }
        .sk-open-line, .sk-open-by, .sk-open-cue { opacity: 0; transform: translateY(14px); }
        .sk-open.on .sk-open-line { opacity: 1; transform: translateY(0); transition: opacity 1.4s ease 0.9s, transform 1.4s ease 0.9s; }
        .sk-open.on .sk-open-by   { opacity: 1; transform: translateY(0); transition: opacity 1.2s ease 1.9s, transform 1.2s ease 1.9s; }
        .sk-open.on .sk-open-cue  { opacity: 0.5; transform: translateY(0); transition: opacity 1.2s ease 2.6s, transform 1.2s ease 2.6s; }
        @keyframes skCue { 0%,100% { transform: translateY(0); opacity: 0.5; } 50% { transform: translateY(6px); opacity: 0.2; } }
        .sk-grain {
          position: fixed; inset: 0; z-index: 50; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
          opacity: 0.05; mix-blend-mode: overlay;
        }
        .sk-vignette {
          position: fixed; inset: 0; z-index: 49; pointer-events: none;
          box-shadow: inset 0 0 220px rgba(0,0,0,var(--sk-vignette));
        }
        @media (max-width: 720px) {
          .sk-books { grid-template-columns: 1fr !important; gap: 4rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sk-beam { transition: none; }
          .sk-open.on .sk-open-line, .sk-open.on .sk-open-by, .sk-open.on .sk-open-cue { transition: none; }
          .sk-open-cue { animation: none !important; }
        }
      `}</style>

      <div className="sk-grain" aria-hidden="true" />
      <div className="sk-vignette" aria-hidden="true" />

      <main className="sk">
        {/* ---------------- AÇILIŞ / HERO ---------------- */}
        <section
          className={`sk-open${entered ? " on" : ""}`}
          style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem 1.5rem" }}
        >
          <div className={`sk-beam${entered ? " on" : ""}`} aria-hidden="true" />
          <h1 className="sk-open-line" style={{ position: "relative", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.7rem, 5.2vw, 3.4rem)", lineHeight: 1.35, letterSpacing: "-0.01em", maxWidth: "20ch", margin: "0 auto" }}>
            trajedilere elveda deyip, dinginliğin zuhur etmesi.
          </h1>
          <p className="sk-open-by" style={{ position: "relative", marginTop: "2.75rem", fontSize: "0.72rem", letterSpacing: "0.42em", textTransform: "uppercase", opacity: 0.55 }}>
            Berkay Doğan — şair, yazar
          </p>
          <span className="sk-open-cue" aria-hidden="true" style={{ position: "absolute", bottom: "2.2rem", fontSize: "0.7rem", letterSpacing: "0.3em", animation: "skCue 2.6s ease-in-out infinite 3.6s" }}>↓</span>
        </section>

        {/* ---------------- MANİFEST ---------------- */}
        <section style={{ padding: "clamp(6rem, 16vh, 12rem) 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <Reveal><Label tone="bordo">Manifest</Label></Reveal>
          <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "0.9rem", maxWidth: "24ch" }}>
            {poem.map((line, i) => {
              const finale = i >= poem.length - 2;
              return (
                <Reveal
                  key={i}
                  as="p"
                  delay={i * 0.06}
                  style={{
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: finale ? "clamp(1.5rem, 4.2vw, 2.4rem)" : "clamp(1.25rem, 3.2vw, 1.85rem)",
                    lineHeight: 1.5,
                    opacity: finale ? 1 : 0.82,
                  }}
                >
                  {line}
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ---------------- KİTAPLAR ---------------- */}
        <section style={{ padding: "clamp(5rem, 12vh, 9rem) 1.5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Reveal style={{ textAlign: "center" }}><Label tone="bordo">Kitaplar</Label></Reveal>

          <div className="sk-books" style={{ marginTop: "4rem", width: "100%", maxWidth: "980px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 6vw, 5rem)", alignItems: "start" }}>
            {/* Mürekkep ve Köz */}
            <Reveal style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.25rem" }}>
              <img src="/murekkep-ve-koz-on-kapak.jpg" alt="Mürekkep ve Köz — kapak" loading="lazy" style={{ width: "150px", height: "auto", borderRadius: "2px", boxShadow: "0 24px 55px rgba(0,0,0,0.55)" }} />
              <div>
                <span style={{ display: "inline-block", fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--cream)", background: "var(--bordo)", padding: "0.35rem 0.6rem", borderRadius: "2px" }}>#1 Trendyol Şiir</span>
              </div>
              <h3 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "-0.01em" }}>Mürekkep ve Köz</h3>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.5 }}>Şiir · İskenderiye Kitap · 2025</p>
              <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.6, opacity: 0.82, maxWidth: "26ch" }}>Bir Şairin Hesabı.</p>
              <a href={TRENDYOL_URL} target="_blank" rel="noopener noreferrer" className="sk-link" style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Kitaba git →</a>
            </Reveal>

            {/* Tasfiye — geri sayım, gizem */}
            <Reveal delay={0.1} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.25rem" }}>
              <div style={{ width: "150px", height: "233px", border: "1px solid var(--bordo)", borderRadius: "2px", background: "repeating-linear-gradient(45deg, rgba(139,26,26,0.10) 0, rgba(139,26,26,0.10) 1px, transparent 1px, transparent 11px), var(--bg2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                <span style={{ fontSize: "3.5rem", fontWeight: 300, lineHeight: 1, color: "var(--bordo)" }}>?</span>
                <span style={{ fontSize: "0.48rem", letterSpacing: "0.24em", textTransform: "uppercase", opacity: 0.5 }}>Kapak yakında</span>
              </div>
              <h3 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, letterSpacing: "-0.01em" }}>Tasfiye</h3>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.5 }}>Deneme · İskenderiye Kitap · Ağustos 2026</p>
              <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.6, opacity: 0.82, maxWidth: "28ch" }}>görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isim.</p>
              <div style={{ marginTop: "0.25rem" }}>
                <Countdown labels={["GÜN", "SAAT", "DK"]} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- YAZILAR ---------------- */}
        <section style={{ padding: "clamp(5rem, 12vh, 9rem) 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", borderTop: "1px solid var(--dim)" }}>
          <Reveal><Label tone="bordo">Yazılar</Label></Reveal>
          <Reveal as="p" delay={0.05} style={{ marginTop: "2.5rem", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.3rem, 3.4vw, 2rem)", lineHeight: 1.5, maxWidth: "24ch" }}>
            Aklımdan geçenler, gürültüsüz — bir e-posta uzaklıkta.
          </Reveal>
          <Reveal delay={0.1} style={{ marginTop: "2.25rem" }}>
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="sk-link" style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Substack&apos;te oku →</a>
          </Reveal>
        </section>

        {/* ---------------- KAPANIŞ (IŞIĞA GEÇİŞ) ---------------- */}
        <section
          ref={closingRef as React.RefObject<HTMLElement>}
          style={{ minHeight: "128vh", padding: "clamp(8rem, 22vh, 16rem) 1.5rem clamp(6rem, 14vh, 10rem)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}
        >
          <Reveal><Label tone="bordo">Kapanış</Label></Reveal>
          <Reveal as="p" delay={0.05} style={{ marginTop: "3rem", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.9rem, 6vw, 4rem)", lineHeight: 1.35, maxWidth: "18ch" }}>
            Karanlığı gördük. Şimdi ışık.
          </Reveal>

          <Reveal delay={0.1} style={{ marginTop: "clamp(4rem, 10vh, 7rem)", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <a href={`mailto:${EMAIL}`} className="sk-link" style={{ fontSize: "1.15rem" }}>{EMAIL}</a>
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
