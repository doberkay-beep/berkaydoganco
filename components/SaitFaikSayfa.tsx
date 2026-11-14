import Link from "next/link";

/* Sait Faik 120 — hereby.'de altı edebiyat izi + Burgaz'daki müze izi (15–18 Kasım 2026).
   Gidiş zinciri sayfasıyla aynı ilke: cümleler sitede yazmaz, yalnız oraya gidene açılır.
   Kim hangi durağı okudu, kaç kişi okudu gösterilmez; yalnız altısını açıp paylaşanlar
   (izin verirlerse) 18 Kasım'da adlarıyla anılır, alfabe sırasıyla, sıralama yok. */

const KIZIL = "#E5382C";
const KAGIT = "#F2ECE4";
const MUREKKEP = "#16141A";
const DENIZ = "#0a0a0a";

const serif: React.CSSProperties = { fontFamily: "ui-serif, 'New York', var(--font-serif, Georgia), Georgia, serif" };
const etiket: React.CSSProperties = { fontFamily: "var(--font-grotesk), system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" };

type Durak = { x: number; y: number; yer: string; semt: string; oyku: string; lat: number; lon: number; yan: "start" | "end"; bonus?: boolean };

// Koordinatlar hereby'deki canlı izlerle aynı. Harita şematiktir: yönler doğru, uzaklıklar değil.
const DURAKLAR: Durak[] = [
  { x: 405, y: 185, yer: "Galata Rıhtımı", semt: "Karaköy", oyku: "Bir Vapur · Semaver, 1936", lat: 41.0257757, lon: 28.9828657, yan: "start" },
  { x: 215, y: 215, yer: "Süleymaniye", semt: "Cami avlusu, Fatih", oyku: "Bir Karpuz Sergisi · Sarnıç, 1939", lat: 41.0162287, lon: 28.9639548, yan: "end" },
  { x: 330, y: 120, yer: "Tünel", semt: "Karaköy istasyonu", oyku: "Tüneldeki Çocuk · 1955", lat: 41.0228645, lon: 28.9740393, yan: "start" },
  { x: 455, y: 465, yer: "Burgazada", semt: "Kalpazankaya yolu", oyku: "Hişt Hişt!.. · Alemdağ'da Var Bir Yılan, 1954", lat: 40.8781786, lon: 29.0529225, yan: "end" },
  { x: 705, y: 120, yer: "Alemdağı", semt: "Taşdelen, Çekmeköy", oyku: "Alemdağ'da Var Bir Yılan · 1954", lat: 41.0447121, lon: 29.2200629, yan: "end" },
  { x: 175, y: 310, yer: "Kumkapı", semt: "Sahil", oyku: "Bir Karpuz Sergisi · Sarnıç, 1939", lat: 41.0033651, lon: 28.9629002, yan: "end" },
  { x: 560, y: 420, yer: "Sait Faik Müzesi", semt: "Burgazada", oyku: "Haritada Bir Nokta · Son Kuşlar, 1952", lat: 40.8815, lon: 29.066, yan: "start", bonus: true },
];
const G = 800, Y = 560;

// Altı durağı açıp paylaşan ve adının anılmasına izin verenler (alfabe sırasıyla). 18 Kasım'da güncellenir.
const ACANLAR: string[] = [];

const NASIL = [
  { b: "hereby.'yi indir", a: "iPhone'da, ücretsiz." },
  { b: "Durağa git", a: "Her cümle haritada kilitli durur, yaklaşık 300 metre kala açılır. Uzaktan okumak yok." },
  { b: "Aç ve paylaş", a: "Cümleyi açtığın ekranı ve bulunduğun yeri paylaş: #SaitFaik120, @made.by.berkay." },
  { b: "Altısını tamamla", a: "Altı durağın hepsini açıp paylaşanların adı, izin verirlerse, 18 Kasım'da bu sayfada anılır." },
];

