/* ÖĞRETMEN KİTİ — public/ogretmen-kiti.pdf (4 sayfa A4, yazar-noir dili).
   Kaynak: lib/ogrenciler.ts (12 cümle + tartışma sorusu; cümleler yalnız lib/sozler.ts
   korpusundan, baskıdan doğrulanmış), lib/basinKiti.ts (biyografi), lib/kitaplar.ts değil:
   künye satırları aşağıda sabit (ISBN'ler Berkay teyitli).
   Çalıştırma (yalnız Google Chrome gerekir): node scripts/ogretmen-kiti.mts
   Cümle, soru ya da biyografi değişince yeniden çalıştırıp PDF'i commit'le. */

import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { registerHooks } from "node:module";

const KOK = join(dirname(fileURLToPath(import.meta.url)), "..");

// lib/ dosyaları Next tarzı import kullanır ("@/lib/sozler", "./x") — Node'a çözdür.
registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith("@/")) spec = pathToFileURL(join(KOK, spec.slice(2))).href;
    if ((spec.startsWith(".") || spec.startsWith("file:")) && !/\.[cm]?[jt]sx?$/.test(spec)) {
      try { return next(spec + ".ts", ctx); } catch { /* olduğu gibi dene */ }
    }
    return next(spec, ctx);
  },
});
const { CUMLELER, KONULAR_OGRENCI } = await import("../lib/ogrenciler.ts");
const { BIO_ORTA_TR } = await import("../lib/basinKiti.ts");

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const resim = (ad: string) => pathToFileURL(join(KOK, "public", ad)).href;
const kitapAdi = (k: "mvk" | "tas") => (k === "mvk" ? "Mürekkep ve Köz" : "Tasfiye");

const kart = (c: (typeof CUMLELER)[number], i: number) => `
  <div class="kart">
    <span class="no">${String(i + 1).padStart(2, "0")}</span>
    <p class="cumle">“${esc(c.s)}”</p>
    <p class="kaynak">${kitapAdi(c.soz.k)}${c.soz.p ? `, s. ${c.soz.p}` : ""} · Berkay Doğan</p>
    <p class="soru"><span>Tartışma sorusu</span>${esc(c.soru)}</p>
  </div>`;

const ust = (sol: string, no: number) =>
  `<div class="ust"><span><b>Öğretmen kiti</b> · ${sol}</span><span>berkaydogan.co/ogrenciler</span></div>`;
const alt = (no: number) => `<div class="alt"><span>Berkay Doğan · Öğretmen kiti 2026</span><span>${no} / 4</span></div>`;

