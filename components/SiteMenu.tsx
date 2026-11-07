"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Muhur } from "./Muhur";
import { ETKINLIKLER } from "@/lib/etkinlikler";

/* Sitenin tek menüsü. Önce okura en çok gereken beş bağlantı, sonra okuma arşivi, sonra diğer çalışmalar.
   Gizlilik ve koşullar burada değil; ilgili uygulama sayfalarının altında duruyor.
   Kabuk'lu sayfalarda (ana sayfa, Hakkımda, İzle & Dinle…) Kabuk'un kendi üst çubuğu bu menüyü açar;
   diğer bütün sayfalarda layout'taki SiteMenu ince bir üst çubuk gösterir. İkisi aynı anda görünmez
   (globals.css: body:has(.cg-nav) .sm-bar). */

// Üçüncü alan: true = bir üstteki bağlantının alt sayfası, "ara" = grup içi ara başlık (bağlantı değil).
type Baglanti = [href: string, ad: string, tur?: true | "ara"];
type Grup = { baslik: string; ana?: boolean; linkler: Baglanti[] };

export function menuGruplari(lang: "tr" | "en"): Grup[] {
  const tr = lang === "tr";
  return [
    {
      baslik: tr ? "Başlangıç" : "Start here",
      ana: true,
      linkler: [
        [tr ? "/kitaplar/" : "/en/#books", tr ? "Kitaplar" : "Books"],
        ["/yazilar/", tr ? "Yazılar" : "Writing"],
        ["/hakkimda/", tr ? "Hakkımda" : "About"],
        [tr ? "/press/" : "/en/#press-kit", tr ? "Basın odası" : "Press room"],
        [tr ? "/#contact" : "/en/#contact", tr ? "İletişim" : "Contact"],
      ],
    },
    {
      baslik: tr ? "Okuma arşivi" : "Reading archive",
      linkler: [
        ["/sozler/", tr ? "Sözler" : "Quotes"],
        ["/notlar/", tr ? "Gece Notları" : "Night Notes"],
        ["/sozluk/", tr ? "Kavramlar Sözlüğü" : "Lexicon"],
        ["/takvim/", tr ? "Köz Takvimi" : "Ember Calendar"],
        ...(tr
          ? [["/mektup/", "Okur Mektupları"] as Baglanti, ["/ogrenciler/", "Öğrenciler için"] as Baglanti, ["/gom/", "Sitene Göm", true] as Baglanti]
          : []),
      ],
    },
    {
      baslik: tr ? "Diğer çalışmalar" : "Other work",
      linkler: [
        ["", tr ? "Filmler ve videolar" : "Films and videos", "ara"],
        ["/film/", tr ? "Tasfiye: film" : "Tasfiye: the film"],
        ["/video/", tr ? "İzle & Dinle" : "Watch & Listen"],
        ...(tr ? [["/tek-soz/", "Tek Söz"] as Baglanti] : []),
        ...(ETKINLIKLER.length > 0 ? [["/sahne/", tr ? "Sahne" : "On Stage"] as Baglanti] : []),
        ["", tr ? "Posterler ve görsel çalışmalar" : "Posters and visual work", "ara"],
        ["/posterler/", tr ? "Posterler" : "Posters"],
        ...(tr ? [["/goruntu/", "Görüntü ve Dize"] as Baglanti] : []),
        ["", tr ? "by. atölyesi ve uygulamalar" : "by. workshop and apps", "ara"],
        [tr ? "/by/" : "/en/by/", tr ? "by. atölyesi" : "by. workshop"],
        [tr ? "/hereby/" : "/en/hereby/", "hereby."],
        [tr ? "/gidis/" : "/en/departures/", tr ? "Gidiş zinciri" : "Departure chain", true],
        [tr ? "/nowby/" : "/en/nowby/", "nowby."],
        [tr ? "/writtenby/" : "/en/writtenby/", "writtenby."],
        [tr ? "/writtenby/sanatcilar/" : "/en/writtenby/artists/", tr ? "Sanatçılar" : "Artists", true],
        [tr ? "/studio/" : "/en/studio/", tr ? "by. stüdyo" : "by. studio"],
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
      <nav className="sm-gruplar" aria-label={lang === "tr" ? "Site menüsü" : "Site menu"}>
        {menuGruplari(lang).map((g) => (
          <div key={g.baslik} className={g.ana ? "sm-grup sm-ana" : "sm-grup"}>
            <p className="sm-grup-baslik">{g.baslik}</p>
            {g.linkler.map(([href, ad, tur]) =>
              tur === "ara" ? (
                <p key={ad} className="sm-ara">{ad}</p>
              ) : (
                <a key={href} href={href} onClick={kapat} className={tur ? "sm-alt" : undefined}>{tur && <span aria-hidden>↳ </span>}{ad}</a>
              ),
            )}
          </div>
        ))}
      </nav>
      <p className="sm-dil">
        {lang === "tr" ? <a href="/en/" lang="en" onClick={kapat}>In English →</a> : <a href="/" lang="tr" onClick={kapat}>Türkçe →</a>}
      </p>
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
