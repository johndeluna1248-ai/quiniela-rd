import { useRef, useEffect } from 'react';
import { ADSENSE_APPROVED, ADSENSE_CLIENT, ADSENSE_SLOTS } from '../config/adsense';

// Componente unificado para mostrar anuncios de Google AdSense
// Renderiza null si AdSense no está aprobado (cumple políticas de Google)
const AdBanner = ({ slot = "HOME_TOP", className = "" }) => {
  const adRef = useRef(null);
  const pushed = useRef(false);

  // Efecto que inicializa el anuncio cuando el componente monta
  useEffect(() => {
    // Solo carga el anuncio si AdSense está aprobado y no es localhost
    if (
      ADSENSE_APPROVED &&
      !pushed.current &&
      adRef.current &&
      window.location.hostname !== 'localhost'
    ) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn('AdSense error:', e);
      }
      pushed.current = true;
    }
  }, []);

  // Si AdSense no está aprobado, no renderiza nada (sitio limpio)
  if (!ADSENSE_APPROVED) {
    return null;
  }

  // Obtiene el slot correspondiente o usa HOME_TOP por defecto
  const adSlot = ADSENSE_SLOTS[slot] || ADSENSE_SLOTS.HOME_TOP;

  // Renderiza el contenedor del anuncio cuando AdSense está aprobado
  return (
    <div className={`w-full overflow-hidden rounded-xl ${className}`}>
      <ins
        className="adsbygoogle"
        ref={adRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format="horizontal"
      />
    </div>
  );
};

export default AdBanner;
