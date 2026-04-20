/**
 * Loterias.jsx
 * Página informativa completa sobre las compañías de loterías dominicanas.
 * Incluye historia, sorteos ofrecidos, sedes y enlaces oficiales de cada una.
 */
import { Link } from 'react-router-dom'
import FAQSchema from '../components/FAQSchema'
import SEO from '../components/SEO'

// Array con toda la información de cada compañía de lotería
// Incluye año, tipo, sede, descripción, sorteos y URL oficial
const loterias = [
  {
    nombre: 'Lotería Nacional',
    subtitulo: 'La más antigua del país',
    fundacion: '1882',
    sede: 'Av. Independencia, Santo Domingo',
    tipo: 'Institución del Estado',
    color: 'border-green-500',
    colorBadge: 'bg-green-100 text-green-800',
    historia: 'Los orígenes de la Lotería Nacional se remontan al 24 de octubre de 1882, cuando el sacerdote dominicano Francisco Xavier Billini fundó "La Lotería del Padre Billini", un juego de billetes de cuatro números llamados "cuartitos" cuya finalidad era financiar las obras de caridad que él mismo había creado. Tras la muerte del Padre Billini en 1890, la lotería continuó y eventualmente se convirtió en la primera institución del Estado dominicano dedicada a los juegos de azar.',
    descripcion: 'Es la lotería tradicional dominicana por excelencia. Sus sorteos se transmiten en vivo por CERTV Canal 4 y son los más seguidos del país. Opera bajo regulación del Ministerio de Hacienda y sus ganancias se destinan parcialmente a obras sociales.',
    sorteos: ['Quiniela Nacional (Tarde y Noche)', 'Gana Más', 'Juega + Pega +', 'Billetes de los Domingos', 'Sorteo Extraordinario de Navidad'],
    webOficial: 'https://loterianacional.gob.do'
  },
  {
    nombre: 'Leidsa',
    subtitulo: 'La Fábrica de Millonarios',
    fundacion: '1997',
    sede: 'Santo Domingo',
    tipo: 'Lotería electrónica privada',
    color: 'border-yellow-500',
    colorBadge: 'bg-yellow-100 text-yellow-800',
    historia: 'LEIDSA (Lotería Electrónica Internacional Dominicana S.A.) fue fundada el 1 de noviembre de 1997, revolucionando el mercado de las loterías dominicanas al introducir la tecnología electrónica en tiempo real. Es la primera lotería electrónica del país y se ganó el apelativo de "La Fábrica de Millonarios" por los grandes premios que ha entregado.',
    descripcion: 'Ofrece la mayor variedad de sorteos del país, desde la tradicional Quiniela Palé hasta juegos tipo Loto con jackpots millonarios. Pionera en innovaciones como Super Kino TV y Pega 3 Más. Organiza sorteos especiales en fechas clave como el famoso "100×100 de Navidad" donde rifa 100 carros.',
    sorteos: ['Quiniela Leidsa', 'Loto', 'Loto Pool', 'Super Kino TV', 'Pega 3 Más', 'Super Palé'],
    webOficial: 'https://www.leidsa.com'
  },
  {
    nombre: 'Lotería Real',
    subtitulo: 'La lotería de Santiago',
    fundacion: '1995',
    sede: 'Av. Estrella Sadhalá, Santiago',
    tipo: 'Lotería electrónica privada',
    color: 'border-blue-500',
    colorBadge: 'bg-blue-100 text-blue-800',
    historia: 'Lotería Real es una empresa dominicana con sede en Santiago de los Caballeros, dedicada a los juegos de azar electrónicos desde hace más de 30 años. Con oficina principal en el edificio Haché, se ha consolidado como una de las principales competidoras de Leidsa y Loteka en el mercado nacional.',
    descripcion: 'Conocida por sus sorteos diarios al mediodía, su Quiniela Real (12:55 PM) es una de las más seguidas en la tarde. Transmite en vivo por Tele Universo Canal 29 y CERTV Canal 4, además de múltiples emisoras radiales. La transparencia es su valor principal declarado.',
    sorteos: ['Quiniela Real', 'Loto Real', 'Loto Pool Real', 'Pega 4 Real', 'Tu Fecha Real', 'Nueva Yol Real'],
    webOficial: 'https://lotoreal.com.do'
  },
  {
    nombre: 'Loteka',
    subtitulo: 'Premio mayor de RD$50M',
    fundacion: '1997',
    sede: 'Plaza Lope de Vega, Naco',
    tipo: 'Lotería electrónica privada',
    color: 'border-cyan-500',
    colorBadge: 'bg-cyan-100 text-cyan-800',
    historia: 'Loteka es una empresa dominicana de juegos de azar con licencia de la Lotería Nacional, que opera con la tecnología de INTRALOT, uno de los principales proveedores globales de sistemas de lotería. Su oficina principal está en la Plaza Lope de Vega, Naco.',
    descripcion: 'Famosa por ofrecer uno de los premios más grandes del país con el Mega Chances: RD$50,000,000 más una Tahoe del año para quien pegue los 5 números. Su jugador más fiel conoce también el Mega Lotto (lunes y jueves), con jackpots que arrancan en RD$30 millones y se acumulan.',
    sorteos: ['Quiniela Loteka', 'Mega Chances', 'Mega Lotto', 'Toca 3', 'El Extra', 'MC Repartidera'],
    webOficial: 'https://loteka.com.do'
  },
  {
    nombre: 'La Primera',
    subtitulo: 'Moderna y digital',
    fundacion: '2019',
    sede: 'Santo Domingo',
    tipo: 'Lotería electrónica privada',
    color: 'border-orange-500',
    colorBadge: 'bg-orange-100 text-orange-800',
    historia: 'La Primera es una empresa de loterías electrónicas dominicana fundada en 2019, siendo una de las más recientes en el mercado. Su enfoque moderno y digital le ha permitido ganar cuota de mercado rápidamente.',
    descripcion: 'Ofrece sorteos dos veces al día (mediodía y noche) con modalidades de quiniela, palé y tripleta. Su sorteo estrella es Loto 5 y su Quinielón Día/Noche, que ofrecen premios más grandes que la quiniela tradicional.',
    sorteos: ['Quiniela La Primera (Día y Noche)', 'El Quinielón (Día y Noche)', 'Loto 5', 'Loto 5 Más'],
    webOficial: 'https://laprimeralottery.com'
  },
  {
    nombre: 'LoteDom',
    subtitulo: 'Pionera en juegos en línea',
    fundacion: '2014',
    sede: 'Santo Domingo',
    tipo: 'Lotería electrónica privada',
    color: 'border-purple-500',
    colorBadge: 'bg-purple-100 text-purple-800',
    historia: 'LoteDom fue certificada legalmente en República Dominicana en 2014. Es reconocida por ser la primera lotería dominicana importante en ofrecer juegos en línea, lo que le dio una ventaja competitiva frente a las loterías tradicionales.',
    descripcion: 'Famosa por su transparencia y rapidez en los pagos. Certificada por la Oficina Nacional de la Propiedad Industrial. Su sorteo El Quemaito Mayor es único en el mercado, junto con el Agarra 4.',
    sorteos: ['Quiniela LoteDom', 'El Quemaito Mayor', 'Agarra 4', 'LoteDom Super Palé'],
    webOficial: 'https://lotedom.com'
  },
  {
    nombre: 'La Suerte Dominicana',
    subtitulo: 'Sorteos manuales certificados',
    fundacion: '2020',
    sede: 'Santiago de los Caballeros',
    tipo: 'Lotería privada',
    color: 'border-pink-500',
    colorBadge: 'bg-pink-100 text-pink-800',
    historia: 'La Suerte Dominicana es una empresa de juegos de azar fundada en 2020, una de las más recientes del mercado. A diferencia de otras compañías, sus sorteos son realizados de forma manual.',
    descripcion: 'Sus sorteos son verificados y certificados por el Ministerio de Hacienda, la Lotería Nacional, auditores externos y notarios públicos. Ofrece quiniela, palé y tripleta dos veces al día (12:30 PM y 6:00 PM).',
    sorteos: ['Quiniela La Suerte (Día y Noche)'],
    webOficial: 'https://lasuertedominicana.com'
  }
]

