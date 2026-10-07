export type Lang = "en" | "tr";
export const LANGS: Lang[] = ["tr", "en"];

// Kanonik site + yazar entity kimliği. Tüm sayfalar aynı Person @id'sine
// referans versin ki Google "Berkay Doğan" varlığını tek entity olarak
// birleştirsin (Knowledge Graph / yazar tanınırlığı).
export const SITE_URL = "https://www.berkaydogan.co";
export const PERSON_ID = `${SITE_URL}/#person`;
// Sayfalarda yazar referansı — kendi başına anlamlı + @id ile konsolide.
export const AUTHOR_REF = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Berkay Doğan",
  url: SITE_URL,
} as const;

export const TRENDYOL_URL =
  "https://www.trendyol.com/iskenderiye-kitap/murekkep-ve-koz-berkay-dogan-p-1072536167";
export const SUBSTACK_URL = "https://doberkay.substack.com";
export const YOUTUBE_URL = "https://youtube.com/@yazarberkaydogan";
export const INSTAGRAM_URL = "https://instagram.com/berkaydgn__";
export const EMAIL = "do.berkay@icloud.com";
export const GOODREADS_URL = "https://www.goodreads.com/book/show/252900764-m-rekkep-ve-k-z";
export const VALSANAT_URL = "https://online.fliphtml5.com/jqzww/ezec/#p=1";

/* Tasfiye çıktı (25 Ağustos 2026) — satın alma bağlantısı */
export const TASFIYE_URL =
  "https://www.trendyol.com/pd/iskenderiye-kitap/tasfiye-berkay-dogan-p-1189808209?boutiqueId=61&merchantId=130994";

/* ---- Dilden bağımsız paylaşılan veri ---- */
export const RETAILERS: { name: string; url: string }[] = [
  { name: "Trendyol", url: TRENDYOL_URL },
  { name: "İskenderiye Kitap", url: "https://www.iskenderiyekitap.com/urun/murekkep-ve-koz-bir-sairin-hesabi-berkay-dogan-9786259620329" },
  { name: "Kitapyurdu", url: "https://www.kitapyurdu.com/kitap/murekkep-ve-koz/740626.html" },
  { name: "D&R", url: "https://www.dr.com.tr/kitap/murekkep-ve-koz-bir-sairin-hesabi/berkay-dogan/edebiyat/siir/turk-siiri/urunno=0002206580001" },
  { name: "Hepsiburada", url: "https://www.hepsiburada.com/murekkep-ve-koz-pm-HBC0000BKT7HI" },
  { name: "BKM Kitap", url: "https://www.bkmkitap.com/murekkep-ve-koz" },
  { name: "İstanbul Kitapçısı", url: "https://www.istanbulkitapcisi.com/murekkep-ve-koz" },
  { name: "Maltepe Kitabevi", url: "https://www.maltepekitabevi.com/murekkep-ve-koz" },
];

