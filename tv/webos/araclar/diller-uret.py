#!/usr/bin/env python3
"""frameby. webOS: iOS uygulamasının String Catalog'undan (Localizable.xcstrings) TV'nin kullandığı metinleri
js/diller.js'e yazar. Anahtarlar js/frameby.js'teki L("…") / LF("…") çağrılarından toplanır; katalogda olmayan
anahtar için TV İngilizcesini gösterir (raporda listelenir).

Kullanım (depo kökünden):
    python3 tv/webos/araclar/diller-uret.py [~/Developer/diller/frameby-app/frameby/Localizable.xcstrings]
"""
import json
import os
import re
import sys

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KATALOG = os.path.expanduser(sys.argv[1] if len(sys.argv) > 1 else "~/Developer/diller/frameby-app/frameby/Localizable.xcstrings")
JS = os.path.join(KOK, "js", "frameby.js")
CIKTI = os.path.join(KOK, "js", "diller.js")

# Kodda değişkenle çağrılan anahtarlar (katman adları, rüzgâr adları).
EK = ["Gün", "Eski İstanbul", "Berkay'ın İstanbul'u", "Gece kıyısı",
      "yıldız", "poyraz", "gündoğusu", "keşişleme", "kıble", "lodos", "günbatısı", "karayel"]


def js_metni(ham):
    return json.loads('"' + ham.replace("\\'", "'") + '"')


kod = open(JS, encoding="utf-8").read()
anahtarlar = []
for ham in re.findall(r'\bLF?\(\s*"((?:[^"\\]|\\.)*)"', kod):
    m = js_metni(ham)
    if m not in anahtarlar:
        anahtarlar.append(m)
for m in EK:
    if m not in anahtarlar:
        anahtarlar.append(m)

katalog = json.load(open(KATALOG, encoding="utf-8"))["strings"]
diller = {}
eksik = []
for a in anahtarlar:
    girdi = katalog.get(a)
    if not girdi:
        eksik.append(a)
        continue
    for dil, l in girdi.get("localizations", {}).items():
        deger = l.get("stringUnit", {}).get("value")
        if deger and l.get("stringUnit", {}).get("state", "translated") != "new":
            diller.setdefault(dil, {})[a] = deger

govde = json.dumps(dict(sorted(diller.items())), ensure_ascii=False, indent=0, sort_keys=True)
with open(CIKTI, "w", encoding="utf-8") as f:
    f.write("/* frameby. webOS — iOS String Catalog'undan üretildi (araclar/diller-uret.py); elle düzenleme. */\n")
    f.write("window.FRAMEBY_DILLER = " + govde + ";\n")

print(f"{len(diller)} dil, {len(anahtarlar) - len(eksik)} / {len(anahtarlar)} anahtar katalogda → {os.path.relpath(CIKTI)}")
if eksik:
    print("Katalogda yok (TV İngilizcesini gösterir):")
    for a in eksik:
        print("  -", repr(a))
