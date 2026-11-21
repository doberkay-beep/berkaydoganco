import { ETKINLIKLER } from "@/lib/etkinlikler";

/** Bir sayfanın öteki dildeki karşılığı; karşılığı yoksa öteki dilin ana sayfası. */
const ESLER: [tr: string, en: string][] = [
  ["/", "/en/"],
  ["/hereby/", "/en/hereby/"],
  ["/nowby/", "/en/nowby/"],
  ["/by/", "/en/by/"],
  ["/writtenby/sanatcilar/", "/en/writtenby/artists/"],
  ["/writtenby/", "/en/writtenby/"],
  ["/gidis/", "/en/departures/"],
  ["/studio/", "/en/studio/"],
];
export function digerDil(yol: string): string {
  const y = yol.endsWith("/") ? yol : `${yol}/`;
  const en = y.startsWith("/en/");
  const es = ESLER.find(([t, e]) => (en ? e : t) === y);
  if (es) return en ? es[0] : es[1];
  return en ? "/" : "/en/";
}

/* Sitenin tek menü verisi (components/SiteMenu.tsx ve ana sayfanın site dizini okur).
   Yeni sayfa → buraya. Sunucu bileşenleri de çağırabilsin diye "use client" dışında. */

// Üçüncü alan: true = bir üstteki bağlantının alt sayfası, "ara" = grup içi ara başlık (bağlantı değil).
export type Baglanti = [href: string, ad: string, tur?: true | "ara"];
export type Grup = { baslik: string; ana?: boolean; linkler: Baglanti[] };

export function menuGruplari(lang: "tr" | "en"): Grup[] {
  const tr = lang === "tr";
  return [
    {
      baslik: tr ? "Başlangıç" : "Start here",
      ana: true,
      linkler: [
        [tr ? "/kitaplar/" : "/en/#books", tr ? "Kitaplar" : "Books"],
        ["/yazilar/", tr ? "Yazılar" : "Writing"],
        [tr ? "/press/" : "/en/#press-kit", tr ? "Basında" : "Press"],
        [tr ? "/hakkimda/" : "/en/#about", tr ? "Hakkımda" : "About"],
        [tr ? "/by/" : "/en/by/", tr ? "Uygulamalar" : "Apps"],
        [tr ? "/#contact" : "/en/#contact", tr ? "İletişim" : "Contact"],
      ],
    },
    {
      baslik: tr ? "Okuma arşivi" : "Reading archive",
      linkler: [
        ["/sozler/", tr ? "Sözler" : "Quotes"],
        ["/notlar/", tr ? "Gece Notları" : "Night Notes"],
        ["/sozluk/", tr ? "Kavramlar Sözlüğü" : "Lexicon"],
        ["/takvim/", tr ? "Köz Takvimi" : "Ember Calendar"],
        ...(tr
          ? [["/mektup/", "Okur Mektupları"] as Baglanti, ["/ogrenciler/", "Öğrenciler için"] as Baglanti, ["/gom/", "Sitene Göm", true] as Baglanti]
          : []),
      ],
    },
    {
      baslik: tr ? "Diğer çalışmalar" : "Other work",
      linkler: [
        ["", tr ? "Filmler ve videolar" : "Films and videos", "ara"],
        ["/film/", tr ? "Tasfiye: film" : "Tasfiye: the film"],
        ["/video/", tr ? "İzle & Dinle" : "Watch & Listen"],
        ...(tr ? [["/tek-soz/", "Tek Söz"] as Baglanti] : []),
        ...(ETKINLIKLER.length > 0 ? [["/sahne/", tr ? "Sahne" : "On Stage"] as Baglanti] : []),
        ["", tr ? "Posterler ve görsel çalışmalar" : "Posters and visual work", "ara"],
        ["/posterler/", tr ? "Posterler" : "Posters"],
        ...(tr ? [["/goruntu/", "Görüntü ve Dize"] as Baglanti] : []),
        ["", tr ? "by. atölyesi ve uygulamalar" : "by. workshop and apps", "ara"],
        [tr ? "/by/" : "/en/by/", tr ? "by. atölyesi" : "by. workshop"],
        [tr ? "/hereby/" : "/en/hereby/", "hereby."],
        [tr ? "/gidis/" : "/en/departures/", tr ? "Gidiş zinciri" : "Departure chain", true],
        [tr ? "/nowby/" : "/en/nowby/", "nowby."],
        [tr ? "/writtenby/" : "/en/writtenby/", "writtenby."],
        [tr ? "/writtenby/sanatcilar/" : "/en/writtenby/artists/", tr ? "Sanatçılar" : "Artists", true],
        [tr ? "/studio/" : "/en/studio/", tr ? "by. stüdyo" : "by. studio"],
      ],
    },
  ];
}

