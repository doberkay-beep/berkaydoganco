"use client";

import { type Etkinlik, TUR_ADI, ayrilmis, icsUret } from "@/lib/etkinlikler";
import s from "@/components/anasayfa/noir.module.css";

/* Sahne listesi (yazar-noir). Etkinlik yoksa boş durum app/sahne/page.tsx'te.
   Takvime ekle düğmesi istemcide .ics üretir (statik sitede sunucu yok). */

const AY = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

function tarihYaz(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const saat = iso.includes("T") ? ` · ${iso.slice(11, 16)}` : "";
  return `${d} ${AY[m - 1]} ${y}${saat}`;
}

function indirIcs(e: Etkinlik) {
  const blob = new Blob([icsUret(e)], { type: "text/calendar" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "berkay-dogan-etkinlik.ics";
  a.click();
  URL.revokeObjectURL(a.href);
}

function Liste({ baslik, no, liste, gecmis }: { baslik: string; no: string; liste: Etkinlik[]; gecmis?: boolean }) {
  return (
    <div className={s.dizinGrup}>
      <h2 className={s.dizinGrupAd}><span>{no}</span> {baslik}</h2>
      <ul style={gecmis ? { opacity: 0.7 } : undefined}>
        {liste.map((e) => (
          <li key={e.tarihISO + e.baslik}>
            <div className={s.satir}>
              <time dateTime={e.tarihISO} className={s.satirTarih}>{tarihYaz(e.tarihISO)}</time>
              <span className={s.satirAd}>
                {e.baslik}
                <span>
                  {e.mekan} · {e.sehir}{e.not ? ` · ${e.not}` : ""}
                </span>
                {!gecmis && (
                  <span className={s.sahneIslem}>
                    <button type="button" onClick={() => indirIcs(e)}>Takvime ekle ↓</button>
                    {e.link && (
                      <a href={e.link} target="_blank" rel="noopener noreferrer">
                        {e.link.replace(/^https?:\/\//, "").split("/")[0]} ↗
                      </a>
                    )}
                  </span>
                )}
              </span>
              <span className={s.satirTur}>{e.tur ? TUR_ADI[e.tur] : ""}</span>
              <span className={s.satirOk} aria-hidden />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SahneListesi() {
  const { gelecek, gecmis } = ayrilmis();
  return (
    <>
      {gelecek.length > 0 && <Liste no="01" baslik="Yaklaşan" liste={gelecek} />}
      {gecmis.length > 0 && <Liste no={gelecek.length > 0 ? "02" : "01"} baslik="Geçmiş" liste={gecmis} gecmis />}
    </>
  );
}
