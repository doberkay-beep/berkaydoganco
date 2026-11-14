import { ImageResponse } from "next/og";
import { AnaKart, OG_BOYUT, gorsel, ogYazilar } from "@/lib/og/kart";

export const size = OG_BOYUT;
export const contentType = "image/png";
export const alt = "Berkay Doğan — Turkish poet & writer";
export const dynamic = "force-static";

export default async function OG() {
  return new ImageResponse(
    <AnaKart foto={await gorsel("goruntu/0334.jpg")} ust="[00] Turkish poet & writer — Istanbul" solAlt="Mürekkep ve Köz — poetry, 2025" sagAlt="Tasfiye — essays, 2026" dil="en" />,
    { ...size, fonts: await ogYazilar() },
  );
}
