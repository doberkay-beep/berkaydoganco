import Link from "next/link";
import { EMAIL } from "@/lib/site";

/* nowby. — by. atölyesinin ikinci işi. Türkiye'nin radyolarında şu an ne çalıyor?
   Canlı radyo sitesi nowby.co'da; bu sayfa uygulamaları (iPhone, iPad, Mac, Apple TV, Apple Watch) tanıtır. */

const TURUNCU = "#FF6A3D";
const appYazi: React.CSSProperties = { fontFamily: "ui-serif, 'New York', Georgia, serif", fontWeight: 700, lineHeight: 1 };
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif, Georgia), Georgia, serif" };
const bolum: React.CSSProperties = { maxWidth: "1080px", margin: "0 auto", padding: "clamp(3rem, 8vh, 5.5rem) clamp(1.25rem, 5vw, 3rem)" };
const kart: React.CSSProperties = { background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", backdropFilter: "blur(12px)" };

type Madde = { b: string; s: string };
export type NowbyMetin = {
  dil: "tr" | "en";
  alt: string; giris: string; durum: string; dinle: string;
  cihazlarAlt: string; ekranEtiket: string; ekranBaslik: string; ekranlar: (Madde & { c: string })[];
  icerikEtiket: string; icerik: Madde[];
  soruEtiket: string; sorular: string[];
  ilkeler: string; kapanis: string;
  atolye: string; atolyeHref: string; anaSayfa: string;
  destek: string; gizlilik: string; gizlilikHref: string;
};

export const NOWBY_TR: NowbyMetin = {
  dil: "tr",
  alt: "Türkiye'nin radyolarında şu an ne çalıyor?",
  giris: "Yüzlerce frekans tek ekranda, canlı. Gerçek sayıma dayanan listeler, dünyanın radyoları, kitaplardan dizelerle Frekans Falı.",
  durum: "nowby.co'da canlı · Uygulamalar yakında",
  dinle: "Şimdi dinle: nowby.co →",
  cihazlarAlt: "nowby. beş cihazda aynı anda: Apple TV, MacBook, iPad, iPhone ve Apple Watch. Hepsinde aynı radyo, aynı şarkı.",
  ekranEtiket: "Her ekranda",
  ekranBaslik: "Aynı frekans, her ekranda.",
  ekranlar: [
    { c: "iPhone", b: "Cebinde, canlı.", s: "Yüzlerce radyo, şu an çalan şarkılarıyla." },
    { c: "iPad", b: "Kucağında, üç sütun.", s: "Kenar çubuğu, şarkı kartları ve büyük çalar aynı ekranda." },
    { c: "Mac", b: "Masanda, yan panelde.", s: "Kenar çubuğu, şarkı kartları, altta boydan boya çalar." },
    { c: "Apple TV", b: "Salonda, kocaman.", s: "Kanepeden okunan şarkı adları." },
    { c: "Apple Watch", b: "Bileğinde, tek dokunuş.", s: "Telefondaki çaların kumandası; şarkıyı oradan yakala." },
  ],
  icerikEtiket: "İçinde neler var",
  icerik: [
    { b: "Şarkı adı, sesle aynı anda.", s: "Dinlediğin radyoda şarkının adı yayının kendisinden okunur; kulağına gelenle ekrandaki hep aynı." },
    { b: "Şarkıyı yakala.", s: "Beğendiğin şarkıyı tek dokunuşla Av Defteri'ne ekle: hangi radyoda, ne zaman çaldığıyla." },
    { b: "nowby. Listesi.", s: "Gerçek sayıma dayanan listeler: bugün radyolarda en çok ne çaldı, hangi şarkı kaç radyoda." },
    { b: "Şairin Frekansı.", s: "Yazarken açık bıraktıklarım — klasik, akustik, biraz da gürültü." },
    { b: "Frekans Falı.", s: "Bir frekans seç, kitaplardan bir dize çıksın." },
    { b: "Dünya Atlası.", s: "Haritada bir ışığa dokun; o ülkenin radyosu şu an ne çalıyor, dinle." },
  ],
  soruEtiket: "Atölyenin dört sorusu",
  sorular: ["“Şu an radyoda ne çalıyor?”", "Gözünü ekrandan alır, kulağını şehre verir.", "Şarkıları sayar, insanları değil.", "Frekans Falı'nda kitaplardan bir dize."],
  ilkeler: "Reklam yok · Beğeni yok · Takipçi yok",
  kapanis: "Önce sözler, sonra frekanslar.",
  atolye: "by. atölyesinin bir işi", atolyeHref: "/by", anaSayfa: "/",
  destek: "Soru, öneri ya da eklenmesini istediğin bir radyo", gizlilik: "Gizlilik", gizlilikHref: "/nowby/gizlilik",
};

export const NOWBY_EN: NowbyMetin = {
  dil: "en",
  alt: "What is playing on Türkiye's radio right now?",
  giris: "Hundreds of frequencies on one screen, live. Charts built on real airplay counts, the world's radio, and a Frequency Fortune with lines from the books.",
  durum: "Live at nowby.co · Apps coming soon",
  dinle: "Listen now: nowby.co →",
  cihazlarAlt: "nowby. on five devices at once: Apple TV, MacBook, iPad, iPhone and Apple Watch. The same station, the same song on all of them.",
  ekranEtiket: "On every screen",
  ekranBaslik: "The same frequency, on every screen.",
  ekranlar: [
    { c: "iPhone", b: "In your pocket, live.", s: "Hundreds of stations with the song playing right now." },
    { c: "iPad", b: "On your lap, three columns.", s: "Sidebar, song cards and the big player on one screen." },
    { c: "Mac", b: "On your desk, in a side panel.", s: "A sidebar, song cards and a full-width player along the bottom." },
    { c: "Apple TV", b: "In the living room, huge.", s: "Song titles you can read from the couch." },
    { c: "Apple Watch", b: "On your wrist, one tap.", s: "A remote for the player on your phone; catch the song from there." },
  ],
  icerikEtiket: "What's inside",
  icerik: [
    { b: "The title, in sync with the sound.", s: "On the station you're listening to, the song title is read from the broadcast itself, so what you hear and what you see always match." },
    { b: "Catch the song.", s: "Add a song you love to your Song Catches in one tap, with the station and the time it played." },
    { b: "The nowby. Chart.", s: "Charts built on real airplay counts: what played most on the radio today, and on how many stations." },
    { b: "The Poet's Frequency.", s: "What I leave on while I write — classical, acoustic, and a little noise." },
    { b: "Frequency Fortune.", s: "Pick a frequency and draw a line from the books." },
    { b: "World Atlas.", s: "Tap a light on the map and hear what that country's radio is playing right now." },
  ],
  soruEtiket: "The workshop's four questions",
  sorular: ["“What's on the radio right now?”", "It takes your eyes off the screen and gives your ears to the city.", "It counts songs, not people.", "A line from the books in the Frequency Fortune."],
  ilkeler: "No ads · No likes · No followers",
  kapanis: "First words, then frequencies.",
  atolye: "A work of the by. workshop", atolyeHref: "/en/by", anaSayfa: "/en",
  destek: "Questions, ideas, or a station you'd like added", gizlilik: "Privacy", gizlilikHref: "/en/nowby/privacy",
};

function Logo({ boy }: { boy: string }) {
  return (
    <span style={{ ...appYazi, fontSize: boy, letterSpacing: "-0.01em" }}>
      nowby<span style={{ color: TURUNCU }}>.</span>
    </span>
  );
}

export function NowbySayfa({ m }: { m: NowbyMetin }) {
  return (
    <main lang={m.dil}>
      <style>{`
        .nb-ekranlar{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:700px){.nb-ekranlar{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media (min-width:1000px){.nb-ekranlar{grid-template-columns:repeat(5,minmax(0,1fr))}}
        .nb-icerik{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:760px){.nb-icerik{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media (min-width:1000px){.nb-icerik{grid-template-columns:repeat(3,minmax(0,1fr))}}
        .nb-sorular{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:760px){.nb-sorular{grid-template-columns:repeat(2,minmax(0,1fr))}}
      `}</style>

      {/* AÇILIŞ */}
      <section style={{ ...bolum, paddingTop: "clamp(4rem, 12vh, 7rem)", paddingBottom: "1.5rem", textAlign: "center" }}>
        <Logo boy="clamp(3.6rem, 14vw, 6.2rem)" />
        <h1 style={{ ...serif, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4.4vw, 2.7rem)", lineHeight: 1.2, marginTop: "1rem" }}>{m.alt}</h1>
        <p style={{ ...serif, fontSize: "clamp(1.1rem, 2.4vw, 1.4rem)", lineHeight: 1.55, margin: "1.3rem auto 0", maxWidth: "640px", opacity: 0.85 }}>{m.giris}</p>
        <p style={{ ...mono, color: TURUNCU, marginTop: "1.6rem" }}>{m.durum}</p>
        <p style={{ marginTop: "1.4rem" }}>
          <a href="https://nowby.co" style={{ display: "inline-block", padding: "0.8rem 1.4rem", borderRadius: "999px", background: TURUNCU, color: "#160806", fontWeight: 700, textDecoration: "none" }}>{m.dinle}</a>
        </p>
      </section>

      {/* LANSMAN SAHNESİ */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(0.75rem, 3vw, 2rem)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nowby/cihazlar.png" alt={m.cihazlarAlt} width={2400} height={1240} style={{ width: "100%", height: "auto", display: "block" }} />
      </section>

      {/* HER EKRANDA */}
      <section style={bolum}>
        <p style={{ ...mono, opacity: 0.6, textAlign: "center" }}>{m.ekranEtiket}</p>
        <h2 style={{ ...serif, fontWeight: 400, fontSize: "clamp(2rem, 5.4vw, 3.4rem)", lineHeight: 1.1, marginTop: "0.8rem", textAlign: "center" }}>{m.ekranBaslik}</h2>
        <div className="nb-ekranlar" style={{ marginTop: "2.2rem" }}>
          {m.ekranlar.map((e) => (
            <div key={e.c} style={{ ...kart, padding: "1.3rem 1.2rem" }}>
              <p style={{ ...mono, color: TURUNCU, textTransform: "none", letterSpacing: "0.04em", fontSize: "0.85rem" }}>{e.c}</p>
              <h3 style={{ ...serif, fontSize: "1.25rem", fontWeight: 600, marginTop: "0.6rem", lineHeight: 1.25 }}>{e.b}</h3>
              <p style={{ marginTop: "0.5rem", lineHeight: 1.55, opacity: 0.78, fontSize: "0.95rem" }}>{e.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* İÇİNDE NELER VAR */}
      <section style={bolum}>
        <p style={{ ...mono, opacity: 0.6 }}>{m.icerikEtiket}</p>
        <div className="nb-icerik" style={{ marginTop: "1.6rem" }}>
          {m.icerik.map((i, n) => (
            <div key={i.b} style={{ ...kart, padding: "clamp(1.3rem, 3vw, 1.8rem)" }}>
              <span style={{ ...appYazi, fontSize: "2.2rem", color: TURUNCU }}>{n + 1}</span>
              <h3 style={{ ...serif, fontSize: "1.35rem", marginTop: "0.7rem", fontWeight: 600 }}>{i.b}</h3>
              <p style={{ marginTop: "0.5rem", lineHeight: 1.6, opacity: 0.8 }}>{i.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DÖRT SORU */}
      <section style={{ ...bolum, maxWidth: "900px" }}>
        <p style={{ ...mono, opacity: 0.6 }}>{m.soruEtiket}</p>
        <div className="nb-sorular" style={{ marginTop: "1.4rem" }}>
          {m.sorular.map((s) => (
            <p key={s} style={{ ...serif, fontStyle: "italic", fontSize: "clamp(1.2rem, 2.6vw, 1.5rem)", lineHeight: 1.4, borderTop: "1px solid var(--glass-border)", paddingTop: "1rem" }}>{s}</p>
          ))}
        </div>
      </section>

      {/* KAPANIŞ */}
      <section style={{ ...bolum, textAlign: "center", paddingBottom: "clamp(4rem, 12vh, 7rem)" }}>
        <Logo boy="3rem" />
        <p style={{ ...serif, fontStyle: "italic", fontSize: "clamp(1.2rem, 2.8vw, 1.6rem)", marginTop: "1.1rem" }}>{m.kapanis}</p>
        <p style={{ ...mono, color: TURUNCU, marginTop: "1.2rem" }}>{m.ilkeler}</p>
        <p style={{ marginTop: "1.6rem" }}>
          <a href="https://nowby.co" style={{ ...mono, color: TURUNCU, textDecoration: "none" }}>{m.dinle}</a>
        </p>
        <p style={{ marginTop: "2.4rem", lineHeight: 1.6, opacity: 0.85 }}>
          {m.destek}: <a href={`mailto:${EMAIL}`} style={{ color: "var(--ink)", textDecoration: "underline" }}>{EMAIL}</a>
          {" · "}<Link href={m.gizlilikHref} style={{ color: "inherit" }}>{m.gizlilik}</Link>
        </p>
        <p style={{ ...mono, opacity: 0.6, marginTop: "1.6rem" }}><Link href={m.atolyeHref} style={{ color: "inherit", textDecoration: "none" }}>{m.atolye}</Link></p>
        <p style={{ marginTop: "1.2rem", opacity: 0.7 }}><Link href={m.anaSayfa} style={{ color: "inherit" }}>berkaydogan.co</Link></p>
      </section>
    </main>
  );
}
