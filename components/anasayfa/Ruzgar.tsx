"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// Yalnız rüzgâr: tarayıcıda üretilir, ziyaretçi açmadan çalışmaz.
export function Ruzgar({ stil }: { stil?: CSSProperties }) {
  const [acik, setAcik] = useState(false);
  const ctx = useRef<AudioContext | null>(null);
  useEffect(() => {
    const g = () => {
      if (!ctx.current) return;
      if (document.hidden) ctx.current.suspend();
      else ctx.current.resume();
    };
    document.addEventListener("visibilitychange", g);
    return () => {
      document.removeEventListener("visibilitychange", g);
      ctx.current?.close();
    };
  }, []);
  const degis = () => {
    if (acik) {
      ctx.current?.close();
      ctx.current = null;
      setAcik(false);
      return;
    }
    const c = new AudioContext();
    const n = c.sampleRate * 4;
    const b = c.createBuffer(1, n, c.sampleRate);
    const v = b.getChannelData(0);
    let s = 0;
    for (let i = 0; i < n; i++) {
      s = (s + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      v[i] = s * 3.5;
    }
    const k = c.createBufferSource();
    k.buffer = b;
    k.loop = true;
    const f = c.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 420;
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.07;
    const lg = c.createGain();
    lg.gain.value = 170;
    lfo.connect(lg);
    lg.connect(f.frequency);
    const g = c.createGain();
    g.gain.value = 0;
    g.gain.setTargetAtTime(0.1, c.currentTime, 1.6);
    k.connect(f);
    f.connect(g);
    g.connect(c.destination);
    k.start();
    lfo.start();
    ctx.current = c;
    setAcik(true);
  };
  return (
    <button
      type="button"
      onClick={degis}
      aria-pressed={acik}
      style={{ position: "fixed", zIndex: 30, right: 18, bottom: 16, background: "none", border: 0, borderBottom: "1px solid currentColor", color: "#fff", mixBlendMode: "difference", font: "inherit", fontSize: 16, padding: "2px 0", cursor: "pointer", ...stil }}
    >
      {acik ? "Rüzgârı kapat" : "Rüzgâr"}
    </button>
  );
}
