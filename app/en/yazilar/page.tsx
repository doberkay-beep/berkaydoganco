import type { Metadata } from "next";
import { getAllYazilar } from "@/lib/yazilar";
import { YazilarList } from "@/components/YazilarList";

export const metadata: Metadata = { title: "Writings", description: "Essays, fragments, and notes by Berkay Doğan." };

export default function Page() {
  const yazilar = getAllYazilar("en");
  return <YazilarList yazilar={yazilar} lang="en" />;
}
