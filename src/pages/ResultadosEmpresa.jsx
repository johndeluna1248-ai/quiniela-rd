/**
 * ResultadosEmpresa.jsx
 * Página SEO dedicada por lotería: /resultados/leidsa, /resultados/nacional, etc.
 * Genera URLs limpias e indexables para cada empresa de lotería dominicana.
 */
import { useState, useEffect, useMemo } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import FAQSchema from '../components/FAQSchema'
import SEO from '../components/SEO'
import ResultsGrid from '../components/ResultsGrid'
import { fetchTodosSorteos } from '../lib/fetchQuinielas'
import { hoyRD } from '../lib/supabaseMapper'
import { EMPRESA_INFO } from '../data/loteriasInfo'

// Configuración SEO y datos por empresa
const EMPRESA_CONFIG = {
  nacional: {
    loteria_id: 'nacional',
    empresaInfoKey: 'nacional',
    titulo: 'Lotería Nacional',
    subtitulo: 'La más antigua de la República Dominicana',
    tituloSEO: 'Quiniela Nacional de Hoy — Resultados en Tiempo Real | QuinielaRD',
    descripcionSEO: 'Resultados de la Lotería Nacional de hoy: Quiniela Tarde (2:30 PM), Quiniela Noche (9:00 PM) y Juega + Pega +. Actualizado al instante tras cada sorteo oficial.',
    keywords: 'quiniela nacional hoy, resultados lotería nacional, números nacional hoy, quiniela nacional tarde, quiniela nacional noche, loto nacional resultados',
    faqs: [
      { pregunta: '¿A qué hora sale la quiniela de la Lotería Nacional?', respuesta: 'La Quiniela Nacional tiene dos sorteos diarios (lunes a sábado): la Tarde a las 2:30 PM y la Noche a las 9:00 PM. Los domingos el sorteo nocturno se adelanta a las 6:00 PM. Los resultados aparecen en QuinielaRD pocos minutos después de cada sorteo.' },
      { pregunta: '¿Por qué canal se transmite la Lotería Nacional?', respuesta: 'La Lotería Nacional transmite sus sorteos en vivo por CERTV Canal 4, la televisora del Estado dominicano. También se puede seguir en sus redes sociales oficiales en Facebook e Instagram (@loteriardo).' },
      { pregunta: '¿Cuánto paga la quiniela de la Lotería Nacional?', respuesta: 'La Quiniela Nacional paga RD$60 por cada peso apostado si aciertas el primer número, RD$8 por el segundo y RD$4 por el tercero. El palé paga aproximadamente RD$1,000 por peso y la tripleta hasta RD$20,000.' },
      { pregunta: '¿Qué es el Juega + Pega + de la Lotería Nacional?', respuesta: 'El Juega + Pega + es un sorteo especial de la Lotería Nacional con pozo acumulado. Funciona de manera similar a la quiniela pero con un premio mayor que va creciendo hasta que haya ganador. Se sortea dos veces al día (tarde y noche, lunes a sábado).' },
      { pregunta: '¿Cuándo fue fundada la Lotería Nacional?', respuesta: 'La Lotería Nacional fue fundada el 24 de octubre de 1882 por el sacerdote Francisco Xavier Billini. Es la institución de lotería más antigua de la República Dominicana y opera bajo regulación del Ministerio de Hacienda.' }
    ]
  },
  leidsa: {
    loteria_id: 'leidsa',
    empresaInfoKey: 'leidsa',
    titulo: 'Leidsa',
    subtitulo: 'La Fábrica de Millonarios',
    tituloSEO: 'Quiniela Leidsa de Hoy — Resultados en Tiempo Real | QuinielaRD',
    descripcionSEO: 'Resultados de Leidsa de hoy: Quiniela (8:55 PM lun-sáb | 3:55 PM dom), Loto, Pega 3 Más, Super Kino TV y más. Actualizado al instante.',
    keywords: 'quiniela leidsa hoy, resultados leidsa hoy, números leidsa hoy, loto leidsa, super kino tv, pega 3 mas, leidsa resultados',
    faqs: [
      { pregunta: '¿A qué hora sale la quiniela de Leidsa?', respuesta: 'La Quiniela Leidsa sale de lunes a sábado a las 8:55 PM y los domingos a las 3:55 PM. Es uno de los sorteos nocturnos más esperados de la República Dominicana.' },
      { pregunta: '¿Qué juegos ofrece Leidsa?', respuesta: 'Leidsa ofrece: Quiniela, Loto (sorteo acumulativo con jackpot desde RD$25 millones), Loto Pool, Pega 3 Más, y Super Kino TV. El Loto se juega miércoles y sábados; el resto sale de lunes a sábado.' },
      { pregunta: '¿Qué es el Super Kino TV de Leidsa?', respuesta: 'El Super Kino TV es un sorteo estilo keno donde se extraen 20 bolas de 80. El jugador elige 10 números. Acertar los 10 paga RD$25,000,000. Otros premios: 9 aciertos RD$150,000; 8 aciertos RD$10,000; 7 aciertos RD$1,000.' },
      { pregunta: '¿Cuánto paga el Loto de Leidsa?', respuesta: 'El Loto de Leidsa es acumulativo: el jackpot inicia en RD$25,000,000 y sube hasta que haya ganador de 6 números. Hay modalidades especiales como Loto Más (con bola extra) que puede pagar RD$150,000,000 fijo, y Super Más con RD$250,000,000.' },
      { pregunta: '¿Dónde puedo ver los resultados de Leidsa en vivo?', respuesta: 'Los sorteos de Leidsa se transmiten en vivo por sus redes sociales (Facebook, Instagram y YouTube @leidsaloto). En QuinielaRD publicamos los resultados automaticamente tras cada sorteo oficial.' }
    ]
  },
  real: {
    loteria_id: 'real',
    empresaInfoKey: 'real',
    titulo: 'Lotería Real',
    subtitulo: 'La lotería del mediodía',
    tituloSEO: 'Quiniela Real de Hoy — Resultados en Tiempo Real | QuinielaRD',
    descripcionSEO: 'Resultados de Lotería Real de hoy: Quiniela Real (12:55 PM), Loto Real, Loto Pool Real. El sorteo del mediodía más popular del país. Actualizado al instante.',
    keywords: 'quiniela real hoy, resultados lotería real, números real hoy, quiniela real 12:55, loto real resultados, lotoreal',
    faqs: [
      { pregunta: '¿A qué hora sale la quiniela Real?', respuesta: 'La Quiniela Real sale todos los días (lunes a domingo) a las 12:55 PM. Es uno de los sorteos del mediodía más populares de la República Dominicana. Los resultados aparecen en QuinielaRD minutos después del sorteo.' },
      { pregunta: '¿Qué sorteos tiene Lotería Real?', respuesta: 'Lotería Real ofrece: Quiniela Real (diario 12:55 PM), Loto Real (martes, jueves y sábados), Loto Pool Real (diario), y sorteos especiales como Pega 4 Real y Tu Fecha Real. Todos con sede en Santiago de los Caballeros.' },
      { pregunta: '¿Por qué canal se transmite Lotería Real?', respuesta: 'Lotería Real transmite en vivo por Tele Universo Canal 29 y CERTV Canal 4, además de múltiples emisoras radiales. También puedes seguirla en sus redes sociales oficiales.' },
      { pregunta: '¿Cuánto paga la quiniela Real?', respuesta: 'La Quiniela Real paga igual que todas las quinielas dominicanas: RD$60 por cada peso al 1.° premio, RD$8 al 2.° y RD$4 al 3.°. El palé paga aproximadamente RD$1,000 y la tripleta hasta RD$20,000 por peso.' },
      { pregunta: '¿Dónde tiene la sede Lotería Real?', respuesta: 'Lotería Real tiene su sede principal en Santiago de los Caballeros, en la Av. Estrella Sadhalá #27. Es una de las principales loterías privadas del país con más de 30 años en el mercado.' }
    ]
  },
  loteka: {
    loteria_id: 'loteka',
    empresaInfoKey: 'loteka',
    titulo: 'Loteka',
    subtitulo: 'Premio mayor de RD$50M',
    tituloSEO: 'Quiniela Loteka de Hoy — Resultados en Tiempo Real | QuinielaRD',
    descripcionSEO: 'Resultados de Loteka de hoy: Quiniela Loteka (7:55 PM), MegaLotto y Mega Chance. Actualizado al instante tras el sorteo en vivo por Canal 11.',
    keywords: 'quiniela loteka hoy, resultados loteka, números loteka hoy, megalotto, mega chance loteka, loteka canal 11',
    faqs: [
      { pregunta: '¿A qué hora sale la quiniela de Loteka?', respuesta: 'La Quiniela Loteka sale de lunes a domingo a las 7:55 PM. Es uno de los sorteos nocturnos más populares, transmitido en vivo por Telesistema Canal 11.' },
      { pregunta: '¿Qué es el Mega Chance de Loteka?', respuesta: 'El Mega Chance es el juego más innovador de Loteka: tiene 5 globos separados y se extrae 1 número de cada globo (del 00 al 99). Se gana acertando cualquier combinación de 2 a 5 números sin importar el orden. El premio mayor es de RD$50,000,000 más un automóvil Tahoe.' },
      { pregunta: '¿Qué es el MegaLotto de Loteka?', respuesta: 'MegaLotto (Loto Loteka) es el sorteo acumulativo de Loteka. Se sortean 6 bolas y el premio mayor parte de RD$30 millones más el acumulado. Los sorteos son los lunes y jueves a las 7:55 PM.' },
      { pregunta: '¿Por qué canal se transmite Loteka?', respuesta: 'Loteka transmite todos sus sorteos en vivo por Telesistema Canal 11. También puedes seguirlos en sus redes sociales @lotekard en Instagram y Facebook.' },
      { pregunta: '¿Cuándo se fundó Loteka?', respuesta: 'Loteka realizó su primer sorteo oficial el 15 de septiembre de 1997. Tiene su sede en Av. Lope de Vega #59, Plaza Lope de Vega, Ensanche Naco, Santo Domingo.' }
    ]
  },
  primera: {
    loteria_id: 'primera',
    empresaInfoKey: 'laprimera',
    titulo: 'La Primera',
    subtitulo: 'Sorteos de mediodía y noche',
    tituloSEO: 'Quiniela La Primera de Hoy — Resultados en Tiempo Real | QuinielaRD',
    descripcionSEO: 'Resultados de La Primera de hoy: Quiniela Día (12:00 PM), Quiniela Noche (7:00 PM) y Loto 5+. Dos sorteos diarios. Actualizado al instante.',
    keywords: 'quiniela la primera hoy, resultados la primera, números la primera hoy, la primera dia, la primera noche, loto 5 la primera',
    faqs: [
      { pregunta: '¿A qué hora salen los números de La Primera?', respuesta: 'La Primera tiene dos sorteos diarios todos los días: La Primera Día a las 12:00 PM y La Primera Noche a las 7:00 PM. Además, el Loto 5+ se sortea en el horario nocturno.' },
      { pregunta: '¿Qué es el Loto 5+ de La Primera?', respuesta: 'El Loto 5+ es el juego acumulativo de La Primera. Se eligen 5 números del 01 al 38 más un número extra del 01 al 10. El premio mayor es acumulativo. La versión básica Loto 5 (sin el número extra) paga RD$3,000,000 por 5 aciertos.' },
      { pregunta: '¿Cuánto paga la quiniela de La Primera?', respuesta: 'La Primera paga igual que las demás quinielas dominicanas: RD$60 por cada peso al 1.° premio, RD$8 al 2.° y RD$4 al 3.°. El palé aproximadamente RD$1,000 y la tripleta hasta RD$20,000 por peso.' },
      { pregunta: '¿Cuándo fue fundada La Primera?', respuesta: 'La Primera es una empresa de lotería electrónica dominicana fundada en 2019. Se posiciona como una empresa de calidad mundial basada en solidez, seguridad y confianza.' }
    ]
  },
  suerte: {
    loteria_id: 'suerte',
    empresaInfoKey: 'lasuerte',
    titulo: 'La Suerte',
    subtitulo: 'Los sorteos de los ciegos del Cibao',
    tituloSEO: 'Quiniela La Suerte de Hoy — Resultados en Tiempo Real | QuinielaRD',
    descripcionSEO: 'Resultados de La Suerte Dominicana de hoy: Quiniela 12:30 PM y Quiniela 6:00 PM. Sorteos realizados por personas ciegas de la Asociación del Cibao.',
    keywords: 'quiniela la suerte hoy, resultados la suerte dominicana, números la suerte hoy, la suerte 12:30, la suerte 6pm, lasuertedominicana',
    faqs: [
      { pregunta: '¿A qué hora salen los números de La Suerte?', respuesta: 'La Suerte Dominicana tiene dos sorteos diarios (lunes a domingo): el primero a las 12:30 PM y el segundo a las 6:00 PM. Ambos se realizan todos los días sin excepción.' },
      { pregunta: '¿Por qué los sorteos de La Suerte los realizan personas ciegas?', respuesta: 'Los sorteos de La Suerte Dominicana son realizados por miembros de la Asociación de Ciegos del Cibao, con sede en Santiago. Esta práctica promueve la inclusión social y laboral de personas con discapacidad visual, y está certificada por el Ministerio de Hacienda.' },
      { pregunta: '¿Dónde se transmiten los sorteos de La Suerte?', respuesta: 'Los sorteos de La Suerte se transmiten en vivo por Digital 15 y Teleuniverso Canal 29. También puedes seguirla en sus redes sociales @lasuertedominicana en Instagram y Facebook.' },
      { pregunta: '¿Cuánto paga la quiniela de La Suerte?', respuesta: 'La Suerte paga igual que todas las quinielas dominicanas: RD$60 por peso al 1.° premio, RD$8 al 2.° y RD$4 al 3.°. El palé aproximadamente RD$1,000 y la tripleta hasta RD$20,000 por peso.' }
    ]
  },
  lotedom: {
    loteria_id: 'lotedom',
    empresaInfoKey: 'lotedom',
    titulo: 'LoteDom',
    subtitulo: 'Quiniela y Quemaíto Mayor',
    tituloSEO: 'Quiniela LoteDom de Hoy — Resultados en Tiempo Real | QuinielaRD',
    descripcionSEO: 'Resultados de LoteDom de hoy: Quiniela LoteDom (1:00 PM) y El Quemaíto Mayor. Sorteo del mediodía de la red Banca O.M. Actualizado al instante.',
    keywords: 'quiniela lotedom hoy, resultados lotedom, números lotedom hoy, quemaíto mayor, lotedom 1pm, banca OM resultados',
    faqs: [
      { pregunta: '¿A qué hora sale LoteDom?', respuesta: 'LoteDom realiza su sorteo diario (lunes a domingo) a la 1:00 PM. Tanto la Quiniela LoteDom como el Quemaíto Mayor se sortean juntos en ese mismo horario.' },
      { pregunta: '¿Qué es el Quemaíto Mayor?', respuesta: 'El Quemaíto Mayor es un juego especial de LoteDom. El apostador combina un número del Quemaíto con los resultados de la Quiniela LoteDom del mismo sorteo. Paga hasta RD$3,000 por peso si el Quemaíto coincide con el 1.° premio de la quiniela.' },
      { pregunta: '¿Cuánto paga la quiniela LoteDom?', respuesta: 'La Quiniela LoteDom paga igual que las demás quinielas dominicanas: RD$60 por peso al 1.° premio, RD$8 al 2.° y RD$4 al 3.°. El Quemaíto Mayor agrega un multiplicador extra sobre esos premios.' },
      { pregunta: '¿Qué es LoteDom?', respuesta: 'LoteDom fue legalizada en 2014 por el empresario Orlando Martínez, surgida de más de 22 años liderando la red Banca O.M. Forma parte de las opciones de juego de la Lotería Nacional y tiene sede en Av. 27 de Febrero, La Julia, Santo Domingo.' }
    ]
  },
  king: {
    loteria_id: 'king',
    empresaInfoKey: 'king',
    titulo: 'King Lottery',
    subtitulo: 'Lotería del Caribe desde Sint Maarten',
    tituloSEO: 'King Lottery de Hoy — Resultados en Tiempo Real | QuinielaRD',
    descripcionSEO: 'Resultados de King Lottery de hoy: Quiniela Día (10:30 AM) y Quiniela Noche (9:00 PM). Lotería del Caribe operada desde Sint Maarten. Actualizado al instante.',
    keywords: 'king lottery hoy, resultados king lottery, números king lottery hoy, king lottery dia, king lottery noche, kinglottery resultados',
    faqs: [
      { pregunta: '¿A qué hora sale King Lottery?', respuesta: 'King Lottery tiene dos sorteos diarios (lunes a domingo): Quiniela King Lottery Día a las 10:30 AM y Quiniela King Lottery Noche a las 9:00 PM.' },
      { pregunta: '¿Qué es King Lottery?', respuesta: 'King Lottery es una lotería del Caribe operada por el empresario Freddy Fernández con más de 35 años de experiencia. Tiene sede en Sint Maarten (Front Street 156, Philipsburg) y opera con licencia oficial para juegos de lotería en la región.' },
      { pregunta: '¿Cuánto paga King Lottery?', respuesta: 'King Lottery paga igual que las quinielas dominicanas: RD$60 por peso al 1.° premio, RD$8 al 2.° y RD$4 al 3.°. El palé aproximadamente RD$1,000 y la tripleta hasta RD$20,000 por peso.' },
      { pregunta: '¿Dónde ver los resultados de King Lottery en vivo?', respuesta: 'Puedes seguir King Lottery en sus redes sociales oficiales @kinglotterysxm en Instagram y Facebook. En QuinielaRD publicamos los resultados automáticamente tras cada sorteo.' }
    ]
  },
  anguila: {
    loteria_id: 'anguila',
    empresaInfoKey: 'anguila',
    titulo: 'Anguila Lottery',
    subtitulo: 'Cuatro sorteos diarios',
    tituloSEO: 'Anguila Lottery de Hoy — Resultados en Tiempo Real | QuinielaRD',
    descripcionSEO: 'Resultados de Anguila Lottery de hoy: sorteos a las 10:00 AM, 1:00 PM, 6:00 PM y 9:00 PM. Cuatro sorteos diarios desde Anguila. Actualizado al instante.',
    keywords: 'anguila lottery hoy, resultados anguila lottery, números anguila hoy, quiniela anguila, anguila 10am, anguila 1pm, anguila 6pm, anguila 9pm',
    faqs: [
      { pregunta: '¿A qué horas salen los números de Anguila Lottery?', respuesta: 'Anguila Lottery tiene cuatro sorteos diarios (lunes a domingo): 10:00 AM, 1:00 PM, 6:00 PM y 9:00 PM. En QuinielaRD publicamos los resultados de los 4 sorteos principales.' },
      { pregunta: '¿Cuántos sorteos diarios tiene Anguila?', respuesta: 'Anguila Lottery realiza sorteos con mucha frecuencia durante el día. En QuinielaRD cubrimos los 4 principales: 10:00 AM, 1:00 PM, 6:00 PM y 9:00 PM. Para ver todos sus sorteos, visita su página oficial en anguillalottery.ai.' },
      { pregunta: '¿Qué es Anguila Lottery?', respuesta: 'Anguila Lottery es la lotería oficial del territorio británico de ultramar Anguila, operada por Madroka Lottery LTD desde 2018. Fue autorizada por el gobierno de Anguila y destina el 2% de sus ganancias netas a causas sociales como educación, iglesias y deportes.' },
      { pregunta: '¿Cuánto paga Anguila Lottery?', respuesta: 'Anguila paga igual que las quinielas dominicanas: RD$60 por peso al 1.° premio, RD$8 al 2.° y RD$4 al 3.°. El palé aproximadamente RD$1,000 y la tripleta hasta RD$20,000 por peso.' }
    ]
  }
}

