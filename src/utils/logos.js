/**
 * logos.js — Mapeo de logos de loterías y sorteos.
 * Carga automáticamente los archivos .png que existan en src/assets/logos/
 * Si un archivo no existe → devuelve null → LotteryLogo muestra iniciales
 */

// import.meta.glob carga solo los archivos que realmente existen
const _files = import.meta.glob('../assets/logos/*.{png,jpg}', { eager: true, import: 'default' })
const _get = (name) => _files[`../assets/logos/${name}.png`] ?? _files[`../assets/logos/${name}.jpg`] ?? null

// Logo por loteria_id (empresa)
export const LOGOS_EMPRESA = {
  nacional:     _get('nacional'),
  leidsa:       _get('leidsa'),
  real:         _get('real-logo'),
  loteka:       _get('loteka'),
  primera:      _get('primera'),
  suerte:       _get('suerte'),
  lotedom:      _get('lotedom'),
  king:         _get('king'),
  anguila:      _get('anguila-logo'),
  ny:           _get('newyork'),
  americanas:   _get('americana-flag'),
  florida:      _get('florida'),
  megamillions: _get('megamillions-logo'),
  powerball:    _get('powerball-logo'),

}

// Logo por nombre de sorteo (más específico que el de empresa)
export const LOGOS_SORTEO = {
  'Quiniela Leidsa':   _get('quiniela-pale'),
  'Pega 3 Más':        _get('pega3'),
  'Loto Pool Leidsa':  _get('lotopool-leidsa'),
  'Kino Leidsa':       _get('kino'),
  'Loto Leidsa':       _get('lotomas'),
  'Quiniela Real':     _get('real-quiniela'),
  'Loto Pool Real':    _get('real-lotopool'),
  'Loto Real':         _get('lotoreal'),
  'Mega Chance':       _get('megachance'),
  'Loto Loteka':       _get('lotolotek'),
  'Quiniela Anguila 10:00 AM': _get('anguila-quiniela'),
  'Quiniela Anguila 1:00 PM':  _get('anguila-quiniela'),
  'Quiniela Anguila 6:00 PM':  _get('anguila-quiniela'),
  'Quiniela Anguila 9:00 PM':  _get('anguila-quiniela'),
  'Mega Millions':             _get('megamillions-logo'),
  'Powerball':                 _get('powerball-logo'),
  'Quiniela La Primera Día':   _get('laprimera-quiniela-dia'),
  'Quiniela La Primera Noche': _get('laprimera-quiniela-noche'),
  'Loto 5+ La Primera':        _get('laprimera-loto5'),
  'Quiniela Florida Día':      _get('florida-lottery'),
  'Quiniela Florida Tarde':    _get('florida-lottery'),
  'Quiniela Florida Noche':    _get('florida-lottery'),
}
