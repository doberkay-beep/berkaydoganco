"use client";

import { BASIN, BASIN_TUR } from "@/lib/basinda";
import { NOTLAR } from "@/lib/notlar";
import { useSimdi, ayAdi } from "./CanliSimdi";
import type { Lang } from "@/lib/site";

/* ŞU AN BANDI — ana sayfada "site yaşıyor" satırı: son basın çıkışı,
   ŞİMDİ'nin canlı sayacı ve son gece notu. Hepsi kendi kaynağından;
   yeni kayıt girildikçe kendiliğinden değişir. */

const etiket: React.CSSProperties = { display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-grotesk)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" };
const metin: React.CSSProperties = { display: "block", marginTop: "0.55rem", fontSize: "0.95rem", lineHeight: 1.45, color: "var(--ink)" };

export function SuAnBandi({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const simdi = useSimdi();
  const son = BASIN[0];
  const not = NOTLAR[0];

  return (
    <section aria-label={tr ? "Şu an" : "Now"} className="sa-band">
      {son && (
        <a href={son.url} target="_blank" rel="noopener noreferrer" className="sa-hucre">
          <span style={etiket}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />{tr ? "Son çıkış" : "Latest"} · {BASIN_TUR[son.tur][lang]}</span>
          <span style={metin}>
            <strong style={{ fontWeight: 600 }}>{son.yayin}</strong>
            {son.alinti ? <> — <em className="cg-serif" lang="tr">“{son.alinti}”</em></> : <> — {son.baslik[lang]}</>}
            <span style={{ color: "var(--accent-2)" }}> ↗</span>
          </span>
        </a>
      )}
      {simdi?.ay_toplam ? (
        <a href="https://necaliyor.co/endeks" target="_blank" rel="noopener noreferrer" className="sa-hucre">
          <span style={etiket}><span className="bd-nabiz" />{tr ? "Canlı · ŞİMDİ radyo" : "Live · ŞİMDİ radio"}</span>
          <span style={metin}>
            {tr ? (
              <><strong style={{ fontWeight: 700, color: "var(--accent-2)", fontSize: "1.15rem" }}>{simdi.ay_toplam.toLocaleString("tr-TR")}</strong> şarkı {ayAdi(simdi.ay, true)} ayında Türkiye radyolarında çaldı — ŞİMDİ canlı sayıyor.</>
            ) : (
              <><strong style={{ fontWeight: 700, color: "var(--accent-2)", fontSize: "1.15rem" }}>{simdi.ay_toplam.toLocaleString("en-US")}</strong> songs played on Turkish radio in {ayAdi(simdi.ay, false)}, counted live by ŞİMDİ.</>
            )}
            <span style={{ color: "var(--accent-2)" }}> ↗</span>
          </span>
        </a>
      ) : null}
      {not && (
        <a href={`/notlar#not-${String(not.no).padStart(2, "0")}`} className="sa-hucre">
          <span style={etiket}>🌙 {tr ? "Gece vardiyası" : "Night shift"} · {tr ? "Not" : "Note"} {String(not.no).padStart(2, "0")} · {not.saat}</span>
          <span lang="tr" className="cg-serif sa-not" style={{ ...metin, fontStyle: "italic" }}>{not.metin}</span>
        </a>
      )}
    </section>
  );
}
