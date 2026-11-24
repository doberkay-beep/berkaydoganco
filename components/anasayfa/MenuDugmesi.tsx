"use client";

import { useState } from "react";
import { GrupluMenu } from "@/components/SiteMenu";

/* Ana sayfaların telefon menüsü: dar ekranda bağlantılar bu düğmenin açtığı tam ekran menüye taşınır
   (iç sayfalardaki gz-bas çubuğuyla aynı GrupluMenu). Geniş ekranda CSS gizler. */
export function MenuDugmesi({ lang, className }: { lang: "tr" | "en"; className?: string }) {
  const [acik, setAcik] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setAcik(true)} aria-expanded={acik} aria-haspopup="dialog">
        {lang === "tr" ? "Menü" : "Menu"}
      </button>
      {acik && <GrupluMenu lang={lang} kapat={() => setAcik(false)} />}
    </>
  );
}
