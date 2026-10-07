"use client";

import { useState } from "react";

/* Kitap sayfasındaki video bloğu — tıklayınca yüklenen YouTube (nocookie) oynatıcı.
   Sayfa açılışında YouTube'a istek gitmez; önce kendi kapak görselimiz görünür. */

export function DurusmaVideo({ id, baslik, alt, poster }: { id: string; baslik: string; alt: string; poster: string }) {
  const [acik, setAcik] = useState(false);
  return (
    <div>
      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: "6px", overflow: "hidden", background: "#060505", boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }}>
        {acik ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={baslik}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        ) : (
          <button onClick={() => setAcik(true)} aria-label={`${baslik} — oynat`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", padding: 0, border: 0, cursor: "pointer", background: "none" }}>
            <img src={poster} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <span aria-hidden="true" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "76px", height: "76px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.45)" }}>
              <span style={{ width: 0, height: 0, borderTop: "14px solid transparent", borderBottom: "14px solid transparent", borderLeft: "22px solid var(--accent-ink)", marginLeft: "5px" }} />
            </span>
          </button>
        )}
      </div>
      <p style={{ marginTop: "0.9rem", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem", color: "var(--muted)", maxWidth: "60ch" }}>{alt}</p>
    </div>
  );
}
