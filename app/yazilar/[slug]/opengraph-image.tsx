import { ImageResponse } from "next/og";
import { YAZILAR } from "@/lib/yazilar";
import { Kart, OG_BOYUT, ogYazilar } from "@/lib/og/kart";

/* Her yazı sayfasına derlemede üretilen paylaşım kartı (yazar-noir). */

export const size = OG_BOYUT;
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return YAZILAR.map((y) => ({ slug: y.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const y = YAZILAR.find((x) => x.slug === slug) ?? YAZILAR[0];
  const boy = y.title.length > 44 ? 64 : y.title.length > 26 ? 80 : 96;
  const dek = y.dek ? (y.dek.length > 120 ? `${y.dek.slice(0, 117)}…` : y.dek) : undefined;
  return new ImageResponse(
    <Kart ust="[02] Yazı" baslik={y.title} alt={dek} boy={boy} sagAlt={y.dateText} />,
    { ...size, fonts: await ogYazilar() },
  );
}
