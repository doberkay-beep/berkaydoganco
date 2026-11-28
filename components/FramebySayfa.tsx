import Link from "next/link";
import { DESTEK_EMAIL } from "@/lib/site";

/* frameby. — by. atölyesinin üçüncü işi: ekranda yavaşça akan zaman kareleri, arkada o anın canlı radyosu.
   Galeri sitede DEĞİL, uygulamada (Apple TV, iPad, iPhone, Mac). Bu sayfa yalnız tanıtır (25 Kas 2026, Berkay).
   Vitrindeki kareler katalogdaki gerçek kareler (public/frameby/kareler); köşe yazısı uygulamadaki galeri dili C. */

const KIZIL = "#E5382C";
const bodoni: React.CSSProperties = { fontFamily: "'Bodoni 72', 'Bodoni Moda', Didot, 'Times New Roman', serif", fontWeight: 400, lineHeight: 1.05 };
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif, Georgia), Georgia, serif" };
const bolum: React.CSSProperties = { maxWidth: "1080px", margin: "0 auto", padding: "clamp(3rem, 8vh, 5.5rem) clamp(1.25rem, 5vw, 3rem)" };
const kart: React.CSSProperties = { background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", backdropFilter: "blur(12px)" };

type Madde = { b: string; s: string };
type Vitrin = { id: string; yer: string; saat: string; radyo: string };
export type FramebyMetin = {
  dil: "tr" | "en";
  alt: string; giris: string; durum: string; magaza: string;
  sahne: Vitrin & { alt: string };
  nasilEtiket: string; nasil: Madde[];
  katmanEtiket: string; katmanBaslik: string; katmanlar: (Vitrin & { ad: string; d: string; s: string })[]; plusNot: string;
  ekranEtiket: string; ekranBaslik: string; ekranlar: (Madde & { c: string })[];
  fotoEtiket: string; fotoBaslik: string; fotoMetin: string; fotoYaz: string; fotoKonu: string;
  radyoEtiket: string; radyoBaslik: string; radyoMetin: string;
  ilkeler: string; kapanis: string;
  atolye: string; atolyeHref: string; anaSayfa: string;
  destek: string; kosullar: string; kosullarHref: string; gizlilik: string; gizlilikHref: string;
};

export const FRAMEBY_TR: FramebyMetin = {
  dil: "tr",
  alt: "Bir şehrin karesi, o anın radyosu.",
  giris: "Ekranında yavaşça akan zaman kareleri: İstanbul'dan gerçek yerler, gerçek saatler. Her kare dört dakika kalır; arkada bir radyo canlı çalar. Günde on iki kare, sonra gün baştan.",
  durum: "App Store'da: iPhone, iPad ve Mac. Apple TV yakında.",
  magaza: "frameby. · App Store",
  sahne: { id: "iph-20240418-051", yer: "Arnavutköy", saat: "15:44", radyo: "Radio Paradise Mellow", alt: "frameby. Apple TV'de: Arnavutköy'de kızıl bir tekne, köşede yer, saat ve canlı çalan radyo" },
  nasilEtiket: "Nasıl çalışır",
  nasil: [
    { b: "Dört dakikada bir kare.", s: "Kare gelir, durur, yavaşça bir sonrakine çözülür. Kaydırmak yok, beğenmek yok; pencereden bakar gibi." },
    { b: "Köşede yalnız yer ve saat.", s: "Karenin nerede ve saat kaçta çekildiği. Başka hiçbir şey." },
    { b: "Arkada canlı radyo.", s: "Her karenin bir radyosu var; o an ne çalıyorsa o. Kayıt yok, tekrar yok; şarkının adı köşede görünür." },
    { b: "Günde on iki kare.", s: "Herkes aynı gün aynı on iki kareyi görür. Gün bitince galeri baştan başlar, ertesi gün yeni on iki kare." },
  ],
  katmanEtiket: "Katmanlar",
  katmanBaslik: "Aynı şehir, dört ayrı bakış.",
  katmanlar: [
    { id: "r50-0574", yer: "Eminönü, Galata Köprüsü", saat: "15:26", radyo: "JoyTürk Akustik", ad: "Gün", d: "Ücretsiz", s: "Şehrin gündüzü: iskeleler, vapurlar, kediler, ışık." },
    { id: "arsiv-bebek", yer: "Bebek", saat: "1870 · Guillaume Berggren", radyo: "Retro Türk", ad: "Eski İstanbul", d: "Ücretsiz", s: "Kamu malı arşivden 19. yüzyıl İstanbul'u: Berggren, Sébah, Abdullah Frères." },
    { id: "r50-0031", yer: "Galata, Beyoğlu", saat: "17:05", radyo: "Smooth Jazz Deluxe", ad: "Berkay'ın İstanbul'u", d: "frameby+", s: "Yürürken çektiklerim: Galata'dan Arnavutköy'e, akşamüstü ışığı." },
    { id: "iph-20230807-013", yer: "Üsküdar, Kız Kulesi", saat: "20:39", radyo: "Kıyı Gece", ad: "Gece kıyısı", d: "frameby+", s: "Gece suyun kenarı: iskele ışıkları, köprüler, son vapur." },
  ],
  plusNot: "frameby+ yıllık abonelikle açılır; yedi gün ücretsiz denenir. Radyo ve ücretsiz katmanlar her zaman ücretsiz.",
  ekranEtiket: "Her ekranda",
  ekranBaslik: "Duvarda bir pencere.",
  ekranlar: [
    { c: "Apple TV", b: "Salonda, kocaman.", s: "Televizyon kapalıyken bile açık kalacak bir şey: kare, radyo, sessizlik." },
    { c: "iPad", b: "Masada bir çerçeve.", s: "Yatay koy, unut. Kare kendi kendine değişir." },
    { c: "iPhone", b: "Kumanda ve StandBy.", s: "Televizyondaki galeriyi telefondan yönet; geceleri şarjdayken günün karesi StandBy'da." },
    { c: "Mac", b: "Çalışırken yan pencerede.", s: "Bir köşede şehir akar, arkada radyo çalar." },
  ],
  fotoEtiket: "Fotoğrafçılar için",
  fotoBaslik: "Bir kolektif olacak.",
  fotoMetin: "frameby. bir fotoğrafçının değil, bir şehre bakan birçok gözün galerisi olsun istiyoruz. Her fotoğrafçının kendi katmanı, adı karenin köşesinde. Yer, ışık, saat; yüz yok. Katmanını kurmak istersen yaz.",
  fotoYaz: "Katmanın için yaz",
  fotoKonu: "frameby. fotoğrafçı katmanı",
  radyoEtiket: "Radyolar için",
  radyoBaslik: "Yalnız izin veren radyolar.",
  radyoMetin: "frameby. yayınları kaydetmez ve aktarmaz; radyonun kendi resmî yayınını çalar. Yalnız nowby.'ye yazılı izin veren radyolar yer alır; istemeyen radyo aynı gün çıkar.",
  ilkeler: "Reklam yok · Beğeni yok · Takipçi yok · Yüz yok",
  kapanis: "Bak, dinle, geç.",
  atolye: "by. atölyesinin bir işi", atolyeHref: "/by", anaSayfa: "/",
  destek: "Soru ya da öneri", kosullar: "Kullanım Koşulları", kosullarHref: "/frameby/kosullar", gizlilik: "Gizlilik", gizlilikHref: "/frameby/gizlilik",
};

export const FRAMEBY_EN: FramebyMetin = {
  dil: "en",
  alt: "A frame of a city, the radio of that moment.",
  giris: "Time frames that drift slowly across your screen: real places in Istanbul, real hours. Each frame stays four minutes while a radio station plays live behind it. Twelve frames a day, then the day begins again.",
  durum: "On the App Store: iPhone, iPad and Mac. Apple TV coming soon.",
  magaza: "frameby. on the App Store",
  sahne: { id: "iph-20240418-051", yer: "Arnavutköy", saat: "15:44", radyo: "Radio Paradise Mellow", alt: "frameby. on Apple TV: a red boat in Arnavutköy, with the place, the time and the live station in the corner" },
  nasilEtiket: "How it works",
  nasil: [
    { b: "One frame every four minutes.", s: "A frame arrives, stays, and slowly dissolves into the next. No scrolling, no liking; like looking out of a window." },
    { b: "Only place and time in the corner.", s: "Where the frame was taken, and at what hour. Nothing else." },
    { b: "Live radio behind it.", s: "Every frame has a station, playing whatever is on right now. No recordings, no loops; the song title shows in the corner." },
    { b: "Twelve frames a day.", s: "Everyone sees the same twelve frames on the same day. When the day ends the gallery starts over; tomorrow brings twelve new ones." },
  ],
  katmanEtiket: "Layers",
  katmanBaslik: "One city, four ways of looking.",
  katmanlar: [
    { id: "r50-0574", yer: "Eminönü, Galata Köprüsü", saat: "15:26", radyo: "JoyTürk Akustik", ad: "Day", d: "Free", s: "The city by day: piers, ferries, cats, light." },
    { id: "arsiv-bebek", yer: "Bebek", saat: "1870 · Guillaume Berggren", radyo: "Retro Türk", ad: "Old Istanbul", d: "Free", s: "19th-century Istanbul from public-domain archives: Berggren, Sébah, Abdullah Frères." },
    { id: "r50-0031", yer: "Galata, Beyoğlu", saat: "17:05", radyo: "Smooth Jazz Deluxe", ad: "Berkay's Istanbul", d: "frameby+", s: "What I photograph as I walk: from Galata to Arnavutköy, late-afternoon light." },
    { id: "iph-20230807-013", yer: "Üsküdar, Kız Kulesi", saat: "20:39", radyo: "Kıyı Gece", ad: "Night Shore", d: "frameby+", s: "The water's edge at night: pier lights, bridges, the last ferry." },
  ],
  plusNot: "frameby+ is a yearly subscription with a seven-day free trial. The radio and the free layers are always free.",
  ekranEtiket: "On every screen",
  ekranBaslik: "A window on the wall.",
  ekranlar: [
    { c: "Apple TV", b: "In the living room, huge.", s: "Something to leave on even when the TV is off: a frame, a station, quiet." },
    { c: "iPad", b: "A frame on the table.", s: "Stand it up, forget about it. The frames change on their own." },
    { c: "iPhone", b: "Remote and StandBy.", s: "Run the TV gallery from your phone; at night on the charger, today's frame in StandBy." },
    { c: "Mac", b: "A side window while you work.", s: "The city drifts in a corner, the radio plays behind it." },
  ],
  fotoEtiket: "For photographers",
  fotoBaslik: "It will be a collective.",
  fotoMetin: "We want frameby. to be a gallery not of one photographer but of many eyes looking at one city. Each photographer gets their own layer, with their name in the corner of the frame. Places, light, hours; no faces. Write if you'd like to build your layer.",
  fotoYaz: "Write about your layer",
  fotoKonu: "frameby. photographer layer",
  radyoEtiket: "For stations",
  radyoBaslik: "Only stations that said yes.",
  radyoMetin: "frameby. does not record or relay broadcasts; it plays the station's own official stream. Only stations that have given nowby. written permission appear; a station that would rather not is removed the same day.",
  ilkeler: "No ads · No likes · No followers · No faces",
  kapanis: "Look, listen, let it pass.",
  atolye: "A work of the by. workshop", atolyeHref: "/en/by", anaSayfa: "/en",
  destek: "Questions or ideas", kosullar: "Terms of Use", kosullarHref: "/en/frameby/terms", gizlilik: "Privacy", gizlilikHref: "/en/frameby/privacy",
};

function Logo({ boy }: { boy: string }) {
  return (
    <span style={{ ...bodoni, fontSize: boy, letterSpacing: "-0.01em" }}>
      frameby<span style={{ color: KIZIL }}>.</span>
    </span>
  );
}

/** Uygulamadaki galeri dili C: kare, altta hafif karartma, yer adı büyük Bodoni, saat, cam hapta canlı radyo. */
function Kare({ v, buyuk, alt }: { v: Vitrin; buyuk?: boolean; alt: string }) {
  return (
    <div style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden", background: "#0E0D0C", borderRadius: buyuk ? "22px" : "16px" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/frameby/kareler/${v.id}.jpg`} alt={alt} loading={buyuk ? "eager" : "lazy"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.62))" }} />
      <div style={{ position: "absolute", left: buyuk ? "4.5%" : "6%", right: "6%", bottom: buyuk ? "7%" : "8%", color: "#F2EEE6" }}>
        <p style={{ ...bodoni, fontSize: buyuk ? "clamp(1.6rem, 4.6vw, 3.4rem)" : "clamp(1.1rem, 2.2vw, 1.45rem)" }}>{v.yer}</p>
        <p style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginTop: buyuk ? "0.7rem" : "0.4rem", fontSize: buyuk ? "clamp(0.7rem, 1.3vw, 0.95rem)" : "0.72rem", flexWrap: "wrap" }}>
          <span style={{ opacity: 0.85 }}>{v.saat}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4em", padding: "0.3em 0.8em", borderRadius: "999px", background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(10px)" }}>
            <span style={{ width: "0.5em", height: "0.5em", borderRadius: "50%", background: KIZIL }} />
            {v.radyo}
          </span>
        </p>
      </div>
      {buyuk && <span style={{ ...bodoni, position: "absolute", right: "4%", bottom: "7%", fontSize: "clamp(0.7rem, 1.3vw, 1rem)", color: "#F2EEE6", opacity: 0.55 }}>frameby.</span>}
    </div>
  );
}

