"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* coverby. deneme sayfası. Kapak bir <canvas>'a çizilir; önizleme ile indirilen PNG aynı çizimdir.
   Fotoğraf tarayıcıda kalır, hiçbir yere yüklenmez. Defter isteği e-posta (mailto) ile gelir. */

const SIYAH = "#0E0D0C";
const KREM = "#F2EEE6";
const KIZIL = "#E5382C";
const GRI = "#8C877E";
const W = 1000;
const H = 1420; // A5 oranı (14,8 × 21)

type Kalip = "krem" | "gece" | "foto" | "serit";
const KALIPLAR: { id: Kalip; ad: string }[] = [
  { id: "krem", ad: "Krem" },
  { id: "gece", ad: "Gece" },
  { id: "foto", ad: "Fotoğraf" },
  { id: "serit", ad: "Şerit" },
];
const VARSAYILAN_FOTO = "/images/moda-iskele.jpg";

type Kapak = { no: string; baslik: string; yer: string; kalip: Kalip };

function satirlara(ctx: CanvasRenderingContext2D, metin: string, genislik: number): string[] {
  const sonuc: string[] = [];
  for (const parca of metin.split("\n")) {
    let satir = "";
    for (const kelime of parca.split(/\s+/).filter(Boolean)) {
      const dene = satir ? satir + " " + kelime : kelime;
      if (ctx.measureText(dene).width > genislik && satir) {
        sonuc.push(satir);
        satir = kelime;
      } else satir = dene;
    }
    if (satir) sonuc.push(satir);
  }
  return sonuc.length ? sonuc : [""];
}

function aralikli(ctx: CanvasRenderingContext2D, metin: string, x: number, y: number, aralik: number, hiza: "sol" | "orta") {
  const harfler = [...metin];
  const toplam = harfler.reduce((t, h) => t + ctx.measureText(h).width, 0) + aralik * (harfler.length - 1);
  let cx = hiza === "orta" ? x - toplam / 2 : x;
  ctx.textAlign = "left";
  for (const h of harfler) {
    ctx.fillText(h, cx, y);
    cx += ctx.measureText(h).width + aralik;
  }
}

