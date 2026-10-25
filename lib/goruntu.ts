/* GÖRÜNTÜ VE DİZE — Berkay'ın Canon EOS R50 fotoğrafları (public/goruntu/, meta verisi temizlenmiş)
   ve her birinin yanında lib/sozler.ts'teki doğrulanmış bir dize. Dize uydurulmaz; yalnız korpustan. */

export type Kare = { no: string; w: number; h: number; s: string; k: "mvk" | "tas"; p?: number };

export const KARELER: Kare[] = [
  { no: "0219", w: 1067, h: 1600, s: "Nereye gittiğiniz değil, nasıl yürüdüğünüz önemlidir.", k: "tas", p: 130 },
  { no: "0135", w: 1600, h: 1067, s: "Belki de kimlik, bir cevap değil, sürekli bir sorudur.", k: "tas", p: 129 },
  { no: "0084", w: 1067, h: 1600, s: "Acı bir yük değil; gerçeğe açılan bir kapı vardır.", k: "mvk" },
  { no: "0388", w: 1067, h: 1600, s: "Ah yalnızlığım bir sen kaldın bana bu dünyadan.", k: "mvk", p: 100 },
  { no: "0406", w: 1067, h: 1600, s: "Yazmak, varoluşun en sessiz itirafıdır.", k: "mvk" },
  { no: "0334", w: 1600, h: 1067, s: "Bir umut daha gökyüzünden kaydı, olmayacakların içine.", k: "mvk", p: 28 },
  { no: "0323", w: 1600, h: 1067, s: "Ben yine seni seçtim İstanbul.", k: "mvk", p: 115 },
  { no: "0306", w: 1067, h: 1600, s: "Geriye bakmamak, bir inkâr değil, ileriye doğru atılan adımın hakkını vermektir.", k: "tas", p: 101 },
  { no: "0555", w: 1067, h: 1600, s: "Biz şehri terk ettiğimizde, anılarımız o şehrin taşlarına, duvarlarına emanet edilir.", k: "tas", p: 100 },
  { no: "0967", w: 1600, h: 1067, s: "Manifestomuz, bir yere varmayı değil, yolda olmayı yüceltir.", k: "tas", p: 102 },
  { no: "0941", w: 1600, h: 1067, s: "İnan ki ben bu yüzyıla alışamadım.", k: "mvk", p: 87 },
  { no: "0234", w: 1067, h: 1600, s: "Oyunun içinde, sistemin atamadığı bir yerdeyim.", k: "mvk", p: 17 },
  { no: "0599", w: 1600, h: 1067, s: "Gürültünün ve hızın kesilmediği bir yerde tohum çatlayamaz.", k: "tas", p: 96 },
  { no: "0734", w: 1067, h: 1600, s: "Bilmeyene labirent, bilenlere dev bir sanat galerisi gibisin.", k: "mvk", p: 115 },
  { no: "1274", w: 1600, h: 1067, s: "Yeniden kendi içime dönüyorum.", k: "mvk" },
  { no: "1136", w: 1600, h: 1067, s: "İnsan olmak, ışığı kesmek ve bir gölge düşürmek demektir.", k: "tas", p: 79 },
  { no: "0720", w: 1067, h: 1600, s: "Renginizi kaçırmayın.", k: "mvk" },
  { no: "0254", w: 1600, h: 1067, s: "Ânı yaşadım, ani yaşadım.", k: "mvk", p: 80 },
];
