/* BASIN KİTİ — public/basin/ altına tek ZIP + tek sayfalık PDF bülten üretir.
   Kaynak: lib/basinKiti.ts, lib/basinda.ts, lib/site.ts (sitedeki Basın Odası ile aynı veri).
   Çalıştırma (Chrome + puppeteer-core gerekir):
     PUPPETEER_PATH=/yol/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js node scripts/basin-kiti.mts
   Bülten metni değişince yeniden çalıştırıp çıktıyı commit'le. */

import { mkdirSync, writeFileSync, copyFileSync, rmSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BIO_KISA_TR, BIO_ORTA_TR, BIO_KISA_EN, BIO_ORTA_EN, KUNYE, RAKAMLAR, KONULAR } from "../lib/basinKiti.ts";
import { BASIN, BASIN_TUR, ALINTILAR, ALINTI_KAYNAK } from "../lib/basinda.ts";
import { registerHooks } from "node:module";

// lib/ dosyaları Next tarzı uzantısız import kullanır ("./sozler") — Node'a .ts'yi denemesini söyle.
registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith(".") && !/\.[cm]?[jt]sx?$/.test(spec)) {
      try { return next(spec + ".ts", ctx); } catch { /* olduğu gibi dene */ }
    }
    return next(spec, ctx);
  },
});
const { site } = await import("../lib/site.ts");

const KOK = join(dirname(fileURLToPath(import.meta.url)), "..");
const CIKTI = join(KOK, "public", "basin");
const GECICI = join(KOK, ".basin-kiti-tmp", "berkay-dogan-basin-kiti");
rmSync(join(KOK, ".basin-kiti-tmp"), { recursive: true, force: true });
mkdirSync(join(GECICI, "gorseller"), { recursive: true });
mkdirSync(CIKTI, { recursive: true });

const tarihTR = (iso: string, sadeceAy?: boolean) =>
  new Date(iso).toLocaleDateString("tr-TR", sadeceAy ? { month: "long", year: "numeric" } : { day: "numeric", month: "long", year: "numeric" });

/* 1) Metinler */
writeFileSync(join(GECICI, "biyografi-tr.txt"),
  `BERKAY DOĞAN — BİYOGRAFİ\n\nTEK CÜMLE\n${BIO_KISA_TR}\n\nKISA PARAGRAF\n${BIO_ORTA_TR}\n\nUZUN\n${site.tr.about.paras.join("\n\n")}\n`);
writeFileSync(join(GECICI, "biography-en.txt"),
  `BERKAY DOĞAN — BIOGRAPHY\n\nONE LINE\n${BIO_KISA_EN}\n\nSHORT\n${BIO_ORTA_EN}\n\nLONG\n${site.en.about.paras.join("\n\n")}\n`);
writeFileSync(join(GECICI, "kunye.txt"), KUNYE.map((f) => `${f.k}: ${f.v}`).join("\n") + "\n");
writeFileSync(join(GECICI, "alintilar.txt"),
  `Berkay Doğan'ın kendi sözleri, harfi harfine.\nKaynak: ${ALINTI_KAYNAK.ad} — ${ALINTI_KAYNAK.url}\n\n` + ALINTILAR.map((a) => `“${a}”`).join("\n\n") + "\n");
writeFileSync(join(GECICI, "soylesi-konulari.txt"), KONULAR.map((k) => `• ${k}`).join("\n") + "\n");
writeFileSync(join(GECICI, "basinda.txt"),
  BASIN.map((b) => `${tarihTR(b.tarihISO, b.sadeceAy)} · ${b.yayin} · ${BASIN_TUR[b.tur].tr} — ${b.baslik.tr}\n${b.url}`).join("\n\n") + "\n");
writeFileSync(join(GECICI, "OKU-BENI.txt"),
  "Berkay Doğan basın kiti — berkaydogan.co/press\n\nTüm metin ve görseller haber ve tanıtım amaçlı serbestçe kullanılabilir.\nKredi: Berkay Doğan / berkaydogan.co\nİletişim: do.berkay@icloud.com\n");

/* 2) Görseller */
const GORSEL: [string, string][] = [
  ["images/portre.jpg", "berkay-dogan-portre.jpg"],
  ["murekkep-ve-koz-on-kapak.jpg", "murekkep-ve-koz-on-kapak.jpg"],
  ["murekkep-ve-koz-arka-kapak.jpg", "murekkep-ve-koz-arka-kapak.jpg"],
  ["tasfiye-on-kapak.jpg", "tasfiye-on-kapak.jpg"],
  ["tasfiye-arka-kapak.jpg", "tasfiye-arka-kapak.jpg"],
  ["muhur.png", "bd-muhur.png"],
  ["muhur.svg", "bd-muhur.svg"],
];
for (const [kaynak, ad] of GORSEL) copyFileSync(join(KOK, "public", kaynak), join(GECICI, "gorseller", ad));

