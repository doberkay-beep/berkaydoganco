import type { Metadata } from "next";
import { DeneyimlerSayfa } from "@/components/BolumSayfalari";
import { DENEYIMLER } from "@/lib/deneyimler";

const SITE = "https://www.berkaydogan.co";

export const metadata: Metadata = {
  title: { absolute: "İnteraktif Edebiyat Deneyimleri — Berkay Doğan" },
  description: "Okumakla kalma; içine gir. Okurunu sanık koltuğuna oturtan Tasfiye Mahkemesi, mürekkep lekesi testi, sinematik fragman, yaşayan kapak, köz evreni ve 12 interaktif edebiyat deneyimi — hepsi tarayıcıda, hepsi ücretsiz.",
  alternates: { canonical: "/deneyimler" },
  openGraph: {
    title: "İnteraktif Edebiyat Deneyimleri — Berkay Doğan",
    description: "Mahkeme, mürekkep lekesi, fragman, yaşayan kapak ve 12 interaktif deneyim — kitapların içinden doğdu.",
    url: `${SITE}/deneyimler`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Berkay Doğan — İnteraktif Edebiyat Deneyimleri",
  description: "Mürekkep ve Köz ile Tasfiye kitaplarından doğan interaktif web deneyimleri.",
  numberOfItems: DENEYIMLER.length,
  itemListElement: DENEYIMLER.map((d, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: d.tr,
    description: d.trDesc,
    url: `${SITE}${d.href}/`,
  })),
};

export default function Sayfa() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DeneyimlerSayfa />
    </>
  );
}
