import { SOZLER } from "@/lib/sozler";

/* ÖĞRENCİLER VE ÖĞRETMENLER — /ogrenciler sayfası ve ana sayfadaki bant aynı
   veriyi kullanır. */

/* Derste tartışmak için: cümleler YALNIZ lib/sozler.ts korpusundan (baskıdan
   doğrulanmış) çekilir; korpusta bulunmayan satır sayfaya hiç girmez.
   Tartışma soruları cümleye ait değildir, öğretmene yardımcı olsun diye yazıldı. */
export const TARTISMA: { s: string; soru: string }[] = [
  { s: "Düşünmek, zihnin kendisine karşı bir devrim yapmasıdır.", soru: "En son ne zaman kendi fikrini değiştirdin? Bu bir yenilgi miydi, bir devrim mi?" },
  { s: "Belki de kimlik, bir cevap değil, sürekli bir sorudur.", soru: "Kimliğimiz bize mi verilir, yoksa her gün yeniden mi yazarız?" },
  { s: "Prangalarımız demirden değil, kadifeden yapılmıştır.", soru: "Bizi rahat ettirirken özgürlüğümüzü kısıtlayan şeyler neler olabilir?" },
  { s: "Cesaret, korkunun yokluğu değil, korkuya rağmen adım atabilme iradesidir.", soru: "Korkmadan yapılan bir şeye cesaret denebilir mi?" },
  { s: "Dil, düşüncenin hem evi hem de en hassas terazisidir.", soru: "Bir şeyi anlatacak kelimemiz yoksa, onu gerçekten düşünebilir miyiz?" },
  { s: "Ben artık sadece kendimim.", soru: "Başkalarının beklentilerinden arınmış bir \"ben\" mümkün mü?" },
];
export const CUMLELER = TARTISMA
  .map((t) => ({ ...t, soz: SOZLER.find((x) => x.s === t.s) }))
  .filter((t): t is typeof t & { soz: NonNullable<typeof t.soz> } => Boolean(t.soz));

export const KONULAR_OGRENCI: [string, string][] = [
  ["Yazmak ve felsefe", "Bir düşünceyi kâğıda dökmek onu nasıl değiştirir? Felsefe ile edebiyatın kesiştiği yer."],
  ["17 yaşında yazmaya başlamak", "Lisenin son yılında başlayan bir yolculuk: sessizce yazılan sekiz yıl ve sonrasında gelen kitaplar."],
  ["Şiirden denemeye", "Mürekkep ve Köz'den Tasfiye'ye: aynı soruları önce dizeyle, sonra düzyazıyla sormak."],
  ["Sosyal medya çağında derinlik", "Her şeyin hızla tüketildiği bir dünyada yavaş düşünmeyi savunmak."],
  ["Yazarını sanık koltuğuna oturtan kitap", "Tasfiye'nin mahkeme kurgusu: yazar kendini yargılarsa ne olur?"],
];

