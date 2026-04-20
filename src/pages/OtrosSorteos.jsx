/**
 * OtrosSorteos.jsx
 * Página informativa completa sobre sorteos especiales dominicanos
 * (Loto, Kino, Mega Chances) y americanos (PowerBall, Mega Millions).
 * Incluye premios, horarios, sección específica para la diáspora y FAQ.
 */
import { Link } from 'react-router-dom'
import FAQSchema from '../components/FAQSchema'
import SEO from '../components/SEO'

// Sorteos de Leidsa con detalles de premios
const sorteosLeidsa = [
  {
    nombre: 'Loto Leidsa',
    descripcion: 'Eliges 6 números del 1 al 49. El jackpot acumula cuando no hay ganador, alcanzando decenas de millones.',
    horario: 'Miércoles y sábados 8:55 PM'
  },
  {
    nombre: 'Super Kino TV',
    descripcion: 'Sorteo con 80 bolos, se extraen 20. Premio mayor RD$25,000,000 con 10 aciertos. Ticket de RD$25.',
    horario: 'Diario 8:55 PM (3:55 PM domingos)'
  },
  {
    nombre: 'Loto Pool',
    descripcion: 'Eliges 5 números con premios acumulados. Modalidad popular con buenas probabilidades.',
    horario: 'Diario 8:55 PM (3:55 PM domingos)'
  },
  {
    nombre: 'Pega 3 Más',
    descripcion: 'El más corto. Eliges 3 números del 00 al 99 y ganas si coinciden con los ganadores.',
    horario: 'Diario 8:55 PM'
  }
]

// Sorteos de Lotería Nacional
const sorteosNacional = [
  {
    nombre: 'Juega + Pega +',
    descripcion: 'Juego de 5 números con múltiples formas de ganar según cuántos aciertes.',
    horario: 'Lun-Sáb 2:30 PM'
  },
  {
    nombre: 'Billetes de los Domingos',
    descripcion: 'Rifa tradicional con premios grandes. Uno de los juegos más antiguos y emblemáticos del país.',
    horario: 'Domingos 6:00 PM'
  }
]

// Sorteos de Lotería Real
const sorteosReal = [
  {
    nombre: 'Loto Real',
    descripcion: 'Sorteo con jackpot acumulado que puede alcanzar cifras millonarias.',
    horario: 'Martes y viernes 12:55 PM'
  },
  {
    nombre: 'Loto Pool Real',
    descripcion: 'Eliges 5 números del 1 al 35. Una de las mejores relaciones premio-probabilidad.',
    horario: 'Diario 1:00 PM'
  },
  {
    nombre: 'Tu Fecha Real',
    descripcion: 'Juego único donde apuestas por una fecha específica (día y mes).',
    horario: 'Diario'
  },
  {
    nombre: 'Nueva Yol Real',
    descripcion: 'Versión local inspirada en el formato de lotería neoyorquina.',
    horario: 'Diario 1:00 PM'
  }
]

// Sorteos de Loteka con premios altos
const sorteosLoteka = [
  {
    nombre: 'Mega Chances',
    descripcion: 'Eliges 5 números del 00 al 99. Premio mayor RD$50,000,000 + una Tahoe del año con 5 aciertos. Ticket de RD$20.',
    horario: 'Diario 7:55 PM'
  },
  {
    nombre: 'Mega Lotto',
    descripcion: 'Eliges 6 números del 01 al 49. Premio mayor desde RD$30,000,000 más acumulado. Ticket de RD$10.',
    horario: 'Lunes y jueves 7:55 PM'
  },
  {
    nombre: 'Toca 3 y El Extra',
    descripcion: 'Juegos complementarios con premios menores pero mejores probabilidades de ganar.',
    horario: 'Diario 7:55 PM'
  }
]

// Sorteos de La Primera
const sorteosPrimera = [
  {
    nombre: 'Loto 5',
    descripcion: 'Eliges 5 números con premios acumulados.',
    horario: 'Diario'
  },
  {
    nombre: 'El Quinielón (Día y Noche)',
    descripcion: 'Versión extendida de la quiniela tradicional con mayores premios.',
    horario: '12:00 PM y 7:00 PM'
  }
]

