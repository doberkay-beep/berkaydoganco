"use client";

import { useState } from "react";

/* Söz sayfası aksiyonları — kartı indir (canvas PNG) + kopyala. */
export function SozAksiyon({ soz, kaynak }: { soz: string; kaynak: string }) {
  const [kopyalandi, setKopyalandi] = useState(false);

  const kopyala = async () => {
    try {
      await navigator.clipboard.writeText(`"${soz}"\n— Berkay Doğan, ${kaynak}\nberkaydogan.co`);
      setKopyalandi(true);
      window.setTimeout(() => setKopyalandi(false), 1800);
    } catch { /* yoksay */ }
  };

  const indir = async (H = 1350, ek = "") => {
    try { await (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready; } catch { /* yoksay */ }
    const W = 1080;
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const serif = "Fraunces, Georgia, serif";
    const grotesk = "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif";

    const bg = ctx.createRadialGradient(W / 2, -100, 80, W / 2, H * 0.5, H);
    bg.addColorStop(0, "#241a13"); bg.addColorStop(0.5, "#0b0a09"); bg.addColorStop(1, "#060504");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    ctx.textAlign = "center";
    ctx.fillStyle = "#E5402A"; ctx.fillRect(W / 2 - 42, 170, 84, 3);

    ctx.fillStyle = "#F1EDE4";
    let boy = 56;
    if (soz.length > 90) boy = 44;
    if (soz.length > 140) boy = 38;
    ctx.font = `italic 300 ${boy}px ${serif}`;
    const kelimeler = soz.split(" ");
    const satirlar: string[] = []; let satir = "";
    for (const w of kelimeler) {
      const t = satir ? satir + " " + w : w;
      if (ctx.measureText(t).width > W - 180 && satir) { satirlar.push(satir); satir = w; } else satir = t;
    }
    satirlar.push(satir);
    const lh = boy * 1.45;
    let y = H / 2 - (satirlar.length - 1) * lh / 2 - 40;
    satirlar.forEach((l, i) => {
      const txt = (i === 0 ? "“" : "") + l + (i === satirlar.length - 1 ? "”" : "");
      ctx.fillText(txt, W / 2, y); y += lh;
    });

    ctx.fillStyle = "#E5402A"; ctx.font = `500 26px ${grotesk}`;
    ctx.fillText("— BERKAY DOĞAN", W / 2, y + 40);
    ctx.fillStyle = "#9a948a"; ctx.font = `500 22px ${grotesk}`;
    ctx.fillText(kaynak, W / 2, y + 84);

    const sy = H - 220;
    ctx.strokeStyle = "rgba(241,237,228,0.8)"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(W / 2, sy, 38, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#F1EDE4"; ctx.font = `700 32px ${grotesk}`;
    ctx.textBaseline = "middle"; ctx.fillText("BD", W / 2, sy + 2); ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#E5402A"; ctx.beginPath(); ctx.arc(W / 2, sy - 38, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#9a948a"; ctx.font = `500 22px ${grotesk}`;
    ctx.fillText("berkaydogan.co", W / 2, H - 130);

    const a = document.createElement("a");
    a.download = `berkay-dogan-soz${ek}.png`;
    a.href = c.toDataURL("image/png");
    a.click();
  };

  const stil: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer",
    fontFamily: "var(--font-grotesk)", fontSize: "0.76rem", fontWeight: 500, letterSpacing: "0.08em",
    padding: "0.85rem 1.5rem", borderRadius: "100px",
  };

  return (
    <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
      <button onClick={() => indir()} style={{ ...stil, background: "var(--accent)", color: "var(--accent-ink)", border: "1px solid transparent" }}>
        Kartı indir
      </button>
      <button onClick={() => indir(1920, "-story")} style={{ ...stil, background: "transparent", color: "var(--ink)", border: "1px solid var(--line)" }}>
        Story indir
      </button>
      <button onClick={kopyala} style={{ ...stil, background: "transparent", color: "var(--ink)", border: "1px solid var(--line)" }}>
        {kopyalandi ? "Kopyalandı ✓" : "Kopyala"}
      </button>
    </div>
  );
}
