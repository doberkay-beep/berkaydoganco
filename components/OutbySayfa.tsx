import Link from "next/link";

/* outby. — insanı ekrandan çıkarıp bir yere götüren hareket. Sayfa hereby.'ın arayüzü gibi kurulur:
   haritada bir yazar izi, alttan yükselen kâğıt kartta manifesto. İskeledeki dize burada yazmaz;
   yalnızca oraya gidene açılır. Manifestonun bütün cümleleri Berkay'ın (23 Ekim 2026). */

const KIZIL = "#E5382C";
const KAGIT = "#F2ECE4";
const MUREKKEP = "#16141A";
const DENIZ = "#14223F";
const KARA = "#1C2C50";

const serif: React.CSSProperties = { fontFamily: "ui-serif, 'New York', var(--font-serif, Georgia), Georgia, serif" };
const etiket: React.CSSProperties = { fontFamily: "var(--font-grotesk), system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" };

const MANIFESTO = [
  "Aklıma gelen herhangi bir güzel fikri kaçırdığımı fark ettim. Tutkumu kaybettiğimi fark ettim. Algoritmaların beni boynumdaki tasmam gibi, yakamdaki giyotin gibi kontrol ettiğini fark ettim.",
  "Yasaklar çiğnenmek içindir. Lisede bahçe arkasında sigara içen gençleri düşünün; yasak ne kadar cazipti, değil mi?",
  "İnsan, taştan tabletlere yazılar yazan, hikâye anlatıcılığını evrimin ilk anlarından bilen bir varlık. Kontrolünü algoritmalara devretti. Çıkış, yalnızca yine geldiğimiz yeri hatırlamak.",
  "Bu manifesto yıkmasın; temizlesin, arındırsın. Düşünmek ve yazmak: anlamını hatırladığımız, arındığımız günlere bizi geri getirecek tek şey.",
];

const YOL = [
  { s: "play.rectangle", b: "Bir video", a: "Otuz saniye. Sonu internette değil." },
  { s: "mappin", b: "Bir yer", a: "Sonu hereby'da bir izde. Yalnız oraya gidene açılır." },
  { s: "pause", b: "Durdurmadan bitir", a: "Orada telefonu cebinde tut; bir şeyi baştan sona yaşa." },
  { s: "pencil", b: "Bir satır", a: "İzin yanına kendi satırını bırak. Sıradaki kişinin kapısı o olur." },
];

/** Kadıköy kıyısının sade bir çizimi: Haydarpaşa, iskele, Moda burnu. Ölçekli değil, tanınır. */
function Harita() {
  return (
    <svg viewBox="0 0 800 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <rect width="800" height="620" fill={DENIZ} />
      {/* Anadolu yakası: Haydarpaşa'dan Moda'ya */}
      <path d="M800 0 L470 0 C455 60 430 95 395 120 C370 138 372 170 400 190 C430 212 440 240 425 270 C410 300 380 312 372 345 C362 388 395 410 430 418 C470 428 478 470 452 505 C430 535 440 575 470 620 L800 620 Z" fill={KARA} />
      {/* Sokaklar */}
      <g stroke="#2A3D66" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M430 300 L800 250" /><path d="M445 360 L800 380" /><path d="M500 140 L800 120" />
        <path d="M520 0 L560 620" /><path d="M640 0 L620 620" /><path d="M720 0 L740 620" />
        <path d="M455 230 L800 190" /><path d="M470 470 L800 500" />
      </g>
      <g stroke="#34497A" strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M410 330 C520 320 600 300 800 300" />
      </g>
      {/* Vapur hattı */}
      <path d="M372 335 C300 300 220 250 120 170" stroke={KAGIT} strokeOpacity="0.28" strokeWidth="2.5" strokeDasharray="7 9" fill="none" />
      <text x="455" y="165" fill="#7F90B8" fontSize="15" fontFamily="system-ui, sans-serif">Haydarpaşa</text>
      <text x="470" y="560" fill="#7F90B8" fontSize="15" fontFamily="system-ui, sans-serif">Moda</text>
      <text x="150" y="150" fill="#7F90B8" fontSize="15" fontFamily="system-ui, sans-serif">Karaköy ↗</text>
    </svg>
  );
}

