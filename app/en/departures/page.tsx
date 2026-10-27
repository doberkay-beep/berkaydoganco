import type { Metadata } from "next";
import { GidisZinciriSayfa, GIDIS_EN } from "@/components/GidisZinciriSayfa";

export const metadata: Metadata = {
  title: { absolute: "The departure chain — hereby." },
  description: "Nine cities, nine lines: Berkay Doğan's traces from Istanbul to Berlin, Paris to Bursa. Each opens only for someone who goes there, and sends the reader on to the next city.",
  alternates: { canonical: "/en/departures", languages: { tr: "/gidis", en: "/en/departures" } },
};

export default function Page() {
  return <GidisZinciriSayfa m={GIDIS_EN} />;
}
