import type { Metadata } from "next";
import { StudioSayfa, STUDIO_EN } from "@/components/StudioSayfa";

export const metadata: Metadata = {
  title: { absolute: "by. studio — Apps and websites, made with a writer's care" },
  description: "Berkay Doğan, writer and developer, designs and builds iOS apps, websites and live data products. Selected work: nowby., hereby., writtenby. Available for remote projects in the Netherlands, the UK and Europe.",
  alternates: { canonical: "/en/studio", languages: { en: "/en/studio", tr: "/studio" } },
  openGraph: { title: "by. studio — Apps and websites, made with a writer's care", description: "iOS apps, websites and live data products by writer and developer Berkay Doğan.", images: ["/by/by-ikon.png"] },
};

export default function Page() {
  return <StudioSayfa m={STUDIO_EN} />;
}
