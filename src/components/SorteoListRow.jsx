/**
 * SorteoListRow.jsx — Vista "Todos los Sorteos"
 *
 * Solo 2 estados:
 *   'hoy'       → verde, botón "Compartir"
 *   'pendiente' → ámbar, botón "🔔 Avísame"
 */
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import BallsDisplay from './BallsDisplay'
import LotteryLogo from './LotteryLogo'
import Modal from './Modal'

const formatFecha = (fechaStr) => {
  if (!fechaStr) return ''
  const d = new Date(fechaStr + 'T12:00:00')
  return d.toLocaleDateString('es-DO', { weekday: 'short', day: 'numeric', month: 'short' })
}

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
    <polyline points="16,6 12,2 8,6"/>
    <line x1="12" y1="2" x2="12" y2="15"/>
  </svg>
)

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
)

const SorteoListRow = ({ resultado, fromLabel = 'Todos los Sorteos' }) => {
  const navigate           = useNavigate()
  const location           = useLocation()
  const [copied, setCopied] = useState(false)
  const [modal, setModal]   = useState(false)

  const {
    id, loteria_id, loteria_nombre, loteria_color, loteria_siglas,
    sorteo, hora, estado, tipo, numeros, numerosExtra, multiplicador, fechaNumeros,
  } = resultado

  const esVerde = estado === 'hoy'

  const ultimaFecha = !esVerde && fechaNumeros ? formatFecha(fechaNumeros) : null
  const fechaLabel = esVerde ? `Resultado de hoy • ${hora}` : `Último: ${ultimaFecha || 'sin datos'} • ${hora}`
  const fechaColor = esVerde ? '#059669' : '#d97706'

  const avatarColor = (tipo === 'megamillions' || tipo === 'powerball')
                      ? '#7c3aed' : loteria_color

  const handleNavigate = () => navigate(`/sorteo/${encodeURIComponent(sorteo)}`, {
    state: { from: location.pathname, fromLabel, search: location.search, resultado },
  })

  const handleShare = async (e) => {
    e.stopPropagation()
    const extras = numerosExtra?.length ? ` + ${numerosExtra.join(' ')}` : ''
    const texto  = `🎯 ${loteria_nombre} – ${sorteo}\n🔢 ${numeros?.join(' - ')}${extras}\n\nVer más en QuinielaRD`
    if (navigator.share) {
      try { await navigator.share({ title: 'QuinielaRD', text: texto }) } catch (_) {}
    } else {
      navigator.clipboard.writeText(texto)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // HOY → Compartir, PENDIENTE → Avísame
  const DesktopBtn = () => (
    esVerde ? (
      <button
        onClick={handleShare}
        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
      >
        {copied ? '¡Copiado!' : 'Compartir'}
      </button>
    ) : (
      <button
        onClick={(e) => { e.stopPropagation(); setModal(true) }}
        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#059669] text-white hover:bg-[#047857] transition-colors whitespace-nowrap"
      >
        🔔 Avísame
      </button>
    )
  )

  const MobileBtn = () => (
    esVerde ? (
      <button
        onClick={handleShare}
        style={{
          width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid #e5e7eb', borderRadius: 10, background: 'white', cursor: 'pointer',
          color: '#4b5563', flexShrink: 0,
        }}
        aria-label="Compartir"
      >
        {copied ? <span style={{ fontSize: 11, fontWeight: 700, color: '#059669' }}>✓</span> : <ShareIcon />}
      </button>
    ) : (
      <button
        onClick={(e) => { e.stopPropagation(); setModal(true) }}
        style={{
          width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid #d1fae5', borderRadius: 10, background: '#059669', cursor: 'pointer',
          color: 'white', flexShrink: 0,
        }}
        aria-label="Avísame"
      >
        <BellIcon />
      </button>
    )
  )

  return (
    <>
      <div
        onClick={handleNavigate}
        className="bg-white border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-100"
      >
        {/* MÓVIL */}
        <div className="md:hidden px-4 py-3">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ flexShrink: 0 }}>
              <LotteryLogo
                loteria_id={loteria_id} sorteo={sorteo}
                nombre={loteria_nombre} siglas={loteria_siglas}
                color={avatarColor} size="lg"
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: avatarColor, lineHeight: 1.2, marginBottom: 2 }}>
                {sorteo}
              </p>
              <p style={{ fontSize: 12, color: fechaColor, fontWeight: 500 }}>
                {fechaLabel}
              </p>
            </div>
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <BallsDisplay
              tipo={tipo} numeros={numeros} numerosExtra={numerosExtra}
              multiplicador={multiplicador} isGray={!esVerde} compact ballSize={40}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }} onClick={(e) => e.stopPropagation()}>
            <MobileBtn />
          </div>
        </div>

        {/* DESKTOP */}
        <div
          className="hidden md:grid"
          style={{ gridTemplateColumns: '200px 1fr auto', gap: 12, alignItems: 'center', padding: '10px 16px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
            <div style={{ flexShrink: 0 }}>
              <LotteryLogo
                loteria_id={loteria_id} sorteo={sorteo}
                nombre={loteria_nombre} siglas={loteria_siglas}
                color={avatarColor} size="lg"
              />
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: avatarColor, lineHeight: 1.3, minWidth: 0 }}>
              {sorteo}
            </p>
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <BallsDisplay
              tipo={tipo} numeros={numeros} numerosExtra={numerosExtra}
              multiplicador={multiplicador} isGray={!esVerde} compact
            />
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}
            onClick={(e) => e.stopPropagation()}
          >
            <span style={{ fontSize: 12, color: fechaColor, fontWeight: 600, whiteSpace: 'nowrap' }}>
              {esVerde ? 'Hoy' : `Último: ${ultimaFecha || ''}`}
            </span>
            <DesktopBtn />
          </div>
        </div>
      </div>

      {modal && <Modal sorteo={resultado} onClose={() => setModal(false)} />}
    </>
  )
}

export default SorteoListRow
