"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* Film — Tasfiye'nin 50 saniyelik sinematik fragmanı (gerçek çekim + özgün skor).
   Dikey/yatay kaynak ekran yönüne göre seçilir; ses kullanıcı jestiyle açık
   başlatılır çünkü skor ve daktilo sesi filmin yarısıdır. */

type Lang = "tr" | "en" | "fr";

const COPY: Record<Lang, { baslik: string; alt: string; izle: string; tekrar: string; ipucu: string; geri: string; kitap: string; kisa: string; kisaAlt: string; sessiz: string }> = {
  tr: { baslik: "Film", alt: "Tasfiye — Bir Yazarın Hesabı", izle: "Filmi izle", tekrar: "Tekrar izle", ipucu: "50 saniye · sesli izlemen önerilir", geri: "← berkaydogan.co", kitap: "Kitabı incele", kisa: "Kısa filmler", kisaAlt: "Kampanyadan üç kısa: bir dize, bir duygu, yirmi saniye.", sessiz: "sessiz" },
  en: { baslik: "The Film", alt: "Tasfiye — A Writer's Reckoning", izle: "Play the film", tekrar: "Play again", ipucu: "50 seconds · best with sound on", geri: "← berkaydogan.co", kitap: "About the book", kisa: "Short films", kisaAlt: "Three shorts from the campaign: one line, one feeling, twenty seconds.", sessiz: "silent" },
  fr: { baslik: "Le Film", alt: "Tasfiye — Le Bilan d'un écrivain", izle: "Lancer le film", tekrar: "Revoir", ipucu: "50 secondes · à regarder avec le son", geri: "← berkaydogan.co", kitap: "Découvrir le livre", kisa: "Courts métrages", kisaAlt: "Trois courts de la campagne : un vers, une émotion, vingt secondes.", sessiz: "muet" },
};

/* Kampanya kısaları — dikey 9:16, tıklayınca yerinde oynar. */
const KISALAR: { id: string; ad: Record<Lang, string>; not: Record<Lang, string>; sesli: boolean }[] = [
  { id: "col", ad: { tr: "Çöl", en: "Desert", fr: "Désert" }, not: { tr: "Arzu bir çöldür.", en: "Desire is a desert.", fr: "Le désir est un désert." }, sesli: true },
  { id: "gidis", ad: { tr: "Gidiş", en: "Departure", fr: "Départ" }, not: { tr: "Herkes bir gün gider.", en: "Everyone leaves one day.", fr: "Un jour, tout le monde part." }, sesli: true },
  { id: "manifest", ad: { tr: "Manifest", en: "Manifesto", fr: "Manifeste" }, not: { tr: "Söz tutuldu.", en: "The promise was kept.", fr: "La promesse est tenue." }, sesli: false },
];

