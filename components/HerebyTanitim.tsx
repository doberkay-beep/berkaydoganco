import Link from "next/link";

/* HEREBY — uygulamanın tanıtım sayfası (TR / EN).
   Kendi çivit vurgusunu taşır; zemin ve yazı renkleri sitenin temasından gelir. */

const CIVIT = "#6d66ff";

const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif, Georgia), Georgia, serif" };
const bolum: React.CSSProperties = { maxWidth: "1080px", margin: "0 auto", padding: "clamp(3.5rem, 9vh, 6.5rem) clamp(1.25rem, 5vw, 3rem)" };
const kart: React.CSSProperties = { background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "22px", padding: "1.5rem", backdropFilter: "blur(12px)" };

type Metin = {
  ust: string; baslik: [string, string, string]; alt: string; imza: string;
  beta: string; betaKonu: string; yakinda: string;
  manifestoEtiket: string; manifesto: string[];
  adimEtiket: string; adimlar: { b: string; m: string; g: string; alt: string }[];
  ozellikEtiket: string; ozellikBaslik: string; ozellikler: { s: string; b: string; m: string }[];
  yolEtiket: string; yolBaslik: string; yolAlt: string; yollar: { ad: string; duraklar: string[] }[]; kitaplar: string;
  ilkeEtiket: string; ilkeler: { b: string; m: string }[];
  kosullar: string; gizlilik: string; dilLink: string; dilHref: string; kok: string; kosulHref: string; gizlilikHref: string;
  soru: string;
};

export const HEREBY_TR: Metin = {
  ust: "Berkay Doğan'ın bir projesi",
  baslik: ["Düşünceni", "bir yere", "bırak."],
  alt: "Aklından geçen satırı geçtiğin yere bırak. Onu yalnızca oraya gelen biri okuyabilir. Beğeni yok, takipçi yok; sadece yerler ve cümleler.",
  imza: "iOS · Yakında App Store'da",
  beta: "Beta'ya katıl", betaKonu: "Hereby beta", yakinda: "Şu an kapalı beta aşamasında",
  manifestoEtiket: "Manifesto",
  manifesto: ["İnsanlar düşünmeyi unuttu.", "Bazen düşünürken içinden geçirirsin ve o düşünceni ancak o yere yeniden gittiğinde hatırlarsın.", "Değerli olanı hatırlamak önemlidir.", "Hereby bir ayna olsun."],
  adimEtiket: "Nasıl çalışır",
  adimlar: [
    { b: "Bırak.", m: "Bir vapur iskelesinde, bir merdivende, bir sahilde aklından geçeni yaz. En fazla 280 karakter.", g: "/hereby/vitrin-1.jpg", alt: "Hereby'de yeni iz yazma ekranı" },
    { b: "Yürü.", m: "İzler haritada kilitli durur. Uzaktan okumak yok: yaklaşık 300 metreye gelince açılır.", g: "/hereby/vitrin-3.jpg", alt: "Hereby haritası ve yakındaki izler" },
    { b: "Oku, yanına bırak.", m: "Aynı köşede, farklı yıllarda yaşamış insanların sessiz sohbeti: \"Ben de burada…\"", g: "/hereby/vitrin-5.jpg", alt: "Bir iz ve yanına bırakılmış cevaplar" },
  ],
  ozellikEtiket: "İçinde neler var", ozellikBaslik: "Ruhu olan küçük şeyler.",
  ozellikler: [
    { s: "yer-imi", b: "Kendine iz", m: "Yalnız senin görebileceğin bir not. O yere yeniden gittiğinde telefonun hatırlatır: \"Burada sana bir not bırakmıştın.\"" },
    { s: "kum-saati", b: "Zaman kapsülü", m: "Bir ay, bir yıl, beş yıl sonra açılsın. O güne kadar kimse okuyamaz." },
    { s: "pati", b: "Bir canlı için", m: "Bu köşede yaşayan kedinin, köpeğin adı, huyu, suyunun nerede olduğu." },
    { s: "soru", b: "Haftanın sorusu", m: "Her hafta tek bir soru. Cevabını bulunduğun yere bırakırsın." },
    { s: "imza", b: "Mahlas", m: "İstersen bir takma adla imzalarsın; istemezsen adsız kalırsın. Profil yok, takip yok." },
    { s: "kart", b: "Davet kartı", m: "\"Burada bir iz bıraktım.\" Metni göstermeyen bir hikâye kartı: merak eden, okumak için oraya gider." },
  ],
  yolEtiket: "İz yolları", yolBaslik: "Bir semti yürüyerek oku.",
  yolAlt: "Her durakta Mürekkep ve Köz ya da Tasfiye'den bir satır seni bekliyor. Satırlar yalnızca oraya varınca açılır.",
  yollar: [
    { ad: "Kadıköy şiir yürüyüşü", duraklar: ["Haydarpaşa Garı", "Kadıköy iskelesi", "Yeldeğirmeni", "Altıyol", "Moda sahili"] },
    { ad: "Beşiktaş yürüyüşü", duraklar: ["Abbasağa Parkı", "Beşiktaş Çarşı", "Beşiktaş iskelesi", "Ortaköy"] },
  ],
  kitaplar: "Kitapları tanı",
  ilkeEtiket: "İlkeler",
  ilkeler: [
    { b: "Beğeni yok.", m: "İzler sayılmaz, sıralanmaz. Hangi izin kaç kez okunduğunu kimse göremez." },
    { b: "Konum bulanık.", m: "İzin tam noktası değil, yaklaşık bir alan görünür. Kimin nerede olduğunu kimse göremez." },
    { b: "Kayıt yok.", m: "Ad, e-posta, telefon istenmez. Telefonuna özel anonim bir kimlikle başlarsın." },
    { b: "Reklam yok.", m: "Seni takip etmez, verini satmaz. Veriler Avrupa Birliği'nde saklanır." },
  ],
  kosullar: "Kullanım koşulları", gizlilik: "Gizlilik politikası", dilLink: "English", dilHref: "/en/hereby", kok: "/hereby",
  kosulHref: "/hereby/kosullar", gizlilikHref: "/hereby/gizlilik",
  soru: "Sorular için",
};

