/**
 * Footer.jsx
 * Pie de página profesional con gradiente, links y branding.
 */
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="mt-auto text-white"
    style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e3050 100%)' }}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Top section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8">

        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="font-black text-primary text-sm leading-none">Q</span>
            </div>
            <span className="font-black text-lg tracking-tight">QuinielaRD</span>
          </div>
          <p className="text-sm text-blue-200 max-w-xs text-center sm:text-left leading-relaxed">
            Tu fuente confiable de resultados de loterías dominicanas en tiempo real.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-300 mb-1">Sorteos</span>
            <Link to="/quinielas" className="text-blue-200 hover:text-white transition-colors">Quinielas</Link>
            <Link to="/otros-sorteos" className="text-blue-200 hover:text-white transition-colors">Otros Sorteos</Link>
            <Link to="/loterias" className="text-blue-200 hover:text-white transition-colors">Loterías</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-300 mb-1">Legal</span>
            <Link to="/privacidad" className="text-blue-200 hover:text-white transition-colors">Privacidad</Link>
            <Link to="/terminos" className="text-blue-200 hover:text-white transition-colors">Términos de Uso</Link>
            <a href="mailto:contacto@quinielard.com" className="text-blue-200 hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-blue-300 text-center sm:text-left leading-relaxed">
            QuinielaRD no es un sitio oficial de ninguna lotería. Los resultados son
            recopilados de fuentes públicas con fines informativos.
          </p>
          <p className="text-xs text-blue-400 whitespace-nowrap">
            &copy; 2026 QuinielaRD
          </p>
        </div>
      </div>

    </div>
  </footer>
)

export default Footer
