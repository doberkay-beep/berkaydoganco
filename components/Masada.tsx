import { MASADA } from "@/lib/masada";
import type { Lang } from "@/lib/site";

/* MASADA — yazılmakta olan işler; kitaplar sayfası ve Hakkımda. */
export function Masada({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  return (
    <section aria-label={tr ? "Masada" : "On the desk"} style={{ marginTop: "clamp(3rem, 7vh, 5rem)" }}>
      <span style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>
        <span className="bd-nabiz" />{tr ? "Masada · yazılıyor" : "On the desk · in progress"}
      </span>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {MASADA.map((m) => (
          <div key={m.ad} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", flexWrap: "wrap", padding: "1rem 0", borderTop: "1px dashed var(--line)" }}>
            <span>
              <span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 2.6vw, 1.6rem)", color: "var(--ink)" }}>{m.ad}</span>
              <span style={{ display: "block", marginTop: "0.2rem", fontSize: "0.82rem", color: "var(--muted)" }}>{tr ? m.tur.tr : m.tur.en}</span>
            </span>
            <span style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent-2)", border: "1px solid var(--line)", borderRadius: "100px", padding: "0.4rem 0.75rem" }}>
              {tr ? m.durum.tr : m.durum.en}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
