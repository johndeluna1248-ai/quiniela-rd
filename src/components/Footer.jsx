/**
 * Footer.jsx
 * Pie de página — QuinielaRD brand v2.0
 */
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="mt-auto border-t-4 border-amber-400"
          style={{ background: 'linear-gradient(90deg, #1B357C 0%, #0D1F42 100%)' }}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

      {/* Top section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 mb-8">

        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-black text-lg sm:text-xl flex-shrink-0"
                 style={{ backgroundColor: '#FBBF24', color: '#0D1F42', boxShadow: '0 2px 8px rgba(251,191,36,0.3)' }}>
              Q
            </div>
            <span className="text-2xl sm:text-3xl leading-none"
                  style={{ fontFamily: 'var(--font-display)' }}>
              <span className="text-white">Quiniela</span>
              <span style={{ color: 'var(--color-amber-400)' }}>RD</span>
            </span>
          </div>
          <p className="text-sm max-w-xs text-center sm:text-left leading-relaxed"
             style={{ color: 'var(--color-blue-gray)' }}>
            Tu fuente confiable de resultados de loterías dominicanas en tiempo real.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex gap-10 sm:gap-12 text-sm">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase mb-3"
                  style={{ color: 'var(--color-amber-400)', letterSpacing: '0.15em' }}>
              Sorteos
            </span>
            <Link to="/quinielas" className="mt-2 transition-colors group"
                  style={{ color: 'var(--color-blue-gray)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-blue-gray)'}>
              Quinielas
              <span className="block text-[11px] font-normal mt-0.5 leading-tight"
                    style={{ color: 'rgba(185,197,217,0.5)' }}>
                Horarios, premios y modalidades
              </span>
            </Link>
            <Link to="/otros-sorteos" className="mt-3 transition-colors"
                  style={{ color: 'var(--color-blue-gray)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-blue-gray)'}>
              Otros Sorteos
              <span className="block text-[11px] font-normal mt-0.5 leading-tight"
                    style={{ color: 'rgba(185,197,217,0.5)' }}>
                Loto, Kino, PowerBall, Mega Millions
              </span>
            </Link>
            <Link to="/loterias" className="mt-3 transition-colors"
                  style={{ color: 'var(--color-blue-gray)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-blue-gray)'}>
              Loterías
              <span className="block text-[11px] font-normal mt-0.5 leading-tight"
                    style={{ color: 'rgba(185,197,217,0.5)' }}>
                Directorio de loterías dominicanas
              </span>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase mb-3"
                  style={{ color: 'var(--color-amber-400)', letterSpacing: '0.15em' }}>
              Sitio
            </span>
            <Link to="/sobre-nosotros" className="mt-2 transition-colors"
                  style={{ color: 'var(--color-blue-gray)' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-blue-gray)'}>
              Sobre Nosotros
            </Link>
            <Link to="/contacto" className="mt-2 transition-colors"
                  style={{ color: 'var(--color-blue-gray)' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-blue-gray)'}>
              Contacto
            </Link>
            <Link to="/privacidad" className="mt-2 transition-colors"
                  style={{ color: 'var(--color-blue-gray)' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-blue-gray)'}>
              Privacidad
            </Link>
            <Link to="/terminos" className="mt-2 transition-colors"
                  style={{ color: 'var(--color-blue-gray)' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-blue-gray)'}>
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>

      {/* Divider + disclaimer */}
      <div className="border-t border-white/10 pt-4 pb-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-center sm:text-left leading-relaxed"
             style={{ color: 'rgba(185, 197, 217, 0.7)' }}>
            QuinielaRD no es un sitio oficial de ninguna lotería. Los resultados son
            recopilados de fuentes públicas con fines informativos.
          </p>
          <p className="text-xs whitespace-nowrap"
             style={{ color: 'rgba(185, 197, 217, 0.7)' }}>
            &copy; 2026 QuinielaRD
          </p>
        </div>
      </div>

    </div>
  </footer>
)

export default Footer
