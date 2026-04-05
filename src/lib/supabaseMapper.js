/**
 * supabaseMapper.js
 *
 * LÓGICA DE COLORES (Quinielas de Hoy):
 *   1. fecha = HOY → VERDE "hoy"
 *   2. fecha < HOY → ÁMBAR "pendiente" (siempre, no existe "anterior")
 *
 * LÓGICA DE COLORES (Historial / SorteoDetail):
 *   - fecha = HOY → VERDE
 *   - cualquier otra fecha → GRIS
 */

// ── Empresa → metadata visual ────────────────────────────────────────────────
const LOTERIA_META = {
  'Nacional':      { id: 'nacional',  color: '#2d7a27', siglas: 'LN', orden: 1 },
  'Leidsa':        { id: 'leidsa',    color: '#f5b800', siglas: 'LE', orden: 2 },
  'Real':          { id: 'real',      color: '#1a3a8f', siglas: 'LR', orden: 3 },
  'Loteka':        { id: 'loteka',    color: '#00aeef', siglas: 'LT', orden: 4 },
  'La Primera':    { id: 'primera',   color: '#e41e25', siglas: 'LP', orden: 5 },
  'La Suerte':     { id: 'suerte',    color: '#1a3a8f', siglas: 'LS', orden: 6 },
  'Lotedom':       { id: 'lotedom',   color: '#0033cc', siglas: 'LD', orden: 7 },
  'Americanas':    { id: 'ny',        color: '#1a1a2e', siglas: 'NY', orden: 8 },
  'King Lottery':  { id: 'king',      color: '#c9a84c', siglas: 'KL', orden: 9 },
  'Anguila':       { id: 'anguila',   color: '#f47920', siglas: 'AN', orden: 10 },
}

const NOMBRE_DISPLAY = {
  'Nacional': 'Lotería Nacional',
  'Leidsa': 'Leidsa',
  'Real': 'Lotería Real',
  'Loteka': 'Loteka',
  'La Primera': 'La Primera',
  'La Suerte': 'La Suerte',
  'Lotedom': 'LoteDom',
  'Anguila': 'Anguila Lottery',
  'King Lottery': 'King Lottery',
}

// ── Los 20 sorteos de quiniela en orden EXACTO ───────────────────────────────
export const QUINIELAS_ORDEN = [
  ['Nacional',     'Quiniela Lotería Nacional Tarde'],
  ['Nacional',     'Quiniela Lotería Nacional Noche'],
  ['Leidsa',       'Quiniela Leidsa'],
  ['Real',         'Quiniela Real'],
  ['Loteka',       'Quiniela Loteka'],
  ['La Primera',   'Quiniela La Primera Día'],
  ['La Primera',   'Quiniela La Primera Noche'],
  ['La Suerte',    'Quiniela La Suerte 12:30 PM'],
  ['La Suerte',    'Quiniela La Suerte 6:00 PM'],
  ['Lotedom',      'Quiniela LoteDom'],
  ['Americanas',   'Quiniela New York Tarde'],
  ['Americanas',   'Quiniela New York Noche'],
  ['Americanas',   'Quiniela Florida Tarde'],
  ['Americanas',   'Quiniela Florida Noche'],
  ['King Lottery', 'Quiniela King Lottery Día'],
  ['King Lottery', 'Quiniela King Lottery Noche'],
  ['Anguila',      'Quiniela Anguila 10:00 AM'],
  ['Anguila',      'Quiniela Anguila 1:00 PM'],
  ['Anguila',      'Quiniela Anguila 6:00 PM'],
  ['Anguila',      'Quiniela Anguila 9:00 PM'],
]

// ── TODOS los sorteos (20 quinielas + 13 lotos/extras) en orden ─────────────
export const TODOS_SORTEOS_ORDEN = [
  // Nacional
  ['Nacional',     'Quiniela Lotería Nacional Tarde'],
  ['Nacional',     'Quiniela Lotería Nacional Noche'],
  ['Nacional',     'Juega + Pega +'],
  // Leidsa
  ['Leidsa',       'Quiniela Leidsa'],
  ['Leidsa',       'Loto Leidsa'],
  ['Leidsa',       'Loto Pool Leidsa'],
  ['Leidsa',       'Pega 3 Más'],
  ['Leidsa',       'Kino Leidsa'],
  // Real
  ['Real',         'Quiniela Real'],
  ['Real',         'Loto Real'],
  ['Real',         'Loto Pool Real'],
  // Loteka
  ['Loteka',       'Quiniela Loteka'],
  ['Loteka',       'Mega Chance'],
  ['Loteka',       'Loto Loteka'],
  // La Primera
  ['La Primera',   'Quiniela La Primera Día'],
  ['La Primera',   'Quiniela La Primera Noche'],
  ['La Primera',   'Loto 5+ La Primera'],
  // La Suerte
  ['La Suerte',    'Quiniela La Suerte 12:30 PM'],
  ['La Suerte',    'Quiniela La Suerte 6:00 PM'],
  // LoteDom
  ['Lotedom',      'Quiniela LoteDom'],
  ['Lotedom',      'El Quemaíto Mayor'],
  // Americanas
  ['Americanas',   'Quiniela New York Tarde'],
  ['Americanas',   'Quiniela New York Noche'],
  ['Americanas',   'Mega Millions'],
  ['Americanas',   'Quiniela Florida Tarde'],
  ['Americanas',   'Quiniela Florida Noche'],
  ['Americanas',   'Powerball'],
  ['Americanas',   'Cash 4 Life'],
  // King Lottery
  ['King Lottery', 'Quiniela King Lottery Día'],
  ['King Lottery', 'Quiniela King Lottery Noche'],
  // Anguila
  ['Anguila',      'Quiniela Anguila 10:00 AM'],
  ['Anguila',      'Quiniela Anguila 1:00 PM'],
  ['Anguila',      'Quiniela Anguila 6:00 PM'],
  ['Anguila',      'Quiniela Anguila 9:00 PM'],
]