// Array con loterías extranjeras que el sitio también publica
// Separadas porque no son dominicanas pero son consumidas en RD
const loteriasExtranjeras = [
  {
    nombre: 'Anguila Lottery',
    origen: 'Isla de Anguila (Caribe)',
    descripcion: 'Lotería muy popular en la comunidad dominicana. Tiene múltiples sorteos durante el día, siendo los más conocidos Anguila Mañana, Medio Día, Tarde y Noche. También ofrece La Cuarteta que sortea 4 números.',
    sorteos: 'Hasta 15 sorteos diarios (desde 8 AM hasta 10 PM)',
    color: 'border-indigo-500'
  },
  {
    nombre: 'King Lottery',
    origen: 'Saint Martin (SXM)',
    descripcion: 'Lotería caribeña que ha ganado popularidad en República Dominicana. Tiene sorteos de día y noche que son seguidos principalmente en las zonas urbanas.',
    sorteos: 'King Lottery Día y Noche',
    color: 'border-red-500'
  },
  {
    nombre: 'Loterías Americanas',
    origen: 'Estados Unidos',
    descripcion: 'Incluye los sorteos de Florida Lottery y New York Lottery (Take 5, Numbers, Win 4), además de los gigantes PowerBall y Mega Millions. NO se venden en RD, pero publicamos resultados para la diáspora dominicana en EE.UU.',
    sorteos: 'Florida Día/Noche, NY Tarde/Noche, PowerBall, Mega Millions',
    color: 'border-blue-600'
  }
]

