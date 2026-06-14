import type { Metadata } from "next";
import { getAllYazilar } from "@/lib/yazilar";
import { YazilarList } from "@/components/YazilarList";

export const metadata: Metadata = { title: "Yazılar — Berkay Doğan", description: "Berkay Doğan'ın denemeleri, kesitleri ve notları." };

export default function Page() {
  const yazilar = getAllYazilar("tr");
  return <YazilarList yazilar={yazilar} lang="tr" />;
}