export default function FilmFragman() {
  const [lang, setLang] = useState<Lang>("tr");
  const [dikey, setDikey] = useState(false);
  const [durum, setDurum] = useState<"bekliyor" | "oynuyor" | "bitti">("bekliyor");
  const [acikKisa, setAcikKisa] = useState<string | null>(null);
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
          background: #000; box-shadow: 0 30px 90px rgba(0,0,0,.7), 0 0 70px rgba(58,91,217,.07); }
        .flm-cerceve.dikey { width: min(100%, 420px); }
        .flm-cerceve video { display: block; width: 100%; height: auto; }
        .flm-ortu { position: absolute; inset: 0; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 14px; cursor: pointer;
          background: linear-gradient(rgba(5,5,5,.25), rgba(5,5,5,.55)); border: 0; padding: 0; }
        .flm-oynat { width: 84px; height: 84px; border-radius: 50%; border: 1px solid rgba(250,250,250,.35);
          background: rgba(5,5,5,.55); backdrop-filter: blur(6px); display: grid; place-items: center;
          transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
        .flm-ortu:hover .flm-oynat { transform: scale(1.06); border-color: #3A5BD9; box-shadow: 0 0 34px rgba(58,91,217,.35); }
        .flm-oynat svg { margin-left: 5px; }
        .flm-ortu span { font-size: 14px; letter-spacing: .18em; text-transform: uppercase; color: #FAFAFA; }
        .flm-ust { text-align: center; }
        .flm-ust h1 { font-family: var(--font-serif), serif; font-weight: 420; font-size: clamp(30px, 5vw, 44px); letter-spacing: .02em; }
        .flm-ust p { margin-top: 6px; font-size: 13px; letter-spacing: .3em; text-transform: uppercase; color: #8a8a8a; }
        .flm-alt { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; justify-content: center; }
        .flm-alt a { color: #8a8a8a; font-size: 13px; letter-spacing: .08em; text-decoration: none; transition: color .2s ease; }
        .flm-alt a:hover { color: #FAFAFA; }
        .flm-alt a.koz { color: #3A5BD9; }
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

      <section className="flm-kisalar" aria-label={c.kisa}>
        <style>{`
          .flm-kisalar { width: min(100%, 1060px); margin-top: 30px; }
          .flm-kisalar h2 { font-family: var(--font-serif), serif; font-weight: 420; font-size: clamp(22px, 3.4vw, 30px); letter-spacing: .02em; }
          .flm-kisalar > p { margin-top: 4px; font-size: 12.5px; letter-spacing: .1em; color: #8a8a8a; }
          .flm-kisa-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 18px; }
          @media (max-width: 720px) { .flm-kisa-grid { grid-template-columns: 1fr; max-width: 340px; margin-inline: auto; } }
          .flm-kisa { position: relative; border-radius: 12px; overflow: hidden; background: #000; aspect-ratio: 9 / 16;
            box-shadow: 0 18px 50px rgba(0,0,0,.6); }
          .flm-kisa video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
          .flm-kisa-ortu { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center;
            justify-content: flex-end; gap: 6px; padding: 18px; cursor: pointer; border: 0; text-align: center;
            background: linear-gradient(rgba(5,5,5,.05) 40%, rgba(5,5,5,.78)); }
          .flm-kisa-ortu:hover .flm-kisa-oynat { transform: scale(1.06); border-color: #E5402A; box-shadow: 0 0 26px rgba(229,64,42,.35); }
          .flm-kisa-oynat { width: 54px; height: 54px; border-radius: 50%; border: 1px solid rgba(250,250,250,.35);
            background: rgba(5,5,5,.55); backdrop-filter: blur(6px); display: grid; place-items: center; margin-bottom: 6px;
            transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
          .flm-kisa-ad { font-family: var(--font-serif), serif; font-size: 21px; color: #FAFAFA; letter-spacing: .02em; }
          .flm-kisa-not { font-size: 11.5px; letter-spacing: .14em; text-transform: uppercase; color: #a8a8a8; }
        `}</style>
        <h2>{c.kisa}</h2>
        <p>{c.kisaAlt}</p>
        <div className="flm-kisa-grid">
          {KISALAR.map((k) => (
            <div key={k.id} className="flm-kisa">
              {acikKisa === k.id ? (
                <video
                  src={`/film/tasfiye-${k.id}-web.mp4`}
                  poster={`/film/tasfiye-${k.id}-poster.jpg`}
                  controls
                  autoPlay
                  playsInline
                  muted={!k.sesli}
                  loop={!k.sesli}
                  onEnded={() => setAcikKisa(null)}
                />
              ) : (
                <>
                  <img src={`/film/tasfiye-${k.id}-poster.jpg`} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                  <button type="button" className="flm-kisa-ortu" onClick={() => setAcikKisa(k.id)} aria-label={`${k.ad[lang]} — ${c.izle}`}>
                    <span className="flm-kisa-oynat" aria-hidden>
                      <svg width="18" height="21" viewBox="0 0 26 30" fill="none"><path d="M1 1.5v27L25 15 1 1.5Z" fill="#FAFAFA" /></svg>
                    </span>
                    <span className="flm-kisa-ad">{k.ad[lang]}</span>
                    <span className="flm-kisa-not">{k.not[lang]}{k.sesli ? "" : ` · ${c.sessiz}`}</span>
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="flm-alt">
        <Link href="/">{c.geri}</Link>
        <Link className="koz" href="/kitaplar/tasfiye">{c.kitap} →</Link>
      </div>
    </main>
  );
}
