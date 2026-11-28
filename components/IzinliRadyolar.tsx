import yedek from "@/lib/nowby-radyolar.json";

/* Yazılı izin veren radyolar — nowby. tanıtım sayfasında karo duvarı (25 Kas 2026).
   Radyo kendi logosunu yazılı izinle gönderdiyse logo (nowby.co/logolar, stations.logo_url);
   göndermediyse uygulamadaki karo: radyonun kendi rengi + baş harfi.
   Liste derleme anında nowby.co'dan (yalnız app_izinli radyolar) okunur; okunamazsa
   lib/nowby-radyolar.json'daki son anlık görüntü kullanılır. Radyo çıkarsa bir sonraki yayında kalkar. */

type Radyo = { ad: string; slug: string; renk: string; ulke: string; logo?: string | null };

// nowby.co önbelleği (10 dk) yenilenmeden derlenirse logo yedek listeden gelir.
const yedekLogo = new Map((yedek as Radyo[]).filter((r) => r.logo).map((r) => [r.slug, r.logo as string]));

async function radyolar(): Promise<Radyo[]> {
  try {
    const r = await fetch("https://nowby.co/api/now?uygulama=1", { cache: "force-cache", signal: AbortSignal.timeout(8000) });
    if (!r.ok) throw new Error(String(r.status));
    const y = (await r.json()) as { stations?: { name: string; slug: string; accentColor: string | null; country?: string | null; logoUrl?: string | null }[] };
    const l = (y.stations ?? []).map((s) => ({ ad: s.name, slug: s.slug, renk: s.accentColor || "#c9241a", ulke: s.country || "www", logo: s.logoUrl ?? yedekLogo.get(s.slug) ?? null }));
    if (l.length > 10) return l;
  } catch {}
  return yedek as Radyo[];
}

// "# 100 GREATEST…" gibi işaretle başlayan adlarda işaret atlanır.
const sadeAd = (ad: string) => ad.replace(/^[^\p{L}\p{N}]+/u, "").replace(/^(radio|radyo|the)\s+/i, "").trim();
// Harfle başlayanlar önce, rakamla başlayanlar sonra.
const sira = (a: Radyo, b: Radyo) => {
  const x = sadeAd(a.ad), y = sadeAd(b.ad);
  const rx = /^\p{N}/u.test(x), ry = /^\p{N}/u.test(y);
  return rx === ry ? x.localeCompare(y, "tr") : rx ? 1 : -1;
};

function basHarf(ad: string) {
  const sade = sadeAd(ad);
  return (sade[0] ?? ad[0] ?? "?").toLocaleUpperCase("tr");
}

const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" };

export async function IzinliRadyolar({ dil }: { dil: "tr" | "en" }) {
  const l = await radyolar();
  const ulke = new Set(l.map((r) => r.ulke).filter((u) => u !== "www")).size;
  const tr = l.filter((r) => r.ulke === "tr");
  const dunya = l.filter((r) => r.ulke !== "tr").sort(sira);
  const etiket = dil === "tr"
    ? `Yazılı izin veren radyolar · ${ulke} ülkeden`
    : `Stations that gave written permission · from ${ulke} countries`;
  const grup = (baslik: string, liste: Radyo[]) => (
    <div style={{ marginTop: "1.6rem" }}>
      <p style={{ ...mono, opacity: 0.55, fontSize: "0.64rem" }}>{baslik}</p>
      <ul className="nb-radyolar" style={{ listStyle: "none", padding: 0, margin: "0.9rem 0 0" }}>
        {liste.map((r) => (
          <li key={r.slug} title={r.ad} style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0 }}>
            {r.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={r.logo} alt="" aria-hidden loading="lazy" width={34} height={34} style={{
                flex: "0 0 auto", width: "2.1rem", height: "2.1rem", borderRadius: "0.6rem",
                objectFit: "contain", background: "#fff", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)",
              }} />
            ) : <span aria-hidden style={{
              flex: "0 0 auto", width: "2.1rem", height: "2.1rem", borderRadius: "0.6rem",
              background: `linear-gradient(160deg, ${r.renk}, color-mix(in srgb, ${r.renk} 72%, black))`,
              color: "#fff", display: "grid", placeItems: "center",
              fontFamily: "ui-rounded, 'SF Pro Rounded', system-ui, sans-serif", fontWeight: 800, fontSize: "0.95rem",
            }}>{basHarf(r.ad)}</span>}
            <span style={{ fontSize: "0.88rem", lineHeight: 1.25, opacity: 0.85, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.ad}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div style={{ marginTop: "2.2rem", borderTop: "1px solid var(--glass-border)", paddingTop: "1.4rem" }}>
      <style>{`
        .nb-radyolar{display:grid;gap:0.7rem 1.2rem;grid-template-columns:repeat(2,minmax(0,1fr))}
        @media (min-width:640px){.nb-radyolar{grid-template-columns:repeat(3,minmax(0,1fr))}}
        @media (min-width:900px){.nb-radyolar{grid-template-columns:repeat(4,minmax(0,1fr))}}
      `}</style>
      <p style={{ ...mono, opacity: 0.6 }}>{etiket}</p>
      {grup(dil === "tr" ? "Türkiye" : "Türkiye", tr)}
      {grup(dil === "tr" ? "Dünyadan" : "Around the world", dunya)}
      <p style={{ marginTop: "1.4rem", fontSize: "0.85rem", opacity: 0.6, lineHeight: 1.5 }}>
        {dil === "tr"
          ? "Logolar radyoların kendi gönderdiği dosyalar, izinleriyle. Logosu gelmeyen radyolar nowby. uygulamasındaki gibi kendi rengi ve baş harfiyle görünür. Liste her yayında nowby.co'dan güncellenir."
          : "Logos are the stations' own files, used with their permission. Stations without a logo appear as in the nowby. app, with their colour and initial. The list is refreshed from nowby.co with every update."}
      </p>
    </div>
  );
}
