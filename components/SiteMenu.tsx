"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Muhur } from "./Muhur";
import { ETKINLIKLER } from "@/lib/etkinlikler";

/* Sitenin tek menüsü. Her şey burada, dört başlık altında.
   Kabuk'lu sayfalarda (ana sayfa, Hakkımda, İzle & Dinle…) Kabuk'un kendi üst çubuğu bu menüyü açar;
   diğer bütün sayfalarda layout'taki SiteMenu ince bir üst çubuk gösterir. İkisi aynı anda görünmez
   (globals.css: body:has(.cg-nav) .sm-bar). */

type Baglanti = [href: string, ad: string, alt?: boolean];
type Grup = { baslik: string; linkler: Baglanti[] };

export function menuGruplari(lang: "tr" | "en"): Grup[] {
  const tr = lang === "tr";
  return [
    {
      baslik: tr ? "Oku" : "Read",
      linkler: [
        [tr ? "/kitaplar/" : "/en/#books", tr ? "Kitaplar" : "Books"],
        ["/sozler/", tr ? "Sözler" : "Quotes"],
        ["/yazilar/", tr ? "Yazılar" : "Writing"],
        ["/notlar/", tr ? "Gece Notları" : "Night Notes"],
        ["/sozluk/", tr ? "Kavramlar Sözlüğü" : "Lexicon"],
        ["/takvim/", tr ? "Köz Takvimi" : "Ember Calendar"],
      ],
    },
    {
      baslik: tr ? "İzle" : "Watch",
      linkler: [
        ["/film/", tr ? "Tasfiye: film" : "Tasfiye: the film"],
        ["/video/", tr ? "İzle & Dinle" : "Watch & Listen"],
        ["/posterler/", tr ? "Posterler" : "Posters"],
        ...(tr ? [["/goruntu/", "Görüntü ve Dize"] as Baglanti] : []),
        ...(ETKINLIKLER.length > 0 ? [["/sahne/", tr ? "Sahne" : "On Stage"] as Baglanti] : []),
      ],
    },
    {
      baslik: tr ? "Uygulamalar" : "Apps",
      linkler: [
        [tr ? "/by/" : "/en/by/", tr ? "by. atölyesi" : "by. workshop"],
        [tr ? "/hereby/" : "/en/hereby/", "hereby."],
        [tr ? "/nowby/" : "/en/nowby/", "nowby."],
        [tr ? "/writtenby/" : "/en/writtenby/", "writtenby."],
        [tr ? "/writtenby/sanatcilar/" : "/en/writtenby/artists/", tr ? "Sanatçılar" : "Artists", true],
      ],
    },
    {
      baslik: "Berkay",
      linkler: [
        ["/hakkimda/", tr ? "Hakkımda" : "About"],
        [tr ? "/press/" : "/en/#press-kit", tr ? "Basın Odası" : "Press Room"],
        ...(tr ? [["/ogrenciler/", "Öğrenciler için"] as Baglanti, ["/mektup/", "Okur Mektupları"] as Baglanti] : []),
        [tr ? "/#contact" : "/en/#contact", tr ? "İletişim" : "Contact"],
        tr ? ["/en/", "In English"] : ["/", "Türkçe"],
      ],
    },
  ];
}

/** Tam ekran gruplu menü. Esc ile kapanır, açıkken sayfa kaymaz. */
export function GrupluMenu({ lang, kapat }: { lang: "tr" | "en"; kapat: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") kapat(); };
    document.addEventListener("keydown", onKey);
    const eski = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = eski; };
  }, [kapat]);

  return (
    <div className="sm-menu" role="dialog" aria-modal="true" aria-label={lang === "tr" ? "Menü" : "Menu"}>
      <div className="sm-menu-ust">
        <Link href={lang === "tr" ? "/" : "/en/"} onClick={kapat} className="sm-marka"><Muhur size={22} />Berkay Doğan</Link>
        <button className="sm-kapat" onClick={kapat} aria-label={lang === "tr" ? "Kapat" : "Close"}>✕</button>
      </div>
      <nav className="sm-gruplar">
        {menuGruplari(lang).map((g) => (
          <div key={g.baslik} className="sm-grup">
            <p className="sm-grup-baslik">{g.baslik}</p>
            {g.linkler.map(([href, ad, alt]) => (
              <a key={href} href={href} onClick={kapat} className={alt ? "sm-alt" : undefined}>{alt && <span aria-hidden>↳ </span>}{ad}</a>
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
}

const GIZLI = ["/embed", "/git", "/writtenby/masa"];

/** Kabuk'suz sayfalardaki ince üst çubuk: solda ad (ana sayfa), sağda Menü. */
export function SiteMenu() {
  const yol = usePathname() ?? "/";
  const [acik, setAcik] = useState(false);
  if (GIZLI.some((g) => yol.startsWith(g))) return null;
  const lang = yol.startsWith("/en") ? "en" : "tr";
  return (
    <>
      <header className="sm-bar">
        <Link href={lang === "tr" ? "/" : "/en/"} className="sm-marka"><Muhur size={20} />Berkay Doğan</Link>
        <button className="sm-ac" onClick={() => setAcik(true)} aria-expanded={acik}>{lang === "tr" ? "Menü" : "Menu"}</button>
      </header>
      {acik && <GrupluMenu lang={lang} kapat={() => setAcik(false)} />}
    </>
  );
}
