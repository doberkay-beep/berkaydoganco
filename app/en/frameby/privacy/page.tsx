import type { Metadata } from "next";
import { FramebyYasalSayfa, h2 } from "@/components/FramebyYasalSayfa";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy — frameby." },
  description: "What the frameby app uses: no account, no tracking, no personal data collected.",
  alternates: { canonical: "/en/frameby/privacy", languages: { tr: "/frameby/gizlilik" } },
};

export default function Page() {
  return (
    <FramebyYasalSayfa en baslik="Privacy policy" guncelleme="25 November 2026">
      <p>frameby is made by Berkay Doğan. This page explains what the app uses and why. In short: frameby collects no personal information from you.</p>
      <h2 style={h2}>No account</h2>
      <p>frameby needs no sign-up. It does not ask for your name, email, phone number or location, and it does not create an identifier for you.</p>
      <h2 style={h2}>Frames</h2>
      <p>The photographs belong to Berkay Doğan or come from public-domain archives. The app downloads the day’s frames from the frameby server and keeps them on your device. Your device’s IP address reaches the server in the process; it is not stored or linked to you.</p>
      <h2 style={h2}>Radio</h2>
      <p>The radio behind each frame plays straight from that station’s own stream; nothing is recorded. As with any internet radio, your IP address reaches the station’s server. The station list and the current song are read from nowby’s database; nothing about you is sent.</p>
      <h2 style={h2}>frameby+ subscription</h2>
      <p>The subscription is bought and managed through Apple. Your payment details stay with Apple; we only see whether a subscription is active. Apple’s privacy policy: apple.com/legal/privacy.</p>
      <h2 style={h2}>No ads, no analytics, no tracking</h2>
      <p>frameby shows no ads, contains no analytics, does not track you across apps or websites, and sells no data.</p>
      <h2 style={h2}>Contact</h2>
      <p>Data controller: Berkay Doğan, hello@berkaydogan.co. Requests are answered within 30 days.</p>
    </FramebyYasalSayfa>
  );
}
