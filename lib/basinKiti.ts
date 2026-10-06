/* Basın kiti verisi — Basın Odası sayfası ve scripts/basin-kiti.mts (ZIP + PDF bülten)
   aynı kaynaktan beslenir. Bu dosya bilerek hiçbir şey import etmez (Node betiği
   doğrudan okuyabilsin diye). */

const EMAIL = "do.berkay@icloud.com";

export const BIO_KISA_TR = "Berkay Doğan, İstanbul'da yaşayan şair ve yazar; Mürekkep ve Köz (şiir, 2025) ile Tasfiye (deneme, 2026) kitaplarının yazarı ve Türkiye'nin radyolarında o an ne çaldığını canlı gösteren ŞİMDİ'nin (necaliyor.co) kurucusudur.";

export const BIO_ORTA_TR = "Berkay Doğan, İstanbul'da yaşayan şair ve yazardır. 2017'de, on yedi yaşında yazmaya başladı; sekiz yıl sessizce yazdıktan sonra on ay içinde iki kitap, bir kısa film ve bir radyo platformu çıkardı. İlk kitabı Mürekkep ve Köz (İskenderiye Yayınları, Aralık 2025) Trendyol'un şiir kategorisinde en çok ziyaret edilen kitap oldu ve 1000Kitap'ta 10/10 okur puanı aldı. İkinci kitabı Tasfiye (deneme, Ağustos 2026) okuru sahneye kurulan bir mahkemede yüzleşmeye çağırıyor; metinleri kitaptan, sesi yazardan olan TASFİYE: Film (8 dk) Eylül 2026'da YouTube'da yayımlandı. Doğan, Türkiye'nin radyolarında o an ne çaldığını gösteren ve sayan ŞİMDİ'nin (necaliyor.co) kurucusudur; Şairin Hesabı podcast'ini de yayınlıyor.";

export const BIO_KISA_EN = "Berkay Doğan is a poet and writer based in Istanbul, the author of Mürekkep ve Köz (poetry, 2025) and Tasfiye (essays, 2026), and the founder of ŞİMDİ (necaliyor.co), a live view of what Turkey's radio stations are playing right now.";

export const BIO_ORTA_EN = "Berkay Doğan is a poet and writer based in Istanbul. He began writing in 2017, at seventeen; after eight quiet years, he released two books, a short film and a radio platform within ten months. His debut poetry collection Mürekkep ve Köz (İskenderiye, December 2025) became the most visited title in Trendyol's poetry category and holds a 10/10 reader rating on 1000Kitap. His second book, the essay collection Tasfiye (August 2026), puts the reader in a courtroom of self-reckoning; its short film, TASFİYE: Film (8 min, text from the book, narrated by the author), was released on YouTube in September 2026. He is the founder of ŞİMDİ (necaliyor.co), which shows and counts what is playing right now across Turkey's radio stations, and hosts the podcast Şairin Hesabı.";

export const KUNYE: { k: string; v: string }[] = [
  { k: "Ad", v: "Berkay Doğan" },
  { k: "Unvan", v: "Şair, yazar · ŞİMDİ'nin kurucusu" },
  { k: "Şehir", v: "İstanbul, Türkiye" },
  { k: "Yayınevi", v: "İskenderiye Yayınları" },
  { k: "Kitaplar", v: "Mürekkep ve Köz (şiir, 2025) · Tasfiye (deneme, 2026)" },
  { k: "Film", v: "TASFİYE: Film — kısa film, 8 dk (YouTube, Eylül 2026)" },
  { k: "Radyo", v: "ŞİMDİ — Türkiye radyolarının canlı akışı ve sayımı (necaliyor.co)" },
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
  "Bir şair Türkiye'nin radyolarını saymaya başladı: ŞİMDİ ve aylık radyo endeksi",
  "Okurunu sanık koltuğuna oturtan kitap: Tasfiye'nin mahkeme konsepti",
  "Kitaptan filme: metni kitaptan, sesi yazardan olan TASFİYE: Film",
  "Şiirden denemeye geçiş: Mürekkep ve Köz'den Tasfiye'ye",
  "Sosyal medya çağında derinlik: 'boş teneke' eleştirisi",
];
