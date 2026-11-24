"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import s from "./ilkSayfa.module.css";

export type GunKaresi = { no: string; w: number; h: number; s: string; kaynak: string };

/* Ana sayfanın açılışı: Berkay'ın kendi fotoğrafı ve yanında kitaplarından bir dize (lib/goruntu).
   Her gün bir başka kare (yılın günü → sıra). Sunucu ilk kareyi basar, tarayıcı günün karesine geçer.
   Dize uydurulmaz: lib/goruntu'daki eşleşmeler lib/sozler'den, baskıya karşı doğrulanmış satırlar. */
export function GununKaresi({ kareler, ilk, imza }: { kareler: GunKaresi[]; ilk: GunKaresi; imza: React.ReactNode }) {
  const [k, setK] = useState<GunKaresi>(ilk);
  useEffect(() => {
    const id = window.setTimeout(() => {
      const simdi = new Date();
      const gun = Math.floor((simdi.getTime() - new Date(simdi.getFullYear(), 0, 0).getTime()) / 86400000);
      setK(kareler[gun % kareler.length]);
    }, 0);
    return () => window.clearTimeout(id);
  }, [kareler]);
  const dikey = k.h > k.w;

  return (
    <div className={`${s.kare} ${dikey ? s.dikey : s.yatay}`}>
      <figure className={s.kareFoto}>
        <img src={`/goruntu/${k.no}.jpg`} alt="Berkay Doğan'ın fotoğrafı" width={k.w} height={k.h} fetchPriority="high" suppressHydrationWarning />
        <figcaption>Fotoğraf: Berkay Doğan</figcaption>
      </figure>
      <div className={s.kareYazi}>
        <figure className={s.dize}>
          <blockquote suppressHydrationWarning>{k.s}</blockquote>
          <figcaption suppressHydrationWarning>{k.kaynak}</figcaption>
        </figure>
        {imza}
      </div>
    </div>
  );
}
