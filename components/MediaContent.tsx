"use client";

import { content, type Lang } from "@/lib/content";

export function MediaContent({ lang }: { lang: Lang }) {
  const t = content[lang].media;

  return (
    <div style={{ paddingTop: "60px" }}>
      <style>{`
        .media-link { transition: color 0.2s, border-color 0.2s; }
        .media-link:hover { color: var(--text) !important; border-color: var(--border-bright) !important; }
        .embed-frame { border: 1px solid var(--border); border-radius: 4px; overflow: hidden; background: var(--bg-panel); }
        @media (max-width: 768px) {
          .media-hero { padding: 4rem 1.5rem !important; }
          .media-sec { padding: 3.5rem 1.5rem !important; }
          .media-links { flex-direction: column !important; }
        }
      `}</style>

      {/* HERO */}
      <section className="media-hero" style={{ minHeight: "45vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "4rem", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--accent)", marginBottom: "2rem" }}>{t.kicker}</p>
        <h1 style={{ fontFamily: "var(--font-grotesk)", fontSize: "clamp(3rem, 9vw, 7rem)", fontWeight: 700, lineHeight: 0.86, letterSpacing: "-0.01em", textTransform: "uppercase", color: "var(--text)", marginBottom: "1.5rem", whiteSpace: "pre-line" }}>{t.title}</h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "460px", lineHeight: 1.8 }}>{t.desc}</p>
      </section>

      {/* PODCAST — Spotify */}
      <section className="media-sec" style={{ padding: "5rem 4rem", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "1rem" }}>{t.podcastKicker}</p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "480px", lineHeight: 1.8, marginBottom: "2.5rem" }}>{t.podcastDesc}</p>

        {/* Spotify show player */}
        <div className="embed-frame" style={{ marginBottom: "1.5rem", maxWidth: "780px" }}>
          <iframe
            title="Şairin Hesabı — Spotify"
            src={`https://open.spotify.com/embed/show/${t.spotifyShowId}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ display: "block" }}
          />
        </div>

        {/* Öne çıkan bölümler */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem", maxWidth: "780px" }}>
          {t.spotifyEpisodes.map((ep, i) => (
            <div key={i} className="embed-frame">
              <iframe
                title={`Bölüm ${i + 1}`}
                src={`https://open.spotify.com/embed/episode/${ep}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ display: "block" }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* YOUTUBE */}
      <section className="media-sec" style={{ padding: "5rem 4rem", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--text-dim)", marginBottom: "1rem" }}>{t.videoKicker}</p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "480px", lineHeight: 1.8, marginBottom: "2.5rem" }}>{t.videoDesc}</p>

        <div className="embed-frame" style={{ maxWidth: "780px", aspectRatio: "16 / 9" }}>
          <iframe
            title="YouTube — Berkay Doğan"
            src={`https://www.youtube.com/embed/${t.youtubeId}`}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ display: "block" }}
          />
        </div>
      </section>

      {/* PLATFORM LİNKLERİ */}
      <section className="media-sec" style={{ padding: "4rem", textAlign: "center" }}>
        <div className="media-links" style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          {t.links.map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="media-link" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--text-dim)", border: "1px solid var(--border)", padding: "0.85rem 1.75rem", borderRadius: "2px" }}>
              {l.name.toUpperCase()} ↗
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
