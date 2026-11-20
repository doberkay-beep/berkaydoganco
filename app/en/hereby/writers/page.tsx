import type { Metadata } from "next";
import { WritersTracesEn } from "@/components/WritersTracesEn";

export const metadata: Metadata = {
  itunes: { appId: "6825787016" },
  title: { absolute: "Writers’ traces — hereby." },
  description: "Words, back where they were written: lines by Orhan Veli and Sait Faik wait at thirteen places in Istanbul, and open only when you go there. Public-domain texts, in the original language, placed with writers’ houses and literary museums.",
  alternates: { canonical: "/en/hereby/writers" },
  openGraph: {
    title: "Writers’ traces — hereby.",
    description: "Words, back where they were written. You have to go there to read them.",
    images: [{ url: "/sait-faik-120/og.jpg", width: 1200, height: 630 }],
  },
};

export default function WritersPage() {
  return <WritersTracesEn />;
}
