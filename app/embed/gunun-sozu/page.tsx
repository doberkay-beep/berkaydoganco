import type { Metadata } from "next";
import GomluSoz from "@/components/GomluSoz";

export const metadata: Metadata = {
  title: { absolute: "Günün Közü — Berkay Doğan" },
  robots: { index: false, follow: true },
};

export default function EmbedPage() {
  return <GomluSoz />;
}