function griFoto(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number, kontrast = 1.08) {
  const oran = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const sw = w / oran, sh = h / oran;
  const sx = (img.naturalWidth - sw) / 2, sy = (img.naturalHeight - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  const veri = ctx.getImageData(x, y, w, h);
  const d = veri.data;
  for (let i = 0; i < d.length; i += 4) {
    let g = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    g = Math.max(0, Math.min(255, (g - 128) * kontrast + 128));
    d[i] = d[i + 1] = d[i + 2] = g;
  }
  ctx.putImageData(veri, x, y);
}

function ciz(ctx: CanvasRenderingContext2D, k: Kapak, img: HTMLImageElement | null, serif: string, grotesk: string) {
  const no = `BÖLÜM ${k.no.trim() || "1"}`.toLocaleUpperCase("tr");
  const baslik = k.baslik.trim() || "Başlıksız";
  const yer = k.yer.trim();
  ctx.save();
  ctx.clearRect(0, 0, W, H);
  ctx.textBaseline = "alphabetic";

  const imza = (renk: string) => {
    ctx.font = `500 44px ${serif}`;
    const a = ctx.measureText("cover").width, b = ctx.measureText("by.").width;
    const x = (W - a - b) / 2;
    ctx.textAlign = "left";
    ctx.fillStyle = renk; ctx.fillText("cover", x, H - 70);
    ctx.fillStyle = KIZIL; ctx.fillText("by.", x + a, H - 70);
  };
  const etiket = (renk: string, x: number, y: number, hiza: "sol" | "orta") => {
    ctx.font = `500 30px ${grotesk}`;
    ctx.fillStyle = renk;
    aralikli(ctx, no, x, y, 9, hiza);
  };

  if (k.kalip === "krem") {
    ctx.fillStyle = KREM; ctx.fillRect(0, 0, W, H);
    etiket(SIYAH, 110, 160, "sol");
    ctx.fillStyle = KIZIL; ctx.fillRect(110, 215, 110, 6);
    ctx.font = `500 140px ${serif}`;
    ctx.fillStyle = SIYAH; ctx.textAlign = "left";
    const s = satirlara(ctx, baslik, W - 220).slice(0, 4);
    s.forEach((l, i) => ctx.fillText(l, 106, 400 + i * 146));
    if (yer) { ctx.font = `italic 400 50px ${serif}`; ctx.fillText(yer, 110, 400 + s.length * 146 + 20); }
    ctx.fillStyle = KIZIL; ctx.beginPath(); ctx.arc(780, 1050, 100, 0, Math.PI * 2); ctx.fill();
    imza(SIYAH);
  } else if (k.kalip === "gece") {
    ctx.fillStyle = SIYAH; ctx.fillRect(0, 0, W, H);
    etiket(GRI, W / 2, 160, "orta");
    ctx.font = `500 150px ${serif}`;
    ctx.fillStyle = KREM; ctx.textAlign = "center";
    const s = satirlara(ctx, baslik, W - 160).slice(0, 3);
    s.forEach((l, i) => ctx.fillText(l, W / 2, 370 + i * 150));
    if (yer) { ctx.font = `italic 400 46px ${serif}`; ctx.fillStyle = GRI; ctx.fillText(yer, W / 2, 370 + s.length * 150 + 10); }
    const cy = 1010;
    [[330, 0.16], [225, 0.3], [125, 0.55]].forEach(([r, a]) => {
      ctx.strokeStyle = `rgba(242,238,230,${a})`; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(W / 2, cy, r, 0, Math.PI * 2); ctx.stroke();
    });
    ctx.fillStyle = KIZIL; ctx.beginPath(); ctx.arc(W / 2, cy, 40, 0, Math.PI * 2); ctx.fill();
    imza(KREM);
  } else if (k.kalip === "foto") {
    ctx.fillStyle = SIYAH; ctx.fillRect(0, 0, W, H);
    if (img) griFoto(ctx, img, 0, 0, W, H, 1.1);
    const g = ctx.createLinearGradient(0, H * 0.25, 0, H * 0.88);
    g.addColorStop(0, "rgba(14,13,12,0)"); g.addColorStop(1, "rgba(14,13,12,0.93)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.font = `500 140px ${serif}`;
    const s = satirlara(ctx, baslik, W - 180).slice(0, 3);
    let y = H - 230 - (yer ? 80 : 0);
    if (yer) { ctx.font = `italic 400 50px ${serif}`; ctx.fillStyle = KREM; ctx.textAlign = "left"; ctx.fillText(yer, 90, y + 80); }
    ctx.font = `500 140px ${serif}`; ctx.fillStyle = KREM; ctx.textAlign = "left";
    for (let i = s.length - 1; i >= 0; i--) { ctx.fillText(s[i], 86, y); y -= 142; }
    etiket(KREM, 90, y - 10, "sol");
    imza(KREM);
  } else {
    ctx.fillStyle = KREM; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = KIZIL; ctx.fillRect(0, 0, W, 32);
    etiket(SIYAH, 110, 160, "sol");
    if (img) griFoto(ctx, img, 110, 230, W - 220, 560, 1.15);
    else { ctx.fillStyle = SIYAH; ctx.fillRect(110, 230, W - 220, 560); }
    ctx.font = `500 120px ${serif}`; ctx.fillStyle = SIYAH; ctx.textAlign = "left";
    const s = satirlara(ctx, baslik, W - 220).slice(0, 2);
    s.forEach((l, i) => ctx.fillText(l, 106, 950 + i * 124));
    if (yer) { ctx.font = `italic 400 48px ${serif}`; ctx.fillText(yer, 110, 950 + s.length * 124 + 4); }
    imza(SIYAH);
  }
  ctx.restore();
}

export function CoverbySayfa({ serif, grotesk }: { serif: string; grotesk: string }) {
  const [k, setK] = useState<Kapak>({ no: "7", baslik: "Karaköy'de Bir Kış", yer: "İstanbul, Kasım 2026", kalip: "krem" });
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [kendiFoto, setKendiFoto] = useState(false);
  const [hazir, setHazir] = useState(false);
  const tuval = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let iptal = false;
    Promise.all([
      document.fonts.load(`500 100px ${serif}`, "Bölüm Şİ"),
      document.fonts.load(`italic 400 50px ${serif}`, "Şİ"),
      document.fonts.load(`500 30px ${grotesk}`, "BÖLÜM"),
    ]).finally(() => { if (!iptal) setHazir(true); });
    const v = new Image();
    v.onload = () => { if (!iptal) setImg((m) => m ?? v); };
    v.src = VARSAYILAN_FOTO;
    return () => { iptal = true; };
  }, [serif, grotesk]);

  useEffect(() => {
    const c = tuval.current;
    const ctx = c?.getContext("2d", { willReadFrequently: true });
    if (c && ctx) ciz(ctx, k, img, serif, grotesk);
  }, [k, img, serif, grotesk, hazir]);

  const fotoSec = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    const yeni = new Image();
    yeni.onload = () => { setImg(yeni); setKendiFoto(true); if (k.kalip === "krem" || k.kalip === "gece") setK({ ...k, kalip: "foto" }); };
    yeni.src = url;
  };

  const indir = () => {
    const c = tuval.current;
    if (!c) return;
    const a = document.createElement("a");
    const ad = (k.baslik.trim() || "kapak").toLocaleLowerCase("tr").replace(/[^a-z0-9çğıöşü]+/gi, "-").replace(/^-|-$/g, "");
    a.download = `coverby-bolum-${k.no.trim() || "1"}-${ad}.png`;
    a.href = c.toDataURL("image/png");
    a.click();
  };

  const kalipAdi = KALIPLAR.find((x) => x.id === k.kalip)?.ad ?? "";
  const mektup =
    `Merhaba,\n\ncoverby. ile çizdiğim kapakla bir defter istiyorum.\n\n` +
    `Bölüm: ${k.no}\nBaşlık: ${k.baslik}\nYer · zaman: ${k.yer}\nKalıp: ${kalipAdi}\n` +
    (kendiFoto ? `Fotoğraf: kendi fotoğrafım (indirdiğim kapağı bu e-postaya ekliyorum)\n` : "") +
    `\nŞehrim: \n`;
  const mailto = `mailto:hello@berkaydogan.co?subject=${encodeURIComponent(`coverby. defter isteği · Bölüm ${k.no}: ${k.baslik}`)}&body=${encodeURIComponent(mektup)}`;

  const yazi: React.CSSProperties = { fontFamily: grotesk };
  const bas: React.CSSProperties = { fontFamily: serif, fontWeight: 500 };
  const etiket: React.CSSProperties = { fontFamily: grotesk, fontSize: 12, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: GRI };
  const girdi: React.CSSProperties = { width: "100%", background: "transparent", border: 0, borderBottom: "1px solid #3a3734", color: KREM, fontFamily: serif, fontSize: 24, padding: "8px 0 10px", outline: "none", borderRadius: 0 };

  return (
    <main className="cb-sayfa" style={{ background: "#141312", color: KREM, minHeight: "100vh", ...yazi }}>
      <style>{`
        .cb-sayfa .cb-dugme{display:block;width:100%;text-align:center;padding:16px 20px !important;border-radius:999px !important;font-family:${grotesk} !important;font-weight:600;font-size:16px;background:${KREM} !important;color:${SIYAH} !important;border:0 !important;cursor:pointer;text-decoration:none !important;margin:0 !important}
        .cb-sayfa .cb-dugme.cb-dolu{background:${KIZIL} !important;color:#fff !important}
        .cb-sayfa .cb-dugme:hover{opacity:.9}
        .cb-sayfa .cb-kalip{padding:10px 18px !important;border-radius:999px !important;border:1.5px solid #3a3734 !important;background:transparent !important;color:${KREM} !important;font-family:${grotesk} !important;font-size:15px;cursor:pointer;margin:0 !important}
        .cb-sayfa .cb-kalip.cb-secili{border-color:${KIZIL} !important;background:rgba(229,56,44,.12) !important}
        .cb-sayfa canvas{border-radius:2px 6px 6px 2px}
        .cb-sayfa input::placeholder{color:#5a5651}
        .cb-sayfa .cb-etiket{text-transform:uppercase !important;letter-spacing:.2em !important;font-size:12px !important}
        @media (max-width: 760px){ .cb-sayfa .cb-onizleme{order:-1} .cb-sayfa .cb-onizleme canvas{width:min(100%,300px) !important} }
      `}</style>
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "clamp(3rem,9vh,6rem) clamp(1.25rem,5vw,3rem) 2rem" }}>
        <div className="cb-etiket" style={etiket}>by. atölyesi · deneme</div>
        <h1 style={{ ...bas, fontSize: "clamp(3.6rem,11vw,7.5rem)", lineHeight: 1, letterSpacing: "-0.02em", margin: "18px 0 10px" }}>
          coverby<span style={{ color: KIZIL }}>.</span>
        </h1>
        <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(1.4rem,3.4vw,2.1rem)", color: "#d6d0c4", margin: 0 }}>Hayatının her bölümüne bir kapak.</p>
        <p style={{ maxWidth: 620, fontSize: 17, lineHeight: 1.6, color: "#bdb7ab", marginTop: 26 }}>
          İnsan hayatını bölüm bölüm yaşar ama hiçbir bölümün kapağı olmaz. Bir şehir, bir iş, bir ayrılık, bir başlangıç: o döneme bir ad koy, kapağını çizelim. İstersen o kapakla boş bir defter iste; o bölümü sen yaz.
        </p>
      </section>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "1rem clamp(1.25rem,5vw,3rem) 4rem", display: "flex", flexWrap: "wrap", gap: "clamp(2rem,5vw,4rem)", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 340px", maxWidth: 460, display: "flex", flexDirection: "column", gap: 22 }}>
          <label><div className="cb-etiket" style={etiket}>Bölüm</div>
            <input style={girdi} inputMode="numeric" maxLength={3} value={k.no} onChange={(e) => setK({ ...k, no: e.target.value })} /></label>
          <label><div className="cb-etiket" style={etiket}>Başlık</div>
            <input style={girdi} maxLength={40} value={k.baslik} onChange={(e) => setK({ ...k, baslik: e.target.value })} /></label>
          <label><div className="cb-etiket" style={etiket}>Yer · zaman</div>
            <input style={girdi} maxLength={40} value={k.yer} onChange={(e) => setK({ ...k, yer: e.target.value })} /></label>

          <div>
            <div className="cb-etiket" style={{ ...etiket, marginBottom: 12 }}>Kalıp</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {KALIPLAR.map((x) => (
                <button key={x.id} onClick={() => setK({ ...k, kalip: x.id })} className={k.kalip === x.id ? "cb-kalip cb-secili" : "cb-kalip"} aria-pressed={k.kalip === x.id}>
                  {x.ad}
                </button>
              ))}
            </div>
          </div>

          <label style={{ cursor: "pointer" }}>
            <div className="cb-etiket" style={etiket}>Fotoğraf (isteğe bağlı)</div>
            <div style={{ marginTop: 10, fontSize: 15, color: "#bdb7ab", borderBottom: "1px solid #3a3734", padding: "8px 0 12px" }}>
              {kendiFoto ? "Fotoğrafın eklendi · değiştir" : "Fotoğraf seç (Fotoğraf ve Şerit kalıplarında görünür)"}
            </div>
            <input type="file" accept="image/*" onChange={fotoSec} style={{ display: "none" }} />
          </label>
          <p style={{ fontSize: 13, color: GRI, margin: 0, lineHeight: 1.5 }}>Fotoğrafın ve yazdıkların tarayıcında kalır; hiçbir yere yüklenmez.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
            <button className="cb-dugme" onClick={indir}>Kapağı indir</button>
            <a className="cb-dugme cb-dolu" href={mailto}>Bu kapakla defter iste</a>
          </div>
          <p style={{ fontSize: 13.5, color: GRI, margin: 0, lineHeight: 1.55 }}>
            Deneme dönemi: henüz ödeme alınmıyor. Defter isteğin bize e-postayla gelir; ilk defterler basıma hazır olduğunda fiyat ve teslim süresiyle sana yazarız.
          </p>
        </div>

        <div className="cb-onizleme" style={{ flex: "1 1 320px", display: "flex", justifyContent: "center" }}>
          <canvas ref={tuval} width={W} height={H} aria-label={`Kapak önizlemesi: Bölüm ${k.no}, ${k.baslik}`}
            style={{ width: "min(100%, 440px)", height: "auto", aspectRatio: `${W} / ${H}`, boxShadow: "0 30px 70px rgba(0,0,0,.55)", background: KREM }} />
        </div>
      </section>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "1rem clamp(1.25rem,5vw,3rem) 5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 28 }}>
        {[
          ["Ad koy.", "Bölüm numarası, bir başlık, yer ve zaman. Kapakta hep aynı üç renk: krem, siyah, tek kızıl."],
          ["Kapağın.", "İndir, paylaş, telefonuna duvar kâğıdı yap. Kapak senin."],
          ["Defterin.", "A5, sert kapak, içi boş ve noktalı. Kapak bir kez, defter tek tek basılır; stok yok."],
        ].map(([b, s]) => (
          <div key={b} style={{ borderTop: `2px solid ${KIZIL}`, paddingTop: 14 }}>
            <div style={{ ...bas, fontSize: 26, marginBottom: 6 }}>{b}</div>
            <div style={{ fontSize: 15.5, lineHeight: 1.55, color: "#bdb7ab" }}>{s}</div>
          </div>
        ))}
      </section>

      <footer style={{ textAlign: "center", padding: "0 0 4rem", fontSize: 14, color: GRI }}>
        <Link href="/by" style={{ color: KREM, textDecoration: "none" }}>by. atölyesinin bir işi</Link>
      </footer>
    </main>
  );
}
