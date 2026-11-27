#!/bin/sh
# frameby. webOS: LG mağazası için 1920×1080 ekran görüntüleri (başsız Chrome).
# Önce yerel sunucu: npx http-server tv/webos -p 8790   (ya da .claude/launch.json › frameby-webos)
# Kullanım: sh tv/webos/araclar/magaza-goruntuleri.sh <çıktı klasörü> [http://localhost:8790]
# Yalnız ücretsiz katmanların kareleri (Gün, Eski İstanbul); frameby+ kareleri LG sayfasında gösterilmez.
set -e
CIKTI=${1:?çıktı klasörü}
ADRES=${2:-http://localhost:8790}
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

cek() { # dil dosya bekleme(ms) parametreler
  profil=$(mktemp -d)
  "$CHROME" --headless=new --user-data-dir="$profil" --disable-gpu --hide-scrollbars --mute-audio \
    --window-size=1920,1080 --autoplay-policy=no-user-gesture-required --virtual-time-budget="$3" \
    --screenshot="$CIKTI/$1/$2.png" "$ADRES/?dil=$1&ipucu=0&$4" >/dev/null 2>&1
  rm -rf "$profil"
  echo "$1/$2.png"
}

for dil in tr en; do
  mkdir -p "$CIKTI/$dil"
  cek "$dil" 01-eminonu 25000 "kare=r50-0574"
  cek "$dil" 02-bakirkoy-uclu 25000 "kare=iph-20240419-058"
  cek "$dil" 03-bogaz-koprusu 25000 "kare=iph-20230710-216"
  cek "$dil" 04-eski-istanbul-bebek 25000 "kare=arsiv-bebek&katman=arsiv"
  cek "$dil" 05-menu 25000 "kare=iph-20261110-244&menu=1"
  cek "$dil" 06-ayarlar 25000 "menu=2"
  cek "$dil" 07-acilis 1500 ""
done
