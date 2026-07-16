import type { Metadata } from "next";
import { TasfiyeContent } from "@/components/TasfiyeContent";
import { TasfiyeBookSchema } from "@/components/Schema";
export const metadata: Metadata = { title: "Tasfiye", description: "Tasfiye, görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isimdir. Deneme kitabı. Ağustos 2026." };
export default function Page() {
  return (
    <>
      <TasfiyeBookSchema />
      <TasfiyeContent lang="tr" />
    </>
  );
}
