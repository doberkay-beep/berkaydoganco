"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* Mürekkep Lekesi — Rorschach mekaniği.
   4 simetrik mürekkep lekesi (krem kâğıt üstüne koyu mürekkep, SVG),
   "ne görüyorsun?" seçimleri → sende kalan dize + sana göre kitap
   (Mürekkep ve Köz ya da Tasfiye) + paylaşılabilir kart (canvas PNG). */

type Lang = "tr" | "en" | "fr";
type RKey = "dogus" | "icedonus" | "gelecek" | "hesap" | "karanlik";

const SONUC: Record<RKey, { dize: string; kaynak: string; kitap: "murekkep" | "tasfiye" }> = {
  dogus: { dize: "Ve ben yeniden doğdum; şimdi sıra sende.", kaynak: "Mürekkep ve Köz", kitap: "murekkep" },
  icedonus: { dize: "Yeniden kendi içime dönüyorum.", kaynak: "Mürekkep ve Köz", kitap: "murekkep" },
  gelecek: { dize: "Geri dönmüyorum, geleceğime âşığım.", kaynak: "Mürekkep ve Köz", kitap: "murekkep" },
  hesap: { dize: "Bize ezilenlerin değil, ezenlerin tarafına geçme umudu satıldı.", kaynak: "Tasfiye — S. 15", kitap: "tasfiye" },
  karanlik: { dize: "Kendi karanlığını bilmeyen insan, aydınlık uğruna dünyayı ateşe vermekten çekinmez.", kaynak: "Tasfiye — S. 79", kitap: "karanlik" as never },
};
SONUC.karanlik.kitap = "tasfiye";

const KITAP = {
  murekkep: { ad: "Mürekkep ve Köz", kapak: "/murekkep-kapak-400.jpg", git: "mvk-trendyol", sayfa: "/kitaplar/murekkep-ve-koz" },
  tasfiye: { ad: "Tasfiye", kapak: "/tasfiye-kapak-400.jpg", git: "trendyol", sayfa: "/kitaplar/tasfiye" },
};

/* Simetrik lekeler: sol yarı path + ayna. */
const LEKELER: string[] = [
  "M0,20 C-14,8 -30,14 -36,30 C-42,46 -30,52 -34,66 C-38,80 -24,88 -14,82 C-4,76 -10,64 0,60 Z M-8,26 C-16,20 -22,26 -20,32 C-18,38 -8,36 -8,26 Z",
  "M0,12 C-10,2 -26,6 -28,20 C-30,34 -16,36 -20,48 C-24,60 -40,58 -38,72 C-36,86 -18,88 -10,78 C-2,68 -8,58 0,54 Z",
  "M0,16 C-18,10 -22,26 -34,26 C-46,26 -50,42 -40,50 C-30,58 -34,68 -24,74 C-14,80 -6,72 0,66 Z M-30,36 C-36,34 -38,42 -32,44 C-26,46 -24,38 -30,36 Z",
  "M0,24 C-8,10 -24,10 -30,22 C-36,34 -24,40 -28,52 C-32,64 -20,72 -12,68 C-4,64 -12,54 -4,48 C4,42 -6,36 0,24 Z M-16,18 C-22,14 -28,20 -24,26 C-20,32 -10,24 -16,18 Z",
];

type Copy = {
  title: string; sub: string; start: string; q: string; progress: (n: number, t: number) => string;
  resultLabel: string; bookLabel: string; download: string; again: string; buy: string; page: string; back: string;
  options: { t: string; w: RKey }[][];
};

