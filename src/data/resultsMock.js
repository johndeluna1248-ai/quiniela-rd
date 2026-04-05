/**
 * resultsMock.js
 * Todos los sorteos con su último resultado registrado.
 * Nunca hay sorteos sin números — siempre se muestra el último disponible.
 *
 * estado: "hoy"      → resultado publicado hoy
 *         "anterior" → resultado del día anterior (hoy aún no salió)
 *
 * tipo determina cómo se renderizan las bolas en BallsDisplay:
 *   quiniela | pega3 | jugamas | kino | loto-leidsa | loto-loteka |
 *   loto-real | lotopool | loto5plus | megachance | quemaito |
 *   megamillions | powerball
 *
 * TODO: Reemplazar mock con Supabase cuando tengas anon key
 * const { data } = await supabase
 *   .from('resultados_verificados')
 *   .select('*')
 *   .eq('fecha', selectedDate)
 *   .order('hora', { ascending: true })
 */

const HOY  = "2026-03-26"
const AYER = "2026-03-25"

export const resultados = [

  // ══════════════════════════════════════════════════════════════
  // QUINIELAS — pantalla principal "Todas las Quinielas"
  // ══════════════════════════════════════════════════════════════

  // ── Lotería Nacional (orden 1) ────────────────────────────────
  {
    id: "nacional-quiniela-tarde",
    loteria_id: "nacional", loteria_nombre: "Lotería Nacional",
    loteria_color: "#2d7a27", loteria_siglas: "LN", loteria_orden: 1,
    sorteo: "Quiniela Nacional Tarde", hora: "12:30 PM", fecha: HOY,
    tipo: "quiniela", estado: "hoy", fechaNumeros: HOY,
    numeros: ["05", "73", "28"], numerosExtra: null, multiplicador: null,
  },
  {
    id: "nacional-quiniela-noche",
    loteria_id: "nacional", loteria_nombre: "Lotería Nacional",
    loteria_color: "#2d7a27", loteria_siglas: "LN", loteria_orden: 1,
    sorteo: "Quiniela Nacional Noche", hora: "8:00 PM", fecha: HOY,
    tipo: "quiniela", estado: "anterior", fechaNumeros: AYER,
    numeros: ["49", "72", "05"], numerosExtra: null, multiplicador: null,
  },

  // ── Leidsa (orden 2) ──────────────────────────────────────────
  {
    id: "leidsa-quiniela",
    loteria_id: "leidsa", loteria_nombre: "Leidsa",
    loteria_color: "#f5b800", loteria_siglas: "LE", loteria_orden: 2,
    sorteo: "Quiniela Leidsa", hora: "12:55 PM", fecha: HOY,
    tipo: "quiniela", estado: "hoy", fechaNumeros: HOY,
    numeros: ["14", "37", "02"], numerosExtra: null, multiplicador: null,
  },

  // ── Lotería Real (orden 3) ────────────────────────────────────
  {
    id: "real-quiniela",
    loteria_id: "real", loteria_nombre: "Lotería Real",
    loteria_color: "#1a3a8f", loteria_siglas: "LR", loteria_orden: 3,
    sorteo: "Quiniela Real", hora: "11:45 AM", fecha: HOY,
    tipo: "quiniela", estado: "hoy", fechaNumeros: HOY,
    numeros: ["82", "51", "09"], numerosExtra: null, multiplicador: null,
  },

  // ── Loteka (orden 4) ──────────────────────────────────────────
  {
    id: "loteka-quiniela",
    loteria_id: "loteka", loteria_nombre: "Loteka",
    loteria_color: "#00aeef", loteria_siglas: "LT", loteria_orden: 4,
    sorteo: "Quiniela Loteka", hora: "12:00 PM", fecha: HOY,
    tipo: "quiniela", estado: "anterior", fechaNumeros: AYER,
    numeros: ["44", "61", "08"], numerosExtra: null, multiplicador: null,
  },

  // ── La Primera (orden 5) ──────────────────────────────────────
  {
    id: "primera-quiniela-dia",
    loteria_id: "primera", loteria_nombre: "La Primera",
    loteria_color: "#e41e25", loteria_siglas: "LP", loteria_orden: 5,
    sorteo: "Quiniela La Primera Día", hora: "10:50 AM", fecha: HOY,
    tipo: "quiniela", estado: "hoy", fechaNumeros: HOY,
    numeros: ["47", "19", "63"], numerosExtra: null, multiplicador: null,
  },
  {
    id: "primera-quiniela-noche",
    loteria_id: "primera", loteria_nombre: "La Primera",
    loteria_color: "#e41e25", loteria_siglas: "LP", loteria_orden: 5,
    sorteo: "Quiniela La Primera Noche", hora: "6:00 PM", fecha: HOY,
    tipo: "quiniela", estado: "anterior", fechaNumeros: AYER,
    numeros: ["72", "35", "08"], numerosExtra: null, multiplicador: null,
  },

  // ── La Suerte Dominicana (orden 6) ────────────────────────────
  {
    id: "suerte-quiniela-1230",
    loteria_id: "suerte", loteria_nombre: "La Suerte Dominicana",
    loteria_color: "#1a3a8f", loteria_siglas: "LS", loteria_orden: 6,
    sorteo: "Quiniela La Suerte 12:30 PM", hora: "12:30 PM", fecha: HOY,
    tipo: "quiniela", estado: "hoy", fechaNumeros: HOY,
    numeros: ["30", "84", "11"], numerosExtra: null, multiplicador: null,
  },
  {
    id: "suerte-quiniela-600",
    loteria_id: "suerte", loteria_nombre: "La Suerte Dominicana",
    loteria_color: "#1a3a8f", loteria_siglas: "LS", loteria_orden: 6,
    sorteo: "Quiniela La Suerte 6:00 PM", hora: "6:00 PM", fecha: HOY,
    tipo: "quiniela", estado: "anterior", fechaNumeros: AYER,
    numeros: ["71", "25", "48"], numerosExtra: null, multiplicador: null,
  },

  // ── LoteDom (orden 7) ─────────────────────────────────────────
  {
    id: "lotedom-quiniela",
    loteria_id: "lotedom", loteria_nombre: "LoteDom",
    loteria_color: "#0033cc", loteria_siglas: "LD", loteria_orden: 7,
    sorteo: "Quiniela LoteDom", hora: "11:30 AM", fecha: HOY,
    tipo: "quiniela", estado: "anterior", fechaNumeros: AYER,
    numeros: ["93", "07", "56"], numerosExtra: null, multiplicador: null,
  },

  // ── New York (orden 8) ────────────────────────────────────────
  {
    id: "ny-quiniela-tarde",
    loteria_id: "ny", loteria_nombre: "New York",
    loteria_color: "#1a1a2e", loteria_siglas: "NY", loteria_orden: 8, loteria_suborden: 1,
    sorteo: "Quiniela New York Tarde", hora: "2:30 PM", fecha: HOY,
    tipo: "quiniela", estado: "hoy", fechaNumeros: HOY,
    numeros: ["16", "92", "43"], numerosExtra: null, multiplicador: null,
  },
  {
    id: "ny-quiniela-noche",
    loteria_id: "ny", loteria_nombre: "New York",
    loteria_color: "#1a1a2e", loteria_siglas: "NY", loteria_orden: 8, loteria_suborden: 1,
    sorteo: "Quiniela New York Noche", hora: "10:30 PM", fecha: HOY,
    tipo: "quiniela", estado: "anterior", fechaNumeros: AYER,
    numeros: ["64", "18", "43"], numerosExtra: null, multiplicador: null,
  },

  // ── Florida (orden 8) ─────────────────────────────────────────
  {
    id: "florida-quiniela-tarde",
    loteria_id: "florida", loteria_nombre: "Florida",
    loteria_color: "#f47920", loteria_siglas: "FL", loteria_orden: 8, loteria_suborden: 2,
    sorteo: "Quiniela Florida Tarde", hora: "1:30 PM", fecha: HOY,
    tipo: "quiniela", estado: "anterior", fechaNumeros: AYER,
    numeros: ["73", "26", "08"], numerosExtra: null, multiplicador: null,
  },
  {
    id: "florida-quiniela-noche",
    loteria_id: "florida", loteria_nombre: "Florida",
    loteria_color: "#f47920", loteria_siglas: "FL", loteria_orden: 8, loteria_suborden: 2,
    sorteo: "Quiniela Florida Noche", hora: "9:45 PM", fecha: HOY,
    tipo: "quiniela", estado: "anterior", fechaNumeros: AYER,
    numeros: ["38", "75", "12"], numerosExtra: null, multiplicador: null,
  },

  // ── King Lottery (orden 9) ────────────────────────────────────
  {
    id: "king-quiniela-dia",
    loteria_id: "king", loteria_nombre: "King Lottery",
    loteria_color: "#1a3a8f", loteria_siglas: "KL", loteria_orden: 9,
    sorteo: "Quiniela King Lottery Día", hora: "10:30 AM", fecha: HOY,
    tipo: "quiniela", estado: "hoy", fechaNumeros: HOY,
    numeros: ["25", "71", "38"], numerosExtra: null, multiplicador: null,
  },
  {
    id: "king-quiniela-noche",
    loteria_id: "king", loteria_nombre: "King Lottery",
    loteria_color: "#1a3a8f", loteria_siglas: "KL", loteria_orden: 9,
    sorteo: "Quiniela King Lottery Noche", hora: "9:00 PM", fecha: HOY,
    tipo: "quiniela", estado: "anterior", fechaNumeros: AYER,
    numeros: ["67", "34", "02"], numerosExtra: null, multiplicador: null,
  },

  // ── Anguila Lottery (orden 10) ────────────────────────────────
  {
    id: "anguila-quiniela-10am",
    loteria_id: "anguila", loteria_nombre: "Anguila Lottery",
    loteria_color: "#f47920", loteria_siglas: "AN", loteria_orden: 10,
    sorteo: "Quiniela Anguila 10:00 AM", hora: "10:00 AM", fecha: HOY,
    tipo: "quiniela", estado: "hoy", fechaNumeros: HOY,
    numeros: ["34", "78", "53"], numerosExtra: null, multiplicador: null,
  },
  {
    id: "anguila-quiniela-1pm",
    loteria_id: "anguila", loteria_nombre: "Anguila Lottery",
    loteria_color: "#f47920", loteria_siglas: "AN", loteria_orden: 10,
    sorteo: "Quiniela Anguila 1:00 PM", hora: "1:00 PM", fecha: HOY,
    tipo: "quiniela", estado: "anterior", fechaNumeros: AYER,
    numeros: ["06", "42", "89"], numerosExtra: null, multiplicador: null,
  },
  {
    id: "anguila-quiniela-6pm",
    loteria_id: "anguila", loteria_nombre: "Anguila Lottery",
    loteria_color: "#f47920", loteria_siglas: "AN", loteria_orden: 10,
    sorteo: "Quiniela Anguila 6:00 PM", hora: "6:00 PM", fecha: HOY,
    tipo: "quiniela", estado: "anterior", fechaNumeros: AYER,
    numeros: ["53", "16", "74"], numerosExtra: null, multiplicador: null,
  },
  {
    id: "anguila-quiniela-9pm",
    loteria_id: "anguila", loteria_nombre: "Anguila Lottery",
    loteria_color: "#f47920", loteria_siglas: "AN", loteria_orden: 10,
    sorteo: "Quiniela Anguila 9:00 PM", hora: "9:00 PM", fecha: HOY,
    tipo: "quiniela", estado: "anterior", fechaNumeros: AYER,
    numeros: ["86", "52", "17"], numerosExtra: null, multiplicador: null,
  },

  // ══════════════════════════════════════════════════════════════
  // OTROS SORTEOS — visibles en "Todos los Sorteos"
  // ══════════════════════════════════════════════════════════════

  // ── Lotería Nacional — Juega+ Pega+ ──────────────────────────
  {
    id: "nacional-jugamas",
    loteria_id: "nacional", loteria_nombre: "Lotería Nacional",
    loteria_color: "#2d7a27", loteria_siglas: "LN", loteria_orden: 1,
    sorteo: "Juega+ Pega+", hora: "8:30 PM", fecha: HOY,
    tipo: "jugamas", estado: "anterior", fechaNumeros: AYER,
    numeros: ["15", "28", "37", "52"],   // [par1-a, par1-b, par2-a, par2-b]
    numerosExtra: ["07"],                 // extra verde
    multiplicador: null,
  },

  // ── Leidsa — otros ────────────────────────────────────────────
  {
    id: "leidsa-pega3mas",
    loteria_id: "leidsa", loteria_nombre: "Leidsa",
    loteria_color: "#f5b800", loteria_siglas: "LE", loteria_orden: 2,
    sorteo: "Pega 3 Más", hora: "8:55 PM", fecha: HOY,
    tipo: "pega3", estado: "hoy", fechaNumeros: HOY,
    numeros: ["05", "32", "47"],   // rango 00-49
    numerosExtra: null, multiplicador: null,
  },
  {
    id: "leidsa-lotopool",
    loteria_id: "leidsa", loteria_nombre: "Leidsa",
    loteria_color: "#f5b800", loteria_siglas: "LE", loteria_orden: 2,
    sorteo: "Loto Pool Leidsa", hora: "8:55 PM", fecha: HOY,
    tipo: "lotopool", estado: "anterior", fechaNumeros: AYER,
    numeros: ["12", "34", "56", "07", "21"],   // 5 bolas
    numerosExtra: null, multiplicador: null,
  },
  {
    id: "leidsa-kino",
    loteria_id: "leidsa", loteria_nombre: "Leidsa",
    loteria_color: "#f5b800", loteria_siglas: "LE", loteria_orden: 2,
    sorteo: "Kino Leidsa", hora: "9:30 PM", fecha: HOY,
    tipo: "kino", estado: "hoy", fechaNumeros: HOY,
    // exactamente 20 números, rango 1-80
    numeros: ["03","07","11","15","18","22","26","30","33","37",
              "41","45","49","52","56","60","64","68","72","76"],
    numerosExtra: null, multiplicador: null,
  },
  {
    id: "leidsa-loto",
    loteria_id: "leidsa", loteria_nombre: "Leidsa",
    loteria_color: "#f5b800", loteria_siglas: "LE", loteria_orden: 2,
    sorteo: "Loto Leidsa", hora: "8:55 PM", fecha: HOY,
    tipo: "loto-leidsa", estado: "hoy", fechaNumeros: HOY,
    numeros: ["03","07","14","28","35","41"],   // 6 verdes (menor a mayor)
    numerosExtra: ["11","25"],                  // 2 doradas: Más, Super
    multiplicador: null,
  },

  // ── Lotería Real — otros ──────────────────────────────────────
  {
    id: "real-lotopool",
    loteria_id: "real", loteria_nombre: "Lotería Real",
    loteria_color: "#1a3a8f", loteria_siglas: "LR", loteria_orden: 3,
    sorteo: "Loto Pool Real", hora: "7:30 PM", fecha: HOY,
    tipo: "lotopool", estado: "anterior", fechaNumeros: AYER,
    numeros: ["08", "22", "33", "41"],   // 4 bolas
    numerosExtra: null, multiplicador: null,
  },
  {
    id: "real-loto",
    loteria_id: "real", loteria_nombre: "Lotería Real",
    loteria_color: "#1a3a8f", loteria_siglas: "LR", loteria_orden: 3,
    sorteo: "Loto Real", hora: "7:30 PM", fecha: HOY,
    tipo: "loto-real", estado: "anterior", fechaNumeros: AYER,
    numeros: ["12","26","41","55","68","73"],   // 6 verdes sin extras
    numerosExtra: null, multiplicador: null,
  },

  // ── Loteka — otros ────────────────────────────────────────────
  {
    id: "loteka-megachance",
    loteria_id: "loteka", loteria_nombre: "Loteka",
    loteria_color: "#00aeef", loteria_siglas: "LT", loteria_orden: 4,
    sorteo: "Mega Chance", hora: "7:00 PM", fecha: HOY,
    tipo: "megachance", estado: "hoy", fechaNumeros: HOY,
    numeros: ["09","17","31","44","52"],
    numerosExtra: null, multiplicador: null,
  },
  {
    id: "loteka-loto",
    loteria_id: "loteka", loteria_nombre: "Loteka",
    loteria_color: "#00aeef", loteria_siglas: "LT", loteria_orden: 4,
    sorteo: "Loto Loteka", hora: "8:30 PM", fecha: HOY,
    tipo: "loto-loteka", estado: "anterior", fechaNumeros: AYER,
    numeros: ["05","12","27","38","44","51"],   // 6 verdes
    numerosExtra: ["17","08"],                  // [roja Extra, dorada Power]
    multiplicador: null,
  },

  // ── La Primera — otros ────────────────────────────────────────
  {
    id: "primera-loto5",
    loteria_id: "primera", loteria_nombre: "La Primera",
    loteria_color: "#e41e25", loteria_siglas: "LP", loteria_orden: 5,
    sorteo: "Loto 5+", hora: "6:30 PM", fecha: HOY,
    tipo: "loto5plus", estado: "anterior", fechaNumeros: AYER,
    numeros: ["03","19","27","44","61"],   // 5 verdes
    numerosExtra: ["08"],                  // 1 dorada
    multiplicador: null,
  },

  // ── LoteDom — otros ───────────────────────────────────────────
  {
    id: "lotedom-quemaito",
    loteria_id: "lotedom", loteria_nombre: "LoteDom",
    loteria_color: "#0033cc", loteria_siglas: "LD", loteria_orden: 7,
    sorteo: "El Quemaíto Mayor", hora: "9:00 PM", fecha: HOY,
    tipo: "quemaito", estado: "hoy", fechaNumeros: HOY,
    numeros: ["45"],   // 1 sola bola grande
    numerosExtra: null, multiplicador: null,
  },

  // ── New York / Florida — especiales ───────────────────────────
  {
    id: "ny-megamillions",
    loteria_id: "ny", loteria_nombre: "New York", card_nombre: "Mega Millions",
    loteria_color: "#1a1a2e", loteria_siglas: "NY", loteria_orden: 8, loteria_suborden: 3,
    sorteo: "Mega Millions", hora: "11:00 PM", fecha: HOY,
    tipo: "megamillions", estado: "hoy", fechaNumeros: HOY,
    numeros: ["04","26","42","58","70"],   // 5 verdes
    numerosExtra: ["11"],                  // 1 dorada (Mega Ball)
    multiplicador: null,
  },
  {
    id: "florida-powerball",
    loteria_id: "florida", loteria_nombre: "Florida", card_nombre: "PowerBall",
    loteria_color: "#f47920", loteria_siglas: "FL", loteria_orden: 8, loteria_suborden: 4,
    sorteo: "PowerBall", hora: "10:59 PM", fecha: HOY,
    tipo: "powerball", estado: "anterior", fechaNumeros: AYER,
    numeros: ["10","24","37","53","67"],   // 5 verdes
    numerosExtra: ["08"],                  // 1 roja (PowerBall)
    multiplicador: "3X",
  },
]
