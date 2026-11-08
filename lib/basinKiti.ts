/* Basın kiti verisi — Basın Odası sayfası ve scripts/basin-kiti.mts (ZIP + PDF bülten)
   aynı kaynaktan beslenir. Bu dosya bilerek hiçbir şey import etmez (Node betiği
   doğrudan okuyabilsin diye). */

const EMAIL = "do.berkay@icloud.com";

export const BIO_KISA_TR = "Berkay Doğan, İstanbul'da yaşayan şair ve yazar; Mürekkep ve Köz (şiir, 2025) ile Tasfiye'nin (deneme, 2026) yazarıdır, edebi üretimini geliştirdiği hereby. ve nowby. uygulamalarıyla genişletiyor.";

export const BIO_ORTA_TR = "Berkay Doğan, İstanbul'da yaşayan şair ve yazardır. 2017'de, on yedi yaşında yazmaya başladı; sekiz yıl sessizce yazdıktan sonra on ay içinde iki kitap, bir kısa film ve iki uygulama çıkardı. İlk kitabı Mürekkep ve Köz (İskenderiye Yayınları, Aralık 2025) Trendyol'un şiir kategorisinde en çok ziyaret edilen kitap oldu ve 1000Kitap'ta 10/10 okur puanı aldı. İkinci kitabı Tasfiye (deneme, Ağustos 2026) sahneye kurulan bir mahkemede yazarın kendisini sanık koltuğuna oturtuyor; metinleri kitaptan, sesi yazardan olan TASFİYE: Film (8 dk) Eylül 2026'da YouTube'da yayımlandı. Doğan, edebi üretimini geliştirdiği dijital deneyimlerle genişletiyor: bir yere bırakılan ve yalnızca oraya gelenin okuyabildiği satırların uygulaması hereby. ile radyolarda o an çalan şarkıları gösteren nowby. (nowby.co). Şairin Hesabı podcast'ini de yayınlıyor.";

export const BIO_KISA_EN = "Berkay Doğan is an Istanbul-based Turkish poet and writer, the author of Mürekkep ve Köz (poetry, 2025) and Tasfiye (essays, 2026), who extends his literary work through the apps he builds, hereby. and nowby.";

export const BIO_ORTA_EN = "Berkay Doğan is a poet and writer based in Istanbul who writes in Turkish. He began writing in 2017, at seventeen; after eight quiet years, he released two books, a short film and two apps within ten months. His debut poetry collection, Mürekkep ve Köz (literally “Ink and Ember”; İskenderiye Yayınları, December 2025), became the most visited title in the poetry category of the Turkish e-commerce platform Trendyol and holds a 10/10 reader rating on the Turkish reading platform 1000Kitap. His second book, Tasfiye (Turkish for “purge” or “cleansing”; essays, August 2026), puts the writer himself in the dock of a courtroom set on a stage; its short film, TASFİYE: Film (8 min, text from the book, narrated by the author), was released on YouTube in September 2026. He extends his literary work through the digital experiences he builds: hereby., an app for lines left at a place and readable only by someone who comes there, and nowby. (nowby.co), which shows the songs playing right now on radio stations. He also hosts the podcast Şairin Hesabı (“The Poet’s Reckoning”).";

export const KUNYE: { k: string; v: string }[] = [
  { k: "Ad", v: "Berkay Doğan" },
  { k: "Unvan", v: "Şair, yazar · hereby. ve nowby.'nin geliştiricisi" },
  { k: "Şehir", v: "İstanbul, Türkiye" },
  { k: "Yayınevi", v: "İskenderiye Yayınları" },
  { k: "Kitaplar", v: "Mürekkep ve Köz (şiir, 2025) · Tasfiye (deneme, 2026)" },
  { k: "Film", v: "TASFİYE: Film — kısa film, 8 dk (YouTube, Eylül 2026)" },
  { k: "Uygulamalar", v: "hereby. (yere bırakılan satırlar) · nowby. (radyolarda şu an çalan şarkılar, nowby.co)" },
  { k: "Podcast", v: "Şairin Hesabı (Spotify)" },
  { k: "Web", v: "berkaydogan.co · Substack: doberkay.substack.com" },
  { k: "İletişim", v: EMAIL },
];

export const RAKAMLAR: { deger: string; aciklama: string }[] = [
  { deger: "#1", aciklama: "Trendyol şiir — en çok ziyaret edilen: Mürekkep ve Köz" },
  { deger: "10/10", aciklama: "1000Kitap okur puanı" },
  { deger: "No. 51", aciklama: "Valsanat dergisinde yayın" },
  { deger: "2", aciklama: "kitap — şiir + deneme" },
  { deger: "200", aciklama: "söz: her birinin kendi sayfası ve paylaşım kartı" },
  { deger: "8 yıl", aciklama: "ilk dizeden ilk kitaba (2017 → 2025)" },
];

export const KONULAR: string[] = [
  "Sekiz yıl sessizlik, on ayda iki kitap, bir film ve bir radyo: bir yazarın hızlanan yılı",
  "Bir şair Türkiye'nin radyolarını saymaya başladı: nowby ve aylık radyo endeksi",
  "Yazarını sanık koltuğuna oturtan kitap: Tasfiye'nin mahkeme konsepti",
  "Kitaptan filme: metni kitaptan, sesi yazardan olan TASFİYE: Film",
  "Şiirden denemeye geçiş: Mürekkep ve Köz'den Tasfiye'ye",
  "Sosyal medya çağında derinlik: 'boş teneke' eleştirisi",
];
