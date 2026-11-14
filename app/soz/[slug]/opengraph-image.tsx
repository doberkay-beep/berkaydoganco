import { ImageResponse } from "next/og";
import { SOZLER, sozSlug, sozBul, KITAP_ADI } from "@/lib/sozler";
import { Kart, OG_BOYUT, ogYazilar } from "@/lib/og/kart";

/* Her söz sayfasına derlemede üretilen paylaşım kartı (yazar-noir). Dize korpustan, birebir. */

export const size = OG_BOYUT;
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return SOZLER.map((x) => ({ slug: sozSlug(x.s) }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const soz = sozBul(slug) ?? SOZLER[0];
  const boy = soz.s.length > 130 ? 46 : soz.s.length > 80 ? 56 : soz.s.length > 40 ? 70 : 88;
  return new ImageResponse(
    <Kart ust="[03] Söz" baslik={`“${soz.s}”`} boy={boy} sagAlt={`${KITAP_ADI[soz.k]}${soz.p ? ` · s. ${soz.p}` : ""}`} />,
    { ...size, fonts: await ogYazilar() },
  );
}
