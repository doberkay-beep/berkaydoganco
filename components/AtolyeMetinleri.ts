import type { AtolyeMetin } from "./AtolyeSayfa";

const MOR = "#7c6cff";
const TURUNCU = "#FF6A3D";

export const ATOLYE_TR: AtolyeMetin = {
  dil: "tr",
  alt: "Berkay Doğan'ın atölyesi",
  giris: "Beğenisiz, takipçisiz, sonsuz akışsız. Seni telefondan alıp bir yere, bir âna götüren uygulamalar.",
  telHereby: "hereby. uygulamasının ekranı", telNowby: "nowby. uygulamasının ekranı",
  byEtiket: "by ne demek",
  by: [
    "<em>by</em>, bir şeyin yanında durmak demek: bir yerin, bir ânın.",
    "<em>by</em>, bir şeyin aracılığıyla yaşamak demek: bir satırla, bir frekansla.",
    "Ve <em>by</em>, bir imza: <em>written by</em>. Bu atölyeden çıkan her iş, bir yazarın imzasını taşır.",
  ],
  islerEtiket: "Atölyenin işleri",
  isler: [
    {
      ad: "hereby", renk: MOR, soru: "Nerede?", href: "/hereby", dis: false, link: "hereby.'yi tanı →",
      m: "Aklından geçen satırı geçtiğin yere bırak. Onu yalnızca oraya gelen biri okuyabilir. Kitaplardan satırlarla şiir yürüyüşleri, zaman kapsülleri, kendine notlar.",
      gorseller: [["/hereby/vitrin-1.jpg", "Yeni iz yazma ekranı"], ["/hereby/vitrin-3.jpg", "Harita ve yakındaki izler"], ["/hereby/vitrin-5.jpg", "Bir iz ve yanına bırakılan satırlar"]],
    },
    {
      ad: "nowby", renk: TURUNCU, soru: "Ne zaman?", href: "/nowby", dis: false, link: "nowby.'yu tanı →",
      m: "Türkiye'nin radyolarında şu an ne çalıyor? Yüzlerce frekans tek ekranda, canlı. Gerçek sayıma dayanan listeler, dünyanın radyoları, kitaplardan dizelerle Frekans Falı.",
      gorseller: [["/by/nowby-4.5.jpg", "Canlı radyo listesi"], ["/by/nowby-7.8.jpg", "Büyük çalar"], ["/by/nowby-13.5.jpg", "Atlas: ülke ülke radyolar"]],
    },
    {
      ad: "writtenby", renk: MOR, soru: "Kim?", href: "/writtenby", dis: false, link: "writtenby.'yi tanı →",
      m: "Bir şehrin yazdığı kitap. Her gün herkese aynı soru; bulunduğun yerden tek bir satır. Satırını yalnızca oraya gelenler okur. Yıl sonunda bu satırlardan basılı bir kitap kurulur; izin vermediğin hiçbir satır basılmaz. İlk kitap: İstanbul 2027.",
      gorseller: [["/by/writtenby-1.5.jpg", "Günün sorusu"], ["/by/writtenby-10.2.jpg", "Tek satır ve basım izni"], ["/by/writtenby-13.2.jpg", "Bugünün satırı"]],
    },
  ],
  soruEtiket: "Dört soru",
  soruBaslik: "Bu atölyeden bir uygulama çıkacaksa, dört soruya da \"evet\" demek zorunda.",
  sorular: [
    { b: "Gerçek bir soru.", s: "İnsanın kendine sorduğu bir soruya cevap veriyor mu?", h: "“Burada ne düşünmüştüm?”", n: "“Şu an radyoda ne çalıyor?”" },
    { b: "Seni dışarı çağırır.", s: "Telefonu bırakıp bir yere, bir âna, bir insana götürüyor mu?", h: "Bir iz yalnızca oraya yürüyünce açılır.", n: "Gözünü ekrandan alır, kulağını şehre verir." },
    { b: "Kimseyi sayıya çevirmez.", s: "Beğeni, takipçi, sonsuz akış olmadan yaşayabiliyor mu?", h: "Hiçbir iz sayılmaz, sıralanmaz.", n: "Şarkıları sayar, insanları değil." },
    { b: "İçinde bir söz taşır.", s: "İçinde bir yazarın sözü var mı?", h: "Her durakta kitaplardan bir satır.", n: "Frekans Falı'nda kitaplardan bir dize." },
  ],
  kapanis: "Önce sözler, sonra frekanslar.",
  ilkeler: "Reklam yok · Beğeni yok · Takipçi yok",
  studio: "Stüdyoyla çalış: uygulama ve web siteleri →", studioHref: "/studio",
  anaSayfa: "/",
};

