import type { Metadata } from "next";
import { BasindaContent } from "@/components/BasindaContent";
export const metadata: Metadata = { title: "Basında", description: "Berkay Doğan basında: yayınlar, yankılar ve kilometre taşları. Valsanat Dergisi, Trendyol #1, Goodreads." };
export default function Page() { return <BasindaContent lang="tr" />; }
