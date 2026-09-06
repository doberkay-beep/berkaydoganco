import type { Metadata } from "next";
import GomAraci from "@/components/GomAraci";

export const metadata: Metadata = {
  title: { absolute: "Sitene Göm — Günün Közü" },
  description: "Blogun ya da siten varsa Günün Közü'nü tek parça kodla göm — her gün Berkay Doğan'dan taze bir söz.",
  alternates: { canonical: "/gom" },
};

export default function GomPage() {
  return <GomAraci />;
}