export const HEREBY_EN: Metin = {
  ust: "A project by Berkay Doğan",
  baslik: ["Leave", "a thought", "in a place."],
  alt: "Leave the line on your mind in the place you pass. Only someone who comes there can read it. No likes, no followers; just places and sentences.",
  imza: "iOS · Coming soon to the App Store",
  beta: "Join the beta", betaKonu: "Hereby beta", yakinda: "Currently in private beta",
  manifestoEtiket: "Manifesto",
  manifesto: ["People have forgotten how to think.", "Sometimes a thought passes through you, and you only remember it when you return to that place.", "Remembering what is precious matters.", "Let Hereby be a mirror."],
  adimEtiket: "How it works",
  adimlar: [
    { b: "Leave.", m: "On a ferry pier, on a staircase, by the sea: write what is on your mind. 280 characters at most.", g: "/hereby/vitrin-1.jpg", alt: "Writing a new trace in Hereby" },
    { b: "Walk.", m: "Traces stay locked on the map. No reading from afar: they open when you are about 300 metres away.", g: "/hereby/vitrin-3.jpg", alt: "The Hereby map with nearby traces" },
    { b: "Read, and leave one beside it.", m: "The quiet conversation of people who lived on the same corner in different years: \"I was here too…\"", g: "/hereby/vitrin-5.jpg", alt: "A trace with replies left beside it" },
  ],
  ozellikEtiket: "What's inside", ozellikBaslik: "Small things with a soul.",
  ozellikler: [
    { s: "yer-imi", b: "Note to self", m: "A note only you can see. When you return to that place, your phone reminds you: \"You left yourself a note here.\"" },
    { s: "kum-saati", b: "Time capsule", m: "Let it open in a month, a year, five years. Until then, no one can read it." },
    { s: "pati", b: "For a creature", m: "The name of the cat or dog that lives on this corner, its ways, where its water is." },
    { s: "soru", b: "Question of the week", m: "One question each week. You leave your answer where you are." },
    { s: "imza", b: "Pen name", m: "Sign with a pen name if you like, or stay anonymous. No profiles, no following." },
    { s: "kart", b: "Invite card", m: "\"I left a trace here.\" A story card that never shows the text: whoever is curious has to go there." },
  ],
  yolEtiket: "Trace walks", yolBaslik: "Read a neighbourhood on foot.",
  yolAlt: "At each stop, a line from Mürekkep ve Köz or Tasfiye is waiting for you. The lines open only when you arrive.",
  yollar: [
    { ad: "Kadıköy poetry walk", duraklar: ["Haydarpaşa Station", "Kadıköy pier", "Yeldeğirmeni", "Altıyol", "Moda shore"] },
    { ad: "Beşiktaş walk", duraklar: ["Abbasağa Park", "Beşiktaş Bazaar", "Beşiktaş pier", "Ortaköy"] },
  ],
  kitaplar: "Discover the books",
  ilkeEtiket: "Principles",
  ilkeler: [
    { b: "No likes.", m: "Traces are not counted or ranked. No one can see how many times a trace was read." },
    { b: "Blurred location.", m: "A trace shows an approximate area, not an exact point. No one can see where anyone is." },
    { b: "No sign-up.", m: "No name, email or phone number. You start with an anonymous identity unique to your phone." },
    { b: "No ads.", m: "It doesn't track you or sell your data. Data is stored in the European Union." },
  ],
  kosullar: "Terms of use", gizlilik: "Privacy policy", dilLink: "Türkçe", dilHref: "/hereby", kok: "/en/hereby",
  kosulHref: "/en/hereby/terms", gizlilikHref: "/en/hereby/privacy",
  soru: "Questions",
};