const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=block" rel="stylesheet">
<style>
@page{size:A4;margin:0}*{margin:0;padding:0;box-sizing:border-box}
html,body{background:#FAF8F2}
body{font-family:"Inter Tight",sans-serif;color:#191813;font-size:9pt;line-height:1.5}
.sayfa{width:210mm;height:297mm;padding:15mm 16mm 12mm;display:flex;flex-direction:column;page-break-after:always;position:relative;
  background-image:linear-gradient(to right,rgba(25,24,19,.06) 1px,transparent 1px);background-size:44.5mm 100%;background-position:16mm 0}
.sayfa:last-child{page-break-after:auto}
.ust{display:flex;justify-content:space-between;font-size:6.8pt;letter-spacing:.24em;text-transform:uppercase;color:#6C685E;border-bottom:1px solid #191813;padding-bottom:3mm}
.ust b{color:#191813;font-weight:600}
.alt{margin-top:auto;display:flex;justify-content:space-between;border-top:1px solid #191813;padding-top:2.5mm;font-size:7pt;letter-spacing:.12em;text-transform:uppercase;color:#6C685E}
h1{font-weight:600;font-size:40pt;letter-spacing:-.04em;line-height:.95;margin-top:10mm}
.alt-baslik{font-size:12pt;color:#6C685E;margin-top:3mm;max-width:130mm}
.kapaklar{display:flex;gap:8mm;margin-top:9mm}
.kapaklar img{height:78mm;display:block;outline:.5px solid rgba(25,24,19,.25)}
.bio{font-size:9.4pt;line-height:1.62;margin-top:8mm;color:#2b2a25}
.kutu{margin-top:7mm;border-top:1px solid #191813;border-bottom:1px solid #191813;padding:4mm 0;font-size:9pt;line-height:1.55}
.kutu b{font-weight:600}
.k{font-size:6.6pt;letter-spacing:.24em;text-transform:uppercase;color:#6C685E;font-weight:600;margin:7mm 0 2.5mm}
.kartlar{display:grid;grid-template-columns:1fr 1fr;gap:6mm 8mm;margin-top:8mm}
.kart{border-top:1px solid #191813;padding-top:3mm;min-height:72mm;display:flex;flex-direction:column}
.no{font-size:8pt;font-weight:600;letter-spacing:.1em;color:#6C685E}
.cumle{font-size:14pt;font-weight:500;letter-spacing:-.015em;line-height:1.28;margin-top:2.5mm}
.kaynak{font-size:7pt;letter-spacing:.14em;text-transform:uppercase;color:#6C685E;margin-top:2.5mm}
.soru{margin-top:auto;padding-top:4mm;font-size:9.2pt;line-height:1.45}
.soru span{display:block;font-size:6.4pt;letter-spacing:.22em;text-transform:uppercase;color:#6C685E;font-weight:600;margin-bottom:1mm}
.etk{display:grid;grid-template-columns:repeat(3,1fr);gap:6mm}
.etk div{border-top:1px solid #191813;padding-top:2.5mm}
.etk b{display:block;font-weight:600;font-size:10pt;margin-bottom:1.5mm}
ul{list-style:none}li{padding:1.4mm 0;border-top:.5px solid rgba(25,24,19,.16)}
li b{font-weight:600}
.iki{display:grid;grid-template-columns:1fr 1fr;gap:8mm}
.cagri{margin-top:7mm;border-top:1px solid #191813;border-bottom:1px solid #191813;padding:4mm 0}
.cagri b{font-weight:600;font-size:11pt;display:block;margin-bottom:1mm;border-bottom:1px solid #191813;display:inline-block}
.iletisim{margin-top:6mm;font-size:10pt}
.iletisim b{font-weight:600}
</style></head><body>

<section class="sayfa">
  ${ust("Ücretsiz", 1)}
  <h1>Derste<br>tartışmak için</h1>
  <p class="alt-baslik">Berkay Doğan'ın kitaplarından 12 cümle, her birine bir tartışma sorusu ve sınıfta kullanılabilecek üç etkinlik.</p>
  <div class="kapaklar">
    <img src="${resim("murekkep-ve-koz-on-kapak.jpg")}" alt="">
    <img src="${resim("tasfiye-on-kapak.jpg")}" alt="">
  </div>
  <p class="bio">${esc(BIO_ORTA_TR)}</p>
  <div class="kutu"><b>Bu kit ne için?</b> Edebiyat, felsefe ya da Türkçe dersinde 10–40 dakikalık bir tartışma ya da yazma etkinliği için. Cümleler kitaplardan birebir alınmıştır; kaynak gösterilerek derste ve öğrenci ödevlerinde kullanılabilir. Okullara ve öğrenci kulüplerine çevrim içi ya da yüz yüze <b>ücretsiz söyleşi</b> için: berkaydogan.co/ogrenciler</div>
  ${alt(1)}
</section>

<section class="sayfa">
  ${ust("Cümleler ve sorular · 1–6", 2)}
  <div class="kartlar">${CUMLELER.slice(0, 6).map((c, i) => kart(c, i)).join("")}</div>
  ${alt(2)}
</section>

<section class="sayfa">
  ${ust("Cümleler ve sorular · 7–12", 3)}
  <div class="kartlar">${CUMLELER.slice(6, 12).map((c, i) => kart(c, i + 6)).join("")}</div>
  ${alt(3)}
</section>

<section class="sayfa">
  ${ust("Sınıfta nasıl kullanılır?", 4)}
  <p class="k" style="margin-top:8mm">Üç etkinlik</p>
  <div class="etk">
    <div><b>1 · On dakikalık tartışma</b>Bir cümleyi tahtaya yazın, altındaki soruyu sorun. Sınıfı ikiye bölün: bir grup cümleye katılsın, diğeri itiraz etsin. Her grup iki gerekçe sunsun.</div>
    <div><b>2 · Bir paragraflık yazı</b>Öğrenciler bir cümle seçip ona tek paragrafla katılsın ya da karşı çıksın. Kendi hayatından bir örnek vermesi istenebilir.</div>
    <div><b>3 · Yazara soru</b>Sınıf olarak yazara sormak istediğiniz üç soruyu seçin ve berkaydogan.co/ogrenciler üzerinden e-postayla gönderin. Yazılı olarak yanıtlanır.</div>
  </div>
  <div class="iki">
    <div>
      <p class="k">Söyleşi konuları (okul ve kulüpler için ücretsiz)</p>
      <ul>${KONULAR_OGRENCI.map(([b]) => `<li>${esc(b)}</li>`).join("")}</ul>
    </div>
    <div>
      <p class="k">Kitaplar</p>
      <ul>
        <li><b>Mürekkep ve Köz</b> · Bir Şairin Hesabı · Şiir<br>İskenderiye Yayınları, Aralık 2025 · 183 sayfa<br>ISBN 978-625-9620-32-9</li>
        <li><b>Tasfiye</b> · Bir Yazarın Hesabı · Deneme<br>İskenderiye Yayınları, Ağustos 2026 · 151 sayfa<br>ISBN 978-625-9031-24-8</li>
      </ul>
    </div>
  </div>
  <div class="cagri"><b>Öğrencileriniz için yazma çağrısı: Sesin Duyulsun</b><br>Lise ve üniversite öğrencilerinden kısa şiir (en fazla 30 dize) ya da deneme (en fazla 500 kelime); tema serbest. Son gün 21 Aralık 2026. Seçilen 5 metin sitede yayımlanır, ilk üçüne imzalı kitap seti gönderilir. Ayrıntılar: berkaydogan.co/ogrenciler</div>
  <p class="iletisim"><b>Söyleşi daveti, öğrenci röportajı, soru:</b><br>berkaydogan.co/ogrenciler · do.berkay@icloud.com</p>
  ${alt(4)}
</section>
</body></html>`;

if (CUMLELER.length < 12) throw new Error(`Korpusta doğrulanan cümle sayısı ${CUMLELER.length} (12 bekleniyordu); lib/ogrenciler.ts'e bak.`);

const GECICI = join(KOK, ".ogretmen-kiti-tmp");
rmSync(GECICI, { recursive: true, force: true });
mkdirSync(GECICI, { recursive: true });
const htmlYol = join(GECICI, "kit.html");
writeFileSync(htmlYol, html);
const pdfYol = join(KOK, "public", "ogretmen-kiti.pdf");
execFileSync("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files",
  "--virtual-time-budget=10000", `--print-to-pdf=${pdfYol}`, pathToFileURL(htmlYol).href,
], { stdio: "ignore" });
rmSync(GECICI, { recursive: true, force: true });
console.log("tamam:", pdfYol);