// ── Hora del sorteo ──────────────────────────────────────────────────────────
const HORA_MAP = {
  'quiniela lotería nacional tarde': '2:30 PM',
  'quiniela lotería nacional noche': '9:00 PM',
  'quiniela leidsa': '8:55 PM',
  'pega 3 más': '8:55 PM',
  'loto pool leidsa': '8:55 PM',
  'kino leidsa': '8:55 PM',
  'loto leidsa': '8:55 PM',
  'quiniela real': '12:55 PM',
  'loto pool real': '12:55 PM',
  'loto real': '12:55 PM',
  'quiniela loteka': '7:55 PM',
  'mega chance': '7:55 PM',
  'loto loteka': '7:55 PM',
  'quiniela la primera día': '12:00 PM',
  'quiniela la primera noche': '7:00 PM',
  'loto 5+ la primera': '7:00 PM',
  'quiniela la suerte 12:30 pm': '12:30 PM',
  'quiniela la suerte 6:00 pm': '6:00 PM',
  'quiniela lotedom': '1:00 PM',
  'el quemaíto mayor': '1:00 PM',
  'quiniela new york tarde': '2:30 PM',
  'quiniela new york noche': '10:30 PM',
  'quiniela florida día': '1:00 PM',
  'quiniela florida tarde': '1:30 PM',
  'quiniela florida noche': '9:45 PM',
  'mega millions': '11:00 PM',
  'powerball': '10:59 PM',
  'cash 4 life': '9:00 PM',
  'quiniela king lottery día': '10:30 AM',
  'quiniela king lottery noche': '9:00 PM',
  'quiniela anguila 10:00 am': '10:00 AM',
  'quiniela anguila 1:00 pm': '1:00 PM',
  'quiniela anguila 6:00 pm': '6:00 PM',
  'quiniela anguila 9:00 pm': '9:00 PM',
  'juega + pega +': '2:30 PM',
}

function detectHora(sorteo) {
  const mapped = HORA_MAP[sorteo.toLowerCase()]
  if (mapped) return mapped
  const match = sorteo.match(/(\d{1,2}:\d{2}\s*[APap][Mm])/i)
  if (match) return match[1].toUpperCase()
  return ''
}

// ── Convertir "12:30 PM" → minutos desde medianoche ─────────────────────────
export function horaAMin(h) {
  if (!h) return 0
  const parts = h.split(' ')
  if (parts.length < 2) return 0
  const [time, p] = parts
  let [hr, min] = time.split(':').map(Number)
  if (isNaN(hr) || isNaN(min)) return 0
  if (p === 'PM' && hr !== 12) hr += 12
  if (p === 'AM' && hr === 12) hr = 0
  return hr * 60 + min
}

// ── Fecha de hoy en zona RD (yyyy-mm-dd) ─────────────────────────────────────
export function hoyRD() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Santo_Domingo' })
}

// ── Hora actual en minutos (zona RD = UTC-4) ────────────────────────────────
export function horaActualMin() {
  const now = new Date()
  // Convertir a hora RD (Atlantic Standard Time, UTC-4)
  const rdOffset = -4 * 60 // minutos
  const utcMin = now.getUTCHours() * 60 + now.getUTCMinutes()
  let rdMin = utcMin + rdOffset
  if (rdMin < 0) rdMin += 1440
  return rdMin
}

// ── Detectores auxiliares ────────────────────────────────────────────────────
function detectTipo(sorteo, numeros) {
  const s = sorteo.toLowerCase()
  if (s.includes('quiniela'))           return 'quiniela'
  if (s.includes('pega 3'))             return 'pega3'
  if (s.includes('juega') || s.includes('pega +')) return 'jugamas'
  if (s.includes('kino'))               return 'kino'
  // "loto pool" ANTES de "loto leidsa" (ambos contienen "loto" + "leidsa")
  if (s.includes('loto pool'))          return 'lotopool'
  if (s.includes('loto') && s.includes('leidsa'))  return 'loto-leidsa'
  if (s.includes('loto') && s.includes('loteka'))  return 'loto-loteka'
  if (s.includes('loto') && s.includes('real') && !s.includes('pool'))   return 'loto-real'
  if (s.includes('loto 5'))             return 'loto5plus'
  if (s.includes('mega chance'))        return 'megachance'
  if (s.includes('quemaíto') || s.includes('quemaito')) return 'quemaito'
  if (s.includes('mega millions'))      return 'megamillions'
  if (s.includes('powerball'))          return 'powerball'
  if (s.includes('cash 4 life'))       return 'cash4life'
  if (numeros && numeros.length === 3)  return 'quiniela'
  return 'quiniela'
}