export function FramebySayfa({ m }: { m: FramebyMetin }) {
  return (
    <main lang={m.dil}>
      <style>{`
        .fb-iki{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:760px){.fb-iki{grid-template-columns:repeat(2,minmax(0,1fr))}}
        .fb-dort{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:700px){.fb-dort{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media (min-width:1000px){.fb-dort{grid-template-columns:repeat(4,minmax(0,1fr))}}
      `}</style>

      {/* AÇILIŞ */}
      <section style={{ ...bolum, paddingTop: "max(84px, 9vh)", paddingBottom: "1.5rem", textAlign: "center" }}>
        <Logo boy="clamp(3.6rem, 14vw, 6.2rem)" />
        <h1 style={{ ...serif, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4.4vw, 2.7rem)", lineHeight: 1.2, marginTop: "1rem" }}>{m.alt}</h1>
        <p style={{ ...serif, fontSize: "clamp(1.1rem, 2.4vw, 1.4rem)", lineHeight: 1.55, margin: "1.3rem auto 0", maxWidth: "660px", opacity: 0.85 }}>{m.giris}</p>
        <p style={{ ...mono, color: KIZIL, marginTop: "1.6rem" }}>{m.durum}</p>
        <p style={{ marginTop: "1.4rem" }}>
          <a href="https://apps.apple.com/app/frameby/id6839284183" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "0.8rem 1.4rem", borderRadius: "999px", border: `1px solid ${KIZIL}`, color: KIZIL, fontWeight: 700, textDecoration: "none" }}>{m.magaza}</a>
        </p>
      </section>

      {/* SAHNE: televizyonda bir kare */}
      <section style={{ maxWidth: "1180px", margin: "0 auto", padding: "1rem clamp(0.75rem, 3vw, 2rem) 0" }}>
        <div style={{ padding: "clamp(6px, 1vw, 12px)", background: "#050505", borderRadius: "30px", boxShadow: "0 30px 80px rgba(0,0,0,0.35)" }}>
          <Kare v={m.sahne} buyuk alt={m.sahne.alt} />
        </div>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section style={bolum}>
        <p style={{ ...mono, opacity: 0.6 }}>{m.nasilEtiket}</p>
        <div className="fb-iki" style={{ marginTop: "1.6rem" }}>
          {m.nasil.map((i, n) => (
            <div key={i.b} style={{ ...kart, padding: "clamp(1.3rem, 3vw, 1.8rem)" }}>
              <span style={{ ...bodoni, fontSize: "2.2rem", color: KIZIL }}>{n + 1}</span>
              <h3 style={{ ...serif, fontSize: "1.35rem", marginTop: "0.7rem", fontWeight: 600 }}>{i.b}</h3>
              <p style={{ marginTop: "0.5rem", lineHeight: 1.6, opacity: 0.8 }}>{i.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KATMANLAR */}
      <section style={bolum}>
        <p style={{ ...mono, opacity: 0.6, textAlign: "center" }}>{m.katmanEtiket}</p>
        <h2 style={{ ...serif, fontWeight: 400, fontSize: "clamp(2rem, 5.4vw, 3.4rem)", lineHeight: 1.1, marginTop: "0.8rem", textAlign: "center" }}>{m.katmanBaslik}</h2>
        <div className="fb-iki" style={{ marginTop: "2.2rem", gap: "2rem 1.4rem" }}>
          {m.katmanlar.map((k) => (
            <div key={k.id}>
              <Kare v={k} alt={`${k.ad}: ${k.yer}`} />
              <p style={{ ...mono, marginTop: "0.9rem", display: "flex", justifyContent: "space-between", gap: "0.6rem" }}>
                <span>{k.ad}</span>
                <span style={{ color: KIZIL }}>{k.d}</span>
              </p>
              <p style={{ marginTop: "0.4rem", lineHeight: 1.55, opacity: 0.8 }}>{k.s}</p>
            </div>
          ))}
        </div>
        <p style={{ ...serif, fontStyle: "italic", marginTop: "2rem", textAlign: "center", opacity: 0.8 }}>{m.plusNot}</p>
      </section>

      {/* HER EKRANDA */}
      <section style={bolum}>
        <p style={{ ...mono, opacity: 0.6, textAlign: "center" }}>{m.ekranEtiket}</p>
        <h2 style={{ ...serif, fontWeight: 400, fontSize: "clamp(2rem, 5.4vw, 3.4rem)", lineHeight: 1.1, marginTop: "0.8rem", textAlign: "center" }}>{m.ekranBaslik}</h2>
        <div className="fb-dort" style={{ marginTop: "2.2rem" }}>
          {m.ekranlar.map((e) => (
            <div key={e.c} style={{ ...kart, padding: "1.3rem 1.2rem" }}>
              <p style={{ ...mono, color: KIZIL, textTransform: "none", letterSpacing: "0.04em", fontSize: "0.85rem" }}>{e.c}</p>
              <h3 style={{ ...serif, fontSize: "1.25rem", fontWeight: 600, marginTop: "0.6rem", lineHeight: 1.25 }}>{e.b}</h3>
              <p style={{ marginTop: "0.5rem", lineHeight: 1.55, opacity: 0.78, fontSize: "0.95rem" }}>{e.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOTOĞRAFÇILAR İÇİN */}
      <section style={{ ...bolum, maxWidth: "900px" }}>
        <p style={{ ...mono, opacity: 0.6 }}>{m.fotoEtiket}</p>
        <h2 style={{ ...serif, fontWeight: 400, fontSize: "clamp(1.8rem, 4.6vw, 2.8rem)", lineHeight: 1.15, marginTop: "0.8rem" }}>{m.fotoBaslik}</h2>
        <p style={{ marginTop: "1rem", lineHeight: 1.65, opacity: 0.85, maxWidth: "680px" }}>{m.fotoMetin}</p>
        <p style={{ marginTop: "1.4rem" }}>
          <a href={`mailto:${DESTEK_EMAIL}?subject=${encodeURIComponent(m.fotoKonu)}`} style={{ ...mono, color: KIZIL, textDecoration: "none" }}>{m.fotoYaz} →</a>
        </p>
      </section>

      {/* RADYOLAR İÇİN */}
      <section style={{ ...bolum, maxWidth: "900px" }}>
        <p style={{ ...mono, opacity: 0.6 }}>{m.radyoEtiket}</p>
        <h2 style={{ ...serif, fontWeight: 400, fontSize: "clamp(1.8rem, 4.6vw, 2.8rem)", lineHeight: 1.15, marginTop: "0.8rem" }}>{m.radyoBaslik}</h2>
        <p style={{ marginTop: "1rem", lineHeight: 1.65, opacity: 0.85, maxWidth: "680px" }}>{m.radyoMetin}</p>
      </section>

      {/* KAPANIŞ */}
      <section style={{ ...bolum, textAlign: "center", paddingBottom: "clamp(4rem, 12vh, 7rem)" }}>
        <Logo boy="3rem" />
        <p style={{ ...serif, fontStyle: "italic", fontSize: "clamp(1.2rem, 2.8vw, 1.6rem)", marginTop: "1.1rem" }}>{m.kapanis}</p>
        <p style={{ ...mono, color: KIZIL, marginTop: "1.2rem" }}>{m.ilkeler}</p>
        <p style={{ marginTop: "2.4rem", lineHeight: 1.6, opacity: 0.85 }}>
          {m.destek}: <a href={`mailto:${DESTEK_EMAIL}`} style={{ color: "var(--ink)", textDecoration: "underline" }}>{DESTEK_EMAIL}</a>
          {" · "}<Link href={m.kosullarHref} style={{ color: "inherit" }}>{m.kosullar}</Link>
          {" · "}<Link href={m.gizlilikHref} style={{ color: "inherit" }}>{m.gizlilik}</Link>
        </p>
        <p style={{ ...mono, opacity: 0.6, marginTop: "1.6rem" }}><Link href={m.atolyeHref} style={{ color: "inherit", textDecoration: "none" }}>{m.atolye}</Link></p>
        <p style={{ marginTop: "1.2rem", opacity: 0.7 }}><Link href={m.anaSayfa} style={{ color: "inherit" }}>berkaydogan.co</Link></p>
      </section>
    </main>
  );
}
