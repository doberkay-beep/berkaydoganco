"use client";

import { useEffect, useState } from "react";

// Tasfiye lansmanı — 25 Ağustos 2026
const DEFAULT_TARGET = "2026-08-25T00:00:00";

/**
 * Geri sayım — çerçeveli kutular. labels uzunluğu kaç birim gösterileceğini
 * belirler (3 → Gün/Saat/Dk, 4 → +Saniye). Varsayılan 30sn'de bir günceller.
 */
export function Countdown({
  labels,
  target = DEFAULT_TARGET,
  intervalMs = 30000,
}: {
  labels: readonly string[];
  target?: string;
  intervalMs?: number;
}) {
  const [vals, setVals] = useState<number[] | null>(null);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, new Date(target).getTime() - Date.now());
      setVals([
        Math.floor(diff / 86400000),
        Math.floor((diff % 86400000) / 3600000),
        Math.floor((diff % 3600000) / 60000),
        Math.floor((diff % 60000) / 1000),
      ]);
    };
    tick();
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [target, intervalMs]);

  const display = (vals ?? [0, 0, 0, 0]).slice(0, labels.length);

  return (
    <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
      {display.map((v, i) => (
        <div
          key={i}
          style={{
            minWidth: "84px",
            padding: "1rem 1.1rem 0.85rem",
            border: "1px solid var(--dim)",
            borderRadius: "2px",
            background: "var(--bg2)",
            textAlign: "center",
          }}
        >
          <div
            suppressHydrationWarning
            style={{
              fontFamily: "var(--font-grotesk)",
              fontWeight: 300,
              fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
              lineHeight: 1,
              color: "var(--cream)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {String(v).padStart(2, "0")}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--gray)",
              marginTop: "0.6rem",
            }}
          >
            {labels[i]}
          </div>
        </div>
      ))}
    </div>
  );
}
