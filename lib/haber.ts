/* Ana sayfanın "son dakika" satırı (ödül sonucu, yeni yayın gibi tek bir duyuru).
   null iken hiçbir şey görünmez. Yalnız Berkay'ın teyit ettiği haber girilir; metin onun onayıyla.
   Örnek: { tarihISO: "2026-11-30", metin: "…", url: "/press/" } */

export type Haber = { tarihISO: string; metin: string; url?: string; metinEn?: string };

export const SON_HABER: Haber | null = null;
