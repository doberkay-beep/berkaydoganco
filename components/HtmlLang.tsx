"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Kök layout tek bir <html> uretiyor (lang="tr"). /en altindaki sayfalarda
 * lang'i "en" yapar. Not: bu istemci tarafinda calisir; sunulan statik HTML'de
 * lang hala "tr" gelir. Tam statik cozum icin route group'larla (tr)/(en)
 * ayri kok layout'lar gerekir.
 */
export function HtmlLang() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = pathname.startsWith("/en") ? "en" : "tr";
  }, [pathname]);

  return null;
}
