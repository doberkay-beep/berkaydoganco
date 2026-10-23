import type { AtolyeMetin } from "./AtolyeSayfa";

/* by. sayfasının metinleri. Uygulama metinleri onaylı kaynaklardan:
   adımlar HerebyTanitim / WrittenbySayfa'dan, cihaz satırları NowbySayfa'dan, ilkeler "Dört soru"dan ve writtenby sayfasından. */

const MOR = "#7c6cff";
const TURUNCU = "#FF6A3D";

export const ATOLYE_TR: AtolyeMetin = {
  dil: "tr",
  alt: "Berkay Doğan'ın atölyesi",
  giris: "Beğenisiz, takipçisiz, sonsuz akışsız. Seni telefondan alıp bir yere, bir âna götüren uygulamalar.",
  byEtiket: "by ne demek",
  by: [
    "<em>by</em>, bir şeyin yanında durmak demek: bir yerin, bir ânın.",
    "<em>by</em>, bir şeyin aracılığıyla yaşamak demek: bir satırla, bir frekansla.",
    "Ve <em>by</em>, bir imza: <em>written by</em>. Bu atölyeden çıkan her iş, bir yazarın imzasını taşır.",
  ],
  islerEtiket: "Atölyenin işleri",
  isler: [
    {
      id: "hereby", ad: "hereby", renk: MOR, soru: "Nerede?", href: "/hereby", link: "hereby.'yi tanı →",
      m: "Aklından geçen satırı geçtiğin yere bırak. Onu yalnızca oraya gelen biri okuyabilir. Kitaplardan satırlarla şiir yürüyüşleri, zaman kapsülleri, kendine notlar.",
      ilke: "Hiçbir iz sayılmaz, sıralanmaz.",
      video: "/by/hereby-ekran.mp4", poster: "/hereby/vitrin-3.jpg", telefon: "hereby. uygulamasının ekranı",
      adimlar: [
        { b: "Bırak.", s: "Bir vapur iskelesinde, bir merdivende, bir sahilde aklından geçeni yaz. En fazla 280 karakter." },
        { b: "Yürü.", s: "İzler haritada kilitli durur. Uzaktan okumak yok: yaklaşık 300 metreye gelince açılır." },
        { b: "Oku, yanına bırak.", s: "Aynı köşede, farklı yıllarda yaşamış insanların sessiz sohbeti: \"Ben de burada…\"" },
      ],
    },
    {
      id: "nowby", ad: "nowby", renk: TURUNCU, soru: "Ne zaman?", href: "/nowby", link: "nowby'ı tanı →",
      m: "Türkiye'nin radyolarında şu an ne çalıyor? Yüzlerce frekans tek ekranda, canlı. Gerçek sayıma dayanan listeler, dünyanın radyoları, kitaplardan dizelerle Frekans Falı.",
      ilke: "Şarkıları sayar, insanları değil.",
      cihazBaslik: "Beş cihazda aynı radyo, aynı şarkı.",
      cihazlar: [
        { tur: "tv", c: "Apple TV", b: "Salonda, kocaman.", s: "Kanepeden okunan şarkı adları.", alt: "nowby. Apple TV'de: şu an çalan şarkı büyük ekranda" },
        { tur: "mac", c: "Mac", b: "Masanda, yan panelde.", s: "Kenar çubuğu, şarkı kartları, altta boydan boya çalar.", alt: "nowby. Mac'te: kenar çubuğu, şarkı kartları ve çalar" },
        { tur: "ipad", c: "iPad", b: "Kucağında, üç sütun.", s: "Kenar çubuğu, şarkı kartları ve büyük çalar aynı ekranda.", alt: "nowby. iPad'de: üç sütunlu ekran" },
        { tur: "iphone", c: "iPhone", b: "Cebinde, canlı.", s: "Yüzlerce radyo, şu an çalan şarkılarıyla.", alt: "nowby. iPhone'da: canlı radyo listesi" },
        { tur: "saat", c: "Apple Watch", b: "Bileğinde, tek dokunuş.", s: "Telefondaki çaların kumandası; şarkıyı oradan yakala.", alt: "nowby. Apple Watch'ta: çalan şarkı ve Yakala düğmesi" },
      ],
    },
    {
      id: "writtenby", ad: "writtenby", renk: MOR, soru: "Kim?", href: "/writtenby", link: "writtenby.'yi tanı →",
      m: "Bir şehrin yazdığı kitap. Her gün herkese aynı soru; bulunduğun yerden tek bir satır. Satırını yalnızca oraya gelenler okur. Yıl sonunda bu satırlardan basılı bir kitap kurulur; izin vermediğin hiçbir satır basılmaz. İlk kitap: İstanbul 2027.",
      ilke: "Kitaba girmek bir ödül değil, bir derleme kararı.",
      video: "/writtenby/ekran.mp4", poster: "/writtenby/poster.jpg", telefon: "writtenby. ekranı: günün sorusu, tek satır ve basım izni",
      adimlar: [
        { b: "Günün sorusu.", s: "Her sabah herkese aynı soru gelir. İstersen soruyu bırakıp özgür bir satır da yazabilirsin." },
        { b: "Tek satır.", s: "Bulunduğun yerden, en fazla 140 karakter. Günde yalnız bir satır; yazdıktan sonra değişmez." },
        { b: "Yıl sonunda kitap.", s: "Satırlar Berkay Doğan tarafından derlenir ve basılı bir kitap olur. Kitaba girenlere haber verilir." },
      ],
      ek: { etiket: "İkinci katman", link: "Sanatçılar →", href: "/writtenby/sanatcilar" },
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
  byEtiket: "What by means",
  by: [
    "<em>by</em> means standing beside something: a place, a moment.",
    "<em>by</em> means living through something: a line, a frequency.",
    "And <em>by</em> is a signature: <em>written by</em>. Everything that leaves this workshop carries a writer's signature.",
  ],
  islerEtiket: "From the workshop",
  isler: [
    {
      id: "hereby", ad: "hereby", renk: MOR, soru: "Where?", href: "/en/hereby", link: "Meet hereby. →",
      m: "Leave the line on your mind at the place you pass. Only someone who comes to that place can read it. Poetry walks with lines from the books, time capsules, notes to self.",
      ilke: "No trace is counted or ranked.",
      video: "/by/hereby-ekran.mp4", poster: "/hereby/vitrin-3.jpg", telefon: "The hereby. app screen",
      adimlar: [
        { b: "Leave.", s: "On a ferry pier, on a staircase, by the sea: write what is on your mind. 280 characters at most." },
        { b: "Walk.", s: "Traces stay locked on the map. No reading from afar: they open when you are about 300 metres away." },
        { b: "Read, and leave one beside it.", s: "The quiet conversation of people who lived on the same corner in different years: \"I was here too…\"" },
      ],
    },
    {
      id: "nowby", ad: "nowby", renk: TURUNCU, soru: "When?", href: "/en/nowby", link: "Meet nowby. →",
      m: "What is playing on Türkiye's radio right now? Hundreds of frequencies on one screen, live. Charts built on real airplay counts, the world's radio, and a Frequency Fortune with lines from the books.",
      ilke: "It counts songs, not people.",
      cihazBaslik: "The same station, the same song on five devices.",
      cihazlar: [
        { tur: "tv", c: "Apple TV", b: "In the living room, huge.", s: "Song titles you can read from the couch.", alt: "nowby. on Apple TV: the song playing now on the big screen" },
        { tur: "mac", c: "Mac", b: "On your desk, in a side panel.", s: "A sidebar, song cards and a full-width player along the bottom.", alt: "nowby. on Mac: sidebar, song cards and player" },
        { tur: "ipad", c: "iPad", b: "On your lap, three columns.", s: "Sidebar, song cards and the big player on one screen.", alt: "nowby. on iPad: three-column layout" },
        { tur: "iphone", c: "iPhone", b: "In your pocket, live.", s: "Hundreds of stations with the song playing right now.", alt: "nowby. on iPhone: the live station list" },
        { tur: "saat", c: "Apple Watch", b: "On your wrist, one tap.", s: "A remote for the player on your phone; catch the song from there.", alt: "nowby. on Apple Watch: the song playing and the Catch button" },
      ],
    },
    {
      id: "writtenby", ad: "writtenby", renk: MOR, soru: "Who?", href: "/en/writtenby", link: "Meet writtenby. →",
      m: "A book written by a city. Every day, the same question for everyone; one line from where you stand. Only those who come to that place can read it. At year's end the lines become a printed book, and no line is printed without permission. First book: Istanbul 2027.",
      ilke: "Getting into the book isn't a prize, it's an editorial choice.",
      video: "/writtenby/ekran.mp4", poster: "/writtenby/poster.jpg", telefon: "The writtenby. screen: the question of the day, one line and print permission",
      adimlar: [
        { b: "The question of the day.", s: "Every morning everyone gets the same question. You can also skip it and write a free line." },
        { b: "One line.", s: "From where you are, up to 140 characters. Only one line a day; it can't be changed once written." },
        { b: "A book at year's end.", s: "Berkay Doğan compiles the lines into a printed book. Those included are notified." },
      ],
      ek: { etiket: "The second layer", link: "Artists →", href: "/en/writtenby/artists" },
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
