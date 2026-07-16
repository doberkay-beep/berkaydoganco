import type { Metadata } from "next";
import { AnlarContent } from "@/components/AnlarContent";
export const metadata: Metadata = { title: "Anlar", description: "İstanbul'dan kareler. Kelimelerin arasındaki sessizlikler." };
export default function Page() { return <AnlarContent lang="tr" />; }