function detectSuborden(sorteo) {
  const s = sorteo.toLowerCase()
  // Americanas
  if (s.includes('new york'))      return 1
  if (s.includes('florida'))       return 2
  if (s.includes('mega millions')) return 3
  if (s.includes('powerball'))     return 4
  if (s.includes('cash 4 life'))   return 5
  // Leidsa: Quiniela → Loto → Loto Pool → Pega 3 → Kino
  if (s.includes('quiniela') && s.includes('leidsa'))   return 1
  if (s.includes('loto') && s.includes('leidsa') && !s.includes('pool')) return 2
  if (s.includes('loto pool') && s.includes('leidsa'))  return 3
  if (s.includes('pega 3'))        return 4
  if (s.includes('kino'))          return 5
  return 0
}

function detectCardNombre(sorteo) {
  const s = sorteo.toLowerCase()
  if (s.includes('mega millions'))  return 'Mega Millions'
  if (s.includes('powerball'))      return 'Powerball'
  if (s.includes('cash 4 life'))   return 'Cash 4 Life'
  return null
}

function detectLoteriaId(loteria, sorteo) {
  if (loteria === 'Americanas') {
    const s = sorteo.toLowerCase()
    if (s.includes('florida') || s.includes('powerball') || s.includes('cash 4 life')) return 'florida'
    return 'ny'
  }
  return LOTERIA_META[loteria]?.id ?? loteria.toLowerCase()
}

// ── Determinar estado: 'hoy' | 'pendiente' | 'historico' ─────────────────────
//   'hoy'       → fecha resultado = HOY (verde)
//   'pendiente' → consultando hoy/futuro pero sin resultado aún (ámbar)
//   'historico' → consultando fecha pasada con resultado (gris, sin badge)
function determinarEstado(fecha, horaSorteo, hoyStr, nowMin, fechaConsulta) {
  if (fecha === hoyStr) return 'hoy'
  // If user is viewing a past date and the record has data, it's historical
  if (fechaConsulta && fechaConsulta < hoyStr) return 'historico'
  return 'pendiente'
}

// ── Mapper principal ─────────────────────────────────────────────────────────
export function mapSupabaseRow(row, hoyStr, nowMin, fechaConsulta) {
  const meta = LOTERIA_META[row.loteria] ?? {
    id: row.loteria.toLowerCase(), color: '#6b7280', siglas: '??', orden: 99,
  }

  const numeros = row.numeros_principales ?? []
  const extras  = (row.numeros_extras && row.numeros_extras.length > 0) ? row.numeros_extras : null
  const mult    = (row.multiplicador && row.multiplicador !== 'null') ? row.multiplicador : null

  const tipo       = detectTipo(row.sorteo, numeros)
  const loteriaId  = detectLoteriaId(row.loteria, row.sorteo)
  const horaSorteo = detectHora(row.sorteo)
  const estado     = determinarEstado(row.fecha, horaSorteo, hoyStr, nowMin, fechaConsulta)

  // NY y Florida son loterías separadas con nombre/color propio
  let color  = meta.color
  let siglas = meta.siglas
  let displayNombre = row.loteria
  if (loteriaId === 'florida') {
    color = '#f47920'; siglas = 'FL'
    displayNombre = 'Florida'
  } else if (loteriaId === 'ny') {
    color = '#1a1a2e'; siglas = 'NY'
    displayNombre = 'New York'
  } else {
    displayNombre = NOMBRE_DISPLAY[row.loteria] ?? row.loteria
  }

  return {
    id:              row.stable_key || row.id,
    loteria_id:      loteriaId,
    loteria_nombre:  displayNombre,
    card_nombre:     detectCardNombre(row.sorteo),
    loteria_color:   color,
    loteria_siglas:  siglas,
    loteria_orden:   meta.orden,
    loteria_suborden: detectSuborden(row.sorteo),
    sorteo:          row.sorteo,
    hora:            horaSorteo,
    fecha:           row.fecha,
    tipo,
    estado,
    fechaNumeros:    row.fecha,
    numeros,
    numerosExtra:    extras,
    multiplicador:   mult,
    // Supabase extra
    _loteria_raw:    row.loteria, // para queries en SorteoDetail
    estado_validacion: row.estado_validacion,
    coincidencias:     row.coincidencias,
    fuentes_total:     row.fuentes_total,
  }
}

export function mapSupabaseResults(rows, hoyStr, nowMin) {
  return rows.map(row => mapSupabaseRow(row, hoyStr, nowMin))
}