export const ATOLYE_EN: AtolyeMetin = {
  dil: "en",
  alt: "Berkay Doğan's workshop",
  giris: "No likes, no followers, no endless feed. Apps that take you off your phone and into a place, a moment.",
  telHereby: "The hereby. app screen", telNowby: "The nowby. app screen",
  byEtiket: "What by means",
  by: [
    "<em>by</em> means standing beside something: a place, a moment.",
    "<em>by</em> means living through something: a line, a frequency.",
    "And <em>by</em> is a signature: <em>written by</em>. Everything that leaves this workshop carries a writer's signature.",
  ],
  islerEtiket: "From the workshop",
  isler: [
    {
      ad: "hereby", renk: MOR, soru: "Where?", href: "/en/hereby", dis: false, link: "Meet hereby. →",
      m: "Leave the line on your mind at the place you pass. Only someone who comes to that place can read it. Poetry walks with lines from the books, time capsules, notes to self.",
      gorseller: [["/hereby/vitrin-1.jpg", "Writing a new trace"], ["/hereby/vitrin-3.jpg", "The map and nearby traces"], ["/hereby/vitrin-5.jpg", "A trace and the lines left beside it"]],
    },
    {
      ad: "nowby", renk: TURUNCU, soru: "When?", href: "/en/nowby", dis: false, link: "Meet nowby. →",
      m: "What is playing on Türkiye's radio right now? Hundreds of frequencies on one screen, live. Charts built on real airplay counts, the world's radio, and a Frequency Fortune with lines from the books.",
      gorseller: [["/by/nowby-4.5.jpg", "The live station list"], ["/by/nowby-7.8.jpg", "The big player"], ["/by/nowby-13.5.jpg", "Atlas: radio country by country"]],
    },
    {
      ad: "writtenby", renk: MOR, soru: "Who?", href: "/en/writtenby", dis: false, link: "Meet writtenby. →",
      m: "A book written by a city. Every day, the same question for everyone; one line from where you stand. Only those who come to that place can read it. At year's end the lines become a printed book, and no line is printed without permission. First book: Istanbul 2027.",
      gorseller: [["/by/writtenby-1.5.jpg", "The question of the day"], ["/by/writtenby-10.2.jpg", "One line and print permission"], ["/by/writtenby-13.2.jpg", "Today's line"]],
    },
  ],
  soruEtiket: "Four questions",
  soruBaslik: "For an app to leave this workshop, it has to answer \"yes\" to all four.",
  sorular: [
    { b: "A real question.", s: "Does it answer a question people actually ask themselves?", h: "“What was I thinking here?”", n: "“What's on the radio right now?”" },
    { b: "It calls you outside.", s: "Does it take you off your phone, to a place, a moment, a person?", h: "A trace only opens when you walk there.", n: "It takes your eyes off the screen and gives your ears to the city." },
    { b: "It turns no one into a number.", s: "Can it live without likes, followers or an endless feed?", h: "No trace is counted or ranked.", n: "It counts songs, not people." },
    { b: "It carries words.", s: "Is there a writer's voice inside it?", h: "A line from the books at every stop.", n: "A line from the books in the Frequency Fortune." },
  ],
  kapanis: "First words, then frequencies.",
  ilkeler: "No ads · No likes · No followers",
  studio: "Work with the studio: apps and websites →", studioHref: "/en/studio",
  anaSayfa: "/en",
};
