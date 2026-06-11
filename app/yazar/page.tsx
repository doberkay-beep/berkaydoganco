import type { Metadata } from "next";
import { AuthorContent } from "@/components/AuthorContent";
export const metadata: Metadata = { title: "Yazar — Berkay Doğan", description: "Berkay Doğan, İstanbul'da yaşayan şair ve yazardır." };
export default function Page() { return <AuthorContent lang="tr" />; }
