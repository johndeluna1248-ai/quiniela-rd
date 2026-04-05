/**
 * OtrosSorteos.jsx
 * Página informativa sobre sorteos que no son quinielas.
 */
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const sorteos = [
  {
    loteria: 'Leidsa',
    color: 'bg-yellow-500',
    juegos: [
      { nombre: 'Loto', horario: 'Miércoles y Sábado 8:50 PM' },
      { nombre: 'Pega 3 Más', horario: 'Lunes a Sábado 8:55 PM' },
      { nombre: 'Loto Pool', horario: 'Lunes a Sábado 8:55 PM' },
      { nombre: 'Super Kino TV', horario: 'Lunes a Sábado 8:55 PM' },
    ],
  },
  {
    loteria: 'Loto Real',
    color: 'bg-blue-600',
    juegos: [
      { nombre: 'Loto Real', horario: 'Martes y Viernes 1:00 PM' },
      { nombre: 'Pega 4 Real', horario: '12:55 PM diario' },
    ],
  },
  {
    loteria: 'Loteka',
    color: 'bg-cyan-500',
    juegos: [
      { nombre: 'Loto Loteka', horario: '7:55 PM diario' },
      { nombre: 'Mega Chances', horario: '7:55 PM diario' },
      { nombre: 'Mega Lotto', horario: 'Lunes y Jueves' },
    ],
  },
  {
    loteria: 'La Primera',
    color: 'bg-orange-500',
    juegos: [
      { nombre: 'Loto 5', horario: '7:00 PM diario' },
      { nombre: 'Loto 5 Más', horario: '7:00 PM diario' },
    ],
  },
  {
    loteria: 'King Lottery',
    color: 'bg-red-500',
    juegos: [
      { nombre: 'Super Lotto', horario: 'Martes y Viernes 9:00 PM' },
      { nombre: 'Pick 3 y Pick 4', horario: '4 sorteos diarios' },
    ],
  },
]

const OtrosSorteos = () => (
  <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in-up">
    <SEO
      title="Loto, Pega 3, Kino y Más Sorteos | Resultados RD"
      description="Resultados de Loto Leidsa, Pega 3 Más, Super Kino TV, Loto Real, Mega Chances y más sorteos dominicanos actualizados hoy."
      canonical="https://quinielard.com/otros-sorteos"
    />

    <div>
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline mb-4">
        ← Volver al inicio
      </Link>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Otros Sorteos</h1>
    </div>

    <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 sm:p-8 space-y-6 text-gray-700 text-sm leading-relaxed">

      <section className="space-y-3">
        <p>
          Además de las quinielas tradicionales, las loterías dominicanas ofrecen una variedad de
          sorteos con diferentes mecánicas y premios. Entre los más populares se encuentran el{' '}
          <strong>Loto</strong>, <strong>Pega 3</strong>, <strong>Pega 4</strong>,{' '}
          <strong>Kino</strong>, <strong>LotoPool</strong> y <strong>Mega Chances</strong>.
        </p>
        <p>
          Estos juegos permiten elegir más números y ofrecen premios acumulados que pueden alcanzar
          millones de pesos. Cada lotería tiene sus propias reglas y horarios para estos sorteos especiales.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Detalle por Lotería</h2>

        {sorteos.map(s => (
          <div key={s.loteria} className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
              <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
              <h3 className="font-bold text-gray-900">{s.loteria}</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {s.juegos.map(j => (
                <div key={j.nombre} className="flex justify-between items-center px-4 py-2.5">
                  <span className="font-medium text-gray-800">{j.nombre}</span>
                  <span className="text-gray-500 text-xs">{j.horario}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

    </div>
  </main>
)

export default OtrosSorteos
