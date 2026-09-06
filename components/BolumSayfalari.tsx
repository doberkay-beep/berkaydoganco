"use client";

import { REVIEWS, MEDIA, PLAYLISTS, EMBER_FRAGMENTS, VERSES } from "@/lib/site";
import { Kabuk, Reveal } from "./Kabuk";
import { Folio } from "./Dergi";
import { DENEYIMLER, BOLUMLER, FIHRIST_NO } from "@/lib/deneyimler";
import { TasfiyeDuvari } from "./TasfiyeDuvari";
import { Kahin } from "./Kahin";
import { AlintiKarti } from "./AlintiKarti";
import { Projeler } from "./Projeler";

/* Ana sayfadan ayrılan bölüm sayfaları — hepsi Kabuk içinde, cg-* stilleriyle. */

const ustBosluk: React.CSSProperties = { paddingTop: "6.5rem" };

/* ---------- HAKKIMDA: hakkımda + tanınırlık + okur yorumları ---------- */
export function HakkimdaSayfa() {
  return (
    <Kabuk>
      {(lang, t) => (
        <main className="cg">
          <section className="cg-section" style={{ ...ustBosluk, borderTop: "none" }}>
            <div className="cg-about-grid">
              <div>
                <Reveal><Folio no="—">{t.about.label}</Folio></Reveal>
                <Reveal delay={0.06} as="h1" className="ed-display" style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)", marginTop: "1.5rem" }}>{t.about.heading}</Reveal>
                <Reveal delay={0.12} style={{ marginTop: "2.5rem" }}>
                  <p style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>{t.about.worksLabel}</p>
                  {t.about.works.map((w, i) => (
                    <div key={i} style={{ display: "flex", gap: "1.25rem", alignItems: "baseline", padding: "0.9rem 0", borderTop: "1px solid var(--line)" }}>
                      <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, color: "var(--accent)", fontSize: "0.9rem", minWidth: "3ch" }}>{w.year}</span>
                      <span style={{ flex: 1 }}>
                        <span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: "1.15rem", lineHeight: 1.25 }}>{w.title}</span>
                        <span style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{w.kind}</span>
                      </span>
                    </div>
                  ))}
                </Reveal>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {t.about.paras.map((p, i) => (
                  <Reveal key={i} as="p" delay={i * 0.07} className={i === 0 ? "ed-dropcap" : undefined} style={{ fontSize: i === 0 ? "clamp(1.15rem, 2vw, 1.5rem)" : "1.02rem", fontFamily: i === 0 ? "var(--font-serif)" : "var(--font-grotesk)", lineHeight: i === 0 ? 1.55 : 1.75, color: i === 0 ? "var(--ink)" : "var(--muted)" }}>{p}</Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* TANINIRLIK / BASINDA */}
          <section id="recognition" className="cg-section">
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <Reveal><Folio no="01">{t.recognition.label}</Folio></Reveal>
              <Reveal delay={0.05} as="h2" className="ed-display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", marginTop: "1.5rem", maxWidth: "18ch" }}>{t.recognition.heading}</Reveal>
              <div className="cg-tiles">
                {t.recognition.tiles.map((tile, i) => (
                  <Reveal key={i} delay={i * 0.07} style={{ borderTop: "2px solid var(--accent)", paddingTop: "1.25rem" }}>
                    <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", lineHeight: 1, color: "var(--accent)", letterSpacing: "-0.03em" }}>{tile.value}</span>
                    <span style={{ display: "block", marginTop: "0.85rem", fontSize: "0.82rem", lineHeight: 1.5, color: "var(--muted)" }}>{tile.label}</span>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.1} style={{ marginTop: "clamp(3rem, 6vh, 4.5rem)", borderTop: "1px solid var(--line)", paddingTop: "2rem" }}>
                <span style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>{t.recognition.pressLabel}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                  {t.recognition.press.map((p) => (
                    <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="cg-press-row" style={{ display: "flex", gap: "1rem", alignItems: "baseline", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 500, fontSize: "1.05rem", minWidth: "9ch" }}>{p.name}</span>
                      <span style={{ color: "var(--muted)", fontSize: "0.92rem" }}>{p.detail} <span style={{ color: "var(--accent)" }}>↗</span></span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* OKUR YORUMLARI */}
          <section className="cg-section" style={{ background: "var(--bg-2)" }}>
            <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
              <Reveal><Folio no="02">{t.reviews.label}</Folio></Reveal>
              <Reveal delay={0.05} as="h2" className="ed-display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", marginTop: "1.5rem", marginBottom: "clamp(2.5rem, 6vh, 4rem)" }}>{t.reviews.heading}</Reveal>
              <div className="cg-reviews">
                {REVIEWS.map((r, i) => (
                  <Reveal key={i} delay={(i % 3) * 0.06} className="cg-review-card">
                    <blockquote style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: "1.1rem", lineHeight: 1.55, color: "var(--ink)" }}>&ldquo;{r.text}&rdquo;</blockquote>
                    <span style={{ marginTop: "1.25rem", fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)" }}>{r.source}</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}
    </Kabuk>
  );
}

/* ---------- MEDYA: podcast + youtube + çalma listeleri ---------- */
export function MedyaSayfa() {
  return (
    <Kabuk>
      {(lang, t) => (
        <main className="cg">
          <section className="cg-section" style={{ ...ustBosluk, borderTop: "none" }}>
            <div style={{ maxWidth: "860px", margin: "0 auto" }}>
              <Reveal><Folio no="—">{t.media.label}</Folio></Reveal>
              <Reveal delay={0.05} as="h1" className="ed-display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", marginTop: "1.5rem" }}>{t.media.heading}</Reveal>
              <Reveal delay={0.1} as="p" style={{ marginTop: "1.25rem", fontSize: "1rem", lineHeight: 1.7, color: "var(--muted)", maxWidth: "48ch" }}>{t.media.podcastDesc}</Reveal>

              <Reveal delay={0.12} style={{ marginTop: "2.5rem" }}>
                <span style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>{t.media.podcast}</span>
                <div className="cg-embed">
                  <iframe title="Şairin Hesabı — Spotify" src={`https://open.spotify.com/embed/show/${MEDIA.spotifyShow}?utm_source=generator`} width="100%" height="232" frameBorder="0" allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ display: "block" }} />
                </div>
                <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
                  {MEDIA.episodes.map((ep, i) => (
                    <div key={i} className="cg-embed">
                      <iframe title={`Bölüm ${i + 1}`} src={`https://open.spotify.com/embed/episode/${ep}?utm_source=generator`} width="100%" height="152" frameBorder="0" allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ display: "block" }} />
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.14} style={{ marginTop: "2.75rem" }}>
                <span style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>{t.media.video}</span>
                <div className="cg-embed" style={{ aspectRatio: "16 / 9" }}>
                  <iframe title="YouTube — Berkay Doğan" src={`https://www.youtube.com/embed/${MEDIA.youtube}`} width="100%" height="100%" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" style={{ display: "block" }} />
                </div>
              </Reveal>

              {PLAYLISTS.length > 0 && (
                <Reveal delay={0.16} style={{ marginTop: "2.75rem" }}>
                  <span style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>
                    {lang === "tr" ? "Şu sıralar dinlediklerim" : lang === "fr" ? "Ce que j'écoute en ce moment" : "What I'm listening to"}
                  </span>
                  <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                    {PLAYLISTS.map((pl) => (
                      <a key={pl.path} href={`https://music.apple.com${pl.path}`} target="_blank" rel="noopener noreferrer" className="cg-playlist">
                        <span className="cg-playlist-icon" aria-hidden="true">♪</span>
                        <span className="cg-playlist-name">{pl.name}</span>
                        <span className="cg-playlist-meta">Apple Music →</span>
                      </a>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        </main>
      )}
    </Kabuk>
  );
}

/* ---------- DENEYİMLER: dergi fihristi — kapak konusu + üç bölüm ---------- */




export function DeneyimlerSayfa() {
  const kapak = DENEYIMLER[0]; // Tasfiye Mahkemesi — kapak konusu
  return (
    <Kabuk>
      {(lang, t) => (
        <main className="cg">
          <section className="cg-section" style={{ ...ustBosluk, borderTop: "none" }}>
            <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
              <Reveal><Folio no="—">{t.nav.experiences}</Folio></Reveal>
              <Reveal delay={0.05} as="h1" className="ed-display" style={{ fontSize: "clamp(2.8rem, 7vw, 5.6rem)", marginTop: "1.5rem", maxWidth: "16ch" }}>
                {lang === "tr" ? "Okumakla kalma; içine gir." : lang === "fr" ? "Ne fais pas que lire ; entre dedans." : "Don't just read; step inside."}
              </Reveal>
              <Reveal delay={0.1} as="p" className="cg-serif" style={{ marginTop: "1.5rem", fontSize: "clamp(1.05rem, 2vw, 1.3rem)", lineHeight: 1.6, color: "var(--muted)", maxWidth: "52ch" }}>
                {lang === "tr"
                  ? "Buradaki her şey kitapların içinden doğdu: okurunu sanık koltuğuna oturtan bir mahkeme, ne gördüğünü soran mürekkep lekeleri, dizelerden kurulan bir gökyüzü. Hepsi tarayıcında, hepsi ücretsiz — bir dakikan varsa bir kapı aç."
                  : lang === "fr"
                  ? "Tout ici est né des livres : un tribunal qui met le lecteur au banc des accusés, des taches d'encre, un ciel fait de vers. Tout dans ton navigateur, tout gratuit — ouvre une porte."
                  : "Everything here was born inside the books: a tribunal that puts the reader on trial, ink blots that ask what you see, a sky built from verses. All in your browser, all free — if you have a minute, open a door."}
              </Reveal>

              {/* KAPAK KONUSU — Tasfiye Mahkemesi */}
              <Reveal delay={0.14} style={{ marginTop: "clamp(2.5rem, 6vh, 4rem)" }}>
                <a href={kapak.href} className="ed-cover">
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--accent)" }}>
                      {lang === "tr" ? "Kapak konusu" : lang === "fr" ? "À la une" : "Cover story"}
                    </span>
                    <span className="ed-display" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "var(--ink)" }}>{kapak[lang]}</span>
                    <span style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.95rem", lineHeight: 1.65, color: "var(--muted)", maxWidth: "44ch" }}>{kapak[(lang + "Desc") as "trDesc"]}</span>
                    <span className="cg-btn cg-btn-fill" style={{ marginTop: "0.5rem" }}>
                      {lang === "tr" ? "Mahkemeye çık" : lang === "fr" ? "Comparais" : "Take the stand"} →
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "0.75rem" }} aria-hidden="true">
                    <span style={{ fontSize: "clamp(4rem, 9vw, 7rem)", lineHeight: 1, color: "var(--accent)", opacity: 0.85 }}>{kapak.glyph}</span>
                    <span className="cg-serif" style={{ fontStyle: "italic", fontSize: "1.05rem", color: "var(--muted)" }}>{kapak[(lang + "Sub") as "trSub"]}</span>
                  </div>
                </a>
              </Reveal>

              {/* FİHRİST — üç bölüm */}
              {BOLUMLER.map((bolum, bi) => (
                <Reveal key={bolum.tr} delay={0.06} style={{ marginTop: "clamp(3rem, 7vh, 4.5rem)" }}>
                  <Folio no={String(bi + 1).padStart(2, "0")}>{bolum[lang]}</Folio>
                  <div className="ed-toc" style={{ marginTop: "1.25rem" }}>
                    {bolum.uyeler.map((href) => {
                      const d = DENEYIMLER.find((x) => x.href === href)!;
                      return (
                        <a key={d.href} href={d.href} className="ed-toc-row">
                          <span className="ed-toc-no">{FIHRIST_NO[d.href]}</span>
                          <span className="ed-toc-name"><span className="glyph" aria-hidden="true">{d.glyph}</span>{d[lang]}</span>
                          <span className="ed-toc-desc">{d[(lang + "Desc") as "trDesc"]}</span>
                          <span className="ed-toc-arrow" aria-hidden="true">→</span>
                        </a>
                      );
                    })}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </main>
      )}
    </Kabuk>
  );
}

/* ---------- İNCE SARMALAYICILAR ---------- */
export function ProjelerSayfa() {
  return (
    <Kabuk>
      {(lang) => (
        <main className="cg" style={{ paddingTop: "4.5rem" }}>
          <Projeler lang={lang} />
        </main>
      )}
    </Kabuk>
  );
}

export function DuvarSayfa() {
  return (
    <Kabuk>
      {(lang, t) => (
        <main className="cg" style={{ paddingTop: "4.5rem" }}>
          <TasfiyeDuvari t={t.duvari} fragments={EMBER_FRAGMENTS} />
        </main>
      )}
    </Kabuk>
  );
}

export function KahinSayfa() {
  return (
    <Kabuk>
      {(lang, t) => (
        <main className="cg" style={{ paddingTop: "4.5rem" }}>
          <Kahin t={t.kahin} verses={VERSES} />
        </main>
      )}
    </Kabuk>
  );
}

export function KartSayfa() {
  return (
    <Kabuk>
      {(lang) => (
        <main className="cg" style={{ paddingTop: "4.5rem" }}>
          <AlintiKarti lang={lang} />
        </main>
      )}
    </Kabuk>
  );
}
