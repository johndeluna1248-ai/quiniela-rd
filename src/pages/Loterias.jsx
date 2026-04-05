/**
 * Loterias.jsx
 * Página informativa sobre las loterías dominicanas.
 */
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const loterias = [
  {
    nombre: 'Lotería Nacional',
    fundada: '1882',
    color: 'bg-green-500',
    desc: 'La más antigua del país y la institución de lotería oficial del Estado dominicano. Realiza sorteos de quiniela en horario de tarde y noche, además de sorteos especiales.',
    web: 'loterianacional.gob.do',
  },
  {
    nombre: 'Leidsa',
    fundada: '1997',
    color: 'bg-yellow-500',
    desc: 'Pionera en lotería electrónica en República Dominicana. Responsable del 90% de la actividad de lotería en el país. Opera Loto, Pega 3 Más, Super Kino TV, Loto Pool y más.',
    web: 'leidsa.com',
  },
  {
    nombre: 'Loto Real',
    fundada: '2009',
    color: 'bg-blue-600',
    desc: 'Administrada por la Lotería Nacional. Ofrece 6 sorteos diarios de quiniela además de Loto Real y Pega 4 Real.',
    web: 'lotoreal.com.do',
  },
  {
    nombre: 'Loteka',
    fundada: '1997',
    color: 'bg-cyan-500',
    desc: 'Transmite sus sorteos en vivo por Telesistema canal 11. Opera Loto Loteka, Mega Chances y Mega Lotto.',
    web: 'loteka.com.do',
  },
  {
    nombre: 'La Primera',
    fundada: '2019',
    color: 'bg-orange-500',
    desc: 'Una de las loterías más nuevas del país, con sorteos de quiniela al mediodía y en la noche, además de Loto 5.',
    web: 'laprimera.do',
  },
  {
    nombre: 'La Suerte Dominicana',
    fundada: '2020',
    color: 'bg-pink-500',
    desc: 'Sus sorteos se realizan con la colaboración de personas ciegas del Cibao, una iniciativa de inclusión social única en el país.',
    web: 'lasuertedominicana.do',
  },
  {
    nombre: 'Lotedom',
    fundada: '2014',
    color: 'bg-purple-500',
    desc: 'Opera la quiniela Lotedom y El Quemaíto Mayor, un sorteo popular con mecánica de juego diferente.',
    web: 'lotedom.com.do',
  },
  {
    nombre: 'King Lottery',
    fundada: null,
    color: 'bg-red-500',
    desc: 'Basada en Sint Maarten. Ofrece múltiples sorteos diarios incluyendo quiniela, Super Lotto, Pick 3 y Pick 4.',
    web: 'kinglotterysxm.com',
  },
  {
    nombre: 'Madroka Anguila',
    fundada: '2018',
    color: 'bg-indigo-500',
    desc: 'Primera lotería nativa de Anguila. Popular en República Dominicana con 4 sorteos de quiniela al día.',
    web: 'anguillalottery.ai',
  },
]

const Loterias = () => (
  <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in-up">
    <SEO
      title="Loterías Dominicanas | Nacional, Leidsa, Loteka y Más"
      description="Información completa de todas las loterías dominicanas: Lotería Nacional, Leidsa, Loto Real, Loteka, La Primera, La Suerte, Lotedom, King Lottery y Anguila."
      canonical="https://quinielard.com/loterias"
    />

    <div>
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline mb-4">
        ← Volver al inicio
      </Link>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Loterías Dominicanas</h1>
    </div>

    <div className="space-y-4">
      {loterias.map(l => (
        <div key={l.nombre} className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 sm:p-8 text-sm leading-relaxed">
          <div className="flex items-start gap-3 mb-3">
            <span className={`w-3 h-3 rounded-full ${l.color} mt-1 shrink-0`} />
            <div>
              <h2 className="text-lg font-bold text-gray-900">{l.nombre}</h2>
              {l.fundada && (
                <span className="text-xs text-gray-500">Fundada en {l.fundada}</span>
              )}
            </div>
          </div>
          <p className="text-gray-700 mb-3 ml-6">{l.desc}</p>
          <p className="ml-6">
            <a href={`https://${l.web}`} target="_blank" rel="noopener noreferrer"
              className="text-primary hover:underline font-medium text-xs">
              {l.web}
            </a>
          </p>
        </div>
      ))}
    </div>

  </main>
)

export default Loterias
