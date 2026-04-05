/**
 * LotteryCard.jsx
 *
 * Solo 2 estados:
 *   'hoy'       → bolas VERDE, badge "HOY", botón "Compartir"
 *   'pendiente' → bolas GRIS, badge "PENDIENTE", botón "🔔 Avísame"
 */
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import BallsDisplay from './BallsDisplay'
import LotteryLogo from './LotteryLogo'
import Modal from './Modal'
import { resolveSorteoColor } from '../utils/sorteoColors'

// Sorteo display names — shorter/cleaner for mobile
const SORTEO_DISPLAY = {
  'Quiniela Lotería Nacional Tarde': 'Quiniela Nacional Tarde',
  'Quiniela Lotería Nacional Noche': 'Quiniela Nacional Noche',
  'Quiniela King Lottery Día': 'Quiniela King Día',
  'Quiniela King Lottery Noche': 'Quiniela King Noche',
}

const displaySorteo = (sorteo) => SORTEO_DISPLAY[sorteo] ?? sorteo

const formatFecha = (fechaStr) => {
  if (!fechaStr) return ''
  const d = new Date(fechaStr + 'T12:00:00')
  return d.toLocaleDateString('es-DO', { weekday: 'short', day: 'numeric', month: 'short' })
}

const LotteryCard = ({ resultado, className = '', fromLabel = null, style: staggerStyle = {} }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [copiado, setCopiado] = useState(false)
  const [modalAbierto, setModalAbierto] = useState(false)

  const {
    id, loteria_id, loteria_nombre, card_nombre, loteria_color, loteria_siglas,
    sorteo, hora, estado, tipo, numeros, numerosExtra, multiplicador, fechaNumeros,
  } = resultado

  const displayNombre = card_nombre ?? loteria_nombre
  const esVerde    = estado === 'hoy'
  const esHistorico = estado === 'historico'
  const resolvedColor = resolveSorteoColor(sorteo, loteria_id, loteria_color)

  const handleCompartir = async () => {
    // Formato de fecha legible
    const fechaFormateada = (() => {
      if (!fechaNumeros) return ''
      const d = new Date(fechaNumeros + 'T12:00:00')
      const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
      const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
      return `${dias[d.getDay()]}, ${d.getDate()} de ${meses[d.getMonth()]} ${d.getFullYear()}`
    })()

    // Números principales
    let numerosTexto
    if (tipo === 'kino' && numeros?.length > 10) {
      numerosTexto = numeros.slice(0, 10).join(' - ') + '\n' + numeros.slice(10).join(' - ')
    } else {
      numerosTexto = numeros?.join(' - ') || ''
    }

    // Extras según tipo
    let extrasTexto = ''
    if (tipo === 'powerball') {
      if (numerosExtra?.[0] != null) extrasTexto += `\n🔴 PowerBall: ${numerosExtra[0]}`
      if (multiplicador) extrasTexto += `\n✖️ Multiplicador: ${multiplicador}`
    } else if (tipo === 'megamillions') {
      if (numerosExtra?.[0] != null) extrasTexto += `\n⭐ Mega Ball: ${numerosExtra[0]}`
    } else if (tipo === 'loto-loteka') {
      if (numerosExtra?.[0] != null) extrasTexto += `\n🔴 Extra: ${numerosExtra[0]}`
      if (numerosExtra?.[1] != null) extrasTexto += `\n⭐ Power: ${numerosExtra[1]}`
    } else if (tipo === 'loto-leidsa') {
      if (numerosExtra?.[0] != null) extrasTexto += `\n⭐ Más: ${numerosExtra[0]}`
      if (numerosExtra?.[1] != null) extrasTexto += `\n✨ Super: ${numerosExtra[1]}`
    } else if (tipo === 'cash4life') {
      if (numerosExtra?.[0] != null) extrasTexto += `\n⭐ Cash Ball: ${numerosExtra[0]}`
    } else if (tipo === 'loto5plus') {
      if (numerosExtra?.[0] != null) extrasTexto += `\n⭐ Más: ${numerosExtra[0]}`
    } else if (tipo === 'jugamas') {
      if (numerosExtra?.[0] != null) extrasTexto += `\n⭐ Extra: ${numerosExtra[0]}`
    }

    const texto =
      `🎰 *${loteria_nombre.toUpperCase()}*\n` +
      `📋 ${sorteo}\n\n` +
      `🔢 Resultados: ${numerosTexto}${extrasTexto}\n` +
      `📅 Fecha: ${fechaFormateada}\n` +
      `🕐 Hora: ${hora}\n\n` +
      `🌐 Ver más resultados en: https://quinielard.com`
    if (navigator.share) {
      try { await navigator.share({ title: 'QuinielaRD', text: texto }) } catch (_) {}
    } else {
      navigator.clipboard.writeText(texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  // Navegar a detalle pasando resultado completo en state
  const handleDetalle = () => navigate(`/sorteo/${encodeURIComponent(sorteo)}`, {
    state: {
      from: location.pathname,
      fromLabel: fromLabel || 'Resultados',
      search: location.search,
      resultado,
    },
  })

  // Badge según estado
  const badgeClass = esVerde
    ? 'bg-green-50 text-green-600 border border-green-100'
    : esHistorico
      ? 'bg-gray-50 text-gray-500 border border-gray-200'
      : 'bg-amber-50 text-amber-600 border border-amber-100'
  const badgeText = esVerde ? 'HOY' : esHistorico ? null : 'PENDIENTE'
  const fechaText = esVerde
    ? 'Resultado de hoy'
    : esHistorico
      ? formatFecha(fechaNumeros)
      : `Último: ${formatFecha(fechaNumeros)}`

  return (
    <>
      <div
        className={`bg-white rounded-2xl p-5
                   transition-all duration-300 ease-out
                   hover:-translate-y-0.5
                   flex flex-col gap-4 ${className}`}
        style={{
          border: '1px solid #e5e7eb',
          borderLeft: `4px solid ${resolvedColor}`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          ...staggerStyle,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)' }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)' }}
      >
        {/* Header */}
        <div className="flex items-start gap-3">
          <LotteryLogo
            loteria_id={loteria_id} sorteo={sorteo}
            nombre={loteria_nombre} siglas={loteria_siglas}
            color={resolvedColor} size="lg"
          />
          <div className="flex-1 min-w-0">
            <p className="leading-tight truncate"
              style={{ fontSize: 19, fontWeight: 700, color: resolvedColor }}>
              {displayNombre}
            </p>
            <button
              onClick={handleDetalle}
              className="text-gray-500 text-sm mt-0.5 text-left hover:text-primary
                         hover:underline block w-full transition-colors duration-150 leading-snug"
            >
              {displaySorteo(sorteo)}
            </button>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="text-[13px] text-gray-400 font-semibold whitespace-nowrap">{hora}</span>
            {badgeText && (
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${badgeClass}`}>
                {esVerde
                  ? <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-live" />
                  : <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-live" />
                }
                {badgeText}
              </span>
            )}
          </div>
        </div>

        {/* Bolas */}
        <div className="py-1">
          <BallsDisplay
            tipo={tipo} numeros={numeros} numerosExtra={numerosExtra}
            multiplicador={multiplicador} isGray={!esVerde}
          />
        </div>

        {/* Fecha + Botón */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <p className="text-[13px] text-gray-400 font-semibold">{fechaText}</p>

          {(esVerde || esHistorico) ? (
            <button
              onClick={handleCompartir}
              className="inline-flex items-center gap-1.5 text-xs font-semibold
                         px-3.5 py-1.5 rounded-lg border border-gray-200 text-gray-600
                         hover:bg-gray-50 hover:border-gray-300
                         active:scale-[0.97] transition-all duration-150"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
              </svg>
              {copiado ? '¡Copiado!' : 'Compartir'}
            </button>
          ) : (
            <button
              onClick={() => setModalAbierto(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold
                         px-3.5 py-1.5 rounded-lg bg-[#059669] text-white
                         hover:bg-green-700 active:scale-[0.97]
                         transition-all duration-150 shadow-sm"
            >
              🔔 Avísame
            </button>
          )}
        </div>
      </div>

      {modalAbierto && (
        <Modal onClose={() => setModalAbierto(false)} />
      )}
    </>
  )
}

export default LotteryCard
