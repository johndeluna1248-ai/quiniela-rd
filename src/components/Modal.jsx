/**
 * Modal.jsx
 * Modal "Muy pronto" para el botón Avísame.
 */
import { useEffect } from 'react'

const Modal = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative animate-scale-in">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center
                     text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Bell icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
            <span className="text-3xl">🔔</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 text-center mb-3">
          ¡Muy pronto!
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6 leading-relaxed">
          Estamos preparando las notificaciones para que recibas los resultados en tiempo real.
          Esta función estará disponible muy pronto.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-primary text-white rounded-xl py-2.5 text-sm
                     font-semibold hover:bg-primary-700 active:scale-[0.98] transition-all"
        >
          Entendido
        </button>
      </div>
    </div>
  )
}

export default Modal
