"use client";

import Link from "next/link";
import { useState } from "react";

/* writtenby.'nin ikinci katmanı: sanatçılar. Birinci katmanda şehir günde tek satır yazar;
   bu katmanda seçilmiş sanatçılar kendi eserleriyle durur. İkisi yıl sonunda aynı kitapta buluşur.
   Başvurular hereby sunucusundaki sanatci_basvur fonksiyonuna gider (tablo dışarıdan okunamaz). */

const MOR = "#7c6cff";
const SUNUCU = "https://cfulorbeeevcsebinnwt.supabase.co";
const ANAHTAR = "sb_publishable_lcE-SDFRydKEHpYHmH6KqQ_-FdTFUoI";

const appYazi: React.CSSProperties = { fontFamily: "ui-serif, 'New York', Georgia, serif", fontWeight: 700, lineHeight: 1 };
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif, Georgia), Georgia, serif" };
const bolum: React.CSSProperties = { maxWidth: "860px", margin: "0 auto", padding: "clamp(3rem, 8vh, 5rem) clamp(1.25rem, 5vw, 3rem)" };
const kart: React.CSSProperties = { background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", backdropFilter: "blur(12px)" };

const ADIMLAR = [
  { b: "Başvuru.", s: "Kendini bir mektupla anlat, bir eserini gönder. Her başvuru tek tek okunur." },
  { b: "Davet.", s: "Bazı sanatçılara biz yazarız. Davet edilen de aynı kapıdan, aynı mektupla girer." },
  { b: "Seçki.", s: "Az sayıda sanatçı kabul edilir. Kabul edilen her sanatçının writtenby.'de bir sayfası olur." },
  { b: "Kitap.", s: "Sitedeki eserler, günü geldiğinde şehrin satırlarıyla aynı kitapta buluşur: İstanbul 2027." },
];

const ALANLAR = ["Şiir", "Öykü", "Deneme", "Roman", "Tiyatro", "Resim", "Fotoğraf", "Müzik", "Diğer"];

const HATALAR: Record<string, string> = {
  onay: "Eserin sana ait olduğunu ve aydınlatma metnini onaylaman gerekiyor.",
  gecersiz: "Bazı alanlar eksik ya da hatalı görünüyor; adını, e-postanı ve alanını kontrol eder misin?",
  mektup: "Mektubun en az 150 karakter olmalı. Acele etme.",
  eser: "Eserini ya da eserinin bağlantısını eklemeyi unutma.",
  tekrar: "Bu e-postayla son 30 gün içinde bir başvuru zaten ulaştı. Mektubun okunuyor.",
  yogun: "Şu an çok fazla başvuru var. Biraz sonra yeniden dener misin?",
};

const alan: React.CSSProperties = {
  width: "100%", marginTop: "0.45rem", padding: "0.85rem 1rem", borderRadius: "14px",
  border: "1px solid var(--glass-border)", background: "transparent", color: "inherit",
  font: "inherit", fontSize: "1rem", lineHeight: 1.5,
};

function Etiket({ ad, alt, children }: { ad: string; alt?: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ fontWeight: 600 }}>{ad}</span>
      {alt && <span style={{ opacity: 0.6 }}> · {alt}</span>}
      {children}
    </label>
  );
}

function Onay({ ad, zorunlu, set, children }: { ad: string; zorunlu?: boolean; set: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", lineHeight: 1.55, cursor: "pointer" }}>
      <input type="checkbox" name={ad} required={zorunlu} onChange={(e) => set(e.target.checked)}
        style={{ marginTop: "0.3rem", width: "1.1rem", height: "1.1rem", accentColor: MOR, flexShrink: 0 }} />
      <span style={{ opacity: 0.9 }}>{children}{!zorunlu && <span style={{ opacity: 0.6 }}> (isteğe bağlı)</span>}</span>
    </label>
  );
}

