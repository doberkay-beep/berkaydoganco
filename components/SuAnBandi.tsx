"use client";

import { useEffect, useState } from "react";
import { BASIN, BASIN_TUR, EKRAN } from "@/lib/basinda";
import { NOTLAR } from "@/lib/notlar";
import { useSimdi, ayAdi } from "./CanliSimdi";
import type { Lang } from "@/lib/site";

/* ŞU AN BANDI — ana sayfada "site yaşıyor" satırı: son çıkış (yazılı basın
   ya da ekran, hangisi yeniyse), ŞİMDİ'nin canlı sayacı ve son gece notu.
   Hepsi kendi kaynağından; yeni kayıt girildikçe kendiliğinden değişir. */

const etiket: React.CSSProperties = { display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-grotesk)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" };
const metin: React.CSSProperties = { display: "block", marginTop: "0.55rem", fontSize: "0.95rem", lineHeight: 1.45, color: "var(--ink)" };

/* GEÇİCİ TV DUYURUSU — 16 Eki 2026 12:00 Business Channel Türk (tarih teyitli).
   Ziyaretçinin saatine göre "yarın / bugün / şu an canlı" der; 13:30'dan sonra
   kendiliğinden kaybolur ve yerine son çıkış gelir. Yayından sonra silinebilir. */
const TV = {
  gun: Date.parse("2026-10-16T00:00:00+03:00"),
  bas: Date.parse("2026-10-16T12:00:00+03:00"),
  bit: Date.parse("2026-10-16T13:30:00+03:00"),
  link: "https://www.youtube.com/live/cRcLKok_QaQ",
};
type TvDurum = "yarin" | "bugun" | "canli" | null;

function tvDurumu(simdi: number): TvDurum {
  if (simdi >= TV.bit) return null;
  if (simdi >= TV.bas) return "canli";
  if (simdi >= TV.gun) return "bugun";
  return "yarin";
}

export function SuAnBandi({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const simdi = useSimdi();
  const not = NOTLAR[0];
  const [tv, setTv] = useState<TvDurum>(null);
  useEffect(() => {
    const guncelle = () => setTv(tvDurumu(Date.now()));
    guncelle();
    const id = setInterval(guncelle, 60_000);
    return () => clearInterval(id);
  }, []);

  // Son çıkış: yazılı basın ve ekran kayıtlarından en yenisi
  const son = [
    ...BASIN.map((b) => ({
      tarihISO: b.tarihISO, url: b.url, yayin: b.yayin, rozet: BASIN_TUR[b.tur][lang],
      alinti: b.alinti, baslik: b.baslik[lang],
    })),
    ...EKRAN.map((e) => ({
      tarihISO: e.tarihISO, url: e.link, yayin: e.kanal,
      rozet: e.tur === "tv" ? "TV" : e.tur === "podcast" ? "Podcast" : "Video",
      alinti: undefined as string | undefined, baslik: e.baslik,
    })),
  ].sort((a, b) => b.tarihISO.localeCompare(a.tarihISO))[0];

  const sonIcerik = son && (
    <>
      <span style={etiket}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />{tr ? "Son çıkış" : "Latest"} · {son.rozet}</span>
      <span style={metin}>
        <strong style={{ fontWeight: 600 }}>{son.yayin}</strong>
        {son.alinti ? <> — <em className="cg-serif" lang="tr">“{son.alinti}”</em></> : <> — {son.baslik}</>}
        {son.url && <span style={{ color: "var(--accent-2)" }}> ↗</span>}
      </span>
    </>
  );

  return (
    <section aria-label={tr ? "Şu an" : "Now"} className="sa-band">
      {tv ? (
        <a href={TV.link} target="_blank" rel="noopener noreferrer" className="sa-hucre">
          <span style={etiket}>
            {tv === "canli" ? <span className="bd-nabiz" /> : <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />}
            {tv === "canli" ? (tr ? "Şu an canlı · TV" : "Live now · TV") : tv === "bugun" ? (tr ? "Bugün 12:00 · TV" : "Today 12:00 · TV") : (tr ? "Yarın 12:00 · TV" : "Tomorrow 12:00 · TV")}
          </span>
          <span style={metin}>
            <strong style={{ fontWeight: 600 }}>Business Channel Türk</strong>
            {tr ? " — Tasfiye, yazarlık ve şiir üzerine; canlı izle" : " — on Tasfiye, writing and poetry; watch live"}
            <span style={{ color: "var(--accent-2)" }}> ↗</span>
          </span>
        </a>
      ) : son ? (
        son.url ? (
          <a href={son.url} target="_blank" rel="noopener noreferrer" className="sa-hucre">{sonIcerik}</a>
        ) : (
          <div className="sa-hucre">{sonIcerik}</div>
        )
      ) : null}
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
