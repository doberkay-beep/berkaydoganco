import type { Metadata } from "next";
import { MurekkepContent } from "@/components/MurekkepContent";
import { MurekkepBookSchema } from "@/components/Schema";
export const metadata: Metadata = { title: "Mürekkep ve Köz", description: "Bir Şairin Hesabı. İskenderiye Yayınları, Aralık 2025. Trendyol Şiir Kategorisi #1." };
export default function Page() {
  return (
    <>
      <MurekkepBookSchema />
      <MurekkepContent lang="tr" />
    </>
  );
}
