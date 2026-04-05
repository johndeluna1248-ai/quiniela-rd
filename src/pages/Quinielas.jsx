/**
 * Quinielas.jsx
 * Página informativa sobre las quinielas dominicanas.
 */
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const horarios = [
  { loteria: 'Lotería Nacional', horario: '2:30 PM y 9:00 PM (Lun-Sáb) · 2:30 PM y 6:00 PM (Dom)', color: 'bg-green-500' },
  { loteria: 'Leidsa',           horario: '8:55 PM (Lun-Sáb) · 3:55 PM (Dom)',                      color: 'bg-yellow-500' },
  { loteria: 'Loteka',           horario: '7:55 PM diario',                                          color: 'bg-cyan-500' },
  { loteria: 'La Primera',       horario: '12:00 PM y 7:00 PM diario',                               color: 'bg-orange-500' },
  { loteria: 'La Suerte',        horario: '12:30 PM y 6:00 PM diario',                               color: 'bg-pink-500' },
  { loteria: 'Lotedom',          horario: '5:55 PM diario',                                          color: 'bg-purple-500' },
  { loteria: 'King Lottery',     horario: '10:00 AM, 1:00 PM, 6:00 PM y 9:00 PM',                   color: 'bg-red-500' },
  { loteria: 'Anguila',          horario: '10:00 AM, 1:00 PM, 5:00 PM y 9:00 PM',                   color: 'bg-indigo-500' },
]

const Quinielas = () => (
  <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in-up">
    <SEO
      title="Quinielas Dominicanas | Horarios y Resultados de Hoy"
      description="Todos los horarios de quinielas dominicanas. Nacional, Leidsa, Loteka, La Primera, La Suerte, Lotedom, King Lottery y Anguila. Resultados actualizados en tiempo real."
      canonical="https://quinielard.com/quinielas"
    />

    <div>
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline mb-4">
        ← Volver al inicio
      </Link>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">¿Qué es una Quiniela?</h1>
    </div>

    <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 sm:p-8 space-y-6 text-gray-700 text-sm leading-relaxed">

      <section className="space-y-3">
        <p>
          La <strong>quiniela</strong> es el juego de lotería más popular de la República Dominicana.
          Consiste en elegir uno o varios números y ganar según cuántos de ellos coincidan con los
          números sorteados oficialmente por cada lotería.
        </p>
        <p>
          Es un juego accesible, con apuestas desde montos muy bajos, y se puede jugar en bancas
          de lotería en todo el país. Los sorteos se transmiten en vivo por televisión y redes sociales.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">Tipos de Jugadas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { nombre: 'Quiniela', desc: 'Se elige 1 número (2 cifras). Se gana si coincide con la primera bola sorteada.' },
            { nombre: 'Pale', desc: 'Se eligen 2 números. Ambos deben coincidir con las primeras bolas sorteadas.' },
            { nombre: 'Tripleta', desc: 'Se eligen 3 números. Los tres deben aparecer entre las primeras bolas del sorteo.' },
            { nombre: 'Superpale', desc: 'Combinación de dos números de sorteos diferentes (ej. Nacional Tarde + Nacional Noche).' },
          ].map(t => (
            <div key={t.nombre} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="font-bold text-gray-900 mb-1">{t.nombre}</p>
              <p className="text-gray-600 text-xs leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">Horarios de Quinielas</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-3 font-semibold text-gray-900">Lotería</th>
                <th className="text-left py-3 px-3 font-semibold text-gray-900">Horario</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map(h => (
                <tr key={h.loteria} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">
                    <span className={`inline-block w-2 h-2 rounded-full ${h.color} mr-2`} />
                    {h.loteria}
                  </td>
                  <td className="py-3 px-3 text-gray-600">{h.horario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  </main>
)

export default Quinielas
