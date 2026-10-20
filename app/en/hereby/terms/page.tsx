import type { Metadata } from "next";
import { HerebySayfa, h2 } from "@/components/HerebySayfa";

export const metadata: Metadata = {
  title: { absolute: "Terms of Use — hereby." },
  description: "Terms of use for the Hereby app: what can be left here, and what can't.",
  alternates: { canonical: "/en/hereby/terms", languages: { tr: "/hereby/kosullar", en: "/en/hereby/terms" } },
};

export default function TermsPage() {
  return (
    <HerebySayfa en ust="Hereby" baslik="Terms of use" guncelleme="October 20, 2026">
      <p>To write somewhere is to call someone to that place. By using Hereby, you agree to the rules below.</p>
      <h2 style={h2}>Thoughts are left here</h2>
      <p>Hereby is for leaving what a place makes you think. A line, a verse, a confession. A trace is at most 280 characters.</p>
      <h2 style={h2}>Don't expose anyone</h2>
      <p>Don't write a person's name, address, phone number, photo or any other information that could identify them. Don't share your own personal information either. Lines containing a phone number, an email address or a link are rejected automatically.</p>
      <h2 style={h2}>Don't harm anyone</h2>
      <p>Harassment, threats, hate speech, discrimination, incitement to violence and illegal content are prohibited.</p>
      <h2 style={h2}>No ads, no spam</h2>
      <p>Hereby is not a notice board. Commercial promotion and repetitive content are removed.</p>
      <h2 style={h2}>Reporting, blocking and removal</h2>
      <p>You can report a disturbing trace from within the app and block its author. A trace reported by three different people is hidden from everyone until it is reviewed. Traces that break the rules are removed; repeat offenders lose access. Reports are reviewed within 24 hours.</p>
      <h2 style={h2}>If you're going through a hard time</h2>
      <p>If you are thinking about harming yourself or someone else, call your local emergency number (112 in Türkiye and Europe, 911 in the US).</p>
      <h2 style={h2}>Your content is yours</h2>
      <p>The lines you leave belong to you. You share them on Hereby to be shown to people who come to that place. You can delete your traces and your account from within the app at any time.</p>
      <h2 style={h2}>Liability</h2>
      <p>Hereby is an app in testing and is provided as is. Users are responsible for the content of the traces they write.</p>
    </HerebySayfa>
  );
}
