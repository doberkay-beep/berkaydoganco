import type { Metadata } from "next";
import SairinMasasi from "@/components/SairinMasasi";

export const metadata: Metadata = {
  title: { absolute: "Şairin Masası — Berkay Doğan" },
  description: "Berkay Doğan'ın masası — daktilo, kitaplar, radyo, lamba. Her nesne bir kapı: keşfedilebilir bir sahne.",
  alternates: { canonical: "/masa" },
  openGraph: {
    title: "Şairin Masası — Berkay Doğan",
    description: "Her nesne bir kapı: keşfedilebilir bir sahne.",
    url: "https://www.berkaydogan.co/masa",
    type: "website",
  },
};

export default function MasaPage() {
  return <SairinMasasi />;
}
