import type { Metadata } from "next";
import { SOZLER, sozSlug, KITAP_ADI } from "@/lib/sozler";
import OkumaOdasi, { type OdaSoz } from "@/components/OkumaOdasi";

export const dynamic = "force-static";

const SITE = "https://www.berkaydogan.co";

export const metadata: Metadata = {
  title: { absolute: "Okuma Odası — Berkay Doğan" },
  description: "Tam ekran bir okuma odası: sözler yavaşça belirir, istersen arka planda bir radyo çalar. Şiir ile ses aynı yerde.",
  alternates: { canonical: "/oda" },
  openGraph: {
    title: "Okuma Odası — Berkay Doğan",
    description: "Sözler ve radyo bir arada — sakin, tam ekran bir okuma odası.",
    url: `${SITE}/oda`,
    type: "website",
  },
};

export default function OdaPage() {
  const sozler: OdaSoz[] = SOZLER.map((x) => ({
    s: x.s,
    slug: sozSlug(x.s),
    kitap: KITAP_ADI[x.k],
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Okuma Odası — Berkay Doğan",
    url: `${SITE}/oda/`,
    isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": `${SITE}/#person` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OkumaOdasi sozler={sozler} />
    </>
  );
}