// FAQ con 5 preguntas frecuentes sobre las loterías
const preguntasFrecuentes = [
  {
    pregunta: '¿Cuál es la lotería más antigua de República Dominicana?',
    respuesta: 'La Lotería Nacional, fundada el 24 de octubre de 1882 por el sacerdote Francisco Xavier Billini. Es la primera institución del Estado dominicano dedicada a los juegos de azar y sigue operando hoy en día.'
  },
  {
    pregunta: '¿Cuál es la lotería con los premios más grandes?',
    respuesta: 'Loteka tiene el premio fijo más grande con Mega Chances (RD$50 millones + una Tahoe). Sin embargo, los jackpots acumulados del Loto de Leidsa y el Mega Lotto de Loteka pueden superar estos montos cuando pasan semanas sin ganador.'
  },
  {
    pregunta: '¿Todas las loterías están reguladas?',
    respuesta: 'Sí, todas las loterías que operan legalmente en República Dominicana están reguladas por la Ley 29-06 sobre Juegos de Azar y supervisadas por la Dirección General de Casinos y Juegos de Azar del Ministerio de Hacienda.'
  },
  {
    pregunta: '¿Dónde puedo verificar los resultados oficiales?',
    respuesta: 'Cada lotería tiene su sitio web oficial (enlazado arriba en cada sección). En QuinielaRD recopilamos los números de fuentes verificadas y los publicamos apenas salen, pero para premios importantes siempre recomendamos verificar con la página oficial de la compañía o directamente en la banca.'
  },
  {
    pregunta: '¿Qué diferencia hay entre las loterías públicas y privadas?',
    respuesta: 'La Lotería Nacional es la única institución del Estado; el resto (Leidsa, Real, Loteka, La Primera, LoteDom, La Suerte) son empresas privadas que operan bajo licencia y supervisión del Estado. Ambas modalidades están legalmente reguladas y pagan impuestos.'
  }
]

