"use client";

import { track } from "@vercel/analytics";

/* Dönüşüm ölçümü — Vercel custom events.
   satinAlTikla: hangi kanal, hangi yüzeyden (yapışkan çubuk / yazı kartı / kitap sayfası…) */

export function satinAlTikla(kanal: string, kaynak: string) {
  try {
    track("satin-al", { kanal, kaynak });
  } catch { /* yoksay */ }
}

export function olcumla(olay: string, veri?: Record<string, string>) {
  try {
    track(olay, veri);
  } catch { /* yoksay */ }
}
