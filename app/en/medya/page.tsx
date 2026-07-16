import type { Metadata } from "next";
import { MediaContent } from "@/components/MediaContent";
export const metadata: Metadata = { title: "Media", description: "Şairin Hesabı podcast and videos. On poetry, literature, and ideas." };
export default function Page() { return <MediaContent lang="en" />; }
