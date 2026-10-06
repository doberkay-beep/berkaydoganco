"use client";

import { REVIEWS, MEDIA, PLAYLISTS, type Lang, type Copy } from "@/lib/site";
import { BasinDuvari } from "./BasinDuvari";
import { Masada } from "./Masada";
import { Kabuk, Reveal } from "./Kabuk";
import { Folio } from "./Dergi";
import { OkurMektubu } from "./OkurMektubu";
import { Sahne } from "./Sahne";
import { EKRAN } from "@/lib/basinda";

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
                <Reveal delay={0.06} as="h1" className="ed-display" style={{ fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)", marginTop: "1.5rem", maxWidth: "14ch" }}>{t.about.heading}</Reveal>
                <Reveal delay={0.12} style={{ marginTop: "2.5rem" }}>
                  <p style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>{t.about.worksLabel}</p>
                  {[
                    ...t.about.works,
                    // TV ve video çıkışları lib/basinda'dan — yayınlandıkça çizelgeye kendiliğinden düşer.
                    ...[...EKRAN].reverse().map((e) => ({
                      year: new Date(e.tarihISO).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", { month: "short", year: "numeric" }),
                      title: e.kanal,
                      kind: e.baslik,
                      href: e.link,
                    })),
                  ].map((w, i) => {
                    const dis = w.href?.startsWith("http");
                    const satir = (
                      <>
                        <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, color: "var(--accent-2)", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", minWidth: "8.5ch" }}>{w.year}</span>
                        <span style={{ flex: 1 }}>
                          <span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: "1.15rem", lineHeight: 1.25 }}>{w.title}{w.href && <span style={{ color: "var(--accent-2)", fontSize: "0.85rem" }}> {dis ? "↗" : "→"}</span>}</span>
                          <span style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{w.kind}</span>
                        </span>
                      </>
                    );
                    const kutu: React.CSSProperties = { display: "flex", gap: "1.25rem", alignItems: "baseline", padding: "0.9rem 0", borderTop: "1px solid var(--line)", color: "var(--ink)", textDecoration: "none" };
                    return w.href ? (
                      <a key={i} href={w.href} style={kutu} {...(dis ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{satir}</a>
                    ) : (
                      <div key={i} style={kutu}>{satir}</div>
                    );
                  })}
                </Reveal>
                <Masada lang={lang} />
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
                    <span style={{ display: "block", fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", lineHeight: 1, color: "var(--accent-2)", letterSpacing: "-0.03em" }}>{tile.value}</span>
                    <span style={{ display: "block", marginTop: "0.85rem", fontSize: "0.82rem", lineHeight: 1.5, color: "var(--muted)" }}>{tile.label}</span>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.1} style={{ marginTop: "clamp(3rem, 6vh, 4.5rem)", borderTop: "1px solid var(--line)", paddingTop: "2rem" }}>
                <span style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>{t.recognition.pressLabel}</span>
                <BasinDuvari lang={lang} />
              </Reveal>
            </div>
          </section>

          {/* OKUR YORUMLARI */}
          <section id="okurlar" className="cg-section" style={{ background: "var(--bg-2)" }}>
            <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
              <Reveal><Folio no="02">{t.reviews.label}</Folio></Reveal>
              <Reveal delay={0.05} as="h2" className="ed-display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", marginTop: "1.5rem", marginBottom: "clamp(2.5rem, 6vh, 4rem)" }}>{t.reviews.heading}</Reveal>
              <div className="cg-reviews">
                {REVIEWS.map((r, i) => (
                  <Reveal key={i} delay={(i % 3) * 0.06} className="cg-review-card">
                    <blockquote style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: "1.1rem", lineHeight: 1.55, color: "var(--ink)" }}>&ldquo;{r.text}&rdquo;</blockquote>
                    <span style={{ marginTop: "1.25rem", fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent-2)" }}>{r.source} · {r.kitap}</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* OKUR MEKTUBU — form + onaylı mektuplar (menüde ayrı sayfa yok; /mektup yine açık) */}
          <section id="mektup" className="cg-section">
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <Reveal><Folio no="03">{lang === "tr" ? "Okur mektupları" : "Reader letters"}</Folio></Reveal>
              <Reveal delay={0.05} style={{ marginTop: "1.5rem" }}><OkurMektubu lang={lang} /></Reveal>
            </div>
          </section>
        </main>
      )}
    </Kabuk>
  );
}

