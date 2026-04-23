/**
 * Home.jsx
 *
 * Dual filter system:
 *   modo=quinielas → fetchQuinielas()
 *   modo=todos     → fetchTodosSorteos()
 *   empresa=leidsa → local filter by loteria_id (or loteria_orden for americanas)
 *
 * Quinielas + Leidsa → only quinielas from Leidsa
 * Todos + Leidsa → all sorteos from Leidsa
 */
import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import AdBanner from '../components/AdBanner'
import DateFilter from '../components/DateFilter'
import ResultsGrid from '../components/ResultsGrid'
import SEO from '../components/SEO'
import { fetchQuinielas, fetchTodosSorteos } from '../lib/fetchQuinielas'
import { hoyRD } from '../lib/supabaseMapper'
import { EMPRESA_INFO } from '../data/loteriasInfo'

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const fechaHoyRD = () => {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Santo_Domingo' }))
  return `${DIAS[now.getDay()]} ${now.getDate()} de ${MESES[now.getMonth()]}`
}

const hoy = () => hoyRD()

const horaAMin = (h) => {
  if (!h) return 0
  const [time, p] = h.split(' ')
  if (!time || !p) return 0
  let [hr, min] = time.split(':').map(Number)
  if (p === 'PM' && hr !== 12) hr += 12
  if (p === 'AM' && hr === 12) hr = 0
  return hr * 60 + min
}

export const EMPRESA_LABELS = {
  nacional: 'Lotería Nacional', leidsa: 'Leidsa', real: 'Lotería Real',
  loteka: 'Loteka', primera: 'La Primera', suerte: 'La Suerte Dominicana',
  lotedom: 'LoteDom', ny: 'New York', florida: 'Florida',
  king: 'King Lottery', anguila: 'Anguila Lottery',
  americanas: 'Americanas (NY + Florida)',
}

// Map chip value → loteria_id(s) for filtering
const EMPRESA_FILTER = {
  nacional: { ids: ['nacional'] },
  leidsa:   { ids: ['leidsa'] },
  real:     { ids: ['real'] },
  loteka:   { ids: ['loteka'] },
  primera:  { ids: ['primera'] },
  suerte:   { ids: ['suerte'] },
  lotedom:  { ids: ['lotedom'] },
  americanas: { orden: 8 },
  king:     { ids: ['king'] },
  anguila:  { ids: ['anguila'] },
}

// Map empresa chip → EMPRESA_INFO key
const EMPRESA_CHIP_TO_KEY = {
  nacional: 'nacional', leidsa: 'leidsa', real: 'real', loteka: 'loteka',
  primera: 'laprimera', suerte: 'lasuerte', lotedom: 'lotedom',
  king: 'king', anguila: 'anguila',
}

