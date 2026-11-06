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
const EK_VIDEOLAR: Video[] = [
  { id: "N3pN0KBLu24", baslik: "Kendi Kitabımın Sanık Sandalyesinde Oturdum | Tasfiye Duruşması", tarih: "2026-10-07T12:00:00Z", aciklama: "Beraat mı, tasfiye mi? Karar senin; yoruma yaz.", izlenme: null, shorts: false },
  { id: "YmMk8NG5QO4", baslik: "TASFİYE: Film — Bir Yazarın Hesabı | Berkay Doğan", tarih: "2026-09-29T12:00:00Z", aciklama: "Perde açılıyor. Sahne boş. Gitmeye hazır mısınız? Tasfiye — Bir Yazarın Hesabı'nın dünyasından 8 dakikalık bir kısa film.", izlenme: null, shorts: false },
  { id: "KCNMUtiehSA", baslik: "Antrenman Sezonu Bitti", tarih: "2026-09-26T12:00:00Z", aciklama: "kimse beklemiyordu. ben de kimseye söylemedim.", izlenme: null, shorts: true },
  { id: "5ctxZ4-J9Cc", baslik: "giyotinimizi kendi omuzlarımızda taşıyoruz", tarih: "2026-07-15T12:00:00Z", aciklama: "ucuz parfüm, ter ve kronik uykusuzluk. sabah metrosu.", izlenme: null, shorts: false },
  { id: "SV7C6fD8gh8", baslik: "Bir Şairin Hesaplaşması: Mürekkep ve Köz Nasıl Yazıldı?", tarih: "2026-05-13T12:00:00Z", aciklama: "2017'de başlayan sessiz bir isyan, 2022'de biten koca bir hesaplaşma ve 2025'te ellerimde tuttuğum ilk göz ağrım: Mürekkep ve Köz.", izlenme: null, shorts: false },
];

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
    // Boş canlı yayın kaydı ve eski marka adıyla kalan video arşivde görünmesin.
    const gosterilen = liste.filter((v) => !/Canlı Yayını|^ŞİMDİ/.test(v.baslik));
    const idler = new Set(gosterilen.map((v) => v.id));
    return [...gosterilen, ...EK_VIDEOLAR.filter((v) => !idler.has(v.id))];
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