function Simge({ ad }: { ad: string }) {
  const ortak = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: CIVIT, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (ad) {
    case "yer-imi": return <svg {...ortak}><path d="M6 3h12v18l-6-4-6 4z" /></svg>;
    case "kum-saati": return <svg {...ortak}><path d="M6 3h12M6 21h12M7 3c0 5 10 5 10 9s-10 4-10 9M17 3c0 5-10 5-10 9s10 4 10 9" /></svg>;
    case "pati": return <svg {...ortak}><circle cx="7" cy="9" r="1.8" /><circle cx="12" cy="6.5" r="1.8" /><circle cx="17" cy="9" r="1.8" /><path d="M8 17c0-3 2-5 4-5s4 2 4 5c0 2-2 2.5-4 2.5S8 19 8 17z" /></svg>;
    case "soru": return <svg {...ortak}><path d="M4 5h16v11H9l-5 4z" /><path d="M10 9a2 2 0 1 1 3 1.7c-.6.4-1 .8-1 1.5M12 14.5h0" /></svg>;
    case "imza": return <svg {...ortak}><path d="M3 17c3-1 4-9 6-9s0 8 2 8 2-4 4-4 1 3 3 3h3M3 21h18" /></svg>;
    default: return <svg {...ortak}><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M9 7h6M9 11h6M12 15v3M10.5 16.5 12 18l1.5-1.5" /></svg>;
  }
}

