// FAZ 0 — Adım 2-4: Her istasyonu ICY metadata için yokla, kaliteyi ölç,
// probe/rapor.csv üret ve terminale özet bas.
// Çalıştır (önce fetch-stations.mjs): node probe/probe.mjs

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { probeIcy } from "./lib/icy.mjs";
import { classify } from "./lib/classify.mjs";
import { toCsv } from "./lib/csv.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const stationsPath = join(here, "stations.json");
const reportPath = join(here, "rapor.csv");

const ROUNDS = 3; // 3 kez ölç
const ROUND_GAP_MS = 40_000; // 40 saniye arayla
const BATCH_SIZE = 5; // paralel değil, 5'erli gruplar
const TIMEOUT_MS = 8_000; // istek zaman aşımı

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Bir tur: tüm istasyonları 5'erli gruplar halinde yoklar.
// HLS istasyonları ICY vermez → yoklanmaz, atlandı işaretlenir.
async function runRound(stations, roundNo) {
  const results = new Map();
  const targets = stations.filter((s) => !s.hls);
  console.log(`\n── Tur ${roundNo}/${ROUNDS} (${targets.length} istasyon, ${BATCH_SIZE}'erli) ──`);

  for (let i = 0; i < targets.length; i += BATCH_SIZE) {
    const batch = targets.slice(i, i + BATCH_SIZE);
    const settled = await Promise.all(
      batch.map(async (s) => {
        const res = await probeIcy(s.url, { timeout: TIMEOUT_MS });
        return [s.stationuuid, res];
      }),
    );
    for (const [uuid, res] of settled) {
      results.set(uuid, res);
      const s = batch.find((x) => x.stationuuid === uuid);
      const info =
        res.status === "ok"
          ? res.title || "(başlık boş)"
          : `(${res.status}: ${res.reason || ""})`;
      console.log(`   ${s.name} → ${info}`);
    }
  }
  return results;
}

async function main() {
  let stations;
  try {
    stations = JSON.parse(await readFile(stationsPath, "utf8"));
  } catch {
    console.error(`stations.json bulunamadı. Önce: node probe/fetch-stations.mjs`);
    process.exitCode = 1;
    return;
  }
  console.log(`${stations.length} istasyon yüklendi. Toplam süre ~${((ROUNDS - 1) * ROUND_GAP_MS) / 1000}sn + yoklama.`);

  // Her istasyon için tur sonuçlarını topla.
  const perStation = new Map(stations.map((s) => [s.stationuuid, []]));
  for (let r = 1; r <= ROUNDS; r++) {
    const roundResults = await runRound(stations, r);
    for (const s of stations) {
      const res = s.hls
        ? { status: "hls" }
        : roundResults.get(s.stationuuid) || { status: "dead", reason: "sonuç-yok" };
      perStation.get(s.stationuuid).push(res);
    }
    if (r < ROUNDS) {
      console.log(`   ...${ROUND_GAP_MS / 1000}sn bekleniyor`);
      await sleep(ROUND_GAP_MS);
    }
  }

  // Sınıflandır + CSV satırları üret.
  const header = [
    "istasyon", "uuid", "url", "https_var_mi", "codec", "bitrate",
    "kalite", "ornek_baslik_1", "ornek_baslik_2", "ornek_baslik_3",
  ];
  const counts = { good: 0, static: 0, junk: 0, none: 0, dead: 0, hls: 0 };
  const rows = [];

  for (const s of stations) {
    const rounds = perStation.get(s.stationuuid);
    const kalite = classify(s, rounds);
    counts[kalite] = (counts[kalite] || 0) + 1;

    const sample = (r) => {
      if (!r) return "";
      if (r.status === "ok") return r.title || "";
      if (r.status === "none") return "(metadata yok)";
      if (r.status === "hls") return "(hls, atlandı)";
      return "(bağlanamadı)";
    };

    rows.push([
      s.name,
      s.stationuuid,
      s.url,
      s.url?.startsWith("https:") ? "evet" : "hayır",
      s.codec,
      s.bitrate,
      kalite,
      sample(rounds[0]),
      sample(rounds[1]),
      sample(rounds[2]),
    ]);
  }

  await writeFile(reportPath, toCsv(header, rows), "utf8");

  // Terminal özeti.
  console.log("\n═══ ÖZET ═══");
  for (const k of ["good", "static", "junk", "none", "dead", "hls"]) {
    console.log(`  ${k.padEnd(7)}: ${counts[k] || 0}`);
  }
  console.log(`\nRapor → ${reportPath}`);
  if ((counts.good || 0) < 15) {
    console.log(
      `\n⚠ good sayısı (${counts.good || 0}) 15'in altında. Faz 1'e geçmeden önce ürün fikrini konuşmalıyız.`,
    );
  }
}

main().catch((err) => {
  console.error("HATA:", err.message);
  process.exitCode = 1;
});
