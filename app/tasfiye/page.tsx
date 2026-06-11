import type { Metadata } from "next";
import { TasfiyeContent } from "@/components/TasfiyeContent";
export const metadata: Metadata = { title: "Tasfiye — Berkay Doğan", description: "Tasfiye, görmezden gelmeyi seçtiğimiz her şeye verilmiş bir isimdir. Deneme kitabı. Aralık 2026." };
export default function Page() { return <TasfiyeContent lang="tr" />; }
