/* Ekran arşivi — TV, video röportaj, podcast konuklukları (tek kaynak).
   Yeni çıkış: en üste bir kayıt ekle; /medya "Ekran" bölümü ve /press
   "Basında" bölümü buradan beslenir. Liste boşken bölümler görünmez.
   YALNIZ GERÇEKLEŞMİŞ yayınlar girilir; teyitsiz/ileri tarihli kayıt eklenmez. */

export type Ekran = {
  tarihISO: string;   // yayın tarihi
  kanal: string;      // "Business Channel Türk"
  baslik: string;     // "Tasfiye üzerine söyleşi"
  tur: "tv" | "video" | "podcast";
  link?: string;      // varsa izleme bağlantısı (YouTube vb.)
};

export const EKRAN: Ekran[] = [];
