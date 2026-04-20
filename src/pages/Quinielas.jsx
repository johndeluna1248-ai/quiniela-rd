/**
 * Quinielas.jsx
 * Página informativa completa sobre las quinielas dominicanas.
 * Incluye guía, tipos de jugadas, horarios, consejos y FAQ.
 */
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

// Array con todos los horarios de quinielas dominicanas
// Cada entrada tiene la lotería, horario y color para el indicador visual
const horarios = [
  { loteria: 'Anguila / King Lottery', horario: '10:00 AM, 12:00 PM, 4:00 PM, 6:00 PM y 9:00 PM', color: 'bg-indigo-500' },
  { loteria: 'La Primera Día',         horario: '12:00 PM (Lun a Dom)',                           color: 'bg-orange-500' },
  { loteria: 'La Suerte',              horario: '12:30 PM (Lun a Dom)',                           color: 'bg-pink-500' },
  { loteria: 'Quiniela Real',          horario: '12:55 PM (Lun a Dom)',                           color: 'bg-blue-500' },
  { loteria: 'Gana Más (Nacional)',    horario: '2:30 PM (Lun a Sáb)',                            color: 'bg-green-500' },
  { loteria: 'New York Tarde',         horario: '2:30 PM (Lun a Dom)',                            color: 'bg-red-600' },
  { loteria: 'Quiniela LoteDom',       horario: '2:55 PM (Lun a Dom)',                            color: 'bg-purple-500' },
  { loteria: 'La Primera Noche',       horario: '7:00 PM (Lun a Dom)',                            color: 'bg-orange-500' },
  { loteria: 'Quiniela Loteka',        horario: '7:55 PM (Lun a Dom)',                            color: 'bg-cyan-500' },
  { loteria: 'Quiniela Leidsa',        horario: '8:55 PM (Lun-Sáb) · 3:55 PM (Dom)',              color: 'bg-yellow-500' },
  { loteria: 'Lotería Nacional Noche', horario: '9:00 PM (Lun a Sáb) · 6:00 PM (Dom)',            color: 'bg-green-500' },
  { loteria: 'New York Noche',         horario: '10:30 PM (Lun a Dom)',                           color: 'bg-red-600' },
]

// Array con los tipos de jugadas y sus premios
// Permite renderizar las cards de forma consistente
const tiposJugadas = [
  {
    nombre: 'Quiniela Simple',
    descripcion: 'La jugada básica. Escoges un solo número y ganas si sale en cualquiera de las tres posiciones.',
    premios: ['Primera: RD$60 por cada peso apostado', 'Segunda: RD$8 por cada peso apostado', 'Tercera: RD$4 por cada peso apostado'],
    color: 'border-green-500'
  },
  {
    nombre: 'Palé',
    descripcion: 'Eliges dos números y ganas si ambos salen, sin importar el orden. Más difícil de pegar, pero el premio es mucho mayor.',
    premios: ['Primera y segunda: ~RD$1,000 por peso', 'Primera y tercera: ~RD$1,000 por peso', 'Segunda y tercera: ~RD$100 por peso'],
    color: 'border-yellow-500'
  },
  {
    nombre: 'Tripleta',
    descripcion: 'La jugada más arriesgada y también la más generosa. Escoges tres números y ganas si los tres salen, sin importar el orden.',
    premios: ['Tres aciertos: RD$20,000 por cada peso apostado', 'Dos aciertos: RD$100 por cada peso apostado'],
    color: 'border-red-500'
  },
  {
    nombre: 'Superpalé',
    descripcion: 'Modalidad especial que combina el primer número ganador de dos sorteos distintos (ej: Leidsa + Nacional Noche).',
    premios: ['Hasta RD$3,000 por cada peso apostado si pegas los dos primeros'],
    color: 'border-purple-500'
  }
]

// Array con las preguntas frecuentes del FAQ
const preguntasFrecuentes = [
  {
    pregunta: '¿Cuánto cuesta jugar una quiniela?',
    respuesta: 'No hay un precio fijo. Tú decides cuánto apuestas, desde RD$1 en adelante. Mientras más apuestes, más ganas si pega.'
  },
  {
    pregunta: '¿Hasta qué hora puedo comprar un ticket?',
    respuesta: 'Generalmente las bancas cierran la venta entre 10 y 15 minutos antes del sorteo. Después de esa hora ya no puedes jugar en ese sorteo.'
  },
  {
    pregunta: '¿Cuánto tiempo tengo para cobrar un premio?',
    respuesta: 'La mayoría de compañías dan 60 días después del sorteo para reclamar. Pasado ese tiempo, el premio se pierde.'
  },
  {
    pregunta: '¿Se pagan impuestos sobre los premios?',
    respuesta: 'Los premios de RD$1 a RD$100,000 están exentos de impuestos. Montos superiores tienen una retención según la Ley 253-12.'
  },
  {
    pregunta: '¿Qué pasa si mi ticket se rompe o se daña?',
    respuesta: 'Lamentablemente, un ticket dañado puede no ser aceptado. Por eso es importante guardarlo en un lugar seguro hasta que veas el resultado.'
  },
  {
    pregunta: '¿Cuál es la quiniela con más premios?',
    respuesta: 'Todas las quinielas del país pagan los mismos multiplicadores básicos (60-8-4), pero las modalidades como Tripleta y Superpalé pueden dar premios mucho más grandes, aunque son más difíciles de pegar.'
  }
]

