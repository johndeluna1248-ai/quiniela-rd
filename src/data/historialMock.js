/**
 * historialMock.js
 * Últimos 4 resultados anteriores a hoy por sorteo.
 * La página de detalle combina el resultado actual + historial para mostrar hasta 5.
 *
 * Clave: id del sorteo (igual que en resultsMock.js)
 * Valor: array de { fecha, numeros, numerosExtra? } de más reciente a más antiguo
 * La estructura de numeros/numerosExtra debe coincidir con el tipo del sorteo.
 */
export const historial = {

  // ── Lotería Nacional ────────────────────────────────────────────────────
  "nacional-quiniela-tarde": [
    { fecha: "2026-03-23", numeros: ["61","08","42"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["27","93","15"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["80","34","56"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["13","67","29"], numerosExtra: null },
  ],
  "nacional-quiniela-noche": [
    { fecha: "2026-03-23", numeros: ["49","72","05"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["88","31","67"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["14","53","90"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["36","21","74"], numerosExtra: null },
  ],
  // jugamas: 4 main (par1-a, par1-b, par2-a, par2-b) + 1 extra verde
  "nacional-jugamas": [
    { fecha: "2026-03-23", numeros: ["11","28","44","62"], numerosExtra: ["07"] },
    { fecha: "2026-03-22", numeros: ["08","21","37","55"], numerosExtra: ["14"] },
    { fecha: "2026-03-21", numeros: ["17","33","46","63"], numerosExtra: ["09"] },
    { fecha: "2026-03-20", numeros: ["05","22","40","58"], numerosExtra: ["03"] },
  ],

  // ── Leidsa ──────────────────────────────────────────────────────────────
  "leidsa-quiniela": [
    { fecha: "2026-03-23", numeros: ["55","19","74"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["03","87","41"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["62","28","09"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["46","73","31"], numerosExtra: null },
  ],
  "leidsa-pega3mas": [
    { fecha: "2026-03-23", numeros: ["08","31","45"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["14","27","39"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["02","18","43"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["11","36","48"], numerosExtra: null },
  ],
  // lotopool: 5 bolas
  "leidsa-lotopool": [
    { fecha: "2026-03-23", numeros: ["12","34","56","07","21"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["03","18","45","62","77"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["09","27","38","54","80"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["15","29","43","61","72"], numerosExtra: null },
  ],
  // kino: 20 bolas
  "leidsa-kino": [
    { fecha: "2026-03-23", numeros: ["01","05","09","13","17","21","25","29","33","37","41","45","49","53","57","61","65","69","73","77"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["02","06","10","14","18","22","26","30","34","38","42","46","50","54","58","62","66","70","74","78"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["04","08","12","16","20","24","28","32","36","40","44","48","52","56","60","63","67","71","75","79"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["03","07","11","15","19","23","27","31","35","39","43","47","51","55","59","64","68","72","76","80"], numerosExtra: null },
  ],
  // loto-leidsa: 6 verdes + 2 doradas (Más, Super)
  "leidsa-loto": [
    { fecha: "2026-03-23", numeros: ["11","24","33","47","58","64"], numerosExtra: ["06","18"] },
    { fecha: "2026-03-22", numeros: ["05","18","31","42","55","67"], numerosExtra: ["09","23"] },
    { fecha: "2026-03-21", numeros: ["02","16","29","44","61","73"], numerosExtra: ["12","27"] },
    { fecha: "2026-03-20", numeros: ["08","21","36","49","63","75"], numerosExtra: ["04","17"] },
  ],

  // ── Lotería Real ────────────────────────────────────────────────────────
  "real-quiniela": [
    { fecha: "2026-03-23", numeros: ["77","39","52"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["18","64","03"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["91","47","25"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["60","15","83"], numerosExtra: null },
  ],
  // lotopool: 4 bolas
  "real-lotopool": [
    { fecha: "2026-03-23", numeros: ["08","22","33","41"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["04","17","29","45"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["10","25","38","52"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["06","19","34","48"], numerosExtra: null },
  ],
  // loto-real: 6 verdes sin extras
  "real-loto": [
    { fecha: "2026-03-23", numeros: ["12","26","41","55","68","73"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["07","23","38","51","64","79"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["03","18","32","47","60","75"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["09","24","39","53","66","80"], numerosExtra: null },
  ],

  // ── Loteka ──────────────────────────────────────────────────────────────
  "loteka-quiniela": [
    { fecha: "2026-03-23", numeros: ["44","61","08"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["27","50","93"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["16","39","77"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["05","48","82"], numerosExtra: null },
  ],
  "loteka-megachance": [
    { fecha: "2026-03-23", numeros: ["11","25","38","52","67"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["04","18","33","46","59"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["07","21","35","48","61"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["02","16","29","43","57"], numerosExtra: null },
  ],
  // loto-loteka: 6 verdes + roja Extra + dorada Power
  "loteka-loto": [
    { fecha: "2026-03-23", numeros: ["08","22","37","51","64","73"], numerosExtra: ["15","09"] },
    { fecha: "2026-03-22", numeros: ["05","19","34","48","62","75"], numerosExtra: ["12","07"] },
    { fecha: "2026-03-21", numeros: ["11","25","39","53","67","80"], numerosExtra: ["18","03"] },
    { fecha: "2026-03-20", numeros: ["03","17","31","45","59","72"], numerosExtra: ["14","06"] },
  ],

  // ── La Primera ──────────────────────────────────────────────────────────
  "primera-quiniela-dia": [
    { fecha: "2026-03-23", numeros: ["58","27","04"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["83","41","16"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["32","69","95"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["07","53","78"], numerosExtra: null },
  ],
  "primera-quiniela-noche": [
    { fecha: "2026-03-23", numeros: ["72","35","08"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["49","81","23"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["14","57","90"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["38","66","02"], numerosExtra: null },
  ],
  // loto5plus: 5 verdes + 1 dorada
  "primera-loto5": [
    { fecha: "2026-03-23", numeros: ["03","19","27","44","61"], numerosExtra: ["08"] },
    { fecha: "2026-03-22", numeros: ["07","22","35","48","63"], numerosExtra: ["11"] },
    { fecha: "2026-03-21", numeros: ["04","17","31","45","58"], numerosExtra: ["06"] },
    { fecha: "2026-03-20", numeros: ["09","24","38","52","67"], numerosExtra: ["14"] },
  ],

  // ── La Suerte Dominicana ────────────────────────────────────────────────
  "suerte-quiniela-1230": [
    { fecha: "2026-03-23", numeros: ["65","28","47"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["12","79","36"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["54","03","91"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["87","41","22"], numerosExtra: null },
  ],
  "suerte-quiniela-600": [
    { fecha: "2026-03-23", numeros: ["71","25","48"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["39","62","07"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["86","14","53"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["29","75","41"], numerosExtra: null },
  ],

  // ── LoteDom ─────────────────────────────────────────────────────────────
  "lotedom-quiniela": [
    { fecha: "2026-03-23", numeros: ["93","07","56"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["41","74","18"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["65","30","87"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["09","52","76"], numerosExtra: null },
  ],
  // quemaito: 1 sola bola
  "lotedom-quemaito": [
    { fecha: "2026-03-23", numeros: ["45"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["67"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["23"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["89"], numerosExtra: null },
  ],

  // ── New York ─────────────────────────────────────────────────────────────
  "ny-quiniela-tarde": [
    { fecha: "2026-03-23", numeros: ["52","07","84"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["39","61","15"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["78","24","46"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["11","93","57"], numerosExtra: null },
  ],
  "ny-quiniela-noche": [
    { fecha: "2026-03-23", numeros: ["64","18","43"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["29","87","06"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["52","35","71"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["08","46","93"], numerosExtra: null },
  ],
  // megamillions: 5 verdes + 1 dorada
  "ny-megamillions": [
    { fecha: "2026-03-22", numeros: ["07","19","35","52","68"], numerosExtra: ["14"] },
    { fecha: "2026-03-19", numeros: ["03","22","41","58","71"], numerosExtra: ["09"] },
    { fecha: "2026-03-15", numeros: ["11","28","44","60","73"], numerosExtra: ["06"] },
    { fecha: "2026-03-12", numeros: ["05","18","33","49","66"], numerosExtra: ["21"] },
  ],
  // ── Florida ─────────────────────────────────────────────────────────────
  "florida-quiniela-tarde": [
    { fecha: "2026-03-23", numeros: ["73","26","08"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["45","81","34"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["17","59","92"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["62","04","48"], numerosExtra: null },
  ],
  "florida-quiniela-noche": [
    { fecha: "2026-03-23", numeros: ["38","75","12"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["61","24","87"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["09","53","76"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["44","17","63"], numerosExtra: null },
  ],
  // powerball: 5 verdes + 1 roja + multiplicador
  "florida-powerball": [
    { fecha: "2026-03-22", numeros: ["10","24","37","53","67"], numerosExtra: ["15"], multiplicador: "2X" },
    { fecha: "2026-03-19", numeros: ["06","18","32","48","61"], numerosExtra: ["08"], multiplicador: "5X" },
    { fecha: "2026-03-15", numeros: ["13","27","41","56","70"], numerosExtra: ["12"], multiplicador: "3X" },
    { fecha: "2026-03-12", numeros: ["04","19","33","47","60"], numerosExtra: ["22"], multiplicador: "10X" },
  ],

  // ── King Lottery ─────────────────────────────────────────────────────────
  "king-quiniela-dia": [
    { fecha: "2026-03-23", numeros: ["89","43","17"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["52","08","76"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["31","64","95"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["07","48","83"], numerosExtra: null },
  ],
  "king-quiniela-noche": [
    { fecha: "2026-03-23", numeros: ["67","34","02"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["91","55","18"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["43","76","29"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["14","58","87"], numerosExtra: null },
  ],

  // ── Anguila Lottery ──────────────────────────────────────────────────────
  "anguila-quiniela-10am": [
    { fecha: "2026-03-23", numeros: ["71","38","05"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["49","82","16"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["23","67","94"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["58","12","40"], numerosExtra: null },
  ],
  "anguila-quiniela-1pm": [
    { fecha: "2026-03-23", numeros: ["06","42","89"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["37","65","13"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["81","27","54"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["19","73","46"], numerosExtra: null },
  ],
  "anguila-quiniela-6pm": [
    { fecha: "2026-03-23", numeros: ["53","16","74"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["28","61","09"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["47","83","35"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["02","58","91"], numerosExtra: null },
  ],
  "anguila-quiniela-9pm": [
    { fecha: "2026-03-23", numeros: ["86","52","17"], numerosExtra: null },
    { fecha: "2026-03-22", numeros: ["34","71","08"], numerosExtra: null },
    { fecha: "2026-03-21", numeros: ["63","29","45"], numerosExtra: null },
    { fecha: "2026-03-20", numeros: ["11","48","76"], numerosExtra: null },
  ],
}
