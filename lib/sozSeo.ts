import type { Soz } from "./sozler";
import { KITAPLAR, type Kitap } from "./kitaplar";
import { TEMA_ADI } from "./sozler";

/* Söz sayfaları için SEO yardımcıları (başlık, açıklama, kaynak künyesi).
   KURAL: söz metnine dokunulmaz — yalnızca baştan, kelime/cümle sınırında
   kısaltılır ve "…" ile kısaltıldığı belli edilir. Uydurma/özet yok. */

export const YAYINEVI = "İskenderiye Yayınları";

const KITAP_SLUG: Record<Soz["k"], string> = {
  mvk: "murekkep-ve-koz",
  tas: "tasfiye",
};

export type SozKaynak = {
  kitap: Kitap;
  sayfa: string;      // /kitaplar/<slug> (sondaki / Next ekler)
  tamAd: string;      // "Mürekkep ve Köz: Bir Şairin Hesabı"
  tur: string;        // "şiir" | "deneme"
  yil: string;        // "2025"
};

export function sozKaynak(soz: Soz): SozKaynak {
  const kitap = KITAPLAR.find((x) => x.slug === KITAP_SLUG[soz.k])!;
  return {
    kitap,
    sayfa: `/kitaplar/${kitap.slug}`,
    tamAd: `${kitap.ad}: ${kitap.altBaslik}`,
    tur: kitap.tur.toLocaleLowerCase("tr"),
    yil: kitap.datePublished.slice(0, 4),
  };
}

// Başlıkta kullanılacak anahtar ifade: söz kısaysa tamamı; uzunsa baştan,
// önce noktalama (cümle/yan cümle) sınırında, olmazsa kelime sınırında kesilir.
export function sozAnahtar(s: string, max = 40): string {
  if (s.length <= max) return s;
  let enIyi = "";
  const sinir = /[.!?;:,…]/g;
  let m: RegExpExecArray | null;
  while ((m = sinir.exec(s)) !== null) {
    const parca = s.slice(0, m.index).trim();
    if (parca.length > max) break;
    if (parca.length >= 26) enIyi = parca; // çok kısa yan cümle yerine kelime sınırı
  }
  if (!enIyi) {
    const kelimeler = s.split(/\s+/);
    for (const k of kelimeler) {
      const aday = enIyi ? `${enIyi} ${k}` : k;
      if (aday.length > max) break;
      enIyi = aday;
    }
    // Sonda kalan sarkık bağlaç/edat ifadeyi yarım bırakmasın
    enIyi = enIyi.replace(/\s+(ve|ile|ya|da|de|ki|bir|için|ama|gibi|en|ne)$/i, "");
  }
  return enIyi.replace(/[\s.,;:!?—–-]+$/, "") + "…";
}

// <title> — "“<söz/anahtar ifade>” — Berkay Doğan sözleri" (~65 karakter)
export function sozTitle(soz: Soz): string {
  return `“${sozAnahtar(soz.s)}” — Berkay Doğan sözleri`;
}

// meta description — söz + kaynak künyesi (+ yer kalırsa tema).
export function sozDescription(soz: Soz): string {
  const k = sozKaynak(soz);
  const kaynak = `Berkay Doğan'ın ${k.kitap.ad} (${k.tur}, ${k.yil}) kitabından${soz.p ? `, s. ${soz.p}` : ""}.`;
  let d = `“${soz.s}” ${kaynak}`;
  const temalar = soz.t.map((t) => TEMA_ADI[t]?.toLocaleLowerCase("tr")).filter((x): x is string => !!x);
  const liste = temalar.length > 1 ? `${temalar.slice(0, -1).join(", ")} ve ${temalar[temalar.length - 1]}` : temalar[0];
  const ek = liste ? ` ${liste.charAt(0).toLocaleUpperCase("tr")}${liste.slice(1)} üzerine sözler.` : "";
  if (ek && d.length + ek.length <= 160) d += ek;
  return d;
}