// Sorteos americanos (para la diáspora dominicana)
const sorteosAmericanos = [
  {
    nombre: 'PowerBall',
    descripcion: 'El sorteo más popular de EE.UU. Eliges 5 números del 1 al 69 más un PowerBall del 1 al 26. Jackpots mínimos de $20M USD que pueden crecer hasta más de $1,000M USD.',
    horario: 'Lun, Mié y Sáb 10:59 PM (hora RD)',
    color: 'border-red-500'
  },
  {
    nombre: 'Mega Millions',
    descripcion: 'El otro gigante americano. Eliges 5 números del 1 al 70 más un Mega Ball del 1 al 25. Jackpots que pueden superar los $1,500M USD. Costo: $5 USD por jugada.',
    horario: 'Mar y Vie 11:00 PM (hora RD)',
    color: 'border-yellow-500'
  },
  {
    nombre: 'Florida Lottery',
    descripcion: 'Incluye Florida Lotto, Fantasy 5, Pick 3 y Pick 4. Sorteos diarios con transmisión por la noche.',
    horario: 'Varios diarios',
    color: 'border-blue-500'
  },
  {
    nombre: 'New York Lottery',
    descripcion: 'Además de las quinielas (NY Tarde y Noche), incluye Take 5, Numbers y Win 4. Muy seguidos por la comunidad dominicana en el área metropolitana de NY.',
    horario: 'Varios diarios',
    color: 'border-orange-500'
  }
]

// Horarios completos en tabla
const horariosCompletos = [
  { sorteo: 'Loto Pool Real',       horario: '1:00 PM diario',                    color: 'bg-blue-500' },
  { sorteo: 'Loto Real',            horario: '12:55 PM (Mar y Vie)',             color: 'bg-blue-500' },
  { sorteo: 'Juega + Pega +',       horario: '2:30 PM (Lun a Sáb)',              color: 'bg-green-500' },
  { sorteo: 'Billetes Nacional',    horario: '6:00 PM (Domingos)',                color: 'bg-green-500' },
  { sorteo: 'Mega Chances',         horario: '7:55 PM diario',                    color: 'bg-cyan-500' },
  { sorteo: 'Mega Lotto',           horario: '7:55 PM (Lun y Jue)',              color: 'bg-cyan-500' },
  { sorteo: 'Toca 3 / El Extra',    horario: '7:55 PM diario',                    color: 'bg-cyan-500' },
  { sorteo: 'Loto Leidsa',          horario: '8:55 PM (Mié y Sáb)',              color: 'bg-yellow-500' },
  { sorteo: 'Super Kino TV',        horario: '8:55 PM diario (3:55 PM Dom)',     color: 'bg-yellow-500' },
  { sorteo: 'Loto Pool',            horario: '8:55 PM diario (3:55 PM Dom)',     color: 'bg-yellow-500' },
  { sorteo: 'Pega 3 Más',           horario: '8:55 PM diario',                    color: 'bg-yellow-500' },
  { sorteo: 'PowerBall',            horario: '10:59 PM (Lun/Mié/Sáb)',           color: 'bg-red-500' },
  { sorteo: 'Mega Millions',        horario: '11:00 PM (Mar y Vie)',             color: 'bg-red-500' }
]

// FAQ con 5 preguntas clave
const preguntasFrecuentes = [
  {
    pregunta: '¿Puedo jugar PowerBall o Mega Millions desde República Dominicana?',
    respuesta: 'No. Estos sorteos solo se venden en Estados Unidos. En QuinielaRD publicamos los resultados para información de nuestra comunidad dominicana en EE.UU. y los curiosos en RD.'
  },
  {
    pregunta: '¿Cuál es el sorteo con el premio más grande en República Dominicana?',
    respuesta: 'Actualmente Mega Chances de Loteka con RD$50,000,000 + una Tahoe, y Super Kino TV de Leidsa con RD$25,000,000. Los jackpots acumulados del Loto y Mega Lotto pueden superar estos montos.'
  },
  {
    pregunta: '¿Cuánto cuesta jugar estos sorteos?',
    respuesta: 'Varía por juego. Mega Chances cuesta RD$20, Mega Lotto RD$10, Super Kino TV RD$25. PowerBall y Mega Millions cuestan $2-$5 USD por jugada en Estados Unidos.'
  },
  {
    pregunta: '¿Los premios se cobran igual que las quinielas?',
    respuesta: 'Sí, en la misma banca donde compraste el ticket. Premios mayores requieren ir a la oficina principal de la compañía. Tienes 60 días para reclamar.'
  },
  {
    pregunta: '¿Pagan impuestos estos premios?',
    respuesta: 'Sí. En RD, premios mayores a RD$100,000 tienen retención según la Ley 253-12 (10% hasta RD$500,000, 15% hasta RD$1,000,000 y 25% sobre RD$1,000,001). En EE.UU. los premios grandes tienen retención federal y estatal.'
  }
]

