// ============================================
// CONFIGURACIÓN DE GOOGLE ADSENSE
// ============================================
// Cambiar a true SOLO cuando AdSense apruebe la cuenta
// y tengas slots reales configurados
export const ADSENSE_APPROVED = false;

// ID del publisher (tu cuenta AdSense)
export const ADSENSE_CLIENT = "ca-pub-1957659439174188";

// Slots de anuncios (obtenerlos desde AdSense cuando apruebe)
// Mientras estén en "0000000000" los banners no se mostrarán
export const ADSENSE_SLOTS = {
  HOME_TOP: "0000000000",      // Banner superior del home
  HOME_BOTTOM: "0000000000",   // Banner inferior del home
  RESULTS_GRID: "0000000000",  // Banner entre resultados
};
