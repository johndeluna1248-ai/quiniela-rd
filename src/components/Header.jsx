/**
 * Header.jsx
 * Barra de navegación superior con glassmorphism y badge en vivo.
 */
import { Link } from 'react-router-dom'

const Header = () => (
  <header className="sticky top-0 z-40 border-b border-gray-200/60 shadow-sm glass">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 no-underline group" style={{ textDecoration: 'none' }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm
                        bg-gradient-to-br from-primary-700 to-primary shadow-glow
                        group-hover:shadow-lg transition-shadow duration-200">
          Q
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tight text-primary leading-none">
            QuinielaRD
          </span>
          <span className="text-[10px] text-gray-400 font-medium tracking-wide hidden sm:block leading-none mt-0.5">
            RESULTADOS EN TIEMPO REAL
          </span>
        </div>
      </Link>

      {/* Badge "En vivo" */}
      <div className="badge-live">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
        </span>
        <span className="hidden sm:inline">Resultados en vivo</span>
        <span className="sm:hidden">En vivo</span>
      </div>

    </div>
  </header>
)

export default Header