/* 3) PDF bülten — tek sayfa A4 */
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const kitapSatiri = KUNYE.find((f) => f.k === "Kitaplar")?.v ?? "";
const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:ital,wght@0,500;1,400&display=block" rel="stylesheet">
<style>
@page{size:A4;margin:0}*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Inter;color:#191813;background:#fbfaf5;width:210mm;height:297mm;padding:15mm 16mm 13mm;display:flex;flex-direction:column;font-size:8.6pt;line-height:1.5}
.ust{display:flex;justify-content:space-between;align-items:center;font-size:7pt;letter-spacing:.22em;text-transform:uppercase;color:#6b665c;border-bottom:1.5px solid #E5382C;padding-bottom:3mm}
.ust b{color:#E5382C;font-weight:700}
h1{font-family:"Playfair Display";font-weight:500;font-size:30pt;letter-spacing:-.01em;margin-top:6mm;line-height:1}
.unvan{font-family:"Playfair Display";font-style:italic;font-size:12pt;color:#6b665c;margin-top:1.5mm}
.lead{font-size:9.6pt;line-height:1.6;margin-top:5mm}
.k{font-size:6.6pt;letter-spacing:.2em;text-transform:uppercase;color:#A62318;font-weight:700;margin:5mm 0 2mm}
.rak{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm}
.rak div{border-top:1.5px solid #E5382C;padding-top:1.5mm}
.rak b{display:block;font-size:15pt;letter-spacing:-.02em;color:#A62318}
.rak span{font-size:7pt;color:#6b665c;line-height:1.35;display:block;margin-top:.5mm}
.iki{display:grid;grid-template-columns:1fr 1fr;gap:7mm}
ul{list-style:none}li{padding:1.1mm 0;border-top:.5px solid #d9d5ca}
.al{font-family:"Playfair Display";font-style:italic;font-size:10.5pt;line-height:1.4;border-left:1.5px solid #E5382C;padding-left:3mm;margin-bottom:2.2mm}
.alt{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;border-top:.5px solid #d9d5ca;padding-top:3mm;font-size:8pt}
.alt b{font-size:10pt}
</style></head><body>
<div class="ust"><span><b>Basın bülteni</b> · ${esc(new Date().toLocaleDateString("tr-TR", { month: "long", year: "numeric" }))}</span><span>berkaydogan.co/press</span></div>
<h1>Berkay Doğan</h1>
<p class="unvan">Şair, yazar · ŞİMDİ'nin kurucusu</p>
<p class="lead">${esc(BIO_ORTA_TR)}</p>
<p class="k">Rakamlarla</p>
<div class="rak">${[...RAKAMLAR.slice(0, 3), { deger: "__SIMDI__", aciklama: "__SIMDI_ACK__" }]
  .map((r) => `<div><b>${esc(r.deger)}</b><span>${esc(r.aciklama)}</span></div>`).join("")}</div>
<div class="iki">
  <div>
    <p class="k">Basında</p>
    <ul>${BASIN.map((b) => `<li><b>${esc(b.yayin)}</b> · ${esc(BASIN_TUR[b.tur].tr)} · ${esc(tarihTR(b.tarihISO, b.sadeceAy))}</li>`).join("")}</ul>
    <p class="k">Söyleşi konuları</p>
    <ul>${KONULAR.slice(0, 4).map((k) => `<li>${esc(k)}</li>`).join("")}</ul>
  </div>
  <div>
    <p class="k">Kendi sözleriyle</p>
    ${ALINTILAR.slice(0, 4).map((a) => `<p class="al">“${esc(a)}”</p>`).join("")}
    <p style="font-size:6.8pt;color:#6b665c">${esc(ALINTI_KAYNAK.ad)}</p>
    <p class="k">Kitaplar</p>
    <p>${esc(kitapSatiri)} — İskenderiye Yayınları</p>
  </div>
</div>
<div class="alt"><div><b>İletişim</b><br>do.berkay@icloud.com</div><div style="text-align:right">Biyografiler, görseller, kitap künyeleri:<br><b>berkaydogan.co/press</b></div></div>
</body></html>`;

// ŞİMDİ canlı sayısı (yoksa yerine dördüncü rakam)
let simdi: { deger: string; aciklama: string } = RAKAMLAR[3];
try {
  const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpb3V6aXpibHJrb2ptc3F2YmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3ODExMTQsImV4cCI6MjEwMjM1NzExNH0.rAPFD8zjD_LdGf4hnZW_asnxUS705XCxTII-RqhmZDM";
  const r = await fetch("https://uiouzizblrkojmsqvbjk.supabase.co/rest/v1/ana_ozet?select=veri&id=eq.1", { headers: { apikey: ANON, Authorization: `Bearer ${ANON}` } });
  const v = (await r.json())?.[0]?.veri;
  if (v?.ay_toplam) {
    const gun = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
    simdi = { deger: Number(v.ay_toplam).toLocaleString("tr-TR"), aciklama: `şarkı bu ay Türkiye radyolarında çaldı — ŞİMDİ sayımı (${gun} itibarıyla)` };
  }
} catch { /* çevrimdışı: dördüncü rakam kalır */ }
const sonHtml = html.replace("__SIMDI__", esc(simdi.deger)).replace("__SIMDI_ACK__", esc(simdi.aciklama));

const pp = await import(process.env.PUPPETEER_PATH ?? "puppeteer-core");
const tarayici = await (pp.default ?? pp).launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const sayfa = await tarayici.newPage();
await sayfa.setContent(sonHtml, { waitUntil: "networkidle0" });
await sayfa.evaluate(() => document.fonts.ready);
const pdfYol = join(CIKTI, "berkay-dogan-basin-bulteni.pdf");
await sayfa.pdf({ path: pdfYol, format: "A4", printBackground: true, pageRanges: "1" });
await tarayici.close();
copyFileSync(pdfYol, join(GECICI, "berkay-dogan-basin-bulteni.pdf"));

/* 4) ZIP */
const zipYol = join(CIKTI, "berkay-dogan-basin-kiti.zip");
if (existsSync(zipYol)) rmSync(zipYol);
execFileSync("zip", ["-rqX", zipYol, "berkay-dogan-basin-kiti"], { cwd: dirname(GECICI) });
rmSync(join(KOK, ".basin-kiti-tmp"), { recursive: true, force: true });
console.log("tamam:", pdfYol, zipYol);
