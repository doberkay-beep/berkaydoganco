import Link from "next/link";

/* Gidiş zinciri — hereby.'de dokuz şehirlik yazar izi halkası (27 Ekim 2026).
   outby. ilkesi: dizeler sitede yazmaz, yalnız oraya gidene açılır. Haritada yalnız duraklar ve yol;
   kimin hangi şehirde okuduğu ya da okunma sayısı gösterilmez. */

const KIZIL = "#E5382C";
const KAGIT = "#F2ECE4";
const MUREKKEP = "#16141A";
const DENIZ = "#14223F";

const serif: React.CSSProperties = { fontFamily: "ui-serif, 'New York', var(--font-serif, Georgia), Georgia, serif" };
const etiket: React.CSSProperties = { fontFamily: "var(--font-grotesk), system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" };

type Durak = { x: number; y: number; sehir: [string, string]; yer: [string, string]; yan: "start" | "end" };

// Sıra halkanın sırasıdır; sonuncusu yeniden ilkine bağlanır. Yerleşim metro haritası gibi şematiktir:
// yönler doğru, uzaklıklar değil (Türkiye'deki duraklar gerçek ölçekte üst üste biniyordu).
const DURAKLAR: Durak[] = [
  { x: 585, y: 235, sehir: ["İstanbul", "Istanbul"], yer: ["Havalimanı", "Airport"], yan: "start" },
  { x: 335, y: 105, sehir: ["Berlin", "Berlin"], yer: ["East Side Gallery", "East Side Gallery"], yan: "start" },
  { x: 160, y: 120, sehir: ["Amsterdam", "Amsterdam"], yer: ["Centraal", "Centraal"], yan: "start" },
  { x: 115, y: 240, sehir: ["Paris", "Paris"], yer: ["Pont Neuf", "Pont Neuf"], yan: "start" },
  { x: 330, y: 345, sehir: ["Roma", "Rome"], yer: ["Forum Romanum", "Forum Romanum"], yan: "start" },
  { x: 470, y: 470, sehir: ["İzmir", "İzmir"], yer: ["Kordon", "Kordon"], yan: "end" },
  { x: 625, y: 470, sehir: ["Eskişehir", "Eskişehir"], yer: ["Porsuk Çayı", "Porsuk River"], yan: "start" },
  { x: 715, y: 385, sehir: ["Ankara", "Ankara"], yer: ["Opera Meydanı", "Opera Square"], yan: "end" },
  { x: 575, y: 345, sehir: ["Bursa", "Bursa"], yer: ["Nilüfer", "Nilüfer"], yan: "end" },
];

const G = 800, Y = 560;

export type GidisMetin = {
  dil: "tr" | "en";
  ust: string; baslik: string; giris: string[];
  kilit: string; durakEtiket: string; nasilEtiket: string; nasil: { b: string; a: string }[];
  dugme: string; herebyHref: string; ilkeler: string; atolye: string; atolyeHref: string;
};

export const GIDIS_TR: GidisMetin = {
  dil: "tr",
  ust: "hereby. · Yazarın izleri",
  baslik: "Gidiş zinciri",
  giris: [
    "Dokuz şehir, dokuz satır. Her iz yalnızca oraya gidene açılır ve okuyanı bir sonraki şehre yollar.",
    "Zinciri kimse tek başına bitirmez. Bir satırı Paris'te biri okur, devamını Roma'da bir başkası. Bursa'daki son iz seni yeniden yola, İstanbul'a çağırır.",
  ],
  kilit: "Yalnız orada açılır",
  durakEtiket: "Duraklar",
  nasilEtiket: "Nasıl",
  nasil: [
    { b: "Git", a: "Dokuz duraktan birine, sana en yakın olanına." },
    { b: "Oku", a: "İz yaklaşınca açılır. Satır Türkçedir; altında sıradaki şehrin ipucu yazar." },
    { b: "Devret", a: "Sıradaki şehre sen gidemiyorsan, oraya giden birine anlat." },
  ],
  dugme: "Yerinde oku → hereby.",
  herebyHref: "/hereby",
  ilkeler: "Reklam yok · Beğeni yok · Sıralama yok",
  atolye: "by. atölyesinin bir işi", atolyeHref: "/by",
};

