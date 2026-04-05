/**
 * loteriesMock.js
 * Lista de loterías dominicanas con orden de prioridad, siglas y datos de display.
 * color      → color de título en tarjetas y texto de sección
 * avatarText → color del texto en el avatar circular (por defecto blanco)
 */
export const loterias = [
  { id: "nacional",  nombre: "Lotería Nacional",       siglas: "LN",  color: "#2d7a27",  orden: 1 },
  { id: "leidsa",    nombre: "Leidsa",                  siglas: "LE",  color: "#f5b800",  orden: 2, avatarText: "#1a3a8f" },
  { id: "real",      nombre: "Lotería Real",             siglas: "LR",  color: "#1a3a8f",  orden: 3 },
  { id: "loteka",    nombre: "Loteka",                   siglas: "LT",  color: "#00aeef",  orden: 4 },
  { id: "primera",   nombre: "La Primera",               siglas: "LP",  color: "#e41e25",  orden: 5 },
  { id: "suerte",    nombre: "La Suerte Dominicana",     siglas: "LS",  color: "#1a3a8f",  orden: 6 },
  { id: "lotedom",   nombre: "LoteDom",                  siglas: "LD",  color: "#0033cc",  orden: 7 },
  { id: "ny",        nombre: "New York",                 siglas: "NY",  color: "#1a1a2e",  orden: 8 },
  { id: "florida",   nombre: "Florida",                  siglas: "FL",  color: "#f47920",  orden: 8 },
  { id: "king",      nombre: "King Lottery",             siglas: "KL",  color: "#c9a84c",  orden: 9 },
  { id: "anguila",   nombre: "Anguila Lottery",         siglas: "AN",  color: "#f47920",  orden: 10 },
]

export const loteriasPorId = Object.fromEntries(loterias.map(l => [l.id, l]))

export const nombreGrupoPorOrden = {
  1:  "Lotería Nacional",
  2:  "Leidsa",
  3:  "Lotería Real",
  4:  "Loteka",
  5:  "La Primera",
  6:  "La Suerte Dominicana",
  7:  "LoteDom",
  8:  "Americanas",
  9:  "King Lottery",
  10: "Anguila Lottery",
}
