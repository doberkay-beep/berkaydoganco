"use client";

import { useEffect, useState } from "react";

/* ŞİMDİ'den canlı sayı — radyo sitesinin (necaliyor.co) ana_ozet satırı.
   Herkese açık okuma anahtarı (anon; RLS yalnız okumaya izin verir).
   Veri gelmezse bileşen hiç görünmez — sayfa statik kalır. */

const URL_ = "https://uiouzizblrkojmsqvbjk.supabase.co/rest/v1/ana_ozet?select=veri&id=eq.1";
const ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpb3V6aXpibHJrb2ptc3F2YmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3ODExMTQsImV4cCI6MjEwMjM1NzExNH0.rAPFD8zjD_LdGf4hnZW_asnxUS705XCxTII-RqhmZDM";

export type SimdiOzet = {
  ay?: string;
  ay_toplam?: number;
  ay_ilk5?: { artist: string; title: string; kez: number }[];
  son3saat?: { artist: string; title: string; kez: number }[];
};

const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export function ayAdi(ay: string | undefined, tr: boolean) {
  if (!ay) return "";
  return (tr ? AYLAR : MONTHS)[Number(ay.slice(5, 7)) - 1] ?? "";
}

export function useSimdi() {
  const [v, setV] = useState<SimdiOzet | null>(null);
  useEffect(() => {
    let off = false;
    const al = () =>
      fetch(URL_, { headers: { apikey: ANON, Authorization: `Bearer ${ANON}` } })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => { if (!off && d?.[0]?.veri) setV(d[0].veri as SimdiOzet); })
        .catch(() => {});
    al();
    const id = setInterval(al, 120_000);
    return () => { off = true; clearInterval(id); };
  }, []);
  return v;
}

/* Basın Odası "Rakamlarla" için canlı kutu. */
export function CanliSimdiKutu() {
  const v = useSimdi();
  if (!v?.ay_toplam) return null;
  const ilk = v.ay_ilk5?.[0];
  return (
    <a href="https://necaliyor.co/endeks" target="_blank" rel="noopener noreferrer" className="bd-kart" style={{ marginTop: "1.25rem", gap: "0.4rem" }}>
      <span style={{ display: "flex", alignItems: "center", gap: "0.55rem", fontFamily: "var(--font-grotesk)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
        <span className="bd-nabiz" /> Canlı · ŞİMDİ radyo endeksi
      </span>
      <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.2rem, 6vw, 3.4rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--accent-2)" }}>
        {v.ay_toplam.toLocaleString("tr-TR")}
      </span>
      <span style={{ fontSize: "0.95rem", color: "var(--ink)" }}>
        şarkı {ayAdi(v.ay, true)} ayında Türkiye radyolarında çaldı ve sayıldı{ilk ? <> — zirvede <strong>{ilk.artist}</strong>, “{ilk.title}”.</> : "."}
      </span>
      <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
        Berkay Doğan'ın kurduğu ŞİMDİ, Türkiye radyolarında çalan her şarkıyı 7/24 sayıyor. Sayı her birkaç dakikada tazelenir; haberde kullanırken “ŞİMDİ verisine göre” diye kaynak gösterin. ↗
      </span>
    </a>
  );
}
