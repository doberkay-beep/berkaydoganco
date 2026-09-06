import type { Metadata } from "next";
import Mahkeme from "@/components/Mahkeme";

export const metadata: Metadata = {
  title: { absolute: "Tasfiye Mahkemesi — Berkay Doğan" },
  description: "Sanık koltuğuna otur. Beş soru, bir hüküm — Tasfiye'nin sayfalarından. Bu bir suçlama değil; bir hesap.",
  alternates: { canonical: "/mahkeme" },
  openGraph: {
    title: "Tasfiye Mahkemesi",
    description: "Sanık koltuğuna otur. Beş soru, bir hüküm — Tasfiye'nin sayfalarından.",
    url: "https://www.berkaydogan.co/mahkeme",
    type: "website",
  },
};

export default function MahkemePage() {
  return <Mahkeme />;
}
