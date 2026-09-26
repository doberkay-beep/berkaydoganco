"use client";

import { type Lang } from "@/lib/site";
import { type Etkinlik, ayrilmis, icsUret } from "@/lib/etkinlikler";

/* Sahne — imza günleri, okumalar. Etkinlik yoksa nazik boş durum. */

const COPY: Record<Lang, { bos: string; duyuru: string; gelecek: string; gecmis: string; takvim: string }> = {
  tr: {
    bos: "Şu an takvimde duyurulmuş bir etkinlik yok.",
    duyuru: "Yeni imza günleri ve okumalar önce X'te duyurulur:",
    gelecek: "Yaklaşan",
    gecmis: "Geçmiş",
    takvim: "takvime ekle",
  },
  en: {
    bos: "No events announced on the calendar right now.",
    duyuru: "New signings and readings are announced first on X:",
    gelecek: "Upcoming",
    gecmis: "Past",
    takvim: "add to calendar",
  },
  fr: {
    bos: "Aucun événement annoncé pour le moment.",
    duyuru: "Les séances de dédicace sont annoncées d'abord sur X :",
    gelecek: "À venir",
    gecmis: "Passés",
    takvim: "ajouter au calendrier",
  },
};

function tarihYaz(iso: string, lang: Lang): string {
  try {
    const d = new Date(iso);
    const gun = d.toLocaleDateString(lang === "tr" ? "tr-TR" : lang === "fr" ? "fr-FR" : "en-US", {
      day: "numeric", month: "long", year: "numeric", weekday: "long",
    });
    return iso.includes("T") ? `${gun} · ${iso.slice(11, 16)}` : gun;
  } catch {
    return iso;
  }
}

function indirIcs(e: Etkinlik) {
  const blob = new Blob([icsUret(e)], { type: "text/calendar" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "berkay-dogan-etkinlik.ics";
  a.click();
  URL.revokeObjectURL(a.href);
}

function Satir({ e, lang, c }: { e: Etkinlik; lang: Lang; c: (typeof COPY)[Lang] }) {
  return (
    <div style={{ borderLeft: "2px solid var(--accent-2, var(--accent))", paddingLeft: "1.1rem" }}>
      <p style={{ fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)" }}>
        {tarihYaz(e.tarihISO, lang)}
      </p>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", marginTop: "0.3rem", color: "var(--ink)" }}>{e.baslik}</p>
      <p style={{ fontSize: "0.88rem", color: "var(--muted)", marginTop: "0.2rem" }}>
        {e.mekan} · {e.sehir}{e.not ? ` · ${e.not}` : ""}
      </p>
      <p style={{ marginTop: "0.5rem", display: "flex", gap: "1.2rem", fontSize: "0.78rem" }}>
        <button onClick={() => indirIcs(e)} className="cg-link" style={{ background: "none", border: 0, padding: 0, cursor: "pointer", color: "var(--accent-2, var(--accent))" }}>
          {c.takvim} ↓
        </button>
        {e.link && (
          <a href={e.link} target="_blank" rel="noopener noreferrer" className="cg-link" style={{ color: "var(--muted)" }}>
            {e.link.replace(/^https?:\/\//, "").split("/")[0]} ↗
          </a>
        )}
      </p>
    </div>
  );
}

export function Sahne({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const { gelecek, gecmis } = ayrilmis();

  if (!gelecek.length && !gecmis.length) {
    return (
      <div>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.1rem", color: "var(--muted)" }}>{c.bos}</p>
        <p style={{ marginTop: "0.9rem", fontSize: "0.9rem", color: "var(--muted)" }}>
          {c.duyuru}{" "}
          <a href="https://x.com/thisisbdgn" target="_blank" rel="noopener noreferrer" className="cg-link" style={{ color: "var(--accent-2, var(--accent))" }}>
            @thisisbdgn
          </a>
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", maxWidth: "640px" }}>
      {gelecek.length > 0 && (
        <div>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.2rem" }}>{c.gelecek}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
            {gelecek.map((e) => <Satir key={e.tarihISO + e.baslik} e={e} lang={lang} c={c} />)}
          </div>
        </div>
      )}
      {gecmis.length > 0 && (
        <div>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.2rem" }}>{c.gecmis}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem", opacity: 0.65 }}>
            {gecmis.map((e) => <Satir key={e.tarihISO + e.baslik} e={e} lang={lang} c={c} />)}
          </div>
        </div>
      )}
    </div>
  );
}
