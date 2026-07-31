"use client";

import { useRef, useState } from "react";

type Copy = { label: string; heading: string; sub: string; placeholder: string; button: string; result: string; again: string };

export function TasfiyeDuvari({ t, fragments }: { t: Copy; fragments: string[] }) {
  const [value, setValue] = useState("");
  const [phase, setPhase] = useState<"idle" | "burning" | "done">("idle");
  const emberBox = useRef<HTMLDivElement | null>(null);
  const reduce = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const spawnEmbers = () => {
    const box = emberBox.current;
    if (!box || reduce()) return;
    const w = box.clientWidth || 320;
    for (let i = 0; i < 30; i++) {
      const e = document.createElement("span");
      e.className = "td-ember";
      const size = 2 + Math.random() * 4;
      e.style.left = `${Math.random() * w}px`;
      e.style.width = `${size}px`;
      e.style.height = `${size}px`;
      e.style.setProperty("--dx", `${(Math.random() - 0.5) * 120}px`);
      e.style.setProperty("--dur", `${0.9 + Math.random() * 1.1}s`);
      e.style.animationDelay = `${Math.random() * 0.5}s`;
      box.appendChild(e);
    }
  };

  const purge = () => {
    if (!value.trim() || phase !== "idle") return;
    setPhase("burning");
    requestAnimationFrame(spawnEmbers);
    window.setTimeout(() => setPhase("done"), reduce() ? 200 : 1700);
  };
  const reset = () => { setValue(""); setPhase("idle"); };

  return (
    <section id="tasfiye-duvari" className="td">
      <style>{`
        .td { position: relative; overflow: hidden; background: #0c0a09; color: #F0ECE4;
          padding: clamp(6rem, 16vh, 11rem) clamp(1.25rem, 4vw, 3.25rem); text-align: center; }
        .td-glow { position: absolute; left: 50%; top: 52%; width: 70vw; max-width: 760px; aspect-ratio: 1;
          transform: translate(-50%, -50%); pointer-events: none; z-index: 0;
          background: radial-gradient(circle, rgba(229,64,42,0.16), transparent 62%); animation: tdGlow 8s ease-in-out infinite; }
        @keyframes tdGlow { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }

        /* Arka planda süzülen köz parçaları (Berkay'ın dizeleri) */
        .td-frag { position: absolute; z-index: 0; font-family: var(--font-serif); font-style: italic;
          font-size: 0.95rem; color: rgba(240,236,228,0.13); white-space: nowrap; pointer-events: none;
          animation: tdFloat linear infinite; }
        @keyframes tdFloat { 0% { transform: translateY(30px); opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { transform: translateY(-120px); opacity: 0; } }

        .td-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
        .td-eyebrow { display: inline-flex; align-items: center; gap: 0.6rem; font-family: var(--font-grotesk);
          font-size: 0.7rem; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #F0ECE4; }
        .td-eyebrow::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #E5402A;
          box-shadow: 0 0 12px 2px rgba(229,64,42,0.7); }
        .td-heading { font-family: var(--font-grotesk); font-weight: 700; letter-spacing: -0.03em; line-height: 1;
          font-size: clamp(2rem, 5vw, 3.6rem); margin: 1.5rem 0 1.25rem; }
        .td-sub { font-family: var(--font-serif); font-style: italic; font-weight: 300; font-size: clamp(1.05rem, 2vw, 1.35rem);
          line-height: 1.5; color: rgba(240,236,228,0.6); max-width: 30ch; margin: 0 auto 3rem; }

        .td-stage { position: relative; }
        .td-field { position: relative; }
        .td-input { width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(240,236,228,0.25);
          color: #F0ECE4; font-family: var(--font-serif); font-style: italic; font-size: clamp(1.3rem, 3.5vw, 2.2rem);
          text-align: center; padding: 0.75rem 0.5rem 1rem; outline: none; transition: border-color 0.3s ease; }
        .td-input::placeholder { color: rgba(240,236,228,0.28); }
        .td-input:focus { border-color: #E5402A; }
        .td-field.burning { animation: tdBurn 1.5s cubic-bezier(0.4,0,0.6,1) forwards; }
        @keyframes tdBurn { 0% { opacity: 1; filter: blur(0); transform: translateY(0); }
          35% { color: #FF7A3D; text-shadow: 0 0 18px rgba(255,122,61,0.9); }
          100% { opacity: 0; filter: blur(6px); transform: translateY(-34px); } }

        .td-embers { position: absolute; left: 0; right: 0; bottom: 1.2rem; height: 0; pointer-events: none; }
        .td-ember { position: absolute; bottom: 0; border-radius: 50%; background: #FF8A3D;
          box-shadow: 0 0 8px 1px rgba(255,120,50,0.85); animation: tdRise var(--dur, 1.3s) ease-out forwards; }
        @keyframes tdRise { 0% { transform: translate(0,0) scale(1); opacity: 1; background: #FFD08A; }
          60% { background: #FF6A3D; } 100% { transform: translate(var(--dx,0), -170px) scale(0.2); opacity: 0; background: #7a1a10; } }

        .td-btn { margin-top: 2.25rem; display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer;
          font-family: var(--font-grotesk); font-size: 0.8rem; font-weight: 500; letter-spacing: 0.08em;
          padding: 0.95rem 2rem; border-radius: 100px; border: 1px solid transparent; background: #E5402A; color: #F7F1EA;
          transition: transform 0.3s ease, background 0.3s ease; }
        .td-btn:hover { transform: translateY(-2px); background: #FF5a3d; }
        .td-btn:disabled { opacity: 0.4; cursor: default; transform: none; }
        .td-btn-ghost { background: transparent; border-color: rgba(240,236,228,0.25); color: #F0ECE4; }
        .td-btn-ghost:hover { border-color: #F0ECE4; }

        .td-done { animation: tdReveal 1s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes tdReveal { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .td-result { font-family: var(--font-serif); font-style: italic; font-weight: 300;
          font-size: clamp(1.6rem, 4vw, 2.6rem); line-height: 1.35; }

        @media (prefers-reduced-motion: reduce) { .td-glow, .td-frag { animation: none; } .td-field.burning { animation: none; opacity: 0; } }
      `}</style>

      <div className="td-glow" aria-hidden="true" />
      {fragments.map((f, i) => (
        <span key={i} className="td-frag" aria-hidden="true" style={{
          left: `${6 + (i * 9.3) % 84}%`,
          top: `${18 + (i * 37) % 64}%`,
          animationDuration: `${11 + (i % 5) * 3}s`,
          animationDelay: `${(i * 1.7) % 9}s`,
        }}>{f}</span>
      ))}

      <div className="td-inner">
        <span className="td-eyebrow">{t.label}</span>
        <h2 className="td-heading">{t.heading}</h2>
        <p className="td-sub">{t.sub}</p>

        {phase !== "done" ? (
          <div className="td-stage">
            <div className={`td-field${phase === "burning" ? " burning" : ""}`}>
              <input
                className="td-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") purge(); }}
                placeholder={t.placeholder}
                maxLength={80}
                disabled={phase === "burning"}
                aria-label={t.heading}
              />
              <div className="td-embers" ref={emberBox} aria-hidden="true" />
            </div>
            <button className="td-btn" onClick={purge} disabled={!value.trim() || phase === "burning"}>
              {t.button} ↑
            </button>
          </div>
        ) : (
          <div className="td-done">
            <p className="td-result">{t.result}</p>
            <button className="td-btn td-btn-ghost" onClick={reset}>{t.again}</button>
          </div>
        )}
      </div>
    </section>
  );
}
