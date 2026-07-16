import type { Metadata } from "next";
import { MediaContent } from "@/components/MediaContent";
export const metadata: Metadata = { title: "Medya", description: "Şairin Hesabı podcast ve videolar. Şiir, edebiyat ve düşünceler üzerine." };
export default function Page() { return <MediaContent lang="tr" />; }