/* ---------- DİNLE: podcast + ekran + çalma listeleri (/video sayfasının alt bölümü) ---------- */
export function DinleBolumu({ lang, t }: { lang: Lang; t: Copy }) {
  return (
          <section id="dinle" className="cg-section">
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <Reveal><Folio no="02">{lang === "tr" ? "Dinle" : "Listen"}</Folio></Reveal>
              <Reveal delay={0.05} as="h2" className="ed-display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", marginTop: "1.5rem" }}>{t.media.heading}</Reveal>
              <Reveal delay={0.1} as="p" style={{ marginTop: "1.25rem", fontSize: "1rem", lineHeight: 1.7, color: "var(--muted)", maxWidth: "48ch" }}>{t.media.podcastDesc}</Reveal>

              {/* Ekran — TV & video röportajlar (lib/basinda; boşken görünmez) */}
              {EKRAN.length > 0 && (
                <Reveal delay={0.11} style={{ marginTop: "2.5rem" }}>
                  <span style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>
                    {lang === "tr" ? "Ekran" : "On Screen"}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                    {EKRAN.map((e) => (
                      <div key={e.tarihISO + e.kanal} style={{ borderLeft: "2px solid var(--accent-2, var(--accent))", paddingLeft: "1rem" }}>
                        <p style={{ fontSize: "0.66rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)" }}>
                          {new Date(e.tarihISO).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", { day: "numeric", month: "long", year: "numeric" })} · {e.tur === "tv" ? "TV" : e.tur}
                        </p>
                        <p style={{ fontFamily: "var(--font-grotesk)", fontWeight: 600, marginTop: "0.25rem", color: "var(--ink)" }}>{e.kanal}</p>
                        <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>{e.baslik}</p>
                        {e.link && (
                          <a href={e.link} target="_blank" rel="noopener noreferrer" className="cg-link" style={{ fontSize: "0.8rem", color: "var(--accent-2, var(--accent))" }}>
                            {lang === "tr" ? "izle" : "watch"} ↗
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}

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

              {/* Şiir Rafım Radyosu — sesli şiir okumaları (siirrafim.art'ın YouTube çalma listesi) */}
              <Reveal delay={0.13} style={{ marginTop: "2.75rem" }}>
                <span style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.6rem" }}>
                  {lang === "tr" ? "Şiir dinle — Şiir Rafım Radyosu" : "Listen to poetry — Şiir Rafım Radio"}
                </span>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--muted)", marginBottom: "1rem", maxWidth: "56ch" }}>
                  {lang === "tr"
                    ? "Nazım Hikmet'ten Can Yücel'e, Ahmed Arif'ten Ataol Behramoğlu'na 200'den fazla sesli şiir okuması. Hazırlayan: "
                    : "More than 200 spoken readings, from Nazım Hikmet to Can Yücel, Ahmed Arif and Ataol Behramoğlu. Curated by "}
                  <a href="https://www.siirrafim.art/p/siir-rafim-radyosu.html" target="_blank" rel="noopener noreferrer" className="cg-link" style={{ color: "var(--accent-2)" }}>Şiir Rafım ↗</a>
                </p>
                <div className="cg-embed" style={{ aspectRatio: "16 / 9" }}>
                  <iframe title="Şiir Rafım Radyosu" src="https://www.youtube-nocookie.com/embed/videoseries?list=PLbW6sTxKenw8Ok_ErKcKTP-leBAbBTAIS&rel=0" width="100%" height="100%" frameBorder="0" allow="encrypted-media; picture-in-picture" allowFullScreen loading="lazy" style={{ display: "block" }} />
                </div>
              </Reveal>

              {PLAYLISTS.length > 0 && (
                <Reveal delay={0.16} style={{ marginTop: "2.75rem" }}>
                  <span style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>
                    {lang === "tr" ? "Şu sıralar dinlediklerim" : "What I'm listening to"}
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
  );
}

/* ---------- İNCE SARMALAYICILAR ---------- */
export function SahneSayfa() {
  return (
    <Kabuk>
      {(lang) => (
        <main className="cg" style={{ paddingTop: "4.5rem" }}>
          <section className="cg-section" style={{ paddingTop: "2rem" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <h1 className="ed-display" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                {lang === "tr" ? "Sahne" : "On Stage"}
              </h1>
              <Sahne lang={lang} />
            </div>
          </section>
        </main>
      )}
    </Kabuk>
  );
}

export function MektupSayfa() {
  return (
    <Kabuk>
      {(lang) => (
        <main className="cg" style={{ paddingTop: "4.5rem" }}>
          <section className="cg-section" style={{ paddingTop: "2rem" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <h1 className="ed-display" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
                {lang === "tr" ? "Okur Mektupları" : "Reader Letters"}
              </h1>
              <OkurMektubu lang={lang} />
            </div>
          </section>
        </main>
      )}
    </Kabuk>
  );
}