export const GIDIS_EN: GidisMetin = {
  dil: "en",
  ust: "hereby. · The writer's traces",
  baslik: "The departure chain",
  giris: [
    "Nine cities, nine lines. Each trace opens only for someone who goes there, and sends the reader on to the next city.",
    "No one finishes the chain alone. Someone reads a line in Paris; someone else reads the next one in Rome. The last trace, in Bursa, calls you back to the road and to Istanbul.",
  ],
  kilit: "Opens only there",
  durakEtiket: "Stops",
  nasilEtiket: "How",
  nasil: [
    { b: "Go", a: "To any of the nine stops, whichever is closest to you." },
    { b: "Read", a: "The trace opens as you arrive. The line is in Turkish; beneath it is the hint to the next city." },
    { b: "Pass it on", a: "If you can't reach the next city, tell someone who will." },
  ],
  dugme: "Read it there → hereby.",
  herebyHref: "/en/hereby",
  ilkeler: "No ads · No likes · No rankings",
  atolye: "A work of the by. workshop", atolyeHref: "/en/by",
};

function Harita({ m }: { m: GidisMetin }) {
  const i = m.dil === "tr" ? 0 : 1;
  const p = DURAKLAR;
  const yol = [...p, p[0]].map((n, k) => `${k ? "L" : "M"}${n.x.toFixed(1)} ${n.y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${G} ${Y}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={DURAKLAR.map((d) => d.sehir[i]).join(" → ")} style={{ display: "block", width: "100%", height: "auto" }}>
      <rect width={G} height={Y} fill={DENIZ} />
      <g stroke="#22335C" strokeWidth="1">
        {Array.from({ length: 9 }, (_, k) => <line key={`b${k}`} x1={(k + 1) * 80} y1="0" x2={(k + 1) * 80} y2={Y} />)}
        {Array.from({ length: 6 }, (_, k) => <line key={`e${k}`} x1="0" y1={(k + 1) * 80} x2={G} y2={(k + 1) * 80} />)}
      </g>
      <path d={yol} fill="none" stroke={KAGIT} strokeOpacity="0.45" strokeWidth="2" strokeDasharray="6 8" strokeLinejoin="round" />
      {p.map((n, k) => {
        const d = DURAKLAR[k];
        return (
          <g key={d.sehir[1]}>
            <circle cx={n.x} cy={n.y} r={k === 0 ? 9 : 7} fill={KIZIL} stroke={KAGIT} strokeWidth="2.5" />
            <text x={n.x + (d.yan === "start" ? 16 : -16)} y={n.y + 6} textAnchor={d.yan} fill={KAGIT} fontSize="17" fontWeight="600" fontFamily="system-ui, sans-serif">
              <tspan fill={KIZIL}>{k + 1}</tspan> {d.sehir[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function GidisZinciriSayfa({ m }: { m: GidisMetin }) {
  const i = m.dil === "tr" ? 0 : 1;
  const kenar = "max(16px, env(safe-area-inset-left, 0px))";
  return (
    <main lang={m.dil} style={{ background: DENIZ, color: KAGIT }}>
      <style>{`
        .gz-duraklar{display:grid;gap:0.8rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:700px){.gz-duraklar{grid-template-columns:repeat(3,minmax(0,1fr))}}
      `}</style>

      {/* GİRİŞ */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: `clamp(5rem, 14vh, 7rem) ${kenar} 1.6rem` }}>
        <p style={{ ...etiket, color: KIZIL }}>{m.ust}</p>
        <h1 style={{ ...serif, fontSize: "clamp(2.8rem, 10vw, 5rem)", fontWeight: 700, lineHeight: 1, margin: "0.7rem 0 1.4rem", letterSpacing: "-0.01em" }}>
          {m.baslik}<span style={{ color: KIZIL }}>.</span>
        </h1>
        {m.giris.map((g) => (
          <p key={g.slice(0, 16)} style={{ ...serif, fontSize: "clamp(1.15rem, 2.6vw, 1.4rem)", lineHeight: 1.55, opacity: 0.88, marginTop: "0.8rem", textWrap: "pretty" }}>{g}</p>
        ))}
      </section>

      {/* HARİTA */}
      <section style={{ maxWidth: 980, margin: "0 auto", padding: `0 ${kenar}` }}>
        <div style={{ borderRadius: 24, overflow: "hidden", border: "1px solid rgba(242,236,228,.12)" }}>
          <Harita m={m} />
        </div>
      </section>

      {/* DURAKLAR: dizeler kilitli */}
      <section style={{ maxWidth: 980, margin: "0 auto", padding: `2.6rem ${kenar} 0` }}>
        <p style={{ ...etiket, color: KIZIL, marginBottom: "1rem" }}>{m.durakEtiket}</p>
        <ol className="gz-duraklar" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {DURAKLAR.map((d, k) => (
            <li key={d.sehir[1]} style={{ background: KAGIT, color: MUREKKEP, borderRadius: 20, padding: "1.1rem 1.2rem", display: "grid", gap: "0.35rem" }}>
              <span style={{ ...etiket, color: KIZIL }}>{k + 1} / {DURAKLAR.length}</span>
              <span style={{ ...serif, fontSize: "1.45rem", fontWeight: 700, lineHeight: 1.1 }}>{d.sehir[i]}</span>
              <span style={{ fontSize: "0.95rem", color: "rgba(22,20,26,.6)" }}>{d.yer[i]}</span>
              <span aria-hidden="true" style={{ ...serif, fontStyle: "italic", color: "rgba(22,20,26,.3)", filter: "blur(4px)", userSelect: "none", marginTop: "0.3rem" }}>········ ···· ·········· ·····</span>
              <span style={{ fontSize: "0.85rem", color: "rgba(22,20,26,.7)" }}>🔒 {m.kilit}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* NASIL */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: `2.8rem ${kenar} 0` }}>
        <p style={{ ...etiket, color: KIZIL, marginBottom: "1rem" }}>{m.nasilEtiket}</p>
        <div style={{ borderRadius: 22, overflow: "hidden", background: "rgba(36,52,90,.55)", border: "1px solid rgba(242,236,228,.1)" }}>
          {m.nasil.map((y, k) => (
            <div key={y.b} style={{ padding: "1.15rem 1.3rem", borderTop: k ? "1px solid rgba(242,236,228,.08)" : "none", display: "grid", gridTemplateColumns: "2rem minmax(0,1fr)", gap: "0.2rem 0.8rem" }}>
              <span style={{ gridRow: "span 2", color: KIZIL, fontWeight: 700, fontSize: "1.1rem" }}>{k + 1}</span>
              <span style={{ fontWeight: 600 }}>{y.b}</span>
              <span style={{ opacity: 0.7, fontSize: "0.95rem", lineHeight: 1.5 }}>{y.a}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link href={m.herebyHref} style={{ display: "inline-block", padding: "0.85rem 1.5rem", borderRadius: 999, background: KAGIT, color: MUREKKEP, fontWeight: 700, textDecoration: "none" }}>{m.dugme}</Link>
        </p>
      </section>

      <footer style={{ maxWidth: 760, margin: "0 auto", padding: `3.5rem ${kenar} 4rem`, textAlign: "center", opacity: 0.6, fontSize: "0.9rem" }}>
        <p>{m.ilkeler}</p>
        <p style={{ marginTop: "0.5rem" }}><Link href={m.atolyeHref} style={{ color: "inherit" }}>{m.atolye}</Link></p>
      </footer>
    </main>
  );
}
