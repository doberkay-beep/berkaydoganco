import type { Metadata } from "next";
import { FramebySayfa, FRAMEBY_TR } from "@/components/FramebySayfa";

export const metadata: Metadata = {
  title: { absolute: "frameby. — Bir şehrin karesi, o anın radyosu" },
  description: "frameby.: ekranında yavaşça akan İstanbul kareleri, arkada o anın canlı radyosu. Günde on iki kare. App Store'da: iPhone, iPad ve Mac. Berkay Doğan'ın by. atölyesinden.",
  alternates: { canonical: "/frameby", languages: { tr: "/frameby", en: "/en/frameby" } },
  openGraph: { title: "frameby. — Duvarda bir pencere", description: "Bir şehrin karesi, o anın radyosu. App Store'da: iPhone, iPad ve Mac.", images: ["/frameby/kareler/iph-20240418-051.jpg"] },
};

export default function Sayfa() {
  return <FramebySayfa m={FRAMEBY_TR} />;
}
