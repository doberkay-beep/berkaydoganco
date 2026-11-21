import Link from "next/link";

/* hereby. · Writers' traces — İngilizce örnek sayfa (20 Kasım 2026).
   Müzelere ve edebiyat kurumlarına giden mektuplar bu sayfayı gösterir: İstanbul'da canlı olan
   iki yazar izi dizisi (Orhan Veli, Sait Faik) ve ortaklık ilkeleri. Sait Faik sayfasındaki ilke
   burada da geçerli: cümleler sayfada yazmaz, yalnız oraya gidene açılır. Koordinatlar hereby'deki
   canlı izlerle aynı. Mektup gönderilen şehirler/kurumlar burada anılmaz (cevap gelmeden ilan yok). */

const KIZIL = "#E5382C";
const KAGIT = "#F2ECE4";
const MUREKKEP = "#16141A";
const GECE = "#0a0a0a";

const serif: React.CSSProperties = { fontFamily: "ui-serif, 'New York', var(--font-serif, Georgia), Georgia, serif" };
const etiket: React.CSSProperties = { fontFamily: "var(--font-grotesk), system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" };

type Iz = { yer: string; not: string; lat: number; lon: number };
type Dizi = { yazar: string; yillar: string; eser: string; aciklama: string; izler: Iz[]; ek?: Iz };

const DIZILER: Dizi[] = [
  {
    yazar: "Orhan Veli",
    yillar: "1914–1950",
    eser: "“İstanbul’u Dinliyorum” (I Am Listening to Istanbul)",
    aciklama: "In November 2026, for the 76th anniversary of his death, each of the poem’s six stanzas was left at a place the poem names, from Gülhane Park to Aşiyan, where he is buried.",
    izler: [
      { yer: "Gülhane Park", not: "Stanza 1 · the wind in the leaves", lat: 41.01303, lon: 28.9809 },
      { yer: "Rumelihisarı pier", not: "Stanza 2 · the birds, the fishing nets", lat: 41.08812, lon: 29.05692 },
      { yer: "Mahmutpaşa", not: "Stanza 3 · the Grand Bazaar, the docks", lat: 41.0112, lon: 28.97138 },
      { yer: "Anadoluhisarı waterside houses", not: "Stanza 4 · the boathouses, the south wind", lat: 41.08209, lon: 29.06705 },
      { yer: "Tünel · Asmalımescit", not: "Stanza 5 · the pavement, a rose", lat: 41.02834, lon: 28.97399 },
      { yer: "Aşiyan Cemetery", not: "Stanza 6 · the last stanza", lat: 41.08279, lon: 29.05545 },
    ],
  },
  {
    yazar: "Sait Faik Abasıyanık",
    yillar: "1906–1954",
    eser: "six stories, for his 120th birthday",
    aciklama: "For his 120th birthday (18 November 2026), six sentences from his stories were left where the stories happen. A seventh waits at the door of the Sait Faik Museum on Burgazada, the island where he lived.",
    izler: [
      { yer: "Galata quay", not: "“Bir Vapur” (A Steamer), 1936", lat: 41.0257757, lon: 28.9828657 },
      { yer: "Süleymaniye", not: "“Bir Karpuz Sergisi” (A Watermelon Stall), 1939", lat: 41.0162287, lon: 28.9639548 },
      { yer: "Tünel, Karaköy station", not: "“Tüneldeki Çocuk” (The Boy in the Tunnel), 1955", lat: 41.0228645, lon: 28.9740393 },
      { yer: "Burgazada, Kalpazankaya road", not: "“Hişt Hişt!..”, 1954", lat: 40.8781786, lon: 29.0529225 },
      { yer: "Alemdağı", not: "“Alemdağ’da Var Bir Yılan” (A Snake in Alemdağ), 1954", lat: 41.0447121, lon: 29.2200629 },
      { yer: "Kumkapı shore", not: "“Bir Karpuz Sergisi”, 1939", lat: 41.0033651, lon: 28.9629002 },
    ],
    ek: { yer: "Sait Faik Museum, Burgazada", not: "“Haritada Bir Nokta” (A Dot on the Map), 1952", lat: 40.8815, lon: 29.066 },
  },
];