const Loterias = () => (
  <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in-up">
    {/* Metadatos SEO para Google y redes sociales */}
    <SEO
      title="Loterías Dominicanas: Historia y Compañías del País | QuinielaRD"
      description="Directorio completo de las loterías dominicanas: Nacional, Leidsa, Loto Real, Loteka, La Primera, LoteDom, La Suerte. Historia, sorteos, sedes y enlaces oficiales de cada compañía."
      canonical="https://quinielard.com/loterias"
    />
    <FAQSchema faqs={preguntasFrecuentes} />

    {/* Header con enlace de regreso y título principal */}
    <div>
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline mb-4">
        ← Volver al inicio
      </Link>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
        Loterías Dominicanas: Historia, Sorteos y Compañías del País
      </h1>
    </div>

    {/* Sección de introducción */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6">
      <p className="text-sm text-gray-700 leading-relaxed">
        En República Dominicana las loterías son más que un juego: son parte de la cultura popular y una tradición que se remonta a más de 140 años. Desde la <strong>Lotería Nacional</strong> fundada en 1882 hasta las modernas loterías electrónicas como <strong>Leidsa, Loteka y La Primera</strong>, cada compañía tiene su historia, sus sorteos emblemáticos y sus seguidores fieles.
      </p>
      <p className="text-sm text-gray-700 leading-relaxed mt-3">
        En <strong>QuinielaRD</strong> publicamos los resultados de todas las loterías dominicanas y también de las extranjeras que más consumen los dominicanos (Anguila, King Lottery y las americanas). Aquí te contamos la historia de cada una, sus sorteos principales y cómo contactarlas directamente.
      </p>
    </section>

    {/* Sección: Qué son las loterías dominicanas */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-3">
      <h2 className="text-xl font-bold text-gray-900">¿Qué son las Loterías Dominicanas?</h2>
      <p className="text-sm text-gray-700 leading-relaxed">
        Las loterías dominicanas son empresas (públicas y privadas) autorizadas por el Estado para operar juegos de azar. Todas están reguladas por la <strong>Ley 29-06 sobre Juegos de Azar</strong> y supervisadas por el Ministerio de Hacienda a través de la Dirección General de Casinos y Juegos de Azar.
      </p>
      <p className="text-sm text-gray-700 leading-relaxed">
        El mercado se divide en dos tipos: la <strong>Lotería Nacional</strong>, que es la única institución del Estado dedicada a los juegos de azar; y las <strong>loterías electrónicas privadas</strong> que operan bajo licencia (Leidsa, Loto Real, Loteka, La Primera, LoteDom y La Suerte Dominicana). Cada compañía tiene sus propios sorteos, horarios y modalidades de juego.
      </p>
    </section>

    {/* Renderiza una sección completa por cada lotería dominicana */}
    {loterias.map((lot) => (
      <section key={lot.nombre} className={`rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-4 border-l-4 ${lot.color}`}>
        {/* Header de la lotería con nombre y badges de info */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">{lot.nombre}</h2>
          <p className="text-sm text-gray-500 italic">{lot.subtitulo}</p>
        </div>
        {/* Badges con info clave: año, sede, tipo */}
        <div className="flex flex-wrap gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${lot.colorBadge}`}>
            📅 Fundada en {lot.fundacion}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${lot.colorBadge}`}>
            📍 {lot.sede}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${lot.colorBadge}`}>
            🏢 {lot.tipo}
          </span>
        </div>
        {/* Historia de la lotería */}
        <div>
          <h3 className="font-bold text-gray-900 text-sm mb-1.5">Historia</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{lot.historia}</p>
        </div>
        {/* Descripción actual y particularidades */}
        <div>
          <h3 className="font-bold text-gray-900 text-sm mb-1.5">¿Qué ofrece hoy?</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{lot.descripcion}</p>
        </div>
        {/* Lista de sorteos que ofrece la compañía */}
        <div>
          <h3 className="font-bold text-gray-900 text-sm mb-1.5">Sorteos principales</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {lot.sorteos.map((sorteo, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>{sorteo}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Enlace al sitio web oficial con rel noopener para seguridad */}
        <div className="pt-2 border-t border-gray-100">
          <a
            href={lot.webOficial}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            🔗 Visitar sitio oficial: {lot.webOficial.replace('https://', '')}
          </a>
        </div>
      </section>
    ))}

    {/* Sección: Loterías extranjeras */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Loterías Extranjeras que Publicamos</h2>
      {/* Aviso sobre las loterías extranjeras */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
        <p className="text-xs text-gray-800 leading-relaxed">
          Además de las loterías dominicanas, publicamos resultados de loterías extranjeras muy consumidas por la comunidad dominicana. Algunas se juegan en RD (Anguila, King Lottery) y otras solo en el exterior (Americanas) pero las seguimos para la diáspora.
        </p>
      </div>
      <div className="space-y-3">
        {/* Renderiza cada lotería extranjera con su color */}
        {loteriasExtranjeras.map((lot) => (
          <div key={lot.nombre} className={`bg-gray-50 rounded-xl p-4 border-l-4 ${lot.color}`}>
            <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
              <h3 className="font-bold text-gray-900 text-sm">{lot.nombre}</h3>
              <span className="text-xs text-gray-600 font-medium">{lot.origen}</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed mb-2">{lot.descripcion}</p>
            <p className="text-xs text-gray-600"><strong>Sorteos:</strong> {lot.sorteos}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Sección: Preguntas Frecuentes */}
    <section className="rounded-2xl border border-gray-200 shadow-card bg-white p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Preguntas Frecuentes sobre las Loterías</h2>
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
        En <strong>QuinielaRD</strong> recopilamos los resultados de todas estas loterías en un solo lugar. Ya sea que juegues Lotería Nacional, Leidsa, Real, Loteka, La Primera, LoteDom o alguna extranjera, aquí encontrarás los números ganadores actualizados en tiempo real.
      </p>
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
        Ver resultados de hoy →
      </Link>
    </section>
  </main>
)

export default Loterias