export function HerebyTanitim({ m }: { m: Metin }) {
  const en = m === HEREBY_EN;
  const betaHref = `mailto:do.berkay@icloud.com?subject=${encodeURIComponent(m.betaKonu)}`;
  return (
    <main lang={en ? "en" : "tr"} style={{ position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes hb-halka { from { transform: scale(.35); opacity: .9 } to { transform: scale(1.6); opacity: 0 } }
        .hb-halka { position:absolute; inset:0; border-radius:50%; border:2px solid ${CIVIT}; animation: hb-halka 3.6s cubic-bezier(.2,.6,.3,1) infinite; }
        .hb-halka:nth-child(2) { animation-delay: 1.2s } .hb-halka:nth-child(3) { animation-delay: 2.4s }
        @media (prefers-reduced-motion: reduce) { .hb-halka { animation: none; opacity: .35 } }
        .hb-adim { display:grid; grid-template-columns: 1fr; gap: 2rem; align-items:center }
        @media (min-width: 820px) { .hb-adim { grid-template-columns: 1fr 1fr; gap: 4rem } .hb-adim.ters > :first-child { order: 2 } }
        .hb-izgara { display:grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) }
        .hb-dugme { display:inline-flex; align-items:center; gap:.5rem; padding:.95rem 1.6rem; border-radius:999px; font-weight:600; font-family:var(--font-grotesk); transition: transform .2s ease, box-shadow .2s ease }
        .hb-dugme:hover { transform: translateY(-2px) }
      `}</style>

      {/* KAHRAMAN */}
      <section style={{ ...bolum, paddingTop: "clamp(4rem, 12vh, 8rem)", textAlign: "center", position: "relative" }}>
        <div aria-hidden style={{ position: "absolute", inset: "-20% -10% auto", height: "620px", background: `radial-gradient(closest-side, ${CIVIT}33, transparent)`, pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "relative", width: 150, height: 150, margin: "0 auto 2.2rem" }}>
          <span className="hb-halka" /><span className="hb-halka" /><span className="hb-halka" />
          <span style={{ position: "absolute", inset: "calc(50% - 15px)", width: 30, height: 30, borderRadius: "50%", background: CIVIT, boxShadow: `0 0 40px ${CIVIT}` }} />
        </div>
        <div style={{ ...mono, color: CIVIT, marginBottom: "1.2rem", position: "relative" }}>{m.ust}</div>
        <h1 style={{ ...serif, fontSize: "clamp(3rem, 10vw, 6.4rem)", lineHeight: 0.98, margin: "0 0 1.6rem", fontWeight: 500, position: "relative" }}>
          {m.baslik[0]} <span style={{ color: CIVIT, fontStyle: "italic" }}>{m.baslik[1]}</span><br />{m.baslik[2]}
        </h1>
        <p style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)", lineHeight: 1.65, color: "var(--muted)", maxWidth: "40rem", margin: "0 auto 2.4rem", position: "relative" }}>{m.alt}</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
          <a href={betaHref} className="hb-dugme" style={{ background: CIVIT, color: "#fff", boxShadow: `0 12px 34px ${CIVIT}55` }}>{m.beta} →</a>
          <span className="hb-dugme" style={{ border: "1px solid var(--line)", color: "var(--muted)" }}>{m.imza}</span>
        </div>
        <p style={{ ...mono, color: "var(--muted)", marginTop: "1.4rem", fontSize: "0.66rem", position: "relative" }}>{m.yakinda}</p>
      </section>

      {/* MANİFESTO */}
      <section style={{ ...bolum, maxWidth: "820px" }}>
        <div style={{ ...mono, color: CIVIT, marginBottom: "1.6rem" }}>{m.manifestoEtiket}</div>
        <p style={{ ...serif, fontSize: "clamp(2rem, 5.5vw, 3.4rem)", lineHeight: 1.1, margin: "0 0 1.4rem" }}>{m.manifesto[0]}</p>
        <p style={{ ...serif, fontSize: "clamp(1.25rem, 3vw, 1.7rem)", lineHeight: 1.45, color: "var(--muted)", fontStyle: "italic", margin: "0 0 1rem" }}>{m.manifesto[1]}</p>
        <p style={{ ...serif, fontSize: "clamp(1.25rem, 3vw, 1.7rem)", lineHeight: 1.45, color: "var(--muted)", fontStyle: "italic", margin: "0 0 1.6rem" }}>{m.manifesto[2]}</p>
        <p style={{ ...serif, fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)", margin: "0 0 0.8rem" }}>{m.manifesto[3]}</p>
        <p style={{ ...mono, color: "var(--muted)" }}>Berkay Doğan</p>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section style={bolum}>
        <div style={{ ...mono, color: CIVIT, marginBottom: "2.4rem" }}>{m.adimEtiket}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(3rem, 8vh, 5rem)" }}>
          {m.adimlar.map((a, i) => (
            <div key={a.b} className={`hb-adim${i % 2 ? " ters" : ""}`}>
              <div>
                <div style={{ ...serif, fontSize: "4rem", lineHeight: 1, color: CIVIT, opacity: 0.5, marginBottom: "0.6rem" }}>{i + 1}</div>
                <h2 style={{ ...serif, fontSize: "clamp(2rem, 5vw, 3rem)", margin: "0 0 1rem", fontWeight: 500 }}>{a.b}</h2>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "var(--muted)", maxWidth: "30rem" }}>{a.m}</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.g} alt={a.alt} width={640} height={1387} loading="lazy"
                   style={{ width: "100%", maxWidth: "340px", height: "auto", margin: "0 auto", borderRadius: "28px", boxShadow: "var(--shadow-card)" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ÖZELLİKLER */}
      <section style={bolum}>
        <div style={{ ...mono, color: CIVIT, marginBottom: "1rem" }}>{m.ozellikEtiket}</div>
        <h2 style={{ ...serif, fontSize: "clamp(2rem, 5vw, 3rem)", margin: "0 0 2.4rem", fontWeight: 500 }}>{m.ozellikBaslik}</h2>
        <div className="hb-izgara">
          {m.ozellikler.map((o) => (
            <div key={o.b} style={kart}>
              <Simge ad={o.s} />
              <h3 style={{ ...serif, fontSize: "1.5rem", margin: "0.9rem 0 0.5rem", fontWeight: 500 }}>{o.b}</h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{o.m}</p>
            </div>
          ))}
        </div>
      </section>

      {/* İZ YOLLARI */}
      <section style={bolum}>
        <div style={{ ...mono, color: CIVIT, marginBottom: "1rem" }}>{m.yolEtiket}</div>
        <h2 style={{ ...serif, fontSize: "clamp(2rem, 5vw, 3rem)", margin: "0 0 1rem", fontWeight: 500 }}>{m.yolBaslik}</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "var(--muted)", maxWidth: "36rem", margin: "0 0 2.4rem" }}>{m.yolAlt}</p>
        <div className="hb-izgara">
          {m.yollar.map((y) => (
            <div key={y.ad} style={kart}>
              <h3 style={{ ...serif, fontSize: "1.6rem", margin: "0 0 1.2rem", fontWeight: 500 }}>{y.ad}</h3>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, position: "relative" }}>
                <span aria-hidden style={{ position: "absolute", left: 13, top: 14, bottom: 14, borderLeft: `2px dashed ${CIVIT}66` }} />
                {y.duraklar.map((d, i) => (
                  <li key={d} style={{ display: "flex", alignItems: "center", gap: "0.9rem", padding: "0.45rem 0", position: "relative" }}>
                    <span style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${CIVIT}`, background: "var(--bg)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: "0.85rem", color: CIVIT, flexShrink: 0 }}>{i + 1}</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "1.6rem" }}>
          <Link href={en ? "/en/" : "/kitaplar/"} style={{ color: CIVIT, textDecoration: "underline", textUnderlineOffset: "4px" }}>{m.kitaplar} →</Link>
        </p>
      </section>

      {/* İLKELER */}
      <section style={bolum}>
        <div style={{ ...mono, color: CIVIT, marginBottom: "2rem" }}>{m.ilkeEtiket}</div>
        <div className="hb-izgara">
          {m.ilkeler.map((i) => (
            <div key={i.b} style={{ borderTop: "1px solid var(--line)", paddingTop: "1.2rem" }}>
              <h3 style={{ ...serif, fontSize: "1.5rem", margin: "0 0 0.5rem", fontWeight: 500 }}>{i.b}</h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{i.m}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KAPANIŞ */}
      <section style={{ ...bolum, textAlign: "center", paddingBottom: "clamp(4rem, 10vh, 7rem)" }}>
        <p style={{ ...serif, fontSize: "clamp(2.2rem, 6vw, 3.8rem)", margin: "0 0 1.8rem", lineHeight: 1.05 }}>
          hereby<span style={{ color: CIVIT }}>.</span>
        </p>
        <a href={betaHref} className="hb-dugme" style={{ background: CIVIT, color: "#fff", boxShadow: `0 12px 34px ${CIVIT}55` }}>{m.beta} →</a>
        <nav style={{ display: "flex", gap: "1.4rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2.6rem", ...mono, color: "var(--muted)" }}>
          <Link href={m.kosulHref}>{m.kosullar}</Link>
          <Link href={m.gizlilikHref}>{m.gizlilik}</Link>
          <Link href={m.dilHref} lang={en ? "tr" : "en"}>{m.dilLink}</Link>
        </nav>
        <p style={{ color: "var(--muted)", marginTop: "1.4rem", fontSize: "0.95rem" }}>
          {m.soru}: <a href="mailto:do.berkay@icloud.com" style={{ color: "var(--ink)", textDecoration: "underline" }}>do.berkay@icloud.com</a>
        </p>
      </section>
    </main>
  );
}
