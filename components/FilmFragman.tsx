"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* Film — Tasfiye'nin 50 saniyelik sinematik fragmanı (gerçek çekim + özgün skor).
   Dikey/yatay kaynak ekran yönüne göre seçilir; ses kullanıcı jestiyle açık
   başlatılır çünkü skor ve daktilo sesi filmin yarısıdır. */

type Lang = "tr" | "en" | "fr";

const COPY: Record<Lang, { baslik: string; alt: string; izle: string; tekrar: string; ipucu: string; geri: string; kitap: string }> = {
  tr: { baslik: "Film", alt: "Tasfiye — Bir Yazarın Hesabı", izle: "Filmi izle", tekrar: "Tekrar izle", ipucu: "50 saniye · sesli izlemen önerilir", geri: "← berkaydogan.co", kitap: "Kitabı incele" },
  en: { baslik: "The Film", alt: "Tasfiye — A Writer's Reckoning", izle: "Play the film", tekrar: "Play again", ipucu: "50 seconds · best with sound on", geri: "← berkaydogan.co", kitap: "About the book" },
  fr: { baslik: "Le Film", alt: "Tasfiye — Le Bilan d'un écrivain", izle: "Lancer le film", tekrar: "Revoir", ipucu: "50 secondes · à regarder avec le son", geri: "← berkaydogan.co", kitap: "Découvrir le livre" },
};

export default function FilmFragman() {
  const [lang, setLang] = useState<Lang>("tr");
  const [dikey, setDikey] = useState(false);
  const [durum, setDurum] = useState<"bekliyor" | "oynuyor" | "bitti">("bekliyor");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem("bd-lang");
      if (s === "tr" || s === "en" || s === "fr") setLang(s);
      else {
        const n = (navigator.language || "").toLowerCase();
        setLang(n.startsWith("tr") ? "tr" : n.startsWith("fr") ? "fr" : "en");
      }
    } catch { /* yoksay */ }
    const mq = window.matchMedia("(orientation: portrait)");
    const uygula = () => setDikey(mq.matches);
    uygula();
    mq.addEventListener("change", uygula);
    return () => mq.removeEventListener("change", uygula);
  }, []);

  const c = COPY[lang];
  const kaynak = dikey ? "/film/tasfiye-fragman-dikey.mp4" : "/film/tasfiye-fragman-yatay.mp4";
  const poster = dikey ? "/film/fragman-poster-dikey.jpg" : "/film/fragman-poster.jpg";

  const baslat = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    v.play().catch(() => { /* kullanıcı jesti var, oynamalı */ });
    setDurum("oynuyor");
  };

  return (
    <main className="flm-sahne">
      <style>{`
        .flm-sahne { min-height: 100svh; background: #050505; color: #FAFAFA;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 22px; padding: 24px; font-family: var(--font-grotesk), sans-serif; }
        .flm-cerceve { position: relative; width: min(100%, 1060px); border-radius: 14px; overflow: hidden;
          background: #000; box-shadow: 0 30px 90px rgba(0,0,0,.7), 0 0 70px rgba(229,64,42,.07); }
        .flm-cerceve.dikey { width: min(100%, 420px); }
        .flm-cerceve video { display: block; width: 100%; height: auto; }
        .flm-ortu { position: absolute; inset: 0; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 14px; cursor: pointer;
          background: linear-gradient(rgba(5,5,5,.25), rgba(5,5,5,.55)); border: 0; padding: 0; }
        .flm-oynat { width: 84px; height: 84px; border-radius: 50%; border: 1px solid rgba(250,250,250,.35);
          background: rgba(5,5,5,.55); backdrop-filter: blur(6px); display: grid; place-items: center;
          transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
        .flm-ortu:hover .flm-oynat { transform: scale(1.06); border-color: #E5402A; box-shadow: 0 0 34px rgba(229,64,42,.35); }
        .flm-oynat svg { margin-left: 5px; }
        .flm-ortu span { font-size: 14px; letter-spacing: .18em; text-transform: uppercase; color: #FAFAFA; }
        .flm-ust { text-align: center; }
        .flm-ust h1 { font-family: var(--font-serif), serif; font-weight: 420; font-size: clamp(30px, 5vw, 44px); letter-spacing: .02em; }
        .flm-ust p { margin-top: 6px; font-size: 13px; letter-spacing: .3em; text-transform: uppercase; color: #8a8a8a; }
        .flm-alt { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; justify-content: center; }
        .flm-alt a { color: #8a8a8a; font-size: 13px; letter-spacing: .08em; text-decoration: none; transition: color .2s ease; }
        .flm-alt a:hover { color: #FAFAFA; }
        .flm-alt a.koz { color: #E5402A; }
        .flm-ipucu { font-size: 12px; letter-spacing: .12em; color: #6a6a6a; }
      `}</style>

      <div className="flm-ust">
        <h1>{c.baslik}</h1>
        <p>{c.alt}</p>
      </div>

      <div className={`flm-cerceve${dikey ? " dikey" : ""}`}>
        <video
          ref={videoRef}
          key={kaynak}
          src={kaynak}
          poster={poster}
          controls={durum !== "bekliyor"}
          playsInline
          preload="metadata"
          onEnded={() => setDurum("bitti")}
        />
        {durum !== "oynuyor" && (
          <button type="button" className="flm-ortu" onClick={baslat} aria-label={durum === "bitti" ? c.tekrar : c.izle}>
            <span className="flm-oynat" aria-hidden>
              <svg width="26" height="30" viewBox="0 0 26 30" fill="none"><path d="M1 1.5v27L25 15 1 1.5Z" fill="#FAFAFA" /></svg>
            </span>
            <span>{durum === "bitti" ? c.tekrar : c.izle}</span>
          </button>
        )}
      </div>

      <p className="flm-ipucu">{c.ipucu}</p>

      <div className="flm-alt">
        <Link href="/">{c.geri}</Link>
        <Link className="koz" href="/kitaplar/tasfiye">{c.kitap} →</Link>
      </div>
    </main>
  );
}
