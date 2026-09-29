"use client";

import { Kabuk, Reveal } from "./Kabuk";
import { Folio, Masthead } from "./Dergi";
import { KANAL_URL, videoUrl, kapakUrl, type Video } from "@/lib/youtube";
import type { Lang } from "@/lib/site";

// /video — kanal arşivi. Liste build sırasında YouTube RSS'inden gelir;
// her deploy'da tazelenir. Boşken nazik durum (Sahne kalıbı).

function tarihYaz(iso: string, lang: Lang): string {
  try {
    return new Date(iso).toLocaleDateString(lang === "tr" ? "tr-TR" : lang === "fr" ? "fr-FR" : "en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });
  } catch { return ""; }
}

export function VideoArsivi({ videolar }: { videolar: Video[] }) {
  return (
    <Kabuk>
      {(lang) => {
        const L = (tr: string, en: string, fr: string) => (lang === "tr" ? tr : lang === "fr" ? fr : en);
        return (
          <main className="cg" id="top" style={{ paddingTop: "6.5rem" }}>
            <div style={{ margin: "0 clamp(1.25rem, 4vw, 3.25rem)" }}>
              <Masthead left="berkaydogan.co" center={L("video arşivi", "video archive", "archives vidéo")} right="YouTube" />
            </div>

            <section className="cg-section" style={{ borderTop: "none", paddingTop: "3rem" }}>
              <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <Reveal><Folio no="01">{L("Video", "Video", "Vidéo")}</Folio></Reveal>
                <Reveal delay={0.06} as="p" className="ed-display" style={{ margin: "1.5rem 0 1rem", fontSize: "clamp(2.2rem, 6vw, 4.2rem)", lineHeight: 1.05, maxWidth: "22ch" }}>
                  {L("Kamera açık; hesap sürüyor.", "Camera rolling; the reckoning continues.", "Caméra allumée ; les comptes continuent.")}
                </Reveal>
                <Reveal delay={0.1} as="p" style={{ color: "var(--muted)", maxWidth: "52ch", lineHeight: 1.7 }}>
                  {L(
                    "Fragmanlar, kısa filmler ve yazarlık günlüğü — kanalda yayımlanan her şey burada da birikir.",
                    "Trailers, short films and the writer's log — everything published on the channel gathers here too.",
                    "Bandes-annonces, courts métrages et journal d'écrivain — tout ce qui paraît sur la chaîne s'accumule ici.",
                  )}
                </Reveal>
                <Reveal delay={0.14} style={{ marginTop: "1.75rem" }}>
                  <a href={KANAL_URL} target="_blank" rel="noopener noreferrer" className="cg-btn cg-btn-fill">
                    {L("Kanala abone ol", "Subscribe on YouTube", "S'abonner sur YouTube")} →
                  </a>
                </Reveal>

                {videolar.length === 0 ? (
                  <Reveal delay={0.1} as="p" style={{ marginTop: "3.5rem", fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--muted)" }}>
                    {L(
                      "Arşiv şu an sessiz — ilk kayıt düştüğünde burada belirecek.",
                      "The archive is quiet for now — the first recording will appear here.",
                      "Les archives sont silencieuses — le premier enregistrement apparaîtra ici.",
                    )}
                  </Reveal>
                ) : (
                  <div style={{ marginTop: "3.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
                    {videolar.map((v, i) => (
                      <Reveal key={v.id} delay={Math.min(0.04 * i, 0.3)}>
                        <a
                          href={videoUrl(v)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-card"
                          style={{ display: "block", overflow: "hidden", color: "var(--ink)", textDecoration: "none" }}
                        >
                          <span style={{ position: "relative", display: "block", aspectRatio: "16 / 9", overflow: "hidden" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={kapakUrl(v.id)}
                              alt={v.baslik}
                              loading="lazy"
                              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                            />
                            {v.shorts && (
                              <span style={{ position: "absolute", top: "0.6rem", left: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent-ink)", background: "var(--accent)", padding: "0.3rem 0.55rem", borderRadius: "100px" }}>
                                Shorts
                              </span>
                            )}
                          </span>
                          <span style={{ display: "block", padding: "1rem 1.15rem 1.2rem" }}>
                            <span style={{ display: "block", fontFamily: "var(--font-serif)", fontSize: "1.08rem", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
                              {v.baslik}
                            </span>
                            <span style={{ display: "block", marginTop: "0.5rem", fontFamily: "var(--font-grotesk)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
                              {tarihYaz(v.tarih, lang)}
                              {v.izlenme != null && ` · ${v.izlenme.toLocaleString(lang === "tr" ? "tr-TR" : "en-GB")} ${L("izlenme", "views", "vues")}`}
                            </span>
                          </span>
                        </a>
                      </Reveal>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </main>
        );
      }}
    </Kabuk>
  );
}
