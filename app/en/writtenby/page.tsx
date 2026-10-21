import type { Metadata } from "next";
import { WrittenbySayfa, WRITTENBY_EN } from "@/components/WrittenbySayfa";

export const metadata: Metadata = {
  title: { absolute: "writtenby. — A book written by a city" },
  description: "writtenby.: the same question for everyone each day, one line from where you stand. At year's end Berkay Doğan builds a printed book from these lines. First book: Istanbul 2027.",
  alternates: { canonical: "/en/writtenby", languages: { tr: "/writtenby", en: "/en/writtenby" } },
  openGraph: { title: "writtenby. — A book written by a city", description: "One question a day, one line from where you stand, a printed book at year's end. Istanbul 2027.", images: ["/writtenby/poster.jpg"] },
};

export default function Page() {
  return <WrittenbySayfa m={WRITTENBY_EN} />;
}
