// YouTube kanal arşivi — build sırasında kanalın RSS beslemesinden çekilir
// (API anahtarı gerekmez). Statik export: liste her deploy'da tazelenir.
// Besleme en yeni ~15 videoyu verir; yeter — arşiv büyüdükçe elle EK_VIDEOLAR'a taşınır.

const KANAL_ID = "UCQk65e3_qucD8XvEaeTGctg"; // youtube.com/@yazarberkaydogan
export const KANAL_URL = "https://youtube.com/@yazarberkaydogan";

export type Video = {
  id: string;
  baslik: string;
  tarih: string; // ISO
  aciklama: string;
  izlenme: number | null;
  shorts: boolean;
};

// Besleme kapsamından düşen eski videolar buraya elle eklenir (yeni → eski).
const EK_VIDEOLAR: Video[] = [];

function alan(xml: string, etiket: string): string {
  const m = xml.match(new RegExp(`<${etiket}[^>]*>([\\s\\S]*?)</${etiket}>`));
  return m ? m[1].trim() : "";
}

export async function sonVideolar(): Promise<Video[]> {
  try {
    const r = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${KANAL_ID}`, {
      headers: { "User-Agent": "Mozilla/5.0 (berkaydogan.co build)" },
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const xml = await r.text();
    const girdiler = xml.split("<entry>").slice(1);
    const liste: Video[] = girdiler.map((g) => {
      const id = alan(g, "yt:videoId");
      const link = g.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? "";
      const izlenmeM = g.match(/views="(\d+)"/);
      return {
        id,
        baslik: alan(g, "title").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
        tarih: alan(g, "published"),
        aciklama: alan(g, "media:description").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
        izlenme: izlenmeM ? Number(izlenmeM[1]) : null,
        shorts: link.includes("/shorts/"),
      };
    }).filter((v) => v.id);
    const idler = new Set(liste.map((v) => v.id));
    return [...liste, ...EK_VIDEOLAR.filter((v) => !idler.has(v.id))];
  } catch {
    return EK_VIDEOLAR; // besleme ulaşılamazsa nazikçe elle liste
  }
}

export function videoUrl(v: Video): string {
  return v.shorts ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`;
}

export function kapakUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