function Harita() {
  return (
    <svg viewBox={`0 0 ${G} ${Y}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={DURAKLAR.map((d) => d.yer).join(", ")} style={{ display: "block", width: "100%", height: "auto" }}>
      <rect width={G} height={Y} fill={DENIZ} />
      <g stroke="#242424" strokeWidth="1">
        {Array.from({ length: 9 }, (_, k) => <line key={`b${k}`} x1={(k + 1) * 80} y1="0" x2={(k + 1) * 80} y2={Y} />)}
        {Array.from({ length: 6 }, (_, k) => <line key={`e${k}`} x1="0" y1={(k + 1) * 80} x2={G} y2={(k + 1) * 80} />)}
      </g>
      {/* Boğaz ve Haliç, şematik */}
      <path d="M560 0 C520 90 470 150 445 230 C430 280 400 320 380 360" fill="none" stroke={KAGIT} strokeOpacity="0.16" strokeWidth="22" strokeLinecap="round" />
      <path d="M448 228 C390 200 320 175 230 150" fill="none" stroke={KAGIT} strokeOpacity="0.12" strokeWidth="12" strokeLinecap="round" />
      <text x="600" y="40" fill={KAGIT} fillOpacity="0.35" fontSize="13" fontFamily="system-ui, sans-serif" letterSpacing="2">BOĞAZ</text>
      <text x="300" y="400" fill={KAGIT} fillOpacity="0.35" fontSize="13" fontFamily="system-ui, sans-serif" letterSpacing="2">MARMARA</text>
      {DURAKLAR.map((d, k) => (
        <g key={d.yer}>
          <circle cx={d.x} cy={d.y} r={d.bonus ? 6 : 8} fill={d.bonus ? DENIZ : KIZIL} stroke={d.bonus ? KIZIL : KAGIT} strokeWidth="2.5" />
          <text x={d.x + (d.yan === "start" ? 15 : -15)} y={d.y + 6} textAnchor={d.yan} fill={KAGIT} fontSize="17" fontWeight="600" fontFamily="system-ui, sans-serif">
            {d.bonus ? <tspan fill={KIZIL}>+</tspan> : <tspan fill={KIZIL}>{k + 1}</tspan>} {d.yer}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function SaitFaikSayfa() {
  const kenar = "max(16px, env(safe-area-inset-left, 0px))";
  return (
    <main lang="tr" style={{ background: DENIZ, color: KAGIT }}>
      <style>{`
        .sf-duraklar{display:grid;gap:0.8rem;grid-template-columns:minmax(0,1fr)}
        @media (min-width:700px){.sf-duraklar{grid-template-columns:repeat(3,minmax(0,1fr))}}
        .sf-duraklar a{color:inherit}
      `}</style>

      <section style={{ maxWidth: 760, margin: "0 auto", padding: `max(84px, 9vh) ${kenar} 1.6rem` }}>
        <p style={{ ...etiket, color: KIZIL }}>hereby. · Sait Faik 120 · 15–18 Kasım 2026</p>
        <h1 style={{ ...serif, fontSize: "clamp(2.6rem, 9vw, 4.6rem)", fontWeight: 700, lineHeight: 1, margin: "0.7rem 0 1.4rem", letterSpacing: "-0.01em" }}>
          Sait Faik&apos;in İstanbul&apos;u<span style={{ color: KIZIL }}>.</span>
        </h1>
        <p style={{ ...serif, fontSize: "clamp(1.15rem, 2.6vw, 1.4rem)", lineHeight: 1.55, opacity: 0.88, textWrap: "pretty" }}>
          Sait Faik Abasıyanık 18 Kasım 1906&apos;da doğdu. 120. yaş gününe kadar öykülerinden altı cümle İstanbul&apos;da altı yerde seni bekliyor.
        </p>
        <p style={{ ...serif, fontSize: "clamp(1.15rem, 2.6vw, 1.4rem)", lineHeight: 1.55, opacity: 0.88, marginTop: "0.8rem", textWrap: "pretty" }}>
          Galata&apos;dan Alemdağı&apos;na, Süleymaniye&apos;den Burgaz&apos;a. Cümleler burada yazmıyor; okumak için oraya yürümen gerek.
        </p>
      </section>

      <section style={{ maxWidth: 980, margin: "0 auto", padding: `0 ${kenar}` }}>
        <div style={{ borderRadius: 24, overflow: "hidden", border: "1px solid rgba(242,236,228,.12)" }}>
          <Harita />
        </div>
      </section>

      <section style={{ maxWidth: 980, margin: "0 auto", padding: `2.6rem ${kenar} 0` }}>
        <p style={{ ...etiket, color: KIZIL, marginBottom: "1rem" }}>Altı durak ve bir de müzenin kapısı</p>
        <ol className="sf-duraklar" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {DURAKLAR.map((d, k) => (
            <li key={d.yer} style={{ background: d.bonus ? "transparent" : KAGIT, color: d.bonus ? KAGIT : MUREKKEP, border: d.bonus ? `1px solid ${KIZIL}` : "none", borderRadius: 20, padding: "1.1rem 1.2rem", display: "grid", gap: "0.35rem" }}>
              <span style={{ ...etiket, color: KIZIL }}>{d.bonus ? "Yedinci iz" : `${k + 1} / 6`}</span>
              <span style={{ ...serif, fontSize: "1.45rem", fontWeight: 700, lineHeight: 1.1 }}>{d.yer}</span>
              <span style={{ fontSize: "0.95rem", opacity: 0.6 }}>{d.semt}</span>
              <span style={{ ...serif, fontStyle: "italic", fontSize: "0.98rem", opacity: 0.8 }}>{d.oyku}</span>
              <span aria-hidden="true" style={{ ...serif, fontStyle: "italic", opacity: 0.3, filter: "blur(4px)", userSelect: "none", marginTop: "0.3rem" }}>········ ···· ·········· ·····</span>
              <span style={{ fontSize: "0.85rem", opacity: 0.75, display: "flex", justifyContent: "space-between", gap: "0.6rem", flexWrap: "wrap" }}>
                <span>🔒 Yalnız orada açılır</span>
                <a href={`https://maps.apple.com/?ll=${d.lat},${d.lon}&q=${encodeURIComponent(d.yer)}`} target="_blank" rel="noopener noreferrer">Haritada aç →</a>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section style={{ maxWidth: 760, margin: "0 auto", padding: `2.8rem ${kenar} 0` }}>
        <p style={{ ...etiket, color: KIZIL, marginBottom: "1rem" }}>Nasıl katılırsın</p>
        <div style={{ borderRadius: 22, overflow: "hidden", border: "1px solid rgba(242,236,228,.1)" }}>
          {NASIL.map((y, k) => (
            <div key={y.b} style={{ padding: "1.15rem 1.3rem", borderTop: k ? "1px solid rgba(242,236,228,.08)" : "none", display: "grid", gridTemplateColumns: "2rem minmax(0,1fr)", gap: "0.2rem 0.8rem" }}>
              <span style={{ gridRow: "span 2", color: KIZIL, fontWeight: 700, fontSize: "1.1rem" }}>{k + 1}</span>
              <span style={{ fontWeight: 600 }}>{y.b}</span>
              <span style={{ opacity: 0.7, fontSize: "0.95rem", lineHeight: 1.5 }}>{y.a}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "2rem", textAlign: "center", display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://apps.apple.com/app/id6825787016" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "0.85rem 1.5rem", borderRadius: 999, background: KAGIT, color: MUREKKEP, fontWeight: 700, textDecoration: "none" }}>hereby. · App Store</a>
          <Link href="/hereby" style={{ display: "inline-block", padding: "0.85rem 1.5rem", borderRadius: 999, border: "1px solid rgba(242,236,228,.3)", color: KAGIT, fontWeight: 600, textDecoration: "none" }}>hereby. nedir?</Link>
        </p>
      </section>

      <section style={{ maxWidth: 760, margin: "0 auto", padding: `2.8rem ${kenar} 0` }}>
        <p style={{ ...etiket, color: KIZIL, marginBottom: "0.8rem" }}>Altısını açanlar</p>
        {ACANLAR.length ? (
          <p style={{ ...serif, fontSize: "1.2rem", lineHeight: 1.7 }}>{ACANLAR.join(" · ")}</p>
        ) : (
          <p style={{ ...serif, fontStyle: "italic", fontSize: "1.2rem", opacity: 0.7 }}>İlk isim seninki olabilir.</p>
        )}
      </section>

      <footer style={{ maxWidth: 760, margin: "0 auto", padding: `3.5rem ${kenar} 4rem`, textAlign: "center", opacity: 0.6, fontSize: "0.9rem", lineHeight: 1.6 }}>
        <p>Metinler: Sait Faik Abasıyanık (kamu malı). Seçki ve yerleştirme: Berkay Doğan.</p>
        <p style={{ marginTop: "0.4rem" }}>Reklam yok · Beğeni yok · Sıralama yok</p>
        <p style={{ marginTop: "0.5rem" }}><Link href="/by" style={{ color: "inherit" }}>by. atölyesinin bir işi</Link></p>
      </footer>
    </main>
  );
}
