import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* Yazar-noir paylaşım kartları (1200×630) — bütün opengraph-image dosyaları buradan çizer.
   Kırık beyaz / gece, altı sütun ince ızgara, Inter Tight (lib/og'da, OFL; derlemede ağ gerekmez). */

export const OG_BOYUT = { width: 1200, height: 630 };
export const KAGIT = "#eeede8";
export const GECE = "#141414";
export const SOLUK = "#5c5b55";

export async function ogYazilar() {
  const veri = await readFile(join(process.cwd(), "lib/og/InterTight-Medium.ttf"));
  return [{ name: "Inter Tight", data: veri, weight: 500 as const, style: "normal" as const }];
}

/** public/ altındaki bir görseli data URI olarak okur (Satori dış URL beklemesin). */
export async function gorsel(yol: string) {
  const veri = await readFile(join(process.cwd(), "public", yol));
  const tur = yol.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${tur};base64,${veri.toString("base64")}`;
}

/** Altı sütunlu ince dikey ızgara — kartın kâğıdına çizili. */
export function Izgara({ renk }: { renk: string }) {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex" }}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ display: "flex", position: "absolute", top: 0, bottom: 0, left: 48 + i * 184, width: 1, background: renk }} />
      ))}
      <div style={{ display: "flex", position: "absolute", top: 0, bottom: 0, left: 1152, width: 1, background: renk }} />
    </div>
  );
}

const etiket = { fontSize: 17, letterSpacing: 0.4 };
/** Satori "text-transform"da Türkçe İ/ı ayrımını yapmaz; büyük harfi yerele göre biz çeviririz. */
const B = (m: string, dil: "tr" | "en" = "tr") => m.toLocaleUpperCase(dil === "tr" ? "tr-TR" : "en-US");

/** İç sayfa kartı: üst künye, büyük başlık, alt satır. İstenirse sağda kapak/görsel. */
export function Kart({
  ust, baslik, alt, solAlt, sagAlt, boy = 92, gorselSrc, gorselGenislik = 300, dil = "tr",
}: {
  dil?: "tr" | "en"; ust: string; baslik: string; alt?: string; solAlt?: string; sagAlt?: string; boy?: number; gorselSrc?: string; gorselGenislik?: number;
}) {
  const metinGenislik = gorselSrc ? 1104 - gorselGenislik - 64 : 1000;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: KAGIT, color: GECE, fontFamily: "Inter Tight" }}>
      <Izgara renk="rgba(22,22,22,0.09)" />
      <div style={{ position: "absolute", top: 40, left: 58, right: 58, display: "flex", justifyContent: "space-between", ...etiket, color: SOLUK }}>
        <div style={{ display: "flex" }}>{B(ust, dil)}</div>
        <div style={{ display: "flex" }}>BERKAYDOGAN.CO</div>
      </div>
      <div style={{ position: "absolute", left: 58, top: 120, width: metinGenislik, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: boy, lineHeight: 1.0, letterSpacing: -boy * 0.055 }}>{baslik}</div>
        {alt ? <div style={{ display: "flex", fontSize: 28, lineHeight: 1.35, letterSpacing: -0.6, color: SOLUK, marginTop: 30 }}>{alt}</div> : null}
      </div>
      {gorselSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={gorselSrc} width={gorselGenislik} style={{ position: "absolute", right: 58, top: 92, width: gorselGenislik }} alt="" />
      ) : null}
      <div style={{ position: "absolute", left: 58, right: 58, bottom: 38, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ display: "flex", fontSize: 40, letterSpacing: -2.6 }}>{solAlt ?? "berkay doğan"}</div>
        {sagAlt ? <div style={{ display: "flex", ...etiket, color: SOLUK }}>{B(sagAlt, dil)}</div> : null}
      </div>
    </div>
  );
}

/** Ana sayfa / İngilizce kartı: fırtınalı Boğaz karesi (Berkay'ın fotoğrafı) üstünde büyük ad. */
export function AnaKart({ foto, ust, solAlt, sagAlt, dil = "tr" }: { foto: string; ust: string; solAlt: string; sagAlt: string; dil?: "tr" | "en" }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: GECE, color: KAGIT, fontFamily: "Inter Tight" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={foto} width={1200} height={800} style={{ position: "absolute", top: -90, left: 0, width: 1200, height: 800 }} alt="" />
      <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex", background: "rgba(10,10,10,0.5)" }} />
      <Izgara renk="rgba(239,238,232,0.13)" />
      <div style={{ position: "absolute", top: 40, left: 58, right: 58, display: "flex", justifyContent: "space-between", ...etiket, color: "rgba(239,238,232,0.85)" }}>
        <div style={{ display: "flex" }}>{B(ust, dil)}</div>
        <div style={{ display: "flex" }}>BERKAYDOGAN.CO</div>
      </div>
      <div style={{ position: "absolute", left: 46, top: 108, display: "flex", flexDirection: "column", fontSize: 232, lineHeight: 0.86, letterSpacing: -19 }}>
        <div style={{ display: "flex" }}>berkay</div>
        <div style={{ display: "flex", paddingLeft: 184 }}>doğan</div>
      </div>
      <div style={{ position: "absolute", left: 58, right: 58, bottom: 38, display: "flex", justifyContent: "space-between", ...etiket, color: "rgba(239,238,232,0.85)" }}>
        <div style={{ display: "flex" }}>{B(solAlt, dil)}</div>
        <div style={{ display: "flex" }}>{B(sagAlt, dil)}</div>
      </div>
    </div>
  );
}
