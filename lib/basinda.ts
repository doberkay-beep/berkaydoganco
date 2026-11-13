/* Ekran arşivi — TV, video röportaj, podcast konuklukları (tek kaynak).
   Yeni çıkış: en üste bir kayıt ekle; /medya "Ekran" bölümü ve /press
   "Basında" bölümü buradan beslenir. Liste boşken bölümler görünmez.
   YALNIZ GERÇEKLEŞMİŞ yayınlar girilir; teyitsiz/ileri tarihli kayıt eklenmez. */

export type Ekran = {
  tarihISO: string;   // yayın tarihi
  kanal: string;      // "Business Channel Türk"
  baslik: string;     // "Tasfiye üzerine söyleşi"
  tur: "tv" | "video" | "podcast";
  link?: string;      // varsa izleme bağlantısı (YouTube vb.)
};

export const EKRAN: Ekran[] = [
  { tarihISO: "2026-10-16", kanal: "Business Channel Türk", baslik: "“Yazmak varoluşun en sessiz itirafıdır”: Tasfiye, yazarlık ve şiir üzerine söyleşi", tur: "tv", link: "https://youtu.be/7zoHL4pIM7A" },
];

/* ---------- BASINDA DUVARI — yazılı basın ve dergi çıkışları (tek kaynak) ----------
   Yeni çıkış: EN ÜSTE ekle. Hakkımda, Basın Odası ve ana sayfadaki "Şu an" bandı
   buradan beslenir. `alinti` YALNIZ yayımlanmış metinden, harfi harfine
   (Berkay'ın kendi cevabı ya da kitapta/dergide yayımlanmış dize). */

export type BasinTur = "roportaj" | "siir" | "siirDeneme" | "dosya" | "haber";
export type Basin = {
  tarihISO: string;
  yayin: string;
  tur: BasinTur;
  baslik: { tr: string; en: string };
  alinti?: string;      // Türkçe, aslı gibi
  url: string;
  sadeceAy?: boolean;   // gün bilinmiyorsa (dergi sayısı) yalnız ay gösterilir
};

export const BASIN_TUR: Record<BasinTur, { tr: string; en: string }> = {
  roportaj: { tr: "Röportaj", en: "Interview" },
  siir: { tr: "Şiir", en: "Poem" },
  siirDeneme: { tr: "Şiir ve deneme", en: "Poem and essay" },
  dosya: { tr: "Yazar dosyası", en: "Author profile" },
  haber: { tr: "Haber", en: "News" },
};

