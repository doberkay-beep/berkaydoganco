import Link from "next/link";

/* Üç katmanlı yürüyüş · Galata'dan Taksim'e (26 Kas 2026 taslağı).
   hereby.'de iki rota uç uca: "Galata'dan Tünel'e" (rota 9) + "İstiklal, yalnız" (rota 6).
   Her durakta üç katman: satır (hereby., yalnız orada açılır — burada YAZMAZ), o köşenin karesi
   (frameby., yalnız ücretsiz katmanlar), o karenin radyosu (nowby., canlı; frameby kataloğundaki atama).
   Koordinatlar hereby'deki canlı izlerle aynı. Beğeni, sayaç, sıralama yok. */

const KIZIL = "#E5382C";
const KAGIT = "#F2ECE4";
const GECE = "#0a0a0a";

const serif: React.CSSProperties = { fontFamily: "ui-serif, 'New York', var(--font-serif, Georgia), Georgia, serif" };
const etiket: React.CSSProperties = { fontFamily: "var(--font-grotesk), system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" };

type Kare = { id: string; yer: string; yerEn?: string; saat: string };
type Durak = {
  yer: string;
  yerEn?: string;
  satir: number; // bu durakta kaç satır açılır
  lat: number;
  lon: number;
  kareler: Kare[];
  radyo: { slug: string; ad: string };
};

const DURAKLAR: Durak[] = [
  {
    yer: "Galata Köprüsü", yerEn: "Galata Bridge", satir: 1, lat: 41.02, lon: 28.9733,
    kareler: [
      { id: "arsiv-galata-koprusu-renkli", yer: "Galata Köprüsü", yerEn: "Galata Bridge", saat: "1890'lar" },
      { id: "r50-0567", yer: "Eminönü, Galata Köprüsü", yerEn: "Eminönü, Galata Bridge", saat: "15:23" },
    ],
    radyo: { slug: "retro-turk", ad: "Retro Türk" },
  },
  { yer: "Galata Rıhtımı", yerEn: "Galata quay", satir: 1, lat: 41.02578, lon: 28.98287, kareler: [{ id: "iph-20230429-012", yer: "Karaköy", saat: "18:22" }], radyo: { slug: "joyturk-akustik", ad: "JoyTürk Akustik" } },
  { yer: "Tünel · Karaköy", yerEn: "Tünel · Karaköy", satir: 1, lat: 41.02286, lon: 28.97404, kareler: [{ id: "r50-0971", yer: "Karaköy, Galata Köprüsü", yerEn: "Karaköy, Galata Bridge", saat: "16:42" }], radyo: { slug: "kiyi-turkce", ad: "Kıyı Türkçe" } },
  { yer: "Yüksekkaldırım", satir: 1, lat: 41.02458, lon: 28.97492, kareler: [{ id: "r50-0135", yer: "Galata", saat: "20:27" }], radyo: { slug: "kiyi-caz", ad: "Kıyı Caz" } },
  { yer: "Tünel meydanı", yerEn: "Tünel square", satir: 2, lat: 41.0283, lon: 28.9741, kareler: [{ id: "iph-20260720-181", yer: "Beyoğlu", saat: "21:36" }], radyo: { slug: "radio-paradise-mellow", ad: "Radio Paradise Mellow" } },
  { yer: "Asmalımescit", satir: 1, lat: 41.03173, lon: 28.97608, kareler: [{ id: "r50-0256", yer: "İstiklal", saat: "13:25" }], radyo: { slug: "100-acid-jazz", ad: "100% Acid Jazz" } },
  { yer: "Çiçek Pasajı", yerEn: "Çiçek Pasajı", satir: 1, lat: 41.03426, lon: 28.97927, kareler: [{ id: "r50-0214", yer: "İstiklal", saat: "00:52" }], radyo: { slug: "kiyi-gece", ad: "Kıyı Gece" } },
  { yer: "Taksim", satir: 1, lat: 41.03657, lon: 28.9846, kareler: [{ id: "r50-0231", yer: "İstiklal", saat: "01:03" }], radyo: { slug: "100-acid-jazz", ad: "100% Acid Jazz" } },
];

