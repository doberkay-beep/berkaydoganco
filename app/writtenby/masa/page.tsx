import type { Metadata } from "next";
import { WrittenbyMasa } from "@/components/WrittenbyMasa";

export const metadata: Metadata = {
  title: { absolute: "writtenby. — masa" },
  robots: { index: false, follow: false },
};

export default function Sayfa() {
  return <WrittenbyMasa />;
}
