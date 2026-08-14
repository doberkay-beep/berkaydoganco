// Ağ kısıtı yüzünden gerçek radyolara bu ortamdan bağlanılamıyor.
// Bu self-test, ICY durum makinesini ve sınıflandırmayı localhost'ta
// sahte bir ICY sunucusuyla doğrular. Çalıştır: node probe/selftest.mjs

import net from "node:net";
import assert from "node:assert/strict";
import { probeIcy, parseStreamTitle } from "./lib/icy.mjs";
import { classify } from "./lib/classify.mjs";

// icy-metaint kadar ses (0x00) + [uzunluk byte] + hizalanmış metadata bloğu
// üreten minik bir sahte Shoutcast sunucusu.
function fakeIcyServer({ metaint = 64, title = "Test - Parça", statusLine = "ICY 200 OK", withMetaint = true }) {
  return new Promise((resolve) => {
    const server = net.createServer((sock) => {
      sock.once("data", () => {
        const headers =
          `${statusLine}\r\n` +
          `content-type: audio/mpeg\r\n` +
          (withMetaint ? `icy-metaint: ${metaint}\r\n` : "") +
          `\r\n`;
        sock.write(Buffer.from(headers, "latin1"));

        if (!withMetaint) return; // metadata göndermeyen istasyonu taklit et

        const audio = Buffer.alloc(metaint, 0);
        const meta = Buffer.from(`StreamTitle='${title}';`, "utf8");
        const blocks = Math.ceil(meta.length / 16);
        const padded = Buffer.alloc(blocks * 16, 0);
        meta.copy(padded);
        sock.write(Buffer.concat([audio, Buffer.from([blocks]), padded]));
      });
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

let failed = 0;
const check = (name, fn) => {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (e) {
    failed++;
    console.error(`  ✗ ${name}\n     ${e.message}`);
  }
};

async function main() {
  console.log("ICY ayrıştırıcı ve sınıflandırma testleri:\n");

  // 1) StreamTitle ayıklama (UTF-8, Türkçe karakter)
  check("parseStreamTitle UTF-8", () => {
    const buf = Buffer.from("StreamTitle='Müslüm Gürses - Nilüfer';\0\0", "utf8");
    assert.equal(parseStreamTitle(buf), "Müslüm Gürses - Nilüfer");
  });

  // 2) Uçtan uca: sahte ICY sunucusundan başlığı oku
  const s1 = await fakeIcyServer({ metaint: 100, title: "Sezen Aksu - Firuze" });
  const p1 = s1.address().port;
  const r1 = await probeIcy(`http://127.0.0.1:${p1}/`, { timeout: 3000 });
  s1.close();
  check("probeIcy başlığı okur", () => {
    assert.equal(r1.status, "ok");
    assert.equal(r1.title, "Sezen Aksu - Firuze");
  });

  // 3) icy-metaint yoksa 'none'
  const s2 = await fakeIcyServer({ withMetaint: false });
  const p2 = s2.address().port;
  const r2 = await probeIcy(`http://127.0.0.1:${p2}/`, { timeout: 3000 });
  s2.close();
  check("metaint yoksa none", () => assert.equal(r2.status, "none"));

  // 4) Bağlanılamayan port → dead
  const r3 = await probeIcy("http://127.0.0.1:1/", { timeout: 2000 });
  check("kapalı port → dead", () => assert.equal(r3.status, "dead"));

  // 5) Sınıflandırma
  const st = { name: "Test FM", hls: false };
  check("değişen başlık → good", () =>
    assert.equal(
      classify(st, [
        { status: "ok", title: "A - 1" },
        { status: "ok", title: "B - 2" },
        { status: "ok", title: "C - 3" },
      ]),
      "good",
    ),
  );
  check("sabit başlık → static", () =>
    assert.equal(
      classify({ name: "X", hls: false }, [
        { status: "ok", title: "sabit metin" },
        { status: "ok", title: "sabit metin" },
        { status: "ok", title: "sabit metin" },
      ]),
      "static",
    ),
  );
  check("reklam/.com → junk", () =>
    assert.equal(
      classify(st, [
        { status: "ok", title: "www.reklam.com" },
        { status: "ok", title: "canlı yayın" },
        { status: "ok", title: "reklam" },
      ]),
      "junk",
    ),
  );
  check("istasyon adı içeren → junk", () =>
    assert.equal(
      classify({ name: "Kral FM", hls: false }, [
        { status: "ok", title: "Kral FM" },
        { status: "ok", title: "Kral FM" },
        { status: "ok", title: "Kral FM" },
      ]),
      "junk",
    ),
  );
  check("hep dead → dead", () =>
    assert.equal(
      classify(st, [{ status: "dead" }, { status: "dead" }, { status: "dead" }]),
      "dead",
    ),
  );
  check("hep none → none", () =>
    assert.equal(
      classify(st, [{ status: "none" }, { status: "none" }, { status: "none" }]),
      "none",
    ),
  );
  check("hls istasyon → hls", () =>
    assert.equal(classify({ name: "BBC", hls: true }, [{ status: "hls" }]), "hls"),
  );

  console.log(failed === 0 ? "\nTüm testler geçti." : `\n${failed} test başarısız.`);
  process.exitCode = failed === 0 ? 0 : 1;
}

main();
