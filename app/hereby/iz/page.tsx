import type { Metadata } from "next";
import { HediyeIzi } from "@/components/HediyeIzi";

export const metadata: Metadata = {
  title: { absolute: "Sana bir satır bırakıldı — hereby." },
  description: "Biri sana bir yerde bir satır bıraktı. Okumak için oraya gitmen gerek.",
  robots: { index: false, follow: false },
  itunes: { appId: "6825787016" },
  openGraph: { title: "Sana bir satır bırakıldı", description: "Okumak için oraya gitmen gerek.", images: ["/hereby/vitrin-1.jpg"] },
};

export default function HediyeIziPage() {
  return <HediyeIzi dil="tr" />;
}