const M = {
  tr: {
    ust: "hereby. · nowby. · frameby. · üç katmanlı yürüyüş",
    baslik: "Galata'dan Taksim'e",
    giris1: "Köprüden Taksim'e sekiz durak, yaklaşık bir saat. Her durakta üç şey seni bekliyor: o köşenin bir karesi, o karenin radyosu ve yalnızca oraya gidince açılan bir satır.",
    giris2: "Satırlar Orhan Veli'den, Sait Faik'ten ve Berkay Doğan'dan. Burada yazmıyorlar; okumak için yürümen gerek. Kareye bak, radyoyu aç, yürü.",
    duraklar: "Sekiz durak",
    durak: (k: number) => `${k} / 8`,
    satir: (n: number) => (n > 1 ? `${n} satır · yalnız orada açılır` : "Satır · yalnız orada açılır"),
    dinle: "Dinle",
    harita: "Haritada aç",
    dun: "dün",
    bugun: "bugün",
    nasil: "Nasıl yürünür",
    adimlar: [
      { b: "hereby.'yi indir", a: "iPhone'da, ücretsiz. Rotalar: \"Galata'dan Tünel'e\" ve \"İstiklal, yalnız\"." },
      { b: "Köprüden başla", a: "Her satır yaklaşık 300 metre kala açılır. Uzaktan okumak yok." },
      { b: "Radyoyu aç", a: "Her durağın radyosu nowby.'da canlı çalar. Kulaklıkla yürümek iyi gelir." },
      { b: "Kareye bak", a: "Kareler frameby.'dan: aynı köşe, başka bir saatte." },
    ],
    alt1: "Metinler: Orhan Veli ve Sait Faik (kamu malı), Berkay Doğan. Fotoğraflar: Berkay Doğan; 1890'ların köprüsü Photoglob (kamu malı).",
    alt2: "Reklam yok · Beğeni yok · Sıralama yok",
    by: "by. atölyesinin bir işi",
    hereby: "hereby. nedir?",
  },
  en: {
    ust: "hereby. · nowby. · frameby. · a walk in three layers",
    baslik: "Galata to Taksim",
    giris1: "Eight stops from the bridge to Taksim, about an hour. At each stop three things wait for you: a frame of that corner, the radio of that frame, and a line that opens only when you get there.",
    giris2: "The lines are by Orhan Veli, Sait Faik and Berkay Doğan, in Turkish. They are not written here; you have to walk to read them. Look at the frame, turn on the radio, walk.",
    duraklar: "Eight stops",
    durak: (k: number) => `${k} / 8`,
    satir: (n: number) => (n > 1 ? `${n} lines · open only there` : "A line · opens only there"),
    dinle: "Listen",
    harita: "Open in Maps",
    dun: "then",
    bugun: "now",
    nasil: "How to walk it",
    adimlar: [
      { b: "Get hereby.", a: "On iPhone, free. Routes: \"From Galata to Tünel\" and \"İstiklal, alone\"." },
      { b: "Start at the bridge", a: "Each line opens about 300 metres away. No reading from afar." },
      { b: "Turn on the radio", a: "Each stop's radio plays live on nowby. Headphones help." },
      { b: "Look at the frame", a: "The frames come from frameby.: the same corner, at another hour." },
    ],
    alt1: "Texts: Orhan Veli and Sait Faik (public domain), Berkay Doğan. Photographs: Berkay Doğan; the 1890s bridge by Photoglob (public domain).",
    alt2: "No ads · No likes · No rankings",
    by: "A by. workshop project",
    hereby: "What is hereby.?",
  },
};

function KareGorseli({ k, en, etiketi, oran = "3 / 2" }: { k: Kare; en: boolean; etiketi?: string; oran?: string }) {
  return (
    <figure style={{ margin: 0, position: "relative", aspectRatio: oran, overflow: "hidden", background: "#111" }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- statik dışa aktarım, kareler zaten 1620 px */}
      <img src={`/frameby/kareler/${encodeURIComponent(k.id)}.jpg`} alt={`${en ? k.yerEn ?? k.yer : k.yer}, ${k.saat}`} loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <figcaption style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "1.6rem 0.9rem 0.6rem", background: "linear-gradient(transparent, rgba(0,0,0,.7))", color: KAGIT, fontSize: "0.8rem", display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
        {etiketi ? (
          <span><b style={{ color: KIZIL, marginRight: 6 }}>{etiketi}</b>{k.saat}</span>
        ) : (
          <span>{en ? k.yerEn ?? k.yer : k.yer} · {k.saat}</span>
        )}
        <span style={{ opacity: 0.7 }}>frameby.</span>
      </figcaption>
    </figure>
  );
}

