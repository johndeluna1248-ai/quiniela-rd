/**
 * sorteoColors.js
 * Per-sorteo color overrides. Falls back to loteria_color if no match.
 */

const SORTEO_COLORS = {
  'Mega Millions':  '#7c3aed',
  'Powerball':      '#dc2626',
  'Cash 4 Life':    '#059669',
}

const LOTERIA_COLORS = {
  king: '#c9a84c',
}

/**
 * Resolve the display color for a sorteo.
 * Priority: sorteo name override → loteria_id override → loteria_color fallback
 */
export const resolveSorteoColor = (sorteo, loteria_id, loteria_color) => {
  if (sorteo && SORTEO_COLORS[sorteo]) return SORTEO_COLORS[sorteo]
  if (loteria_id && LOTERIA_COLORS[loteria_id]) return LOTERIA_COLORS[loteria_id]
  return loteria_color || '#6b7280'
}
