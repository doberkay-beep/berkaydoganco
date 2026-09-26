import { YAYINDA } from "@/lib/yazilar";

export const dynamic = "force-static";

const SITE = "https://www.berkaydogan.co";

function kacir(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// /feed.xml — site yazılarının RSS beslemesi (statik üretilir).
export async function GET() {
  const ogeler = [...YAYINDA]
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
    .map((y) => {
      const url = `${SITE}/yazilar/${y.slug}/`;
      const govde = y.paras.slice(0, 2).join(" ");
      return [
        "<item>",
        `<title>${kacir(y.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<pubDate>${new Date(y.dateISO).toUTCString()}</pubDate>`,
        `<description>${kacir(y.dek)} ${kacir(govde)}…</description>`,
        "</item>",
      ].join("");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>Berkay Doğan — Yazılar</title>
<link>${SITE}/yazilar/</link>
<description>Şair ve yazar Berkay Doğan'ın site yazıları.</description>
<language>tr</language>
${ogeler}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
