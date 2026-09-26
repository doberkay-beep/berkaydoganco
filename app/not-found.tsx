import type { Metadata } from "next";
import { Kayip } from "@/components/Kayip";

export const metadata: Metadata = {
  title: "404 — Kayıp",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <Kayip />;
}
