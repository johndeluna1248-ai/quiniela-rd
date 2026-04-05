/**
 * SorteoDetail.jsx
 *
 * Últimos 5 resultados de un sorteo desde Supabase.
 * Recibe metadata del sorteo via location.state.resultado
 * Botón "Volver" regresa a la página de origen.
 */
import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import BallsDisplay from '../components/BallsDisplay'
import LotteryLogo from '../components/LotteryLogo'
import { fetchHistorial } from '../lib/fetchQuinielas'
import { hoyRD } from '../lib/supabaseMapper'
import { SORTEO_INFO, SORTEO_NAME_TO_KEY, EMPRESA_INFO, EMPRESA_ID_TO_KEY } from '../data/loteriasInfo'

const formatFecha = (fechaStr, hoy) => {
  if (fechaStr === hoy) return 'Hoy'
  const d = new Date(fechaStr + 'T12:00:00')
  return d.toLocaleDateString('es-DO', { weekday: 'short', day: 'numeric', month: 'short' })
}

const FilaResultado = ({ fechaLabel, numeros, numerosExtra, tipo, multiplicador, isToday, index }) => (
  <div
    className={`flex flex-col items-center gap-2 px-4 py-3.5 rounded-xl border transition-all stagger-item
      ${isToday
        ? 'border-green-200 bg-green-50/50 shadow-sm'
        : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    style={{ animationDelay: `${index * 80}ms` }}
  >
    <div className="w-full">
      <BallsDisplay
        tipo={tipo} numeros={numeros} numerosExtra={numerosExtra}
        multiplicador={multiplicador} isGray={!isToday}
        ballSize={36} allowWrap
      />
    </div>
    <div className="flex items-center justify-center gap-1.5">
      {isToday && (
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-live" />
      )}
      <p className={`text-xs font-semibold ${isToday ? 'text-green-600' : 'text-gray-400'}`}>
        {fechaLabel}{isToday ? ' — HOY' : ''}
      </p>
    </div>
  </div>
)

const SorteoDetail = () => {
  const { sorteoId }   = useParams()
  const navigate        = useNavigate()
  const location        = useLocation()
  const navState        = location.state

  const [historial, setHistorial] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  const hoyStr = hoyRD()

  // Metadata del sorteo viene de location.state (pasado por LotteryCard/SorteoListRow)
  const meta = navState?.resultado ?? null

  // El sorteoId en la URL es el nombre del sorteo (encodeURIComponent)
  const sorteoName = decodeURIComponent(sorteoId)

  // Botón Volver → regresa a la página ANTERIOR
  const handleBack = () => {
    if (navState?.from) {
      navigate(navState.from + (navState.search || ''))
    } else {
      navigate(-1)
    }
  }
  const backLabel = navState?.fromLabel || 'Resultados'

  // Fetch últimos 5 resultados desde Supabase
  useEffect(() => {
    let cancelled = false

    const doFetch = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchHistorial(sorteoName, 5)
        if (!cancelled) setHistorial(data)
      } catch (err) {
        console.error('Error fetching historial:', err)
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    doFetch()
    return () => { cancelled = true }
  }, [sorteoName])

  // Usar meta de state, o del primer resultado del historial
  const info = meta ?? historial[0] ?? null

  if (!loading && !info && historial.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in-up">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg mb-4">Sorteo "{sorteoName}" no encontrado.</p>
        <button onClick={handleBack} className="text-primary font-semibold hover:underline">
          ← Volver
        </button>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#f8f9fc', minHeight: 'calc(100vh - 64px)' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">

        {/* Back button */}
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-primary font-semibold mb-6
                     hover:underline active:scale-[0.98] transition-all group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Volver a {backLabel}
        </button>

        {/* Header card */}
        {info && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 mb-6 animate-fade-in-up">
            <div className="flex items-center gap-4">
              <LotteryLogo
                loteria_id={info.loteria_id} sorteo={info.sorteo}
                nombre={info.loteria_nombre} siglas={info.loteria_siglas}
                color={info.loteria_color} size="lg"
              />
              <div className="flex-1">
                <h1 className="font-bold text-xl leading-tight" style={{ color: info.loteria_color }}>
                  {info.card_nombre ?? info.loteria_nombre}
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">{info.sorteo}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.828a1 1 0 101.415-1.414L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                    {info.hora}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results timeline */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-5 rounded-full bg-primary" />
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Últimos 5 resultados
          </h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-3" />
            <p className="text-gray-400 text-sm">Cargando historial...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 text-sm mb-2">Error: {error}</p>
            <button onClick={() => window.location.reload()} className="text-primary font-semibold text-sm hover:underline">
              Reintentar
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {historial.map((entry, i) => (
              <FilaResultado
                key={entry.fecha}
                fechaLabel={formatFecha(entry.fecha, hoyStr)}
                numeros={entry.numeros}
                numerosExtra={entry.numerosExtra}
                tipo={entry.tipo}
                multiplicador={entry.multiplicador}
                isToday={entry.fecha === hoyStr}
                index={i}
              />
            ))}
          </div>
        )}

        {/* Sección: Sobre este sorteo */}
        {info && (() => {
          const sorteoKey = SORTEO_NAME_TO_KEY[info.sorteo]
          const sorteoData = sorteoKey && SORTEO_INFO[sorteoKey]
          if (!sorteoData) return null
          const accentColor = info.loteria_color || '#1e3a8a'
          return (
            <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-card p-5 animate-fade-in-up">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
                <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Sobre este sorteo</h2>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                {sorteoData.descripcion && (
                  <div className="flex gap-2.5">
                    <span className="shrink-0 mt-0.5">🎯</span>
                    <div><span className="font-semibold text-gray-700">¿En qué consiste?</span><br/>{sorteoData.descripcion}</div>
                  </div>
                )}
                {sorteoData.horario && (
                  <div className="flex gap-2.5">
                    <span className="shrink-0">🕐</span>
                    <div><span className="font-semibold text-gray-700">Horario:</span> {sorteoData.horario}</div>
                  </div>
                )}
                {sorteoData.costo && (
                  <div className="flex gap-2.5">
                    <span className="shrink-0">💰</span>
                    <div><span className="font-semibold text-gray-700">Costo:</span> {sorteoData.costo}</div>
                  </div>
                )}
                {sorteoData.premios && (
                  <div className="flex gap-2.5">
                    <span className="shrink-0">🏆</span>
                    <div><span className="font-semibold text-gray-700">Premios:</span> {sorteoData.premios}</div>
                  </div>
                )}
              </div>
            </div>
          )
        })()}

        {/* Sección: Sobre la empresa */}
        {info && (() => {
          const empresaKey = EMPRESA_ID_TO_KEY[info.loteria_id]
          const empresa = empresaKey && EMPRESA_INFO[empresaKey]
          if (!empresa) return null
          const accentColor = info.loteria_color || '#1e3a8a'
          const empresaNombre = info.card_nombre ?? info.loteria_nombre
          return (
            <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-card p-5 animate-fade-in-up">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
                <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Sobre {empresaNombre}</h2>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                {empresa.fundacion && (
                  <div className="flex gap-2.5">
                    <span className="shrink-0">📅</span>
                    <div><span className="font-semibold text-gray-700">Fundada en:</span> {empresa.fundacion}</div>
                  </div>
                )}
                {empresa.historia && (
                  <div className="flex gap-2.5">
                    <span className="shrink-0 mt-0.5">📖</span>
                    <div><span className="font-semibold text-gray-700">Historia:</span> {empresa.historia}</div>
                  </div>
                )}
                {empresa.direccion && (
                  <div className="flex gap-2.5">
                    <span className="shrink-0">📍</span>
                    <div><span className="font-semibold text-gray-700">Dirección:</span> {empresa.direccion}</div>
                  </div>
                )}
                {empresa.telefono && (
                  <div className="flex gap-2.5">
                    <span className="shrink-0">📞</span>
                    <div><span className="font-semibold text-gray-700">Teléfono:</span> {empresa.telefono}</div>
                  </div>
                )}
                {empresa.email && (
                  <div className="flex gap-2.5">
                    <span className="shrink-0">✉️</span>
                    <div><span className="font-semibold text-gray-700">Email:</span> {empresa.email}</div>
                  </div>
                )}
                {empresa.web && (
                  <div className="flex gap-2.5">
                    <span className="shrink-0">🌐</span>
                    <div>
                      <span className="font-semibold text-gray-700">Web: </span>
                      <a href={empresa.web} target="_blank" rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all">{empresa.web}</a>
                    </div>
                  </div>
                )}
                {(empresa.facebook || empresa.instagram || empresa.twitter || empresa.youtube) && (
                  <div className="flex gap-2.5">
                    <span className="shrink-0">📱</span>
                    <div className="flex flex-wrap gap-3">
                      {empresa.facebook && (
                        <a href={empresa.facebook} target="_blank" rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs font-medium">Facebook</a>
                      )}
                      {empresa.instagram && (
                        <a href={empresa.instagram} target="_blank" rel="noopener noreferrer"
                          className="text-pink-600 hover:underline text-xs font-medium">Instagram</a>
                      )}
                      {empresa.twitter && (
                        <a href={empresa.twitter} target="_blank" rel="noopener noreferrer"
                          className="text-sky-500 hover:underline text-xs font-medium">Twitter</a>
                      )}
                      {empresa.youtube && (
                        <a href={empresa.youtube} target="_blank" rel="noopener noreferrer"
                          className="text-red-600 hover:underline text-xs font-medium">YouTube</a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })()}

      </div>
    </div>
  )
}

export default SorteoDetail