// Otras empresas para el bloque de navegación
const OTRAS_EMPRESAS = [
  { id: 'nacional', label: 'Nacional' },
  { id: 'leidsa', label: 'Leidsa' },
  { id: 'real', label: 'Real' },
  { id: 'loteka', label: 'Loteka' },
  { id: 'primera', label: 'La Primera' },
  { id: 'suerte', label: 'La Suerte' },
  { id: 'lotedom', label: 'LoteDom' },
  { id: 'king', label: 'King' },
  { id: 'anguila', label: 'Anguila' },
]

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const fechaHoyRD = () => {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Santo_Domingo' }))
  return `${DIAS[now.getDay()]} ${now.getDate()} de ${MESES[now.getMonth()]}`
}

const ResultadosEmpresa = () => {
  const { empresaId } = useParams()
  const config = EMPRESA_CONFIG[empresaId]

  if (!config) return <Navigate to="/" replace />

  const [resultados, setResultados] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const empresaInfo = EMPRESA_INFO[config.empresaInfoKey]

  useEffect(() => {
    const hoyStr = hoyRD()
    fetchTodosSorteos(hoyStr, hoyStr)
      .then(data => {
        const filtrados = data.filter(r => r.loteria_id === config.loteria_id)
        setResultados(filtrados)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [empresaId, config.loteria_id])

  const tituloH1 = `${config.titulo} Hoy — ${fechaHoyRD()}`

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in-up">
      <SEO
        title={config.tituloSEO}
        description={config.descripcionSEO}
        keywords={config.keywords}
        canonical={`https://quinielard.com/resultados/${empresaId}`}
      />
      <FAQSchema faqs={config.faqs} />

      {/* Header */}
      <div>
        <Breadcrumbs items={[
          { name: 'Inicio', url: '/' },
          { name: config.titulo }
        ]} />
        <h1 className="text-2xl sm:text-3xl font-extrabold title-branded">{tituloH1}</h1>
        <p className="text-sm text-gray-500 mt-1">{config.subtitulo}</p>
      </div>

      {/* Resultados del día */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-5 rounded-full bg-primary" />
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Resultados de Hoy</h2>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-500 text-center py-6">Error al cargar resultados. Intenta recargar la página.</p>
        ) : resultados.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">No hay resultados disponibles por el momento.</p>
        ) : (
          <ResultsGrid
            resultados={resultados}
            vista="todos"
            agruparPorCompania={false}
          />
        )}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center">
          <Link to={`/?modo=todos&empresa=${config.loteria_id === 'primera' ? 'primera' : config.loteria_id === 'suerte' ? 'suerte' : config.loteria_id}`}
            className="text-sm text-primary font-medium hover:underline">
            Ver historial de fechas anteriores →
          </Link>
        </div>
      </section>

      {/* Info de la empresa */}
      {empresaInfo && (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-5 rounded-full bg-primary" />
            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Sobre {config.titulo}</h2>
          </div>
          <div className="space-y-3 text-sm text-gray-600">
            {empresaInfo.historia && (
              <p className="leading-relaxed">{empresaInfo.historia}</p>
            )}
            {empresaInfo.sorteos && empresaInfo.sorteos.length > 0 && (
              <div>
                <p className="font-semibold text-gray-700 mb-2">Sorteos y horarios:</p>
                <ul className="space-y-1.5">
                  {empresaInfo.sorteos.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span><span className="font-medium text-gray-700">{s.nombre}</span> — {s.horario}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {empresaInfo.web && (
                <a href={empresaInfo.web} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline">
                  <span>🌐</span> Sitio oficial
                </a>
              )}
              {empresaInfo.telefono && (
                <span className="flex items-center gap-2 text-gray-600">
                  <span>📞</span> {empresaInfo.telefono}
                </span>
              )}
              {empresaInfo.direccion && (
                <span className="flex items-center gap-2 text-gray-600 col-span-full">
                  <span>📍</span> {empresaInfo.direccion}
                </span>
              )}
              {(empresaInfo.facebook || empresaInfo.instagram) && (
                <div className="flex items-center gap-3 col-span-full">
                  <span>📱</span>
                  {empresaInfo.facebook && (
                    <a href={empresaInfo.facebook} target="_blank" rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xs font-medium">Facebook</a>
                  )}
                  {empresaInfo.instagram && (
                    <a href={empresaInfo.instagram} target="_blank" rel="noopener noreferrer"
                      className="text-pink-600 hover:underline text-xs font-medium">Instagram</a>
                  )}
                  {empresaInfo.youtube && (
                    <a href={empresaInfo.youtube} target="_blank" rel="noopener noreferrer"
                      className="text-red-600 hover:underline text-xs font-medium">YouTube</a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-5 rounded-full bg-primary" />
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Preguntas Frecuentes</h2>
        </div>
        <div className="space-y-3">
          {config.faqs.map((faq, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 text-sm mb-1.5">▸ {faq.pregunta}</h3>
              <p className="text-xs text-gray-700 leading-relaxed">{faq.respuesta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Navegación a otras loterías */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-5 rounded-full bg-primary" />
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Otras Loterías</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {OTRAS_EMPRESAS.filter(e => e.id !== empresaId).map(e => (
            <Link key={e.id} to={`/resultados/${e.id}`}
              className="px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors">
              {e.label}
            </Link>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link to="/" className="text-sm text-primary font-medium hover:underline">
            ← Ver todos los resultados de hoy
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ResultadosEmpresa