// Función auxiliar para renderizar un grupo de sorteos
// Evita repetir el mismo JSX para cada compañía
const SorteosGroup = ({ titulo, descripcion, sorteos, colorBorde }) => (
  <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-4">
    <h2 className="text-xl font-bold text-gray-900">{titulo}</h2>
    {descripcion && <p className="text-sm text-gray-700 leading-relaxed">{descripcion}</p>}
    <div className="space-y-3">
      {sorteos.map((s) => (
        <div key={s.nombre} className={`bg-gray-50 rounded-xl p-4 border-l-4 ${colorBorde}`}>
          <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
            <h3 className="font-bold text-gray-900 text-sm">{s.nombre}</h3>
            <span className="text-xs text-gray-600 font-medium">{s.horario}</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">{s.descripcion}</p>
        </div>
      ))}
    </div>
  </section>
)

const OtrosSorteos = () => (
  <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in-up">
    {/* Metadatos SEO para Google y redes sociales */}
    <SEO
      title="Otros Sorteos: Loto, Kino, PowerBall y Mega Millions | QuinielaRD"
      description="Guía completa de sorteos especiales dominicanos (Loto, Super Kino TV, Mega Chances, Mega Lotto) y americanos (PowerBall, Mega Millions) con premios, horarios y reglas actualizadas."
      canonical="https://quinielard.com/otros-sorteos"
    />
    <FAQSchema faqs={preguntasFrecuentes} />

    {/* Header con enlace de regreso y título principal */}
    <div>
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline mb-4">
        ← Volver al inicio
      </Link>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
        Otros Sorteos de Loterías Dominicanas y Americanas
      </h1>
    </div>

    {/* Sección de introducción */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6">
      <p className="text-sm text-gray-700 leading-relaxed">
        Además de las quinielas tradicionales, las loterías dominicanas y americanas ofrecen una variedad de sorteos especiales con premios acumulados que pueden cambiarle la vida a cualquiera. Hablamos del <strong>Loto, el Super Kino TV, el Mega Chances</strong> y de los famosos <strong>PowerBall y Mega Millions</strong> que millones de dominicanos siguen desde Estados Unidos.
      </p>
      <p className="text-sm text-gray-700 leading-relaxed mt-3">
        En <strong>QuinielaRD</strong> publicamos los resultados de estos sorteos apenas salen, tanto para los jugadores en República Dominicana como para la diáspora dominicana que vive en EE.UU. y quiere mantenerse conectada con los juegos del país y los de su nuevo hogar.
      </p>
    </section>

    {/* Sección: Qué son los otros sorteos */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-3">
      <h2 className="text-xl font-bold text-gray-900">¿Qué son los Otros Sorteos?</h2>
      <p className="text-sm text-gray-700 leading-relaxed">
        A diferencia de las quinielas (donde eliges 1, 2 o 3 números entre el 00 y el 99), los "otros sorteos" son juegos donde seleccionas varios números de un rango más grande, y los premios suelen ser acumulados. Estos son los tres tipos principales:
      </p>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500">
          <h3 className="font-bold text-gray-900 text-sm mb-1">Tipo Loto</h3>
          <p className="text-xs text-gray-700 leading-relaxed">
            Eliges entre 5 y 6 números de una tómbola grande (ej. del 1 al 49). Premios millonarios que se acumulan.
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-yellow-500">
          <h3 className="font-bold text-gray-900 text-sm mb-1">Tipo Kino</h3>
          <p className="text-xs text-gray-700 leading-relaxed">
            Un bingo numérico donde se sortean muchos números (20 de 80) y ganas según cuántos aciertes.
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-green-500">
          <h3 className="font-bold text-gray-900 text-sm mb-1">Tipo Pega</h3>
          <p className="text-xs text-gray-700 leading-relaxed">
            Juegos cortos donde seleccionas pocos números con premios modestos pero mejores probabilidades.
          </p>
        </div>
      </div>
    </section>

    {/* Sorteos por compañía usando componente auxiliar */}
    <SorteosGroup
      titulo="Sorteos de Leidsa (Lotería Electrónica)"
      descripcion="Leidsa es la lotería electrónica más grande del país y ofrece varios sorteos con premios millonarios. Conocida como 'La Fábrica de Millonarios' desde 1997."
      sorteos={sorteosLeidsa}
      colorBorde="border-yellow-500"
    />

    <SorteosGroup
      titulo="Sorteos de Lotería Nacional"
      descripcion="La Lotería Nacional Dominicana, fundada en 1882, ofrece sorteos adicionales a sus quinielas tradicionales."
      sorteos={sorteosNacional}
      colorBorde="border-green-500"
    />

    <SorteosGroup
      titulo="Sorteos de Lotería Real"
      descripcion="La Lotería Real, con sede en Santiago, ofrece varios sorteos electrónicos diarios."
      sorteos={sorteosReal}
      colorBorde="border-blue-500"
    />

    <SorteosGroup
      titulo="Sorteos de Loteka"
      descripcion="Loteka tiene uno de los premios más grandes del país con el Mega Chances y el Mega Lotto."
      sorteos={sorteosLoteka}
      colorBorde="border-cyan-500"
    />

    <SorteosGroup
      titulo="Sorteos de La Primera"
      descripcion="La Primera ofrece sorteos adicionales con buenos premios acumulados."
      sorteos={sorteosPrimera}
      colorBorde="border-orange-500"
    />

    {/* Sección: Sorteos Americanos con aviso especial */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Sorteos Americanos (PowerBall, Mega Millions y Más)</h2>
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
        <p className="text-xs text-gray-800 leading-relaxed">
          <strong>IMPORTANTE:</strong> Estos sorteos NO se venden en República Dominicana. Sin embargo, publicamos sus resultados porque miles de dominicanos viven en Estados Unidos y siguen estos juegos, además de que hay mucha curiosidad por conocer los jackpots que a veces alcanzan cifras históricas.
        </p>
      </div>
      <div className="space-y-3">
        {sorteosAmericanos.map((s) => (
          <div key={s.nombre} className={`bg-gray-50 rounded-xl p-4 border-l-4 ${s.color}`}>
            <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
              <h3 className="font-bold text-gray-900 text-sm">{s.nombre}</h3>
              <span className="text-xs text-gray-600 font-medium">{s.horario}</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">{s.descripcion}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Sección: Tabla de horarios completos */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Horarios de Todos los Sorteos Especiales</h2>
      <p className="text-sm text-gray-700 leading-relaxed">
        Aquí tienes los horarios actualizados de todos los sorteos especiales dominicanos y americanos. Los horarios americanos están en hora de República Dominicana.
      </p>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Sorteo</th>
              <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Horario</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {horariosCompletos.map((h) => (
              <tr key={h.sorteo} className="hover:bg-gray-50">
                <td className="px-4 py-2.5 font-medium text-gray-900 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${h.color}`}></span>
                  {h.sorteo}
                </td>
                <td className="px-4 py-2.5 text-gray-700">{h.horario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    {/* Sección: Cómo funcionan los jackpots acumulados */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-3">
      <h2 className="text-xl font-bold text-gray-900">Cómo Funcionan los Sorteos de Jackpot Acumulado</h2>
      <p className="text-sm text-gray-700 leading-relaxed">
        La mayoría de estos sorteos funcionan con un <strong>sistema de jackpot acumulado</strong>: si nadie acierta todos los números en un sorteo, el premio se pasa al siguiente y sigue creciendo. Por eso de vez en cuando escuchas que el Loto o el PowerBall "está en 500 millones" o "mil millones", porque llevan semanas o meses sin ganador.
      </p>
      <p className="text-sm text-gray-700 leading-relaxed">
        Las probabilidades de pegar el premio mayor en estos sorteos son mucho más bajas que en las quinielas, pero los premios son exponencialmente más grandes. Por eso muchos jugadores combinan: juegan quinielas para los premios frecuentes y compran un ticket de Loto o Mega Chances cuando el jackpot está alto.
      </p>
    </section>

    {/* Sección: Preguntas Frecuentes */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Preguntas Frecuentes</h2>
      <div className="space-y-3">
        {preguntasFrecuentes.map((faq, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 text-sm mb-1.5">▸ {faq.pregunta}</h3>
            <p className="text-xs text-gray-700 leading-relaxed">{faq.respuesta}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Cierre con CTA al home */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center">
      <p className="text-sm text-gray-800 leading-relaxed mb-3">
        En <strong>QuinielaRD</strong> publicamos los resultados de todos estos sorteos especiales apenas salen, tanto dominicanos como americanos. Si estás en RD o vives en Estados Unidos, aquí tienes un solo lugar para ver los números ganadores de todas las loterías que importan.
      </p>
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
        Ver resultados de hoy →
      </Link>
    </section>
  </main>
)

export default OtrosSorteos
