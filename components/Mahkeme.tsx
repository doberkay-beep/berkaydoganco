"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* Tasfiye Mahkemesi — ziyaretçi sanık koltuğuna oturur.
   5 soru → puanlama → 5 olası Hüküm (her biri kitaptan gerçek bir alıntıyla)
   → paylaşılabilir hüküm kartı (canvas PNG) + kitaba CTA.
   Bu bir suçlama değil; bir hesap. Tamamen tarayıcıda çalışır. */

type Lang = "tr" | "en" | "fr";
type VKey = "gormezden" | "karanlik" | "posa" | "sehir" | "umut";

const QUOTES: Record<VKey, { text: string; sayfa: string }> = {
  gormezden: { text: "Görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isim.", sayfa: "Arka kapaktan" },
  karanlik: { text: "Kendi karanlığını bilmeyen insan, aydınlık uğruna dünyayı ateşe vermekten çekinmez.", sayfa: "S. 79" },
  posa: { text: "Yaşamak, biraz da geride posa bırakmaktır.", sayfa: "S. 89" },
  sehir: { text: "Biz şehri terk ettiğimizde, anılarımız o şehrin taşlarına, duvarlarına emanet edilir.", sayfa: "S. 100" },
  umut: { text: "Bize ezilenlerin değil, ezenlerin tarafına geçme umudu satıldı.", sayfa: "S. 15" },
};

type Copy = {
  title: string; sub: string; sit: string; progress: (n: number) => string;
  verdictLabel: string; closing: string; note: string;
  again: string; download: string; buy: string; back: string;
  questions: { q: string; options: { t: string; w: VKey }[] }[];
  verdicts: Record<VKey, { title: string; prose: string }>;
};

