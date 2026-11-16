/* BASIN KİTİ — public/basin/ altına tek ZIP + tek sayfalık PDF bülten üretir.
   Kaynak: lib/basinKiti.ts, lib/basinda.ts, lib/site.ts (sitedeki Basın Odası ile aynı veri).
   Çalıştırma (yalnız Google Chrome gerekir; PDF Chrome'un başsız modundan basılır):
     node scripts/basin-kiti.mts
   Bülten metni değişince yeniden çalıştırıp çıktıyı commit'le. */

import { mkdirSync, writeFileSync, copyFileSync, rmSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BIO_KISA_TR, BIO_ORTA_TR, BIO_KISA_EN, BIO_ORTA_EN, KUNYE, RAKAMLAR, KONULAR } from "../lib/basinKiti.ts";
import { BASIN, BASIN_TUR, EKRAN, ALINTI_GRUPLARI } from "../lib/basinda.ts";
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
  `Berkay Doğan'ın söyleşilerdeki kendi sözleri, harfi harfine.\n\n` +
  ALINTI_GRUPLARI.map((g) => `KAYNAK: ${g.kaynak.ad} — ${g.kaynak.url}\n\n` + g.cumleler.map((a) => `“${a}”`).join("\n\n")).join("\n\n\n") + "\n");
writeFileSync(join(GECICI, "soylesi-konulari.txt"), KONULAR.map((k) => `• ${k}`).join("\n") + "\n");
writeFileSync(join(GECICI, "basinda.txt"),
  [
    ...BASIN.map((b) => ({ iso: b.tarihISO, satir: `${tarihTR(b.tarihISO, b.sadeceAy)} · ${b.yayin} · ${BASIN_TUR[b.tur].tr} — ${b.baslik.tr}\n${b.url}` })),
    ...EKRAN.map((e) => ({ iso: e.tarihISO, satir: `${tarihTR(e.tarihISO)} · ${e.kanal} · TV — ${e.baslik}${e.link ? `\n${e.link}` : ""}` })),
  ].sort((a, b) => b.iso.localeCompare(a.iso)).map((x) => x.satir).join("\n\n") + "\n");
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

/* 3) PDF bülten — tek sayfa A4, yazar-noir dili (kırık beyaz kâğıt, Inter Tight, ince ızgara, vurgu alt çizgi; kızıl yok) */
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const kitapSatiri = KUNYE.find((f) => f.k === "Kitaplar")?.v ?? "";
const ytSatiri = KUNYE.find((f) => f.k === "YouTube")?.v ?? "";
const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;1,400&display=block" rel="stylesheet">
<style>
@page{size:A4;margin:0}*{margin:0;padding:0;box-sizing:border-box}
body{font-family:"Inter Tight",sans-serif;color:#191813;background:#FAF8F2;width:210mm;height:297mm;padding:15mm 16mm 13mm;display:flex;flex-direction:column;font-size:8.6pt;line-height:1.5;
  background-image:linear-gradient(to right,rgba(25,24,19,.06) 1px,transparent 1px);background-size:44.5mm 100%;background-position:16mm 0}
