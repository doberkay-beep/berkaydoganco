"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Muhur } from "./Muhur";
import { menuGruplari } from "@/lib/menu";

/* Sitenin tek menüsü. Önce okura en çok gereken beş bağlantı, sonra okuma arşivi, sonra diğer çalışmalar.
   Gizlilik ve koşullar burada değil; ilgili uygulama sayfalarının altında duruyor.
   Kabuk'lu sayfalarda (ana sayfa, Hakkımda, İzle & Dinle…) Kabuk'un kendi üst çubuğu bu menüyü açar;
   diğer bütün sayfalarda layout'taki SiteMenu ince bir üst çubuk gösterir. İkisi aynı anda görünmez
   (globals.css: body:has(.cg-nav) .sm-bar). */

/** Tam ekran gruplu menü. Esc ile kapanır, açıkken sayfa kaymaz. */
export function GrupluMenu({ lang, kapat }: { lang: "tr" | "en"; kapat: () => void }) {
  const kapatDugme = useRef<HTMLButtonElement | null>(null);
  // Klavye: açılınca odak Kapat'a, kapanınca menüyü açan düğmeye döner.
  useEffect(() => {
    const onceki = document.activeElement as HTMLElement | null;
    kapatDugme.current?.focus();
    return () => onceki?.focus?.();
  }, []);
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
        <button ref={kapatDugme} className="sm-kapat" onClick={kapat} aria-label={lang === "tr" ? "Menüyü kapat" : "Close menu"}>{lang === "tr" ? "Kapat" : "Close"}</button>
      </div>
      <nav className="sm-gruplar" aria-label={lang === "tr" ? "Site menüsü" : "Site menu"}>
        {menuGruplari(lang).map((g, gi) => (
          <div key={g.baslik} className={g.ana ? "sm-grup sm-ana" : "sm-grup"}>
            <p className="sm-grup-baslik">[{String(gi + 1).padStart(2, "0")}] {g.baslik}</p>
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
        <div className="sm-sag">
          {/* Masaüstünde okura en çok gereken dört bağlantı; tamamı Menü'de. */}
          <nav className="sm-kisa" aria-label={lang === "tr" ? "Kısa menü" : "Quick menu"}>
            {menuGruplari(lang)[0].linkler.slice(0, 4).map(([href, ad], i) => (
              <a key={href} href={href}><span aria-hidden>{String(i + 1).padStart(2, "0")}</span>{ad}</a>
            ))}
          </nav>
          <button className="sm-ac" onClick={() => setAcik(true)} aria-expanded={acik} aria-haspopup="dialog">{lang === "tr" ? "Menü" : "Menu"}</button>
        </div>
      </header>
      {acik && <GrupluMenu lang={lang} kapat={() => setAcik(false)} />}
    </>
  );
}
