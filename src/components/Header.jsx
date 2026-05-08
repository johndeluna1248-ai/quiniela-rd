/**
 * Header.jsx
 * Barra de navegación superior — QuinielaRD brand v2.0
 */
import { Link } from 'react-router-dom'

const Header = () => (
  <header className="sticky top-0 z-40 border-b-4 border-amber-400 shadow-md"
          style={{ background: 'var(--gradient-brand)' }}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 no-underline group" style={{ textDecoration: 'none' }}>
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-black text-lg sm:text-xl flex-shrink-0
                        transition-transform duration-200 group-hover:scale-105"
             style={{ backgroundColor: '#FBBF24', color: '#0D1F42', boxShadow: '0 2px 8px rgba(251,191,36,0.3)' }}>
          Q
        </div>
        <div className="flex flex-col">
          <span className="text-2xl sm:text-3xl leading-none"
                style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-white">Quiniela</span>
            <span style={{ color: 'var(--color-amber-400)' }}>RD</span>
          </span>
          <span className="text-[10px] uppercase font-semibold hidden sm:block leading-none mt-0.5"
                style={{ color: 'var(--color-blue-gray)', letterSpacing: '0.15em' }}>
            RESULTADOS EN TIEMPO REAL
          </span>
        </div>
      </Link>

      {/* Badge "En vivo" */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                      bg-amber-400/20 border border-amber-400/40 text-amber-400">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="hidden sm:inline">Resultados en vivo</span>
        <span className="sm:hidden">En vivo</span>
      </div>

    </div>
  </header>
)

export default Header
