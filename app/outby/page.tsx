import type { Metadata } from "next";
import { OutbySayfa } from "@/components/OutbySayfa";

export const metadata: Metadata = {
  title: { absolute: "outby. — Ekrandan sokağa" },
  description: "outby.: insanı ekrandan çıkarıp bir yere götüren hareket. Berkay Doğan'ın manifestosu ve Kadıköy iskelesindeki ilk iz.",
  alternates: { canonical: "/outby" },
};

export default function Sayfa() {
  return <OutbySayfa />;
}
