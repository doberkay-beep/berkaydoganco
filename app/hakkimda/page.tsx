import type { Metadata } from "next";
import { HakkimdaSayfa } from "@/components/BolumSayfalari";
import { PersonSchema, ProfilePageSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: { absolute: "Hakkımda — Berkay Doğan" },
  description: "Şair ve yazar Berkay Doğan: Mürekkep ve Köz ile Tasfiye'nin yazarı; hereby. ve nowby. uygulamalarını geliştiriyor. Yolculuk, biyografi ve okur yorumları.",
  alternates: { canonical: "/hakkimda" },
  openGraph: {
    title: "Hakkımda — Berkay Doğan",
    description: "Şair ve yazar Berkay Doğan: Mürekkep ve Köz ile Tasfiye'nin yazarı; hereby. ve nowby. uygulamalarını geliştiriyor. Yolculuk, biyografi ve okur yorumları.",
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
