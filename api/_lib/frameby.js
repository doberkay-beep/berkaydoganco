// frameby. ücretli katmanları: abonelik doğrulama ve kısa ömürlü anahtar.
// Karar: Berkay 25 Kas 2026 ("Evet, kur"). Ücretli karelerin görselleri gizli Blob deposunda (frameby-ozel),
// uygulama yalnız App Store'un imzaladığı abonelik kaydıyla anahtar alır.
import crypto from "node:crypto";

export const PAKET = "co.berkaydogan.frameby";
export const URUN = "co.berkaydogan.frameby.plus.yillik";
// Apple Root CA - G3, SHA-256 (apple.com/certificateauthority/AppleRootCA-G3.cer, 25 Kas 2026'da indirildi).
const APPLE_KOK = "63343abfb89a6a03ebb57e9b3f5fa7be7c4f5c756f3017b3a8c488c3653e9179";
const ANAHTAR_OMRU = 12 * 60 * 60 * 1000; // en çok 12 saat

const b64u = (b) => Buffer.from(b).toString("base64url");
const derToPem = (b64) => `-----BEGIN CERTIFICATE-----\n${b64.match(/.{1,64}/g).join("\n")}\n-----END CERTIFICATE-----\n`;

/** StoreKit 2 JWS (Transaction.jwsRepresentation) doğrular; geçerliyse yükü döner, değilse hata fırlatır. */
export function islemiDogrula(jws, simdi = Date.now(), kok = APPLE_KOK) {
  const parcalar = String(jws || "").split(".");
  if (parcalar.length !== 3) throw new Error("bicim");
  const [h, p, s] = parcalar;
  const baslik = JSON.parse(Buffer.from(h, "base64url").toString("utf8"));
  if (baslik.alg !== "ES256" || !Array.isArray(baslik.x5c) || baslik.x5c.length !== 3) throw new Error("baslik");
  const [yaprak, ara, kokSert] = baslik.x5c.map((c) => new crypto.X509Certificate(derToPem(c)));
  const parmak = crypto.createHash("sha256").update(kokSert.raw).digest("hex");
  if (parmak !== kok) throw new Error("kok");
  const an = new Date(simdi);
  for (const c of [yaprak, ara, kokSert]) {
    if (new Date(c.validFrom) > an || new Date(c.validTo) < an) throw new Error("sure");
  }
  if (!kokSert.verify(kokSert.publicKey) || !ara.verify(kokSert.publicKey) || !yaprak.verify(ara.publicKey)) throw new Error("zincir");
  if (!ara.checkIssued(kokSert) || !yaprak.checkIssued(ara)) throw new Error("zincir");
  const imzaGecerli = crypto.verify("sha256", Buffer.from(`${h}.${p}`), { key: yaprak.publicKey, dsaEncoding: "ieee-p1363" }, Buffer.from(s, "base64url"));
  if (!imzaGecerli) throw new Error("imza");
  const yuk = JSON.parse(Buffer.from(p, "base64url").toString("utf8"));
  if (yuk.bundleId !== PAKET || yuk.productId !== URUN) throw new Error("urun");
  if (yuk.revocationDate) throw new Error("iade");
  if (!yuk.expiresDate || yuk.expiresDate <= simdi) throw new Error("bitti");
  return yuk;
}

function imza(metin) {
  const sir = process.env.FRAMEBY_IMZA;
  if (!sir) throw new Error("FRAMEBY_IMZA yok");
  return crypto.createHmac("sha256", sir).update(metin).digest("base64url");
}

/** Abonelik bitişini aşmayan, en çok 12 saatlik anahtar. */
export function anahtarUret(aboneBitis, simdi = Date.now()) {
  const bitis = Math.min(aboneBitis, simdi + ANAHTAR_OMRU);
  const govde = b64u(JSON.stringify({ b: bitis }));
  return { anahtar: `${govde}.${imza(govde)}`, bitis };
}

export function anahtarGecerli(anahtar, simdi = Date.now()) {
  const [govde, im] = String(anahtar || "").split(".");
  if (!govde || !im) return false;
  const beklenen = imza(govde);
  if (beklenen.length !== im.length || !crypto.timingSafeEqual(Buffer.from(beklenen), Buffer.from(im))) return false;
  try {
    return JSON.parse(Buffer.from(govde, "base64url").toString("utf8")).b > simdi;
  } catch {
    return false;
  }
}
