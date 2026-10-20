import type { Metadata } from "next";
import { HerebySayfa, h2 } from "@/components/HerebySayfa";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy — hereby." },
  description: "What information the Hereby app uses and why: approximate location, the traces you leave, no ads and no tracking.",
  alternates: { canonical: "/en/hereby/privacy", languages: { tr: "/hereby/gizlilik", en: "/en/hereby/privacy" } },
};

export default function PrivacyPage() {
  return (
    <HerebySayfa en ust="Hereby" baslik="Privacy policy" guncelleme="October 21, 2026">
      <p>Hereby is developed by Berkay Doğan. This page explains what information the app uses and why.</p>
      <h2 style={h2}>Account</h2>
      <p>Hereby doesn't ask you to sign up. When the app opens, an anonymous identity unique to your phone is created. Your name, email or phone number is never collected. This identity is kept in your phone's Keychain, so your traces stay yours even if you delete and reinstall the app.</p>
      <h2 style={h2}>Location</h2>
      <p>Your location is used approximately (to about 100 meters) to show traces near you and to set where the traces you leave are placed. Your current location is never shown to other users and is not stored on the server. The place of a trace is also shown as an approximate area rather than an exact point.</p>
      <p>To warn you before you leave a trace at places you are often at (such as your home or school), how many different days you've been in an area is kept only on your phone and is never sent to any server.</p>
      <h2 style={h2}>Nearby notifications (optional)</h2>
      <p>The "Let me know when a trace is nearby" setting is off by default. If you turn it on, your location is used in the background, only on significant location changes (about every 500 meters): the app asks the server whether there is a trace you can open nearby and notifies you if there is. Your location is not stored in these requests. You can turn the setting off at any time.</p>
      <h2 style={h2}>Notes to self and time capsules</h2>
      <p>Traces you leave with the "Only me" option are visible only to you; to remind you when you return, their exact point is stored and never shown to any other user. The reminder works only if you have turned on nearby notifications and your phone allows it; the check happens on your phone and your location is not sent to the server. Time capsules cannot be read by anyone until their opening date.</p>
      <h2 style={h2}>Traces and replies you leave</h2>
      <p>The lines you write are stored with the approximate location where you left them and are shown anonymously to users who come to that place. Who wrote them is never shown to any user.</p>
      <h2 style={h2}>The Reckoning</h2>
      <p>Your answers to the night questions are stored only on your phone and are never sent to any server. If you choose to leave an answer as a trace, only that line is shared.</p>
      <h2 style={h2}>Reports and blocks</h2>
      <p>Traces you report and the reason are recorded for review. A record of the people you block is kept so their traces aren't shown to you; the blocked person doesn't know.</p>
      <h2 style={h2}>No ads, no tracking</h2>
      <p>Hereby shows no ads, doesn't track you across other apps or websites, and doesn't sell your data.</p>
      <h2 style={h2}>Where is your data?</h2>
      <p>Data is stored on servers in the European Union (Frankfurt), using Supabase infrastructure.</p>
      <h2 style={h2}>Deletion</h2>
      <p>In the app, My traces → Delete my data permanently deletes all your traces, replies and your anonymous identity.</p>
      <h2 style={h2}>Notice under Turkish data protection law (KVKK)</h2>
      <p><strong>Data controller:</strong> Berkay Doğan (contact: do.berkay@icloud.com).</p>
      <p><strong>Data processed:</strong> an anonymous identifier unique to your phone; the text, date and approximate location of the traces and replies you leave; report and block records. No identity information such as name, email or phone number is processed.</p>
      <p><strong>Purpose and legal basis:</strong> data is processed to provide the Hereby service (Law No. 6698, Art. 5/2-c, performance of a contract) and to keep users safe and review content that breaks the rules (Art. 5/2-f, legitimate interest). It is never processed for advertising, profiling or sale.</p>
      <p><strong>Transfer:</strong> data is stored on servers in Germany (European Union) using Supabase infrastructure for hosting, which means it is transferred abroad. It is not shared with any other third party, except with competent authorities where legally required.</p>
      <p><strong>Retention:</strong> your traces and replies are kept until you delete them or they are removed for breaking the rules. When you choose Delete my data, everything is permanently deleted along with your anonymous identity.</p>
      <p><strong>Your rights (Art. 11):</strong> you have the right to learn whether your data is processed, to request information, to learn the purpose of processing, to know who it is transferred to, to request correction or deletion, to object, and to claim compensation for any damage. Write to do.berkay@icloud.com; you will receive a reply within 30 days at the latest. Because Hereby works with anonymous identities, you may need to tell us which trace your request is about.</p>
    </HerebySayfa>
  );
}
