import type { Metadata } from "next";
import { MurekkepContent } from "@/components/MurekkepContent";
import { MurekkepBookSchema } from "@/components/Schema";
export const metadata: Metadata = { title: "Ink and Ember", description: "A Poet's Reckoning. İskenderiye Publishing, December 2025. #1 in Poetry on Trendyol." };
export default function Page() {
  return (
    <>
      <MurekkepBookSchema />
      <MurekkepContent lang="en" />
    </>
  );
}
