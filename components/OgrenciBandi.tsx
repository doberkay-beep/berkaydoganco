"use client";

import { useEffect, useState } from "react";
import { CUMLELER } from "@/lib/ogrenciler";
import { KITAP_ADI } from "@/lib/sozler";

/* ÖĞRENCİ BANDI — ana sayfada, Günün Közü'nün altında: öğrencilere ve
   öğretmenlere açık kapı. "Haftanın tartışma sorusu" her hafta kendiliğinden
   değişir (ziyaretçinin saatine göre; cümleler doğrulanmış korpustan). */

const etiket: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase" };

export function OgrenciBandi() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const hafta = Math.floor(Date.now() / (7 * 24 * 3600 * 1000));
    setI(hafta % CUMLELER.length);
  }, []);
  const c = CUMLELER[i];

  return (
    <section aria-label="Öğrenciler ve öğretmenler için" className="og-bant">
      <div className="og-sol">
        <span style={{ ...etiket, color: "var(--accent-2)" }}>Öğrenciler ve öğretmenler için</span>
        <h2 className="cg-serif og-baslik">Ödevin için röportaj, okuluna ücretsiz söyleşi.</h2>
        <div className="og-linkler">
          <a href="/ogrenciler#roportaj" className="og-link">Röportaj iste →</a>
          <a href="/ogrenciler#soylesi" className="og-link">Söyleşiye davet et →</a>
          <a href="/ogrenciler#tartisma" className="og-link">Derste tartış →</a>
          <a href="/ogrenciler#cagri" className="og-link">Yazma çağrısı →</a>
        </div>
      </div>
      {c && (
        <a href="/ogrenciler#tartisma" className="og-sag">
          <span style={{ ...etiket, color: "var(--muted)" }}>Haftanın tartışma sorusu</span>
          <span lang="tr" className="cg-serif og-alinti">“{c.s}”</span>
          <span style={{ ...etiket, fontSize: "0.56rem", color: "var(--muted)" }}>{KITAP_ADI[c.soz.k]}</span>
          <span className="og-soru">{c.soru}</span>
        </a>
      )}
    </section>
  );
}
