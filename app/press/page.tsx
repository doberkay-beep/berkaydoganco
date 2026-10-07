import type { Metadata } from "next";
import Link from "next/link";
import { site, EMAIL, INSTAGRAM_URL, YOUTUBE_URL, SUBSTACK_URL } from "@/lib/site";
import { KITAPLAR } from "@/lib/kitaplar";
import { KITAP_ADI } from "@/lib/sozler";
import { KopyalaMetin } from "@/components/KopyalaMetin";
import { ALINTILAR, ALINTI_KAYNAK } from "@/lib/basinda";
import { BIO_KISA_TR, BIO_ORTA_TR, BIO_KISA_EN, BIO_ORTA_EN, KUNYE, RAKAMLAR, KONULAR } from "@/lib/basinKiti";
import { BasinDuvari } from "@/components/BasinDuvari";
import { CanliSimdiKutu } from "@/components/CanliSimdi";
import { OkurSesi } from "@/components/OkurSesi";
import { Muhur } from "@/components/Muhur";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: { absolute: "Basın Odası — Berkay Doğan" },
  description: "Berkay Doğan basın arşivi: künye, üç boy biyografi, kitap künyeleri, indirilebilir görseller ve söyleşi konuları.",
  alternates: { canonical: "/press" },
  openGraph: {
    title: "Basın Odası — Berkay Doğan",
    description: "Basın için her şey: künye, biyografiler, görseller, söyleşi konuları.",
    url: "https://www.berkaydogan.co/press",
    type: "profile",
  },
};

/* ---- Veri ---- */




const GORSELLER: { ad: string; dosya: string; not: string }[] = [
  { ad: "Yazar portresi", dosya: "/images/portre.jpg", not: "S&B · JPG" },
  { ad: "Mürekkep ve Köz — ön kapak", dosya: "/murekkep-ve-koz-on-kapak.jpg", not: "800×1244 · JPG" },
  { ad: "Mürekkep ve Köz — arka kapak", dosya: "/murekkep-ve-koz-arka-kapak.jpg", not: "800×1244 · JPG" },
  { ad: "Tasfiye — ön kapak", dosya: "/tasfiye-on-kapak.jpg", not: "745×1201 · JPG" },
  { ad: "Tasfiye — arka kapak", dosya: "/tasfiye-arka-kapak.jpg", not: "745×1201 · JPG" },
  { ad: "BD mührü (logo)", dosya: "/muhur.png", not: "512×512 · PNG" },
  { ad: "BD mührü — vektör", dosya: "/muhur.svg", not: "SVG" },
];




const ICINDEKILER: [string, string][] = [
  ["#kunye", "Künye"], ["#biyografi", "Biyografi"], ["#kitaplar", "Kitaplar"],
  ["#rakamlar", "Rakamlarla"], ["#gorseller", "Görseller"], ["#basinda", "Basında"], ["#okurlar", "Okurlardan"], ["#alintilar", "Alıntılar"],
  ["#konular", "Söyleşi konuları"],
  ["#english", "English"], ["#iletisim", "İletişim"],
];

/* ---- Stil kısayolları ---- */
const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase" };
const secStil: React.CSSProperties = { marginTop: "clamp(3rem, 7vh, 5rem)", borderTop: "1px solid var(--line)", paddingTop: "2.5rem" };
const secBaslik: React.CSSProperties = { ...mono, letterSpacing: "0.22em", color: "var(--accent-2)", marginBottom: "1.5rem" };

function Bio({ baslik, metin, en = false }: { baslik: string; metin: string; en?: boolean }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", marginBottom: "0.8rem", flexWrap: "wrap" }}>
        <span style={{ ...mono, fontSize: "0.66rem", color: "var(--muted)" }}>{baslik}</span>
        {en ? <KopyalaMetin metin={metin} etiket="Copy" tamam="Copied ✓" /> : <KopyalaMetin metin={metin} />}
      </div>
      <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--ink)", maxWidth: "72ch" }}>{metin}</p>
    </div>
  );
}

