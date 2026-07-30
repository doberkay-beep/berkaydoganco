export type Lang = "en" | "tr" | "fr";
export const LANGS: Lang[] = ["en", "tr", "fr"];

export const TRENDYOL_URL =
  "https://www.trendyol.com/iskenderiye-kitap/murekkep-ve-koz-berkay-dogan-p-1072536167";
export const SUBSTACK_URL = "https://doberkay.substack.com";
export const YOUTUBE_URL = "https://youtube.com/@yazarberkaydogan";
export const INSTAGRAM_URL = "https://instagram.com/berkaydgn__";
export const EMAIL = "do.berkay@icloud.com";

type Book = {
  title: string; meta: string; badge: string; desc: string; cta: string;
};

type Copy = {
  nav: { books: string; about: string; writing: string; contact: string };
  hero: { role: string; line: string; sub: string; ctaBooks: string; ctaAbout: string; scroll: string };
  about: { label: string; heading: string; paras: string[]; worksLabel: string; works: { year: string; title: string; kind: string }[] };
  books: { label: string; murekkep: Book; tasfiye: Book; countdown: string[]; epigraph: string; coverSoon: string };
  writing: { label: string; line: string; cta: string };
  contact: { label: string; line: string; emailLabel: string };
};

export const site: Record<Lang, Copy> = {
  en: {
    nav: { books: "Books", about: "About", writing: "Writing", contact: "Contact" },
    hero: {
      role: "Poet & Writer — Istanbul",
      line: "Writing is the quietest confession of existence.",
      sub: "Berkay Doğan writes in the space between contradictions — darkness and oxygen, ruin and the will to rebuild.",
      ctaBooks: "The books", ctaAbout: "About", scroll: "Scroll",
    },
    about: {
      label: "About",
      heading: "The writer",
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
      murekkep: { title: "Ink and Ember", meta: "Poetry · İskenderiye · 2025", badge: "#1 Poetry on Trendyol", desc: "A Poet's Reckoning. More than 200 poems torn from a suffocating solitude, national chaos and existential crisis.", cta: "Get the book" },
      tasfiye: { title: "Tasfiye", meta: "Essay · İskenderiye · August 2026", badge: "Coming soon", desc: "", cta: "" },
      countdown: ["DAYS", "HRS", "MIN"],
      epigraph: "a name given to everything we choose not to see.",
      coverSoon: "Cover soon",
    },
    writing: { label: "Writing", line: "Thoughts, quietly — one email away.", cta: "Read on Substack" },
    contact: { label: "Contact", line: "Not for small talk — write if something in you is truly bleeding.", emailLabel: "Email" },
  },
  tr: {
    nav: { books: "Kitaplar", about: "Hakkımda", writing: "Yazılar", contact: "İletişim" },
    hero: {
      role: "Şair & Yazar — İstanbul",
      line: "Yazmak, varoluşun en sessiz itirafıdır.",
      sub: "Berkay Doğan çelişkilerin arasındaki boşlukta yazar — karanlık ile oksijen, enkaz ile yeniden kurma iradesi arasında.",
      ctaBooks: "Kitaplar", ctaAbout: "Hakkımda", scroll: "Kaydır",
    },
    about: {
      label: "Hakkımda",
      heading: "Yazar",
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
      murekkep: { title: "Mürekkep ve Köz", meta: "Şiir · İskenderiye · 2025", badge: "#1 Trendyol Şiir", desc: "Bir Şairin Hesabı. Boğucu bir yalnızlığın, ulusal kaosun ve varoluşsal krizin içinden sökülerek yazılan 200'den fazla şiir.", cta: "Kitaba git" },
      tasfiye: { title: "Tasfiye", meta: "Deneme · İskenderiye · Ağustos 2026", badge: "Yakında", desc: "", cta: "" },
      countdown: ["GÜN", "SAAT", "DK"],
      epigraph: "görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isim.",
      coverSoon: "Kapak yakında",
    },
    writing: { label: "Yazılar", line: "Aklımdan geçenler, gürültüsüz — bir e-posta uzaklıkta.", cta: "Substack'te oku" },
    contact: { label: "İletişim", line: "Havadan sudan konuşmak için değil — gerçekten kanayan bir yaran varsa yaz.", emailLabel: "E-posta" },
  },
  fr: {
    nav: { books: "Livres", about: "À propos", writing: "Écrits", contact: "Contact" },
    hero: {
      role: "Poète & Écrivain — Istanbul",
      line: "Écrire est l'aveu le plus silencieux de l'existence.",
      sub: "Berkay Doğan écrit dans l'espace entre les contradictions — l'obscurité et l'oxygène, la ruine et la volonté de reconstruire.",
      ctaBooks: "Les livres", ctaAbout: "À propos", scroll: "Défiler",
    },
    about: {
      label: "À propos",
      heading: "L'écrivain",
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
      murekkep: { title: "Encre et Braise", meta: "Poésie · İskenderiye · 2025", badge: "#1 Poésie sur Trendyol", desc: "Les comptes d'un poète. Plus de 200 poèmes arrachés à une solitude étouffante, au chaos national et à une crise existentielle.", cta: "Voir le livre" },
      tasfiye: { title: "Tasfiye", meta: "Essai · İskenderiye · Août 2026", badge: "Bientôt", desc: "", cta: "" },
      countdown: ["JOURS", "H", "MIN"],
      epigraph: "un nom donné à tout ce que nous choisissons d'ignorer.",
      coverSoon: "Couverture bientôt",
    },
    writing: { label: "Écrits", line: "Mes pensées, sans bruit — à un e-mail près.", cta: "Lire sur Substack" },
    contact: { label: "Contact", line: "Pas pour bavarder — écris si quelque chose en toi saigne vraiment.", emailLabel: "E-mail" },
  },
};
