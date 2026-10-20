import type { Metadata } from "next";
import Link from "next/link";
import { HerebySayfa } from "@/components/HerebySayfa";

export const metadata: Metadata = {
  title: { absolute: "hereby. — Leave a thought in a place" },
  description: "Hereby is a way to leave the line on your mind in the place you pass. A trace can only be read by going there. No likes, no followers.",
  alternates: { canonical: "/en/hereby", languages: { tr: "/hereby", en: "/en/hereby" } },
};

export default function HerebyEnPage() {
  return (
    <HerebySayfa en ust="An app by Berkay Doğan" baslik="Leave a thought in a place." guncelleme="October 21, 2026">
      <p>People have forgotten how to think. Sometimes a thought passes through you, and you only remember it when you return to that place.</p>
      <p>Hereby is a way to leave that thought in that place. On a ferry pier, on a staircase, by the sea: write the line on your mind and leave it there. Only someone who comes to that place can read it. No likes, no followers; just places and sentences.</p>
      <p>The app is currently in testing. <Link href="/en/hereby/terms" style={{ textDecoration: "underline" }}>Terms of use</Link> · <Link href="/en/hereby/privacy" style={{ textDecoration: "underline" }}>Privacy policy</Link></p>
    </HerebySayfa>
  );
}
