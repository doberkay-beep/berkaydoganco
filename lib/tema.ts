/* Tema betiği sunucu bileşeninden (layout) okunabilsin diye "use client" dışında. */
/** layout.tsx <head> içinde: kayıtlı seçim > sistem tercihi > aydınlık. */
export const TEMA_BETIGI =
  '(function(){try{var t=localStorage.getItem("bd-tema");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()';
