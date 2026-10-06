/* GECE VARDİYASI NOTLARI — Berkay'ın vardiya molasında yazdığı kısa notlar.
   Metin HİÇ değiştirilmez (yazım dahil, bilinçli tercih). Yeni not EN ÜSTE.
   Güvenlik: uçuş/kapı/yolcu ayrıntısı ve iş yeri fotoğrafı yok. */

export type Not = { no: number; tarihISO: string; saat: string; metin: string; video?: string };

export const NOTLAR: Not[] = [
  {
    no: 1,
    tarihISO: "2026-10-06",
    saat: "02:15",
    video: "https://www.youtube.com/shorts/lYh00B_ASCs",
    metin:
      "Bir sefer numarası, bir sürü giden insan... Ve ben burada gidemeyenlerin, bir türlü gitmeyenlerin izleyeniyim sadece. İçimde gitme arzusunun yaktığı ateşin bekçisi miyim?",
  },
];
