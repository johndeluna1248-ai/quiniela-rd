/**
 * LotteryLogo.jsx
 * Muestra el logo de un sorteo o empresa.
 * Prioridad: sorteo-específico → empresa → círculo de iniciales
 *
 * Props:
 *   loteria_id  — id de la empresa (ej. "leidsa")
 *   sorteo      — nombre del sorteo (ej. "Kino Leidsa") — opcional
 *   nombre      — nombre completo para título y fallback
 *   siglas      — siglas para el círculo de fallback
 *   color       — color del fondo del círculo fallback
 *   size        — "sm" (28px) | "md" (36px) | "lg" (48px)
 */
import { useState } from 'react'
import { LOGOS_EMPRESA, LOGOS_SORTEO } from '../utils/logos'

// Texto del avatar: Leidsa usa fondo amarillo → texto azul oscuro
const AVATAR_TEXT = {
  leidsa: '#1a3a8f',
}

// Empresas que llevan fondo suave detrás del logo (color con opacity 0.15)
const LOGO_BG = {
  loteka:   '#00aeef4D',
  suerte:   '#1a3a8f66',
  lotedom:  '#0033cc66',
  primera:  '#e41e251F',
}

const LotteryLogo = ({
  loteria_id,
  sorteo = null,
  nombre = '',
  siglas,
  color = '#1e3a8a',
  size  = 'md',
}) => {
  const [imgError, setImgError] = useState(false)

  const iniciales = siglas || (
    nombre.split(' ').length > 1
      ? nombre.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
      : nombre.slice(0, 2).toUpperCase()
  )

  const sizeMap = { sm: 28, md: 36, lg: 48 }
  const px      = sizeMap[size] ?? 36

  // Resolver URL del logo: sorteo primero, luego empresa
  const logoUrl = !imgError
    ? (sorteo && LOGOS_SORTEO[sorteo]) || LOGOS_EMPRESA[loteria_id] || null
    : null

  const textColor = AVATAR_TEXT[loteria_id] ?? 'white'

  if (!logoUrl) {
    return (
      <div
        style={{
          width: px, height: px,
          borderRadius: '50%',
          backgroundColor: color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700,
          fontSize: px <= 28 ? 11 : px <= 36 ? 13 : 15,
          color: textColor,
          flexShrink: 0,
          userSelect: 'none',
        }}
        title={nombre}
      >
        {iniciales}
      </div>
    )
  }

  const bgColor = LOGO_BG[loteria_id]

  if (bgColor) {
    return (
      <div
        style={{
          width: 44, height: 44,
          borderRadius: '50%',
          backgroundColor: bgColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          padding: 4,
        }}
        title={nombre}
      >
        <img
          src={logoUrl}
          alt={nombre}
          onError={() => setImgError(true)}
          style={{
            width: '100%', height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    )
  }

  const finalPx = sorteo === 'Powerball' ? Math.round(px * 1.2) : px

  return (
    <img
      src={logoUrl}
      alt={nombre}
      title={nombre}
      onError={() => setImgError(true)}
      style={{
        width: finalPx, height: finalPx,
        borderRadius: '50%',
        objectFit: 'contain',
        flexShrink: 0,
        backgroundColor: '#f9fafb',
      }}
    />
  )
}

export default LotteryLogo
