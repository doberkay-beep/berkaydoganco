"use client";

import Link from "next/link";
import { useState } from "react";

/* writtenby.'nin ikinci katmanı: sanatçılar. Birinci katmanda şehir günde tek satır yazar;
   bu katmanda seçilmiş sanatçılar kendi eserleriyle durur. İkisi yıl sonunda aynı kitapta buluşur.
   Başvurular hereby sunucusundaki sanatci_basvur fonksiyonuna gider (tablo dışarıdan okunamaz). */

export const MOR = "#7c6cff";
export const SUNUCU = "https://cfulorbeeevcsebinnwt.supabase.co";
export const ANAHTAR = "sb_publishable_lcE-SDFRydKEHpYHmH6KqQ_-FdTFUoI";

const appYazi: React.CSSProperties = { fontFamily: "ui-serif, 'New York', Georgia, serif", fontWeight: 700, lineHeight: 1 };
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif, Georgia), Georgia, serif" };
const bolum: React.CSSProperties = { maxWidth: "860px", margin: "0 auto", padding: "clamp(3rem, 8vh, 5rem) clamp(1.25rem, 5vw, 3rem)" };
const kart: React.CSSProperties = { background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", backdropFilter: "blur(12px)" };

type Adim = { b: string; s: string };
export type SanatciMetin = {
  dil: "tr" | "en";
  etiket: string; baslik: string; giris: string;
  kapiEtiket: string; adimlar: Adim[];
  rizaEtiket: string; riza: string;
  formEtiket: string; formBaslik: string; formAlt: string;
  ad: string; adAlt: string; eposta: string; sehir: string; alan: string; sec: string; alanlar: [string, string][];
  baglanti: string; baglantiAlt: string;
  mektup: string; mektupAlt: string; mektupYer: string; enAz: string;
  eserAdi: string; istege: string; eser: string; eserAlt: string; istegeBagli: string;
  onayBenim: string; onaySite: string; onayKitap: string; onayAydinlatma: string;
  aydinlatmaBaslik: string; aydinlatma: string;
  gonder: string; gidiyor: string;
  tamamBaslik: string; tamamMetin: string;
  hatalar: Record<string, string>; genelHata: string;
  geri: string; geriHref: string; atolye: string; atolyeHref: string;
};

export const SANATCI_TR: SanatciMetin = {
  dil: "tr",
  etiket: "Sanatçılar",
  baslik: "Bir şehrin satırları arasında, imzalı sayfalar.",
  giris: "writtenby.'de bir şehir her gün tek satır yazar. O satırların arasında, seçilmiş sanatçıların kendi eserleriyle durduğu sayfalar var. Konu serbest, biçim serbest. Tek şart: eserin senin olması.",
  kapiEtiket: "Kapı",
  adimlar: [
    { b: "Başvuru.", s: "Kendini bir mektupla anlat, bir eserini gönder. Her başvuru tek tek okunur." },
    { b: "Davet.", s: "Bazı sanatçılara biz yazarız. Davet edilen de aynı kapıdan, aynı mektupla girer." },
    { b: "Seçki.", s: "Az sayıda sanatçı kabul edilir. Kabul edilen her sanatçının writtenby.'de bir sayfası olur." },
    { b: "Kitap.", s: "Sitedeki eserler, günü geldiğinde şehrin satırlarıyla aynı kitapta buluşur: İstanbul 2027." },
  ],
  rizaEtiket: "Rıza",
  riza: "Eserin senindir. Yayımlanmasına da kitaba girmesine de yalnız sen karar verirsin; iznini istediğin zaman geri alabilirsin.",
  formEtiket: "Başvuru",
  formBaslik: "Bu bir form değil, bir mektup.",
  formAlt: "Acele etme. Başvurular Berkay Doğan tarafından okunur.",
  ad: "Adın", adAlt: "ya da mahlasın", eposta: "E-postan", sehir: "Şehrin", alan: "Alanın", sec: "Seç",
  alanlar: [["Şiir", "Şiir"], ["Öykü", "Öykü"], ["Deneme", "Deneme"], ["Roman", "Roman"], ["Tiyatro", "Tiyatro"], ["Resim", "Resim"], ["Fotoğraf", "Fotoğraf"], ["Müzik", "Müzik"], ["Diğer", "Diğer"]],
  baglanti: "Bağlantı", baglantiAlt: "isteğe bağlı: web siten, portfolyon ya da kitabın",
  mektup: "Mektubun", mektupAlt: "writtenby.'de neden yer almak istiyorsun?", mektupYer: "Kendini birkaç paragrafla anlat.", enAz: "en az 150 karakter",
  eserAdi: "Eserinin adı", istege: "isteğe bağlı", eser: "Eserin", eserAlt: "metinse buraya yaz; görsel ya da sesse bağlantısını ver", istegeBagli: "isteğe bağlı",
  onayBenim: "Gönderdiğim eser bana aittir.",
  onaySite: "Kabul edilirsem eserimin writtenby. sitesinde yayımlanmasına izin veriyorum.",
  onayKitap: "Kabul edilirsem eserimin writtenby. kitabında basılmasına izin veriyorum.",
  onayAydinlatma: "Aşağıdaki aydınlatma metnini okudum; bilgilerimin başvurumun değerlendirilmesi için işlenmesini kabul ediyorum.",
  aydinlatmaBaslik: "Aydınlatma metni",
  aydinlatma: "Veri sorumlusu Berkay Doğan'dır. Bu formdaki adın, e-postan, şehrin, alanın, bağlantın, mektubun ve eserin yalnızca başvurunu değerlendirmek ve sana dönmek için işlenir; reklam ya da pazarlama için kullanılmaz, kimseye satılmaz ya da verilmez. Bilgiler Supabase'in Frankfurt (AB) sunucularında saklanır. Kabul edilmeyen başvurular en geç 6 ay içinde silinir. Kötüye kullanımı önlemek için IP adresinin geri döndürülemez bir özeti tutulur. Eserin, yalnızca verdiğin izinler ölçüsünde yayımlanır. KVKK kapsamındaki haklarını kullanmak ya da başvurunu geri çekmek için: do.berkay@icloud.com",
  gonder: "Mektubu gönder", gidiyor: "Gönderiliyor…",
  tamamBaslik: "Mektubun ulaştı.", tamamMetin: "Her başvuru tek tek okunur. Cevabımız e-postana gelecek.",
  hatalar: {
    onay: "Eserin sana ait olduğunu ve aydınlatma metnini onaylaman gerekiyor.",
    gecersiz: "Bazı alanlar eksik ya da hatalı görünüyor; adını, e-postanı ve alanını kontrol eder misin?",
    mektup: "Mektubun en az 150 karakter olmalı. Acele etme.",
    eser: "Eserini ya da eserinin bağlantısını eklemeyi unutma.",
    tekrar: "Bu e-postayla son 30 gün içinde bir başvuru zaten ulaştı. Mektubun okunuyor.",
    yogun: "Şu an çok fazla başvuru var. Biraz sonra yeniden dener misin?",
  },
  genelHata: "Mektubun gönderilemedi. Bağlantını kontrol edip yeniden dener misin?",
  geri: "← writtenby.: bir şehrin yazdığı kitap", geriHref: "/writtenby/",
  atolye: "by. atölyesinin bir işi", atolyeHref: "/by/",
};

export const SANATCI_EN: SanatciMetin = {
  dil: "en",
  etiket: "Artists",
  baslik: "Among a city's lines, signed pages.",
  giris: "On writtenby., a city writes one line a day. Among those lines are pages where selected artists stand with their own work. Any subject, any form. One condition: the work must be yours.",
  kapiEtiket: "The door",
  adimlar: [
    { b: "Application.", s: "Introduce yourself in a letter and send one of your works. Every application is read, one by one." },
    { b: "Invitation.", s: "Some artists we write to ourselves. The invited enter through the same door, with the same letter." },
    { b: "Selection.", s: "Only a few artists are accepted. Every accepted artist has a page on writtenby." },
    { b: "The book.", s: "When the day comes, the works on the site meet the city's lines in the same book: Istanbul 2027." },
  ],
  rizaEtiket: "Consent",
  riza: "Your work is yours. Only you decide whether it is published and whether it goes into the book, and you can withdraw your permission at any time.",
  formEtiket: "Application",
  formBaslik: "This isn't a form, it's a letter.",
  formAlt: "Take your time. Applications are read by Berkay Doğan.",
  ad: "Your name", adAlt: "or pen name", eposta: "Your email", sehir: "Your city", alan: "Your field", sec: "Choose",
  alanlar: [["Şiir", "Poetry"], ["Öykü", "Short story"], ["Deneme", "Essay"], ["Roman", "Novel"], ["Tiyatro", "Theatre"], ["Resim", "Painting"], ["Fotoğraf", "Photography"], ["Müzik", "Music"], ["Diğer", "Other"]],
  baglanti: "Link", baglantiAlt: "optional: your website, portfolio or book",
  mektup: "Your letter", mektupAlt: "why do you want to be part of writtenby.?", mektupYer: "Tell us about yourself in a few paragraphs.", enAz: "at least 150 characters",
  eserAdi: "Title of your work", istege: "optional", eser: "Your work", eserAlt: "if it's text, write it here; if it's visual or audio, share a link", istegeBagli: "optional",
  onayBenim: "The work I am sending is my own.",
  onaySite: "If accepted, I allow my work to be published on the writtenby. website.",
  onayKitap: "If accepted, I allow my work to be printed in the writtenby. book.",
  onayAydinlatma: "I have read the privacy notice below and agree to my information being processed to review my application.",
  aydinlatmaBaslik: "Privacy notice",
  aydinlatma: "The data controller is Berkay Doğan. Your name, email, city, field, link, letter and work in this form are processed only to review your application and get back to you; they are never used for advertising or marketing, and never sold or given to anyone. The information is stored on Supabase servers in Frankfurt (EU). Applications that are not accepted are deleted within 6 months at the latest. To prevent abuse, an irreversible hash of your IP address is kept. Your work is published only to the extent of the permissions you give. To exercise your data protection rights or withdraw your application: do.berkay@icloud.com",
  gonder: "Send the letter", gidiyor: "Sending…",
  tamamBaslik: "Your letter has arrived.", tamamMetin: "Every application is read, one by one. Our reply will come to your email.",
  hatalar: {
    onay: "Please confirm that the work is yours and that you have read the privacy notice.",
    gecersiz: "Some fields look missing or invalid; could you check your name, email and field?",
    mektup: "Your letter needs at least 150 characters. Take your time.",
    eser: "Don't forget to add your work or a link to it.",
    tekrar: "An application from this email already arrived in the last 30 days. Your letter is being read.",
    yogun: "There are too many applications right now. Could you try again a little later?",
  },
  genelHata: "Your letter couldn't be sent. Please check your connection and try again.",
  geri: "← writtenby.: a book written by a city", geriHref: "/en/writtenby/",
  atolye: "A work of the by. workshop", atolyeHref: "/en/by/",
};

const alanStil: React.CSSProperties = {
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

function Onay({ ad, zorunlu, istegeBagli, set, children }: { ad: string; zorunlu?: boolean; istegeBagli: string; set: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", lineHeight: 1.55, cursor: "pointer" }}>
      <input type="checkbox" name={ad} required={zorunlu} onChange={(e) => set(e.target.checked)}
        style={{ marginTop: "0.3rem", width: "1.1rem", height: "1.1rem", accentColor: MOR, flexShrink: 0 }} />
      <span style={{ opacity: 0.9 }}>{children}{!zorunlu && <span style={{ opacity: 0.6 }}> ({istegeBagli})</span>}</span>
    </label>
  );
}

export function WrittenbySanatci({ m }: { m: SanatciMetin }) {
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
      setHata(m.hatalar[j?.message] ?? m.genelHata);
    } catch {
      setHata(m.genelHata);
    }
    setDurum("bos");
  }

  return (
    <main lang={m.dil}>
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
        <Link href={m.geriHref} style={{ ...appYazi, fontSize: "clamp(2.2rem, 7vw, 3rem)", color: "inherit", textDecoration: "none" }}>
          written<span style={{ color: MOR }}>by.</span>
        </Link>
        <p style={{ ...mono, color: MOR, marginTop: "1.4rem" }}>{m.etiket}</p>
        <h1 style={{ ...serif, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(2.1rem, 6vw, 3.6rem)", lineHeight: 1.15, marginTop: "1rem" }}>{m.baslik}</h1>
        <p style={{ ...serif, fontSize: "clamp(1.1rem, 2.4vw, 1.35rem)", lineHeight: 1.65, maxWidth: "620px", margin: "1.6rem auto 0", opacity: 0.85 }}>{m.giris}</p>
      </section>

      {/* KAPI */}
      <section style={bolum}>
        <p style={{ ...mono, opacity: 0.6 }}>{m.kapiEtiket}</p>
        <div className="wbs-adimlar" style={{ marginTop: "1.6rem" }}>
          {m.adimlar.map((a, n) => (
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
        <p style={{ ...mono, color: MOR }}>{m.rizaEtiket}</p>
        <p style={{ ...serif, fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: 1.35, marginTop: "1rem" }}>{m.riza}</p>
      </section>

      {/* BAŞVURU */}
      <section id="basvuru" style={bolum}>
        <div style={{ ...kart, padding: "clamp(1.6rem, 5vw, 3rem)" }}>
          {durum === "tamam" ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <p style={{ ...appYazi, fontSize: "3rem", color: MOR }}>✓</p>
              <h2 style={{ ...serif, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.8rem, 5vw, 2.6rem)", marginTop: "1rem" }}>{m.tamamBaslik}</h2>
              <p style={{ ...serif, fontSize: "1.2rem", lineHeight: 1.6, marginTop: "1rem", opacity: 0.85 }}>{m.tamamMetin}</p>
            </div>
          ) : (
            <form className="wbs-form" onSubmit={gonder} style={{ display: "grid", gap: "1.3rem" }}>
              <div>
                <p style={{ ...mono, opacity: 0.6 }}>{m.formEtiket}</p>
                <h2 style={{ ...serif, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.8rem, 5vw, 2.6rem)", marginTop: "0.6rem" }}>{m.formBaslik}</h2>
                <p style={{ marginTop: "0.6rem", lineHeight: 1.6, opacity: 0.75 }}>{m.formAlt}</p>
              </div>

              <div className="wbs-ikili">
                <Etiket ad={m.ad} alt={m.adAlt}><input name="ad" required maxLength={120} autoComplete="name" style={alanStil} /></Etiket>
                <Etiket ad={m.eposta}><input name="eposta" type="email" required maxLength={200} autoComplete="email" style={alanStil} /></Etiket>
                <Etiket ad={m.sehir}><input name="sehir" maxLength={80} autoComplete="address-level2" style={alanStil} /></Etiket>
                <Etiket ad={m.alan}>
                  <select name="alan" required defaultValue="" style={alanStil}>
                    <option value="" disabled>{m.sec}</option>
                    {m.alanlar.map(([deger, ad]) => <option key={deger} value={deger}>{ad}</option>)}
                  </select>
                </Etiket>
              </div>

              <Etiket ad={m.baglanti} alt={m.baglantiAlt}>
                <input name="baglanti" type="url" maxLength={400} placeholder="https://" style={alanStil} />
              </Etiket>

              <Etiket ad={m.mektup} alt={m.mektupAlt}>
                <textarea name="mektup" required minLength={150} maxLength={4000} rows={7} onChange={(e) => setMektupBoy(e.target.value.trim().length)}
                  placeholder={m.mektupYer} style={{ ...alanStil, resize: "vertical" }} />
                <span style={{ display: "block", textAlign: "right", fontSize: "0.85rem", marginTop: "0.3rem", opacity: 0.55 }}>
                  {mektupBoy < 150 ? `${m.enAz} · ${mektupBoy}` : `${mektupBoy}`}
                </span>
              </Etiket>

              <Etiket ad={m.eserAdi} alt={m.istege}><input name="eser_baslik" maxLength={200} style={alanStil} /></Etiket>

              <Etiket ad={m.eser} alt={m.eserAlt}>
                <textarea name="eser" required minLength={10} maxLength={8000} rows={9} style={{ ...alanStil, resize: "vertical", fontFamily: "var(--font-serif, Georgia), Georgia, serif" }} />
              </Etiket>

              <div style={{ display: "grid", gap: "0.8rem", marginTop: "0.4rem" }}>
                <Onay ad="eser_benim" zorunlu istegeBagli={m.istegeBagli} set={(v) => setIzin((i) => ({ ...i, benim: v }))}>{m.onayBenim}</Onay>
                <Onay ad="izin_site" istegeBagli={m.istegeBagli} set={(v) => setIzin((i) => ({ ...i, site: v }))}>{m.onaySite}</Onay>
                <Onay ad="izin_kitap" istegeBagli={m.istegeBagli} set={(v) => setIzin((i) => ({ ...i, kitap: v }))}>{m.onayKitap}</Onay>
                <Onay ad="aydinlatma" zorunlu istegeBagli={m.istegeBagli} set={(v) => setIzin((i) => ({ ...i, aydinlatma: v }))}>{m.onayAydinlatma}</Onay>
              </div>

              <details style={{ fontSize: "0.92rem", lineHeight: 1.6, opacity: 0.75 }}>
                <summary style={{ cursor: "pointer" }}>{m.aydinlatmaBaslik}</summary>
                <p style={{ marginTop: "0.6rem" }}>{m.aydinlatma}</p>
              </details>

              {hata && <p role="alert" style={{ color: "#ff6b5b", lineHeight: 1.5 }}>{hata}</p>}

              <button type="submit" disabled={durum === "gidiyor"}
                style={{ justifySelf: "start", padding: "0.95rem 1.8rem", borderRadius: "999px", border: "none", background: MOR, color: "#fff",
                  fontSize: "1.05rem", fontWeight: 600, cursor: durum === "gidiyor" ? "wait" : "pointer", opacity: durum === "gidiyor" ? 0.6 : 1 }}>
                {durum === "gidiyor" ? m.gidiyor : m.gonder}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* KAPANIŞ */}
      <section style={{ ...bolum, textAlign: "center", paddingBottom: "clamp(4rem, 12vh, 7rem)" }}>
        <p style={{ marginTop: "0.4rem" }}>
          <Link href={m.geriHref} style={{ ...mono, color: MOR, textDecoration: "none" }}>{m.geri}</Link>
        </p>
        <p style={{ ...mono, opacity: 0.6, marginTop: "2rem" }}><Link href={m.atolyeHref} style={{ color: "inherit", textDecoration: "none" }}>{m.atolye}</Link></p>
      </section>
    </main>
  );
}