export function YuruyusSayfa({ lang = "tr" }: { lang?: "tr" | "en" }) {
  const en = lang === "en";
  const m = M[lang];
  const kenar = "max(16px, env(safe-area-inset-left, 0px))";
  const nowby = (slug: string) => `https://nowby.co/radyo/${slug}`;
  return (
    <main lang={lang} style={{ background: GECE, color: KAGIT }}>
      <style>{`
        .yr-duraklar{display:grid;gap:1rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:760px){.yr-duraklar{grid-template-columns:repeat(2,minmax(0,1fr))}}
        .yr-duraklar a{color:inherit}
        .yr-ikili{display:grid;grid-template-columns:1fr 1fr;gap:2px}
        .yr-dinle:hover{background:${KAGIT};color:${GECE}}
      `}</style>

      <section style={{ maxWidth: 760, margin: "0 auto", padding: `max(84px, 9vh) ${kenar} 1.6rem` }}>
        <p style={{ ...etiket, color: KIZIL }}>{m.ust}</p>
        <h1 style={{ ...serif, fontSize: "clamp(2.6rem, 9vw, 4.6rem)", fontWeight: 700, lineHeight: 1, margin: "0.7rem 0 1.4rem", letterSpacing: "-0.01em" }}>
          {m.baslik}<span style={{ color: KIZIL }}>.</span>
        </h1>
        <p style={{ ...serif, fontSize: "clamp(1.15rem, 2.6vw, 1.4rem)", lineHeight: 1.55, opacity: 0.88, textWrap: "pretty" }}>{m.giris1}</p>
        <p style={{ ...serif, fontSize: "clamp(1.15rem, 2.6vw, 1.4rem)", lineHeight: 1.55, opacity: 0.88, marginTop: "0.8rem", textWrap: "pretty" }}>{m.giris2}</p>
      </section>

      <section style={{ maxWidth: 1040, margin: "0 auto", padding: `1.4rem ${kenar} 0` }}>
        <p style={{ ...etiket, color: KIZIL, marginBottom: "1rem" }}>{m.duraklar}</p>
        <ol className="yr-duraklar" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {DURAKLAR.map((d, i) => (
            <li key={d.yer} style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(242,236,228,.12)", background: "#121212", display: "grid" }}>
              {d.kareler.length > 1 ? (
                <div className="yr-ikili">
                  <KareGorseli k={d.kareler[0]} en={en} etiketi={m.dun} oran="3 / 4" />
                  <KareGorseli k={d.kareler[1]} en={en} etiketi={m.bugun} oran="3 / 4" />
                </div>
              ) : (
                <KareGorseli k={d.kareler[0]} en={en} />
              )}
              <div style={{ padding: "1rem 1.2rem 1.15rem", display: "grid", gap: "0.55rem" }}>
                <span style={{ ...etiket, color: KIZIL }}>{m.durak(i + 1)}</span>
                <span style={{ ...serif, fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.1 }}>{en ? d.yerEn ?? d.yer : d.yer}</span>
                <span aria-hidden="true" style={{ ...serif, fontStyle: "italic", opacity: 0.3, filter: "blur(4px)", userSelect: "none" }}>········ ···· ·········· ·····</span>
                <span style={{ fontSize: "0.85rem", opacity: 0.75 }}>🔒 {m.satir(d.satir)}</span>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.6rem", flexWrap: "wrap", marginTop: "0.2rem" }}>
                  <a className="yr-dinle" href={nowby(d.radyo.slug)} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.9rem", borderRadius: 999, border: "1px solid rgba(242,236,228,.3)", textDecoration: "none", fontSize: "0.9rem" }}>
                    <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 99, background: KIZIL }} />
                    {m.dinle}: {d.radyo.ad} <span style={{ opacity: 0.55 }}>· nowby.</span>
                  </a>
                  <a href={`https://maps.apple.com/?ll=${d.lat},${d.lon}&q=${encodeURIComponent(d.yer)}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", opacity: 0.75 }}>{m.harita}</a>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section style={{ maxWidth: 760, margin: "0 auto", padding: `2.8rem ${kenar} 0` }}>
        <p style={{ ...etiket, color: KIZIL, marginBottom: "1rem" }}>{m.nasil}</p>
        <div style={{ borderRadius: 22, overflow: "hidden", border: "1px solid rgba(242,236,228,.1)" }}>
          {m.adimlar.map((y, k) => (
            <div key={y.b} style={{ padding: "1.15rem 1.3rem", borderTop: k ? "1px solid rgba(242,236,228,.08)" : "none", display: "grid", gridTemplateColumns: "2rem minmax(0,1fr)", gap: "0.2rem 0.8rem" }}>
              <span style={{ gridRow: "span 2", color: KIZIL, fontWeight: 700, fontSize: "1.1rem" }}>{k + 1}</span>
              <span style={{ fontWeight: 600 }}>{y.b}</span>
              <span style={{ opacity: 0.7, fontSize: "0.95rem", lineHeight: 1.5 }}>{y.a}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "2rem", textAlign: "center", display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://apps.apple.com/app/id6825787016" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "0.85rem 1.5rem", borderRadius: 999, background: KAGIT, color: GECE, fontWeight: 700, textDecoration: "none" }}>hereby. · App Store</a>
          <Link href={en ? "/en/hereby/" : "/hereby/"} style={{ display: "inline-block", padding: "0.85rem 1.5rem", borderRadius: 999, border: "1px solid rgba(242,236,228,.3)", color: KAGIT, fontWeight: 600, textDecoration: "none" }}>{m.hereby}</Link>
        </p>
      </section>

      <footer style={{ maxWidth: 760, margin: "0 auto", padding: `3.5rem ${kenar} 4rem`, textAlign: "center", opacity: 0.6, fontSize: "0.9rem", lineHeight: 1.6 }}>
        <p>{m.alt1}</p>
        <p style={{ marginTop: "0.4rem" }}>{m.alt2}</p>
        <p style={{ marginTop: "0.5rem" }}><Link href={en ? "/en/by/" : "/by/"} style={{ color: "inherit" }}>{m.by}</Link></p>
      </footer>
    </main>
  );
}
