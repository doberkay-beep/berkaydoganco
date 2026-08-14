// Elle eklenen yabancı istasyonlar (brief Adım 1).
// Radio Browser'dan çekilmez, burada sabit tutulur. band: 'int'.
//
// NOT: Bu URL'ler en iyi bilinen ICY-yayınlayan uç noktalardır ama
// script yazılırken ağ kısıtı yüzünden doğrulanamadı. Yokla çıktısı
// (kalite sütunu) hangilerinin gerçekten metadata verdiğini gösterecek.
//  - BBC Radio 6 Music yalnızca HLS yayınlar → hls: true, ICY yoktur, atlanır.
//  - NTS metadata'yı ICY yerine ayrı bir API'den verir; büyük ihtimalle 'none'.

export const manualStations = [
  {
    name: "NTS Radio 1",
    stationuuid: "manual:nts-1",
    url: "https://stream-relay-geo.ntslive.net/stream",
    homepage: "https://www.nts.live",
    codec: "AAC",
    bitrate: 0,
    hls: false,
    countrycode: "GB",
    band: "int",
  },
  {
    name: "FIP",
    stationuuid: "manual:fip",
    url: "http://direct.fipradio.fr/live/fip-midfi.mp3",
    homepage: "https://www.fip.fr",
    codec: "MP3",
    bitrate: 128,
    hls: false,
    countrycode: "FR",
    band: "int",
  },
  {
    name: "KEXP 90.3 FM",
    stationuuid: "manual:kexp",
    url: "https://kexp-mp3-128.streamguys1.com/kexp128.mp3",
    homepage: "https://www.kexp.org",
    codec: "MP3",
    bitrate: 128,
    hls: false,
    countrycode: "US",
    band: "int",
  },
  {
    name: "BBC Radio 6 Music",
    stationuuid: "manual:bbc6",
    url: "http://as-hls-ww-live.akamaized.net/pool_904/live/ww/bbc_6music/bbc_6music.isml/bbc_6music-audio%3d320000.norewind.m3u8",
    homepage: "https://www.bbc.co.uk/6music",
    codec: "AAC",
    bitrate: 320,
    hls: true,
    countrycode: "GB",
    band: "int",
  },
  {
    name: "Worldwide FM",
    stationuuid: "manual:worldwidefm",
    url: "https://worldwidefm.out.airtime.pro/worldwidefm_a",
    homepage: "https://worldwidefm.net",
    codec: "MP3",
    bitrate: 128,
    hls: false,
    countrycode: "GB",
    band: "int",
  },
];
