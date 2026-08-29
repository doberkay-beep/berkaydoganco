import type { Metadata } from "next";
import MurekkepLekesi from "@/components/MurekkepLekesi";

export const metadata: Metadata = {
  title: { absolute: "Mürekkep Lekesi — Berkay Doğan" },
  description: "Dört mürekkep lekesi. Ne gördüğünü söyle; sende kalan dizeyi ve sana göre kitabı söyleyelim.",
  alternates: { canonical: "/leke" },
  openGraph: {
    title: "Mürekkep Lekesi",
    description: "Dört leke. Ne gördüğünü söyle; sende kalan dizeyi söyleyelim.",
    url: "https://www.berkaydogan.co/leke",
    type: "website",
  },
};

export default function LekePage() {
  return <MurekkepLekesi />;
}
