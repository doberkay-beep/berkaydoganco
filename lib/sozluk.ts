/* Kavramlar Sözlüğü — kitaplardaki anahtar kavramlar, Berkay'ın KENDİ
   tanım cümleleriyle (tamamı doğrulanmış korpustan; üretilmiş tanım yok). */

export type Kavram = {
  ad: string;
  tanim: string;         // korpustaki birebir cümle
  k: "mvk" | "tas";
  p?: number;
};

export const KAVRAMLAR: Kavram[] = [
  { ad: "Tasfiye", tanim: "Tasfiye, yıkmak değil; temizlemektir.", k: "tas" },
  { ad: "Yazmak", tanim: "Yazmak, varoluşun en sessiz itirafıdır.", k: "mvk" },
  { ad: "Yaşamak", tanim: "Yaşamak, biraz da geride posa bırakmaktır.", k: "tas", p: 89 },
  { ad: "Gerçek", tanim: "Gerçek, yağlarından arındığında ortaya çıkan kemiktir.", k: "tas" },
  { ad: "Cesaret", tanim: "Cesaret, korkunun yokluğu değil, korkuya rağmen adım atabilme iradesidir.", k: "tas", p: 41 },
  { ad: "Özgürlük", tanim: "Özgürlük, cehaletin o sahte lütfuna sığınmadan, gerçeğin ağırlığını taşıyarak ayakta kalabilme iradesidir.", k: "tas", p: 96 },
  { ad: "Düşünmek", tanim: "Düşünmek, zihnin kendisine karşı bir devrim yapmasıdır.", k: "tas", p: 25 },
  { ad: "Kimlik", tanim: "Kimlik, bir çapa değil, bir yelkendir.", k: "tas", p: 130 },
  { ad: "Statü", tanim: "Statü, yalnızca ona inanan başkalarının bakışlarında var olabilen bir seraptır.", k: "tas", p: 85 },
  { ad: "Konfor", tanim: "Prangalarımız demirden değil, kadifeden yapılmıştır.", k: "tas", p: 40 },
  { ad: "Dil", tanim: "Dil, düşüncenin hem evi hem de en hassas terazisidir.", k: "tas", p: 82 },
  { ad: "İnsan olmak", tanim: "İnsan olmak, ışığı kesmek ve bir gölge düşürmek demektir.", k: "tas", p: 79 },
  { ad: "Unutmak", tanim: "Affetmek, statükoyu korur; unutmak ise yeniye kapı açar.", k: "tas", p: 124 },
  { ad: "Yalnızlık", tanim: "Yalnızlık, bir ceza değil, bir zorunluluktur.", k: "tas", p: 127 },
  { ad: "Kaçış", tanim: "Kaçış dediğiniz şey, artık dış dünyadan bir yere gitmek değil, kendi zihninizin merkezine bir krallık kurmaktır.", k: "tas", p: 140 },
  { ad: "Gidiş", tanim: "Gidiş, bir kaçış değil, bir manifestodur; bir varoluş tarzının reddi ve bir başkasının arayışıdır.", k: "tas", p: 143 },
  { ad: "Şair", tanim: "Sistemin çarkları arasında bir şair olmak, öğütücü bir makinenin içine atılmış ince bir cam kristali olmaktır.", k: "tas", p: 95 },
  { ad: "Hayat", tanim: "Hayat, formüllere indirgenemeyecek kadar zengin ve trajiktir.", k: "tas", p: 83 },
  { ad: "Kötülük", tanim: "Kötülüğün bir yerlerden üzerimize çöktüğüne inanmak safdilliktir; kötülük ekilir, filizlenir ve büyür.", k: "tas", p: 77 },
  { ad: "İtaat", tanim: "İtaat etmenin bedeli, kendi ruhunun ritmine yabancılaşmaktır.", k: "tas", p: 59 },
  { ad: "Kökler", tanim: "İnsanın kökleri ayaklarında değil, zihnindedir.", k: "tas", p: 103 },
  { ad: "Çaba", tanim: "Çaba, hak edenlere verilen çok nadide bir hobidir.", k: "mvk", p: 154 },
];
