import type { Metadata } from "next";
import { FramebyYasalSayfa, h2 } from "@/components/FramebyYasalSayfa";

export const metadata: Metadata = {
  title: { absolute: "Terms of Use — frameby." },
  description: "Terms of use for the frameby app and the frameby+ subscription.",
  alternates: { canonical: "/en/frameby/terms", languages: { tr: "/frameby/kosullar" } },
};

export default function Page() {
  return (
    <FramebyYasalSayfa en baslik="Terms of use" guncelleme="29 November 2026">
      <p>frameby is a small gallery that opens the screen at home onto a real moment in a real place. By using the app you agree to these terms. Apple’s Standard End User License Agreement (apple.com/legal/internet-services/itunes/dev/stdeula) also applies.</p>
      <h2 style={h2}>What is free</h2>
      <p>The app, the radio, the Day layer and the Old Istanbul layer are free. The radio is never tied to a subscription.</p>
      <h2 style={h2}>frameby+ subscription</h2>
      <p>frameby+ is a yearly subscription that unlocks Berkay Doğan’s photo layers and, later, living frames. The price is shown on the purchase screen. New subscribers get a 7-day free trial.</p>
      <p>Payment is charged to your Apple account when you confirm the purchase. The subscription renews automatically each year unless cancelled at least 24 hours before the end of the current period; renewal is charged within the 24 hours before the period ends. You can manage or cancel it in your Apple account settings. Any unused part of a free trial is forfeited when you subscribe. Refunds follow Apple’s rules.</p>
      <p>Founding subscribers keep their price for as long as they stay subscribed.</p>
      <h2 style={h2}>Personal use</h2>
      <p>frameby is for personal, non-commercial use at home. Showing it on a screen in a public place such as a café, hotel, shop or waiting room requires separate licences for the radio broadcasts and the music (from the collecting societies and, where needed, the station itself) and for the photographs (from their photographers). frameby does not grant these; such use is the business’s responsibility. If you use frameby in a business, we recommend keeping the sound off.</p>
      <h2 style={h2}>Photographs and radio</h2>
      <p>The photographs belong to Berkay Doğan; those in the Old Istanbul layer are in the public domain and shown with their photographers’ names. You may not copy, sell or publish the photographs outside the app. Radio broadcasts and songs belong to their owners; frameby only plays them live from their official streams and records nothing.</p>
      <h2 style={h2}>Changes</h2>
      <p>Layers and frames may change over time. Significant changes to these terms will be announced on this page.</p>
    </FramebyYasalSayfa>
  );
}
