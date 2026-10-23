import type { Metadata } from "next";
import { WrittenbySanatci, SANATCI_EN } from "@/components/WrittenbySanatci";

export const metadata: Metadata = {
  title: { absolute: "writtenby. — Artists" },
  description: "The artists' layer of writtenby.: among a city's lines, signed pages by selected artists. By application or invitation; any subject, any form. They meet in the Istanbul 2027 book.",
  alternates: { canonical: "/en/writtenby/artists", languages: { tr: "/writtenby/sanatcilar", en: "/en/writtenby/artists" } },
  openGraph: { title: "writtenby. — Artists", description: "Among a city's lines, signed pages.", images: ["/writtenby/poster.jpg"] },
};

export default function Page() {
  return <WrittenbySanatci m={SANATCI_EN} />;
}
