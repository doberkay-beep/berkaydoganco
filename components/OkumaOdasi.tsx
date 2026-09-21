"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export type OdaSoz = { s: string; slug: string; kitap: string };

// Sakin istasyonlar — necaliyor.co kataloğundan doğrudan HTTPS yayınlar.
const ISTASYONLAR = [
  { ad: "PowerTürk Slow", url: "https://listen.powerapp.com.tr/powerturkslow/mpeg/icecast.audio" },
  { ad: "Radyo Viva", url: "https://edge1.radyotvonline.net/shoutcast/play/radyoviva" },
  { ad: "Joy Türk", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/JOY_TURK.mp3" },
];

// Okuma Odası — tam ekran ambiyans. Bir söz belirir, yavaşça değişir; istersen
// arka planda necaliyor.co'dan bir radyo çalar. Şiir ile radyo aynı yerde.
export default function OkumaOdasi({ sozler }: { sozler: OdaSoz[] }) {
  const [i, setI] = useState(0);
  const [gorunur, setGorunur] = useState(true);
  const [calan, setCalan] = useState(false);
  const [ist, setIst] = useState(0);
  const [durum, setDurum] = useState<"" | "baglaniyor" | "hata">("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Söz döngüsü — 11 sn'de bir, yumuşak geçiş.
  useEffect(() => {
    if (!sozler.length) return;
    const t = setInterval(() => {
      setGorunur(false);
      setTimeout(() => {
        setI((k) => (k + 1) % sozler.length);
        setGorunur(true);
      }, 900);
    }, 11000);
    return () => clearInterval(t);
  }, [sozler.length]);

  function calDurdur() {
    const a = audioRef.current;
    if (!a) return;
    if (calan) {
      a.pause();
      setCalan(false);
      setDurum("");
    } else {
      a.src = ISTASYONLAR[ist].url;
      setDurum("baglaniyor");
      a.play().then(() => { setCalan(true); setDurum(""); }).catch(() => { setDurum("hata"); setCalan(false); });
    }
  }

  function istasyonDegis() {
    const yeni = (ist + 1) % ISTASYONLAR.length;
    setIst(yeni);
    const a = audioRef.current;
    if (a && calan) {
      a.src = ISTASYONLAR[yeni].url;
      setDurum("baglaniyor");
      a.play().then(() => setDurum("")).catch(() => setDurum("hata"));
    }
  }

  const soz = sozler[i];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, background: "var(--bg)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Ambiyans — nefes alan köz parıltısı */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(60% 50% at 50% 42%, rgba(229,64,42,0.16), rgba(229,64,42,0.04) 45%, transparent 70%)", animation: "odaNefes 9s ease-in-out infinite" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }}>
        {[["12%", "24%", "0s"], ["82%", "30%", "2.4s"], ["68%", "70%", "1.2s"], ["22%", "76%", "3.1s"], ["48%", "18%", "1.8s"]].map(([l, t, d], k) => (
          <span key={k} style={{ position: "absolute", left: l, top: t, width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", filter: "blur(0.5px)", boxShadow: "0 0 12px 2px rgba(229,64,42,0.6)", animation: `odaSuzul 7s ease-in-out ${d} infinite` }} />
        ))}
      </div>

      {/* Üst çubuk */}
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem clamp(1.25rem, 5vw, 3rem)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--muted)" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)" }} />Okuma Odası
        </span>
        <Link href="/" style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>çık ✕</Link>
      </div>

      {/* Söz */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 clamp(1.5rem, 8vw, 6rem)" }}>
        <blockquote style={{ margin: 0, maxWidth: "20ch", fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.9rem, 5.5vw, 4rem)", lineHeight: 1.35, color: "var(--ink)", opacity: gorunur ? 1 : 0, transition: "opacity 0.9s ease" }}>
          &ldquo;{soz?.s}&rdquo;
        </blockquote>
        {soz && (
          <Link href={`/soz/${soz.slug}`} style={{ marginTop: "2rem", fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", opacity: gorunur ? 1 : 0, transition: "opacity 0.9s ease", borderBottom: "1px solid var(--line)", paddingBottom: "2px" }}>
            {soz.kitap} · sözün sayfası →
          </Link>
        )}
      </div>

      {/* Alt çubuk — radyo */}
      <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexWrap: "wrap", padding: "1.5rem clamp(1.25rem, 5vw, 3rem) 2rem" }}>
        <button onClick={calDurdur} style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.06em", padding: "0.8rem 1.4rem", borderRadius: "100px", background: calan ? "var(--accent)" : "transparent", color: calan ? "var(--accent-ink)" : "var(--ink)", border: calan ? "none" : "1px solid var(--line)", cursor: "pointer" }}>
          {calan ? "❚❚ Sustur" : "▶ Radyoyu aç"}
        </button>
        <button onClick={istasyonDegis} style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.08em", color: "var(--muted)", background: "none", border: "1px solid var(--line)", borderRadius: "100px", padding: "0.8rem 1.2rem", cursor: "pointer" }}>
          {ISTASYONLAR[ist].ad}{durum === "baglaniyor" ? " · bağlanıyor…" : durum === "hata" ? " · ✕" : ""} ↻
        </button>
        <a href="https://necaliyor.co" target="_blank" rel="me noopener" style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
          necaliyor.co →
        </a>
      </div>

      <audio ref={audioRef} preload="none" onError={() => { if (calan) setDurum("hata"); }} />

      <style>{`
        @keyframes odaNefes { 0%,100%{opacity:.7} 50%{opacity:1} }
        @keyframes odaSuzul { 0%,100%{transform:translateY(0);opacity:.35} 50%{transform:translateY(-18px);opacity:.9} }
      `}</style>
    </div>
  );
}
