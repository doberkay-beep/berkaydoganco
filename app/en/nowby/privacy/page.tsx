import type { Metadata } from "next";
import { NowbyYasal, h2 } from "@/components/NowbyYasal";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy — nowby." },
  description: "What information the nowby. app uses and why: no account, no location, no ads and no tracking.",
  alternates: { canonical: "/en/nowby/privacy", languages: { tr: "/nowby/gizlilik", en: "/en/nowby/privacy" } },
};

export default function PrivacyPage() {
  return (
    <NowbyYasal en baslik="Privacy policy" guncelleme="October 22, 2026">
      <p>nowby. is developed by Berkay Doğan. This page explains what information the nowby. apps on iPhone, iPad, Mac, Apple TV and Apple Watch use and why.</p>
      <h2 style={h2}>No account</h2>
      <p>nowby. doesn't ask you to sign up. Your name, email, phone number or location is never collected.</p>
      <h2 style={h2}>Radio streams</h2>
      <p>When you listen to a station, the stream is played directly from that station's own server; like any internet connection, the station sees your IP address. Some streams are relayed through nowby.co for technical reasons; in that case your IP address is used only momentarily to limit abuse and is not stored. Apart from our hosting provider's (Vercel) standard server logs, no records are kept.</p>
      <h2 style={h2}>Song information and search</h2>
      <p>The songs playing on the radio come from nowby.co. Searches you make in the app are sent to the server to fetch results and are not stored.</p>
      <h2 style={h2}>Station notes</h2>
      <p>Short notes you leave under a station are public and stored anonymously; who wrote them is not recorded. Notes that break the rules are removed. Hearts you send are shown live to other listeners and are not stored.</p>
      <h2 style={h2}>"Listening with you" and Listen together</h2>
      <p>To show how many people are listening to the same station, the app uses a random number unique to your device. It is shared only live, while you listen; it is never stored and is not linked to you. Listen-together rooms also work with a random code, only while the room is open.</p>
      <h2 style={h2}>Memory code (optional)</h2>
      <p>If you choose, you can back up your favourites, Song Catches and followed artists with a random memory code. The backup is stored on the server, linked only to that code; anyone who knows the code can restore it, so don't share it. To have your backup deleted, just send your code to hello@berkaydogan.co.</p>
      <h2 style={h2}>Station suggestions and wrong-song reports</h2>
      <p>The text of a suggestion or report you send is stored anonymously for review.</p>
      <h2 style={h2}>What stays on your device</h2>
      <p>Your favourites, Song Catches, listening time, radio alarm and settings are stored only on your device. To sync them between your devices, Apple's iCloud is used; this data stays in your iCloud account and never reaches us. The connection between Apple Watch and iPhone and the Home Screen widget also work only between your devices. Radio alarm notifications are created on your phone.</p>
      <h2 style={h2}>No ads, analytics or tracking</h2>
      <p>nowby. shows no ads, uses no analytics or advertising tools, doesn't track you across other apps or websites, and doesn't sell your data. nowby. counts songs, not people.</p>
      <h2 style={h2}>Where is the data?</h2>
      <p>Station notes, memory-code backups and reports are stored on Supabase servers in Japan (Tokyo); the nowby.co website runs on Vercel.</p>
      <h2 style={h2}>Your rights</h2>
      <p>The data controller is Berkay Doğan. You can ask what data is processed, request a copy, correction or deletion, or object to processing at any time by writing to hello@berkaydogan.co. Data is processed to provide the service and to review content that breaks the rules; it is never used for advertising, profiling or marketing.</p>
    </NowbyYasal>
  );
}
