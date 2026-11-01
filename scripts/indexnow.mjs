// IndexNow: canlı site haritasındaki bütün adresleri Bing/Yandex'e bildirir.
//   node scripts/indexnow.mjs              (hepsi)
//   node scripts/indexnow.mjs /hereby/ /tek-soz/   (yalnız verilen yollar)
// Anahtar dosyası public/<ANAHTAR>.txt olarak yayında olmalı.
const SITE = "https://www.berkaydogan.co";
const ANAHTAR = "77c2ad502edb187dada29d9b089efc3e";

const yollar = process.argv.slice(2);
let adresler;
if (yollar.length) {
  adresler = yollar.map((y) => SITE + (y.startsWith("/") ? y : `/${y}`));
} else {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  adresler = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const yanit = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: "www.berkaydogan.co", key: ANAHTAR, keyLocation: `${SITE}/${ANAHTAR}.txt`, urlList: adresler }),
});
console.log(`${adresler.length} adres bildirildi → HTTP ${yanit.status}`);
