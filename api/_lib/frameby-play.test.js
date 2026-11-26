// node --test api/_lib/frameby-play.test.js
// Play doğrulaması: Google'a gitmeden, sahte fetch ve bu test için üretilen bir RSA anahtarıyla.
import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { playDogrula, playErisiminiUnut, PAKET, URUN } from "./frameby.js";

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
const hesap = { client_email: "frameby@deneme.iam.gserviceaccount.com", private_key: privateKey.export({ type: "pkcs8", format: "pem" }) };
const simdi = Date.parse("2026-11-26T12:00:00Z");
const token = "abcdefghij.klmnop-QRS_tuv";

function sahte(abonelik, { kimlikDurum = 200 } = {}) {
  const istekler = [];
  const getir = async (adres, secenek = {}) => {
    istekler.push({ adres, secenek });
    if (adres.startsWith("https://oauth2.googleapis.com/token")) {
      const jwt = new URLSearchParams(secenek.body).get("assertion");
      const [h, p, s] = jwt.split(".");
      assert.ok(crypto.verify("RSA-SHA256", Buffer.from(`${h}.${p}`), publicKey, Buffer.from(s, "base64url")));
      const yuk = JSON.parse(Buffer.from(p, "base64url"));
      assert.equal(yuk.iss, hesap.client_email);
      assert.equal(yuk.scope, "https://www.googleapis.com/auth/androidpublisher");
      return new Response(JSON.stringify({ access_token: "erisim", expires_in: 3600 }), { status: kimlikDurum });
    }
    assert.equal(secenek.headers.authorization, "Bearer erisim");
    assert.ok(adres.endsWith(`/applications/${PAKET}/purchases/subscriptionsv2/tokens/${encodeURIComponent(token)}`));
    return abonelik === null ? new Response("{}", { status: 404 }) : new Response(JSON.stringify(abonelik), { status: 200 });
  };
  return { getir, istekler };
}

const etkin = (durum, bitis = "2027-11-26T12:00:00Z") => ({ subscriptionState: durum, lineItems: [{ productId: URUN, expiryTime: bitis }] });

test("etkin abonelik bitişini döner", async () => {
  playErisiminiUnut();
  const { getir } = sahte(etkin("SUBSCRIPTION_STATE_ACTIVE"));
  const b = await playDogrula({ paket: PAKET, urun: URUN, token }, { simdi, getir, hesap });
  assert.equal(b, Date.parse("2027-11-26T12:00:00Z"));
});

test("ödeme gecikmesi süresinde de geçerli", async () => {
  playErisiminiUnut();
  const { getir } = sahte(etkin("SUBSCRIPTION_STATE_IN_GRACE_PERIOD", "2026-11-28T00:00:00Z"));
  assert.ok((await playDogrula({ paket: PAKET, urun: URUN, token }, { simdi, getir, hesap })) > simdi);
});

test("biten, beklemedeki, iptal edilip süresi dolan reddedilir", async () => {
  for (const d of ["SUBSCRIPTION_STATE_EXPIRED", "SUBSCRIPTION_STATE_ON_HOLD", "SUBSCRIPTION_STATE_PENDING"]) {
    playErisiminiUnut();
    const { getir } = sahte(etkin(d));
    await assert.rejects(playDogrula({ paket: PAKET, urun: URUN, token }, { simdi, getir, hesap }), /bitti/);
  }
  playErisiminiUnut();
  const { getir } = sahte(etkin("SUBSCRIPTION_STATE_ACTIVE", "2026-11-25T00:00:00Z"));
  await assert.rejects(playDogrula({ paket: PAKET, urun: URUN, token }, { simdi, getir, hesap }), /bitti/);
});

test("başka ürün ya da paket, bozuk kayıt reddedilir", async () => {
  const { getir, istekler } = sahte(etkin("SUBSCRIPTION_STATE_ACTIVE"));
  await assert.rejects(playDogrula({ paket: "baska.paket", urun: URUN, token }, { simdi, getir, hesap }), /urun/);
  await assert.rejects(playDogrula({ paket: PAKET, urun: "baska", token }, { simdi, getir, hesap }), /urun/);
  await assert.rejects(playDogrula({ paket: PAKET, urun: URUN, token: "../x" }, { simdi, getir, hesap }), /bicim/);
  assert.equal(istekler.length, 0);
  playErisiminiUnut();
  const yok = sahte(null);
  await assert.rejects(playDogrula({ paket: PAKET, urun: URUN, token }, { simdi, getir: yok.getir, hesap }), /kayit/);
  playErisiminiUnut();
  const baska = sahte({ subscriptionState: "SUBSCRIPTION_STATE_ACTIVE", lineItems: [{ productId: "baska", expiryTime: "2027-01-01T00:00:00Z" }] });
  await assert.rejects(playDogrula({ paket: PAKET, urun: URUN, token }, { simdi, getir: baska.getir, hesap }), /bitti/);
});

test("erişim belirteci bir saat önbellekte", async () => {
  playErisiminiUnut();
  const { getir, istekler } = sahte(etkin("SUBSCRIPTION_STATE_ACTIVE"));
  await playDogrula({ paket: PAKET, urun: URUN, token }, { simdi, getir, hesap });
  await playDogrula({ paket: PAKET, urun: URUN, token }, { simdi: simdi + 30 * 60_000, getir, hesap });
  assert.equal(istekler.filter((i) => i.adres.includes("oauth2")).length, 1);
});
