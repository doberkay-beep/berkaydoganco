#!/usr/bin/env node
// frameby. künye kontrolü (TASLAK)
// Kullanım: node scripts/frameby-kunye-kontrol.mjs [katalog.json]
//   Çevrimdışı: her arşiv karesinde fotografci + lisans + kaynak alanı var mı?
//   SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY tanımlıysa ayrıca: katalogdaki her kare izin kaydında var mı,
//   yayında mı (geri çekilmemiş, süresi dolmamış), kayıttaki lisans katalogdakiyle aynı mı?
// Bir sorun bulursa sıfırdan farklı çıkış koduyla biter; yayına almadan önce çalıştırılır.
import { readFileSync } from "node:fs";

const yol = process.argv[2] || "public/frameby/katalog.json";
const katalog = JSON.parse(readFileSync(yol, "utf8"));
const sorunlar = [];

for (const k of katalog.kareler) {
  if (k.katman === "arsiv") {
    for (const alan of ["fotografci", "lisans", "kaynak"]) {
      if (!k[alan]) sorunlar.push(`${k.id}: arşiv karesinde "${alan}" yok`);
    }
    if (k.kaynak && !/^https:\/\//.test(k.kaynak)) sorunlar.push(`${k.id}: kaynak bir https bağlantısı değil`);
  }
}

const url = process.env.SUPABASE_URL, anahtar = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (url && anahtar) {
  const yanit = await fetch(`${url}/rest/v1/frameby_yayinlanabilir?select=kare_id,izin_turu,lisans,kaynak_sayfa,yayinda`, {
    headers: { apikey: anahtar, authorization: `Bearer ${anahtar}` },
  });
  if (!yanit.ok) throw new Error(`izin kaydı okunamadı: ${yanit.status}`);
  const kayit = new Map((await yanit.json()).map((r) => [r.kare_id, r]));
  for (const k of katalog.kareler) {
    const r = kayit.get(k.id);
    if (!r) { sorunlar.push(`${k.id}: izin kaydı yok`); continue; }
    if (!r.yayinda) sorunlar.push(`${k.id}: izin geri çekilmiş ya da süresi dolmuş`);
    if (k.katman === "arsiv" && r.kaynak_sayfa && k.kaynak && r.kaynak_sayfa !== k.kaynak)
      sorunlar.push(`${k.id}: katalogdaki kaynak kayıttakiyle aynı değil`);
  }
  const katalogIdleri = new Set(katalog.kareler.map((k) => k.id));
  for (const id of kayit.keys()) if (!katalogIdleri.has(id)) console.log(`bilgi: ${id} kayıtta var, katalogda yok`);
} else {
  console.log("bilgi: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY yok; yalnız çevrimdışı kontrol yapıldı");
}

if (sorunlar.length) {
  console.error(`${sorunlar.length} sorun:\n` + sorunlar.map((s) => "  - " + s).join("\n"));
  process.exit(1);
}
console.log(`tamam: ${katalog.kareler.length} karenin künyesi eksiksiz`);
