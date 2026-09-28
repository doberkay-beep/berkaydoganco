"use client";

import { useEffect, useState } from "react";

// Footer'daki ŞİMDİ köprüsünü canlandırır: radyoda en son yakalanan parçayı
// gösterir. Radyo projesiyle aynı Supabase, public anon anahtar (salt okuma).
const URL = "https://uiouzizblrkojmsqvbjk.supabase.co";
const ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpb3V6aXpibHJrb2ptc3F2YmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3ODExMTQsImV4cCI6MjEwMjM1NzExNH0.rAPFD8zjD_LdGf4hnZW_asnxUS705XCxTII-RqhmZDM";

type Calan = { parca: string; slug: string; istasyon: string } | null;

export function SimdiCanli({ lang }: { lang: "tr" | "en" | "fr" }) {
  const [calan, setCalan] = useState<Calan>(null);

  useEffect(() => {
    let off = false;
    fetch(
      `${URL}/rest/v1/now_playing?select=title,artist,stations!inner(slug,name)&order=updated_at.desc&limit=1`,
      { headers: { apikey: ANON, Authorization: `Bearer ${ANON}` } },
    )
      .then((r) => r.json())
      .then((d: { title: string | null; artist: string | null; stations: { slug: string; name: string } }[]) => {
        const c = d?.[0];
        if (off || !c?.title) return;
        const parca = c.artist && c.artist !== c.title ? `${c.artist} — ${c.title}` : c.title;
        setCalan({ parca, slug: c.stations.slug, istasyon: c.stations.name });
      })
      .catch(() => {});
    return () => { off = true; };
  }, []);

  if (!calan) return null;
  const on = lang === "tr" ? "ŞİMDİ'de şu an" : lang === "fr" ? "En ce moment sur ŞİMDİ" : "Now on ŞİMDİ";
  return (
    <a
      href={`https://necaliyor.co/radyo/${calan.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="cg-link"
      style={{ display: "block", fontSize: "0.78rem", color: "var(--muted)", marginTop: "0.35rem", maxWidth: "34ch", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
      title={`${calan.istasyon} · necaliyor.co`}
    >
      <span style={{ color: "var(--accent-2)" }}>♪ {on}:</span> {calan.parca}
    </a>
  );
}
