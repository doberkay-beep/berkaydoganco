/* MASADA — yazılmakta olan işler. YALNIZ Berkay'ın açıkladığı ya da onayladığı bilgi:
   Tasfiye II + ilk roman: Edebiyat Magazin söyleşisi (4 Eki 2026).
   İnfaz: çalışma adı, şiir; Berkay ana sayfada/kitaplarda gösterilmesini istedi (6 Eki 2026).
   Dize, bölüm adı, sayfa sayısı YAZILMAZ (taslak kararları onun). */

export type Masa = { ad: string; tur: { tr: string; en: string }; durum: { tr: string; en: string } };

export const MASADA: Masa[] = [
  { ad: "İnfaz", tur: { tr: "Şiir · çalışma adı", en: "Poetry · working title" }, durum: { tr: "Şiirler seçiliyor", en: "Poems being selected" } },
  { ad: "Tasfiye II", tur: { tr: "Deneme · dört ciltlik dizinin ikinci cildi", en: "Essays · second of four volumes" }, durum: { tr: "Yazılıyor", en: "In progress" } },
  { ad: "İlk roman", tur: { tr: "Roman · isimsiz bir anlatıcının iç çözülüşü", en: "Novel · a nameless narrator’s inner unravelling" }, durum: { tr: "Hedef: 2027", en: "Aim: 2027" } },
];