const Quinielas = () => (
  <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in-up">
    {/* Metadatos SEO para Google y redes sociales */}
    <SEO
      title="Quinielas Dominicanas: Resultados, Horarios y Guía Completa | QuinielaRD"
      description="Guía completa de las quinielas dominicanas: cómo se juega, tipos de jugadas (quiniela, palé, tripleta, superpalé), horarios de Nacional, Leidsa, Loteka, La Primera, LoteDom y más. Resultados al instante."
      canonical="https://quinielard.com/quinielas"
    />

    {/* Header con enlace de regreso y título principal */}
    <div>
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline mb-4">
        ← Volver al inicio
      </Link>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
        Quinielas Dominicanas: Resultados, Horarios y Guía Completa
      </h1>
    </div>

    {/* Sección de introducción */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6">
      <p className="text-sm text-gray-700 leading-relaxed">
        Las quinielas son el alma de la lotería dominicana. Desde tempranito en la mañana hasta entrada la noche, millones de dominicanos juegan su número buscando pegar el primero, el segundo o el tercero. En <strong>QuinielaRD</strong> publicamos los resultados de todas las quinielas del país apenas salen, para que verifiques tu jugada al instante sin tener que esperar.
      </p>
      <p className="text-sm text-gray-700 leading-relaxed mt-3">
        Aquí encontrarás una guía completa: qué es una quiniela, cómo se juega, los tipos de jugadas que existen, los horarios de cada compañía y las preguntas que más hace la gente.
      </p>
    </section>

    {/* Sección: ¿Qué es una Quiniela? */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-3">
      <h2 className="text-xl font-bold text-gray-900">¿Qué es una Quiniela?</h2>
      <p className="text-sm text-gray-700 leading-relaxed">
        La quiniela es el juego de lotería más popular de República Dominicana. Consiste en elegir uno o varios números entre el <strong>00 y el 99</strong>, y esperar a que esos números salgan en el sorteo en vivo. Cada sorteo saca tres números: el primero, el segundo y el tercero, usando tres tómbolas electrónicas con 100 bolos cada una.
      </p>
      <p className="text-sm text-gray-700 leading-relaxed">
        La gracia de la quiniela está en su sencillez. No necesitas conocer estadísticas ni fórmulas complicadas: escoges tu número favorito, el que soñaste anoche o el que te dice el corazón, y juegas. Y si pega, cobras hasta 60 veces lo que apostaste.
      </p>
      <p className="text-sm text-gray-700 leading-relaxed">
        En RD existen más de 10 compañías que operan quinielas, cada una con su horario y sus modalidades. Las más conocidas son la <strong>Lotería Nacional</strong> (fundada en 1882), <strong>Leidsa, Lotería Real, Loteka, La Primera, LoteDom, La Suerte, Anguila y King Lottery</strong>. Los sorteos se transmiten en vivo por televisión y redes sociales, y los resultados los puedes ver aquí mismo pocos minutos después.
      </p>
    </section>

    {/* Sección: Cómo se Juega Paso a Paso */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Cómo se Juega una Quiniela Paso a Paso</h2>
      <p className="text-sm text-gray-700 leading-relaxed">
        Jugar una quiniela es más fácil de lo que parece. Sigue estos 4 pasos:
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-primary">
          <h3 className="font-bold text-gray-900 text-sm mb-1">1. Escoge tu número</h3>
          <p className="text-xs text-gray-700 leading-relaxed">Elige un número del 00 al 99. Puede ser tu fecha de nacimiento, un número que soñaste o uno que te guste.</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-primary">
          <h3 className="font-bold text-gray-900 text-sm mb-1">2. Decide cuánto apostar</h3>
          <p className="text-xs text-gray-700 leading-relaxed">No hay monto fijo. Puedes jugar desde RD$1 en adelante. Mientras más apuestes, más ganas si pega.</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-primary">
          <h3 className="font-bold text-gray-900 text-sm mb-1">3. Ve a tu banca de confianza</h3>
          <p className="text-xs text-gray-700 leading-relaxed">Dale el número y el monto al vendedor. Él te entrega un ticket con tu jugada, la lotería y la fecha del sorteo.</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-primary">
          <h3 className="font-bold text-gray-900 text-sm mb-1">4. Guarda tu ticket</h3>
          <p className="text-xs text-gray-700 leading-relaxed">Si tu número sale como primero, segundo o tercero, ganas. Presenta el ticket en cualquier banca autorizada para cobrar.</p>
        </div>
      </div>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-3">
        <p className="text-xs text-gray-800">
          <strong>Importante:</strong> guarda bien tu ticket porque es la única prueba de tu jugada. Sin ticket no se paga premio, así de sencillo.
        </p>
      </div>
    </section>

    {/* Sección: Tipos de Jugadas */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Tipos de Jugadas en las Quinielas Dominicanas</h2>
      <p className="text-sm text-gray-700 leading-relaxed">
        Existen varias formas de jugar, desde la más simple hasta las que combinan dos sorteos. Estas son las principales:
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {tiposJugadas.map((tipo) => (
          <div key={tipo.nombre} className={`bg-gray-50 rounded-xl p-4 border-l-4 ${tipo.color}`}>
            <h3 className="font-bold text-gray-900 text-sm mb-2">{tipo.nombre}</h3>
            <p className="text-xs text-gray-700 leading-relaxed mb-2">{tipo.descripcion}</p>
            <ul className="text-xs text-gray-700 space-y-1">
              {tipo.premios.map((premio, i) => (
                <li key={i} className="flex gap-1.5">
                  <span className="text-primary font-bold">•</span>
                  <span>{premio}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-600 italic">
        El monto mínimo de apuesta suele ser RD$1 en la mayoría de bancas, aunque algunos sorteos especiales como el Superpalé tienen mínimos más altos. Los pagos pueden variar ligeramente entre compañías.
      </p>
    </section>

    {/* Sección: Horarios completos */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Horarios de Todas las Quinielas Dominicanas</h2>
      <p className="text-sm text-gray-700 leading-relaxed">
        Aquí tienes los horarios actualizados de los sorteos de quinielas más importantes del país. Ten en cuenta que en días feriados algunos sorteos pueden cambiar de hora o suspenderse.
      </p>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Quiniela</th>
              <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Horario</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {horarios.map((h) => (
              <tr key={h.loteria} className="hover:bg-gray-50">
                <td className="px-4 py-2.5 font-medium text-gray-900 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${h.color}`}></span>
                  {h.loteria}
                </td>
                <td className="px-4 py-2.5 text-gray-700">{h.horario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-600 italic">
        Nota: Los horarios de New York pueden cambiar a 3:30 PM y 11:30 PM cuando entra el horario de verano en Estados Unidos.
      </p>
    </section>

    {/* Sección: Consejos */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-3">
      <h2 className="text-xl font-bold text-gray-900">Consejos para Jugadores de Quiniela</h2>
      <p className="text-sm text-gray-700 leading-relaxed">
        Jugar quiniela es divertido, pero hay que hacerlo con cabeza fría. Estos tips te ayudan a disfrutar sin perder más de la cuenta:
      </p>
      <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex gap-2">
          <span className="text-primary font-bold">✓</span>
          <span><strong>Pon un presupuesto y respétalo.</strong> Decide cuánto puedes gastar al día o a la semana sin que te afecte, y no pases de ahí pase lo que pase.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-primary font-bold">✓</span>
          <span><strong>Guarda tus tickets.</strong> Son tu única prueba. Si se rompen, se mojan o se pierden, no hay forma de cobrar un premio aunque pegues.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-primary font-bold">✓</span>
          <span><strong>Verifica en fuentes confiables.</strong> Los únicos resultados oficiales son los que publica cada compañía. En QuinielaRD recopilamos los números de fuentes verificadas y los publicamos apenas salen.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-primary font-bold">✓</span>
          <span><strong>No persigas pérdidas.</strong> Si llevas varios días sin pegar, no apuestes más pensando que "ya te toca". La quiniela es azar puro.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-primary font-bold">✓</span>
          <span><strong>Juega por diversión, no por necesidad.</strong> La quiniela es un juego, no una forma de resolver problemas económicos.</span>
        </li>
      </ul>
    </section>

    {/* Sección: Preguntas Frecuentes (FAQ) */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Preguntas Frecuentes sobre las Quinielas</h2>
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
        En <strong>QuinielaRD</strong> trabajamos para que tengas los resultados de todas las quinielas dominicanas en un solo lugar, rápido y sin complicaciones. Consulta los números ganadores del día, revisa sorteos anteriores y juega siempre con responsabilidad.
      </p>
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
        Ver resultados de hoy →
      </Link>
    </section>
  </main>
)

export default Quinielas