const COPY: Record<Lang, Copy> = {
  tr: {
    title: "Mürekkep Lekesi",
    sub: "Dört leke. Ne gördüğünü söyle; sende kalan dizeyi söyleyelim.",
    start: "Lekelere bak",
    q: "Ne görüyorsun?",
    progress: (n, t) => `Leke ${n} / ${t}`,
    resultLabel: "Sende kalan dize",
    bookLabel: "Sana göre kitap",
    download: "Kartını indir", again: "Yeniden bak", buy: "Kitabı al", page: "Kitabın sayfası", back: "← berkaydogan.co",
    options: [
      [
        { t: "Kanatlarını yeni açan bir şey", w: "dogus" },
        { t: "Aynada birbirine bakan iki yüz", w: "icedonus" },
        { t: "Yanan bir şehir silueti", w: "hesap" },
        { t: "Gölgesinden büyüyen bir adam", w: "karanlik" },
      ],
      [
        { t: "Yola çıkmış bir gemi", w: "gelecek" },
        { t: "Kök salan bir yalnızlık", w: "icedonus" },
        { t: "Kürsüde bir yargıç", w: "hesap" },
        { t: "Küllerin ortasında bir kıvılcım", w: "dogus" },
      ],
      [
        { t: "El ele iki karanlık", w: "karanlik" },
        { t: "Ufka uzanan bir yol", w: "gelecek" },
        { t: "Kapanmayı bekleyen bir yara", w: "icedonus" },
        { t: "Terazinin ağır basan kefesi", w: "hesap" },
      ],
      [
        { t: "Kabuğunu kıran bir tohum", w: "dogus" },
        { t: "Fener tutan bir el", w: "karanlik" },
        { t: "Geleceğe atılmış bir imza", w: "gelecek" },
        { t: "İçine dönen bir sarmal", w: "icedonus" },
      ],
    ],
  },
  en: {
    title: "The Ink Blot",
    sub: "Four blots. Say what you see; we will tell you the verse that stays with you.",
    start: "Look at the blots",
    q: "What do you see?",
    progress: (n, t) => `Blot ${n} / ${t}`,
    resultLabel: "The verse that stays with you",
    bookLabel: "Your book",
    download: "Download your card", again: "Look again", buy: "Get the book", page: "Book page", back: "← berkaydogan.co",
    options: [
      [
        { t: "Something just opening its wings", w: "dogus" },
        { t: "Two faces meeting in a mirror", w: "icedonus" },
        { t: "The silhouette of a burning city", w: "hesap" },
        { t: "A man growing out of his shadow", w: "karanlik" },
      ],
      [
        { t: "A ship already under way", w: "gelecek" },
        { t: "A loneliness taking root", w: "icedonus" },
        { t: "A judge at the bench", w: "hesap" },
        { t: "A spark among the ashes", w: "dogus" },
      ],
      [
        { t: "Two darknesses holding hands", w: "karanlik" },
        { t: "A road reaching the horizon", w: "gelecek" },
        { t: "A wound waiting to close", w: "icedonus" },
        { t: "The heavier pan of the scales", w: "hesap" },
      ],
      [
        { t: "A seed breaking its shell", w: "dogus" },
        { t: "A hand holding a lantern", w: "karanlik" },
        { t: "A signature thrown at the future", w: "gelecek" },
        { t: "A spiral turning inward", w: "icedonus" },
      ],
    ],
  },
  fr: {
    title: "La Tache d'Encre",
    sub: "Quatre taches. Dis ce que tu vois ; nous te dirons le vers qui reste en toi.",
    start: "Regarder les taches",
    q: "Que vois-tu ?",
    progress: (n, t) => `Tache ${n} / ${t}`,
    resultLabel: "Le vers qui reste en toi",
    bookLabel: "Ton livre",
    download: "Télécharger ta carte", again: "Regarder encore", buy: "Acheter le livre", page: "Page du livre", back: "← berkaydogan.co",
    options: [
      [
        { t: "Quelque chose qui ouvre ses ailes", w: "dogus" },
        { t: "Deux visages dans un miroir", w: "icedonus" },
        { t: "La silhouette d'une ville en feu", w: "hesap" },
        { t: "Un homme qui pousse de son ombre", w: "karanlik" },
      ],
      [
        { t: "Un navire déjà en route", w: "gelecek" },
        { t: "Une solitude qui prend racine", w: "icedonus" },
        { t: "Un juge à la barre", w: "hesap" },
        { t: "Une étincelle parmi les cendres", w: "dogus" },
      ],
      [
        { t: "Deux obscurités main dans la main", w: "karanlik" },
        { t: "Une route vers l'horizon", w: "gelecek" },
        { t: "Une blessure qui attend de se fermer", w: "icedonus" },
        { t: "Le plateau le plus lourd de la balance", w: "hesap" },
      ],
      [
        { t: "Une graine qui brise sa coque", w: "dogus" },
        { t: "Une main qui tient une lanterne", w: "karanlik" },
        { t: "Une signature jetée vers l'avenir", w: "gelecek" },
        { t: "Une spirale tournée vers l'intérieur", w: "icedonus" },
      ],
    ],
  },
};