.ust{display:flex;justify-content:space-between;align-items:center;font-size:6.8pt;letter-spacing:.24em;text-transform:uppercase;color:#6C685E;border-bottom:1px solid #191813;padding-bottom:3mm}
.ust b{color:#191813;font-weight:600}
h1{font-weight:600;font-size:34pt;letter-spacing:-.035em;margin-top:7mm;line-height:.95}
.unvan{font-size:11pt;color:#6C685E;margin-top:2mm;letter-spacing:-.005em}
.imza{font-style:italic;font-size:11.5pt;margin-top:5mm;display:inline-block;border-bottom:1px solid #191813;padding-bottom:.6mm}
.lead{font-size:9.4pt;line-height:1.6;margin-top:5mm;color:#2b2a25}
.k{font-size:6.4pt;letter-spacing:.24em;text-transform:uppercase;color:#6C685E;font-weight:600;margin:5.5mm 0 2mm}
.rak{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm}
.rak div{border-top:1px solid #191813;padding-top:1.6mm}
.rak b{display:block;font-size:17pt;font-weight:600;letter-spacing:-.03em}
.rak span{font-size:7pt;color:#6C685E;line-height:1.35;display:block;margin-top:.5mm}
.iki{display:grid;grid-template-columns:1fr 1fr;gap:7mm}
ul{list-style:none}li{padding:1.1mm 0;border-top:.5px solid rgba(25,24,19,.16)}
.al{font-style:italic;font-size:10.2pt;line-height:1.42;padding-left:3mm;border-left:1px solid #191813;margin-bottom:2.2mm}
.alt{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid #191813;padding-top:3mm;font-size:8pt}
.alt b{font-size:9.6pt;font-weight:600}
</style></head><body>
<div class="ust"><span><b>Basın bülteni</b> · ${esc(new Date().toLocaleDateString("tr-TR", { month: "long", year: "numeric" }))}</span><span>berkaydogan.co/press</span></div>
<h1>Berkay Doğan</h1>
<p class="unvan">Şair ve yazar · İstanbul</p>
<p class="imza">“Yazmak, varoluşun en sessiz itirafıdır.”</p>
<p class="lead">${esc(BIO_ORTA_TR)}</p>
<p class="k">Rakamlarla</p>
<div class="rak">${[...RAKAMLAR.slice(0, 3), { deger: "__SIMDI__", aciklama: "__SIMDI_ACK__" }]
  .map((r) => `<div><b>${esc(r.deger)}</b><span>${esc(r.aciklama)}</span></div>`).join("")}</div>
<div class="iki">
  <div>
    <p class="k">Basında</p>
    <ul>${BASIN.slice(0, 8).map((b) => `<li><b>${esc(b.yayin)}</b> · ${esc(BASIN_TUR[b.tur].tr)} · ${esc(tarihTR(b.tarihISO, b.sadeceAy))}</li>`).join("")}${BASIN.length + EKRAN.length > 8 ? `<li style="color:#6C685E">ve ${BASIN.length + EKRAN.length - 8} çıkış daha (TV dahil) — tam liste basın kitinde</li>` : ""}</ul>
    <p class="k">Söyleşi konuları</p>
    <ul>${KONULAR.slice(0, 4).map((k) => `<li>${esc(k)}</li>`).join("")}</ul>
  </div>
  <div>
    <p class="k">Kendi sözleriyle</p>
    ${ALINTI_GRUPLARI.flatMap((g) => g.cumleler.slice(0, 2)).map((a) => `<p class="al">“${esc(a)}”</p>`).join("")}
    <p style="font-size:6.8pt;color:#6C685E">${ALINTI_GRUPLARI.map((g) => esc(g.kaynak.ad)).join(" · ")}</p>
    <p class="k">Kitaplar</p>
    <p>${esc(kitapSatiri)} — İskenderiye Yayınları</p>
    ${ytSatiri ? `<p class="k">İzle</p><p>${esc(ytSatiri)}</p>` : ""}
  </div>
</div>
<div class="alt"><div><b>İletişim</b><br>do.berkay@icloud.com</div><div style="text-align:right">Biyografiler, görseller, kitap künyeleri:<br><b>berkaydogan.co/press</b></div></div>
</body></html>`;

// nowby canlı sayısı (yoksa yerine dördüncü rakam)
let simdi: { deger: string; aciklama: string } = RAKAMLAR[3];
try {
  const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpb3V6aXpibHJrb2ptc3F2YmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3ODExMTQsImV4cCI6MjEwMjM1NzExNH0.rAPFD8zjD_LdGf4hnZW_asnxUS705XCxTII-RqhmZDM";
  const r = await fetch("https://uiouzizblrkojmsqvbjk.supabase.co/rest/v1/ana_ozet?select=veri&id=eq.1", { headers: { apikey: ANON, Authorization: `Bearer ${ANON}` } });
  const v = (await r.json())?.[0]?.veri;
  if (v?.ay_toplam) {
    const gun = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
    simdi = { deger: Number(v.ay_toplam).toLocaleString("tr-TR"), aciklama: `şarkı bu ay Türkiye radyolarında çaldı — nowby sayımı (${gun} itibarıyla)` };
  }
} catch { /* çevrimdışı: dördüncü rakam kalır */ }
const sonHtml = html.replace("__SIMDI__", esc(simdi.deger)).replace("__SIMDI_ACK__", esc(simdi.aciklama));

// PDF: Chrome'un başsız modu (puppeteer gerekmez). Yazı tipi yüklensin diye sanal zaman payı.
const htmlYol = join(KOK, ".basin-kiti-tmp", "bulten.html");
writeFileSync(htmlYol, sonHtml);
const pdfYol = join(CIKTI, "berkay-dogan-basin-bulteni.pdf");
execFileSync("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=8000",
  `--print-to-pdf=${pdfYol}`, `file://${htmlYol}`,
], { stdio: "ignore" });
copyFileSync(pdfYol, join(GECICI, "berkay-dogan-basin-bulteni.pdf"));

/* 4) ZIP */
const zipYol = join(CIKTI, "berkay-dogan-basin-kiti.zip");
if (existsSync(zipYol)) rmSync(zipYol);
execFileSync("zip", ["-rqX", zipYol, "berkay-dogan-basin-kiti"], { cwd: dirname(GECICI) });
rmSync(join(KOK, ".basin-kiti-tmp"), { recursive: true, force: true });
console.log("tamam:", pdfYol, zipYol);