// Okur yorumları orijinal dilinde (Türkçe) — çeviri anlamı bozar
export const REVIEWS: { text: string; source: string; kitap: string }[] = [
  // Her kayıt TEK okurun yorumu, aynen (6 Eki 2026'da Trendyol'la karşılaştırıldı; Berkay seçti).
  { text: "Mürekkep ve Köz, kelimelerin köz gibi yavaşça içe işlediği bir şiir yolculuğu. Sade ama güçlü bir anlatım. Uzun zamandır bu kadar dokunan şiirler okumamıştım.", source: "Trendyol", kitap: "Mürekkep ve Köz" },
  { text: "Okurken düşündüren ve hayatı sorgulatan bir kitap. Eline ve kalemine sağlık", source: "Trendyol", kitap: "Tasfiye" },
  { text: "İlk başta eğreti gibi gelen gizemli şiirlerin arasına serpiştirilmiş, hayrete düşüren güzellikte şiirler. İlerledikçe kilim gibi dokunmuş sayfalar. Filozof olsan yadırgamazdım. Mükemmel.", source: "Reddit · r/Kitap", kitap: "Mürekkep ve Köz" },
  { text: "Genç bir ruhun ülkemizde nasıl ruh halleri zincirinden geçtiğinin kanıtı, bu kalemden çıkacak yeni eserleri merakla bekliyorum.", source: "Trendyol", kitap: "Mürekkep ve Köz" },
  { text: "Bu kadar genç bir şairden böyle bir performans çok başarılı. muhakkak okunmalı. tebrikler.", source: "Trendyol", kitap: "Mürekkep ve Köz" },
  { text: "İçinden geldiği gibi, genç ve anlatısı kuvvetli bir kitap! Başarılarının devamını diliyorum...", source: "Trendyol", kitap: "Mürekkep ve Köz" },
  { text: "Zevkle okudum bitirdim. Kalemine, ellerine ve yüreğine sağlık 🧿", source: "Trendyol", kitap: "Tasfiye" },
  { text: "Bir genç şairden beklenmedik keskinlikte ve şaşırtıcı derecede güzel.", source: "Trendyol", kitap: "Mürekkep ve Köz" },
  { text: "Harika bir kitap, şimdiye kadar okuduğum şiir kitaplarından çok farklı. Okumak isteyenlere tavsiye ederim.", source: "Trendyol", kitap: "Mürekkep ve Köz" },
];

export const MEDIA = {
  spotifyShow: "033qeXeBwqI0ZArYivqfaL",
  episodes: ["300KHr8v7m33NSdFjmuhkr", "4YA4VwZqZ4UgLjBdq9gIBG"],
  youtube: "SV7C6fD8gh8",
};

// "Yazarın dinledikleri" — Berkay'ın Apple Music çalma listeleri.
// music.apple.com'daki yolun tamamı; embed = https://embed.music.apple.com + yol.
export const PLAYLISTS: { name: string; path: string }[] = [
  { name: "Art of Rock", path: "/tr/playlist/art-of-rock/pl.u-leylNkAiM5Wqjba" },
  { name: "B Feels Energic", path: "/tr/playlist/b-feels-energic/pl.u-LdbqB2js29NJx87" },
  { name: "Timeless Nostalgia", path: "/tr/playlist/timeless-nostalgia/pl.u-BNA6yaRteGA41Lk" },
];

/* Söz korpusu lib/sozler.ts'te yaşar (138 yayımlanmış satır, temalı).
   Günün közü ve takvim bu düz listeden okur. */
export { TUM_SOZLER as VERSES, SOZLER, temadan } from "./sozler";

type Book = { title: string; meta: string; badge: string; desc: string; cta: string; excerpt: string; excerptNote?: string };

export type Copy = {
  nav: { books: string; about: string; writing: string; contact: string; film: string; sozler: string };
  banner: { line: string; buy: string; watch: string };
  card: { label: string; heading: string; sub: string; random: string; download: string; hint: string };
  yazilar: { title: string; sub: string; all: string; read: string; on: string; empty: string };
  taste: string;
  hero: { role: string; line: string; lineNote?: string; sub: string; ctaBooks: string; ctaAbout: string; scroll: string };
  about: { label: string; heading: string; paras: string[]; worksLabel: string; works: { year: string; title: string; kind: string; href?: string }[] };
  books: { label: string; murekkep: Book; tasfiye: Book; countdown: string[]; epigraph: string; coverSoon: string; buyMore: string };
  recognition: { label: string; heading: string; tiles: { value: string; label: string }[]; pressLabel: string };
  reviews: { label: string; heading: string };
  kozu: { label: string; share: string; copied: string; universe: string };
  media: { label: string; heading: string; podcast: string; podcastDesc: string; video: string };
  notify: { title: string; placeholder: string; button: string; note: string };
  teaser: { label: string; cta: string };
  writing: { label: string; line: string; cta: string };
  contact: { label: string; line: string };
};

// Kitaptan kısa teaser — Berkay'ın gerçek dizeleri
export const TEASER_LINES = ["Yıkılamadım, yıktım.", "Yalan yaşanmışlıklarıma veda ettim."];

