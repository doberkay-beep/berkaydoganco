import { ETKINLIKLER } from "@/lib/etkinlikler";

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
        ["/hakkimda/", tr ? "Hakkımda" : "About"],
        [tr ? "/press/" : "/en/#press-kit", tr ? "Basın odası" : "Press room"],
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

