export type Lang = "en" | "tr" | "fr";
export const LANGS: Lang[] = ["en", "tr", "fr"];

export const TRENDYOL_URL =
  "https://www.trendyol.com/iskenderiye-kitap/murekkep-ve-koz-berkay-dogan-p-1072536167";
export const SUBSTACK_URL = "https://doberkay.substack.com";
export const YOUTUBE_URL = "https://youtube.com/@yazarberkaydogan";
export const INSTAGRAM_URL = "https://instagram.com/berkaydgn__";
export const EMAIL = "do.berkay@icloud.com";
export const GOODREADS_URL = "https://www.goodreads.com/book/show/252900764-m-rekkep-ve-k-z";
export const VALSANAT_URL = "https://online.fliphtml5.com/jqzww/ezec/#p=1";

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
export const REVIEWS: { text: string; source: string }[] = [
  { text: "Bir genç şairden beklenmedik keskinlikte ve şaşırtıcı derecede güzel. Genç bir ruhun ülkemizde nasıl ruh halleri zincirinden geçtiğinin kanıtı.", source: "Trendyol" },
  { text: "Kelimelerin köz gibi yavaşça içe işlediği bir şiir yolculuğu. Sade ama güçlü bir anlatım. Uzun zamandır bu kadar dokunan şiirler okumamıştım.", source: "Trendyol" },
  { text: "İlk başta eğreti gibi gelen gizemli şiirlerin arasına serpiştirilmiş, hayrete düşüren güzellikte şiirler. İlerledikçe kilim gibi dokunmuş sayfalar. Filozof olsan yadırgamazdım. Mükemmel.", source: "Reddit · r/Kitap" },
  { text: "Harika bir kitap, şimdiye kadar okuduğum şiir kitaplarından çok farklı. Okumak isteyenlere tavsiye ederim.", source: "Trendyol" },
  { text: "Muazzam bir kitap. Bu kalemden çıkacak yeni eserleri merakla bekliyorum.", source: "Trendyol" },
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

// Kâhin ve Günün Közü için dize korpusu — hepsi Berkay'ın kendi eserlerinden (kısa, güçlü)
export const VERSES: string[] = [
  "Yıkılamadım, yıktım.",
  "Geri dönmüyorum, geleceğime âşığım.",
  "Yalan yaşanmışlıklarıma veda ettim.",
  "Kalbim bir gıdım bile kırılmadan devam etti.",
  "Yeniden kendi içime dönüyorum.",
  "Ben artık sadece kendimim.",
  "Ve ben yeniden doğdum; şimdi sıra sende.",
  "Acı bir yük değil; gerçeğe açılan bir kapı vardır.",
  "Küllerinden yeniden doğmayı seçmiş bir ruhun sesidir.",
  "Gerçek, yağlarından arındığında ortaya çıkan kemiktir.",
  "Görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isim.",
];

// Tasfiye Duvarı'nda arka planda süzülen köz parçaları — hepsi Berkay'ın kendi dizelerinden
export const EMBER_FRAGMENTS: string[] = [
  "Yıkılamadım, yıktım.",
  "geleceğime âşığım",
  "gri hayatlar",
  "yalan yaşanmışlıklara veda ettim",
  "yeniden kendi içime dönüyorum",
  "Ben artık sadece kendimim.",
  "renginizi kaçırmayın",
  "bir köz",
  "Ben bir Tanrı değilim.",
  "ve ben yeniden doğdum",
];

type Book = { title: string; meta: string; badge: string; desc: string; cta: string; excerpt: string };

type Copy = {
  nav: { books: string; about: string; writing: string; contact: string; projects: string };
  projects: { label: string; heading: string; sub: string; simdiName: string; simdiTag: string; story: string[]; cta: string };
  card: { label: string; heading: string; sub: string; random: string; download: string; hint: string };
  yazilar: { title: string; sub: string; all: string; read: string; on: string; empty: string };
  taste: string;
  hero: { role: string; line: string; sub: string; ctaBooks: string; ctaAbout: string; scroll: string };
  about: { label: string; heading: string; paras: string[]; worksLabel: string; works: { year: string; title: string; kind: string }[] };
  books: { label: string; murekkep: Book; tasfiye: Book; countdown: string[]; epigraph: string; coverSoon: string; buyMore: string };
  recognition: { label: string; heading: string; tiles: { value: string; label: string }[]; pressLabel: string; press: { name: string; detail: string; url: string }[] };
  reviews: { label: string; heading: string };
  duvari: { label: string; heading: string; sub: string; placeholder: string; button: string; result: string; again: string };
  kozu: { label: string; share: string; copied: string; universe: string };
  kahin: { label: string; heading: string; placeholder: string; button: string; again: string; share: string; copied: string; note: string };
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
    nav: { books: "Books", about: "About", writing: "Writing", contact: "Contact", projects: "Projects" },
    projects: {
      label: "Projects", heading: "Beyond the words",
      sub: "Alongside the writing — things other curiosities have built.",
      simdiName: "ŞİMDİ", simdiTag: "Live radio · necaliyor.co",
      story: [
        "Poetry and radio are born in the same place: in listening. ŞİMDİ (“now”) shows what is playing this very moment across Turkey's radio stations — a poet chasing after sound.",
        "A verse finds you at the right moment; so does the right song. I built ŞİMDİ to catch that “now” — a hundred stations, one screen, a live stream of the present tense.",
      ],
      cta: "Open the radio",
    },
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
      line: "Writing is the quietest confession of existence.",
      sub: "Berkay Doğan writes in the space between contradictions — darkness and oxygen, what breaks and what is built again.",
      ctaBooks: "The books", ctaAbout: "About", scroll: "Scroll",
    },
    about: {
      label: "About", heading: "The writer",
      paras: [
        "Berkay Doğan is a poet and writer based in Istanbul. For him, writing is not a choice but a necessity — the quietest confession of existence. Every day he does not write is a day he betrays himself.",
        "He began writing in 2017, at seventeen. For most, that age is still a threshold of innocence; for him it was the moment he started to see the true face of society. Since then, what feeds him is life itself more than literature: a pair of eyes, a building riddled with holes, walking the streets he once knew as a changed man.",
        "His first book, Ink and Ember: A Poet's Reckoning (2025), was torn from within a suffocating solitude, national chaos, and existential crisis. His second, Tasfiye, is a critique of the existing order — a call to bring back the philosophical dose we have lost. Between the two runs a reckoning that stretches from poetry to essay.",
      ],
      worksLabel: "Selected works",
      works: [
        { year: "2025", title: "Ink and Ember: A Poet's Reckoning", kind: "Poetry" },
        { year: "2026", title: "Tasfiye", kind: "Essay — soon" },
      ],
    },
    books: {
      label: "Books",
      murekkep: { title: "Ink and Ember", meta: "Poetry · İskenderiye · 2025", badge: "#1 Poetry on Trendyol", desc: "A Poet's Reckoning. More than 200 poems torn from a suffocating solitude, national chaos and existential crisis.", cta: "Get the book", excerpt: "I could not be brought down — so I brought it down myself." },
      tasfiye: { title: "Tasfiye", meta: "Essay · İskenderiye · August 2026", badge: "Coming soon", desc: "The curtain rises: on stage, a courtroom; in the dock, the writer himself. Not an accusation — a reckoning. From the wreckage of the modern world, a confrontation reaching toward the human who carries their own guillotine. Tasfiye is not to destroy; it is to cleanse.", cta: "", excerpt: "“a name given to everything we choose not to see.”" },
      countdown: ["DAYS", "HRS", "MIN"], epigraph: "a name given to everything we choose not to see.", coverSoon: "Cover soon",
      buyMore: "Also available at",
    },
    recognition: {
      label: "Recognition", heading: "The reckoning, in numbers",
      tiles: [
        { value: "#1", label: "Poetry on Trendyol — Most Visited" },
        { value: "10/10", label: "Reader score on 1000Kitap" },
        { value: "51", label: "Valsanat Magazine — Issue 51, poem published" },
      ],
      pressLabel: "In the press",
      press: [
        { name: "Valsanat Magazine", detail: "The poem “Ruh-u Katliam”, Issue 51", url: VALSANAT_URL },
        { name: "Goodreads", detail: "Listed in the global author index", url: GOODREADS_URL },
        { name: "Trendyol", detail: "#1 Most Visited in Poetry", url: TRENDYOL_URL },
      ],
    },
    reviews: { label: "Readers", heading: "What readers say" },
    duvari: {
      label: "A small ritual", heading: "What would you set down?",
      sub: "Write one thing you'd rather not carry. Watch it lift and drift away. What stays with you is the lightness.",
      placeholder: "a worry, a weight, a wish…", button: "Let it go",
      result: "It drifted off. You're a little lighter now.", again: "Again",
    },
    kozu: { label: "Ember of the day", share: "Share", copied: "Copied", universe: "Ember Universe" },
    kahin: {
      label: "The oracle", heading: "Say a word. Let a verse fall to you.",
      placeholder: "a word, a feeling…", button: "Summon", again: "Another",
      share: "Share", copied: "Copied", note: "A verse by Berkay Doğan",
    },
    media: { label: "Media", heading: "The Poet's Reckoning", podcast: "Listen — Podcast", podcastDesc: "Conversations on poetry, literature and ideas. On Spotify and every platform.", video: "Watch — YouTube" },
    notify: { title: "Don't miss the launch", placeholder: "your email", button: "Notify me", note: "One quiet email when Tasfiye is out. Nothing else." },
    teaser: { label: "From the book", cta: "Continue in the book" },
    writing: { label: "Writing", line: "Thoughts, quietly — one email away.", cta: "Read on Substack" },
    contact: { label: "Contact", line: "Write — about the work, a collaboration, or whatever's on your mind. The door is open." },
  },
  tr: {
    nav: { books: "Kitaplar", about: "Hakkımda", writing: "Yazılar", contact: "İletişim", projects: "Projeler" },
    projects: {
      label: "Projeler", heading: "Kelimelerin dışında",
      sub: "Yazının yanında — başka merakların ürünleri.",
      simdiName: "ŞİMDİ", simdiTag: "Canlı radyo · necaliyor.co",
      story: [
        "Şiir de radyo da aynı yerden doğar: dinlemekten. ŞİMDİ, Türkiye'nin radyolarında tam da bu an ne çaldığını gösterir — bir şairin sesin peşine düşmesi.",
        "Bir dize insanı doğru anda nasıl bulursa, doğru şarkı da öyle bulur. ŞİMDİ'yi işte o 'şimdi'yi yakalamak için yaptım: yüz radyo, tek ekran, şimdiki zamanın canlı akışı.",
      ],
      cta: "Radyoyu aç",
    },
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
      sub: "Berkay Doğan çelişkilerin arasındaki boşlukta yazar — karanlık ile oksijen, kırılan ile yeniden kurulan arasında.",
      ctaBooks: "Kitaplar", ctaAbout: "Hakkımda", scroll: "Kaydır",
    },
    about: {
      label: "Hakkımda", heading: "Yazar",
      paras: [
        "Berkay Doğan, İstanbul'da yaşayan şair ve yazardır. Onun için yazmak bir tercih değil, bir zorunluluktur: yazmak, varoluşun en sessiz itirafıdır. Yazmadığı her gün, kendine ihanet ettiği bir gündür.",
        "Yazıya 2017'de, on yedi yaşında başladı. O yaş çoğu için masumiyetin sürdüğü bir eşikti; onun içinse toplumun gerçek yüzünü görmeye başladığı an oldu. O günden bu yana onu besleyen şey, edebiyatın kendisinden çok hayatın kendisidir: bir çift göz, delik deşik mimari bir yapı, eskiden geçtiği sokakları değişmiş bir adam olarak yeniden geçmek.",
        "İlk kitabı Mürekkep ve Köz: Bir Şairin Hesabı (2025) boğucu bir yalnızlığın, ulusal kaosun ve varoluşsal krizin içinden sökülerek yazıldı. İkinci kitabı Tasfiye ise mevcut düzene bir eleştiri, kaybettiğimiz felsefi dozun yeniden hayata çağrılmasıdır. İkisi arasında, şiirden denemeye uzanan bir hesaplaşma vardır.",
      ],
      worksLabel: "Eserler",
      works: [
        { year: "2025", title: "Mürekkep ve Köz: Bir Şairin Hesabı", kind: "Şiir" },
        { year: "2026", title: "Tasfiye", kind: "Deneme — yakında" },
      ],
    },
    books: {
      label: "Kitaplar",
      murekkep: { title: "Mürekkep ve Köz", meta: "Şiir · İskenderiye · 2025", badge: "#1 Trendyol Şiir", desc: "Bir Şairin Hesabı. Boğucu bir yalnızlığın, ulusal kaosun ve varoluşsal krizin içinden sökülerek yazılan 200'den fazla şiir.", cta: "Kitaba git", excerpt: "Yıkılamadım, yıktım." },
      tasfiye: { title: "Tasfiye", meta: "Deneme · İskenderiye · Ağustos 2026", badge: "Yakında", desc: "Perde açılıyor: Sahnede bir mahkeme, sanık koltuğunda yazarın kendisi. Bu bir suçlama değil, bir hesap. Modern dünyanın enkazından, giyotinini kendi taşıyan insana uzanan bir yüzleşme. Tasfiye, yıkmak değil; temizlemektir.", cta: "", excerpt: "“görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isim.”" },
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
      press: [
        { name: "Valsanat Dergisi", detail: "“Ruh-u Katliam” şiiri, 51. sayı", url: VALSANAT_URL },
        { name: "Goodreads", detail: "Küresel yazar dizininde", url: GOODREADS_URL },
        { name: "Trendyol", detail: "Şiir kategorisinde #1 En Çok Ziyaret", url: TRENDYOL_URL },
      ],
    },
    reviews: { label: "Okurlardan", heading: "Okurlar ne diyor" },
    duvari: {
      label: "Küçük bir ritüel", heading: "Neyi elinden bırakırdın?",
      sub: "Taşımak istemediğin bir şey yaz. Yüksel ve savrulup gitsin. Sende kalan tek şey hafiflik olsun.",
      placeholder: "bir tasa, bir ağırlık, bir dilek…", button: "Bırak gitsin",
      result: "Savrulup gitti. Şimdi biraz daha hafifsin.", again: "Bir daha",
    },
    kozu: { label: "Günün közü", share: "Paylaş", copied: "Kopyalandı", universe: "Köz Evreni" },
    kahin: {
      label: "Kâhin", heading: "Bir kelime söyle. Sana bir dize düşsün.",
      placeholder: "bir kelime, bir his…", button: "Çağır", again: "Bir daha",
      share: "Paylaş", copied: "Kopyalandı", note: "Berkay Doğan'dan bir dize",
    },
    media: { label: "Medya", heading: "Şairin Hesabı", podcast: "Dinle — Podcast", podcastDesc: "Şiir, edebiyat ve düşünceler üzerine konuşmalar. Spotify'da ve tüm platformlarda.", video: "İzle — YouTube" },
    notify: { title: "Lansmanı kaçırma", placeholder: "e-posta adresin", button: "Haber ver", note: "Tasfiye çıkınca tek bir e-posta. Başka hiçbir şey." },
    teaser: { label: "Kitaptan", cta: "Devamı kitapta" },
    writing: { label: "Yazılar", line: "Aklımdan geçenler, gürültüsüz — bir e-posta uzaklıkta.", cta: "Substack'te oku" },
    contact: { label: "İletişim", line: "Yaz — iş için, bir iş birliği için ya da sadece aklındakiler için. Kapı açık." },
  },
  fr: {
    nav: { books: "Livres", about: "À propos", writing: "Écrits", contact: "Contact", projects: "Projets" },
    projects: {
      label: "Projets", heading: "Au-delà des mots",
      sub: "À côté de l'écriture — ce que d'autres curiosités ont bâti.",
      simdiName: "ŞİMDİ", simdiTag: "Radio en direct · necaliyor.co",
      story: [
        "La poésie et la radio naissent au même endroit : dans l'écoute. ŞİMDİ (« maintenant ») montre ce qui passe en cet instant précis sur les radios de Turquie — un poète à la poursuite du son.",
        "Un vers vous trouve au bon moment ; la bonne chanson aussi. J'ai fait ŞİMDİ pour saisir ce « maintenant » : cent stations, un seul écran, le flux vivant du présent.",
      ],
      cta: "Ouvrir la radio",
    },
    card: {
      label: "Carte-citation", heading: "Choisis un vers, partage-le",
      sub: "Choisis l'un des vers et télécharge-le en carte.",
      random: "Mélanger", download: "Télécharger la carte", hint: "Enregistré en PNG",
    },
    yazilar: {
      title: "Écrits", sub: "Sur la poésie, la littérature et les idées — sans bruit, sur Substack.",
      all: "Tous les textes sur Substack", read: "Lire", on: "sur Substack",
      empty: "Les écrits vivent sur Substack. Suivez-les là-bas.",
    },
    taste: "Extrait",
    hero: {
      role: "Poète & Écrivain — Istanbul",
      line: "Écrire est l'aveu le plus silencieux de l'existence.",
      sub: "Berkay Doğan écrit dans l'espace entre les contradictions — l'obscurité et l'oxygène, ce qui se brise et ce qui se rebâtit.",
      ctaBooks: "Les livres", ctaAbout: "À propos", scroll: "Défiler",
    },
    about: {
      label: "À propos", heading: "L'écrivain",
      paras: [
        "Berkay Doğan est un poète et écrivain basé à Istanbul. Pour lui, écrire n'est pas un choix mais une nécessité — l'aveu le plus silencieux de l'existence. Chaque jour sans écrire est un jour où il se trahit.",
        "Il a commencé à écrire en 2017, à dix-sept ans. Pour la plupart, cet âge est encore un seuil d'innocence ; pour lui, ce fut le moment où il a commencé à voir le vrai visage de la société. Depuis, ce qui le nourrit, c'est la vie elle-même plus que la littérature : une paire d'yeux, un bâtiment criblé de trous, retraverser en homme changé les rues qu'il connaissait jadis.",
        "Son premier livre, Encre et Braise : les comptes d'un poète (2025), a été arraché à une solitude étouffante, au chaos national et à une crise existentielle. Le second, Tasfiye, est une critique de l'ordre établi — un appel à retrouver la dose philosophique que nous avons perdue. Entre les deux court un règlement de comptes qui va de la poésie à l'essai.",
      ],
      worksLabel: "Œuvres choisies",
      works: [
        { year: "2025", title: "Encre et Braise : les comptes d'un poète", kind: "Poésie" },
        { year: "2026", title: "Tasfiye", kind: "Essai — bientôt" },
      ],
    },
    books: {
      label: "Livres",
      murekkep: { title: "Encre et Braise", meta: "Poésie · İskenderiye · 2025", badge: "#1 Poésie sur Trendyol", desc: "Les comptes d'un poète. Plus de 200 poèmes arrachés à une solitude étouffante, au chaos national et à une crise existentielle.", cta: "Voir le livre", excerpt: "Je n'ai pas pu être abattu — alors je l'ai abattu moi-même." },
      tasfiye: { title: "Tasfiye", meta: "Essai · İskenderiye · Août 2026", badge: "Bientôt", desc: "Le rideau se lève : sur scène, un tribunal ; au banc des accusés, l'écrivain lui-même. Non une accusation — un règlement de comptes. Depuis les décombres du monde moderne, une confrontation tendue vers l'humain qui porte sa propre guillotine. Tasfiye n'est pas détruire ; c'est purifier.", cta: "", excerpt: "« un nom donné à tout ce que nous choisissons d'ignorer. »" },
      countdown: ["JOURS", "H", "MIN"], epigraph: "un nom donné à tout ce que nous choisissons d'ignorer.", coverSoon: "Couverture bientôt",
      buyMore: "Également disponible chez",
    },
    recognition: {
      label: "Reconnaissance", heading: "Le règlement de comptes, en chiffres",
      tiles: [
        { value: "#1", label: "Poésie sur Trendyol — Le plus visité" },
        { value: "10/10", label: "Note des lecteurs sur 1000Kitap" },
        { value: "51", label: "Revue Valsanat — n° 51, poème publié" },
      ],
      pressLabel: "Dans la presse",
      press: [
        { name: "Revue Valsanat", detail: "Le poème « Ruh-u Katliam », n° 51", url: VALSANAT_URL },
        { name: "Goodreads", detail: "Répertorié dans l'index mondial des auteurs", url: GOODREADS_URL },
        { name: "Trendyol", detail: "#1 Le plus visité en poésie", url: TRENDYOL_URL },
      ],
    },
    reviews: { label: "Lecteurs", heading: "Ce que disent les lecteurs" },
    duvari: {
      label: "Un petit rituel", heading: "Que déposerais-tu ?",
      sub: "Écris une chose que tu préférerais ne pas porter. Regarde-la s'élever et s'envoler. Ce qui te reste, c'est la légèreté.",
      placeholder: "un souci, un poids, un souhait…", button: "Laisse aller",
      result: "Envolé. Un peu plus léger, à présent.", again: "Encore",
    },
    kozu: { label: "La braise du jour", share: "Partager", copied: "Copié", universe: "Univers de Braise" },
    kahin: {
      label: "L'oracle", heading: "Dis un mot. Qu'un vers te tombe dessus.",
      placeholder: "un mot, un sentiment…", button: "Invoquer", again: "Encore",
      share: "Partager", copied: "Copié", note: "Un vers de Berkay Doğan",
    },
    media: { label: "Médias", heading: "Les comptes du poète", podcast: "Écouter — Podcast", podcastDesc: "Conversations sur la poésie, la littérature et les idées. Sur Spotify et toutes les plateformes.", video: "Regarder — YouTube" },
    notify: { title: "Ne rate pas la sortie", placeholder: "ton e-mail", button: "Préviens-moi", note: "Un seul e-mail à la sortie de Tasfiye. Rien d'autre." },
    teaser: { label: "Extrait", cta: "La suite dans le livre" },
    writing: { label: "Écrits", line: "Mes pensées, sans bruit — à un e-mail près.", cta: "Lire sur Substack" },
    contact: { label: "Contact", line: "Écris — pour le travail, une collaboration, ou ce qui te passe par la tête. La porte est ouverte." },
  },
};