function IzIgnesi() {
  return (
    <div style={{ position: "absolute", left: "46.5%", top: "54%", transform: "translate(-50%, -50%)" }}>
      <span className="ob-dalga" />
      <span style={{ position: "relative", display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: "50%", background: KIZIL, border: `3px solid ${KAGIT}`, boxShadow: "0 6px 18px rgba(0,0,0,.35)", color: KAGIT, fontSize: 16 }}>★</span>
    </div>
  );
}

export function OutbySayfa() {
  return (
    <main lang="tr" style={{ background: DENIZ, color: KAGIT }}>
      <style>{`
        .ob-dalga{position:absolute;left:50%;top:50%;width:38px;height:38px;margin:-19px 0 0 -19px;border-radius:50%;border:2px solid ${KIZIL};animation:ob-dalga 2.4s ease-out infinite}
        @keyframes ob-dalga{from{transform:scale(1);opacity:.9}to{transform:scale(3.2);opacity:0}}
        @media (prefers-reduced-motion:reduce){.ob-dalga{animation:none;opacity:.4}}
        .ob-yol{display:grid;gap:0;grid-template-columns:minmax(0,1fr)}
        @media (min-width:760px){.ob-yol{grid-template-columns:repeat(2,minmax(0,1fr))}}
      `}</style>

      {/* HARİTA */}
      <section style={{ position: "relative", height: "min(72vh, 640px)", minHeight: 440, overflow: "hidden" }}>
        <Harita />
        <IzIgnesi />
        <div style={{ position: "absolute", top: "max(68px, calc(env(safe-area-inset-top, 0px) + 50px))", left: "max(16px, env(safe-area-inset-left, 0px))", right: "max(16px, env(safe-area-inset-right, 0px))", display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, width: "min(560px, 100%)", padding: "0.7rem 1.1rem", borderRadius: 999, background: "rgba(36,52,90,.82)", border: "1px solid rgba(242,236,228,.12)", backdropFilter: "blur(10px)", fontSize: "0.95rem" }}>
            <span style={{ ...serif, fontWeight: 700 }}>hereby<span style={{ color: KIZIL }}>.</span></span>
            <span style={{ opacity: 0.55 }}>Kadıköy iskelesi</span>
          </div>
        </div>
      </section>

      {/* KÂĞIT KART: MANİFESTO */}
      <section style={{ position: "relative", marginTop: "-110px", paddingLeft: "max(16px, env(safe-area-inset-left, 0px))", paddingRight: "max(16px, env(safe-area-inset-right, 0px))" }}>
        <article style={{ maxWidth: 720, margin: "0 auto", background: KAGIT, color: MUREKKEP, borderRadius: "28px", padding: "clamp(1.6rem, 5vw, 3rem)", boxShadow: "0 24px 60px rgba(0,0,0,.35)" }}>
          <div style={{ width: 44, height: 5, borderRadius: 3, background: "rgba(22,20,26,.18)", margin: "-0.6rem auto 1.4rem" }} />
          <p style={{ ...etiket, color: KIZIL }}>Yazarın izi · Manifesto</p>
          <h1 style={{ ...serif, fontSize: "clamp(3rem, 11vw, 5rem)", fontWeight: 700, lineHeight: 1, margin: "0.6rem 0 0.4rem", letterSpacing: "-0.01em" }}>
            outby<span style={{ color: KIZIL }}>.</span>
          </h1>
          <p style={{ fontSize: "0.95rem", color: "rgba(22,20,26,.55)", marginBottom: "1.8rem" }}>Kadıköy · yaklaşık konum · 23 Ekim 2026</p>
          <div style={{ display: "grid", gap: "1.15rem" }}>
            {MANIFESTO.map((p) => (
              <p key={p.slice(0, 12)} style={{ ...serif, fontSize: "clamp(1.15rem, 2.6vw, 1.4rem)", lineHeight: 1.55, color: "rgba(22,20,26,.88)", textWrap: "pretty" }}>{p}</p>
            ))}
            <p style={{ ...serif, fontStyle: "italic", fontSize: "clamp(1.15rem, 2.6vw, 1.4rem)", lineHeight: 1.55, color: KIZIL }}>
              Bir gün biri şunu desin: “Şair ya da yazar olmanın ötesinde bir insan, ne olduğumuzu hatırlattı; içimizdekileri tasfiye etti.”
            </p>
          </div>
          <p style={{ marginTop: "1.8rem", fontSize: "0.95rem", color: "rgba(22,20,26,.55)" }}>— Berkay Doğan</p>
        </article>
      </section>

      {/* YOL */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(3rem, 8vh, 4.5rem) max(16px, env(safe-area-inset-right, 0px)) 0 max(16px, env(safe-area-inset-left, 0px))" }}>
        <p style={{ ...etiket, color: KIZIL, marginBottom: "1rem" }}>Nasıl</p>
        <div className="ob-yol" style={{ borderRadius: 22, overflow: "hidden", background: "rgba(36,52,90,.55)", border: "1px solid rgba(242,236,228,.1)" }}>
          {YOL.map((y, i) => (
            <div key={y.b} style={{ padding: "1.2rem 1.3rem", borderTop: i > 0 ? "1px solid rgba(242,236,228,.08)" : "none", display: "grid", gridTemplateColumns: "2rem minmax(0,1fr)", gap: "0.2rem 0.8rem" }}>
              <span style={{ gridRow: "span 2", color: KIZIL, fontWeight: 700, fontSize: "1.1rem" }}>{i + 1}</span>
              <span style={{ fontWeight: 600 }}>{y.b}</span>
              <span style={{ opacity: 0.68, fontSize: "0.95rem", lineHeight: 1.5 }}>{y.a}</span>
            </div>
          ))}
        </div>
      </section>

      {/* İLK İZ: KİLİTLİ */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "2.4rem max(16px, env(safe-area-inset-right, 0px)) 0 max(16px, env(safe-area-inset-left, 0px))" }}>
        <p style={{ ...etiket, color: KIZIL, marginBottom: "1rem" }}>İlk iz</p>
        <div style={{ background: KAGIT, color: MUREKKEP, borderRadius: 22, padding: "1.4rem 1.5rem", display: "grid", gap: "0.6rem" }}>
          <p style={{ ...serif, fontSize: "1.6rem", fontWeight: 700 }}>Kadıköy iskelesi</p>
          <p style={{ ...serif, fontStyle: "italic", fontSize: "1.2rem", lineHeight: 1.5, color: "rgba(22,20,26,.35)", filter: "blur(5px)", userSelect: "none" }} aria-hidden="true">
            ············ ··· ········· ···· ·······
          </p>
          <p style={{ fontSize: "0.95rem", color: "rgba(22,20,26,.7)" }}>🔒 Bu izi okumak için oraya gitmelisin. Vapura bin; karşıya geçene kadar telefonu çıkarma.</p>
        </div>
        <p style={{ marginTop: "1.6rem", textAlign: "center" }}>
          <Link href="/hereby" style={{ display: "inline-block", padding: "0.85rem 1.5rem", borderRadius: 999, background: KAGIT, color: MUREKKEP, fontWeight: 700, textDecoration: "none" }}>
            Yerinde oku → hereby.
          </Link>
        </p>
      </section>

      <footer style={{ maxWidth: 720, margin: "0 auto", padding: "3.5rem max(16px, env(safe-area-inset-right, 0px)) 4rem max(16px, env(safe-area-inset-left, 0px))", textAlign: "center", opacity: 0.6, fontSize: "0.9rem" }}>
        <p>Reklam yok · Beğeni yok · Takipçi yok</p>
        <p style={{ marginTop: "0.5rem" }}><Link href="/by" style={{ color: "inherit" }}>by. atölyesinin bir işi</Link></p>
      </footer>
    </main>
  );
}
