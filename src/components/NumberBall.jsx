/**
 * NumberBall.jsx
 * Wrapper fino sobre el componente Ball de BallsDisplay.
 * Mantido por compatibilidad; usa BallsDisplay directamente cuando sea posible.
 */
import { Ball } from './BallsDisplay'

// colorKey: "green" | "gold" | "red" | "blue" | "orange" | "gray"
// size: número en px (default 48)
const NumberBall = ({ numero, colorKey = 'green', size = 48 }) => (
  <Ball numero={numero} colorKey={colorKey} size={size} />
)

export default NumberBall
