import type { Metadata } from "next";
import { HakkimdaSayfa } from "@/components/BolumSayfalari";
import { PersonSchema, ProfilePageSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: { absolute: "Hakkımda — Berkay Doğan" },
  description: "Berkay Doğan kimdir: biyografi, eserler, tanınırlık ve okur yorumları.",
  alternates: { canonical: "/hakkimda" },
  openGraph: {
    title: "Hakkımda — Berkay Doğan",
    description: "Berkay Doğan kimdir: biyografi, eserler, tanınırlık ve okur yorumları.",
    url: "https://www.berkaydogan.co/hakkimda",
    type: "website",
  },
};

export default function Sayfa() {
  return (
    <>
      <PersonSchema />
      <ProfilePageSchema />
      <HakkimdaSayfa />
    </>
  );
}
