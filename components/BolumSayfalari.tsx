"use client";

import { REVIEWS, MEDIA, PLAYLISTS, EMBER_FRAGMENTS, VERSES } from "@/lib/site";
import { Kabuk, Reveal, Eyebrow } from "./Kabuk";
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
                <Reveal><Eyebrow>{t.about.label}</Eyebrow></Reveal>
                <Reveal delay={0.06} as="h1" className="cg-huge" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", marginTop: "1.25rem" }}>{t.about.heading}</Reveal>
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
                  <Reveal key={i} as="p" delay={i * 0.07} style={{ fontSize: i === 0 ? "clamp(1.15rem, 2vw, 1.5rem)" : "1.02rem", fontFamily: i === 0 ? "var(--font-serif)" : "var(--font-grotesk)", lineHeight: i === 0 ? 1.5 : 1.75, color: i === 0 ? "var(--ink)" : "var(--muted)" }}>{p}</Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* TANINIRLIK / BASINDA */}
          <section id="recognition" className="cg-section">
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <Reveal><Eyebrow>{t.recognition.label}</Eyebrow></Reveal>
              <Reveal delay={0.05} as="h2" className="cg-huge" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", marginTop: "1.25rem", maxWidth: "16ch" }}>{t.recognition.heading}</Reveal>
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
              <Reveal><Eyebrow>{t.reviews.label}</Eyebrow></Reveal>
              <Reveal delay={0.05} as="h2" className="cg-huge" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", marginTop: "1.25rem", marginBottom: "clamp(2.5rem, 6vh, 4rem)" }}>{t.reviews.heading}</Reveal>
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
              <Reveal><Eyebrow>{t.media.label}</Eyebrow></Reveal>
              <Reveal delay={0.05} as="h1" className="cg-huge" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", marginTop: "1.25rem" }}>{t.media.heading}</Reveal>
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

/* ---------- DENEYİMLER: tüm interaktif işlerin dizini ---------- */
const DENEYIMLER: { href: string; glyph: string; tr: string; en: string; fr: string; trSub: string; enSub: string; frSub: string }[] = [
  { href: "/mahkeme", glyph: "◈", tr: "Tasfiye Mahkemesi", en: "The Tribunal", fr: "Le Tribunal", trSub: "5 soru, 1 hüküm", enSub: "5 questions, 1 verdict", frSub: "5 questions, 1 verdict" },
  { href: "/leke", glyph: "❖", tr: "Mürekkep Lekesi", en: "The Ink Blot", fr: "La Tache d'Encre", trSub: "sende kalan dize", enSub: "the verse that stays", frSub: "le vers qui reste" },
  { href: "/fragman", glyph: "▸", tr: "Fragman", en: "The Trailer", fr: "La Bande-annonce", trSub: "kitabın sinematik yolculuğu", enSub: "the book's cinematic journey", frSub: "le voyage cinématique" },
  { href: "/kapak", glyph: "✳", tr: "Yaşayan Kapak", en: "The Living Cover", fr: "La Couverture Vivante", trSub: "yaz, buruştur, bırak", enSub: "type, crumple, release", frSub: "écris, froisse, lâche" },
  { href: "/film", glyph: "▣", tr: "Film", en: "The Film", fr: "Le Film", trSub: "35 saniyelik tanıtım", enSub: "a 35-second film", frSub: "un film de 35 secondes" },
  { href: "/evren", glyph: "✦", tr: "Köz Evreni", en: "Ember Universe", fr: "Univers de Braise", trSub: "dize takımyıldızları", enSub: "verse constellations", frSub: "constellations de vers" },
  { href: "/siir", glyph: "❋", tr: "Canlı Şiir", en: "Living Poem", fr: "Poème Vivant", trSub: "kelime kelime akan dizeler", enSub: "verses flowing word by word", frSub: "les vers qui coulent" },
  { href: "/masa", glyph: "✎", tr: "Şairin Masası", en: "The Poet's Desk", fr: "Le Bureau du Poète", trSub: "keşfedilebilir sahne", enSub: "an explorable scene", frSub: "une scène à explorer" },
  { href: "/duvar", glyph: "▤", tr: "Tasfiye Duvarı", en: "The Wall", fr: "Le Mur", trSub: "bir şeyi bırak, hafifle", enSub: "let something go", frSub: "laisse partir quelque chose" },
  { href: "/kahin", glyph: "◉", tr: "Kâhin", en: "The Oracle", fr: "L'Oracle", trSub: "bir kelime söyle, dize düşsün", enSub: "say a word, receive a verse", frSub: "dis un mot, reçois un vers" },
  { href: "/takvim", glyph: "◷", tr: "Köz Takvimi", en: "Ember Calendar", fr: "Calendrier", trSub: "her güne bir söz", enSub: "a verse for every day", frSub: "un vers pour chaque jour" },
  { href: "/kart", glyph: "▢", tr: "Alıntı Kartı", en: "Quote Card", fr: "Carte de Citation", trSub: "dize seç, indir, paylaş", enSub: "pick, download, share", frSub: "choisis, télécharge, partage" },
];

export function DeneyimlerSayfa() {
  return (
    <Kabuk>
      {(lang, t) => (
        <main className="cg">
          <section className="cg-section" style={{ ...ustBosluk, borderTop: "none" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <Reveal><Eyebrow>{t.nav.experiences}</Eyebrow></Reveal>
              <Reveal delay={0.05} as="h1" className="cg-huge" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", marginTop: "1.25rem", maxWidth: "18ch" }}>
                {lang === "tr" ? "Okumakla kalma; içine gir." : lang === "fr" ? "Ne fais pas que lire ; entre dedans." : "Don't just read; step inside."}
              </Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem", marginTop: "clamp(2.5rem, 6vh, 4rem)" }}>
                {DENEYIMLER.map((d, i) => (
                  <Reveal key={d.href} delay={(i % 4) * 0.06}>
                    <a href={d.href} className="bento-card" style={{ flexDirection: "column", gap: "0.6rem", height: "100%", padding: "1.5rem 1.6rem", borderRadius: "18px" }}>
                      <span style={{ fontSize: "1.4rem", color: "var(--accent)", lineHeight: 1 }} aria-hidden="true">{d.glyph}</span>
                      <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.02em", color: "var(--ink)" }}>{d[lang]}</span>
                      <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "0.95rem", color: "var(--muted)" }}>{d[(lang + "Sub") as "trSub"]}</span>
                    </a>
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
