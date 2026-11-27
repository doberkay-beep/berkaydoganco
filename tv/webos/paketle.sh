#!/bin/sh
# frameby. webOS paketi: uygulama dosyalarını + sitedeki güncel katalog.json'ı build/app'e kopyalar,
# ares-package ile build/co.berkaydogan.frameby_<sürüm>_all.ipk üretir. (ares CLI: README › Kurulum)
set -e
cd "$(dirname "$0")"
rm -rf build
mkdir -p build/app
cp -R appinfo.json index.html css js img fonts build/app/
# İnternet yokken ilk açılış için paketteki katalog (sunucudaki her zaman önce denenir).
cp ../../public/frameby/katalog.json build/app/katalog.json
if ! command -v ares-package >/dev/null 2>&1; then
  echo "ares-package bulunamadı. Kurulum: npm install -g @webos-tools/cli   (README'ye bak)"
  echo "Paketlenecek klasör hazır: $(pwd)/build/app"
  exit 1
fi
ares-package build/app -o build
ls -l build/*.ipk
