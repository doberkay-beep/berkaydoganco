"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/site";
import { site, VERSES } from "@/lib/site";

/* Alıntı kartı üretici — bir dizeyi sinematik bir kart olarak çizer (canvas),
   PNG indirir. Kart daima koyu (marka), site temasından bağımsız. */
const W = 1080, H = 1350;

export function AlintiKarti({ lang }: { lang: Lang }) {
  const c = site[lang].card;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [idx, setIdx] = useState(0);

  const draw = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const serif = getComputedStyle(document.documentElement).getPropertyValue("--font-serif").trim();
    const grotesk = getComputedStyle(document.documentElement).getPropertyValue("--font-grotesk").trim();
    const serifStack = `${serif ? serif + "," : ""} Georgia, 'Times New Roman', serif`;
    const groteskStack = `${grotesk ? grotesk + "," : ""} 'Helvetica Neue', Arial, sans-serif`;
    try { await (document as Document & { fonts?: FontFaceSet }).fonts?.ready; } catch { /* yoksay */ }

    // Zemin — sıcak, sinematik siyah + üstten köz parıltısı
    ctx.fillStyle = "#0b0a09";
    ctx.fillRect(0, 0, W, H);
    const glow = ctx.createRadialGradient(W * 0.5, H * 0.05, 40, W * 0.5, H * 0.05, W * 0.9);
    glow.addColorStop(0, "rgba(229,64,42,0.16)");
    glow.addColorStop(1, "rgba(229,64,42,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // İnce çerçeve
    ctx.strokeStyle = "rgba(241,237,228,0.10)";
    ctx.lineWidth = 2;
    ctx.strokeRect(48, 48, W - 96, H - 96);

    // Üstte köz noktası
    ctx.fillStyle = "#E5402A";
    ctx.beginPath();
    ctx.arc(W / 2, 168, 9, 0, Math.PI * 2);
    ctx.fill();

    // Dize — ortalı, serif italik, sarılı
    const verse = VERSES[idx];
    const fontPx = verse.length > 60 ? 58 : verse.length > 38 ? 68 : 80;
    ctx.fillStyle = "#F1EDE4";
    ctx.font = `italic 300 ${fontPx}px ${serifStack}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const maxW = W - 260;
    const words = verse.split(" ");
    const lines: string[] = [];
    let line = "";
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; }
      else line = test;
    }
    if (line) lines.push(line);

    const lh = fontPx * 1.32;
    const startY = H / 2 - ((lines.length - 1) * lh) / 2;
    lines.forEach((ln, i) => ctx.fillText(ln, W / 2, startY + i * lh));

    // İmza
    ctx.fillStyle = "#E5402A";
    ctx.font = `500 30px ${groteskStack}`;
    ctx.fillText("— BERKAY DOĞAN", W / 2, H - 250);

    // Alt bilgi
    ctx.fillStyle = "#8a847a";
    ctx.font = `400 26px ${groteskStack}`;
    ctx.fillText("berkaydogan.co", W / 2, H - 150);
  }, [idx]);

  useEffect(() => { draw(); }, [draw]);

  const shuffle = () => setIdx((p) => { let n = p; while (n === p && VERSES.length > 1) n = Math.floor(Math.random() * VERSES.length); return n; });

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `berkaydogan-dize-${idx + 1}.png`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  };

  return (
    <section id="card" className="cg-section" style={{ textAlign: "center" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--ink)" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />{c.label}
        </span>
        <h2 className="cg-huge" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", margin: "1.1rem 0 0.9rem" }}>{c.heading}</h2>
        <p style={{ fontSize: "1rem", color: "var(--muted)", maxWidth: "40ch", margin: "0 auto 2.25rem" }}>{c.sub}</p>

        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          aria-label={VERSES[idx]}
          style={{ width: "min(300px, 78vw)", height: "auto", borderRadius: "10px", boxShadow: "0 30px 70px rgba(0,0,0,0.4)", border: "1px solid var(--line)" }}
        />

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
          <button className="cg-btn cg-btn-ghost" onClick={shuffle}>↺ {c.random}</button>
          <button className="cg-btn cg-btn-fill" onClick={download}>↓ {c.download}</button>
        </div>
        <p style={{ marginTop: "0.9rem", fontSize: "0.68rem", color: "var(--muted)" }}>{c.hint}</p>
      </div>
    </section>
  );
}