export const BASIN: Basin[] = [
  {
    tarihISO: "2026-11-12",
    yayin: "Teknoblog",
    tur: "haber",
    baslik: { tr: "hereby, iPhone'daki notları yalnızca bulunduğu yerde açıyor", en: "hereby opens iPhone notes only where they were left" },
    url: "https://www.teknoblog.com/hereby-iphonedaki-notlari-yalnizca-bulundugu-yerde-aciyor/",
  },
  {
    // Berkay'ın kararıyla eklendi (13 Kas). Not: foro3d başka yayınları otomatik yeniden yazan bir site;
    // Global Talent dosyasında kanıt olarak kullanılmaz.
    tarihISO: "2026-11-12",
    yayin: "Foro3D (İspanyolca)",
    tur: "haber",
    baslik: { tr: "hereby: okumak için orada olmayı gerektiren dijital notlar", en: "hereby: digital notes that require being there to read them (in Spanish)" },
    url: "https://foro3d.com/2026/noviembre/hereby-notas-digitales-que-exigen-presencia-fisica-para-leerlas.html",
  },
  {
    tarihISO: "2026-11-12",
    yayin: "Webrazzi",
    tur: "haber",
    baslik: { tr: "Konuma bağlı dijital izler bırakmayı sağlayan iOS uygulaması: hereby", en: "hereby: an iOS app for leaving digital traces tied to a place" },
    url: "https://webrazzi.com/2026/11/12/konuma-bagli-dijital-izler-birakmayi-saglayan-ios-uygulamasi-hereby",
  },
  {
    tarihISO: "2026-10-30",
    yayin: "Şiir Rafım",
    tur: "siir",
    baslik: { tr: "“Köz” — Okur Şiirleri (yorum yazısıyla)", en: "“Köz” — Readers’ Poems (with commentary)" },
    url: "https://www.siirrafim.art/2026/10/koz-berkay-dogan-okur-siirleri.html",
  },
  {
    tarihISO: "2026-10-21",
    yayin: "Müstakil Düşünenler",
    // "Çok Uzaklardaki Zihnim, Şimdi" şiir; "Karanlık Oksijen" Tasfiye'nin ilk denemesi (aynı adlı İnfaz şiiri DEĞİL).
    tur: "siirDeneme",
    baslik: { tr: "“Çok Uzaklardaki Zihnim, Şimdi” ve “Karanlık Oksijen” — Sayı 13/14", en: "“Çok Uzaklardaki Zihnim, Şimdi” and “Karanlık Oksijen” — Issue 13/14" },
    alinti: "Suyun altında olduğumuzu fark etmek, yüzeye doğru atılacak ilk ve en hayati kulaçtır.",
    url: "https://www.kitapyurdu.com/dergi/mustakil-dusunenler-sayi-13-sayi-1314-20262/771856.html",
    sadeceAy: true,
  },
  {
    tarihISO: "2026-10-05",
    yayin: "Şiir Rafım",
    tur: "siir",
    baslik: { tr: "“Geleceğime Âşığım” — Okur Şiirleri", en: "“Geleceğime Âşığım” — Readers’ Poems" },
    alinti: "Geri dönmüyorum, geleceğime âşığım.",
    url: "https://www.siirrafim.art/2026/10/gelecegime-asigim-berkay-dogan-okur.html",
  },
  {
    tarihISO: "2026-10-05",
    yayin: "Şiir Rafım",
    tur: "dosya",
    baslik: { tr: "Berkay Doğan kimdir? Kitapları, Tasfiye ve Mürekkep ve Köz", en: "Who is Berkay Doğan? His books, Tasfiye and Mürekkep ve Köz" },
    url: "https://www.siirrafim.art/2026/10/berkay-dogan-kimdir-kitaplari-tasfiye-murekkep-ve-koz.html",
  },
  {
    tarihISO: "2026-10-04",
    yayin: "Edebiyat Magazin Gazetesi",
    tur: "roportaj",
    baslik: { tr: "Söyleşi: Erhan Özdemir", en: "Interview by Erhan Özdemir" },
    alinti: "Beğenilecek cümleyi değil, doğru cümleyi yaz.",
    url: "https://emagazin.tv/haber/berkay-dogan-begenilecek-cumleyi-degil-dogru-cumleyi-yaz/2918",
  },
  {
    tarihISO: "2026-02-01",
    yayin: "Valsanat Edebiyat Dergisi",
    tur: "siir",
    baslik: { tr: "“Ruh-u Katliam” — 51. sayı", en: "“Ruh-u Katliam” — Issue 51" },
    url: "https://online.fliphtml5.com/jqzww/ezec/#p=1",
    sadeceAy: true,
  },
];

/* Kayıtlar — basın değil ama tanınırlık: platform ve dizin kayıtları. */
export const KAYITLAR: { ad: string; tr: string; en: string; url: string }[] = [
  { ad: "Trendyol", tr: "Şiirde #1 en çok ziyaret edilen", en: "#1 most visited in poetry", url: "https://www.trendyol.com/iskenderiye-kitap/murekkep-ve-koz-berkay-dogan-p-1072536167" },
  { ad: "1000Kitap", tr: "10/10 okur puanı", en: "10/10 reader rating", url: "https://1000kitap.com/BerkayDogan01" },
  { ad: "Goodreads", tr: "Küresel yazar dizininde", en: "In the global author index", url: "https://www.goodreads.com/book/show/252900764-m-rekkep-ve-k-z" },
  { ad: "Wikidata", tr: "Yazar kaydı Q141592752", en: "Author record Q141592752", url: "https://www.wikidata.org/wiki/Q141592752" },
];

/* ALINTILANABİLİR CÜMLELER — Edebiyat Magazin söyleşisindeki KENDİ cevaplarından,
   harfi harfine (4 Eki 2026). Basın kullanabilir; kaynak gösterilir. */
export const ALINTILAR: string[] = [
  "Beğenilecek cümleyi değil, doğru cümleyi yaz ve kimsenin onayını bekleme.",
  "Okuruna dürüst olmayan yazar ona saygı duymuyordur.",
  "Konuşarak anlatamadığımı yazarak anlatmaya karar verdim.",
  "Bir ritüelim varsa o da bu: önce susmak, sonra yazmak.",
  "Yazarlık ilham beklemek değil, yorgunken de masaya oturabilmek.",
  "Dünyanın eksiği söz değil, sessizlik; herkes konuşuyor, kimse dinlemiyor.",
  "Havalimanında her gün başkalarının gidişini düzenliyorum ama kendim hiçbir yere gitmiyorum.",
  "Bir cümlem sizi rahatsız ettiyse o cümle işini yapmıştır.",
];
export const ALINTI_KAYNAK = {
  ad: "Edebiyat Magazin Gazetesi söyleşisi, 4 Ekim 2026",
  url: "https://emagazin.tv/haber/berkay-dogan-begenilecek-cumleyi-degil-dogru-cumleyi-yaz/2918",
};