export const site: Record<Lang, Copy> = {
  en: {
    nav: { books: "Books", about: "About", writing: "Writing", contact: "Contact", film: "Film", sozler: "Quotes" },
    banner: { line: "Tasfiye, the new book of essays, is out.", buy: "Get the book", watch: "Watch the film" },
    card: {
      label: "Quote card", heading: "Pick a verse, share it",
      sub: "Choose one of the verses and download it as a card.",
      random: "Shuffle", download: "Download card", hint: "Saves as PNG",
    },
    yazilar: {
      title: "Writing", sub: "On poetry, literature and ideas — quietly, on Substack.",
      all: "All posts on Substack", read: "Read", on: "on Substack",
      empty: "The writing lives on Substack. Follow it there.",
    },
    taste: "A taste",
    hero: {
      role: "Poet & Writer — Istanbul",
      line: "Yazmak, varoluşun en sessiz itirafıdır.",
      lineNote: "literally: “Writing is the quietest confession of existence.”",
      sub: "He began writing at seventeen. For eight years he wrote in silence; then, in ten months, came two books, a film and a radio platform.",
      ctaBooks: "The books", ctaAbout: "About", scroll: "Scroll",
    },
    about: {
      label: "About", heading: "Poet, writer, founder of ŞİMDİ",
      paras: [
        "He began writing at seventeen. For eight years he wrote in silence; then, in ten months, came two books, a film and a radio platform.",
        "Berkay Doğan is a poet and writer based in Istanbul. For him, writing is not a choice but a necessity. Every day he does not write is a day he betrays himself.",
        "He began writing in 2017, at seventeen. For most, that age is still a threshold of innocence; for him it was the moment he started to see the true face of society. Since then, what feeds him is life itself more than literature: a pair of eyes, a building riddled with holes, walking again, as a changed man, through streets he once knew.",
        "His first book, Mürekkep ve Köz: Bir Şairin Hesabı (“Ink and Ember: A Poet’s Reckoning”, 2025), was wrenched out of a suffocating solitude, national chaos and existential crisis. His second, Tasfiye (Turkish for “purge” or “cleansing”), is a critique of the existing order — a call to revive the dose of philosophy we have lost. Between the two runs a reckoning that stretches from poetry to essay.",
        "Poetry and radio are born in the same place: in listening. In 2026 he founded ŞİMDİ (necaliyor.co), which shows — and counts — what is playing right now across Turkey's radio stations: a poet chasing after sound.",
      ],
      worksLabel: "The journey",
      works: [
        { year: "2017", title: "Began writing", kind: "At seventeen" },
        { year: "Dec 2025", title: "Mürekkep ve Köz (Ink and Ember)", kind: "Poetry · #1 most visited on Trendyol", href: "/en/#murekkep-ve-koz" },
        { year: "Jun 2026", title: "Şairin Hesabı (The Poet’s Reckoning)", kind: "Podcast", href: "/video#dinle" },
        { year: "Aug 2026", title: "Tasfiye", kind: "Essays", href: "/en/#tasfiye" },
        { year: "Aug 2026", title: "ŞİMDİ", kind: "Live radio · necaliyor.co", href: "https://necaliyor.co" },
        { year: "Sep 2026", title: "TASFİYE: Film", kind: "Short film · 8 min", href: "/film" },
      ],
    },
    books: {
      label: "Books",
      murekkep: { title: "Mürekkep ve Köz", meta: "Poetry · İskenderiye Yayınları · 2025 · in Turkish", badge: "#1 Poetry on Trendyol", desc: "Literally “Ink and Ember: A Poet’s Reckoning”. More than 200 poems written out of a suffocating solitude, national chaos and existential crisis.", cta: "Buy on Trendyol", excerpt: "Yıkılamadım, yıktım.", excerptNote: "literally: “I could not be torn down; I tore down.”" },
      tasfiye: { title: "Tasfiye", meta: "Essays · İskenderiye Yayınları · August 2026 · in Turkish", badge: "Out now", desc: "The curtain rises: on stage, a courtroom; in the dock, the writer himself. Not an accusation — a reckoning. From the wreckage of the modern world, a confrontation reaching toward the person who carries their own guillotine.", cta: "Buy on Trendyol", excerpt: "“görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isim.”", excerptNote: "literally: “a name given to everything we choose to ignore.”" },
      countdown: ["DAYS", "HRS", "MIN"], epigraph: "görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isim.", coverSoon: "Cover soon",
      buyMore: "Also available at",
    },
    recognition: {
      label: "Recognition", heading: "The reckoning, in numbers",
      tiles: [
        { value: "#1", label: "Most visited poetry title on Trendyol" },
        { value: "10/10", label: "Reader rating on 1000Kitap" },
        { value: "51", label: "Poem published in Valsanat magazine, issue 51" },
      ],
      pressLabel: "In the press",
    },
    reviews: { label: "Readers", heading: "What readers say" },
    kozu: { label: "Ember of the day", share: "Share", copied: "Copied", universe: "Ember Calendar" },
    media: { label: "Media", heading: "The Poet's Reckoning", podcast: "Listen — Podcast", podcastDesc: "Conversations on poetry, literature and ideas. On Spotify and every platform.", video: "Watch — YouTube" },
    notify: { title: "Don't miss the launch", placeholder: "your email", button: "Notify me", note: "One quiet email when Tasfiye is out. Nothing else." },
    teaser: { label: "From the book", cta: "Continue in the book" },
    writing: { label: "Writing", line: "Thoughts, quietly — one email away.", cta: "Read on Substack" },
    contact: { label: "Contact", line: "Write — about the work, a collaboration, or whatever's on your mind. The door is open." },
  },
  tr: {
    nav: { books: "Kitaplar", about: "Hakkımda", writing: "Yazılar", contact: "İletişim", film: "Film", sozler: "Sözler" },
    banner: { line: "Tasfiye çıktı — yıkmak değil; temizlemek.", buy: "Kitabı al", watch: "Filmi izle" },
    card: {
      label: "Alıntı kartı", heading: "Bir dize seç, paylaş",
      sub: "Dizelerden birini seç, güzel bir kart olarak indir.",
      random: "Karıştır", download: "Kartı indir", hint: "PNG olarak iner",
    },
    yazilar: {
      title: "Yazılar", sub: "Şiir, edebiyat ve düşünceler üzerine — gürültüsüz, Substack'te.",
      all: "Tüm yazılar Substack'te", read: "Oku", on: "Substack'te",
      empty: "Yazılar Substack'te. Oradan takip et.",
    },
    taste: "Tadımlık",
    hero: {
      role: "Şair & Yazar — İstanbul",
      line: "Yazmak, varoluşun en sessiz itirafıdır.",
      sub: "17 yaşında yazmaya başladı. Sekiz yıl sessizce yazdı; sonra on ayda iki kitap, bir film ve bir radyo.",
      ctaBooks: "Kitaplar", ctaAbout: "Hakkımda", scroll: "Kaydır",
    },
    about: {
      label: "Hakkımda", heading: "Şair, yazar, ŞİMDİ'nin kurucusu",
      paras: [
        "17 yaşında yazmaya başladı. Sekiz yıl sessizce yazdı; sonra on ayda iki kitap, bir film ve bir radyo.",
        "Berkay Doğan, İstanbul'da yaşayan şair ve yazardır. Onun için yazmak bir tercih değil, bir zorunluluktur: yazmak, varoluşun en sessiz itirafıdır. Yazmadığı her gün, kendine ihanet ettiği bir gündür.",
        "Yazıya 2017'de, on yedi yaşında başladı. O yaş çoğu için masumiyetin sürdüğü bir eşikti; onun içinse toplumun gerçek yüzünü görmeye başladığı an oldu. O günden bu yana onu besleyen şey, edebiyatın kendisinden çok hayatın kendisidir: bir çift göz, delik deşik mimari bir yapı, eskiden geçtiği sokakları değişmiş bir adam olarak yeniden geçmek.",
        "İlk kitabı Mürekkep ve Köz: Bir Şairin Hesabı (2025) boğucu bir yalnızlığın, ulusal kaosun ve varoluşsal krizin içinden sökülerek yazıldı. İkinci kitabı Tasfiye ise mevcut düzene bir eleştiri, kaybettiğimiz felsefi dozun yeniden hayata çağrılmasıdır. İkisi arasında, şiirden denemeye uzanan bir hesaplaşma vardır.",
        "Şiir de radyo da aynı yerden doğar: dinlemekten. 2026'da kurduğu ŞİMDİ (necaliyor.co), Türkiye'nin radyolarında tam da bu an ne çaldığını gösterir ve sayar — bir şairin sesin peşine düşmesi.",
      ],
      worksLabel: "Yolculuk",
      works: [
        { year: "2017", title: "Yazmaya başladı", kind: "On yedi yaşında" },
        { year: "Ara 2025", title: "Mürekkep ve Köz: Bir Şairin Hesabı", kind: "Şiir · Trendyol Şiir'de #1", href: "/kitaplar/murekkep-ve-koz" },
        { year: "Haz 2026", title: "Şairin Hesabı", kind: "Podcast", href: "/video#dinle" },
        { year: "Ağu 2026", title: "Tasfiye", kind: "Deneme", href: "/kitaplar/tasfiye" },
        { year: "Ağu 2026", title: "ŞİMDİ", kind: "Canlı radyo · necaliyor.co", href: "https://necaliyor.co" },
        { year: "Eyl 2026", title: "TASFİYE: Film", kind: "Kısa film · 8 dk", href: "/film" },
      ],
    },
    books: {
      label: "Kitaplar",
      murekkep: { title: "Mürekkep ve Köz", meta: "Şiir · İskenderiye · 2025", badge: "#1 Trendyol Şiir", desc: "Bir Şairin Hesabı. Boğucu bir yalnızlığın, ulusal kaosun ve varoluşsal krizin içinden sökülerek yazılan 200'den fazla şiir.", cta: "Kitaba git", excerpt: "Yıkılamadım, yıktım." },
      tasfiye: { title: "Tasfiye", meta: "Deneme · İskenderiye · Ağustos 2026", badge: "Çıktı", desc: "Perde açılıyor: Sahnede bir mahkeme, sanık koltuğunda yazarın kendisi. Bu bir suçlama değil, bir hesap. Modern dünyanın enkazından, giyotinini kendi taşıyan insana uzanan bir yüzleşme. Tasfiye, yıkmak değil; temizlemektir.", cta: "Trendyol'da satın al", excerpt: "“görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isim.”" },
      countdown: ["GÜN", "SAAT", "DK"], epigraph: "görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isim.", coverSoon: "Kapak yakında",
      buyMore: "Ayrıca şuralarda",
    },
    recognition: {
      label: "Tanınırlık", heading: "Hesaplaşma, rakamlarla",
      tiles: [
        { value: "#1", label: "Trendyol Şiir — En Çok Ziyaret" },
        { value: "10/10", label: "1000Kitap okur puanı" },
        { value: "51", label: "Valsanat Dergisi — 51. sayı, şiir yayınlandı" },
      ],
      pressLabel: "Basında",
    },
    reviews: { label: "Okurlardan", heading: "Okurlar ne diyor" },
    kozu: { label: "Günün közü", share: "Paylaş", copied: "Kopyalandı", universe: "Köz Takvimi" },
    media: { label: "Medya", heading: "Şairin Hesabı", podcast: "Dinle — Podcast", podcastDesc: "Şiir, edebiyat ve düşünceler üzerine konuşmalar. Spotify'da ve tüm platformlarda.", video: "İzle — YouTube" },
    notify: { title: "Lansmanı kaçırma", placeholder: "e-posta adresin", button: "Haber ver", note: "Tasfiye çıkınca tek bir e-posta. Başka hiçbir şey." },
    teaser: { label: "Kitaptan", cta: "Devamı kitapta" },
    writing: { label: "Yazılar", line: "Aklımdan geçenler, gürültüsüz — bir e-posta uzaklıkta.", cta: "Substack'te oku" },
    contact: { label: "İletişim", line: "Yaz — iş için, bir iş birliği için ya da sadece aklındakiler için. Kapı açık." },
  },
};