const COPY: Record<Lang, Copy> = {
  tr: {
    title: "Tasfiye Mahkemesi",
    sub: "Sahnede bir mahkeme. Sanık koltuğu boş. Bu bir suçlama değil; bir hesap.",
    sit: "Sanık koltuğuna otur",
    progress: (n) => `Soru ${n} / 5`,
    verdictLabel: "Hüküm",
    closing: "Beraat yok. Hesap görüldü.",
    note: "Hüküm, Tasfiye'nin sayfalarından verildi.",
    again: "Yeniden yargılan",
    download: "Hüküm kartını indir",
    buy: "Kitabı al",
    back: "← berkaydogan.co",
    questions: [
      { q: "Mahkeme başlasın. Önce söyle: buraya neden geldin?", options: [
        { t: "Bir şeyleri görmezden geldiğim için", w: "gormezden" },
        { t: "Kendi karanlığımla tanışmak için", w: "karanlik" },
        { t: "Geride ne bıraktığımı öğrenmek için", w: "posa" },
        { t: "Bana satılan umudun hesabını sormak için", w: "umut" },
      ]},
      { q: "Gözlerini kapadığında ne görüyorsun?", options: [
        { t: "Bakmamayı seçtiğim her şeyi", w: "gormezden" },
        { t: "Terk ettiğim bir şehri", w: "sehir" },
        { t: "Aydınlık sandığım bir yangını", w: "karanlik" },
        { t: "Hâlâ inandığım bir vaadi", w: "umut" },
      ]},
      { q: "Giyotinini kim taşıyor?", options: [
        { t: "Ben — kendi elimle", w: "karanlik" },
        { t: "Görmediğimi söylediklerim", w: "gormezden" },
        { t: "Bana umut satanlar", w: "umut" },
        { t: "Geride bıraktıklarım", w: "posa" },
      ]},
      { q: "Enkazda ne buldun?", options: [
        { t: "Duvarlara emanet ettiğim anıları", w: "sehir" },
        { t: "Yaşadıkça biriken posayı", w: "posa" },
        { t: "İsim koymadığım şeyleri", w: "gormezden" },
        { t: "Karanlığımın haritasını", w: "karanlik" },
      ]},
      { q: "Temizlik neyi götürsün?", options: [
        { t: "Sahte umutları", w: "umut" },
        { t: "Dönmeyeceğim sokakları", w: "sehir" },
        { t: "Fazlalıkları — posayı", w: "posa" },
        { t: "Görmezden gelme alışkanlığımı", w: "gormezden" },
      ]},
    ],
    verdicts: {
      gormezden: { title: "Görmezden Gelen", prose: "Suçun bakmamak değil; baktığında gördüğünü bilip isim koymamak. Bu mahkeme sana ceza vermiyor — sana bir isim veriyor." },
      karanlik: { title: "Karanlığıyla Yüzleşen", prose: "İçindeki karanlığın haritasını çıkarmaya başlamışsın. Bu mahkemede bu, suç değil; ehliyet sayılır." },
      posa: { title: "Geride Posa Bırakan", prose: "Yaşadın — ve her yaşayan gibi geride bir şeyler bıraktın. Mahkeme bunu suç saymaz; yaşamanın makbuzu sayar." },
      sehir: { title: "Şehri Terk Eden", prose: "Gittin, ama anıların taşlara emanet. Bu mahkeme gidişini yargılamaz; emanetin yerini tutanağa geçirir." },
      umut: { title: "Umudu Sorgulayan", prose: "Sana satılan umudun faturasını geri getirmişsin. Mahkeme bunu kabul eder; iade, buradan başlar." },
    },
  },
  en: {
    title: "The Tasfiye Tribunal",
    sub: "A courtroom on stage. The defendant's chair is empty. This is not an accusation — it is a reckoning.",
    sit: "Take the defendant's chair",
    progress: (n) => `Question ${n} / 5`,
    verdictLabel: "Verdict",
    closing: "No acquittal. The account is settled.",
    note: "The verdict was drawn from the pages of Tasfiye (quoted in the original Turkish).",
    again: "Stand trial again",
    download: "Download the verdict card",
    buy: "Get the book",
    back: "← berkaydogan.co",
    questions: [
      { q: "Let the trial begin. First, tell us: why did you come?", options: [
        { t: "Because I chose not to see", w: "gormezden" },
        { t: "To meet my own darkness", w: "karanlik" },
        { t: "To learn what I left behind", w: "posa" },
        { t: "To question the hope I was sold", w: "umut" },
      ]},
      { q: "When you close your eyes, what do you see?", options: [
        { t: "Everything I chose not to look at", w: "gormezden" },
        { t: "A city I abandoned", w: "sehir" },
        { t: "A fire I mistook for light", w: "karanlik" },
        { t: "A promise I still believe", w: "umut" },
      ]},
      { q: "Who carries your guillotine?", options: [
        { t: "I do — with my own hands", w: "karanlik" },
        { t: "The things I claim not to see", w: "gormezden" },
        { t: "Those who sold me hope", w: "umut" },
        { t: "What I left behind", w: "posa" },
      ]},
      { q: "What did you find in the wreckage?", options: [
        { t: "Memories entrusted to walls", w: "sehir" },
        { t: "The residue life leaves", w: "posa" },
        { t: "Things I never named", w: "gormezden" },
        { t: "A map of my darkness", w: "karanlik" },
      ]},
      { q: "What should the cleansing take away?", options: [
        { t: "False hopes", w: "umut" },
        { t: "Streets I will not return to", w: "sehir" },
        { t: "The excess — the residue", w: "posa" },
        { t: "My habit of looking away", w: "gormezden" },
      ]},
    ],
    verdicts: {
      gormezden: { title: "The One Who Looked Away", prose: "The offense is not in not looking — it is in seeing and refusing to name it. This court does not sentence you; it gives you a name." },
      karanlik: { title: "The One Facing Their Darkness", prose: "You have begun mapping your own dark. In this court, that is not a crime; it is a license." },
      posa: { title: "The One Who Leaves Residue", prose: "You lived — and like all who live, you left something behind. The court does not call it guilt; it calls it the receipt of living." },
      sehir: { title: "The One Who Left the City", prose: "You left, but your memories are entrusted to the stones. This court does not judge your leaving; it records the trust." },
      umut: { title: "The One Questioning Hope", prose: "You have returned the invoice for the hope you were sold. The court accepts; the refund begins here." },
    },
  },
  fr: {
    title: "Le Tribunal de Tasfiye",
    sub: "Un tribunal sur scène. Le banc des accusés est vide. Ce n'est pas une accusation — c'est un règlement de comptes.",
    sit: "Prendre place au banc des accusés",
    progress: (n) => `Question ${n} / 5`,
    verdictLabel: "Verdict",
    closing: "Pas d'acquittement. Les comptes sont réglés.",
    note: "Le verdict est tiré des pages de Tasfiye (cité en turc, langue originale).",
    again: "Être rejugé",
    download: "Télécharger la carte du verdict",
    buy: "Acheter le livre",
    back: "← berkaydogan.co",
    questions: [
      { q: "Que le procès commence. Dis-nous d'abord : pourquoi es-tu venu ?", options: [
        { t: "Parce que j'ai choisi de ne pas voir", w: "gormezden" },
        { t: "Pour rencontrer ma propre obscurité", w: "karanlik" },
        { t: "Pour savoir ce que j'ai laissé derrière", w: "posa" },
        { t: "Pour questionner l'espoir qu'on m'a vendu", w: "umut" },
      ]},
      { q: "Quand tu fermes les yeux, que vois-tu ?", options: [
        { t: "Tout ce que j'ai choisi d'ignorer", w: "gormezden" },
        { t: "Une ville abandonnée", w: "sehir" },
        { t: "Un feu pris pour la lumière", w: "karanlik" },
        { t: "Une promesse à laquelle je crois encore", w: "umut" },
      ]},
      { q: "Qui porte ta guillotine ?", options: [
        { t: "Moi — de mes propres mains", w: "karanlik" },
        { t: "Ce que je prétends ne pas voir", w: "gormezden" },
        { t: "Ceux qui m'ont vendu l'espoir", w: "umut" },
        { t: "Ce que j'ai laissé derrière", w: "posa" },
      ]},
      { q: "Qu'as-tu trouvé dans les décombres ?", options: [
        { t: "Des souvenirs confiés aux murs", w: "sehir" },
        { t: "Le résidu que laisse la vie", w: "posa" },
        { t: "Des choses jamais nommées", w: "gormezden" },
        { t: "La carte de mon obscurité", w: "karanlik" },
      ]},
      { q: "Que doit emporter la purification ?", options: [
        { t: "Les faux espoirs", w: "umut" },
        { t: "Les rues où je ne reviendrai pas", w: "sehir" },
        { t: "L'excès — le résidu", w: "posa" },
        { t: "Mon habitude de détourner le regard", w: "gormezden" },
      ]},
    ],
    verdicts: {
      gormezden: { title: "Celui qui détourne le regard", prose: "La faute n'est pas de ne pas regarder — c'est de voir et de refuser de nommer. Ce tribunal ne te condamne pas ; il te donne un nom." },
      karanlik: { title: "Celui qui affronte son obscurité", prose: "Tu as commencé à cartographier ton propre noir. Ici, ce n'est pas un crime ; c'est un permis." },
      posa: { title: "Celui qui laisse un résidu", prose: "Tu as vécu — et comme tout vivant, tu as laissé quelque chose. Le tribunal n'y voit pas une faute ; c'est le reçu de la vie." },
      sehir: { title: "Celui qui a quitté la ville", prose: "Tu es parti, mais tes souvenirs sont confiés aux pierres. Ce tribunal ne juge pas ton départ ; il enregistre le dépôt." },
      umut: { title: "Celui qui questionne l'espoir", prose: "Tu as rapporté la facture de l'espoir qu'on t'a vendu. Le tribunal accepte ; le remboursement commence ici." },
    },
  },
};

