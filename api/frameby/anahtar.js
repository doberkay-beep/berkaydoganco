// POST /api/frameby/anahtar/  { jws }  ya da  { play: { paket, urun, token } }  →  { anahtar, bitis }
// jws: App Store (StoreKit 2) abonelik kaydı. play: Google Play abonelik kaydı (Android).
import { islemiDogrula, playDogrula, anahtarUret } from "../_lib/frameby.js";

export default {
  async fetch(istek) {
    if (istek.method !== "POST") return new Response(null, { status: 405, headers: { allow: "POST" } });
    let govde;
    try {
      govde = await istek.json();
    } catch {
      return Response.json({ hata: "bicim" }, { status: 400 });
    }
    try {
      const bitis = govde?.play ? await playDogrula(govde.play) : islemiDogrula(govde?.jws).expiresDate;
      return Response.json(anahtarUret(bitis), { headers: { "cache-control": "no-store" } });
    } catch (e) {
      // Google'a ulaşılamadıysa ya da sunucu ayarı eksikse 503: abonelik geçersiz sayılmasın, uygulama sonra yeniden dener.
      const sunucu = ["play", "play-kimlik", "FRAMEBY_PLAY_HESAP yok"].includes(e.message);
      return Response.json({ hata: e.message }, { status: sunucu ? 503 : 403, headers: { "cache-control": "no-store" } });
    }
  },
};
