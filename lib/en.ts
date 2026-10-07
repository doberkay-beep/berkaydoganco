/* İngilizce tanıtım sayfası (/en/) verisi — TASLAK, Berkay onaylamadan yayına girmez.
   KURAL: Dize/söz ÇEVRİLMEZ. Kitaptan bir satır gösterilecekse Türkçe aslıyla (lang="tr").
   Buradaki her şey düzyazı tanıtım metni: künye, kitap tanıtımı, söyleşi konuları.
   Kitap adları Türkçe kalır; yanında yalnız "literally / Turkish for" açıklaması. */

export type EnBook = {
  slug: string;
  title: string;          // Türkçe asıl ad
  subtitle: string;       // Türkçe alt başlık
  gloss: string;          // İngilizce açıklama (çeviri yayını değil)
  genre: string;
  published: string;
  pages: number;
  isbn: string;
  blurb: string[];        // düzyazı — korpus satırı içermez
  original?: string;      // Türkçe asıl (korpustan, çevrilmeden)
};

export const EN_BOOKS: EnBook[] = [
  {
    slug: "tasfiye",
    title: "Tasfiye",
    subtitle: "Bir Yazarın Hesabı",
    gloss: "Turkish for “purge” or “cleansing” — subtitle: A Writer’s Reckoning",
    genre: "Essays",
    published: "25 August 2026",
    pages: 151,
    isbn: "978-625-9031-24-8",
    blurb: [
      "The curtain rises on a courtroom, and the writer himself is in the dock. Not an accusation but a reckoning: from the wreckage of the modern world, a confrontation that reaches toward the person who carries their own guillotine.",
      "Its subtitle answers the first book’s: after A Poet’s Reckoning, A Writer’s Reckoning.",
    ],
    original: "Tasfiye, yıkmak değil; temizlemektir.",
  },
  {
    slug: "murekkep-ve-koz",
    title: "Mürekkep ve Köz",
    subtitle: "Bir Şairin Hesabı",
    gloss: "Literally “Ink and Ember” — subtitle: A Poet’s Reckoning",
    genre: "Poetry",
    published: "December 2025",
    pages: 183,
    isbn: "978-625-9620-32-9",
    blurb: [
      "Berkay Doğan’s debut collection gathers more than 200 poems written out of a suffocating solitude, national chaos and existential crisis.",
      "It became the most visited title in the poetry category of the Turkish e-commerce platform Trendyol and holds a 10/10 reader rating on the Turkish reading platform 1000Kitap.",
    ],
    original: "Yazmak, varoluşun en sessiz itirafıdır.",
  },
];

export const EN_FACTS: { k: string; v: string }[] = [
  { k: "Name", v: "Berkay Doğan" },
  { k: "Role", v: "Poet and writer · founder of ŞİMDİ" },
  { k: "Based in", v: "Istanbul, Turkey" },
  { k: "Writes in", v: "Turkish" },
  { k: "Publisher", v: "İskenderiye Yayınları (Istanbul)" },
  { k: "Books", v: "Mürekkep ve Köz (poetry, 2025) · Tasfiye (essays, 2026)" },
  { k: "Film", v: "TASFİYE: Film — short film, 8 min, narrated in Turkish by the author (YouTube, September 2026)" },
  { k: "Radio", v: "ŞİMDİ — a live view and count of what Turkey’s radio stations are playing (necaliyor.co)" },
  { k: "Podcast", v: "Şairin Hesabı (“The Poet’s Reckoning”), on Spotify" },
  { k: "Pronunciation", v: "Ber-kai Doh-ahn (the ğ is silent; it lengthens the vowel before it)" },
];

export const EN_RECOGNITION: { value: string; label: string }[] = [
  { value: "#1", label: "Most visited poetry title on Trendyol (Mürekkep ve Köz)" },
  { value: "10/10", label: "Reader rating on 1000Kitap, a Turkish reading community" },
  { value: "No. 51", label: "Poem published in Valsanat magazine, issue 51" },
];

export const EN_TOPICS: string[] = [
  "Eight silent years, then two books, a film and a radio platform in ten months: a writer’s accelerating year",
  "A poet who started counting Turkey’s radio stations: ŞİMDİ and its monthly radio index",
  "The book that puts its reader in the dock: Tasfiye’s courtroom concept",
  "From page to screen: TASFİYE: Film, with text from the book and the author’s own voice",
  "From poetry to essay: the path from Mürekkep ve Köz to Tasfiye",
  "Depth in the age of social media: the “empty can” (boş teneke) critique",
];

export const EN_IMAGES: { name: string; file: string; note: string }[] = [
  { name: "Author portrait", file: "/images/portre.jpg", note: "B&W · JPG" },
  { name: "Mürekkep ve Köz — front cover", file: "/murekkep-ve-koz-on-kapak.jpg", note: "800×1244 · JPG" },
  { name: "Tasfiye — front cover", file: "/tasfiye-on-kapak.jpg", note: "745×1201 · JPG" },
  { name: "BD seal (logo)", file: "/muhur.png", note: "512×512 · PNG" },
  { name: "BD seal — vector", file: "/muhur.svg", note: "SVG" },
];
