import { ImageResponse } from "next/og";
import { KITAPLAR } from "@/lib/kitaplar";
import { Kart, OG_BOYUT, gorsel, ogYazilar } from "@/lib/og/kart";

/* Her kitap sayfasına derlemede üretilen paylaşım kartı (yazar-noir, gerçek kapakla). */

export const size = OG_BOYUT;
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return KITAPLAR.map((k) => ({ slug: k.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const k = KITAPLAR.find((x) => x.slug === slug) ?? KITAPLAR[0];
  const desc = k.desc.length > 130 ? `${k.desc.slice(0, 127)}…` : k.desc;
  return new ImageResponse(
    <Kart
      ust={`[01] Kitap · ${k.tur}`}
      baslik={k.ad}
      alt={`${k.altBaslik}. ${desc}`}
      boy={k.ad.length > 12 ? 92 : 120}
      sagAlt={`İskenderiye Yayınları · ${k.cikis}`}
      gorselSrc={await gorsel(k.kapak400.replace(/^\//, ""))}
      gorselGenislik={290}
    />,
    { ...size, fonts: await ogYazilar() },
  );
}
