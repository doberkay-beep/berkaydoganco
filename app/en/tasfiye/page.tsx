import type { Metadata } from "next";
import { TasfiyeContent } from "@/components/TasfiyeContent";
export const metadata: Metadata = { title: "Tasfiye — Berkay Doğan", description: "Tasfiye is a name given to everything we choose not to see. An essay collection. August 2026." };
export default function Page() { return <TasfiyeContent lang="en" />; }
