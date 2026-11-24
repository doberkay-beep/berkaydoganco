import type { Metadata } from "next";
import { RadyoStudyoSayfa, RADYO_EN } from "@/components/RadyoStudyoSayfa";

export const metadata: Metadata = {
  title: { absolute: "by. studio · for radio — An app and a website for your station" },
  description: "From Berkay Doğan, maker of nowby.: your station's own iPhone app, a website with live stream and now playing, and a now-playing widget. Fixed price, written quote.",
  alternates: { canonical: "/en/studio/radio", languages: { en: "/en/studio/radio", tr: "/studio/radyo" } },
  openGraph: { title: "An app and a website for your station · by. studio", description: "Station apps, websites and now-playing widgets from the studio behind nowby.", images: ["/by/cihaz/tv.jpg"] },
};

export default function Page() {
  return <RadyoStudyoSayfa m={RADYO_EN} />;
}
