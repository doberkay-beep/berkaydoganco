import type { Metadata } from "next";
import { AtolyeSayfa } from "@/components/AtolyeSayfa";
import { ATOLYE_TR } from "@/components/AtolyeMetinleri";

export const metadata: Metadata = {
  title: { absolute: "by. — Berkay Doğan'ın atölyesi" },
  description: "by., yazar Berkay Doğan'ın uygulama atölyesi. Beğenisiz, takipçisiz, sonsuz akışsız; seni telefondan alıp bir yere, bir âna, bir insana götüren uygulamalar: hereby. ve nowby.",
  alternates: { canonical: "/by", languages: { tr: "/by", en: "/en/by" } },
  openGraph: { title: "by. — Berkay Doğan'ın atölyesi", description: "Bir yazarın uygulama atölyesi: hereby. ve nowby.", images: ["/by/by-ikon.png"] },
};

export default function Sayfa() {
  return <AtolyeSayfa m={ATOLYE_TR} />;
}
