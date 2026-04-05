/**
 * BallsDisplay.jsx
 *
 * Reglas globales:
 *   • compact=true  → vista lista  → def=44px desktop, ballSize=40 en móvil
 *   • compact=false → vista tarjeta → 48px
 *   • El filter NUNCA toca el número: bg y número son capas separadas.
 *   • Las etiquetas (Más, Super, Extra, Power) usan paddingBottom+position:absolute
 *     para que no levanten ni desplacen los círculos.
 *   • Los layouts multi-fila (loto-leidsa, loto-loteka, megamillions, powerball)
 *     aplican igual en AMBAS vistas (compact o no).
 */

export const COLORS = {
  green:  { main: '#059669', dark: '#047857' },
  gold:   { main: '#ca8a04', dark: '#92400e' },
  red:    { main: '#dc2626', dark: '#991b1b' },
  blue:   { main: '#1e40af', dark: '#1e3a8a' },
  orange: { main: '#ea580c', dark: '#c2410c' },
  gray:   { main: '#9ca3af', dark: '#6b7280' },
}

export const get3D = (colorKey) => {
  const { main, dark } = COLORS[colorKey] ?? COLORS.green
  return {
    background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.35) 0%, ${main} 45%, ${dark} 100%)`,
    boxShadow: `inset -3px -3px 8px rgba(0,0,0,0.25), inset 2px 2px 6px rgba(255,255,255,0.4), 0 4px 10px rgba(0,0,0,0.2)`,
  }
}

// ── Bola individual ─────────────────────────────────────────────────────────
// FIX 3: Fondo y número son capas independientes.
// El filter (dimmed/dimmed3D) solo afecta a la capa de fondo, nunca al número.
export const Ball = ({
  numero, colorKey = 'green', size = 48,
  label = null, dimmed = false, dimmed3D = false,
}) => {
  const bgColors = dimmed
    ? { background: COLORS[colorKey]?.main ?? COLORS.green.main }
    : get3D(colorKey)

  const bgFilter = dimmed3D ? 'saturate(0.4) brightness(0.8)'
                 : dimmed    ? 'saturate(0.5) brightness(0.75)'
                 : undefined

  const fontSize = size < 30 ? '11px'
                 : size < 36 ? '13px'
                 : size < 48 ? '15px'
                 : size < 56 ? '18px'
                 : size < 64 ? '20px'
                 :             '24px'

  return (
    <div style={{
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingBottom: label ? 20 : 0,
      flexShrink: 0,
    }}>
      <div style={{
        position: 'relative',
        width: size, height: size,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        userSelect: 'none',
      }}>
        {/* Capa de fondo — filter SOLO aquí, nunca toca el número */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          ...bgColors,
          ...(bgFilter ? { filter: bgFilter } : {}),
        }} />
        {/* Número — sin filter, siempre legible */}
        <span style={{
          position: 'relative', zIndex: 1,
          fontSize, fontWeight: 800, color: 'white',
          textShadow: '0 0 3px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8)',
          lineHeight: 1,
        }}>
          {numero}
        </span>
      </div>

      {label && (
        <span style={{
          position: 'absolute', bottom: 2, left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 10, color: '#9ca3af', fontWeight: 600,
          lineHeight: 1, whiteSpace: 'nowrap', pointerEvents: 'none',
        }}>
          {label}
        </span>
      )}
    </div>
  )
}

const PlusSep = () => (
  <span style={{
    color: '#d1d5db', fontWeight: 700, fontSize: 22,
    alignSelf: 'center', lineHeight: 1, flexShrink: 0, userSelect: 'none',
  }}>+</span>
)

// ── Componente principal ────────────────────────────────────────────────────
const BallsDisplay = ({
  tipo         = 'quiniela',
  numeros      = [],
  numerosExtra  = null,
  multiplicador = null,
  isGray        = false,
  compact       = false,
  ballSize      = null,
  allowWrap     = false,
}) => {
  const def = ballSize ?? (compact ? 44 : 48)
  const c   = (key) => isGray ? 'gray' : key
  const wrap = allowWrap ? 'wrap' : 'nowrap'

  const greenBalls = (nums, sz = def) =>
    nums.map((n, i) => <Ball key={i} numero={n} colorKey={c('green')} size={sz} />)

  // Fila única horizontal — wrap controlado por prop
  const singleRow = (children, gap = 8) => (
    <div style={{
      display: 'flex', flexWrap: wrap, gap,
      justifyContent: 'center', alignItems: 'flex-start',
    }}>
      {children}
    </div>
  )

  // ── Quiniela / Pega 3 / Mega Chance — 3 bolas ────────────────────────────
  if (tipo === 'quiniela' || tipo === 'pega3' || tipo === 'megachance') {
    return singleRow(greenBalls(numeros))
  }

  // ── Juega+ Pega+ — 2 azul + 2 naranja + 1 verde (FIX 3: dimmed3D) ────────
  if (tipo === 'jugamas') {
    return singleRow(
      <>
        <Ball numero={numeros[0]} colorKey='blue'   size={def} dimmed3D={isGray} />
        <Ball numero={numeros[1]} colorKey='blue'   size={def} dimmed3D={isGray} />
        <Ball numero={numeros[2]} colorKey='orange' size={def} dimmed3D={isGray} />
        <Ball numero={numeros[3]} colorKey='orange' size={def} dimmed3D={isGray} />
        {numerosExtra?.length > 0 && (
          <>
            <PlusSep />
            <Ball numero={numerosExtra[0]} colorKey='green' size={def} dimmed3D={isGray} />
          </>
        )}
      </>
    )
  }

  // ── Kino Leidsa — grid 5 columnas, ancho completo ────────────────────────
  if (tipo === 'kino') {
    const sz  = ballSize ?? (compact ? 36 : 44)
    const gap = 3
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(5, ${sz}px)`,
        gap,
        width: 'fit-content',
        maxWidth: '100%',
        margin: '0 auto',
        justifyItems: 'center',
      }}>
        {numeros.slice(0, 20).map((n, i) => (
          <Ball key={i} numero={n} colorKey={c('green')} size={sz} />
        ))}
      </div>
    )
  }

  // ── Loto Leidsa — Fila 1: 6 verdes · Fila 2: Más + Super (solo si existen)
  if (tipo === 'loto-leidsa') {
    const hasExtras = numerosExtra && numerosExtra.length > 0
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 4, flexWrap: wrap, justifyContent: 'center', alignItems: 'flex-start' }}>
          {numeros.map((n, i) => <Ball key={i} numero={n} colorKey={c('green')} size={def} />)}
        </div>
        {hasExtras && (
          <div style={{ display: 'flex', gap: 4, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Ball numero={numerosExtra[0]} colorKey='gold' size={def} label='Más'   dimmed={isGray} />
            {numerosExtra[1] != null && (
              <Ball numero={numerosExtra[1]} colorKey='gold' size={def} label='Super' dimmed={isGray} />
            )}
          </div>
        )}
      </div>
    )
  }

  // ── Loto Loteka — Fila 1: 6 verdes · Fila 2: Extra + Power (solo si existen)
  if (tipo === 'loto-loteka') {
    const hasExtras = numerosExtra && numerosExtra.length > 0
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 4, flexWrap: wrap, justifyContent: 'center', alignItems: 'flex-start' }}>
          {numeros.map((n, i) => <Ball key={i} numero={n} colorKey={c('green')} size={def} />)}
        </div>
        {hasExtras && (
          <div style={{ display: 'flex', gap: 4, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Ball numero={numerosExtra[0]} colorKey='red'  size={def} label='Extra' dimmed={isGray} />
            {numerosExtra[1] != null && (
              <Ball numero={numerosExtra[1]} colorKey='gold' size={def} label='Power' dimmed={isGray} />
            )}
          </div>
        )}
      </div>
    )
  }

  // ── Loto Real / Loto Pool — 1 fila nowrap ─────────────────────────────────
  if (tipo === 'loto-real' || tipo === 'lotopool') {
    return singleRow(greenBalls(numeros))
  }

  // ── Loto 5+ La Primera — 5 verdes + 1 dorada (Más) ─────────────────────────
  if (tipo === 'loto5plus') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 4, flexWrap: wrap, justifyContent: 'center', alignItems: 'flex-start' }}>
          {greenBalls(numeros)}
        </div>
        {numerosExtra?.[0] != null && (
          <div style={{ display: 'flex', gap: 4, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Ball numero={numerosExtra[0]} colorKey='gold' size={def} label='Más' dimmed={isGray} />
          </div>
        )}
      </div>
    )
  }

  // ── El Quemaíto Mayor — 1 bola 72px centrada ──────────────────────────────
  if (tipo === 'quemaito') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Ball numero={numeros[0]} colorKey={c('green')} size={compact ? def : (ballSize ?? 72)} />
      </div>
    )
  }

  // ── Mega Millions — Fila 1: 5 verdes · Fila 2: Mega Ball dorado
  if (tipo === 'megamillions') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: wrap, justifyContent: 'center' }}>
          {greenBalls(numeros)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Ball numero={numerosExtra?.[0]} colorKey='gold' size={def} label='Mega Ball' dimmed={isGray} />
        </div>
      </div>
    )
  }

  // ── PowerBall — Fila 1: 5 verdes · Fila 2: bola roja + badge (FIX 2: ambas vistas)
  if (tipo === 'powerball') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: wrap, justifyContent: 'center' }}>
          {greenBalls(numeros)}
        </div>
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start' }}>
          <Ball numero={numerosExtra?.[0]} colorKey='red' size={def} label='PowerBall' dimmed={isGray} />
          {multiplicador && (
            <Ball numero={multiplicador} colorKey='gray' size={def} label='Multiplicador' />
          )}
        </div>
      </div>
    )
  }

  // ── Cash 4 Life — 5 verdes + 1 dorada (Cash Ball) ────────────────────────
  if (tipo === 'cash4life') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: wrap, justifyContent: 'center' }}>
          {greenBalls(numeros)}
        </div>
        {numerosExtra?.[0] != null && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Ball numero={numerosExtra[0]} colorKey='gold' size={def} label='Cash Ball' dimmed={isGray} />
          </div>
        )}
      </div>
    )
  }

  return singleRow(greenBalls(numeros))
}

export default BallsDisplay
