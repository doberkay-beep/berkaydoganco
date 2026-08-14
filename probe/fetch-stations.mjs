// FAZ 0 — Adım 1: İstasyon listesini çek ve probe/stations.json'a yaz.
// Çalıştır: node probe/fetch-stations.mjs

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { fetchTrStations } from "./lib/radio-browser.mjs";
import { manualStations } from "./lib/manual-stations.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const outPath = join(here, "stations.json");

async function main() {
  console.log("Radio Browser'dan TR istasyonları çekiliyor...");
  const { server, stations } = await fetchTrStations({ limit: 60 });
  console.log(`  ✓ ${stations.length} TR istasyonu alındı (sunucu: ${server})`);

  const all = [...stations, ...manualStations];
  console.log(`  + ${manualStations.length} elle eklenen yabancı istasyon`);

  await mkdir(here, { recursive: true });
  await writeFile(outPath, JSON.stringify(all, null, 2) + "\n", "utf8");
  console.log(`Toplam ${all.length} istasyon → ${outPath}`);
}

main().catch((err) => {
  console.error("HATA:", err.message);
  process.exitCode = 1;
});
