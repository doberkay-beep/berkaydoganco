"use client";

import { useEffect, useState } from "react";

/* Gazete künyesindeki tarih: sayfa statik basıldığı için tarayıcıda, okurun gününe göre yazılır.
   Sunucuda yalnız şehir adı görünür; tarih ilk boyamadan hemen sonra eklenir. */
export function Bugun({ lang = "tr" }: { lang?: "tr" | "en" }) {
  const [tarih, setTarih] = useState("");
  useEffect(() => {
    const yerel = lang === "tr" ? "tr-TR" : "en-GB";
    const simdi = new Date();
    const gun = new Intl.DateTimeFormat(yerel, { weekday: "long", timeZone: "Europe/Istanbul" }).format(simdi);
    const tam = new Intl.DateTimeFormat(yerel, { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul" }).format(simdi);
    const t = `${gun}, ${tam}`;
    const id = window.setTimeout(() => setTarih(t), 0);
    return () => window.clearTimeout(id);
  }, [lang]);
  return <span suppressHydrationWarning>{tarih ? ` · ${tarih}` : ""}</span>;
}
