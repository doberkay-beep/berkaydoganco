import { BASIN, BASIN_TUR, KAYITLAR, EKRAN } from "@/lib/basinda";
import type { Lang } from "@/lib/site";

/* BASINDA DUVARI — her çıkış bir kart: tür rozeti, tarih, yayın, başlık ve
   (varsa) çıkıştan tek cümle. Altında platform kayıtları sade bir şerit.
   Hakkımda ve Basın Odası aynı bileşeni kullanır; veri lib/basinda.ts. */

function tarih(iso: string, lang: Lang, gun = true) {
  return new Date(iso).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", gun ? { day: "numeric", month: "long", year: "numeric" } : { month: "long", year: "numeric" });
}

const ust: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" };

export function BasinDuvari({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const ekran = EKRAN.map((e) => ({
    tarihISO: e.tarihISO,
    yayin: e.kanal,
    rozet: e.tur === "tv" ? "TV" : e.tur === "podcast" ? "Podcast" : "Video",
    baslik: e.baslik,
    alinti: undefined as string | undefined,
    url: e.link,
    gun: true,
  }));
  const yazili = BASIN.map((b) => ({
    tarihISO: b.tarihISO,
    yayin: b.yayin,
    rozet: BASIN_TUR[b.tur][lang],
    baslik: b.baslik[lang],
    alinti: b.alinti,
    url: b.url as string | undefined,
    gun: !b.sadeceAy,
  }));
  const kartlar = [...ekran, ...yazili].sort((a, b) => b.tarihISO.localeCompare(a.tarihISO));

  return (
    <div>
      <div className="bd-duvar">
        {kartlar.map((k) => {
          const govde = (
            <>
              <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ ...ust, color: "var(--accent-ink)", background: "var(--accent)", padding: "0.32rem 0.6rem", borderRadius: "100px" }}>{k.rozet}</span>
                <span style={{ ...ust, color: "var(--muted)", letterSpacing: "0.12em" }}>{tarih(k.tarihISO, lang, k.gun)}</span>
              </span>
              <span style={{ display: "block", marginTop: "1.1rem", fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.01em", color: "var(--ink)" }}>{k.yayin}</span>
              <span style={{ display: "block", marginTop: "0.25rem", fontSize: "0.88rem", lineHeight: 1.45, color: "var(--muted)" }}>{k.baslik}</span>
              {k.alinti && (
                <span lang="tr" style={{ display: "block", marginTop: "1.1rem", paddingLeft: "0.9rem", borderLeft: "2px solid var(--accent)", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.2rem", lineHeight: 1.4, color: "var(--ink)" }}>
                  “{k.alinti}”
                </span>
              )}
              {k.url && (
                <span style={{ display: "block", marginTop: "auto", paddingTop: "1.25rem", ...ust, color: "var(--accent-2)" }}>
                  {tr ? "Oku" : "Read"} ↗
                </span>
              )}
            </>
          );
          return k.url ? (
            <a key={k.url} href={k.url} target="_blank" rel="noopener noreferrer" className="bd-kart">{govde}</a>
          ) : (
            <div key={k.tarihISO + k.yayin} className="bd-kart">{govde}</div>
          );
        })}
      </div>

      <div style={{ marginTop: "1.75rem", display: "flex", flexWrap: "wrap", gap: "0.5rem 1.5rem", alignItems: "baseline" }}>
        <span style={{ ...ust, color: "var(--muted)" }}>{tr ? "Kayıtlar" : "Listings"}</span>
        {KAYITLAR.map((k) => (
          <a key={k.ad} href={k.url} target="_blank" rel="noopener noreferrer" className="cg-link" style={{ fontSize: "0.86rem", color: "var(--ink)", textDecoration: "none" }}>
            <strong style={{ fontWeight: 600 }}>{k.ad}</strong> <span style={{ color: "var(--muted)" }}>· {tr ? k.tr : k.en}</span> <span style={{ color: "var(--accent-2)" }}>↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
