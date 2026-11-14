import { ImageResponse } from "next/og";
import { AnaKart, OG_BOYUT, gorsel, ogYazilar } from "@/lib/og/kart";

export const size = OG_BOYUT;
export const contentType = "image/png";
export const alt = "Berkay Doğan — Şair & Yazar";
export const dynamic = "force-static";

export default async function OG() {
  return new ImageResponse(
    <AnaKart foto={await gorsel("goruntu/0334.jpg")} ust="[00] Şair & yazar — İstanbul" solAlt="Mürekkep ve Köz — 2025" sagAlt="Tasfiye — 2026" />,
    { ...size, fonts: await ogYazilar() },
  );
}