function Leke({ d, size = 300 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-60 0 120 100" aria-hidden="true" style={{ display: "block" }}>
      <g fill="#14110d">
        <path d={d} />
        <path d={d} transform="scale(-1,1)" />
      </g>
    </svg>
  );
}

export default function MurekkepLekesi() {
  const [lang, setLang] = useState<Lang>("tr");
  const [stage, setStage] = useState<"giris" | number | "sonuc">("giris");
  const [scores, setScores] = useState<Record<RKey, number>>({ dogus: 0, icedonus: 0, gelecek: 0, hesap: 0, karanlik: 0 });
  const [fade, setFade] = useState(true);

  useEffect(() => {
    try {
      const s = localStorage.getItem("bd-lang");
      if (s === "tr" || s === "en" || s === "fr") setLang(s);
      else {
        const n = (navigator.language || "").toLowerCase();
        setLang(n.startsWith("tr") ? "tr" : n.startsWith("fr") ? "fr" : "en");
      }
    } catch { /* yoksay */ }
  }, []);

  const L = COPY[lang];

  const go = (next: "giris" | number | "sonuc") => {
    setFade(false);
    window.setTimeout(() => { setStage(next); setFade(true); }, 240);
  };

  const answer = (w: RKey) => {
    setScores((s) => ({ ...s, [w]: s[w] + 1 }));
    const q = stage as number;
    go(q >= LEKELER.length - 1 ? "sonuc" : q + 1);
  };

  const resultKey = (): RKey => {
    const order: RKey[] = ["dogus", "icedonus", "gelecek", "hesap", "karanlik"];
    return order.reduce((a, b) => (scores[b] > scores[a] ? b : a));
  };

  const reset = () => { setScores({ dogus: 0, icedonus: 0, gelecek: 0, hesap: 0, karanlik: 0 }); go("giris"); };

  const downloadKart = async () => {
    const r = SONUC[resultKey()];
    try { await (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready; } catch { /* yoksay */ }
    const W = 1080, H = 1350;
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const serif = "Fraunces, Georgia, serif";
    const grotesk = "'Instrument Sans', 'Helvetica Neue', Arial, sans-serif";

    const bg = ctx.createRadialGradient(W / 2, -100, 80, W / 2, H * 0.5, H);
    bg.addColorStop(0, "#241a13"); bg.addColorStop(0.5, "#0b0a09"); bg.addColorStop(1, "#060504");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    ctx.textAlign = "center";
    ctx.fillStyle = "#9a948a"; ctx.font = `500 26px ${grotesk}`;
    ctx.fillText("M Ü R E K K E P   L E K E S İ", W / 2, 120);

    ctx.fillStyle = "#E5402A"; ctx.font = `500 24px ${grotesk}`;
    ctx.fillText(L.resultLabel.toLocaleUpperCase(lang === "tr" ? "tr" : "en"), W / 2, 320);

    ctx.fillStyle = "#F1EDE4"; ctx.font = `italic 300 52px ${serif}`;
    const words = r.dize.split(" ");
    const lines: string[] = []; let line = "";
    for (const w2 of words) {
      const t = line ? line + " " + w2 : w2;
      if (ctx.measureText(t).width > W - 200 && line) { lines.push(line); line = w2; } else line = t;
    }
    lines.push(line);
    let y = 430;
    lines.forEach((l, i) => {
      const txt = (i === 0 ? "“" : "") + l + (i === lines.length - 1 ? "”" : "");
      ctx.fillText(txt, W / 2, y); y += 72;
    });

    ctx.fillStyle = "#9a948a"; ctx.font = `500 22px ${grotesk}`;
    ctx.fillText(r.kaynak, W / 2, y + 24);

    ctx.fillStyle = "#E5402A"; ctx.fillRect(W / 2 - 42, y + 70, 84, 3);

    const sy = H - 260;
    ctx.strokeStyle = "rgba(241,237,228,0.8)"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(W / 2, sy, 40, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#F1EDE4"; ctx.font = `700 34px ${grotesk}`;
    ctx.textBaseline = "middle"; ctx.fillText("BD", W / 2, sy + 2); ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#E5402A"; ctx.beginPath(); ctx.arc(W / 2, sy - 40, 5.5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "#9a948a"; ctx.font = `500 24px ${grotesk}`;
    ctx.fillText("berkaydogan.co/leke", W / 2, H - 150);

    const a = document.createElement("a");
    a.download = "murekkep-lekesi-dize.png";
    a.href = c.toDataURL("image/png");
    a.click();
  };

  const r = stage === "sonuc" ? SONUC[resultKey()] : null;
  const kitap = r ? KITAP[r.kitap] : null;

  return (
    <div className="lk-root">
      <style>{`
        .lk-root { position: fixed; inset: 0; overflow-y: auto; color: #F1EDE4;
          background: radial-gradient(120% 80% at 50% -10%, #221a14 0%, #0b0a09 50%, #060504 100%); }
        .lk-top { position: sticky; top: 0; z-index: 3; display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem clamp(1.25rem, 4vw, 3rem); }
        .lk-title { font-family: var(--font-grotesk); font-weight: 700; letter-spacing: -0.02em; font-size: 1rem; }
        .lk-back { font-family: var(--font-grotesk); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #9a948a; border-bottom: 1px solid #E5402A; padding-bottom: 2px; }
        .lk-stage { position: relative; z-index: 2; max-width: 760px; margin: 0 auto; text-align: center;
          padding: clamp(1.5rem, 5vh, 4rem) clamp(1.25rem, 5vw, 2rem) 5rem;
          transition: opacity 0.24s ease, transform 0.24s ease; }
        .lk-stage[data-out="1"] { opacity: 0; transform: translateY(10px); }
        .lk-eyebrow { font-family: var(--font-grotesk); font-size: 0.68rem; font-weight: 500; letter-spacing: 0.3em;
          text-transform: uppercase; color: #E5402A; }
        .lk-h { font-family: var(--font-grotesk); font-weight: 700; font-size: clamp(2rem, 7vw, 3.6rem);
          letter-spacing: -0.04em; line-height: 1.02; margin: 1.2rem 0; }
        .lk-sub { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(1.1rem, 2.6vw, 1.4rem); line-height: 1.55; color: #c9c2b6; max-width: 34ch; margin: 0 auto; }
        .lk-paper { width: min(340px, 78vw); margin: 1.6rem auto; background: #F0ECE4; border-radius: 6px;
          padding: 1.4rem; box-shadow: 0 34px 70px rgba(0,0,0,0.55), inset 0 0 60px rgba(20,17,13,0.06);
          animation: lkIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .lk-paper svg { width: 100%; height: auto; }
        @keyframes lkIn { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: none; } }
        .lk-q { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(1.2rem, 3vw, 1.6rem); margin: 0.6rem 0 1.4rem; }
        .lk-opts { display: flex; flex-direction: column; gap: 0.65rem; max-width: 440px; margin: 0 auto; }
        .lk-opt { font-family: var(--font-grotesk); font-size: 0.93rem; font-weight: 500; text-align: left;
          padding: 0.95rem 1.25rem; border-radius: 14px; cursor: pointer; color: #F1EDE4;
          background: rgba(30,26,22,0.5); border: 1px solid rgba(241,237,228,0.14);
          -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
          transition: border-color 0.25s ease, transform 0.25s ease, background 0.25s ease; }
        .lk-opt:hover { border-color: #E5402A; transform: translateY(-2px); background: rgba(40,32,26,0.6); }
        .lk-btn { display: inline-flex; align-items: center; gap: 0.6rem; cursor: pointer;
          font-family: var(--font-grotesk); font-size: 0.8rem; font-weight: 500; letter-spacing: 0.1em;
          padding: 0.95rem 1.8rem; border-radius: 100px; border: 1px solid transparent; text-decoration: none;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .lk-fill { background: #E5402A; color: #0b0a09; }
        .lk-fill:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(229,64,42,0.35); }
        .lk-ghost { border-color: rgba(241,237,228,0.28); color: #F1EDE4; background: transparent; }
        .lk-ghost:hover { border-color: #F1EDE4; transform: translateY(-2px); }
        .lk-dize { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(1.5rem, 4.4vw, 2.4rem); line-height: 1.4; max-width: 26ch; margin: 1.4rem auto 0.8rem; }
        .lk-book { display: inline-flex; align-items: center; gap: 1.1rem; margin-top: 1.8rem; padding: 1rem 1.4rem;
          border-radius: 16px; background: rgba(30,26,22,0.5); border: 1px solid rgba(241,237,228,0.14);
          -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); }
        .lk-book img { width: 64px; border-radius: 3px; box-shadow: 0 14px 30px rgba(0,0,0,0.5); display: block; }
        .lk-ctas { display: flex; gap: 0.7rem; justify-content: center; flex-wrap: wrap; margin-top: 1.9rem; }
        @media (prefers-reduced-motion: reduce) { .lk-stage { transition: none; } .lk-paper { animation: none; } }
      `}</style>

      <div className="lk-top">
        <span className="lk-title">{L.title}</span>
        <Link href="/" className="lk-back">{L.back}</Link>
      </div>

      <div className="lk-stage" data-out={fade ? "0" : "1"}>
        {stage === "giris" && (
          <>
            <span className="lk-eyebrow">Rorschach</span>
            <h1 className="lk-h">{L.title}</h1>
            <p className="lk-sub">{L.sub}</p>
            <div className="lk-paper"><Leke d={LEKELER[0]} /></div>
            <button className="lk-btn lk-fill" onClick={() => go(0)}>{L.start}</button>
          </>
        )}

        {typeof stage === "number" && (
          <>
            <span className="lk-eyebrow">{L.progress(stage + 1, LEKELER.length)}</span>
            <div className="lk-paper"><Leke d={LEKELER[stage]} /></div>
            <p className="lk-q">{L.q}</p>
            <div className="lk-opts">
              {L.options[stage].map((o) => (
                <button key={o.t} className="lk-opt" onClick={() => answer(o.w)}>{o.t}</button>
              ))}
            </div>
          </>
        )}

        {stage === "sonuc" && r && kitap && (
          <>
            <span className="lk-eyebrow">{L.resultLabel}</span>
            <blockquote className="lk-dize">&ldquo;{r.dize}&rdquo;</blockquote>
            <p style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#E5402A" }}>{r.kaynak}</p>
            <div className="lk-book">
              <img src={kitap.kapak} alt={kitap.ad} />
              <span style={{ textAlign: "left" }}>
                <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9a948a" }}>{L.bookLabel}</span>
                <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.15rem", marginTop: "0.25rem" }}>{kitap.ad}</span>
              </span>
            </div>
            <div className="lk-ctas">
              <a href={`/git/${kitap.git}/`} rel="noopener" className="lk-btn lk-fill">{L.buy} →</a>
              <Link href={kitap.sayfa} className="lk-btn lk-ghost">{L.page}</Link>
              <button className="lk-btn lk-ghost" onClick={downloadKart}>{L.download}</button>
              <button className="lk-btn lk-ghost" onClick={reset}>{L.again}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
