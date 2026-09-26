"use client";

import { useEffect, useRef, useState } from "react";
import { type Lang } from "@/lib/site";
import { type Mektup, mektuplariGetir, mektupBirak } from "@/lib/mektup";

/* Okur Mektupları — okurun siteye bıraktığı kısa mesajlar.
   Mektuplar onaydan geçince görünür; form linksiz, 280 karakter. */

const COPY: Record<Lang, {
  giris: string; adYer: string; mesajYer: string; gonder: string; gonderiliyor: string;
  tesekkur: string; hata: string; bos: string; anonim: string;
}> = {
  tr: {
    giris: "Bir cümle bırak: kitaptan sana kalan bir iz, bir itiraz, bir merhaba. Mektuplar okunup onaylandıktan sonra burada görünür.",
    adYer: "adın (istersen)",
    mesajYer: "mektubun… (280 karakter)",
    gonder: "mektubu bırak",
    gonderiliyor: "gönderiliyor…",
    tesekkur: "Mektubun ulaştı. Okunup onaylanınca burada görünecek — teşekkürler.",
    hata: "Gönderilemedi — link olmasın, 2–280 karakter olsun.",
    bos: "İlk mektubu sen bırak.",
    anonim: "bir okur",
  },
  en: {
    giris: "Leave a line: a trace the book left in you, an objection, a hello. Letters appear here after they're read and approved.",
    adYer: "your name (optional)",
    mesajYer: "your letter… (280 chars)",
    gonder: "leave the letter",
    gonderiliyor: "sending…",
    tesekkur: "Your letter arrived. It will appear here once read and approved — thank you.",
    hata: "Couldn't send — no links, 2–280 characters.",
    bos: "Be the first to leave a letter.",
    anonim: "a reader",
  },
  fr: {
    giris: "Laissez une ligne : une trace du livre, une objection, un bonjour. Les lettres apparaissent après lecture et approbation.",
    adYer: "votre nom (facultatif)",
    mesajYer: "votre lettre… (280 car.)",
    gonder: "laisser la lettre",
    gonderiliyor: "envoi…",
    tesekkur: "Votre lettre est arrivée. Elle apparaîtra ici après approbation — merci.",
    hata: "Échec — pas de liens, 2 à 280 caractères.",
    bos: "Laissez la première lettre.",
    anonim: "un lecteur",
  },
};

function tarih(iso: string, lang: Lang): string {
  try {
    return new Date(iso).toLocaleDateString(lang === "tr" ? "tr-TR" : lang === "fr" ? "fr-FR" : "en-US", {
      day: "numeric", month: "long", year: "numeric",
    });
  } catch {
    return "";
  }
}

export function OkurMektubu({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const [mektuplar, setMektuplar] = useState<Mektup[]>([]);
  const [ad, setAd] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [durum, setDurum] = useState<"bos" | "gonderiliyor" | "tesekkur" | "hata">("bos");
  const bekle = useRef(0);

  useEffect(() => {
    let off = false;
    mektuplariGetir().then((m) => !off && setMektuplar(m));
    return () => { off = true; };
  }, []);

  async function gonder(e: React.FormEvent) {
    e.preventDefault();
    const m = mesaj.trim();
    if (m.length < 2 || m.length > 280) return;
    const simdi = Date.now();
    if (simdi - bekle.current < 5000) return;
    bekle.current = simdi;
    setDurum("gonderiliyor");
    const r = await mektupBirak(ad.trim(), m);
    if (r.ok) {
      setDurum("tesekkur");
      setMesaj("");
    } else {
      setDurum("hata");
    }
  }

  return (
    <div>
      <p className="read" style={{ color: "var(--muted)", maxWidth: "56ch", fontSize: "0.95rem", lineHeight: 1.65 }}>{c.giris}</p>

      <form onSubmit={gonder} style={{ marginTop: "1.75rem", display: "flex", flexDirection: "column", gap: "0.7rem", maxWidth: "560px" }}>
        <input
          value={ad}
          onChange={(e) => setAd(e.target.value)}
          maxLength={40}
          placeholder={c.adYer}
          style={{ background: "transparent", border: "1px solid var(--line)", borderRadius: "10px", padding: "0.7rem 0.9rem", color: "var(--ink)", fontSize: "0.9rem" }}
        />
        <textarea
          value={mesaj}
          onChange={(e) => { setMesaj(e.target.value); if (durum === "hata") setDurum("bos"); }}
          maxLength={280}
          rows={4}
          placeholder={c.mesajYer}
          style={{ background: "transparent", border: "1px solid var(--line)", borderRadius: "10px", padding: "0.7rem 0.9rem", color: "var(--ink)", fontSize: "0.9rem", resize: "vertical" }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <button
            type="submit"
            disabled={durum === "gonderiliyor" || mesaj.trim().length < 2}
            className="cg-btn cg-btn-fill"
            style={{ padding: "0.8rem 1.5rem", borderRadius: "100px", fontSize: "0.8rem", letterSpacing: "0.08em", opacity: durum === "gonderiliyor" || mesaj.trim().length < 2 ? 0.5 : 1 }}
          >
            {durum === "gonderiliyor" ? c.gonderiliyor : c.gonder}
          </button>
          {durum === "tesekkur" && <span style={{ fontSize: "0.82rem", color: "var(--accent-2, var(--accent))" }}>{c.tesekkur}</span>}
          {durum === "hata" && <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{c.hata}</span>}
        </div>
      </form>

      <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "640px" }}>
        {mektuplar.length === 0 ? (
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--muted)" }}>{c.bos}</p>
        ) : (
          mektuplar.map((m) => (
            <blockquote key={m.id} style={{ margin: 0, borderLeft: "2px solid var(--accent-2, var(--accent))", paddingLeft: "1.1rem" }}>
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.02rem", lineHeight: 1.6, color: "var(--ink)" }}>{m.mesaj}</p>
              <footer style={{ marginTop: "0.45rem", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
                {m.ad || c.anonim} · {tarih(m.created_at, lang)}
              </footer>
            </blockquote>
          ))
        )}
      </div>
    </div>
  );
}
