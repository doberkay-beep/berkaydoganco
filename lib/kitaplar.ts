import { TRENDYOL_URL } from "./site";

/* Kitap sayfaları + /git/[kanal] yönlendirme verisi (tek kaynak).
   Tasfiye ISBN'i Berkay teyit etti: 978-625-9031-24-8 (kapak provasındaki
   92142-2-1 geçersiz). */

export type Kanal = { name: string; git: string };
export type Alinti = { text: string; sayfa: string };

export type Kitap = {
  slug: string;
  ad: string;
  altBaslik: string;
  etiket: string;        // üst bant sol (YENİ KİTAP / ŞİİR)
  cikis: string;         // üst bant sağ
  kapak: string;         // orijinal görsel
  kapak400: string;      // srcset küçük boy
  kapakW: number;        // orijinal genişlik
  kunye: { k: string; v: string }[];
  arkaKapak: string[];   // paragraflar
  epigraf?: string;
  alintilar: Alinti[];
  kanallar: Kanal[];
  isbn: string | null;
  sayfaSayisi: number | null;
  datePublished: string;
  tur: string;
  fiyat: string | null;  // TRY — schema Offer için
  desc: string;          // meta description — arka kapağın ilk cümlesi
};

/* /git/[kanal] hedefleri — Vercel Analytics'te her kanal ayrı sayfa görüntülemesi
   olarak sayılır. Bilinmeyen kanal ana sayfaya döner. */
export const GIT_HEDEFLER: Record<string, string> = {
  // Tasfiye
  "trendyol": "https://ty.gl/0fc28a9d0",
  "bkmkitap": "https://www.bkmkitap.com/tasfiye-982681",
  "kitapstore": "https://www.kitapstore.com/urun/785011/kitap/iskenderiye-kitap/berkay-dogan/tasfiye/",
  "iskenderiye": "https://www.iskenderiyekitap.com/urun/tasfiye-berkay-dogan-9786259031248",
  // Mürekkep ve Köz
  "mvk-trendyol": TRENDYOL_URL,
  "mvk-bkmkitap": "https://www.bkmkitap.com/murekkep-ve-koz",
  "mvk-iskenderiye": "https://www.iskenderiyekitap.com/urun/murekkep-ve-koz-bir-sairin-hesabi-berkay-dogan-9786259620329",
};

export const KITAPLAR: Kitap[] = [
  {
    slug: "tasfiye",
    ad: "Tasfiye",
    altBaslik: "Bir Yazarın Hesabı",
    etiket: "Yeni kitap",
    cikis: "25 Ağustos 2026",
    kapak: "/tasfiye-on-kapak.jpg",
    kapak400: "/tasfiye-kapak-400.jpg",
    kapakW: 745,
    tur: "Deneme",
    isbn: "978-625-9031-24-8",
    fiyat: "289",
    sayfaSayisi: 151,
    datePublished: "2026-08-25",
    desc: "Perde açılıyor: Sahnede bir mahkeme, sanık koltuğunda yazarın kendisi.",
    kunye: [
      { k: "Tür", v: "Deneme" },
      { k: "Yayınevi", v: "İskenderiye Yayınları" },
      { k: "Sayfa", v: "151" },
      { k: "Boyut", v: "13,5 × 21 cm" },
      { k: "Kapak", v: "Karton" },
      { k: "Yayın No", v: "223" },
      { k: "ISBN", v: "978-625-9031-24-8" },
      { k: "Çıkış", v: "25 Ağustos 2026" },
    ],
    arkaKapak: [
      "Perde açılıyor: Sahnede bir mahkeme, sanık koltuğunda yazarın kendisi. Bu bir suçlama değil, bir hesap. Modern dünyanın enkazından, giyotinini kendi taşıyan insana uzanan bir yüzleşme. Tasfiye, yıkmak değil; temizlemektir.",
    ],
    alintilar: [
      { text: "Bize ezilenlerin değil, ezenlerin tarafına geçme umudu satıldı.", sayfa: "S. 15" },
      { text: "Kendi karanlığını bilmeyen insan, aydınlık uğruna dünyayı ateşe vermekten çekinmez.", sayfa: "S. 79" },
      { text: "Yaşamak, biraz da geride posa bırakmaktır.", sayfa: "S. 89" },
      { text: "Biz şehri terk ettiğimizde, anılarımız o şehrin taşlarına, duvarlarına emanet edilir.", sayfa: "S. 100" },
    ],
    kanallar: [
      { name: "Trendyol", git: "trendyol" },
      { name: "bkmkitap", git: "bkmkitap" },
      { name: "KitapStore", git: "kitapstore" },
      { name: "İskenderiye Yayınları", git: "iskenderiye" },
    ],
  },
  {
    slug: "murekkep-ve-koz",
    ad: "Mürekkep ve Köz",
    altBaslik: "Bir Şairin Hesabı",
    etiket: "Şiir",
    cikis: "2025",
    kapak: "/murekkep-ve-koz-on-kapak.jpg",
    kapak400: "/murekkep-kapak-400.jpg",
    kapakW: 800,
    tur: "Şiir",
    isbn: "978-625-9620-32-9", // baskı PDF'inden doğrulanmış
    fiyat: "269",
    sayfaSayisi: 183,
    datePublished: "2025-12",
    desc: "Bu kitap, kelimelerin değil; küllerinden yeniden doğmayı seçmiş bir ruhun sesidir.",
    epigraf: "Yazmak, varoluşun en sessiz itirafıdır.",
    kunye: [
      { k: "Tür", v: "Şiir" },
      { k: "Yayınevi", v: "İskenderiye Yayınları" },
      { k: "Sayfa", v: "183" },
      { k: "Yayın No", v: "212" },
      { k: "ISBN", v: "978-625-9620-32-9" },
      { k: "Çıkış", v: "2025" },
    ],
    arkaKapak: [
      "Bu kitap, kelimelerin değil; küllerinden yeniden doğmayı seçmiş bir ruhun sesidir. Sınır tanımayan, aklın zincirlerini kırmış, özgürlüğe kendi bedeniyle meydan okuyan bir sesin…",
      "Burada, acı bir yük değil; gerçeğe açılan bir kapı vardır.",
      "Bu dizeler; yalnızlığıyla barışmış, çocukluğunu toprağa gömmüş, sevmenin ve sevilmenin ağırlığı altında şekillenmiş bir ruhun iç hesaplaşmasıdır.",
      "Sözler hem bir isyanın hem de bir teslimiyetin izlerini taşır.",
      "Ve sonunda: Yalanlara, sahte yaşanmışlıklara, zincirlere veda eden birinin gürültüsüz ama yenilmez sessizliği kalır geriye.",
      "Bu kitap, o sessizliğin yankısıdır.",
      "Ben artık sadece kendimim.",
      "Ve ben yeniden doğdum; şimdi sıra sende.",
    ],
    alintilar: [], // Berkay dolduracak — boşken bölüm gizli
    kanallar: [
      { name: "Trendyol", git: "mvk-trendyol" },
      { name: "bkmkitap", git: "mvk-bkmkitap" },
      { name: "İskenderiye Yayınları", git: "mvk-iskenderiye" },
    ],
  },
];
