"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* Şiirli 404 — kaybolan ziyaretçiye markanın diliyle seslenir.
   Dil: bd-lang (site tercihi) → tarayıcı dili → TR. */

type Lang = "tr" | "en" | "fr";

const COPY: Record<Lang, { etiket: string; satir1: string; satir2: string; geri: string }> = {
  tr: {
    etiket: "404 — kayıp",
    satir1: "Aradığın sayfa tasfiye edilmiş.",
    satir2: "Ama kaybolmak da bir tür bulunmaktır; ne aradığını burada bilen biri var.",
    geri: "← eve dön",
  },
  en: {
    etiket: "404 — lost",
    satir1: "The page you seek has been cleared away.",
    satir2: "But getting lost is a way of being found; someone here knows what you were looking for.",
    geri: "← back home",
  },
  fr: {
    etiket: "404 — perdu",
    satir1: "La page que vous cherchez a été liquidée.",
    satir2: "Mais se perdre est une façon d'être trouvé ; ici, quelqu'un sait ce que vous cherchiez.",
    geri: "← retour",
  },
};

const LINKLER: { href: string; ad: Record<Lang, string> }[] = [
  { href: "/kitaplar", ad: { tr: "Kitaplar", en: "Books", fr: "Livres" } },
  { href: "/yazilar", ad: { tr: "Yazılar", en: "Writing", fr: "Textes" } },
  { href: "/sozler", ad: { tr: "Sözler", en: "Lines", fr: "Vers" } },
  { href: "/mektup", ad: { tr: "Okur Mektupları", en: "Letters", fr: "Lettres" } },
];

export function Kayip() {
  const [lang, setLang] = useState<Lang>("tr");
  useEffect(() => {
    try {
      const s = localStorage.getItem("bd-lang");
      if (s === "tr" || s === "en" || s === "fr") setLang(s);
      else {
        const n = (navigator.language || "").toLowerCase();
        setLang(n.startsWith("tr") ? "tr" : n.startsWith("fr") ? "fr" : "en");
      }
    } catch { /* yoksay */ }
  }, []);
  const c = COPY[lang];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "var(--bg)", color: "var(--ink)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem 1.5rem" }}>
      <p style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--accent-2)", marginBottom: "2.25rem" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)" }} />{c.etiket}
      </p>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.7rem, 5vw, 3.2rem)", lineHeight: 1.35, maxWidth: "22ch" }}>
        {c.satir1}
      </p>
      <p style={{ marginTop: "1.1rem", fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1rem, 2.4vw, 1.35rem)", lineHeight: 1.55, maxWidth: "40ch", color: "var(--muted)" }}>
        {c.satir2}
      </p>
      <Link href="/" style={{ marginTop: "2.75rem", fontFamily: "var(--font-grotesk)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.1em", padding: "0.9rem 1.6rem", borderRadius: "100px", background: "var(--accent)", color: "var(--accent-ink)" }}>
        {c.geri}
      </Link>
      <nav style={{ marginTop: "1.75rem", display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center" }}>
        {LINKLER.map((l) => (
          <Link key={l.href} href={l.href} style={{ fontFamily: "var(--font-grotesk)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", borderBottom: "1px solid var(--line)", paddingBottom: "2px" }}>
            {l.ad[lang]}
          </Link>
        ))}
      </nav>
    </div>
  );
}
