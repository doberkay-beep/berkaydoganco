import type { Metadata } from "next";
import { NowbySayfa, NOWBY_EN } from "@/components/NowbySayfa";

export const metadata: Metadata = {
  title: { absolute: "nowby. — What is playing on Türkiye's radio right now?" },
  description: "nowby.: hundreds of stations on one screen, live. The same frequency on iPhone, iPad, Mac, Apple TV and Apple Watch. From Berkay Doğan's by. workshop.",
  alternates: { canonical: "/en/nowby", languages: { tr: "/nowby", en: "/en/nowby" } },
  openGraph: { title: "nowby. — The same frequency, on every screen", description: "What is playing on Türkiye's radio right now? iPhone, iPad, Mac, Apple TV and Apple Watch.", images: ["/nowby/og.jpg"] },
};

export default function Page() {
  return <NowbySayfa m={NOWBY_EN} />;
}