export default function Mahkeme() {
  const [lang, setLang] = useState<Lang>("tr");
  const [stage, setStage] = useState<"giris" | number | "karar">("giris");
  const [scores, setScores] = useState<Record<VKey, number>>({ gormezden: 0, karanlik: 0, posa: 0, sehir: 0, umut: 0 });
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

  const go = (next: "giris" | number | "karar") => {
    setFade(false);
    window.setTimeout(() => { setStage(next); setFade(true); }, 260);
  };

  const answer = (w: VKey) => {
    const s = { ...scores, [w]: scores[w] + 1 };
    setScores(s);
    const q = stage as number;
    go(q >= 4 ? "karar" : q + 1);
  };

  const verdictKey = (): VKey => {
    const order: VKey[] = ["gormezden", "karanlik", "posa", "sehir", "umut"];
    return order.reduce((a, b) => (scores[b] > scores[a] ? b : a));
  };

  const reset = () => { setScores({ gormezden: 0, karanlik: 0, posa: 0, sehir: 0, umut: 0 }); go("giris"); };

  /* Hüküm kartı — 1080×1350 canvas PNG */
  const downloadKart = async () => {
    const k = verdictKey();
    const v = L.verdicts[k]; const q = QUOTES[k];
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
    ctx.fillStyle = "#9a948a";
    ctx.font = `500 26px ${grotesk}`;
    ctx.fillText("T A S F İ Y E   M A H K E M E S İ", W / 2, 120);

    ctx.fillStyle = "#E5402A";
    ctx.font = `500 24px ${grotesk}`;
    ctx.fillText(L.verdictLabel.toLocaleUpperCase(lang === "tr" ? "tr" : "en"), W / 2, 250);
    ctx.fillStyle = "#F1EDE4";
    ctx.font = `700 64px ${grotesk}`;
    // hüküm adı satır kaydırma
    const words = v.title.split(" ");
    let line = "", ty = 330; const tlines: string[] = [];
    for (const w2 of words) {
      const t = line ? line + " " + w2 : w2;
      if (ctx.measureText(t).width > W - 200 && line) { tlines.push(line); line = w2; } else line = t;
    }
    tlines.push(line);
    for (const tl of tlines) { ctx.fillText(tl, W / 2, ty); ty += 76; }

    // aksan çizgisi
    ctx.fillStyle = "#E5402A"; ctx.fillRect(W / 2 - 42, ty + 10, 84, 3);

    // alıntı
    ctx.fillStyle = "#F1EDE4";
    ctx.font = `italic 300 44px ${serif}`;
    const qwords = q.text.split(" ");
    const qlines: string[] = []; line = "";
    for (const w2 of qwords) {
      const t = line ? line + " " + w2 : w2;
      if (ctx.measureText(t).width > W - 220 && line) { qlines.push(line); line = w2; } else line = t;
    }
    qlines.push(line);
    let qy = ty + 110;
    ctx.fillText("“" + qlines[0], W / 2, qy);
    for (let i = 1; i < qlines.length; i++) { qy += 62; ctx.fillText(qlines[i] + (i === qlines.length - 1 ? "”" : ""), W / 2, qy); }
    if (qlines.length === 1) { /* tek satırsa kapanışı ekle */ ctx.fillText("”", W / 2 + ctx.measureText(qlines[0]).width / 2 + 18, qy); }
    ctx.fillStyle = "#9a948a";
    ctx.font = `500 22px ${grotesk}`;
    ctx.fillText(`Tasfiye — ${q.sayfa}`, W / 2, qy + 70);

    // mühür
    const sy = H - 260;
    ctx.strokeStyle = "rgba(241,237,228,0.8)"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(W / 2, sy, 40, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#F1EDE4"; ctx.font = `700 34px ${grotesk}`;
    ctx.textBaseline = "middle"; ctx.fillText("BD", W / 2, sy + 2); ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#E5402A"; ctx.beginPath(); ctx.arc(W / 2, sy - 40, 5.5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "#9a948a"; ctx.font = `500 24px ${grotesk}`;
    ctx.fillText("berkaydogan.co/mahkeme", W / 2, H - 150);

    const a = document.createElement("a");
    a.download = `tasfiye-mahkemesi-hukum.png`;
    a.href = c.toDataURL("image/png");
    a.click();
  };

  const k = stage === "karar" ? verdictKey() : null;

  return (
    <div className="mh-root">
      <style>{`
        .mh-root { position: fixed; inset: 0; overflow-y: auto; color: #F1EDE4;
          background: radial-gradient(120% 80% at 50% -10%, #241a13 0%, #0b0a09 50%, #060504 100%); }
        .mh-spot { position: fixed; top: -20%; left: 50%; width: 90vmin; height: 90vmin; transform: translateX(-50%);
          background: radial-gradient(closest-side, rgba(229,64,42,0.14), rgba(229,64,42,0.04) 55%, transparent 72%);
          filter: blur(8px); pointer-events: none; }
        .mh-top { position: sticky; top: 0; z-index: 3; display: flex; align-items: center; justify-content: space-between;
          padding: 1.2rem clamp(1.25rem, 4vw, 3rem); }
        .mh-title { font-family: var(--font-grotesk); font-weight: 700; letter-spacing: -0.02em; font-size: 1rem; }
        .mh-back { font-family: var(--font-grotesk); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #9a948a; border-bottom: 1px solid #E5402A; padding-bottom: 2px; }
        .mh-stage { position: relative; z-index: 2; max-width: 720px; margin: 0 auto;
          padding: clamp(2rem, 8vh, 6rem) clamp(1.25rem, 5vw, 2rem) 5rem; text-align: center;
          transition: opacity 0.26s ease, transform 0.26s ease; }
        .mh-stage[data-out="1"] { opacity: 0; transform: translateY(10px); }
        .mh-eyebrow { font-family: var(--font-grotesk); font-size: 0.68rem; font-weight: 500; letter-spacing: 0.3em;
          text-transform: uppercase; color: #E5402A; }
        .mh-h { font-family: var(--font-grotesk); font-weight: 700; font-size: clamp(2rem, 7vw, 3.6rem);
          letter-spacing: -0.04em; line-height: 1.02; margin: 1.2rem 0; }
        .mh-sub { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(1.1rem, 2.6vw, 1.4rem); line-height: 1.55; color: #c9c2b6; max-width: 34ch; margin: 0 auto; }
        .mh-q { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(1.4rem, 4vw, 2.1rem); line-height: 1.45; margin: 1.4rem 0 2.2rem; }
        .mh-opts { display: flex; flex-direction: column; gap: 0.7rem; max-width: 460px; margin: 0 auto; }
        .mh-opt { font-family: var(--font-grotesk); font-size: 0.95rem; font-weight: 500; text-align: left;
          padding: 1rem 1.3rem; border-radius: 14px; cursor: pointer; color: #F1EDE4;
          background: rgba(30,26,22,0.5); border: 1px solid rgba(241,237,228,0.14);
          -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
          transition: border-color 0.25s ease, transform 0.25s ease, background 0.25s ease; }
        .mh-opt:hover { border-color: #E5402A; transform: translateY(-2px); background: rgba(40,32,26,0.6); }
        .mh-btn { display: inline-flex; align-items: center; gap: 0.6rem; cursor: pointer;
          font-family: var(--font-grotesk); font-size: 0.8rem; font-weight: 500; letter-spacing: 0.1em;
          padding: 0.95rem 1.8rem; border-radius: 100px; border: 1px solid transparent;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .mh-fill { background: #E5402A; color: #0b0a09; }
        .mh-fill:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(229,64,42,0.35); }
        .mh-ghost { border-color: rgba(241,237,228,0.28); color: #F1EDE4; background: transparent; }
        .mh-ghost:hover { border-color: #F1EDE4; transform: translateY(-2px); }
        .mh-verdict-line { width: 84px; height: 3px; background: #E5402A; margin: 1.6rem auto; }
        .mh-quote { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(1.3rem, 3.6vw, 1.9rem); line-height: 1.5; max-width: 30ch; margin: 0 auto; }
        .mh-ctas { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-top: 2.2rem; }
        .mh-note { margin-top: 1.6rem; font-family: var(--font-grotesk); font-size: 0.66rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: #6f6a61; }
        @media (prefers-reduced-motion: reduce) { .mh-stage { transition: none; } }
      `}</style>

      <div className="mh-spot" aria-hidden="true" />
      <div className="mh-top">
        <span className="mh-title">{L.title}</span>
        <Link href="/" className="mh-back">{L.back}</Link>
      </div>

      <div className="mh-stage" data-out={fade ? "0" : "1"}>
        {stage === "giris" && (
          <>
            <span className="mh-eyebrow">Tasfiye</span>
            <h1 className="mh-h">{L.title}</h1>
            <p className="mh-sub">{L.sub}</p>
            <div style={{ marginTop: "2.4rem" }}>
              <button className="mh-btn mh-fill" onClick={() => go(0)}>{L.sit}</button>
            </div>
          </>
        )}

        {typeof stage === "number" && (
          <>
            <span className="mh-eyebrow">{L.progress(stage + 1)}</span>
            <p className="mh-q">{L.questions[stage].q}</p>
            <div className="mh-opts">
              {L.questions[stage].options.map((o) => (
                <button key={o.t} className="mh-opt" onClick={() => answer(o.w)}>{o.t}</button>
              ))}
            </div>
          </>
        )}

        {stage === "karar" && k && (
          <>
            <span className="mh-eyebrow">{L.verdictLabel}</span>
            <h2 className="mh-h">{L.verdicts[k].title}</h2>
            <p className="mh-sub">{L.verdicts[k].prose}</p>
            <div className="mh-verdict-line" aria-hidden="true" />
            <blockquote className="mh-quote">&ldquo;{QUOTES[k].text}&rdquo;</blockquote>
            <p style={{ marginTop: "0.9rem", fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#E5402A" }}>
              Tasfiye — {QUOTES[k].sayfa}
            </p>
            <p className="mh-sub" style={{ marginTop: "1.4rem", fontSize: "1rem" }}>{L.closing}</p>
            <div className="mh-ctas">
              <a href="/git/trendyol/" rel="noopener" className="mh-btn mh-fill">{L.buy} →</a>
              <button className="mh-btn mh-ghost" onClick={downloadKart}>{L.download}</button>
              <button className="mh-btn mh-ghost" onClick={reset}>{L.again}</button>
            </div>
            <p className="mh-note">{L.note}</p>
          </>
        )}
      </div>
    </div>
  );
}
