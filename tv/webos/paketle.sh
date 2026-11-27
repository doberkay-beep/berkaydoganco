#!/bin/sh
# frameby. webOS paketleri: uygulama dosyalarını + sitedeki güncel katalog.json'ı build/app'e kopyalar,
# ares-package ile iki paket üretir (ares CLI: README › Kurulum):
#   build/co.berkaydogan.frameby_<sürüm>_all.ipk       1920x1080 (UHD TV'ler)
#   build/720/co.berkaydogan.frameby_<sürüm>_all.ipk   1280x720  (FHD TV'ler)
# Kod aynı: sahne 1920x1080 çizilir, olcekle() pencereye sığdırır. Yalnız appinfo.json'daki
# "resolution" değişir; LG Seller Lounge iki dosyayı ayrı çözünürlük olarak ister.
set -e
cd "$(dirname "$0")"
rm -rf build
mkdir -p build/app
cp -R appinfo.json index.html css js img fonts build/app/
# İnternet yokken ilk açılış için paketteki katalog (sunucudaki her zaman önce denenir).
cp ../../public/frameby/katalog.json build/app/katalog.json
if ! command -v ares-package >/dev/null 2>&1; then
  echo "ares-package bulunamadı. Kurulum: npm install -g --prefix ~/.local @webos-tools/cli   (README'ye bak)"
  echo "Paketlenecek klasör hazır: $(pwd)/build/app"
  exit 1
fi
ares-package build/app -o build

# 1280x720 kopyası
cp -R build/app build/app720
sed 's/"resolution": "1920x1080"/"resolution": "1280x720"/' appinfo.json > build/app720/appinfo.json
grep -q '"resolution": "1280x720"' build/app720/appinfo.json
mkdir -p build/720
ares-package build/app720 -o build/720
ls -l build/*.ipk build/720/*.ipk
