"use client";

import {
  TASFIYE_URL, TRENDYOL_URL, SUBSTACK_URL, YOUTUBE_URL, INSTAGRAM_URL, EMAIL,
  RETAILERS, VERSES, type Lang, type Copy,
} from "@/lib/site";
import { GununKozu } from "./GununKozu";
import { SuAnBandi } from "./SuAnBandi";
import { OkurSesi } from "./OkurSesi";
import { Kabuk, Reveal } from "./Kabuk";
import { Folio, Masthead } from "./Dergi";

/* Ana sayfa — sade: Tasfiye bandı + hero + günün közü + kitaplar + iletişim. */

// Tasfiye'nin diğer satıcıları — /git üzerinden (ölçümlü)
const TASFIYE_KANALLAR: { name: string; git: string }[] = [
  { name: "bkmkitap", git: "bkmkitap" },
  { name: "KitapStore", git: "kitapstore" },
  { name: "İskenderiye Yayınları", git: "iskenderiye" },
];

function TasfiyeBanner({ t }: { t: Copy }) {
  return (
    <div className="cg" style={{
      margin: "4.7rem clamp(1.25rem, 4vw, 3.25rem) 0",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.25rem", flexWrap: "wrap",
      padding: "1rem 1.4rem", borderRadius: "16px",
      background: "radial-gradient(120% 160% at 85% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 55%), var(--glass-bg)",
      border: "1px solid var(--glass-border)",
      backdropFilter: "blur(18px) saturate(150%)", WebkitBackdropFilter: "blur(18px) saturate(150%)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: "min(100%, 300px)", flex: 1 }}>
        <img src="/tasfiye-kapak-400.jpg" alt="Tasfiye" style={{ width: "46px", borderRadius: "3px", boxShadow: "0 10px 22px rgba(0,0,0,0.4)" }} />
        <span className="cg-serif" style={{ fontStyle: "italic", fontSize: "clamp(0.98rem, 2vw, 1.15rem)", lineHeight: 1.4, color: "var(--ink)" }}>{t.banner.line}</span>
      </div>
      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
        <a href="/git/trendyol/" rel="noopener" className="cg-btn cg-btn-fill" style={{ padding: "0.7rem 1.3rem" }}>{t.banner.buy} →</a>
        <a href="/film" className="cg-btn cg-btn-ghost" style={{ padding: "0.7rem 1.3rem" }}>{t.banner.watch}</a>
      </div>
    </div>
  );
}

export function Cagdas() {
  return (
    <Kabuk>
      {(lang: Lang, t: Copy) => {
        const b = t.books;
        return (
          <main className="cg" id="top">
            {/* TASFİYE BANNER — kalıcı reklam şeridi */}
            <TasfiyeBanner t={t} />

            {/* KÜNYE SATIRI — dergi manşet başı */}
            <div style={{ margin: "2.5rem clamp(1.25rem, 4vw, 3.25rem) 0" }}>
              <Masthead left="berkaydogan.co" center={t.hero.role} right="MMXXVI — İstanbul" />
            </div>

            {/* HERO — kapak */}
            <section className="cg-hero" style={{ paddingTop: "2.5rem" }}>
              <div>
                <h1 className="ed-display" style={{ fontSize: "clamp(4rem, 13.5vw, 12.5rem)", margin: "0 0 1.75rem" }} aria-label="Berkay Doğan">
                  {["Berkay", "Doğan"].map((word, wi) => (
                    <span key={word} style={{ display: "block" }} aria-hidden="true">
                      {[...word].map((ch, i) => (
                        <span key={i} className="cg-ign" style={{ animationDelay: `${0.15 + (wi * 6 + i) * 0.05}s` }}>{ch}</span>
                      ))}
                      {/* Görünmez boşluk: Google iki satırı "BerkayDoğan" diye bitişik okumasın */}
                      {wi === 0 && " "}
                    </span>
                  ))}
                </h1>
                <Reveal delay={0.16} as="p" className="cg-serif" style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)", lineHeight: 1.35, maxWidth: "20ch", color: "var(--ink)" }}>
                  <span lang="tr">{t.hero.line}</span>
                  {t.hero.lineNote && (
                    <span style={{ display: "block", marginTop: "0.6rem", fontFamily: "var(--font-grotesk)", fontStyle: "normal", fontSize: "0.8rem", letterSpacing: "0.02em", color: "var(--muted)" }}>{t.hero.lineNote}</span>
                  )}
                </Reveal>
                <Reveal delay={0.24} as="p" style={{ marginTop: "1.5rem", fontSize: "1rem", lineHeight: 1.7, color: "var(--muted)", maxWidth: "42ch" }}>
                  {t.hero.sub}
                </Reveal>
                <Reveal delay={0.32} style={{ marginTop: "2.25rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <a href="#books" className="cg-btn cg-btn-fill">{t.hero.ctaBooks} →</a>
                  <a href="/hakkimda" className="cg-btn cg-btn-ghost">{t.hero.ctaAbout}</a>
                </Reveal>
              </div>
              <Reveal delay={0.2} className="cg-portrait-wrap">
                <img src="/images/portre.jpg" alt="Berkay Doğan" className="cg-portrait" />
              </Reveal>
            </section>

            {/* KEŞFET ŞERİDİ — altbilgideki işe yarar bağlantılar, ilk ekrana yakın */}
            {(() => {
              const tr = lang === "tr";
              const linkler: [string, string, boolean?][] = [
                ["/sozler", tr ? "Sözler" : "Quotes"],
                ["/sozluk", tr ? "Kavramlar Sözlüğü" : "Lexicon"],
                ["/takvim", tr ? "Köz Takvimi" : "Ember Calendar"],
                ["/posterler", tr ? "Posterler" : "Posters"],
                ["/video", tr ? "İzle & Dinle" : "Watch & Listen"],
                ["/yazilar", tr ? "Yazılar" : "Writing"],
                ["/notlar", tr ? "Gece Notları" : "Night Notes"],
                [tr ? "/press" : "/en/#press-kit", tr ? "Basın Odası" : "Press Room"],
                ["https://necaliyor.co", tr ? "ŞİMDİ radyo ↗" : "ŞİMDİ radio ↗", true],
              ];
              return (
                <nav aria-label={tr ? "Keşfet" : "Explore"} style={{ padding: "0 clamp(1.25rem, 4vw, 3.25rem) clamp(2rem, 5vh, 3rem)" }}>
                  <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.8rem" }}>
                    {tr ? "Keşfet" : "Explore"}
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {linkler.map(([href, ad, dis]) => (
                      <a key={href} href={href} className="cg-pill" {...(dis ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.84rem", fontWeight: 500, padding: "0.6rem 1.1rem", borderRadius: "100px", border: "1px solid var(--line)", color: "var(--ink)", textDecoration: "none" }}>
                        {ad}
                      </a>
                    ))}
                  </div>
                </nav>
              );
            })()}

            {/* ŞU AN — son basın çıkışı · ŞİMDİ canlı sayaç · son gece notu */}
            <SuAnBandi lang={lang} />

            {/* GÜNÜN KÖZÜ */}
            <GununKozu t={t.kozu} verses={VERSES} />

            {/* KİTAPLAR */}
            <section id="books" className="cg-section">
              <Reveal style={{ maxWidth: "1100px", margin: "0 auto clamp(3.5rem, 8vh, 6rem)" }}><Folio no="02">{b.label}</Folio></Reveal>

              {/* Tasfiye — yeni kitap önce */}
              <Reveal className="cg-book rev">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.1rem" }}>
                  <span style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent-ink)", background: "var(--accent)", padding: "0.4rem 0.65rem", borderRadius: "100px" }}>{b.tasfiye.badge}</span>
                  <h3 className="ed-display" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}>{b.tasfiye.title}</h3>
                  <p style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{b.tasfiye.meta}</p>
                  <p className="cg-serif" style={{ fontStyle: "italic", fontSize: "clamp(1rem, 1.7vw, 1.2rem)", lineHeight: 1.6, color: "var(--ink)", maxWidth: "40ch" }}>{b.tasfiye.desc}</p>
                  <div className="ed-pull" style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.45rem)", maxWidth: "34ch" }}>
                    <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontStyle: "normal", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent-2)", marginBottom: "0.5rem" }}>{t.taste}</span>
                    <span lang="tr">{b.tasfiye.excerpt}</span>
                    {b.tasfiye.excerptNote && <span style={{ display: "block", marginTop: "0.4rem", fontFamily: "var(--font-grotesk)", fontStyle: "normal", fontSize: "0.72rem", color: "var(--muted)" }}>{b.tasfiye.excerptNote}</span>}
                  </div>
                  <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <a href={TASFIYE_URL} target="_blank" rel="noopener noreferrer" className="cg-btn cg-btn-fill">{b.tasfiye.cta} →</a>
                    <a href={lang === "tr" ? "/kitaplar/tasfiye" : "/en/#tasfiye"} className="cg-btn cg-btn-ghost">{lang === "tr" ? "Kitabın sayfası" : "About the book"}</a>
                  </div>
                  <div style={{ marginTop: "0.5rem" }}>
                    <span style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.6rem" }}>{b.buyMore}</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem 1.1rem" }}>
                      {TASFIYE_KANALLAR.map((k) => (
                        <a key={k.git} href={`/git/${k.git}/`} rel="noopener" className="cg-link" style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{k.name}</a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="cg-book-media" style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ position: "relative" }}>
                    <img src="/tasfiye-on-kapak.jpg" alt={b.tasfiye.title} loading="lazy" style={{ width: "clamp(180px, 24vw, 260px)", borderRadius: "3px", boxShadow: "0 24px 55px rgba(0,0,0,0.4)" }} />
                    <span style={{ position: "absolute", top: "0.7rem", left: "0.7rem", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent-ink)", background: "color-mix(in srgb, var(--accent) 92%, transparent)", padding: "0.35rem 0.6rem", borderRadius: "100px" }}>{b.tasfiye.badge}</span>
                  </div>
                </div>
              </Reveal>

              {/* Mürekkep ve Köz */}
              <Reveal className="cg-book">
                <div className="cg-book-media" style={{ display: "flex", justifyContent: "center" }}>
                  <img src="/murekkep-ve-koz-on-kapak.jpg" alt={b.murekkep.title} loading="lazy" style={{ width: "clamp(180px, 24vw, 260px)", borderRadius: "3px", boxShadow: "0 24px 55px rgba(20,18,15,0.22)" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.1rem" }}>
                  <span style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent-ink)", background: "var(--accent)", padding: "0.4rem 0.65rem", borderRadius: "100px" }}>{b.murekkep.badge}</span>
                  <h3 className="ed-display" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}>{b.murekkep.title}</h3>
                  <p style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{b.murekkep.meta}</p>
                  <p className="cg-serif" style={{ fontStyle: "italic", fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)", lineHeight: 1.55, color: "var(--ink)", maxWidth: "36ch" }}>{b.murekkep.desc}</p>
                  <div className="ed-pull" style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.45rem)", maxWidth: "34ch", margin: "0.3rem 0" }}>
                    <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontStyle: "normal", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent-2)", marginBottom: "0.5rem" }}>{t.taste}</span>
                    <span lang="tr">{b.murekkep.excerpt}</span>
                    {b.murekkep.excerptNote && <span style={{ display: "block", marginTop: "0.4rem", fontFamily: "var(--font-grotesk)", fontStyle: "normal", fontSize: "0.72rem", color: "var(--muted)" }}>{b.murekkep.excerptNote}</span>}
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                    <a href={TRENDYOL_URL} target="_blank" rel="noopener noreferrer" className="cg-btn cg-btn-fill">{b.murekkep.cta} →</a>
                    <a href={lang === "tr" ? "/kitaplar/murekkep-ve-koz" : "/en/#murekkep-ve-koz"} className="cg-btn cg-btn-ghost">{lang === "tr" ? "Kitabın sayfası" : "About the book"}</a>
                  </div>
                  <div style={{ marginTop: "0.5rem" }}>
                    <span style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.6rem" }}>{b.buyMore}</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem 1.1rem" }}>
                      {RETAILERS.slice(1).map((r) => (
                        <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="cg-link" style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{r.name}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* OKUR SESİ — gerçek okur yorumları */}
            <section id="okurlar" className="cg-section">
              <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <Reveal><Folio no="03">{t.reviews.label}</Folio></Reveal>
                <Reveal delay={0.05} as="h2" className="ed-display" style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", marginTop: "1.5rem", marginBottom: "clamp(2rem, 5vh, 3rem)" }}>{t.reviews.heading}</Reveal>
                <OkurSesi lang={lang} />
              </div>
            </section>

            {/* İLETİŞİM */}
            <section id="contact" className="cg-section" style={{ background: "var(--bg-2)" }}>
              <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <Reveal><Folio no="04">{t.contact.label}</Folio></Reveal>
                <Reveal delay={0.06} as="p" className="ed-display" style={{ margin: "1.75rem 0 2.5rem", fontSize: "clamp(1.9rem, 5vw, 3.8rem)", lineHeight: 1.15, maxWidth: "20ch" }}>{t.contact.line}</Reveal>
                <Reveal delay={0.12}>
                  <a href={`mailto:${EMAIL}`} className="cg-huge" style={{ display: "inline-block", fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)", color: "var(--ink)", letterSpacing: "-0.02em" }}>{EMAIL}</a>
                </Reveal>
                <Reveal delay={0.18} style={{ marginTop: "3rem", display: "flex", gap: "2rem", flexWrap: "wrap", fontSize: "0.76rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="cg-link">YouTube</a>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="cg-link">Instagram</a>
                  <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="cg-link">Substack</a>
                  <a href={lang === "tr" ? "/press" : "/en/#press-kit"} className="cg-link">{lang === "tr" ? "Basın kiti" : "Press kit"}</a>
                </Reveal>
              </div>
            </section>
          </main>
        );
      }}
    </Kabuk>
  );
}
