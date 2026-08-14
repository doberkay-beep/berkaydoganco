// Üç ölçümün sonucundan kalite sınıfı çıkarır (brief Adım 3).
//
// Sınıflar:
//   good   → başlık üç ölçümde değişti VEYA "Sanatçı - Parça" biçimine uyuyor
//   static → başlık hiç değişmedi (muhtemelen sabit metin)
//   junk   → başlık istasyon adını, ya da www. / .com / reklam / canlı yayın içeriyor
//   none   → hiçbir turda icy-metaint yoktu
//   dead   → hiçbir tura bağlanılamadı
//   hls    → istasyon HLS yayınlıyor, ICY yok, atlandı (ayrı işaret)

const JUNK_PATTERNS = ["www.", ".com", "reklam", "canlı yayın"];

// Başlık "junk" mı? İstasyon adını ya da bilinen kalıpları içeriyorsa evet.
function isJunk(title, stationName) {
  const t = title.toLocaleLowerCase("tr");
  if (JUNK_PATTERNS.some((p) => t.includes(p))) return true;
  const name = (stationName || "").toLocaleLowerCase("tr").trim();
  if (name && t.includes(name)) return true;
  return false;
}

// "Sanatçı - Parça" biçimi: ortada boşluklu tire, iki yanda da içerik var.
function looksLikeTrack(title) {
  return /\S+\s-\s\S+/.test(title);
}

// rounds: her tur için { status: 'ok'|'none'|'dead', title }
export function classify(station, rounds) {
  if (station.hls) return "hls";

  const connected = rounds.some((r) => r.status === "ok" || r.status === "none");
  if (!connected) return "dead";

  const okRounds = rounds.filter((r) => r.status === "ok");
  if (okRounds.length === 0) return "none";

  const titles = okRounds.map((r) => (r.title || "").trim());
  const nonEmpty = titles.filter((t) => t.length > 0);
  if (nonEmpty.length === 0) return "static";

  // Tüm dolu başlıklar junk ise junk (değişse bile — dönen reklam metni).
  if (nonEmpty.every((t) => isJunk(t, station.name))) return "junk";

  const changed = new Set(nonEmpty).size > 1;
  const trackLike = nonEmpty.some((t) => looksLikeTrack(t) && !isJunk(t, station.name));
  if (changed || trackLike) return "good";

  return "static";
}
