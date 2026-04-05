/**
 * DateFilter.jsx
 * Dual-level navigation:
 *   Level 1: [Quinielas | Todos] tabs + date picker (single row)
 *   Level 2: Provider chips (always visible, work in both modes)
 *
 * Quinielas + Leidsa → only quinielas from Leidsa
 * Todos + Leidsa → all sorteos from Leidsa
 */

const PROVIDER_CHIPS = [
  { value: 'nacional',   label: 'Nacional',   color: '#2d7a27' },
  { value: 'leidsa',     label: 'Leidsa',     color: '#d49a00' },
  { value: 'real',       label: 'Real',        color: '#1a3a8f' },
  { value: 'loteka',     label: 'Loteka',      color: '#00aeef' },
  { value: 'primera',    label: 'La Primera',  color: '#e41e25' },
  { value: 'suerte',     label: 'La Suerte',   color: '#1a3a8f' },
  { value: 'lotedom',    label: 'LoteDom',     color: '#0033cc' },
  { value: 'americanas', label: 'Americanas',  color: '#1a1a2e' },
  { value: 'king',       label: 'King',        color: '#c9a84c' },
  { value: 'anguila',    label: 'Anguila',     color: '#f47920' },
]

const DateFilter = ({
  fecha, setFecha,
  modo, setModo,
  empresa, setEmpresa,
  totalResultados,
}) => {
  const handleChipClick = (value) => {
    setEmpresa(empresa === value ? '' : value)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-card animate-fade-in-up overflow-hidden">

      {/* Level 1: Tabs + Date — single row */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3">
        {/* Toggle tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 shrink-0">
          <button
            onClick={() => setModo('quinielas')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200
              ${modo === 'quinielas'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Quinielas
          </button>
          <button
            onClick={() => setModo('todos')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200
              ${modo === 'todos'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Todos
          </button>
        </div>

        {/* Date picker — compact */}
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border border-gray-200 rounded-lg px-2.5 py-2 text-sm text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-primary/30
                     bg-white cursor-pointer shrink-0"
          aria-label="Fecha"
        />
      </div>

      {/* Level 2: Provider chips */}
      <div className="border-t border-gray-100 px-4 sm:px-5 py-3">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          {PROVIDER_CHIPS.map((chip) => {
            const isActive = empresa === chip.value
            return (
              <button
                key={chip.value}
                onClick={() => handleChipClick(chip.value)}
                className="whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold
                           transition-all duration-200 shrink-0"
                style={isActive
                  ? { background: chip.color, color: 'white', boxShadow: `0 2px 8px ${chip.color}40` }
                  : { background: '#f3f4f6', color: '#4b5563' }
                }
                onMouseEnter={(e) => {
                  if (!isActive) { e.currentTarget.style.background = '#e5e7eb' }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) { e.currentTarget.style.background = '#f3f4f6' }
                }}
              >
                {chip.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DateFilter
