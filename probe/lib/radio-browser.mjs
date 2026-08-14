// Radio Browser açık API'sinden istasyon listesini çeker.
// Anahtar gerektirmez, ücretsiz. Kurallar (brief'ten):
//  - Sabit sunucu gömme: all.api.radio-browser.info DNS'inden sunucuları bul,
//    biri başarısız olursa sıradakini dene.
//  - User-Agent MUTLAKA anlamlı: Simdi/0.1
//  - id yerine stationuuid kullan (id sunucular arası tutarsız).

import dns from "node:dns/promises";

const USER_AGENT = "Simdi/0.1";

// all.api.radio-browser.info A kayıtlarını çözer, her IP'yi ters DNS ile
// gerçek sunucu adına (ör. de1.api.radio-browser.info) çevirir. Sırayı
// karıştırır ki hep aynı sunucuyu yormayalım.
export async function resolveServers() {
  const hosts = new Set();
  try {
    const ips = await dns.resolve4("all.api.radio-browser.info");
    for (const ip of ips) {
      try {
        const names = await dns.reverse(ip);
        for (const n of names) hosts.add(n);
      } catch {
        // ters DNS başarısızsa IP'yi doğrudan kullan
        hosts.add(ip);
      }
    }
  } catch {
    // DNS tamamen başarısız — en azından bilinen giriş noktasını dene
    hosts.add("all.api.radio-browser.info");
  }
  return shuffle([...hosts]);
}

// TR ülke koduyla, kırık olmayanlar, oya göre azalan, 60 kayıt.
// Sunucular sırayla denenir; ilk başarılı yanıt döner.
export async function fetchTrStations({ limit = 60 } = {}) {
  const servers = await resolveServers();
  const query =
    `/json/stations/bycountrycodeexact/TR` +
    `?hidebroken=true&order=votes&reverse=true&limit=${limit}`;

  let lastErr;
  for (const host of servers) {
    const url = `https://${host}${query}`;
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("beklenmeyen yanıt");
      return { server: host, stations: data.map(normalize) };
    } catch (err) {
      lastErr = err;
      console.warn(`  ! ${host} başarısız (${err.message}), sıradaki deneniyor...`);
    }
  }
  throw new Error(`Hiçbir Radio Browser sunucusuna ulaşılamadı: ${lastErr?.message}`);
}

// Radio Browser kaydından yalnızca ihtiyacımız olan alanları alır.
// stationuuid'i kimlik olarak kullanır (id'yi değil).
function normalize(s) {
  return {
    name: s.name?.trim() || "(isimsiz)",
    stationuuid: s.stationuuid,
    url: s.url_resolved || s.url,
    homepage: s.homepage || "",
    codec: s.codec || "",
    bitrate: s.bitrate ?? 0,
    hls: s.hls === 1 || s.hls === true,
    countrycode: s.countrycode || "TR",
    band: "tr",
  };
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
