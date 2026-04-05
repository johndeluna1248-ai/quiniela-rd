/**
 * fetchQuinielas.js
 *
 * fetchQuinielas()  → último resultado de cada uno de los 20 sorteos
 * fetchTodosSorteos() → último resultado de los 33+ sorteos
 * fetchHistorial()  → últimos 5 resultados de un sorteo específico
 *
 * When fechaSeleccionada = hoy → fetch latest per sorteo (handles pendiente)
 * When fechaSeleccionada ≠ hoy → fetch only results for that specific date
 */
import { supabase } from './supabase'
import { QUINIELAS_ORDEN, TODOS_SORTEOS_ORDEN, mapSupabaseRow, mapSupabaseResults, horaActualMin, hoyRD } from './supabaseMapper'

/**
 * Los 20 sorteos de quiniela.
 * @param {string} hoyStr — today's date for estado comparison
 * @param {string} fechaSeleccionada — user-selected date for query filter
 */
export async function fetchQuinielas(hoyStr, fechaSeleccionada) {
  const sorteoNames = QUINIELAS_ORDEN.map(([, sorteo]) => sorteo)
  const nowMin = horaActualMin()
  const isToday = !fechaSeleccionada || fechaSeleccionada === hoyStr

  let query = supabase
    .from('resultados_verificados')
    .select('*')
    .in('sorteo', sorteoNames)

  if (isToday) {
    // Today: fetch all, pick latest per sorteo (handles pendiente state)
    query = query.order('fecha', { ascending: false })
  } else {
    // Past date: only results from that specific date
    query = query.eq('fecha', fechaSeleccionada)
  }

  const { data, error } = await query
  if (error) throw error

  // Agrupar por (loteria, sorteo) → quedarse con el más reciente
  const latestMap = new Map()
  for (const row of (data || [])) {
    const key = `${row.loteria}|${row.sorteo}`
    if (!latestMap.has(key)) {
      latestMap.set(key, row)
    }
  }

  // Reconstruir en orden de prioridad
  const results = []
  for (const [loteria, sorteo] of QUINIELAS_ORDEN) {
    const key = `${loteria}|${sorteo}`
    const row = latestMap.get(key)
    if (row) {
      results.push(mapSupabaseRow(row, hoyStr, nowMin, fechaSeleccionada))
    }
  }

  return results
}

/**
 * Todos los 33+ sorteos.
 * @param {string} hoyStr — today's date for estado comparison
 * @param {string} fechaSeleccionada — user-selected date for query filter
 */
export async function fetchTodosSorteos(hoyStr, fechaSeleccionada) {
  const sorteoNames = TODOS_SORTEOS_ORDEN.map(([, sorteo]) => sorteo)
  const nowMin = horaActualMin()
  const isToday = !fechaSeleccionada || fechaSeleccionada === hoyStr

  let query = supabase
    .from('resultados_verificados')
    .select('*')
    .in('sorteo', sorteoNames)

  if (isToday) {
    query = query.order('fecha', { ascending: false })
  } else {
    query = query.eq('fecha', fechaSeleccionada)
  }

  const { data, error } = await query
  if (error) throw error

  const latestMap = new Map()
  for (const row of (data || [])) {
    const key = `${row.loteria}|${row.sorteo}`
    if (!latestMap.has(key)) {
      latestMap.set(key, row)
    }
  }

  const results = []
  for (const [loteria, sorteo] of TODOS_SORTEOS_ORDEN) {
    const key = `${loteria}|${sorteo}`
    const row = latestMap.get(key)
    if (row) {
      results.push(mapSupabaseRow(row, hoyStr, nowMin, fechaSeleccionada))
    }
  }

  return results
}

/**
 * Últimos N resultados de un sorteo específico (para SorteoDetail).
 * @param {string} sorteoName — nombre exacto del sorteo en Supabase
 * @param {number} limit — cuántos resultados (default 5)
 */
export async function fetchHistorial(sorteoName, limit = 5) {
  const hoyStr = hoyRD()
  const nowMin = horaActualMin()

  const { data, error } = await supabase
    .from('resultados_verificados')
    .select('*')
    .eq('sorteo', sorteoName)
    .order('fecha', { ascending: false })
    .limit(limit)

  if (error) throw error
  if (!data || data.length === 0) return []

  return data.map(row => mapSupabaseRow(row, hoyStr, nowMin))
}