const ILKELER = [
  { b: "Only published words", a: "Every line is copied letter for letter from a published edition and checked against a second source. No paraphrases, no “attributed” quotes." },
  { b: "Only the public domain", a: "We place the words of writers whose work is free for everyone: in most countries, those who died at least seventy years ago. Anything else only with the heirs’ permission." },
  { b: "In the original language", a: "Joyce would stay in English, Pessoa in Portuguese, Kenji in Japanese. A published translation belongs to its translator, so we never borrow one." },
  { b: "Where the words belong", a: "A line goes to the street, bridge, shore or house it speaks of, or to the house where it was written. Never just anywhere." },
  { b: "The museum decides", a: "When we work with a writer’s house or a literary museum, they approve every text and every place, and each trace carries their name." },
  { b: "Nothing to sell", a: "Free to read, no ads, no likes, no rankings. Any trace is removed the day a partner asks." },
];

function haritaLink(i: Iz) {
  return `https://maps.apple.com/?ll=${i.lat},${i.lon}&q=${encodeURIComponent(i.yer)}`;
}

function IzKarti({ i, sira, ek }: { i: Iz; sira: string; ek?: boolean }) {
  return (
    <li style={{ background: ek ? "transparent" : KAGIT, color: ek ? KAGIT : MUREKKEP, border: ek ? `1px solid ${KIZIL}` : "none", borderRadius: 20, padding: "1.05rem 1.15rem", display: "grid", gap: "0.3rem" }}>
      <span style={{ ...etiket, color: KIZIL }}>{sira}</span>
      <span style={{ ...serif, fontSize: "1.3rem", fontWeight: 700, lineHeight: 1.15 }}>{i.yer}</span>
      <span style={{ ...serif, fontStyle: "italic", fontSize: "0.95rem", opacity: 0.75 }}>{i.not}</span>
      <span aria-hidden="true" style={{ ...serif, fontStyle: "italic", opacity: 0.3, filter: "blur(4px)", userSelect: "none", marginTop: "0.25rem" }}>········ ···· ·········· ·····</span>
      <span style={{ fontSize: "0.85rem", opacity: 0.75, display: "flex", justifyContent: "space-between", gap: "0.6rem", flexWrap: "wrap" }}>
        <span>🔒 Opens only there</span>
        <a href={haritaLink(i)} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>Open in Maps</a>
      </span>
    </li>
  );
}

