import Link from "next/link";

/* writtenby. — by. atölyesinin üçüncü işi, hereby.'nin içinde yaşar.
   Bir şehrin yazdığı kitap: günde tek soru, bulunduğun yerden tek satır, yıl sonunda basılı kitap. */

const MOR = "#7c6cff";
const appYazi: React.CSSProperties = { fontFamily: "ui-serif, 'New York', Georgia, serif", fontWeight: 700, lineHeight: 1 };
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif, Georgia), Georgia, serif" };
const bolum: React.CSSProperties = { maxWidth: "1080px", margin: "0 auto", padding: "clamp(3rem, 8vh, 5.5rem) clamp(1.25rem, 5vw, 3rem)" };
const kart: React.CSSProperties = { background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", backdropFilter: "blur(12px)" };

type Adim = { b: string; s: string };
export type WrittenbyMetin = {
  dil: "tr" | "en";
  alt: string; giris: string; telefon: string; deneme: string;
  nasilEtiket: string; adimlar: Adim[];
  izinEtiket: string; izinBaslik: string; izinler: string[];
  kitapEtiket: string; kitapBaslik: string; kitapMetin: string;
  ornekEtiket: string; ornekSoru: string;
  yakinda: string; herebyLink: string; herebyHref: string;
  atolye: string; atolyeHref: string; anaSayfa: string;
  sanatci?: { etiket: string; baslik: string; metin: string; link: string; href: string };
};

export const WRITTENBY_TR: WrittenbyMetin = {
  dil: "tr",
  alt: "Bir şehrin yazdığı kitap",
  giris: "Her gün herkese aynı soru. Bulunduğun yerden tek bir satır. Yıl sonunda bu satırlardan basılı bir kitap.",
  telefon: "writtenby. ekranı: günün sorusu, tek satır ve basım izni",
  deneme: "Deneme dönemi · İstanbul 2027 kitabı 1 Ocak'ta başlıyor",
  nasilEtiket: "Nasıl işler",
  adimlar: [
    { b: "Günün sorusu.", s: "Her sabah herkese aynı soru gelir. İstersen soruyu bırakıp özgür bir satır da yazabilirsin." },
    { b: "Tek satır.", s: "Bulunduğun yerden, en fazla 140 karakter. Günde yalnız bir satır; yazdıktan sonra değişmez." },
    { b: "Yalnızca orada okunur.", s: "Satırını yalnızca o yere gelenler okur. Beğeni yok, sıralama yok, takipçi yok." },
    { b: "Yıl sonunda kitap.", s: "Satırlar Berkay Doğan tarafından derlenir ve basılı bir kitap olur. Kitaba girenlere haber verilir." },
  ],
  izinEtiket: "Senin satırın",
  izinBaslik: "Kitaba ne gireceğine sen karar verirsin.",
  izinler: [
    "Basım izni kendiliğinden kapalıdır; sen açmadıkça hiçbir satır kitaba girmez.",
    "Kitapta mahlasınla ya da adsız yer alırsın.",
    "Kitap baskıya gidene kadar iznini geri alabilir, satırını tamamen çekebilirsin.",
    "Satırlarda telefon, e-posta ya da link paylaşılamaz; şikâyet edilen satırlar incelenir.",
  ],
  kitapEtiket: "İlk kitap",
  kitapBaslik: "İstanbul 2027",
  kitapMetin: "1 Ocak 2027'de başlıyor, 31 Aralık'ta kapanıyor. Bir yıl boyunca bir şehrin sokaklarından, iskelelerinden, pencerelerinden gelen satırlar. Kitaba girmek bir ödül değil, bir derleme kararı.",
  ornekEtiket: "Bir günün sorusu",
  ornekSoru: "Bugün nerede durdun?",
  yakinda: "writtenby. yakında hereby. ile iOS'ta. Android planlanıyor.",
  herebyLink: "hereby.'yi tanı →", herebyHref: "/hereby",
  atolye: "by. atölyesinin bir işi", atolyeHref: "/by", anaSayfa: "/",
  sanatci: {
    etiket: "İkinci katman",
    baslik: "Bir şehrin satırları arasında, imzalı sayfalar.",
    metin: "Seçilmiş sanatçılar kendi eserleriyle writtenby.'de yer alır; konu serbest, biçim serbest. Günü geldiğinde şehrin satırlarıyla aynı kitapta buluşurlar.",
    link: "Sanatçılar için →", href: "/writtenby/sanatcilar",
  },
};

export const WRITTENBY_EN: WrittenbyMetin = {
  dil: "en",
  alt: "A book written by a city",
  giris: "The same question for everyone, every day. One line from where you stand. At the end of the year, a printed book made of those lines.",
  telefon: "The writtenby. screen: the question of the day, one line and print permission",
  deneme: "Trial period · The Istanbul 2027 book begins on January 1",
  nasilEtiket: "How it works",
  adimlar: [
    { b: "The question of the day.", s: "Every morning everyone gets the same question. You can also skip it and write a free line." },
    { b: "One line.", s: "From where you are, up to 140 characters. Only one line a day; it can't be changed once written." },
    { b: "Read only there.", s: "Only those who come to that place can read your line. No likes, no rankings, no followers." },
    { b: "A book at year's end.", s: "Berkay Doğan compiles the lines into a printed book. Those included are notified." },
  ],
  izinEtiket: "Your line",
  izinBaslik: "You decide what goes into the book.",
  izinler: [
    "Print permission is off by default; no line enters the book unless you turn it on.",
    "You appear in the book under your pen name, or anonymously.",
    "Until the book goes to print, you can revoke permission or withdraw your line entirely.",
    "Lines can't include phone numbers, emails or links; reported lines are reviewed.",
  ],
  kitapEtiket: "The first book",
  kitapBaslik: "Istanbul 2027",
  kitapMetin: "It opens on January 1, 2027 and closes on December 31. A year of lines from a city's streets, piers and windows. Getting into the book isn't a prize, it's an editorial choice.",
  ornekEtiket: "One day's question",
  ornekSoru: "Where did you stop today?",
  yakinda: "writtenby. is coming soon to iOS with hereby. Android is planned.",
  herebyLink: "Meet hereby. →", herebyHref: "/en/hereby",
  atolye: "A work of the by. workshop", atolyeHref: "/en/by", anaSayfa: "/en",
};

function Logo({ boy }: { boy: string }) {
  return (
    <span style={{ ...appYazi, fontSize: boy, letterSpacing: "-0.01em" }}>
      written<span style={{ color: MOR }}>by.</span>
    </span>
  );
}

export function WrittenbySayfa({ m }: { m: WrittenbyMetin }) {
  return (
    <main lang={m.dil}>
      <style>{`
        .wb-telefon{width:clamp(200px,32vw,290px);aspect-ratio:9/19.5;border-radius:clamp(30px,4.5vw,44px);overflow:hidden;
          border:clamp(6px,.9vw,9px) solid #141110;background:#000;box-shadow:0 40px 80px rgba(0,0,0,.45),0 0 0 1px rgba(255,255,255,.06)}
        .wb-acilis{display:grid;gap:clamp(2rem,5vw,3.5rem);grid-template-columns:minmax(0,1fr);align-items:center;justify-items:center;text-align:center}
        @media (min-width:1000px){.wb-acilis{grid-template-columns:minmax(0,1.2fr) auto;justify-items:start;text-align:left}}
        .wb-adimlar{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:760px){.wb-adimlar{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media (prefers-reduced-motion: reduce){.wb-telefon video{display:none}}
      `}</style>

      {/* AÇILIŞ */}
      <section style={{ ...bolum, paddingTop: "clamp(4rem, 12vh, 7rem)" }}>
        <div className="wb-acilis">
          <div>
            <Logo boy="clamp(3.4rem, 13vw, 5.6rem)" />
            <p style={{ ...serif, fontStyle: "italic", fontSize: "clamp(1.4rem, 3.4vw, 2.1rem)", marginTop: "0.9rem" }}>{m.alt}</p>
            <p style={{ ...serif, fontSize: "clamp(1.15rem, 2.4vw, 1.45rem)", lineHeight: 1.55, marginTop: "1.4rem", maxWidth: "560px", opacity: 0.85 }}>{m.giris}</p>
            <p style={{ ...mono, color: MOR, marginTop: "1.6rem" }}>{m.deneme}</p>
          </div>
          <div className="wb-telefon" style={{ transform: "rotate(3deg)" }}>
            <video src="/writtenby/ekran.mp4" poster="/writtenby/poster.jpg" autoPlay muted loop playsInline preload="metadata" aria-label={m.telefon}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </section>

      {/* NASIL İŞLER */}
      <section style={bolum}>
        <p style={{ ...mono, opacity: 0.6 }}>{m.nasilEtiket}</p>
        <div className="wb-adimlar" style={{ marginTop: "1.6rem" }}>
          {m.adimlar.map((a, n) => (
            <div key={a.b} style={{ ...kart, padding: "clamp(1.3rem, 3vw, 1.9rem)" }}>
              <span style={{ ...appYazi, fontSize: "2.6rem", color: MOR }}>{n + 1}</span>
              <h2 style={{ ...serif, fontSize: "1.45rem", marginTop: "0.8rem", fontWeight: 600 }}>{a.b}</h2>
              <p style={{ marginTop: "0.5rem", lineHeight: 1.6, opacity: 0.8 }}>{a.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BİR GÜNÜN SORUSU */}
      <section style={{ ...bolum, textAlign: "center" }}>
        <p style={{ ...mono, color: MOR }}>{m.ornekEtiket}</p>
        <p style={{ ...serif, fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2.4rem, 7vw, 4.4rem)", lineHeight: 1.1, marginTop: "1rem" }}>{m.ornekSoru}</p>
      </section>

      {/* SENİN SATIRIN */}
      <section style={{ ...bolum, maxWidth: "860px" }}>
        <p style={{ ...mono, opacity: 0.6 }}>{m.izinEtiket}</p>
        <h2 style={{ ...serif, fontSize: "clamp(1.7rem, 4.4vw, 2.6rem)", lineHeight: 1.2, marginTop: "0.8rem", fontWeight: 400 }}>{m.izinBaslik}</h2>
        <ul style={{ listStyle: "none", padding: 0, marginTop: "1.6rem", display: "grid", gap: "0.9rem" }}>
          {m.izinler.map((i) => (
            <li key={i} style={{ display: "flex", gap: "0.8rem", lineHeight: 1.6, fontSize: "1.05rem" }}>
              <span aria-hidden style={{ color: MOR, flexShrink: 0 }}>—</span><span style={{ opacity: 0.85 }}>{i}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* İLK KİTAP */}
      <section style={bolum}>
        <div style={{ ...kart, padding: "clamp(2rem, 6vw, 3.5rem)", textAlign: "center" }}>
          <p style={{ ...mono, opacity: 0.6 }}>{m.kitapEtiket}</p>
          <h2 style={{ ...appYazi, fontSize: "clamp(3rem, 10vw, 5.5rem)", marginTop: "0.8rem" }}>{m.kitapBaslik}</h2>
          <p style={{ ...serif, fontSize: "clamp(1.1rem, 2.4vw, 1.35rem)", lineHeight: 1.6, maxWidth: "620px", margin: "1.2rem auto 0", opacity: 0.85 }}>{m.kitapMetin}</p>
        </div>
      </section>

      {/* İKİNCİ KATMAN: SANATÇILAR */}
      {m.sanatci && (
        <section style={{ ...bolum, maxWidth: "860px", textAlign: "center" }}>
          <p style={{ ...mono, color: MOR }}>{m.sanatci.etiket}</p>
          <h2 style={{ ...serif, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.8rem, 5vw, 2.8rem)", lineHeight: 1.2, marginTop: "0.9rem" }}>{m.sanatci.baslik}</h2>
          <p style={{ ...serif, fontSize: "clamp(1.1rem, 2.4vw, 1.3rem)", lineHeight: 1.6, maxWidth: "600px", margin: "1.1rem auto 0", opacity: 0.85 }}>{m.sanatci.metin}</p>
          <p style={{ marginTop: "1.6rem" }}>
            <Link href={m.sanatci.href} style={{ ...mono, color: MOR, textDecoration: "none" }}>{m.sanatci.link}</Link>
          </p>
        </section>
      )}

      {/* KAPANIŞ */}
      <section style={{ ...bolum, textAlign: "center", paddingBottom: "clamp(4rem, 12vh, 7rem)" }}>
        <Logo boy="3rem" />
        <p style={{ ...serif, fontSize: "clamp(1.15rem, 2.6vw, 1.5rem)", marginTop: "1.2rem" }}>{m.yakinda}</p>
        <p style={{ marginTop: "1.4rem" }}>
          <Link href={m.herebyHref} style={{ ...mono, color: MOR, textDecoration: "none" }}>{m.herebyLink}</Link>
        </p>
        <p style={{ ...mono, opacity: 0.6, marginTop: "2.4rem" }}><Link href={m.atolyeHref} style={{ color: "inherit", textDecoration: "none" }}>{m.atolye}</Link></p>
        <p style={{ marginTop: "1.2rem", opacity: 0.7 }}><Link href={m.anaSayfa} style={{ color: "inherit" }}>berkaydogan.co</Link></p>
      </section>
    </main>
  );
}
