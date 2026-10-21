import Link from "next/link";
import { Isaret } from "./AtolyeSayfa";
import { EMAIL } from "@/lib/site";

/* by. studio — atölyenin hizmet yüzü: uygulama, web ve canlı veri işleri.
   Örnek işler atölyenin kendi ürünleri; müşteri adı, fiyat ya da süre sözü yok. */

const MOR = "#7c6cff";
const TURUNCU = "#FF6A3D";
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif, Georgia), Georgia, serif" };
const appYazi: React.CSSProperties = { fontFamily: "ui-serif, 'New York', Georgia, serif", fontWeight: 700, lineHeight: 1 };
const bolum: React.CSSProperties = { maxWidth: "1080px", margin: "0 auto", padding: "clamp(3rem, 8vh, 5.5rem) clamp(1.25rem, 5vw, 3rem)" };
const kart: React.CSSProperties = { background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", backdropFilter: "blur(12px)" };

type Hizmet = { b: string; s: string };
type Is = { ad: string; renk: string; m: string; teknik: string; href: string; link: string; gorsel: string; alt: string };
export type StudioMetin = {
  dil: "tr" | "en";
  alt: string; baslik: string; giris: string; uzaktan: string;
  hizmetEtiket: string; hizmetler: Hizmet[];
  isEtiket: string; isler: Is[];
  surecEtiket: string; surec: Hizmet[];
  ilkeEtiket: string; ilkeler: Hizmet[];
  iletisimBaslik: string; iletisimMetin: string; konu: string;
  atolye: string; atolyeHref: string; anaSayfa: string;
};

export const STUDIO_EN: StudioMetin = {
  dil: "en",
  alt: "studio",
  baslik: "Apps and websites, made with a writer's care.",
  giris: "I'm Berkay Doğan, a published writer and developer. I design and build iOS apps, websites and live data products, from the first sketch to the App Store, and I write every word on the screen as carefully as a line in a book.",
  uzaktan: "Available for remote projects in the Netherlands, the UK and across Europe.",
  hizmetEtiket: "What I build",
  hizmetler: [
    { b: "iOS apps", s: "Native SwiftUI apps with maps, audio, location and live updates, designed for the latest iOS and shipped to the App Store." },
    { b: "Websites and web apps", s: "Fast, accessible sites and web apps in Next.js: portfolios, product pages, bilingual sites, dashboards." },
    { b: "Live data and backends", s: "Postgres and Supabase backends, realtime updates, scheduled jobs and APIs that stay quick under load." },
    { b: "Localization", s: "Interfaces translated and checked in up to 30 languages, with copy that reads naturally in each." },
  ],
  isEtiket: "Selected work",
  isler: [
    { ad: "nowby", renk: TURUNCU, m: "What is playing on the radio right now? A live tracker for 350+ stations, with charts built from real airplay counts, artist pages and a world radio atlas.", teknik: "Next.js · Supabase · realtime · SwiftUI iOS app · 30 languages", href: "https://nowby.co", link: "nowby.co →", gorsel: "/by/nowby-4.5.jpg", alt: "nowby live station list" },
    { ad: "hereby", renk: MOR, m: "A location-based iOS app: leave a line where you are, and only someone who comes to that place can read it. Poetry walks, time capsules, moderation tools.", teknik: "SwiftUI · MapKit · PostGIS · Supabase · 30 languages", href: "/en/hereby", link: "About hereby. →", gorsel: "/by/hereby-9.jpg", alt: "hereby map with nearby traces" },
    { ad: "writtenby", renk: MOR, m: "A book written by a city, built inside hereby.: one question a day, one line from where you stand, and a printed book at the end of the year.", teknik: "SwiftUI · Supabase · consent and moderation flows", href: "/en/writtenby", link: "About writtenby. →", gorsel: "/by/writtenby-10.2.jpg", alt: "writtenby. writing screen" },
  ],
  surecEtiket: "How we work",
  surec: [
    { b: "A short call", s: "You tell me what you need; I ask the questions that shape the scope." },
    { b: "A clear proposal", s: "A written scope with what will be built, what won't, and a fixed price." },
    { b: "Weekly progress", s: "A working build to try every week, so nothing surprises you at the end." },
    { b: "Launch and care", s: "Store submission, launch, and fixes after release." },
  ],
  ilkeEtiket: "Principles",
  ilkeler: [
    { b: "No dark patterns.", s: "No manipulative design, no endless feeds by default. My own apps run without ads or likes." },
    { b: "Words matter.", s: "Every button, empty state and error message is written, not filled in." },
    { b: "Small and direct.", s: "You work with the person who designs and builds your product." },
  ],
  iletisimBaslik: "Have a project in mind?",
  iletisimMetin: "Write a few lines about what you'd like to build. I reply personally.",
  konu: "Project enquiry",
  atolye: "Part of the by. workshop", atolyeHref: "/en/by", anaSayfa: "/en",
};

export const STUDIO_TR: StudioMetin = {
  dil: "tr",
  alt: "stüdyo",
  baslik: "Uygulama ve web siteleri, bir yazarın özeniyle.",
  giris: "Ben Berkay Doğan; kitapları yayımlanmış bir yazar ve geliştiriciyim. iOS uygulamaları, web siteleri ve canlı veri ürünleri tasarlıyor ve geliştiriyorum: ilk çizimden App Store'a kadar. Ekrandaki her kelimeyi bir kitaptaki satır kadar özenle yazıyorum.",
  uzaktan: "Hollanda, Birleşik Krallık ve Avrupa'daki projelere uzaktan açığım.",
  hizmetEtiket: "Neler yapıyorum",
  hizmetler: [
    { b: "iOS uygulamaları", s: "Harita, ses, konum ve canlı güncellemeler içeren yerel SwiftUI uygulamaları; güncel iOS için tasarlanıp App Store'a çıkarılır." },
    { b: "Web siteleri ve web uygulamaları", s: "Next.js ile hızlı, erişilebilir siteler: portfolyo, ürün sayfası, iki dilli site, panel." },
    { b: "Canlı veri ve altyapı", s: "Postgres ve Supabase altyapıları, gerçek zamanlı güncellemeler, zamanlanmış işler ve yük altında hızlı kalan API'ler." },
    { b: "Yerelleştirme", s: "30 dile kadar çevrilip kontrol edilmiş arayüzler; her dilde doğal okunan metinler." },
  ],
  isEtiket: "Örnek işler",
  isler: [
    { ad: "nowby", renk: TURUNCU, m: "Radyoda şu an ne çalıyor? 350'den fazla istasyonu canlı izleyen; gerçek çalınma sayılarına dayanan listeler, sanatçı sayfaları ve dünya radyo atlası.", teknik: "Next.js · Supabase · gerçek zamanlı · SwiftUI iOS uygulaması · 30 dil", href: "https://nowby.co", link: "nowby.co →", gorsel: "/by/nowby-4.5.jpg", alt: "nowby canlı istasyon listesi" },
    { ad: "hereby", renk: MOR, m: "Konum tabanlı bir iOS uygulaması: bulunduğun yere bir satır bırak, onu yalnızca oraya gelen okusun. Şiir yürüyüşleri, zaman kapsülleri, moderasyon araçları.", teknik: "SwiftUI · MapKit · PostGIS · Supabase · 30 dil", href: "/hereby", link: "hereby.'yi tanı →", gorsel: "/by/hereby-9.jpg", alt: "hereby haritası ve yakındaki izler" },
    { ad: "writtenby", renk: MOR, m: "hereby.'nin içinde bir şehrin yazdığı kitap: günde tek soru, bulunduğun yerden tek satır, yıl sonunda basılı kitap.", teknik: "SwiftUI · Supabase · izin ve moderasyon akışları", href: "/writtenby", link: "writtenby.'yi tanı →", gorsel: "/by/writtenby-10.2.jpg", alt: "writtenby. yazma ekranı" },
  ],
  surecEtiket: "Nasıl çalışıyoruz",
  surec: [
    { b: "Kısa bir görüşme", s: "Ne istediğini anlatırsın; kapsamı belirleyen soruları ben sorarım." },
    { b: "Net bir teklif", s: "Neyin yapılacağı, neyin yapılmayacağı ve sabit fiyat yazılı olarak." },
    { b: "Haftalık ilerleme", s: "Her hafta denenebilir bir sürüm; sonda sürpriz olmaz." },
    { b: "Yayın ve bakım", s: "Mağaza başvurusu, yayın ve sonrasındaki düzeltmeler." },
  ],
  ilkeEtiket: "İlkeler",
  ilkeler: [
    { b: "Kandırmaca tasarım yok.", s: "Manipülatif tasarım ve varsayılan sonsuz akış yok. Kendi uygulamalarım reklamsız ve beğenisiz." },
    { b: "Kelimeler önemli.", s: "Her düğme, boş ekran ve hata mesajı doldurulmaz, yazılır." },
    { b: "Küçük ve doğrudan.", s: "Ürününü tasarlayan ve geliştiren kişiyle doğrudan çalışırsın." },
  ],
  iletisimBaslik: "Aklında bir proje mi var?",
  iletisimMetin: "Yapmak istediğin şeyi birkaç satırla yaz. Kendim cevap veriyorum.",
  konu: "Proje",
  atolye: "by. atölyesinin bir parçası", atolyeHref: "/by", anaSayfa: "/",
};

export function StudioSayfa({ m }: { m: StudioMetin }) {
  const posta = `mailto:${EMAIL}?subject=${encodeURIComponent(m.konu)}`;
  return (
    <main lang={m.dil}>
      <style>{`
        .st-izgara{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:760px){.st-izgara{grid-template-columns:repeat(2,minmax(0,1fr))}}
        .st-is{display:grid;gap:clamp(1.2rem,3vw,2rem);grid-template-columns:minmax(0,1fr);align-items:center}
        @media (min-width:760px){.st-is{grid-template-columns:auto minmax(0,1fr)}}
        .st-is img{height:clamp(280px,40vw,360px);width:auto;border-radius:22px;border:1px solid var(--glass-border);justify-self:center}
      `}</style>

      {/* AÇILIŞ */}
      <section style={{ ...bolum, paddingTop: "clamp(4rem, 12vh, 7rem)", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "flex-end", gap: "0.35em" }}>
          <Isaret boy="clamp(4.5rem, 16vw, 8rem)" />
          <span style={{ ...serif, fontStyle: "italic", fontSize: "clamp(2rem, 6vw, 3.4rem)", marginBottom: "0.18em", opacity: 0.85 }}>{m.alt}</span>
        </div>
        <h1 style={{ ...serif, fontWeight: 400, fontSize: "clamp(1.9rem, 5vw, 3.2rem)", lineHeight: 1.15, maxWidth: "760px", margin: "1.6rem auto 0" }}>{m.baslik}</h1>
        <p style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)", lineHeight: 1.6, maxWidth: "640px", margin: "1.4rem auto 0", opacity: 0.85 }}>{m.giris}</p>
        <p style={{ ...mono, color: MOR, marginTop: "1.6rem" }}>{m.uzaktan}</p>
        <a href={posta} style={{ ...mono, display: "inline-block", marginTop: "1.8rem", padding: "0.95rem 1.6rem", borderRadius: "999px", background: MOR, color: "#fff", textDecoration: "none" }}>{m.iletisimBaslik}</a>
      </section>

      {/* HİZMETLER */}
      <section style={bolum}>
        <p style={{ ...mono, opacity: 0.6 }}>{m.hizmetEtiket}</p>
        <div className="st-izgara" style={{ marginTop: "1.6rem" }}>
          {m.hizmetler.map((h) => (
            <div key={h.b} style={{ ...kart, padding: "clamp(1.3rem, 3vw, 1.8rem)" }}>
              <h2 style={{ ...serif, fontSize: "1.45rem", fontWeight: 600 }}>{h.b}</h2>
              <p style={{ marginTop: "0.6rem", lineHeight: 1.6, opacity: 0.8 }}>{h.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ÖRNEK İŞLER */}
      <section style={bolum}>
        <p style={{ ...mono, opacity: 0.6 }}>{m.isEtiket}</p>
        <div style={{ display: "grid", gap: "clamp(2.5rem, 6vh, 4rem)", marginTop: "1.8rem" }}>
          {m.isler.map((i) => (
            <article key={i.ad} className="st-is">
              <img src={i.gorsel} alt={i.alt} loading="lazy" decoding="async" />
              <div>
                <h2 style={{ ...appYazi, fontSize: "clamp(2.6rem, 7vw, 3.8rem)" }}>{i.ad}<span style={{ color: i.renk }}>.</span></h2>
                <p style={{ marginTop: "0.9rem", lineHeight: 1.65, fontSize: "1.05rem", opacity: 0.85, maxWidth: "520px" }}>{i.m}</p>
                <p style={{ ...mono, opacity: 0.55, marginTop: "1rem", letterSpacing: "0.08em" }}>{i.teknik}</p>
                {i.href.startsWith("http")
                  ? <a href={i.href} target="_blank" rel="noopener" style={{ ...mono, display: "inline-block", marginTop: "1.1rem", color: i.renk, textDecoration: "none" }}>{i.link}</a>
                  : <Link href={i.href} style={{ ...mono, display: "inline-block", marginTop: "1.1rem", color: i.renk, textDecoration: "none" }}>{i.link}</Link>}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SÜREÇ */}
      <section style={bolum}>
        <p style={{ ...mono, opacity: 0.6 }}>{m.surecEtiket}</p>
        <ol style={{ listStyle: "none", padding: 0, marginTop: "1.6rem", display: "grid", gap: "1rem" }}>
          {m.surec.map((s, n) => (
            <li key={s.b} style={{ ...kart, padding: "clamp(1.1rem, 2.6vw, 1.5rem)", display: "flex", gap: "1.2rem", alignItems: "baseline" }}>
              <span style={{ ...appYazi, fontSize: "2rem", color: MOR, minWidth: "1.4em" }}>{n + 1}</span>
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
        <a href={posta} style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(1.3rem, 3vw, 2rem)", letterSpacing: "-0.02em", color: "var(--ink)", display: "inline-block", marginTop: "1.2rem" }}>{EMAIL}</a>
        <p style={{ ...mono, opacity: 0.6, marginTop: "2.6rem" }}><Link href={m.atolyeHref} style={{ color: "inherit", textDecoration: "none" }}>{m.atolye}</Link></p>
        <p style={{ marginTop: "1.2rem", opacity: 0.7 }}><Link href={m.anaSayfa} style={{ color: "inherit" }}>berkaydogan.co</Link></p>
      </section>
    </main>
  );
}