const EmpresaInfoSection = ({ empresaChip }) => {
  const key = EMPRESA_CHIP_TO_KEY[empresaChip]
  const data = key && EMPRESA_INFO[key]
  if (!data) return null
  const nombre = EMPRESA_LABELS[empresaChip] || empresaChip

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-5 rounded-full bg-primary" />
        <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Sobre {nombre}</h2>
      </div>
      <div className="space-y-3 text-sm text-gray-600">
        {data.web && (
          <div className="flex gap-2.5">
            <span className="shrink-0">🌐</span>
            <div>
              <span className="font-semibold text-gray-700">Web: </span>
              <a href={data.web} target="_blank" rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all">{data.web}</a>
            </div>
          </div>
        )}
        {data.sorteos && data.sorteos.length > 0 && (
          <div className="flex gap-2.5">
            <span className="shrink-0 mt-0.5">🎯</span>
            <div>
              <span className="font-semibold text-gray-700">Sorteos y horarios:</span>
              <ul className="mt-1.5 space-y-1">
                {data.sorteos.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-gray-300 mt-0.5">•</span>
                    <span><span className="font-medium text-gray-700">{s.nombre}</span> — {s.horario}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {data.nota && (
          <div className="flex gap-2.5">
            <span className="shrink-0">📝</span>
            <div className="text-gray-500 italic">
              {data.web
                ? <>
                    {data.nota.split('página oficial')[0]}
                    <a href={data.web} target="_blank" rel="noopener noreferrer"
                      className="text-blue-600 hover:underline not-italic font-medium">página oficial</a>
                    {data.nota.split('página oficial')[1]}
                  </>
                : data.nota
              }
            </div>
          </div>
        )}
        {data.direccion && (
          <div className="flex gap-2.5">
            <span className="shrink-0">📍</span>
            <div><span className="font-semibold text-gray-700">Dirección:</span> {data.direccion}</div>
          </div>
        )}
        {data.telefono && (
          <div className="flex gap-2.5">
            <span className="shrink-0">📞</span>
            <div><span className="font-semibold text-gray-700">Teléfono:</span> {data.telefono}</div>
          </div>
        )}
        {data.email && (
          <div className="flex gap-2.5">
            <span className="shrink-0">✉️</span>
            <div><span className="font-semibold text-gray-700">Email:</span> {data.email}</div>
          </div>
        )}
        {(data.facebook || data.instagram || data.twitter || data.youtube) && (
          <div className="flex gap-2.5">
            <span className="shrink-0">📱</span>
            <div className="flex flex-wrap gap-3">
              {data.facebook && (
                <a href={data.facebook} target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-xs font-medium">Facebook</a>
              )}
              {data.instagram && (
                <a href={data.instagram} target="_blank" rel="noopener noreferrer"
                  className="text-pink-600 hover:underline text-xs font-medium">Instagram</a>
              )}
              {data.twitter && (
                <a href={data.twitter} target="_blank" rel="noopener noreferrer"
                  className="text-sky-500 hover:underline text-xs font-medium">Twitter</a>
              )}
              {data.youtube && (
                <a href={data.youtube} target="_blank" rel="noopener noreferrer"
                  className="text-red-600 hover:underline text-xs font-medium">YouTube</a>
              )}
            </div>
          </div>
        )}
        {data.fundacion && (
          <div className="flex gap-2.5">
            <span className="shrink-0">📅</span>
            <div><span className="font-semibold text-gray-700">Fundada en:</span> {data.fundacion}</div>
          </div>
        )}
        {data.historia && (
          <div className="flex gap-2.5">
            <span className="shrink-0 mt-0.5">📖</span>
            <div><span className="font-semibold text-gray-700">Historia:</span> {data.historia}</div>
          </div>
        )}
      </div>
    </div>
  )
}

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [resultados, setResultados] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchId = useRef(0)

  const fecha   = searchParams.get('fecha') || hoy()
  const modo    = searchParams.get('modo') || 'quinielas'
  const empresa = searchParams.get('empresa') || ''

  // Migrate old 'vista' param → new 'modo' param (backward compat)
  useEffect(() => {
    const oldVista = searchParams.get('vista')
    if (oldVista) {
      const n = new URLSearchParams(searchParams)
      n.delete('vista')
      if (oldVista === 'quinielas' || oldVista === 'todos') {
        n.set('modo', oldVista)
      } else {
        n.set('modo', 'todos')
        n.set('empresa', oldVista)
      }
      setSearchParams(n, { replace: true })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const setFecha = (v) => setSearchParams(
    (prev) => { const n = new URLSearchParams(prev); n.set('fecha', v); return n },
    { replace: true }
  )
  const setModo = (v) => setSearchParams(
    (prev) => { const n = new URLSearchParams(prev); n.set('modo', v); n.delete('empresa'); return n },
    { replace: true }
  )
  const setEmpresa = (v) => setSearchParams(
    (prev) => {
      const n = new URLSearchParams(prev)
      if (v) { n.set('empresa', v) } else { n.delete('empresa') }
      return n
    },
    { replace: true }
  )

  // ── Fetch principal ─────────────────────────────────────────────────────
  useEffect(() => {
    const id = ++fetchId.current

    const doFetch = async () => {
      setLoading(true)
      setError(null)

      try {
        const hoyStr = hoy()
        let data

        if (modo === 'quinielas') {
          data = await fetchQuinielas(hoyStr, fecha)
        } else {
          data = await fetchTodosSorteos(hoyStr, fecha)
        }

        if (id !== fetchId.current) return

        if (data && data.length > 0) {
          setResultados(data)
        } else {
          setResultados([])
        }
      } catch (err) {
        console.error('Error fetching:', err)
        if (id === fetchId.current) {
          setError(err.message)
          setResultados([])
        }
      } finally {
        if (id === fetchId.current) setLoading(false)
      }
    }

    doFetch()
  }, [fecha, modo])

  // ── Filtrado local (empresa) ──────────────────────────────────────
  const resultadosFiltrados = useMemo(() => {
    return resultados
      .filter((r) => {
        // Filtro por empresa chip
        if (empresa) {
          const filter = EMPRESA_FILTER[empresa]
          if (filter) {
            if (filter.orden) {
              if (r.loteria_orden !== filter.orden) return false
            } else if (filter.ids) {
              if (!filter.ids.includes(r.loteria_id)) return false
            }
          }
        }
        return true
      })
      .sort((a, b) => {
        if (modo === 'quinielas') return 0
        if (a.loteria_orden !== b.loteria_orden) return a.loteria_orden - b.loteria_orden
        const subA = a.loteria_suborden ?? 0
        const subB = b.loteria_suborden ?? 0
        if (subA !== subB) return subA - subB
        return horaAMin(a.hora) - horaAMin(b.hora)
      })
  }, [resultados, empresa, modo])

  // Stats
  const totalHoy = resultadosFiltrados.filter(r => r.estado === 'hoy').length
  const totalPendiente = resultadosFiltrados.filter(r => r.estado === 'pendiente').length

  const titulo = modo === 'quinielas'
    ? (empresa ? `Quinielas — ${EMPRESA_LABELS[empresa] || empresa}` : 'Quinielas de Hoy')
    : (empresa ? `${EMPRESA_LABELS[empresa] || empresa}` : 'Todos los Sorteos')

  // Determine vista for ResultsGrid grouping
  const gridVista = (modo === 'todos' && !empresa) ? 'todos' : modo
  // Mostrar banners divisores por compañía siempre que el usuario esté viendo
  // múltiples compañías (sin filtro por empresa), tanto en Quinielas como en Todos.
  // Con filtro activo sólo hay una compañía visible → no tiene sentido agrupar.
  const agruparPorCompania = !empresa
  const empresaLabel = empresa ? (EMPRESA_LABELS[empresa] || empresa) : null

  const tituloSEO = `Quiniela de Hoy ${fechaHoyRD()} | QuinielaRD`

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <SEO
        title={tituloSEO}
        description="Resultados de quinielas dominicanas en tiempo real. Consulta los números que salieron hoy en Lotería Nacional, Leidsa, Loteka, La Primera, La Suerte, Lotedom, King Lottery y Anguila."
        keywords="quiniela de hoy, quiniela dominicana, lotería nacional hoy, leidsa hoy, loteka hoy, números que salieron hoy, pale de hoy, resultados lotería RD, quiniela RD"
        canonical="https://quinielard.com/"
      />

      {/* Hero section */}
      <div className="animate-fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              {titulo}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {modo === 'quinielas'
                ? 'Último resultado de cada quiniela dominicana'
                : 'Todos los sorteos dominicanos en un solo lugar'}
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex gap-3 items-center">
            {!loading && (
              <>
                <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-bold text-green-600">{totalHoy} de hoy</span>
                </div>
                {totalPendiente > 0 && (
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-xs font-bold text-amber-600">{totalPendiente} pendientes</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <AdBanner slot="HOME_TOP" className="h-[50px] md:h-[90px]" />

      <DateFilter
        fecha={fecha}        setFecha={setFecha}
        modo={modo}          setModo={setModo}
        empresa={empresa}    setEmpresa={setEmpresa}
        totalResultados={resultadosFiltrados.length}
      />

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in-up">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4" />
          <p className="text-gray-400 text-sm">Cargando resultados...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in-up">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-1">Error al cargar</h3>
          <p className="text-gray-400 text-sm mb-3">{error}</p>
          <button
            onClick={() => { setSearchParams(prev => new URLSearchParams(prev), { replace: true }) }}
            className="text-primary font-semibold text-sm hover:underline"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <ResultsGrid
          resultados={resultadosFiltrados}
          vista={gridVista}
          empresaLabel={empresaLabel}
          agruparPorCompania={agruparPorCompania}
        />
      )}

      {empresa && !loading && <EmpresaInfoSection empresaChip={empresa} />}

      <AdBanner slot="HOME_BOTTOM" className="h-[50px] md:h-[90px]" />

    </main>
  )
}

export default Home
