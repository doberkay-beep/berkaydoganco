import type { Metadata } from "next";
import { AnlarContent } from "@/components/AnlarContent";
export const metadata: Metadata = { title: "Moments", description: "Frames from Istanbul. The silences between the words." };
export default function Page() { return <AnlarContent lang="en" />; }
