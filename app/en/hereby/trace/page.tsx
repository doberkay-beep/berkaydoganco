import type { Metadata } from "next";
import { HediyeIzi } from "@/components/HediyeIzi";

export const metadata: Metadata = {
  title: { absolute: "A line was left for you — hereby." },
  description: "Someone left you a line somewhere. You have to go there to read it.",
  robots: { index: false, follow: false },
  itunes: { appId: "6825787016" },
  openGraph: { title: "A line was left for you", description: "You have to go there to read it.", images: ["/hereby/vitrin-1.jpg"] },
};

export default function GiftTracePage() {
  return <HediyeIzi dil="en" />;
}
