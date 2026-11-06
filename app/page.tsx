import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { WebSiteSchema, PersonSchema, MurekkepBookSchema, TasfiyeBookSchema } from "@/components/Schema";
import { KITAPLAR } from "@/lib/kitaplar";
import { Duvar } from "@/components/anasayfa/Duvar";
import { Ruzgar } from "@/components/anasayfa/Ruzgar";
import s from "@/components/anasayfa/anasayfa.module.css";

// hreflang çifti: Türkçe ana sayfa ↔ İngilizce tanıtım sayfası (/en/).
// alternates sığ birleşir — layout'taki RSS bağlantısı burada yeniden verilir.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { tr: "/", en: "/en/", "x-default": "/" },
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "Berkay Doğan — Yazılar" }] },
  },
};

const yazi = Newsreader({ subsets: ["latin", "latin-ext"], weight: ["300", "400"], style: ["normal", "italic"], display: "swap" });

// Ana sayfa kendi siyah duvarını kullanır; beyaz çıkışta da üst çubuk okunur kalsın.
const SAYFA_STILI =
  "body::before,body::after,body>canvas{display:none!important}body{background:#0a0a0a!important}" +
  ".sm-bar{mix-blend-mode:difference}.sm-marka{color:#fff!important}" +
  ".sm-ac{background:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;border-color:#fff!important;color:#fff!important}";

export default function Page() {
  const [tasfiye, murekkep] = KITAPLAR;
  return (
    <>
      <WebSiteSchema />
      <PersonSchema />
      <MurekkepBookSchema />
      <TasfiyeBookSchema />
      <div className={`${s.sayfa} ${yazi.className}`}>
        <style>{SAYFA_STILI}</style>
        <Ruzgar />
        <Duvar
          tasfiye={{ slug: tasfiye.slug, ad: tasfiye.ad, kapak: tasfiye.kapak, tur: tasfiye.tur, cikis: tasfiye.cikis, desc: tasfiye.desc }}
          murekkep={{ slug: murekkep.slug, ad: murekkep.ad, kapak: murekkep.kapak, tur: murekkep.tur, cikis: murekkep.cikis, desc: murekkep.desc }}
        />
      </div>
    </>
  );
}
