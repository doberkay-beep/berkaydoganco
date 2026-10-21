import type { Metadata } from "next";
import { AtolyeSayfa } from "@/components/AtolyeSayfa";
import { ATOLYE_EN } from "@/components/AtolyeMetinleri";

export const metadata: Metadata = {
  title: { absolute: "by. — Berkay Doğan's workshop" },
  description: "by. is the app workshop of writer Berkay Doğan. No likes, no followers, no endless feed: apps that take you off your phone and into a place, a moment, a person — hereby. and nowby.",
  alternates: { canonical: "/en/by", languages: { tr: "/by", en: "/en/by" } },
  openGraph: { title: "by. — Berkay Doğan's workshop", description: "A writer's app workshop: hereby. and nowby.", images: ["/by/by-ikon.png"] },
};

export default function Page() {
  return <AtolyeSayfa m={ATOLYE_EN} />;
}