export default function PressPage() {
  return (
    <main lang="tr" style={{ maxWidth: "980px", margin: "0 auto", padding: "clamp(3rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3.25rem) 6rem" }}>
      <BreadcrumbSchema name="Basın" path="/press/" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(3rem, 8vh, 5rem)", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink)" }}>
          <Muhur size={22} /> Berkay Doğan
        </Link>
        <Link href="/" style={{ ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)", borderBottom: "1px solid var(--accent)", paddingBottom: "2px" }}>← berkaydogan.co</Link>
      </div>

      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", ...mono, letterSpacing: "0.26em", color: "var(--ink)" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />Basın Odası · Press Room
      </span>
      <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(2.6rem, 7vw, 5rem)", letterSpacing: "-0.015em", lineHeight: 0.95, margin: "1.5rem 0 1rem", color: "var(--ink)" }}>Basın Odası</h1>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.15rem, 2.4vw, 1.6rem)", color: "var(--muted)", maxWidth: "44ch" }}>
        Bir gazetecinin ihtiyaç duyabileceği her şey: künye, biyografiler, görseller, konular. Krediyle kullanım serbesttir.
      </p>

      {/* BASIN KİTİ — tek tık (scripts/basin-kiti.mts üretir) */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2rem" }}>
        <a href="/basin/berkay-dogan-basin-kiti.zip" download className="cg-pill" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, fontSize: "0.92rem", padding: "0.85rem 1.4rem", borderRadius: "100px", background: "var(--accent)", color: "var(--accent-ink)", textDecoration: "none" }}>
          Basın kitini indir · ZIP ↓
        </a>
        <a href="/basin/berkay-dogan-basin-bulteni.pdf" target="_blank" rel="noopener" className="cg-pill" style={{ fontFamily: "var(--font-grotesk)", fontWeight: 500, fontSize: "0.92rem", padding: "0.85rem 1.4rem", borderRadius: "100px", border: "1px solid var(--line)", color: "var(--ink)", textDecoration: "none" }}>
          Tek sayfa bülten · PDF ↗
        </a>
      </div>
      <p style={{ marginTop: "0.7rem", fontSize: "0.8rem", color: "var(--muted)" }}>ZIP: biyografiler (TR/EN), künye, alıntılar, basın listesi, portre, kapaklar, mühür ve bülten.</p>

      {/* İçindekiler */}
      <nav aria-label="İçindekiler" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "2rem" }}>
        {ICINDEKILER.map(([href, ad]) => (
          <a key={href} href={href} style={{ ...mono, fontSize: "0.64rem", color: "var(--muted)", border: "1px solid var(--line)", borderRadius: "100px", padding: "0.45rem 0.9rem" }}>{ad}</a>
        ))}
      </nav>

      {/* KÜNYE */}
      <section id="kunye" style={secStil}>
        <p style={secBaslik}>Künye · Bir bakışta</p>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(120px, 180px) 1fr" }}>
          {KUNYE.map((f) => (
            <div key={f.k} style={{ display: "contents" }}>
              <div style={{ padding: "0.85rem 0", borderTop: "1px solid var(--line)", ...mono, fontSize: "0.68rem", color: "var(--muted)" }}>{f.k}</div>
              <div style={{ padding: "0.85rem 0", borderTop: "1px solid var(--line)", fontSize: "0.98rem", color: "var(--ink)" }}>{f.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BİYOGRAFİ */}
      <section id="biyografi" style={secStil}>
        <p style={secBaslik}>Biyografi — üç boy</p>
        <Bio baslik="Tek cümle" metin={BIO_KISA_TR} />
        <Bio baslik="Kısa paragraf" metin={BIO_ORTA_TR} />
        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", marginBottom: "0.8rem", flexWrap: "wrap" }}>
          <span style={{ ...mono, fontSize: "0.66rem", color: "var(--muted)" }}>Uzun biyografi</span>
          <KopyalaMetin metin={site.tr.about.paras.join("\n\n")} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", maxWidth: "72ch" }}>
          {site.tr.about.paras.map((p, i) => (
            <p key={i} style={{ fontSize: "1rem", lineHeight: 1.75, color: i === 0 ? "var(--ink)" : "var(--muted)" }}>{p}</p>
          ))}
        </div>
      </section>

      {/* KİTAPLAR */}
      <section id="kitaplar" style={secStil}>
        <p style={secBaslik}>Kitaplar</p>
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {KITAPLAR.map((kitap) => (
            <article key={kitap.slug} style={{ border: "1px solid var(--line)", borderRadius: "14px", padding: "1.5rem 1.6rem", background: "var(--bg-2)" }}>
              <div style={{ display: "flex", gap: "1.1rem", alignItems: "flex-start" }}>
                <img src={kitap.kapak400} alt={`${kitap.ad} — kapak`} loading="lazy" decoding="async" style={{ width: "76px", borderRadius: "3px", boxShadow: "0 12px 26px rgba(0,0,0,0.35)" }} />
                <div>
                  <h3 style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.02em", color: "var(--ink)" }}>{kitap.ad}</h3>
                  <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.92rem", color: "var(--muted)", marginTop: "0.2rem" }}>{kitap.altBaslik}</p>
                </div>
              </div>
              <div style={{ marginTop: "1.1rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {kitap.kunye.map((f) => (
                  <div key={f.k} style={{ display: "flex", gap: "0.8rem", fontSize: "0.84rem" }}>
                    <span style={{ ...mono, fontSize: "0.6rem", color: "var(--muted)", minWidth: "8ch", paddingTop: "0.12rem" }}>{f.k}</span>
                    <span style={{ color: "var(--ink)" }}>{f.v}</span>
                  </div>
                ))}
              </div>
              {kitap.alintilar.length > 0 && (
                <p style={{ marginTop: "1.1rem", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.55, color: "var(--muted)" }}>
                  &ldquo;{kitap.alintilar[0].text}&rdquo; <span style={{ ...mono, fontSize: "0.56rem" }}>({kitap.alintilar[0].sayfa})</span>
                </p>
              )}
              <Link href={`/kitaplar/${kitap.slug}`} style={{ display: "inline-block", marginTop: "1.1rem", ...mono, fontSize: "0.62rem", color: "var(--accent-2)" }}>Kitabın sayfası →</Link>
            </article>
          ))}
        </div>
      </section>

      {/* RAKAMLAR */}
      <section id="rakamlar" style={secStil}>
        <p style={secBaslik}>Rakamlarla</p>
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}>
          {RAKAMLAR.map((r) => (
            <div key={r.aciklama} style={{ borderTop: "2px solid var(--accent)", paddingTop: "0.9rem" }}>
              <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", lineHeight: 1, color: "var(--accent-2)", letterSpacing: "-0.03em" }}>{r.deger}</span>
              <span style={{ display: "block", marginTop: "0.55rem", fontSize: "0.78rem", lineHeight: 1.45, color: "var(--muted)" }}>{r.aciklama}</span>
            </div>
          ))}
        </div>
        <CanliSimdiKutu />
      </section>

      {/* GÖRSELLER */}
      <section id="gorseller" style={secStil}>
        <p style={secBaslik}>Görsel arşivi · İndirilebilir</p>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}>
          {GORSELLER.map((g) => (
            <a key={g.dosya} href={g.dosya} download style={{ display: "flex", flexDirection: "column", gap: "0.35rem", padding: "1.2rem 1.3rem", border: "1px solid var(--line)", borderRadius: "10px", background: "var(--bg-2)" }}>
              <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 500, fontSize: "0.95rem", color: "var(--ink)" }}>{g.ad}</span>
              <span style={{ ...mono, fontSize: "0.6rem", color: "var(--accent-2)" }}>{g.not} — İndir ↓</span>
            </a>
          ))}
          <Link href="/posterler" style={{ display: "flex", flexDirection: "column", gap: "0.35rem", padding: "1.2rem 1.3rem", border: "1px solid var(--line)", borderRadius: "10px", background: "var(--bg-2)" }}>
            <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 500, fontSize: "0.95rem", color: "var(--ink)" }}>12 söz posteri</span>
            <span style={{ ...mono, fontSize: "0.6rem", color: "var(--accent-2)" }}>A4 PDF galerisi →</span>
          </Link>
          <Link href="/gom" style={{ display: "flex", flexDirection: "column", gap: "0.35rem", padding: "1.2rem 1.3rem", border: "1px solid var(--line)", borderRadius: "10px", background: "var(--bg-2)" }}>
            <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 500, fontSize: "0.95rem", color: "var(--ink)" }}>Günün Közü gereci</span>
            <span style={{ ...mono, fontSize: "0.6rem", color: "var(--accent-2)" }}>Sitene göm — kod →</span>
          </Link>
        </div>
        <p style={{ marginTop: "1.25rem", fontSize: "0.82rem", color: "var(--muted)" }}>Tüm görseller haber ve tanıtım amaçlı kullanım için serbesttir — kredi: Berkay Doğan / berkaydogan.co</p>
      </section>

      {/* BASINDA — duvar */}
      <section id="basinda" style={secStil}>
        <p style={secBaslik}>Basında</p>
        <BasinDuvari lang="tr" />
      </section>

      {/* OKURLARDAN */}
      <section id="okurlar" style={secStil}>
        <p style={secBaslik}>Okurlardan</p>
        <OkurSesi lang="tr" adet={99} tumuLink={false} />
      </section>

      {/* ALINTILAR */}
      <section id="alintilar" style={secStil}>
        <p style={secBaslik}>Alıntılanabilir cümleler</p>
        <p style={{ fontSize: "0.9rem", color: "var(--muted)", marginBottom: "1.5rem", maxWidth: "62ch" }}>
          Berkay Doğan&apos;ın kendi sözleri, harfi harfine. Kaynak:{" "}
          <a href={ALINTI_KAYNAK.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-2)" }}>{ALINTI_KAYNAK.ad} ↗</a>
        </p>
        <div style={{ display: "grid", gap: "0.9rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {ALINTILAR.map((a) => (
            <figure key={a} style={{ margin: 0, display: "flex", flexDirection: "column", gap: "0.9rem", justifyContent: "space-between", padding: "1.3rem 1.4rem", borderLeft: "2px solid var(--accent)", background: "var(--bg-2)", borderRadius: "0 10px 10px 0" }}>
              <blockquote style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.12rem", lineHeight: 1.45, color: "var(--ink)" }}>&ldquo;{a}&rdquo;</blockquote>
              <KopyalaMetin metin={`“${a}” — Berkay Doğan`} />
            </figure>
          ))}
        </div>
      </section>

      {/* SÖYLEŞİ KONULARI */}
      <section id="konular" style={secStil}>
        <p style={secBaslik}>Söyleşi & haber konuları</p>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" }}>
          {KONULAR.map((k, i) => (
            <li key={i} style={{ display: "flex", gap: "1rem", padding: "0.9rem 0", borderTop: "1px solid var(--line)", alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, color: "var(--accent-2)", fontSize: "0.85rem", minWidth: "2ch" }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--ink)" }}>{k}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ENGLISH */}
      <section id="english" lang="en" style={secStil}>
        <p style={secBaslik}>English — press summary</p>
        <p style={{ fontSize: "0.95rem", color: "var(--ink)", marginBottom: "1.75rem" }}>
          Full English page with books, images and interview topics:{" "}
          <Link href="/en/" hrefLang="en" style={{ color: "var(--accent-2)", borderBottom: "1px solid var(--accent)" }}>berkaydogan.co/en →</Link>
        </p>
        <Bio en baslik="One line" metin={BIO_KISA_EN} />
        <Bio en baslik="Short paragraph" metin={BIO_ORTA_EN} />
        <div style={{ display: "grid", gridTemplateColumns: "minmax(120px, 180px) 1fr", marginTop: "0.5rem" }}>
          {[
            ["Books", `${KITAP_ADI.mvk} — poetry, 2025, ISBN ${KITAPLAR[1].isbn} · ${KITAP_ADI.tas} — essays, 2026, ISBN ${KITAPLAR[0].isbn}`],
            ["Recognition", "Most visited poetry title on Trendyol · 10/10 reader rating on 1000Kitap · poem in Valsanat magazine, issue 51"],
            ["Contact", EMAIL],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "contents" }}>
              <div style={{ padding: "0.85rem 0", borderTop: "1px solid var(--line)", ...mono, fontSize: "0.68rem", color: "var(--muted)" }}>{k}</div>
              <div style={{ padding: "0.85rem 0", borderTop: "1px solid var(--line)", fontSize: "0.95rem", color: "var(--ink)" }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* İLETİŞİM */}
      <section id="iletisim" style={secStil}>
        <p style={secBaslik}>Basın iletişimi</p>
        <a href={`mailto:${EMAIL}`} style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(1.3rem, 3vw, 2rem)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{EMAIL}</a>
        <p style={{ marginTop: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Röportaj, söyleşi ve inceleme nüshası talepleri için — basılı kitap gönderimi yapılabilir.</p>
        <div style={{ display: "flex", gap: "1.75rem", marginTop: "1.5rem", ...mono, fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted)" }}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">Substack</a>
        </div>
      </section>
    </main>
  );
}
