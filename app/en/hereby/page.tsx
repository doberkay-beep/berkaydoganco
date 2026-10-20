import type { Metadata } from "next";
import { HerebyTanitim, HEREBY_EN } from "@/components/HerebyTanitim";

export const metadata: Metadata = {
  title: { absolute: "hereby. — Leave a thought in a place" },
  description: "Hereby, an app by poet Berkay Doğan: leave the line on your mind in the place you pass; only someone who comes there can read it. Poetry walks, time capsules, notes to self. No likes, no followers.",
  alternates: { canonical: "/en/hereby", languages: { tr: "/hereby", en: "/en/hereby" } },
  openGraph: { title: "hereby. — Leave a thought in a place", description: "Leave the line on your mind in the place you pass. You have to go there to read it.", images: ["/hereby/vitrin-1.jpg"] },
};

export default function HerebyEnPage() {
  return <HerebyTanitim m={HEREBY_EN} />;
}
