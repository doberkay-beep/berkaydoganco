/* Deneyimler verisi — hem sayfa bileşeni hem sunucu tarafı JSON-LD kullanır. */

export type Deneyim = {
  href: string; glyph: string;
  tr: string; en: string; fr: string;
  trSub: string; enSub: string; frSub: string;
  trDesc: string; enDesc: string; frDesc: string;
};

export const DENEYIMLER: Deneyim[] = [
  { href: "/mahkeme", glyph: "◈", tr: "Tasfiye Mahkemesi", en: "The Tribunal", fr: "Le Tribunal",
    trSub: "5 soru, 1 hüküm", enSub: "5 questions, 1 verdict", frSub: "5 questions, 1 verdict",
    trDesc: "Sanık koltuğuna otur. Beş sorunun sonunda salon hakkında bir hükme varır — hükümle birlikte Tasfiye'den payına düşen dize verilir.",
    enDesc: "Take the stand. After five questions the court reaches a verdict — and hands you the line from Tasfiye that is yours.",
    frDesc: "Prends place au banc des accusés. Après cinq questions, la cour rend son verdict — et le vers de Tasfiye qui te revient." },
  { href: "/fragman", glyph: "▸", tr: "Fragman", en: "The Trailer", fr: "La Bande-annonce",
    trSub: "kitabın sinematik yolculuğu", enSub: "the book's cinematic journey", frSub: "le voyage cinématique",
    trDesc: "Işıklar söner, perde açılır: Tasfiye'nin sahne sahne kaydırılan sinematik tanıtımı.",
    enDesc: "Lights down, curtain up: Tasfiye's scene-by-scene cinematic trailer.",
    frDesc: "Les lumières s'éteignent, le rideau se lève : la bande-annonce cinématique de Tasfiye." },
  { href: "/kapak", glyph: "✳", tr: "Yaşayan Kapak", en: "The Living Cover", fr: "La Couverture Vivante",
    trSub: "yaz, buruştur, bırak", enSub: "type, crumple, release", frSub: "écris, froisse, lâche",
    trDesc: "Kapağın içine gir: spot ışığında daktiloya yaz, kâğıdı buruştur, közlere bırak.",
    enDesc: "Step inside the cover: type under the spotlight, crumple the page, feed it to the embers.",
    frDesc: "Entre dans la couverture : écris sous le projecteur, froisse la page, offre-la aux braises." },
  { href: "/duvar", glyph: "▤", tr: "Tasfiye Duvarı", en: "The Wall", fr: "Le Mur",
    trSub: "bir şeyi bırak, hafifle", enSub: "let something go", frSub: "laisse partir quelque chose",
    trDesc: "Seni ağırlaştıran bir şeyi yaz, duvara bırak, hafifle — kolektif bir arınma ritüeli.",
    enDesc: "Write down what weighs on you, leave it on the wall, walk lighter — a collective ritual of release.",
    frDesc: "Écris ce qui te pèse, laisse-le sur le mur, repars plus léger — un rituel collectif." },
  { href: "/film", glyph: "▣", tr: "Film", en: "The Film", fr: "Le Film",
    trSub: "35 saniyelik tanıtım", enSub: "a 35-second film", frSub: "un film de 35 secondes",
    trDesc: "Sitenin 35 saniyelik sinematik tanıtımı: mühür, daktilo, mahkeme ve köz.",
    enDesc: "The site's 35-second cinematic film: seal, typewriter, tribunal and ember.",
    frDesc: "Le film de 35 secondes du site : sceau, machine à écrire, tribunal et braise." },
  { href: "/leke", glyph: "❖", tr: "Mürekkep Lekesi", en: "The Ink Blot", fr: "La Tache d'Encre",
    trSub: "sende kalan dize", enSub: "the verse that stays", frSub: "le vers qui reste",
    trDesc: "Dört mürekkep lekesine bak, ne gördüğünü söyle; sende kalan dizeyi ve sana göre kitabı öğren.",
    enDesc: "Look at four ink blots, say what you see; learn the verse that stays with you — and your book.",
    frDesc: "Regarde quatre taches d'encre, dis ce que tu vois ; découvre le vers qui te reste — et ton livre." },
  { href: "/evren", glyph: "✦", tr: "Köz Evreni", en: "Ember Universe", fr: "Univers de Braise",
    trSub: "dize takımyıldızları", enSub: "verse constellations", frSub: "constellations de vers",
    trDesc: "Dizelerden kurulmuş bir gökyüzü: közlere dokun, takımyıldızlar açılsın.",
    enDesc: "A sky built from verses: touch the embers, let constellations unfold.",
    frDesc: "Un ciel fait de vers : touche les braises, laisse s'ouvrir les constellations." },
  { href: "/kahin", glyph: "◉", tr: "Kâhin", en: "The Oracle", fr: "L'Oracle",
    trSub: "bir kelime söyle, dize düşsün", enSub: "say a word, receive a verse", frSub: "dis un mot, reçois un vers",
    trDesc: "Bir kelime söyle; kâhin sana kitaplardan bir dize düşürsün.",
    enDesc: "Say one word; the oracle drops you a verse from the books.",
    frDesc: "Dis un mot ; l'oracle te fait tomber un vers des livres." },
  { href: "/siir", glyph: "❋", tr: "Canlı Şiir", en: "Living Poem", fr: "Poème Vivant",
    trSub: "kelime kelime akan dizeler", enSub: "verses flowing word by word", frSub: "les vers qui coulent",
    trDesc: "Dizeler kelime kelime akar — tam ekran, sinematik bir şiir sahnesi.",
    enDesc: "Verses flow word by word — a full-screen cinematic stage for poetry.",
    frDesc: "Les vers coulent mot à mot — une scène cinématique plein écran." },
  { href: "/masa", glyph: "✎", tr: "Şairin Masası", en: "The Poet's Desk", fr: "Le Bureau du Poète",
    trSub: "keşfedilebilir sahne", enSub: "an explorable scene", frSub: "une scène à explorer",
    trDesc: "Yazarın masası bir sahne: daktilo, radyo, lamba — her nesne bir kapı.",
    enDesc: "The writer's desk as a stage: typewriter, radio, lamp — every object a door.",
    frDesc: "Le bureau de l'écrivain comme une scène : chaque objet est une porte." },
  { href: "/takvim", glyph: "◷", tr: "Köz Takvimi", en: "Ember Calendar", fr: "Calendrier",
    trSub: "her güne bir söz", enSub: "a verse for every day", frSub: "un vers pour chaque jour",
    trDesc: "Yılın her gününe bir söz — bugünün közünü bul, kartını indir.",
    enDesc: "A verse for every day of the year — find today's ember, download its card.",
    frDesc: "Un vers pour chaque jour de l'année — trouve la braise du jour." },
  { href: "/kart", glyph: "▢", tr: "Alıntı Kartı", en: "Quote Card", fr: "Carte de Citation",
    trSub: "dize seç, indir, paylaş", enSub: "pick, download, share", frSub: "choisis, télécharge, partage",
    trDesc: "Bir söz seç; hazırlanan paylaşım kartını indir, hikâyene koy.",
    enDesc: "Pick a verse; download the ready-made card and share it to your story.",
    frDesc: "Choisis un vers ; télécharge la carte prête à partager." },
];

/* Bölümler — dergi fihristinin üç faslı */
export const BOLUMLER: { tr: string; en: string; fr: string; uyeler: string[] }[] = [
  { tr: "Tasfiye'nin sahneleri", en: "Scenes of Tasfiye", fr: "Scènes de Tasfiye", uyeler: ["/mahkeme", "/fragman", "/kapak", "/duvar", "/film"] },
  { tr: "Mürekkep ve Köz'ün dünyası", en: "The world of Ink & Ember", fr: "L'univers d'Encre et Braise", uyeler: ["/leke", "/evren", "/kahin"] },
  { tr: "Sözlerle oyna", en: "Play with the verses", fr: "Joue avec les vers", uyeler: ["/siir", "/masa", "/takvim", "/kart"] },
];

/* Fihrist numaraları — bölüm sırasına göre sabit (render'da sayaç tutma!) */
export const FIHRIST_NO: Record<string, string> = Object.fromEntries(
  BOLUMLER.flatMap((b) => b.uyeler).map((href, i) => [href, String(i + 1).padStart(2, "0")])
);
