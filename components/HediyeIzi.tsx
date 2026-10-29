"use client";

import { useEffect, useState } from "react";
import { HEREBY_APP_STORE } from "@/lib/site";
import { SUNUCU, ANAHTAR } from "@/components/WrittenbySanatci";

/* HEDİYE İZİ — hereby 1.1 "Sana bir satır bıraktım" bağlantısının açıldığı sayfa.
   Site statik; kod adresten okunur (vercel.json /hereby/iz/:kod → /hereby/iz/).
   hediye_iz_bul yalnız semti ve okunup okunmadığını döner. Satır, bırakan, konum burada asla görünmez.
   Uygulama yüklüyse bağlantı Universal Link ile doğrudan uygulamayı açar; bu sayfa yüklü olmayanlar içindir. */

const CIVIT = "#6d66ff";
const KOD = /^[A-HJKMNP-Z2-9]{5}-[A-HJKMNP-Z2-9]{5}$/;

const mono: React.CSSProperties = { fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif, Georgia), Georgia, serif" };

/* Türkçe bulunma eki: Moda'da, Kadıköy'de, Beşiktaş'ta. */
function bulunma(semt: string) {
  const kucuk = semt.toLocaleLowerCase("tr");
  const unluler = kucuk.match(/[aıoueiöü]/g);
  const kalin = !unluler || "aıou".includes(unluler[unluler.length - 1]);
  const sert = "fstkçşhp".includes(kucuk[kucuk.length - 1]);
  return `${semt}'${sert ? "t" : "d"}${kalin ? "a" : "e"}`;
}

type Durum = { tur: "yukleniyor" } | { tur: "yok" } | { tur: "var"; semt: string; okundu: boolean };

const METIN = {
  tr: {
    ust: "hereby. · sana bırakılan iz",
    baslik: (s: string) => <>Biri sana <span style={{ color: CIVIT, fontStyle: "italic" }}>{bulunma(s)}</span> bir satır bıraktı.</>,
    alt: "Okumak için oraya git. Satır yalnızca o yere vardığında, senin telefonunda açılır.",
    okundu: "Bu satır okundu.",
    yok: "Bu bağlantı geçersiz ya da iz kaldırılmış.",
    yukleniyor: "İz aranıyor…",
    indir: "App Store'dan indir",
    ac: "Uygulamada aç",
    dip: "Ücretsiz · Reklamsız · Üyelik yok",
    ne: "hereby nedir?", neHref: "/hereby",
  },
  en: {
    ust: "hereby. · a trace left for you",
    baslik: (s: string) => <>Someone left you a line in <span style={{ color: CIVIT, fontStyle: "italic" }}>{s}</span>.</>,
    alt: "Go there to read it. The line opens on your phone only once you arrive.",
    okundu: "This line has been read.",
    yok: "This link is invalid or the trace has been removed.",
    yukleniyor: "Looking for the trace…",
    indir: "Download on the App Store",
    ac: "Open in the app",
    dip: "Free · No ads · No sign-up",
    ne: "What is hereby?", neHref: "/en/hereby",
  },
};

