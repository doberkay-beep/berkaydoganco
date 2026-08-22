import type { Metadata } from "next";
import KozEvreni from "@/components/KozEvreni";

export const metadata: Metadata = {
  title: { absolute: "Köz Evreni — Berkay Doğan" },
  description: "Berkay Doğan'ın dizelerinden interaktif bir şiir evreni — közlere dokun, dizeler açılsın, takımyıldızlar kurulsun.",
  alternates: { canonical: "/evren" },
  openGraph: {
    title: "Köz Evreni — Berkay Doğan",
    description: "Dizelerden interaktif bir şiir evreni.",
    url: "https://www.berkaydogan.co/evren",
    type: "website",
  },
};

export default function EvrenPage() {
  return <KozEvreni />;
}
