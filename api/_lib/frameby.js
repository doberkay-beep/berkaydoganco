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

// Google Play (Android): uygulama Play'in abonelik kaydını (purchaseToken) gönderir; sunucu Google Play Developer API
// (purchases.subscriptionsv2.get) ile sorar. Kimlik: Play Console'a bağlı bir Google Cloud hizmet hesabı, JSON anahtarı
// FRAMEBY_PLAY_HESAP ortam değişkeninde (yalnız Vercel'de; depoya girmez). Hesaba Play Console'da
// "Finansal verileri görüntüle / siparişleri ve abonelikleri yönet" izni verilir.
const PLAY_KAPSAM = "https://www.googleapis.com/auth/androidpublisher";
const PLAY_ETKIN = new Set(["SUBSCRIPTION_STATE_ACTIVE", "SUBSCRIPTION_STATE_IN_GRACE_PERIOD"]);
let playErisim = null; // { belirtec, bitis }

async function playErisimi(hesapJson, getir, simdi) {
  if (playErisim && playErisim.bitis - 60_000 > simdi) return playErisim.belirtec;
  if (!hesapJson) throw new Error("FRAMEBY_PLAY_HESAP yok");
  const hesap = typeof hesapJson === "string" ? JSON.parse(hesapJson) : hesapJson;
  const iat = Math.floor(simdi / 1000);
  const govde = `${b64u(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64u(JSON.stringify({
    iss: hesap.client_email, scope: PLAY_KAPSAM, aud: "https://oauth2.googleapis.com/token", iat, exp: iat + 3600,
  }))}`;
  const jwt = `${govde}.${b64u(crypto.sign("RSA-SHA256", Buffer.from(govde), hesap.private_key))}`;
  const y = await getir("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }).toString(),
  });
  if (!y.ok) throw new Error("play-kimlik");
  const j = await y.json();
  playErisim = { belirtec: j.access_token, bitis: simdi + (j.expires_in || 3600) * 1000 };
  return playErisim.belirtec;
}

/** Play abonelik kaydını doğrular; etkinse aboneliğin bitişini (ms) döner, değilse hata fırlatır. */
export async function playDogrula(kayit, { simdi = Date.now(), getir = fetch, hesap = process.env.FRAMEBY_PLAY_HESAP } = {}) {
  const { paket, urun, token } = kayit || {};
  if (paket !== PAKET || urun !== URUN) throw new Error("urun");
  if (typeof token !== "string" || !/^[A-Za-z0-9._:-]{10,2048}$/.test(token)) throw new Error("bicim");
  const erisim = await playErisimi(hesap, getir, simdi);
  const adres = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${PAKET}/purchases/subscriptionsv2/tokens/${encodeURIComponent(token)}`;
  const y = await getir(adres, { headers: { authorization: `Bearer ${erisim}` } });
  if (y.status === 404 || y.status === 410 || y.status === 400) throw new Error("kayit");
  if (!y.ok) throw new Error("play");
  const a = await y.json();
  if (!PLAY_ETKIN.has(a.subscriptionState)) throw new Error("bitti");
  const kalem = (a.lineItems || []).find((l) => l.productId === URUN);
  const bitis = kalem ? Date.parse(kalem.expiryTime) : NaN;
  if (!(bitis > simdi)) throw new Error("bitti");
  return bitis;
}

/** Test için: önbellekteki Play erişim belirtecini unutur. */
export function playErisiminiUnut() {
  playErisim = null;
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
