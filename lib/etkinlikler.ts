/* Sahne — imza günleri, okumalar, söyleşiler (tek kaynak).
   Yeni etkinlik: aşağıya bir kayıt ekle; geçmiş tarihliler kendiliğinden
   "geçmiş" bölümüne düşer. Liste boşken sayfa nazik bir boş durum gösterir.
   UYDURMA ETKİNLİK EKLENMEZ — yalnız Berkay'ın teyit ettikleri girilir. */

export type EtkinlikTur = "soylesi" | "okuma" | "imza" | "iz";

export type Etkinlik = {
  tarihISO: string;      // "2026-11-02" ya da saatli "2026-11-02T14:00"
  baslik: string;        // "Tasfiye imza günü"
  mekan: string;         // "İskenderiye Kitap standı, TÜYAP"
  sehir: string;
  tur?: EtkinlikTur;     // söyleşi / okuma / imza / hereby izi
  adres?: string;        // yapısal veri için açık adres (isteğe bağlı)
  not?: string;          // "14:00–17:00 arası" gibi
  link?: string;         // bilet/duyuru bağlantısı
};

export const TUR_ADI: Record<EtkinlikTur, string> = {
  soylesi: "Söyleşi",
  okuma: "Okuma",
  imza: "İmza günü",
  iz: "hereby. izi",
};

export const ETKINLIKLER: Etkinlik[] = [];

export function ayrilmis(): { gelecek: Etkinlik[]; gecmis: Etkinlik[] } {
  const bugun = new Date();
  bugun.setHours(0, 0, 0, 0);
  const gelecek: Etkinlik[] = [];
  const gecmis: Etkinlik[] = [];
  for (const e of [...ETKINLIKLER].sort((a, b) => a.tarihISO.localeCompare(b.tarihISO))) {
    (new Date(e.tarihISO) >= bugun ? gelecek : gecmis).push(e);
  }
  gecmis.reverse();
  return { gelecek, gecmis };
}

/* Takvime ekle — istemcide .ics üretir (statik sitede sunucu yok). */
export function icsUret(e: Etkinlik): string {
  const t = e.tarihISO.replace(/[-:]/g, "");
  const tamGun = !e.tarihISO.includes("T");
  const dtstart = tamGun ? `DTSTART;VALUE=DATE:${t}` : `DTSTART:${t}00`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//berkaydogan.co//sahne//TR",
    "BEGIN:VEVENT",
    `UID:${e.tarihISO}-${e.baslik.replace(/\W+/g, "")}@berkaydogan.co`,
    dtstart,
    `SUMMARY:${e.baslik} — Berkay Doğan`,
    `LOCATION:${e.mekan}, ${e.sehir}`,
    e.not ? `DESCRIPTION:${e.not}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean).join("\r\n");
}

/* Yapısal veri (schema.org Event) — Google'ın etkinlik sonuçları ve bilgi paneli için.
   Yalnız tarihli, teyitli kayıtlardan üretilir. */
export function etkinlikLd(e: Etkinlik, personId: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${e.baslik} — Berkay Doğan`,
    startDate: e.tarihISO.includes("T") ? `${e.tarihISO}:00+03:00` : e.tarihISO,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: e.mekan,
      address: { "@type": "PostalAddress", addressLocality: e.sehir, addressCountry: "TR", ...(e.adres ? { streetAddress: e.adres } : {}) },
    },
    performer: { "@id": personId },
    ...(e.link ? { url: e.link } : {}),
    ...(e.not ? { description: e.not } : {}),
  };
}
