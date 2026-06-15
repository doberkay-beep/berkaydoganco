import type { Metadata } from "next";
import { MediaContent } from "@/components/MediaContent";
export const metadata: Metadata = { title: "Medya — Berkay Doğan", description: "Şairin Hesabı podcast ve videolar. Şiir, edebiyat ve düşünceler üzerine." };
export default function Page() { return <MediaContent lang="tr" />; }
