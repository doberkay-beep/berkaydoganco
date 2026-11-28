import type { Metadata } from "next";
import { FramebySayfa, FRAMEBY_EN } from "@/components/FramebySayfa";

export const metadata: Metadata = {
  title: { absolute: "frameby. — A frame of a city, the radio of that moment" },
  description: "frameby.: Istanbul frames drifting slowly across your screen, with that moment's radio playing live. Twelve frames a day. On the App Store for iPhone, iPad and Mac. From Berkay Doğan's by. workshop.",
  alternates: { canonical: "/en/frameby", languages: { tr: "/frameby", en: "/en/frameby" } },
  openGraph: { title: "frameby. — A window on the wall", description: "A frame of a city, the radio of that moment. On the App Store for iPhone, iPad and Mac.", images: ["/frameby/kareler/iph-20240418-051.jpg"] },
};

export default function Page() {
  return <FramebySayfa m={FRAMEBY_EN} />;
}
