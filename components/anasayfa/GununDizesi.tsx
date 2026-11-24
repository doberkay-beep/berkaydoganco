"use client";

import { useEffect, useState } from "react";
import s from "./ilkSayfa.module.css";

export type Dize = { s: string; kaynak: string };

/* Ana sayfanın açılış dizesi: her gün bir başkası (yılın günü → sıra).
   Sunucu ilk dizeyi basar; tarayıcı günün dizesine geçer. Dizeler yalnız lib/sozler'den
   (yayımlanmış, baskıya karşı doğrulanmış satırlar) gelir; burada metin üretilmez. */
export function GununDizesi({ dizeler, ilk }: { dizeler: Dize[]; ilk: Dize }) {
  const [d, setD] = useState<Dize>(ilk);
  useEffect(() => {
    const id = window.setTimeout(() => {
      const simdi = new Date();
      const gun = Math.floor((simdi.getTime() - new Date(simdi.getFullYear(), 0, 0).getTime()) / 86400000);
      setD(dizeler[gun % dizeler.length]);
    }, 0);
    return () => window.clearTimeout(id);
  }, [dizeler]);

  return (
    <figure className={s.dize}>
      <blockquote suppressHydrationWarning>{d.s}</blockquote>
      <figcaption suppressHydrationWarning>{d.kaynak}</figcaption>
    </figure>
  );
}
