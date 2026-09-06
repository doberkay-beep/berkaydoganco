"use client";

import {
  TASFIYE_URL, TRENDYOL_URL, SUBSTACK_URL, YOUTUBE_URL, INSTAGRAM_URL, EMAIL,
  RETAILERS, VERSES, type Lang, type Copy,
} from "@/lib/site";
import { GununKozu } from "./GununKozu";
import { BentoHub } from "./BentoHub";
import { Kabuk, Reveal } from "./Kabuk";
import { Folio, Masthead } from "./Dergi";

/* Ana sayfa — inceltilmiş: Tasfiye banner'ı + hero + bento + günün közü +
   kitaplar + iletişim. Hakkımda/medya/projeler/deneyimler kendi sayfalarında. */

// Tasfiye'nin diğer satıcıları — /git üzerinden (ölçümlü)
const TASFIYE_KANALLAR: { name: string; git: string }[] = [
  { name: "bkmkitap", git: "bkmkitap" },
  { name: "KitapStore", git: "kitapstore" },
  { name: "İskenderiye Yayınları", git: "iskenderiye" },
];

function TasfiyeBanner({ t }: { t: Copy }) {
  return (
    <div className="cg" style={{
      margin: "4.6rem clamp(1.25rem, 4vw, 3.25rem) 0",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.25rem", flexWrap: "wrap",
      padding: "1rem 1.4rem", borderRadius: "16px",
      background: "radial-gradient(120% 160% at 85% 0%, rgba(229,64,42,0.16), transparent 55%), var(--glass-bg)",
      border: "1px solid var(--glass-border)",
      backdropFilter: "blur(18px) saturate(150%)", WebkitBackdropFilter: "blur(18px) saturate(150%)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: "min(100%, 300px)", flex: 1 }}>
        <img src="/tasfiye-kapak-400.jpg" alt="Tasfiye" style={{ width: "46px", borderRadius: "3px", boxShadow: "0 10px 22px rgba(0,0,0,0.4)" }} />
        <span className="cg-serif" style={{ fontStyle: "italic", fontSize: "clamp(0.98rem, 2vw, 1.15rem)", lineHeight: 1.4, color: "var(--ink)" }}>{t.banner.line}</span>
      </div>
      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
        <a href="/git/trendyol/" rel="noopener" className="cg-btn cg-btn-fill" style={{ padding: "0.7rem 1.3rem" }}>{t.banner.buy} →</a>
        <a href="/fragman" className="cg-btn cg-btn-ghost" style={{ padding: "0.7rem 1.3rem" }}>{t.banner.watch}</a>
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
            <section className="cg-hero" style={{ minHeight: "84svh", paddingTop: "2.5rem" }}>
              <div>
                <h1 className="ed-display" style={{ fontSize: "clamp(3.4rem, 10vw, 9rem)", margin: "0 0 1.75rem" }} aria-label="Berkay Doğan">
                  {["Berkay", "Doğan"].map((word, wi) => (
                    <span key={word} style={{ display: "block" }} aria-hidden="true">
                      {[...word].map((ch, i) => (
                        <span key={i} className="cg-ign" style={{ animationDelay: `${0.15 + (wi * 6 + i) * 0.05}s` }}>{ch}</span>
                      ))}
                    </span>
                  ))}
                </h1>
                <Reveal delay={0.16} as="p" className="cg-serif" style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)", lineHeight: 1.35, maxWidth: "20ch", color: "var(--ink)" }}>
                  {t.hero.line}
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

            {/* BENTO PANO */}
            <BentoHub lang={lang} />

            {/* GÜNÜN KÖZÜ */}
            <GununKozu t={t.kozu} verses={VERSES} />

            {/* KİTAPLAR */}
            <section id="books" className="cg-section">
              <Reveal style={{ maxWidth: "1100px", margin: "0 auto clamp(3.5rem, 8vh, 6rem)" }}><Folio no="03">{b.label}</Folio></Reveal>

              {/* Tasfiye — yeni kitap önce */}
              <Reveal className="cg-book rev">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.1rem" }}>
                  <span style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent-ink)", background: "var(--accent)", padding: "0.4rem 0.65rem", borderRadius: "100px" }}>{b.tasfiye.badge}</span>
                  <h3 className="ed-display" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}>{b.tasfiye.title}</h3>
                  <p style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{b.tasfiye.meta}</p>
                  <p className="cg-serif" style={{ fontStyle: "italic", fontSize: "clamp(1rem, 1.7vw, 1.2rem)", lineHeight: 1.6, color: "var(--ink)", maxWidth: "40ch" }}>{b.tasfiye.desc}</p>
                  <div className="ed-pull" style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.45rem)", maxWidth: "34ch" }}>
                    <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontStyle: "normal", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.5rem" }}>{t.taste}</span>
                    {b.tasfiye.excerpt}
                  </div>
                  <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <a href={TASFIYE_URL} target="_blank" rel="noopener noreferrer" className="cg-btn cg-btn-fill">{b.tasfiye.cta} →</a>
                    <a href="/kitaplar/tasfiye" className="cg-btn cg-btn-ghost">{lang === "tr" ? "Kitabın sayfası" : lang === "fr" ? "Page du livre" : "Book page"}</a>
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
                    <span style={{ position: "absolute", top: "0.7rem", left: "0.7rem", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F1EDE4", background: "rgba(229,64,42,0.9)", padding: "0.35rem 0.6rem", borderRadius: "100px" }}>{b.tasfiye.badge}</span>
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
                    <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontStyle: "normal", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.5rem" }}>{t.taste}</span>
                    {b.murekkep.excerpt}
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                    <a href={TRENDYOL_URL} target="_blank" rel="noopener noreferrer" className="cg-btn cg-btn-fill">{b.murekkep.cta} →</a>
                    <a href="/kitaplar/murekkep-ve-koz" className="cg-btn cg-btn-ghost">{lang === "tr" ? "Kitabın sayfası" : lang === "fr" ? "Page du livre" : "Book page"}</a>
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
                  <a href="/press" className="cg-link">{lang === "tr" ? "Basın kiti" : lang === "fr" ? "Presse" : "Press kit"}</a>
                </Reveal>
              </div>
            </section>
          </main>
        );
      }}
    </Kabuk>
  );
}
