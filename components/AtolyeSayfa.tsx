import Link from "next/link";

/* by. — Berkay Doğan'ın uygulama atölyesi. hereby., nowby. ve writtenby. bu atölyenin işleri.
   İşaret: New York Bold "by" (maske görseli) + mordan (hereby) turuncuya (nowby) akan nokta.
   Her iş kendi bölümünde: nowby beş cihazlık sahneyle, hereby ve writtenby gerçek ekran videosu + adımlarla. */

const MOR = "#7c6cff";
const TURUNCU = "#FF6A3D";
const GECIS = `linear-gradient(135deg, ${MOR}, ${TURUNCU})`;
const appYazi: React.CSSProperties = { fontFamily: "ui-serif, 'New York', Georgia, serif", fontWeight: 700, lineHeight: 1 };
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif, Georgia), Georgia, serif" };
const bolum: React.CSSProperties = { maxWidth: "1180px", margin: "0 auto", padding: "clamp(3rem, 8vh, 5.5rem) clamp(1.25rem, 5vw, 3rem)" };
const kart: React.CSSProperties = { background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "24px", backdropFilter: "blur(12px)" };

// "by" glifi New York Bold'dan maske olarak (her cihazda aynı çizim, rengi temadan gelir); 634×600 oran.
export function Isaret({ boy }: { boy: string }) {
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

type Adim = { b: string; s: string };
type Cihaz = { tur: "tv" | "mac" | "ipad" | "iphone" | "saat"; c: string; b: string; s: string; alt: string };
type Is = {
  id: string; ad: string; renk: string; soru: string; href: string; link: string; m: string; ilke: string;
  video?: string; poster?: string; telefon?: string;
  adimlar?: Adim[];
  cihazBaslik?: string; cihazlar?: Cihaz[];
  ek?: { etiket: string; link: string; href: string };
};
type Soru = { b: string; s: string; h: string; n: string };
export type AtolyeMetin = {
  dil: "tr" | "en";
  alt: string; giris: string;
  byEtiket: string; by: [string, string, string]; islerEtiket: string; isler: Is[];
  soruEtiket: string; soruBaslik: string; sorular: Soru[];
  kapanis: string; ilkeler: string; studio: string; studioHref: string; anaSayfa: string;
};

const CIHAZ_GORSEL: Record<Cihaz["tur"], [string, number, number]> = {
  tv: ["/by/cihaz/tv.jpg", 1600, 900],
  mac: ["/by/cihaz/mac.jpg", 1400, 875],
  ipad: ["/by/cihaz/ipad.jpg", 825, 1100],
  iphone: ["/by/cihaz/iphone.jpg", 557, 1240],
  saat: ["/by/cihaz/saat.jpg", 416, 496],
};

function CihazKarti({ d }: { d: Cihaz }) {
  const [src, w, h] = CIHAZ_GORSEL[d.tur];
  return (
    <figure className={`cz-kart cz-${d.tur}`}>
      <div className="cz-sahne">
        <div className="cz-cerceve"><img src={src} alt={d.alt} width={w} height={h} loading="lazy" decoding="async" /></div>
      </div>
      <figcaption>
        <span style={{ ...mono, color: TURUNCU }}>{d.c}</span>
        <span style={{ ...serif, display: "block", fontSize: "clamp(1.3rem, 2.6vw, 1.6rem)", marginTop: "0.45rem" }}>{d.b}</span>
        <span style={{ display: "block", marginTop: "0.35rem", lineHeight: 1.5, opacity: 0.7, fontSize: "0.95rem" }}>{d.s}</span>
      </figcaption>
    </figure>
  );
}

function Baslik({ i }: { i: Is }) {
  return (
    <div>
      <p style={{ ...mono, color: i.renk }}>{i.soru}</p>
      <h2 style={{ ...appYazi, fontSize: "clamp(3.2rem, 9vw, 5.4rem)", marginTop: "0.5rem" }}>
        {i.ad}<span style={{ color: i.renk }}>.</span>
      </h2>
      <p style={{ ...serif, marginTop: "1.2rem", lineHeight: 1.6, fontSize: "clamp(1.1rem, 2.2vw, 1.3rem)", opacity: 0.88, maxWidth: "560px" }}>{i.m}</p>
      <p style={{ ...serif, fontStyle: "italic", marginTop: "1.2rem", fontSize: "clamp(1.2rem, 2.6vw, 1.5rem)", color: i.renk }}>“{i.ilke}”</p>
    </div>
  );
}

function Adimlar({ i }: { i: Is }) {
  return (
    <ol style={{ listStyle: "none", padding: 0, margin: "2rem 0 0", display: "grid", gap: "0.9rem" }}>
      {i.adimlar!.map((a, n) => (
        <li key={a.b} style={{ ...kart, padding: "1.2rem 1.4rem", display: "flex", gap: "1.1rem", alignItems: "baseline" }}>
          <span style={{ ...appYazi, fontSize: "2rem", color: i.renk, flexShrink: 0 }}>{n + 1}</span>
          <span>
            <span style={{ ...serif, fontSize: "1.3rem", fontWeight: 600 }}>{a.b}</span>
            <span style={{ display: "block", marginTop: "0.3rem", lineHeight: 1.55, opacity: 0.78 }}>{a.s}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function Linkler({ i }: { i: Is }) {
  return (
    <p style={{ marginTop: "1.8rem", display: "flex", gap: "1.6rem", flexWrap: "wrap" }}>
      <Link href={i.href} style={{ ...mono, color: i.renk, textDecoration: "none" }}>{i.link}</Link>
      {i.ek && <Link href={i.ek.href} style={{ ...mono, color: "inherit", opacity: 0.75, textDecoration: "none" }}>{i.ek.etiket} · {i.ek.link}</Link>}
    </p>
  );
}

export function AtolyeSayfa({ m }: { m: AtolyeMetin }) {
  return (
    <main lang={m.dil}>
      <style>{`
        .by-telefon{width:clamp(220px,30vw,300px);aspect-ratio:9/19.5;border-radius:clamp(30px,4.5vw,44px);overflow:hidden;
          border:clamp(6px,.9vw,9px) solid #141110;background:#000;box-shadow:0 40px 80px rgba(0,0,0,.45),0 0 0 1px rgba(255,255,255,.06);margin:0 auto}
        .by-bolum{display:grid;gap:clamp(2rem,5vw,4rem);grid-template-columns:minmax(0,1fr);align-items:center}
        @media (min-width:900px){.by-bolum{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)}.by-bolum.ters>:first-child{order:2}}
        .by-isler{display:flex;flex-wrap:wrap;justify-content:center;gap:.7rem;margin-top:2.2rem}
        .by-isler a{display:inline-flex;align-items:baseline;gap:.55rem;padding:.75rem 1.25rem;border-radius:100px;border:1px solid var(--glass-border);text-decoration:none;color:inherit;background:var(--glass-bg);transition:transform .25s ease,border-color .25s ease}
        .by-isler a:hover{transform:translateY(-2px);border-color:currentColor}
        .by-soru{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:760px){.by-soru{grid-template-columns:auto minmax(0,1fr) minmax(0,1fr)}}
        .by-ayrac{height:1px;max-width:1180px;margin:0 auto;background:linear-gradient(90deg,transparent,var(--glass-border),transparent)}

        /* nowby: beş cihazlık sahne */
        .cz-izgara{display:grid;gap:clamp(1rem,2.5vw,1.6rem);grid-template-columns:minmax(0,1fr);margin-top:2.4rem}
        @media (min-width:760px){.cz-izgara{grid-template-columns:repeat(6,minmax(0,1fr))}.cz-tv,.cz-mac{grid-column:span 3}.cz-ipad,.cz-iphone,.cz-saat{grid-column:span 2}}
        .cz-kart{margin:0;padding:clamp(1.2rem,3vw,1.8rem);border-radius:24px;border:1px solid var(--glass-border);
          background:radial-gradient(120% 90% at 50% 0%,rgba(255,106,61,.16),transparent 60%),var(--glass-bg);display:flex;flex-direction:column;gap:1.3rem}
        .cz-sahne{flex:1;display:flex;align-items:center;justify-content:center;min-height:clamp(200px,28vw,300px)}
        .cz-cerceve img{display:block;width:100%;height:auto}
        .cz-cerceve{background:#000;box-shadow:0 30px 60px rgba(0,0,0,.45),0 0 0 1px rgba(255,255,255,.06);overflow:hidden}
        .cz-tv .cz-cerceve{width:92%;border:7px solid #111;border-radius:10px;position:relative;overflow:visible}
        .cz-tv .cz-cerceve img{border-radius:3px}
        .cz-tv .cz-cerceve::after{content:"";position:absolute;left:50%;bottom:-22px;transform:translateX(-50%);width:26%;height:14px;border-radius:0 0 8px 8px;background:linear-gradient(#1c1a19,#0b0a0a)}
        .cz-mac .cz-cerceve{width:84%;border:8px solid #111;border-bottom-width:12px;border-radius:14px 14px 4px 4px;position:relative;overflow:visible}
        .cz-mac .cz-cerceve img{border-radius:4px}
        .cz-mac .cz-cerceve::after{content:"";position:absolute;left:-12%;right:-12%;bottom:-24px;height:12px;border-radius:2px 2px 12px 12px;background:linear-gradient(#d7d5d2,#8e8b87)}
        .cz-ipad .cz-cerceve{width:min(78%,250px);border:10px solid #111;border-radius:26px}
        .cz-ipad .cz-cerceve img{border-radius:14px}
        .cz-iphone .cz-cerceve{width:min(58%,170px);border:6px solid #111;border-radius:30px}
        .cz-iphone .cz-cerceve img{border-radius:24px}
        .cz-saat .cz-cerceve{width:min(56%,150px);border:9px solid #1b1a19;border-radius:38px;position:relative;overflow:visible}
        .cz-saat .cz-cerceve img{border-radius:28px}
        .cz-saat .cz-cerceve::before,.cz-saat .cz-cerceve::after{content:"";position:absolute;left:12%;right:12%;height:60%;background:linear-gradient(#7a4127,#4e2817);z-index:-1}
        .cz-saat .cz-cerceve::before{bottom:92%;border-radius:12px 12px 0 0}
        .cz-saat .cz-cerceve::after{top:92%;border-radius:0 0 12px 12px}
        .cz-saat .cz-sahne{overflow:hidden}
        @media (prefers-reduced-motion: reduce){.by-telefon video{display:none}}
      `}</style>

      {/* AÇILIŞ: işaret + üç iş */}
      <section style={{ ...bolum, paddingTop: "clamp(4.5rem, 13vh, 7.5rem)", textAlign: "center" }}>
        <Isaret boy="clamp(5.5rem, 20vw, 10rem)" />
        <p style={{ ...mono, opacity: 0.6, marginTop: "1.4rem" }}>{m.alt}</p>
        <p style={{ ...serif, fontSize: "clamp(1.3rem, 3vw, 1.9rem)", maxWidth: "660px", margin: "1.6rem auto 0", lineHeight: 1.45 }}>{m.giris}</p>
        <nav className="by-isler" aria-label={m.islerEtiket}>
          {m.isler.map((i) => (
            <a key={i.id} href={`#${i.id}`} style={{ color: i.renk }}>
              <span style={{ ...mono, fontSize: "0.66rem", opacity: 0.85 }}>{i.soru}</span>
              <span style={{ ...appYazi, fontSize: "1.25rem", color: "var(--ink, inherit)" }}>{i.ad}<span style={{ color: i.renk }}>.</span></span>
            </a>
          ))}
        </nav>
      </section>

      {/* BY NE DEMEK */}
      <section style={{ ...bolum, maxWidth: "860px" }}>
        <p style={{ ...mono, opacity: 0.6 }}>{m.byEtiket}</p>
        <div style={{ ...serif, fontSize: "clamp(1.25rem, 2.6vw, 1.6rem)", lineHeight: 1.6, marginTop: "1rem", display: "grid", gap: "1rem" }}>
          {m.by.map((c) => <p key={c} dangerouslySetInnerHTML={{ __html: c }} />)}
        </div>
      </section>

      {/* ATÖLYENİN İŞLERİ — her biri kendi bölümünde */}
      {m.isler.map((i, n) => (
        <div key={i.id}>
          <div className="by-ayrac" />
          <section id={i.id} style={{ ...bolum, scrollMarginTop: "4rem" }}>
            {i.cihazlar ? (
              <>
                <div style={{ maxWidth: "760px" }}>
                  <Baslik i={i} />
                  <Linkler i={i} />
                </div>
                <p style={{ ...serif, fontSize: "clamp(1.5rem, 3.6vw, 2.2rem)", marginTop: "clamp(2.5rem, 6vh, 3.5rem)" }}>{i.cihazBaslik}</p>
                <div className="cz-izgara">
                  {i.cihazlar.map((d) => <CihazKarti key={d.tur} d={d} />)}
                </div>
              </>
            ) : (
              <div className={`by-bolum${n % 2 ? "" : " ters"}`}>
                <div>
                  <Baslik i={i} />
                  {i.adimlar && <Adimlar i={i} />}
                  <Linkler i={i} />
                </div>
                {i.video && (
                  <div className="by-telefon" style={{ transform: `rotate(${n % 2 ? 3 : -3}deg)` }}>
                    <video src={i.video} poster={i.poster} autoPlay muted loop playsInline preload="metadata" aria-label={i.telefon}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      ))}

      <div className="by-ayrac" />

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
        <p style={{ marginTop: "1.6rem" }}><Link href={m.studioHref} style={{ ...mono, color: MOR, textDecoration: "none" }}>{m.studio}</Link></p>
      </section>
    </main>
  );
}
