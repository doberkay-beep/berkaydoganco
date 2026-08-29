import type { Metadata } from "next";
import Film from "@/components/Film";

export const metadata: Metadata = {
  title: { absolute: "Film — Berkay Doğan" },
  description: "Sitenin 35 saniyelik sinematik tanıtımı: mühür, daktilo, mahkeme, leke, köz — ve Tasfiye.",
  alternates: { canonical: "/film" },
  robots: { index: false, follow: true },
};

export default function FilmPage() {
  return <Film />;
}
