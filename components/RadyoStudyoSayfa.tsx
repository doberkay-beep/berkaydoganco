import Link from "next/link";
import { Isaret } from "./AtolyeSayfa";
import { DESTEK_EMAIL } from "@/lib/site";

/* by. stüdyo · radyolar için — nowby.'yu yapan atölyenin radyolara hizmet sayfası.
   Kural: müşteri adı, sahte yorum, uydurma rakam yok. Sayılar nowby.'nun kendi verisinden (24 Kas 2026).
   İzin isterken iş teklif edilmez; bu sayfa yalnız izin süreci bittikten sonra ya da radyo kendisi sorarsa paylaşılır. */

const KIZIL = "#c9241a";
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif, Georgia), Georgia, serif" };
const appYazi: React.CSSProperties = { fontFamily: "ui-serif, 'New York', Georgia, serif", fontWeight: 700, lineHeight: 1 };
const bolum: React.CSSProperties = { maxWidth: "1080px", margin: "0 auto", padding: "clamp(3rem, 8vh, 5.5rem) clamp(1.25rem, 5vw, 3rem)" };
const kart: React.CSSProperties = { background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", backdropFilter: "blur(12px)" };

type Madde = { b: string; s: string };
type Paket = { b: string; s: string; maddeler: string[]; sure: string; fiyat: string };
export type RadyoMetin = {
  dil: "tr" | "en";
  alt: string; baslik: string; giris: string;
  kanitEtiket: string; kanitlar: { sayi: string; s: string }[]; kanitNot: string;
  gorselTv: string; gorselTel: string; nowbyLink: string;
  paketEtiket: string; paketBaslik: string; paketler: Paket[];
  surecEtiket: string; surec: Madde[];
  ilkeEtiket: string; ilkeler: Madde[];
  iletisimBaslik: string; iletisimMetin: string; konu: string;
  studio: string; studioHref: string; anaSayfa: string;
};

export const RADYO_TR: RadyoMetin = {
  dil: "tr",
  alt: "radyolar için",
  baslik: "Radyonuz için uygulama ve site.",
  giris: "Ben Berkay Doğan; nowby'ı ben yaptım. Her radyoda o an çalan şarkıyı tek ekranda gösteren, ücretsiz ve reklamsız bir radyo uygulaması. Aynı özeni radyonuzun kendi uygulamasına ve sitesine taşıyorum: sizin adınızla, sizin logonuzla, sizin yayınınızla.",
  kanitEtiket: "nowby. bugün",
  kanitlar: [
    { sayi: "84", s: "radyo uygulamada, her biri kendi yazılı izniyle" },
    { sayi: "495", s: "radyonun şu an çalanı nowby.co'da canlı" },
    { sayi: "5", s: "platform: iPhone, iPad, Mac, Apple TV, Windows" },
    { sayi: "30", s: "dilde arayüz" },
  ],
  kanitNot: "Rakamlar 24 Kasım 2026 itibarıyla.",
  gorselTv: "nowby. Apple TV'de: şu an çalan şarkı, canlı yayın",
  gorselTel: "nowby. iPhone'da",
  nowbyLink: "nowby.co'yu açın",
  paketEtiket: "Neler yapabilirim",
  paketBaslik: "Üç iş, her biri sabit fiyatla.",
  paketler: [
    {
      b: "Radyonuzun uygulaması",
      s: "Dinleyici sizi App Store'da kendi adınızla bulur, tek dokunuşla canlı yayına bağlanır.",
      maddeler: ["Canlı yayın; kilit ekranında ve arka planda çalma", "Şu an çalan şarkı ve son çalınanlar", "Logonuz, renkleriniz, kendi adınız", "iPhone ve iPad; istenirse Android", "Mağaza başvurusu ve yayın dahil"],
      sure: "3–4 haftada yayında",
      fiyat: "Sabit fiyat, yazılı teklif",
    },
    {
      b: "Radyonuzun sitesi",
      s: "Telefonda hızlı açılan, ilk ekranda çalan bir site.",
      maddeler: ["Sayfadan ayrılmadan çalan canlı yayın", "Şu an çalan ve son 20 şarkı", "Program akışı, sunucular, iletişim", "Google'da doğru görünmesi için yapılandırılmış veri"],
      sure: "1–2 haftada yayında",
      fiyat: "Sabit fiyat, yazılı teklif",
    },
    {
      b: "Şu an çalan kutusu",
      s: "Var olan sitenize tek satır kodla eklenen küçük bir kutu.",
      maddeler: ["Çalan şarkı, sanatçı ve saat", "Sitenizin renklerine uyar", "Kurulum ve bir yıl bakım"],
      sure: "1 hafta içinde",
      fiyat: "Sabit fiyat, yazılı teklif",
    },
  ],
  surecEtiket: "Nasıl çalışıyoruz",
  surec: [
    { b: "Kısa bir görüşme", s: "Radyonuzu, dinleyicinizi ve ne istediğinizi konuşuruz." },
    { b: "Yazılı teklif", s: "Neyin yapılacağı, neyin yapılmayacağı, teslim tarihi ve sabit fiyat." },
    { b: "Haftalık deneme sürümü", s: "Her hafta kendi telefonunuzda deneyebileceğiniz bir sürüm." },
    { b: "Yayın", s: "Uygulama sizin Apple geliştirici hesabınızdan yayımlanır; Apple'ın kuralı böyle ve uygulama tamamen sizin olur." },
  ],
  ilkeEtiket: "İlkeler",
  ilkeler: [
    { b: "Yayınınıza dokunmam.", s: "Dinleyici doğrudan resmî yayın adresinize bağlanır; araya sunucu, reklam ya da kayıt girmez." },
    { b: "Her şey sizin.", s: "Uygulama, site, alan adı ve kaynak kodu sizde kalır." },
    { b: "Kelimeler önemli.", s: "Her düğme ve her mesaj özenle yazılır; ben aynı zamanda yazarım." },
  ],
  iletisimBaslik: "Radyonuz için konuşalım",
  iletisimMetin: "Radyonuzun adını ve ne istediğinizi birkaç satırla yazın. Kendim cevap veriyorum.",
  konu: "Radyo uygulaması / sitesi",
  studio: "by. stüdyonun bütün işleri", studioHref: "/studio", anaSayfa: "/",
};

export const RADYO_EN: RadyoMetin = {
  dil: "en",
  alt: "for radio",
  baslik: "An app and a website for your station.",
  giris: "I'm Berkay Doğan, and I made nowby, a free, ad-free radio app that shows the song playing right now on every station, on one screen. I bring the same care to your station's own app and website: your name, your logo, your stream.",
  kanitEtiket: "nowby. today",
  kanitlar: [
    { sayi: "84", s: "stations in the app, each with its own written permission" },
    { sayi: "495", s: "stations with live now-playing on nowby.co" },
    { sayi: "5", s: "platforms: iPhone, iPad, Mac, Apple TV, Windows" },
    { sayi: "30", s: "interface languages" },
  ],
  kanitNot: "Figures as of 24 November 2026.",
  gorselTv: "nowby. on Apple TV: the song playing now, live stream",
  gorselTel: "nowby. on iPhone",
  nowbyLink: "Open nowby.co",
  paketEtiket: "What I can build",
  paketBaslik: "Three projects, each at a fixed price.",
  paketler: [
    {
      b: "Your station's app",
      s: "Listeners find you on the App Store under your own name and reach your live stream in one tap.",
      maddeler: ["Live stream, playing on the lock screen and in the background", "Now playing and recently played songs", "Your logo, your colours, your name", "iPhone and iPad; Android on request", "Store submission and launch included"],
      sure: "Live in 3–4 weeks",
      fiyat: "Fixed price, written quote",
    },
    {
      b: "Your station's website",
      s: "A site that loads fast on a phone and plays from the first screen.",
      maddeler: ["Live stream that keeps playing as listeners browse", "Now playing and the last 20 songs", "Schedule, presenters, contact", "Structured data so Google shows you correctly"],
      sure: "Live in 1–2 weeks",
      fiyat: "Fixed price, written quote",
    },
    {
      b: "Now-playing widget",
      s: "A small box added to your existing site with one line of code.",
      maddeler: ["Current song, artist and time", "Matches your site's colours", "Setup and one year of care"],
      sure: "Within a week",
      fiyat: "Fixed price, written quote",
    },
  ],
  surecEtiket: "How we work",
  surec: [
    { b: "A short call", s: "We talk about your station, your listeners and what you need." },
    { b: "A written quote", s: "What will be built, what won't, a delivery date and a fixed price." },
    { b: "A test build every week", s: "Something you can try on your own phone each week." },
    { b: "Launch", s: "The app is published from your own Apple developer account; that's Apple's rule, and it means the app is fully yours." },
  ],
  ilkeEtiket: "Principles",
  ilkeler: [
    { b: "I don't touch your stream.", s: "Listeners connect straight to your official stream; no relay server, no ads, no recording in between." },
    { b: "Everything is yours.", s: "The app, the site, the domain and the source code stay with you." },
    { b: "Words matter.", s: "Every button and message is written with care; I'm also a writer." },
  ],
  iletisimBaslik: "Let's talk about your station",
  iletisimMetin: "Write a few lines with your station's name and what you'd like. I reply personally.",
  konu: "Station app / website",
  studio: "All by. studio work", studioHref: "/en/studio", anaSayfa: "/en",
};

export function RadyoStudyoSayfa({ m }: { m: RadyoMetin }) {
  const posta = `mailto:${DESTEK_EMAIL}?subject=${encodeURIComponent(m.konu)}`;
  return (
    <main lang={m.dil}>
      <style>{`
        .rs-izgara{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:900px){.rs-izgara{grid-template-columns:repeat(3,minmax(0,1fr))}}
        .rs-kanit{display:grid;gap:1rem;grid-template-columns:repeat(2,minmax(0,1fr))}
        @media (min-width:760px){.rs-kanit{grid-template-columns:repeat(4,minmax(0,1fr))}}
        .rs-gorsel{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr);align-items:end}
        @media (min-width:760px){.rs-gorsel{grid-template-columns:minmax(0,3fr) minmax(0,1fr)}}
        .rs-gorsel img{width:100%;height:auto;border-radius:18px;border:1px solid var(--glass-border);display:block}
        .rs-dugme{display:inline-block;padding:.95rem 1.6rem;border-radius:999px !important;background:${KIZIL} !important;color:#fff !important;text-decoration:none}
      `}</style>

      {/* AÇILIŞ */}
      <section style={{ ...bolum, paddingTop: "max(84px, 9vh)", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "flex-end", gap: "0.35em" }}>
          <Isaret boy="clamp(4.5rem, 16vw, 8rem)" />
          <span style={{ ...serif, fontStyle: "italic", fontSize: "clamp(2rem, 6vw, 3.4rem)", marginBottom: "0.18em", opacity: 0.85 }}>{m.alt}</span>
        </div>
        <h1 style={{ ...serif, fontWeight: 400, fontSize: "clamp(1.9rem, 5vw, 3.2rem)", lineHeight: 1.15, maxWidth: "760px", margin: "1.6rem auto 0" }}>{m.baslik}</h1>
        <p style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)", lineHeight: 1.6, maxWidth: "660px", margin: "1.4rem auto 0", opacity: 0.85 }}>{m.giris}</p>
        <a href={posta} className="rs-dugme" style={{ ...mono, marginTop: "1.8rem" }}>{m.iletisimBaslik}</a>
      </section>

      {/* KANIT */}
      <section style={bolum}>
        <p style={{ ...mono, color: KIZIL }}>{m.kanitEtiket}</p>
        <div className="rs-kanit" style={{ marginTop: "1.4rem" }}>
          {m.kanitlar.map((k) => (
            <div key={k.s} style={{ ...kart, padding: "clamp(1.1rem, 2.6vw, 1.5rem)" }}>
              <span style={{ ...appYazi, fontSize: "clamp(2.4rem, 6vw, 3.2rem)", color: KIZIL }}>{k.sayi}</span>
              <p style={{ marginTop: "0.6rem", lineHeight: 1.5, opacity: 0.8 }}>{k.s}</p>
            </div>
          ))}
        </div>
        <div className="rs-gorsel" style={{ marginTop: "1.6rem" }}>
          <img src="/by/cihaz/tv.jpg" alt={m.gorselTv} width={1600} height={900} loading="lazy" decoding="async" />
          <img src="/by/nowby-4.5.jpg" alt={m.gorselTel} width={620} height={1348} loading="lazy" decoding="async" style={{ maxHeight: "420px", width: "auto", justifySelf: "center" }} />
        </div>
        <p style={{ ...mono, opacity: 0.5, marginTop: "1rem", letterSpacing: "0.08em" }}>
          {m.kanitNot} · <a href="https://nowby.co" target="_blank" rel="noopener" style={{ color: KIZIL, textDecoration: "none" }}>{m.nowbyLink}</a>
        </p>
      </section>

      {/* PAKETLER */}
      <section style={bolum}>
        <p style={{ ...mono, color: KIZIL }}>{m.paketEtiket}</p>
        <h2 style={{ ...serif, fontWeight: 400, fontSize: "clamp(1.7rem, 4vw, 2.4rem)", marginTop: "0.8rem" }}>{m.paketBaslik}</h2>
        <div className="rs-izgara" style={{ marginTop: "1.6rem" }}>
          {m.paketler.map((p) => (
            <div key={p.b} style={{ ...kart, padding: "clamp(1.3rem, 3vw, 1.8rem)", display: "flex", flexDirection: "column" }}>
              <h3 style={{ ...serif, fontSize: "1.45rem", fontWeight: 600 }}>{p.b}</h3>
              <p style={{ marginTop: "0.6rem", lineHeight: 1.6, opacity: 0.85 }}>{p.s}</p>
              <ul style={{ margin: "1rem 0 0", paddingLeft: "1.1rem", lineHeight: 1.7, opacity: 0.8 }}>
                {p.maddeler.map((x) => <li key={x}>{x}</li>)}
              </ul>
              <div style={{ marginTop: "auto", paddingTop: "1.4rem" }}>
                <span style={{ ...serif, display: "block", fontSize: "1.15rem", color: KIZIL }}>{p.fiyat}</span>
                <span style={{ ...mono, display: "block", opacity: 0.6, marginTop: "0.4rem" }}>{p.sure}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SÜREÇ */}
      <section style={bolum}>
        <p style={{ ...mono, opacity: 0.6 }}>{m.surecEtiket}</p>
        <ol style={{ listStyle: "none", padding: 0, marginTop: "1.6rem", display: "grid", gap: "1rem" }}>
          {m.surec.map((s, n) => (
            <li key={s.b} style={{ ...kart, padding: "clamp(1.1rem, 2.6vw, 1.5rem)", display: "flex", gap: "1.2rem", alignItems: "baseline" }}>
              <span style={{ ...appYazi, fontSize: "2rem", color: KIZIL, minWidth: "1.4em" }}>{n + 1}</span>
              <div>
                <h3 style={{ ...serif, fontSize: "1.25rem", fontWeight: 600 }}>{s.b}</h3>
                <p style={{ marginTop: "0.35rem", lineHeight: 1.6, opacity: 0.8 }}>{s.s}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* İLKELER */}
      <section style={{ ...bolum, maxWidth: "860px" }}>
        <p style={{ ...mono, opacity: 0.6 }}>{m.ilkeEtiket}</p>
        <div style={{ display: "grid", gap: "1.2rem", marginTop: "1.4rem" }}>
          {m.ilkeler.map((i) => (
            <p key={i.b} style={{ ...serif, fontSize: "clamp(1.15rem, 2.4vw, 1.4rem)", lineHeight: 1.55 }}>
              <strong style={{ fontWeight: 600 }}>{i.b}</strong> <span style={{ opacity: 0.8 }}>{i.s}</span>
            </p>
          ))}
        </div>
      </section>

      {/* İLETİŞİM */}
      <section style={{ ...bolum, textAlign: "center", paddingBottom: "clamp(4rem, 12vh, 7rem)" }}>
        <h2 style={{ ...serif, fontWeight: 400, fontSize: "clamp(1.9rem, 5vw, 3rem)" }}>{m.iletisimBaslik}</h2>
        <p style={{ marginTop: "0.9rem", fontSize: "1.1rem", opacity: 0.8 }}>{m.iletisimMetin}</p>
        <a href={posta} style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(1.3rem, 3vw, 2rem)", letterSpacing: "-0.02em", color: "var(--ink)", display: "inline-block", marginTop: "1.2rem" }}>{DESTEK_EMAIL}</a>
        <p style={{ ...mono, opacity: 0.6, marginTop: "2.6rem" }}><Link href={m.studioHref} style={{ color: "inherit", textDecoration: "none" }}>{m.studio}</Link></p>
        <p style={{ marginTop: "1.2rem", opacity: 0.7 }}><Link href={m.anaSayfa} style={{ color: "inherit" }}>berkaydogan.co</Link></p>
      </section>
    </main>
  );
}