export function WritersTracesEn() {
  const kenar = "max(16px, env(safe-area-inset-left, 0px))";
  const govde: React.CSSProperties = { ...serif, fontSize: "clamp(1.12rem, 2.5vw, 1.35rem)", lineHeight: 1.55, opacity: 0.88, textWrap: "pretty" };
  return (
    <main lang="en" style={{ background: GECE, color: KAGIT }}>
      <style>{`
        .wt-izler{display:grid;gap:0.8rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:700px){.wt-izler{grid-template-columns:repeat(3,minmax(0,1fr))}}
      `}</style>

      <section style={{ maxWidth: 760, margin: "0 auto", padding: `max(84px, 9vh) ${kenar} 1.4rem` }}>
        <p style={{ ...etiket, color: KIZIL }}>hereby. · Writers’ traces</p>
        <h1 style={{ ...serif, fontSize: "clamp(2.5rem, 8.5vw, 4.4rem)", fontWeight: 700, lineHeight: 1.02, margin: "0.7rem 0 1.4rem", letterSpacing: "-0.01em" }}>
          Words, back where they were written<span style={{ color: KIZIL }}>.</span>
        </h1>
        <p style={govde}>
          hereby is a small iOS app by the Istanbul poet Berkay Doğan. A line of text is left at a place, and only someone who walks there can read it. Literature you read with your feet rather than your thumb.
        </p>
        <p style={{ ...govde, marginTop: "0.8rem" }}>
          Writers’ traces bring the words of writers who are no longer with us back to the streets, shores and houses they wrote about. In Istanbul, two writers already wait in thirteen places. The lines are not on this page: you have to go there.
        </p>
      </section>

      {DIZILER.map((d) => (
        <section key={d.yazar} style={{ maxWidth: 980, margin: "0 auto", padding: `2.4rem ${kenar} 0` }}>
          <p style={{ ...etiket, color: KIZIL, marginBottom: "0.5rem" }}>Istanbul · live</p>
          <h2 style={{ ...serif, fontSize: "clamp(1.7rem, 5vw, 2.4rem)", fontWeight: 700, lineHeight: 1.1, margin: 0 }}>
            {d.yazar} <span style={{ opacity: 0.5, fontWeight: 400, fontSize: "0.6em" }}>{d.yillar}</span>
          </h2>
          <p style={{ ...serif, fontStyle: "italic", opacity: 0.8, margin: "0.4rem 0 0.6rem" }}>{d.eser}</p>
          <p style={{ maxWidth: 680, opacity: 0.75, lineHeight: 1.55, marginBottom: "1.1rem" }}>{d.aciklama}</p>
          <ol className="wt-izler" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {d.izler.map((i, k) => <IzKarti key={i.yer} i={i} sira={`${k + 1} / ${d.izler.length}`} />)}
            {d.ek ? <IzKarti i={d.ek} sira="And at the museum door" ek /> : null}
          </ol>
        </section>
      ))}

      <section style={{ maxWidth: 760, margin: "0 auto", padding: `3rem ${kenar} 0` }}>
        <p style={{ ...etiket, color: KIZIL, marginBottom: "1rem" }}>How a trace is made</p>
        <div style={{ borderRadius: 22, overflow: "hidden", border: "1px solid rgba(242,236,228,.1)" }}>
          {ILKELER.map((y, k) => (
            <div key={y.b} style={{ padding: "1.1rem 1.3rem", borderTop: k ? "1px solid rgba(242,236,228,.08)" : "none", display: "grid", gridTemplateColumns: "2rem minmax(0,1fr)", gap: "0.2rem 0.8rem" }}>
              <span style={{ gridRow: "span 2", color: KIZIL, fontWeight: 700, fontSize: "1.1rem" }}>{k + 1}</span>
              <span style={{ fontWeight: 600 }}>{y.b}</span>
              <span style={{ opacity: 0.7, fontSize: "0.95rem", lineHeight: 1.5 }}>{y.a}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 760, margin: "0 auto", padding: `3rem ${kenar} 0` }}>
        <p style={{ ...etiket, color: KIZIL, marginBottom: "0.8rem" }}>For writers’ houses and literary museums</p>
        <p style={govde}>
          We would like every city’s writers to wait in their own streets, and we would like to do it with the people who keep their memory. If you look after a writer’s house, an archive or a literary museum, write to us. You choose the words and the places; we do the rest, free of charge.
        </p>
        <p style={{ marginTop: "1.6rem", display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
          <a href="mailto:hello@berkaydogan.co?subject=Writers%E2%80%99%20traces" style={{ display: "inline-block", padding: "0.85rem 1.5rem", borderRadius: 999, background: KAGIT, color: MUREKKEP, fontWeight: 700, textDecoration: "none" }}>hello@berkaydogan.co</a>
          <a href="https://apps.apple.com/app/id6825787016" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "0.85rem 1.5rem", borderRadius: 999, border: "1px solid rgba(242,236,228,.3)", color: KAGIT, fontWeight: 600, textDecoration: "none" }}>hereby. on the App Store</a>
          <Link href="/en/hereby" style={{ display: "inline-block", padding: "0.85rem 1.5rem", borderRadius: 999, border: "1px solid rgba(242,236,228,.3)", color: KAGIT, fontWeight: 600, textDecoration: "none" }}>What is hereby?</Link>
        </p>
      </section>

      <footer style={{ maxWidth: 760, margin: "0 auto", padding: `3.5rem ${kenar} 4rem`, textAlign: "center", opacity: 0.6, fontSize: "0.9rem", lineHeight: 1.6 }}>
        <p>Texts: Orhan Veli, Sait Faik Abasıyanık (public domain). Selection and placement: Berkay Doğan.</p>
        <p style={{ marginTop: "0.4rem" }}>No ads · No likes · No rankings</p>
        <p style={{ marginTop: "0.5rem" }}><Link href="/sait-faik-120" style={{ color: "inherit" }}>Sait Faik route (Turkish)</Link> · <Link href="/en/by" style={{ color: "inherit" }}>A by. studio project</Link></p>
      </footer>
    </main>
  );
}
