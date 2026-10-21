import type { Metadata } from "next";
import Link from "next/link";

/* by. — Berkay Doğan'ın uygulama atölyesi. hereby. ve nowby. bu atölyenin işleri.
   İşaret: New York Bold "by" (maske görseli) + mordan (hereby) turuncuya (nowby) akan nokta. */

export const metadata: Metadata = {
  title: { absolute: "by. — Berkay Doğan'ın atölyesi" },
  description: "by., yazar Berkay Doğan'ın uygulama atölyesi. Beğenisiz, takipçisiz, sonsuz akışsız; seni telefondan alıp bir yere, bir âna, bir insana götüren uygulamalar: hereby. ve nowby.",
  alternates: { canonical: "/by" },
  openGraph: { title: "by. — Berkay Doğan'ın atölyesi", description: "Bir yazarın uygulama atölyesi: hereby. ve nowby.", images: ["/by/by-ikon.png"] },
};

const MOR = "#7c6cff";
const TURUNCU = "#FF6A3D";
const GECIS = `linear-gradient(135deg, ${MOR}, ${TURUNCU})`;
const appYazi: React.CSSProperties = { fontFamily: "ui-serif, 'New York', Georgia, serif", fontWeight: 700, lineHeight: 1 };
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif, Georgia), Georgia, serif" };
const bolum: React.CSSProperties = { maxWidth: "1080px", margin: "0 auto", padding: "clamp(3rem, 8vh, 5.5rem) clamp(1.25rem, 5vw, 3rem)" };
const kart: React.CSSProperties = { background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", backdropFilter: "blur(12px)" };

// "by" glifi New York Bold'dan maske olarak (her cihazda aynı çizim, rengi temadan gelir); 634×600 oran.
function Isaret({ boy }: { boy: string }) {
  return (
    <span role="img" aria-label="by." style={{ display: "inline-flex", alignItems: "flex-end", fontSize: boy, lineHeight: 1 }}>
      <span aria-hidden style={{
        display: "inline-block", width: "1.0567em", height: "1em", background: "currentColor",
        WebkitMaskImage: "url(/by/by-maske.png)", maskImage: "url(/by/by-maske.png)",
        WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
      }} />
      <span aria-hidden style={{ display: "inline-block", width: "0.2em", height: "0.2em", borderRadius: "50%", marginLeft: "0.04em", marginBottom: "0.235em", background: GECIS }} />
    </span>
  );
}

/** Uygulamanın gerçek ekranı: telefon çerçevesinde sessiz, döngüde video. */
function Telefon({ video, poster, etiket, egim }: { video: string; poster: string; etiket: string; egim: number }) {
  return (
    <div className="by-telefon" style={{ transform: `rotate(${egim}deg)` }}>
      <video src={video} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-label={etiket}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  );
}

const ISLER = [
  {
    ad: "hereby", renk: MOR, soru: "Nerede?", href: "/hereby", dis: false, link: "hereby.'yi tanı →",
    m: "Aklından geçen satırı geçtiğin yere bırak. Onu yalnızca oraya gelen biri okuyabilir. Kitaplardan satırlarla şiir yürüyüşleri, zaman kapsülleri, kendine notlar.",
    gorseller: [["/hereby/vitrin-1.jpg", "Yeni iz yazma ekranı"], ["/hereby/vitrin-3.jpg", "Harita ve yakındaki izler"], ["/hereby/vitrin-5.jpg", "Bir iz ve yanına bırakılan satırlar"]],
  },
  {
    ad: "nowby", renk: TURUNCU, soru: "Ne zaman?", href: "https://nowby.co", dis: true, link: "nowby.co →",
    m: "Türkiye'nin radyolarında şu an ne çalıyor? Yüzlerce frekans tek ekranda, canlı. Gerçek sayıma dayanan listeler, dünyanın radyoları, kitaplardan dizelerle Frekans Falı.",
    gorseller: [["/by/nowby-4.5.jpg", "Canlı radyo listesi"], ["/by/nowby-7.8.jpg", "Büyük çalar"], ["/by/nowby-13.5.jpg", "Atlas: ülke ülke radyolar"]],
  },
];

const SORULAR = [
  { b: "Gerçek bir soru.", s: "İnsanın kendine sorduğu bir soruya cevap veriyor mu?",
    h: "“Burada ne düşünmüştüm?”", n: "“Şu an radyoda ne çalıyor?”" },
  { b: "Seni dışarı çağırır.", s: "Telefonu bırakıp bir yere, bir âna, bir insana götürüyor mu?",
    h: "Bir iz yalnızca oraya yürüyünce açılır.", n: "Gözünü ekrandan alır, kulağını şehre verir." },
  { b: "Kimseyi sayıya çevirmez.", s: "Beğeni, takipçi, sonsuz akış olmadan yaşayabiliyor mu?",
    h: "Hiçbir iz sayılmaz, sıralanmaz.", n: "Şarkıları sayar, insanları değil." },
  { b: "İçinde bir söz taşır.", s: "İçinde bir yazarın sözü var mı?",
    h: "Her durakta kitaplardan bir satır.", n: "Frekans Falı'nda kitaplardan bir dize." },
];

export default function AtolyeSayfa() {
  return (
    <main>
      <style>{`
        .by-telefon{width:clamp(150px,24vw,250px);aspect-ratio:9/19.5;border-radius:clamp(26px,4vw,40px);overflow:hidden;
          border:clamp(5px,.8vw,8px) solid #141110;background:#000;box-shadow:0 40px 80px rgba(0,0,0,.45),0 0 0 1px rgba(255,255,255,.06)}
        .by-galeri{display:flex;gap:.9rem;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:.4rem}
        .by-galeri img{height:clamp(300px,52vw,440px);width:auto;border-radius:22px;scroll-snap-align:start;border:1px solid var(--glass-border)}
        .by-is{display:grid;gap:clamp(1.5rem,4vw,3rem);grid-template-columns:minmax(0,1fr)}
        @media (min-width:860px){.by-is{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);align-items:center}}
        .by-soru{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:760px){.by-soru{grid-template-columns:auto minmax(0,1fr) minmax(0,1fr)}}
        @media (prefers-reduced-motion: reduce){.by-telefon video{display:none}.by-telefon{background-size:cover}}
      `}</style>

      {/* AÇILIŞ: işaret + iki uygulamanın gerçek ekranı */}
      <section style={{ ...bolum, paddingTop: "clamp(4rem, 12vh, 7rem)", textAlign: "center" }}>
        <Isaret boy="clamp(5.5rem, 20vw, 10rem)" />
        <p style={{ ...mono, opacity: 0.6, marginTop: "1.4rem" }}>Berkay Doğan&apos;ın atölyesi</p>
        <p style={{ ...serif, fontSize: "clamp(1.3rem, 3vw, 1.9rem)", maxWidth: "640px", margin: "1.6rem auto 0", lineHeight: 1.45 }}>
          Beğenisiz, takipçisiz, sonsuz akışsız. Seni telefondan alıp bir yere, bir âna götüren uygulamalar.
        </p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(1rem, 4vw, 2.5rem)", marginTop: "clamp(2.5rem, 6vh, 4rem)" }}>
          <Telefon video="/by/hereby-ekran.mp4" poster="/hereby/vitrin-3.jpg" etiket="hereby. uygulamasının ekranı" egim={-4} />
          <Telefon video="/by/nowby-ekran.mp4" poster="/by/nowby-4.5.jpg" etiket="nowby. uygulamasının ekranı" egim={4} />
        </div>
      </section>

      {/* BY NE DEMEK */}
      <section style={{ ...bolum, maxWidth: "860px" }}>
        <p style={{ ...mono, opacity: 0.6 }}>by ne demek</p>
        <div style={{ ...serif, fontSize: "clamp(1.25rem, 2.6vw, 1.6rem)", lineHeight: 1.6, marginTop: "1rem", display: "grid", gap: "1rem" }}>
          <p><em>by</em>, bir şeyin yanında durmak demek: bir yerin, bir ânın.</p>
          <p><em>by</em>, bir şeyin aracılığıyla yaşamak demek: bir satırla, bir frekansla.</p>
          <p>Ve <em>by</em>, bir imza: <em>written by</em>. Bu atölyeden çıkan her iş, bir yazarın imzasını taşır.</p>
        </div>
      </section>

      {/* ATÖLYENİN İŞLERİ */}
      <section style={bolum}>
        <p style={{ ...mono, opacity: 0.6, marginBottom: "1.6rem" }}>Atölyenin işleri</p>
        <div style={{ display: "grid", gap: "clamp(3rem, 8vh, 5rem)" }}>
          {ISLER.map((i) => (
            <article key={i.ad} className="by-is">
              <div>
                <p style={{ ...mono, color: i.renk }}>{i.soru}</p>
                <h2 style={{ ...appYazi, fontSize: "clamp(3rem, 8vw, 4.6rem)", marginTop: "0.5rem" }}>
                  {i.ad}<span style={{ color: i.renk }}>.</span>
                </h2>
                <p style={{ marginTop: "1rem", lineHeight: 1.65, fontSize: "1.05rem", opacity: 0.82, maxWidth: "460px" }}>{i.m}</p>
                {i.dis
                  ? <a href={i.href} target="_blank" rel="noopener" style={{ ...mono, display: "inline-block", marginTop: "1.4rem", color: i.renk, textDecoration: "none" }}>{i.link}</a>
                  : <Link href={i.href} style={{ ...mono, display: "inline-block", marginTop: "1.4rem", color: i.renk, textDecoration: "none" }}>{i.link}</Link>}
              </div>
              <div className="by-galeri">
                {i.gorseller.map(([src, alt]) => <img key={src} src={src} alt={alt} loading="lazy" decoding="async" />)}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* DÖRT SORU */}
      <section style={bolum}>
        <p style={{ ...mono, opacity: 0.6 }}>Dört soru</p>
        <h2 style={{ ...serif, fontSize: "clamp(1.7rem, 4.4vw, 2.8rem)", lineHeight: 1.2, marginTop: "0.8rem", maxWidth: "760px", fontWeight: 400 }}>
          Bu atölyeden bir uygulama çıkacaksa, dört soruya da &quot;evet&quot; demek zorunda.
        </h2>
        <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
          {SORULAR.map((q, n) => (
            <div key={q.b} style={{ ...kart, padding: "clamp(1.2rem, 3vw, 1.8rem)" }}>
              <div className="by-soru">
                <span style={{ ...appYazi, fontSize: "clamp(3rem, 7vw, 4.2rem)", background: GECIS, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", lineHeight: 0.9 }}>{n + 1}</span>
                <div>
                  <p style={{ ...serif, fontSize: "clamp(1.4rem, 3vw, 1.9rem)", lineHeight: 1.2 }}>{q.b}</p>
                  <p style={{ marginTop: "0.5rem", opacity: 0.65, lineHeight: 1.5 }}>{q.s}</p>
                </div>
                <div style={{ display: "grid", gap: "0.6rem", alignContent: "center" }}>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.45 }}><span style={{ ...appYazi, color: MOR, marginRight: "0.4rem" }}>hereby.</span>{q.h}</p>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.45 }}><span style={{ ...appYazi, color: TURUNCU, marginRight: "0.4rem" }}>nowby.</span>{q.n}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ ...bolum, textAlign: "center", paddingBottom: "clamp(4rem, 12vh, 7rem)" }}>
        <Isaret boy="3.2rem" />
        <p style={{ ...serif, fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontStyle: "italic", marginTop: "1.4rem" }}>Önce sözler, sonra frekanslar.</p>
        <p style={{ ...mono, opacity: 0.6, marginTop: "1rem" }}>Reklam yok · Beğeni yok · Takipçi yok</p>
        <p style={{ marginTop: "2rem", opacity: 0.7 }}><Link href="/" style={{ color: "inherit" }}>berkaydogan.co</Link></p>
      </section>
    </main>
  );
}
