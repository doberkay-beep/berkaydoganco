import type { Metadata } from "next";
import Link from "next/link";

/* by. — Berkay Doğan'ın uygulama atölyesi. hereby. ve nowby. bu atölyenin işleri.
   İşaret: kalın serif "by" + mordan (hereby) turuncuya (nowby) akan nokta. */

export const metadata: Metadata = {
  title: { absolute: "by. — Berkay Doğan'ın atölyesi" },
  description: "by., yazar Berkay Doğan'ın uygulama atölyesi. Beğenisiz, takipçisiz, sonsuz akışsız; seni telefondan alıp bir yere, bir âna, bir insana götüren uygulamalar: hereby. ve nowby.",
  alternates: { canonical: "/by" },
  openGraph: { title: "by. — Berkay Doğan'ın atölyesi", description: "Bir yazarın uygulama atölyesi: hereby. ve nowby.", images: ["/by/by-ikon.png"] },
};

const MOR = "#7c6cff";
const TURUNCU = "#FF6A3D";
const isaretYazi: React.CSSProperties = { fontFamily: "ui-serif, 'New York', Georgia, serif", fontWeight: 700, lineHeight: 1 };
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.6 };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif, Georgia), Georgia, serif" };
const bolum: React.CSSProperties = { maxWidth: "880px", margin: "0 auto", padding: "clamp(3rem, 8vh, 5.5rem) clamp(1.25rem, 5vw, 3rem)" };
const kart: React.CSSProperties = { background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "22px", padding: "1.6rem", backdropFilter: "blur(12px)" };

// "by" glifi New York Bold'dan maske olarak (her cihazda aynı çizim, rengi temadan gelir); 634×600 oran.
function Isaret({ boy }: { boy: string }) {
  return (
    <span role="img" aria-label="by." style={{ display: "inline-flex", alignItems: "flex-end", fontSize: boy, lineHeight: 1 }}>
      <span aria-hidden style={{
        display: "inline-block", width: "1.0567em", height: "1em", background: "currentColor",
        WebkitMaskImage: "url(/by/by-maske.png)", maskImage: "url(/by/by-maske.png)",
        WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
      }} />
      <span aria-hidden style={{ display: "inline-block", width: "0.2em", height: "0.2em", borderRadius: "50%", marginLeft: "0.04em", marginBottom: "0.235em", background: `linear-gradient(135deg, ${MOR}, ${TURUNCU})` }} />
    </span>
  );
}

const SORULAR = [
  "İnsanın kendine sorduğu gerçek bir soruya cevap veriyor mu?",
  "Telefonu bırakıp bir yere, bir âna, bir insana çağırıyor mu?",
  "Beğenisiz, takipçisiz, sonsuz akışsız yaşayabiliyor mu?",
  "İçinde bir yazarın sözü var mı?",
];

const ISLER = [
  { ad: "hereby", renk: MOR, soru: "Nerede?", m: "Aklından geçen satırı geçtiğin yere bırak. Onu yalnızca oraya gelen biri okuyabilir.", href: "/hereby", dis: false },
  { ad: "nowby", renk: TURUNCU, soru: "Ne zaman?", m: "Türkiye'nin radyolarında şu an ne çalıyor? Yüzlerce frekans, tek ekranda, canlı.", href: "https://nowby.co", dis: true },
];

export default function AtolyeSayfa() {
  return (
    <main>
      <section style={{ ...bolum, paddingTop: "clamp(4rem, 14vh, 8rem)", textAlign: "center" }}>
        <Isaret boy="clamp(6rem, 22vw, 11rem)" />
        <p style={{ ...mono, marginTop: "1.6rem" }}>Berkay Doğan&apos;ın atölyesi</p>
      </section>

      <section style={bolum}>
        <p style={mono}>by ne demek</p>
        <div style={{ ...serif, fontSize: "clamp(1.25rem, 2.6vw, 1.6rem)", lineHeight: 1.6, marginTop: "1rem", display: "grid", gap: "1rem" }}>
          <p><em>by</em>, bir şeyin yanında durmak demek: bir yerin, bir ânın.</p>
          <p><em>by</em>, bir şeyin aracılığıyla yaşamak demek: bir satırla, bir frekansla.</p>
          <p>Ve <em>by</em>, bir imza: <em>written by</em>. Bu atölyeden çıkan her iş, bir yazarın imzasını taşır.</p>
        </div>
      </section>

      <section style={bolum}>
        <p style={mono}>Atölyenin işleri</p>
        <div style={{ display: "grid", gap: "1rem", marginTop: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {ISLER.map((i) => {
            const ic = (
              <div style={{ ...kart, height: "100%" }}>
                <p style={{ ...mono, color: i.renk, opacity: 1 }}>{i.soru}</p>
                <p style={{ ...isaretYazi, fontSize: "2.6rem", marginTop: "0.6rem" }}>
                  {i.ad}<span style={{ color: i.renk }}>.</span>
                </p>
                <p style={{ marginTop: "0.8rem", lineHeight: 1.6, opacity: 0.8 }}>{i.m}</p>
                <p style={{ ...mono, marginTop: "1.2rem", opacity: 0.9 }}>{i.dis ? "nowby.co →" : "Tanı →"}</p>
              </div>
            );
            return i.dis
              ? <a key={i.ad} href={i.href} target="_blank" rel="noopener" style={{ color: "inherit", textDecoration: "none" }}>{ic}</a>
              : <Link key={i.ad} href={i.href} style={{ color: "inherit", textDecoration: "none" }}>{ic}</Link>;
          })}
        </div>
      </section>

      <section style={bolum}>
        <p style={mono}>Dört soru</p>
        <p style={{ ...serif, fontSize: "clamp(1.25rem, 2.6vw, 1.6rem)", lineHeight: 1.5, marginTop: "1rem" }}>
          Bu atölyeden bir uygulamanın çıkması için dört soruya da &quot;evet&quot; demesi gerekir.
        </p>
        <ol style={{ listStyle: "none", padding: 0, marginTop: "1.4rem", display: "grid", gap: "0.8rem" }}>
          {SORULAR.map((s, n) => (
            <li key={s} style={{ ...kart, display: "flex", gap: "1rem", alignItems: "baseline", padding: "1.1rem 1.4rem" }}>
              <span style={{ ...isaretYazi, fontSize: "1.6rem", background: `linear-gradient(135deg, ${MOR}, ${TURUNCU})`, WebkitBackgroundClip: "text", color: "transparent" }}>{n + 1}</span>
              <span style={{ lineHeight: 1.5 }}>{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section style={{ ...bolum, textAlign: "center", paddingBottom: "clamp(4rem, 12vh, 7rem)" }}>
        <p style={{ ...serif, fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontStyle: "italic" }}>Önce sözler, sonra frekanslar.</p>
        <p style={{ ...mono, marginTop: "1rem" }}>Reklam yok · Beğeni yok · Takipçi yok</p>
        <p style={{ marginTop: "2rem", opacity: 0.7 }}>
          <Link href="/" style={{ color: "inherit" }}>berkaydogan.co</Link>
        </p>
      </section>
    </main>
  );
}
