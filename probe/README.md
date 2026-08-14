# /probe — Faz 0: Metadata taraması

Bu klasör **atılabilir keşif kodudur**, ürün kodu değil. Amacı: hangi radyoların
kullanılabilir "şimdi çalan" (ICY metadata) verisi gönderdiğini ölçmek. Faz 0
onaylandıktan sonra bu klasör silinebilir.

Bağımlılık yok — sadece Node.js standart kütüphanesi (`net`, `tls`, `dns`, `fs`).
Node 18+ gerekir (yerleşik `fetch` için).

## Çalıştırma

```bash
# Adım 1 — istasyon listesini çek (probe/stations.json üretir)
node probe/fetch-stations.mjs

# Adım 2-4 — yokla, ölç, rapor üret (probe/rapor.csv üretir)
node probe/probe.mjs
```

`probe.mjs` her istasyonu **3 kez, 40 saniye arayla** yoklar; toplam süre ~80 saniye
+ yoklama süreleridir. Sabırlı ol, aradaki bekleme normaldir.

Mantığı doğrulamak için (ağ gerektirmez):

```bash
node probe/selftest.mjs
```

## Ne yapar

- **Adım 1:** `all.api.radio-browser.info` DNS'inden sunucuları bulur (sabit adres
  gömmez), TR ülke koduyla oya göre sıralı 60 istasyon çeker, `id` değil
  `stationuuid` kullanır. Üzerine 5 elle seçilmiş yabancı istasyon ekler
  (NTS, FIP, KEXP, BBC Radio 6 Music, Worldwide FM). Hepsi `stations.json`'a yazılır.
- **Adım 2:** Her akışa `Icy-MetaData: 1` başlığıyla bağlanır, `icy-metaint` kadar
  sesi atlar, uzunluk byte'ını 16 ile çarpar, o kadar metadata okur, `StreamTitle`'ı
  ayıklar ve **bağlantıyı hemen kapatır**. HLS istasyonları atlanır (ICY yoktur).
  İstekler paralel değil, 5'erli gruplar halinde; zaman aşımı 8 sn.
- **Adım 3:** Üç ölçümün sonucuna göre sınıflandırır:
  `good` / `static` / `junk` / `none` / `dead` (+ HLS için ayrı `hls` işareti).
- **Adım 4:** `rapor.csv` üretir ve terminale sınıf başına sayı basar.
  `good` sayısı 15'in altındaysa uyarı verir — Faz 1'e geçmeden önce konuşulmalı.

## Notlar

- **Bu geliştirme ortamından çalıştırılamaz.** Kurumsal egress politikası
  `radio-browser.info` dahil dış hostlara CONNECT'i 403 ile reddediyor. Script'ler
  doğru; gerçek raporu üretmek için **kendi makinende** çalıştır.
- Elle eklenen yabancı istasyonların akış URL'leri en iyi bilinen ICY uç noktalarıdır
  ama doğrulanamadı; hangilerinin gerçekten metadata verdiğini `rapor.csv` gösterecek.
  BBC Radio 6 Music yalnızca HLS yayınlar, bu yüzden `hls` işaretiyle atlanır.
- `stations.json` ve `rapor.csv` üretilen çıktılardır; commit edilmezler
  (bkz. `.gitignore`).
