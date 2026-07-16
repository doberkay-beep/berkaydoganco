import type { Metadata } from "next";
import { TasfiyeContent } from "@/components/TasfiyeContent";
import { TasfiyeBookSchema } from "@/components/Schema";
export const metadata: Metadata = { title: "Tasfiye", description: "Tasfiye is a name given to everything we choose not to see. An essay collection. August 2026." };
export default function Page() {
  return (
    <>
      <TasfiyeBookSchema />
      <TasfiyeContent lang="en" />
    </>
  );
}
