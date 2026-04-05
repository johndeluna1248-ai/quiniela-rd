/**
 * ResultsGrid.jsx
 * Grid de TARJETAS (LotteryCard) para todas las vistas.
 * Vista "todos" agrupa por lotería con SectionHeader.
 */
import { useState, useEffect, useRef } from 'react'
import LotteryCard from './LotteryCard'
import { nombreGrupoPorOrden } from '../data/loteriesMock'
import { LOGOS_EMPRESA } from '../utils/logos'

const GRADIENTS = {
  1:  { bg: 'linear-gradient(135deg, #5cd468, #1e7a28)',  text: 'white' },
  2:  { bg: 'linear-gradient(135deg, #f5b800, #d49a00)',  text: '#1a3a8f' },
  3:  { bg: 'linear-gradient(135deg, #1a3a8f, #2d5dd4)',  text: 'white' },
  4:  { bg: 'linear-gradient(135deg, #00aeef, #0077a8)',  text: 'white' },
  5:  { bg: 'linear-gradient(135deg, #e41e25, #a01018)',  text: 'white' },
  6:  { bg: 'linear-gradient(135deg, #1a3a8f, #2d5dd4)',  text: 'white' },
  7:  { bg: 'linear-gradient(135deg, #0033cc, #1a5cff)',  text: 'white' },
  8:  { bg: 'linear-gradient(135deg, #5570a8, #1a2340)',  text: 'white' },
  9:  { bg: 'linear-gradient(135deg, #e8cc66, #7a5c18)',  text: 'white' },
  10: { bg: 'linear-gradient(135deg, #f47920, #c45a00)',  text: 'white' },
}

const ORDEN_TO_ID = {
  1: 'nacional', 2: 'leidsa', 3: 'real', 4: 'loteka', 5: 'primera',
  6: 'suerte', 7: 'lotedom', 8: 'americanas', 9: 'king', 10: 'anguila',
}

const SMALL_LOGO = new Set([1, 5, 7])
const XSMALL_LOGO = new Set([3, 6])

const SectionHeader = ({ orden, nombre }) => {
  const [imgErr, setImgErr] = useState(false)
  const style   = GRADIENTS[orden] ?? GRADIENTS[8]
  const logoUrl = !imgErr ? LOGOS_EMPRESA[ORDEN_TO_ID[orden]] : null
  const logoH   = orden === 3 ? 31 : XSMALL_LOGO.has(orden) ? 36 : SMALL_LOGO.has(orden) ? 45 : 55

  return (
    <div style={{
      background: style.bg, borderRadius: 16,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 12, padding: '12px 20px', minHeight: 79,
      marginBottom: 16, position: 'relative',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      overflow: 'visible',
    }}>
      {logoUrl && (
        <img
          src={logoUrl}
          alt={nombre}
          onError={() => setImgErr(true)}
          style={{ height: logoH, width: 'auto', objectFit: 'contain', flexShrink: 0 }}
        />
      )}
      <span style={{
        color: style.text, fontWeight: 700,
        fontSize: orden === 6 ? 14 : 16,
        letterSpacing: '0.03em', whiteSpace: 'nowrap',
      }}>
        {nombre}
      </span>
    </div>
  )
}

const AdBanner = () => {
  const adRef = useRef(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (!pushed.current && adRef.current && window.location.hostname !== 'localhost') {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch (e) {}
      pushed.current = true
    }
  }, [])

  return (
    <div className="w-full h-[100px] md:h-[250px] overflow-hidden rounded-xl bg-gray-100">
      <ins className="adsbygoogle"
        ref={adRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client="ca-pub-1957659439174188"
        data-ad-slot="0000000000"
        data-ad-format="horizontal"
        data-full-width-responsive="true" />
    </div>
  )
}

const SinResultados = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center col-span-full animate-fade-in-up">
    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-gray-600 mb-1">No se encontraron resultados</h3>
    <p className="text-gray-400 text-sm">Intenta cambiar la fecha o el término de búsqueda.</p>
  </div>
)

// Kino ocupa ancho completo en grids de 2+ columnas
const cardSpan = (tipo) =>
  tipo === 'kino' ? 'sm:col-span-2 lg:col-span-2' : ''

const CardGrid = ({ items, fromLabel }) => (
  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((r, i) => (
      <LotteryCard
        key={r.id}
        resultado={r}
        fromLabel={fromLabel}
        className={`stagger-item ${cardSpan(r.tipo)}`}
        style={{ animationDelay: `${i * 50}ms` }}
      />
    ))}
  </div>
)

const ResultsGrid = ({ resultados, vista = 'quinielas', empresaLabel = null }) => {
  if (!resultados || resultados.length === 0) {
    return <div className="grid grid-cols-1"><SinResultados /></div>
  }

  // Vista "todos": agrupar por lotería con SectionHeader + tarjetas
  if (vista === 'todos') {
    const gruposMap = new Map()
    resultados.forEach((r) => {
      const key = r.loteria_orden
      if (!gruposMap.has(key)) {
        gruposMap.set(key, { orden: key, nombre: nombreGrupoPorOrden[key] ?? r.loteria_nombre, items: [] })
      }
      gruposMap.get(key).items.push(r)
    })
    const grupos = [...gruposMap.values()].sort((a, b) => a.orden - b.orden)

    return (
      <div key="todos" className="space-y-6 animate-fade-in-up">
        {grupos.map((grupo, idx) => (
          <div key={grupo.orden}>
            <SectionHeader orden={grupo.orden} nombre={grupo.nombre} />
            <CardGrid items={grupo.items} fromLabel={grupo.nombre} />
            {idx === 2 && <div style={{ marginTop: 20 }}><AdBanner /></div>}
          </div>
        ))}
      </div>
    )
  }

  // Vista "quinielas" o filtro por empresa
  return (
    <div key={vista} className="animate-fade-in-up">
      <CardGrid items={resultados} fromLabel={empresaLabel} />
    </div>
  )
}

export default ResultsGrid