export function WrittenbySanatci() {
  const [durum, setDurum] = useState<"bos" | "gidiyor" | "tamam">("bos");
  const [hata, setHata] = useState<string | null>(null);
  const [mektupBoy, setMektupBoy] = useState(0);
  const [izin, setIzin] = useState({ benim: false, site: false, kitap: false, aydinlatma: false });

  async function gonder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const s = (k: string) => String(f.get(k) ?? "");
    setDurum("gidiyor"); setHata(null);
    try {
      const r = await fetch(`${SUNUCU}/rest/v1/rpc/sanatci_basvur`, {
        method: "POST",
        headers: { apikey: ANAHTAR, "Content-Type": "application/json" },
        body: JSON.stringify({
          ad: s("ad"), eposta: s("eposta"), sehir: s("sehir"), alan: s("alan"), baglanti: s("baglanti"),
          mektup: s("mektup"), eser_baslik: s("eser_baslik"), eser: s("eser"),
          eser_benim: izin.benim, izin_site: izin.site, izin_kitap: izin.kitap, aydinlatma: izin.aydinlatma,
        }),
      });
      if (r.ok) { setDurum("tamam"); return; }
      const j = await r.json().catch(() => null);
      setHata(HATALAR[j?.message] ?? "Mektubun gönderilemedi. Bağlantını kontrol edip yeniden dener misin?");
    } catch {
      setHata("Mektubun gönderilemedi. Bağlantını kontrol edip yeniden dener misin?");
    }
    setDurum("bos");
  }

  return (
    <main lang="tr">
      <style>{`
        .wbs-adimlar{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:760px){.wbs-adimlar{grid-template-columns:repeat(2,minmax(0,1fr))}}
        .wbs-ikili{display:grid;gap:1.2rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:640px){.wbs-ikili{grid-template-columns:repeat(2,minmax(0,1fr))}}
        .wbs-form input:not([type=checkbox]):focus,.wbs-form textarea:focus,.wbs-form select:focus{outline:2px solid ${MOR};outline-offset:1px}
        .wbs-form select option{color:#111}
      `}</style>

      {/* AÇILIŞ */}
      <section style={{ ...bolum, paddingTop: "clamp(4rem, 12vh, 7rem)", textAlign: "center" }}>
        <Link href="/writtenby/" style={{ ...appYazi, fontSize: "clamp(2.2rem, 7vw, 3rem)", color: "inherit", textDecoration: "none" }}>
          written<span style={{ color: MOR }}>by.</span>
        </Link>
        <p style={{ ...mono, color: MOR, marginTop: "1.4rem" }}>Sanatçılar</p>
        <h1 style={{ ...serif, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(2.1rem, 6vw, 3.6rem)", lineHeight: 1.15, marginTop: "1rem" }}>
          Bir şehrin satırları arasında, imzalı sayfalar.
        </h1>
        <p style={{ ...serif, fontSize: "clamp(1.1rem, 2.4vw, 1.35rem)", lineHeight: 1.65, maxWidth: "620px", margin: "1.6rem auto 0", opacity: 0.85 }}>
          writtenby.&apos;de bir şehir her gün tek satır yazar. O satırların arasında, seçilmiş sanatçıların kendi eserleriyle durduğu sayfalar var.
          Konu serbest, biçim serbest. Tek şart: eserin senin olması.
        </p>
      </section>

      {/* NASIL */}
      <section style={bolum}>
        <p style={{ ...mono, opacity: 0.6 }}>Kapı</p>
        <div className="wbs-adimlar" style={{ marginTop: "1.6rem" }}>
          {ADIMLAR.map((a, n) => (
            <div key={a.b} style={{ ...kart, padding: "clamp(1.3rem, 3vw, 1.9rem)" }}>
              <span style={{ ...appYazi, fontSize: "2.4rem", color: MOR }}>{n + 1}</span>
              <h2 style={{ ...serif, fontSize: "1.4rem", marginTop: "0.8rem", fontWeight: 600 }}>{a.b}</h2>
              <p style={{ marginTop: "0.5rem", lineHeight: 1.6, opacity: 0.8 }}>{a.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RIZA */}
      <section style={{ ...bolum, textAlign: "center" }}>
        <p style={{ ...mono, color: MOR }}>Rıza</p>
        <p style={{ ...serif, fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: 1.35, marginTop: "1rem" }}>
          Eserin senindir. Yayımlanmasına da kitaba girmesine de yalnız sen karar verirsin; iznini istediğin zaman geri alabilirsin.
        </p>
      </section>

      {/* BAŞVURU */}
      <section id="basvuru" style={bolum}>
        <div style={{ ...kart, padding: "clamp(1.6rem, 5vw, 3rem)" }}>
          {durum === "tamam" ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <p style={{ ...appYazi, fontSize: "3rem", color: MOR }}>✓</p>
              <h2 style={{ ...serif, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.8rem, 5vw, 2.6rem)", marginTop: "1rem" }}>Mektubun ulaştı.</h2>
              <p style={{ ...serif, fontSize: "1.2rem", lineHeight: 1.6, marginTop: "1rem", opacity: 0.85 }}>
                Her başvuru tek tek okunur. Cevabımız e-postana gelecek.
              </p>
            </div>
          ) : (
            <form className="wbs-form" onSubmit={gonder} style={{ display: "grid", gap: "1.3rem" }}>
              <div>
                <p style={{ ...mono, opacity: 0.6 }}>Başvuru</p>
                <h2 style={{ ...serif, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.8rem, 5vw, 2.6rem)", marginTop: "0.6rem" }}>Bu bir form değil, bir mektup.</h2>
                <p style={{ marginTop: "0.6rem", lineHeight: 1.6, opacity: 0.75 }}>Acele etme. Başvurular Berkay Doğan tarafından okunur.</p>
              </div>

              <div className="wbs-ikili">
                <Etiket ad="Adın" alt="ya da mahlasın"><input name="ad" required maxLength={120} autoComplete="name" style={alan} /></Etiket>
                <Etiket ad="E-postan"><input name="eposta" type="email" required maxLength={200} autoComplete="email" style={alan} /></Etiket>
                <Etiket ad="Şehrin"><input name="sehir" maxLength={80} autoComplete="address-level2" style={alan} /></Etiket>
                <Etiket ad="Alanın">
                  <select name="alan" required defaultValue="" style={alan}>
                    <option value="" disabled>Seç</option>
                    {ALANLAR.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </Etiket>
              </div>

              <Etiket ad="Bağlantı" alt="isteğe bağlı: web siten, portfolyon ya da kitabın">
                <input name="baglanti" type="url" maxLength={400} placeholder="https://" style={alan} />
              </Etiket>

              <Etiket ad="Mektubun" alt="writtenby.'de neden yer almak istiyorsun?">
                <textarea name="mektup" required minLength={150} maxLength={4000} rows={7} onChange={(e) => setMektupBoy(e.target.value.trim().length)}
                  placeholder="Kendini birkaç paragrafla anlat." style={{ ...alan, resize: "vertical" }} />
                <span style={{ display: "block", textAlign: "right", fontSize: "0.85rem", marginTop: "0.3rem", opacity: 0.55 }}>
                  {mektupBoy < 150 ? `en az 150 karakter · ${mektupBoy}` : `${mektupBoy}`}
                </span>
              </Etiket>

              <Etiket ad="Eserinin adı" alt="isteğe bağlı"><input name="eser_baslik" maxLength={200} style={alan} /></Etiket>

              <Etiket ad="Eserin" alt="metinse buraya yaz; görsel ya da sesse bağlantısını ver">
                <textarea name="eser" required minLength={10} maxLength={8000} rows={9} style={{ ...alan, resize: "vertical", fontFamily: "var(--font-serif, Georgia), Georgia, serif" }} />
              </Etiket>

              <div style={{ display: "grid", gap: "0.8rem", marginTop: "0.4rem" }}>
                <Onay ad="eser_benim" zorunlu set={(v) => setIzin((i) => ({ ...i, benim: v }))}>Gönderdiğim eser bana aittir.</Onay>
                <Onay ad="izin_site" set={(v) => setIzin((i) => ({ ...i, site: v }))}>Kabul edilirsem eserimin writtenby. sitesinde yayımlanmasına izin veriyorum.</Onay>
                <Onay ad="izin_kitap" set={(v) => setIzin((i) => ({ ...i, kitap: v }))}>Kabul edilirsem eserimin writtenby. kitabında basılmasına izin veriyorum.</Onay>
                <Onay ad="aydinlatma" zorunlu set={(v) => setIzin((i) => ({ ...i, aydinlatma: v }))}>
                  Aşağıdaki aydınlatma metnini okudum; bilgilerimin başvurumun değerlendirilmesi için işlenmesini kabul ediyorum.
                </Onay>
              </div>

              <details style={{ fontSize: "0.92rem", lineHeight: 1.6, opacity: 0.75 }}>
                <summary style={{ cursor: "pointer" }}>Aydınlatma metni</summary>
                <p style={{ marginTop: "0.6rem" }}>
                  Veri sorumlusu Berkay Doğan&apos;dır. Bu formdaki adın, e-postan, şehrin, alanın, bağlantın, mektubun ve eserin yalnızca başvurunu
                  değerlendirmek ve sana dönmek için işlenir; reklam ya da pazarlama için kullanılmaz, kimseyle satılmaz ya da paylaşılmaz.
                  Bilgiler Supabase&apos;in Frankfurt (AB) sunucularında saklanır. Kabul edilmeyen başvurular en geç 6 ay içinde silinir.
                  Kötüye kullanımı önlemek için IP adresinin geri döndürülemez bir özeti tutulur. Eserin, yalnızca verdiğin izinler ölçüsünde yayımlanır.
                  KVKK kapsamındaki haklarını kullanmak ya da başvurunu geri çekmek için: do.berkay@icloud.com
                </p>
              </details>

              {hata && <p role="alert" style={{ color: "#ff6b5b", lineHeight: 1.5 }}>{hata}</p>}

              <button type="submit" disabled={durum === "gidiyor"}
                style={{ justifySelf: "start", padding: "0.95rem 1.8rem", borderRadius: "999px", border: "none", background: MOR, color: "#fff",
                  fontSize: "1.05rem", fontWeight: 600, cursor: durum === "gidiyor" ? "wait" : "pointer", opacity: durum === "gidiyor" ? 0.6 : 1 }}>
                {durum === "gidiyor" ? "Gönderiliyor…" : "Mektubu gönder"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* KAPANIŞ */}
      <section style={{ ...bolum, textAlign: "center", paddingBottom: "clamp(4rem, 12vh, 7rem)" }}>
        <p style={{ marginTop: "0.4rem" }}>
          <Link href="/writtenby/" style={{ ...mono, color: MOR, textDecoration: "none" }}>← writtenby.: bir şehrin yazdığı kitap</Link>
        </p>
        <p style={{ ...mono, opacity: 0.6, marginTop: "2rem" }}><Link href="/by/" style={{ color: "inherit", textDecoration: "none" }}>by. atölyesinin bir işi</Link></p>
      </section>
    </main>
  );
}
