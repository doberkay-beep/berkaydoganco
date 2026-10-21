import Link from "next/link";

/* by. — Berkay Doğan'ın uygulama atölyesi. hereby. ve nowby. bu atölyenin işleri.
   İşaret: New York Bold "by" (maske görseli) + mordan (hereby) turuncuya (nowby) akan nokta. */

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

type Is = { ad: string; renk: string; soru: string; href: string; dis: boolean; link: string; m: string; gorseller: [string, string][] };
type Soru = { b: string; s: string; h: string; n: string };
export type AtolyeMetin = {
  dil: "tr" | "en";
  alt: string; giris: string; telHereby: string; telNowby: string;
  byEtiket: string; by: [string, string, string]; islerEtiket: string; isler: Is[];
  soruEtiket: string; soruBaslik: string; sorular: Soru[];
  kapanis: string; ilkeler: string; anaSayfa: string;
};

export function AtolyeSayfa({ m }: { m: AtolyeMetin }) {
  return (
    <main lang={m.dil}>
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
        <p style={{ ...mono, opacity: 0.6, marginTop: "1.4rem" }}>{m.alt}</p>
        <p style={{ ...serif, fontSize: "clamp(1.3rem, 3vw, 1.9rem)", maxWidth: "640px", margin: "1.6rem auto 0", lineHeight: 1.45 }}>
          {m.giris}
        </p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(1rem, 4vw, 2.5rem)", marginTop: "clamp(2.5rem, 6vh, 4rem)" }}>
          <Telefon video="/by/hereby-ekran.mp4" poster="/hereby/vitrin-3.jpg" etiket={m.telHereby} egim={-4} />
          <Telefon video="/by/nowby-ekran.mp4" poster="/by/nowby-4.5.jpg" etiket={m.telNowby} egim={4} />
        </div>
      </section>

      {/* BY NE DEMEK */}
      <section style={{ ...bolum, maxWidth: "860px" }}>
        <p style={{ ...mono, opacity: 0.6 }}>{m.byEtiket}</p>
        <div style={{ ...serif, fontSize: "clamp(1.25rem, 2.6vw, 1.6rem)", lineHeight: 1.6, marginTop: "1rem", display: "grid", gap: "1rem" }}>
          {m.by.map((c) => <p key={c} dangerouslySetInnerHTML={{ __html: c }} />)}
        </div>
      </section>

      {/* ATÖLYENİN İŞLERİ */}
      <section style={bolum}>
        <p style={{ ...mono, opacity: 0.6, marginBottom: "1.6rem" }}>{m.islerEtiket}</p>
        <div style={{ display: "grid", gap: "clamp(3rem, 8vh, 5rem)" }}>
          {m.isler.map((i) => (
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
        <p style={{ ...mono, opacity: 0.6 }}>{m.soruEtiket}</p>
        <h2 style={{ ...serif, fontSize: "clamp(1.7rem, 4.4vw, 2.8rem)", lineHeight: 1.2, marginTop: "0.8rem", maxWidth: "760px", fontWeight: 400 }}>
          {m.soruBaslik}
        </h2>
        <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
          {m.sorular.map((q, n) => (
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
        <p style={{ ...serif, fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontStyle: "italic", marginTop: "1.4rem" }}>{m.kapanis}</p>
        <p style={{ ...mono, opacity: 0.6, marginTop: "1rem" }}>{m.ilkeler}</p>
        <p style={{ marginTop: "2rem", opacity: 0.7 }}><Link href={m.anaSayfa} style={{ color: "inherit" }}>berkaydogan.co</Link></p>
      </section>
    </main>
  );
}