export function HediyeIzi({ dil }: { dil: "tr" | "en" }) {
  const m = METIN[dil];
  const [kod, setKod] = useState("");
  const [durum, setDurum] = useState<Durum>({ tur: "yukleniyor" });

  useEffect(() => {
    const parca = window.location.pathname.split("/").filter(Boolean).pop() ?? "";
    const k = decodeURIComponent(parca).toUpperCase();
    setKod(k);
    if (!KOD.test(k)) { setDurum({ tur: "yok" }); return; }
    fetch(`${SUNUCU}/rest/v1/rpc/hediye_iz_bul`, {
      method: "POST",
      headers: { apikey: ANAHTAR, Authorization: `Bearer ${ANAHTAR}`, "Content-Type": "application/json" },
      body: JSON.stringify({ kod: k }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => setDurum(j && j.semt ? { tur: "var", semt: j.semt, okundu: !!j.okundu } : { tur: "yok" }))
      .catch(() => setDurum({ tur: "yok" }));
  }, []);

  /* Aynı alan adındaki bağlantı Safari'de Universal Link'i tetiklemez; düğme uygulamanın kendi şemasını kullanır (1.1'de eklenir). */
  const uygulamaHref = `hereby://iz/${kod}`;

  return (
    <main lang={dil} style={{ position: "relative", overflow: "hidden", minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <style>{`
        @keyframes hz-halka { from { transform: scale(.35); opacity: .9 } to { transform: scale(1.6); opacity: 0 } }
        .hz-halka { position:absolute; inset:0; border-radius:50%; border:2px solid ${CIVIT}; animation: hz-halka 3.6s cubic-bezier(.2,.6,.3,1) infinite; }
        .hz-halka:nth-child(2) { animation-delay: 1.2s } .hz-halka:nth-child(3) { animation-delay: 2.4s }
        @media (prefers-reduced-motion: reduce) { .hz-halka { animation: none; opacity: .35 } }
        .hz-dugme { display:inline-flex; align-items:center; gap:.5rem; padding:.95rem 1.6rem; border-radius:999px; font-weight:600; font-family:var(--font-grotesk); transition: transform .2s ease }
        .hz-dugme:hover { transform: translateY(-2px) }
      `}</style>
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "clamp(4rem, 12vh, 7rem) clamp(1.25rem, 5vw, 3rem)", textAlign: "center", position: "relative" }}>
        <div aria-hidden style={{ position: "absolute", inset: "-20% -20% auto", height: "560px", background: `radial-gradient(closest-side, ${CIVIT}33, transparent)`, pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "relative", width: 130, height: 130, margin: "0 auto 2rem" }}>
          <span className="hz-halka" /><span className="hz-halka" /><span className="hz-halka" />
          <span style={{ position: "absolute", inset: "calc(50% - 13px)", width: 26, height: 26, borderRadius: "50%", background: CIVIT, boxShadow: `0 0 40px ${CIVIT}` }} />
        </div>
        <div style={{ ...mono, color: CIVIT, marginBottom: "1.2rem", position: "relative" }}>{m.ust}</div>

        {durum.tur === "var" ? (
          <>
            <h1 style={{ ...serif, fontSize: "clamp(2.4rem, 7.5vw, 4.6rem)", lineHeight: 1.04, margin: "0 0 1.4rem", fontWeight: 500, position: "relative" }}>{m.baslik(durum.semt)}</h1>
            <p style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)", lineHeight: 1.65, color: "var(--muted)", maxWidth: "34rem", margin: "0 auto 2.2rem", position: "relative" }}>
              {durum.okundu ? m.okundu : m.alt}
            </p>
          </>
        ) : (
          <p style={{ ...serif, fontSize: "clamp(1.6rem, 4.5vw, 2.4rem)", lineHeight: 1.25, margin: "0 0 2.2rem", position: "relative" }}>
            {durum.tur === "yok" ? m.yok : m.yukleniyor}
          </p>
        )}

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
          <a href={HEREBY_APP_STORE} className="hz-dugme" style={{ background: CIVIT, color: "#fff", boxShadow: `0 12px 34px ${CIVIT}55` }}>{m.indir} →</a>
          {durum.tur === "var" && (
            <a href={uygulamaHref} className="hz-dugme" style={{ border: "1px solid var(--line)", color: "var(--fg, inherit)" }}>{m.ac}</a>
          )}
        </div>
        <p style={{ ...mono, color: "var(--muted)", marginTop: "1.4rem", fontSize: "0.66rem", position: "relative" }}>{m.dip}</p>
        <p style={{ marginTop: "2.4rem", position: "relative" }}>
          <a href={m.neHref} style={{ ...mono, color: CIVIT, fontSize: "0.68rem" }}>{m.ne} →</a>
        </p>
      </section>
    </main>
  );
}
