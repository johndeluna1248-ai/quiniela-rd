# CLAUDE.md — QuinielaRD

Memoria persistente del proyecto para Claude Code.
Última actualización: 2026-04-20

---

## 🗂️ Identificación del Proyecto

- **Ruta activa**: `C:/Projects/quiniela-rd`
- **Copia de respaldo** (no usar): `C:/Users/delun/OneDrive/Desktop/quiniela-rd`
- **GitHub remote**: `origin main` (NO `master`)
- **Deploy**: Cloudflare Pages
- **URL producción**: QuinielaRD (dominio configurado en Cloudflare)

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite 5 + Tailwind CSS 3 |
| Router | react-router-dom v6 |
| SEO | react-helmet-async |
| Backend | Supabase (PostgreSQL) |
| Scraper | n8n self-hosted |
| Deploy | Cloudflare Pages (`npx wrangler pages deploy dist`) |
| Anuncios | Google AdSense `ca-pub-1957659439174188` |

---

## ⚡ Comandos Frecuentes

```bash
# Desarrollo
npm run dev                          # localhost:5173

# Producción
npm run build                        # → dist/
npx wrangler pages deploy dist       # deploy a Cloudflare Pages

# Git
git add -p                           # staging selectivo
git commit -m "mensaje"
git push origin main                 # SIEMPRE main, no master
```

---

## 📂 Estructura del Proyecto

```
src/
├── App.jsx                  # BrowserRouter + rutas + ScrollToTop
├── main.jsx                 # entry point, HelmetProvider
├── index.css                # estilos globales Tailwind
├── assets/logos/            # 22 logos PNG de loterías
├── components/
│   ├── AdBanner.jsx         # banner AdSense (null si ADSENSE_APPROVED=false)
│   ├── BallsDisplay.jsx     # renderiza bolas por tipo (13 tipos)
│   ├── DateFilter.jsx       # filtro de fecha
│   ├── FAQSchema.jsx        # JSON-LD FAQPage para Google Rich Results
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── LotteryCard.jsx      # tarjeta principal de resultado
│   ├── LotteryLogo.jsx
│   ├── Modal.jsx
│   ├── NumberBall.jsx
│   ├── ResultsGrid.jsx      # grid de LotteryCards, agrupa por empresa en vista "todos"
│   ├── SEO.jsx              # meta tags dinámicos via Helmet
│   └── SorteoListRow.jsx    # (legacy, no usado en vistas principales)
├── config/
│   └── adsense.js           # ADSENSE_APPROVED, ADSENSE_CLIENT, ADSENSE_SLOTS
├── data/
│   ├── historialMock.js
│   ├── loteriesMock.js      # nombreGrupoPorOrden (usado en ResultsGrid)
│   ├── loteriasInfo.js      # info estática de cada lotería para /loterias
│   └── resultsMock.js
├── lib/
│   ├── fetchQuinielas.js    # fetchQuinielas(), fetchTodosSorteos(), fetchHistorial()
│   ├── supabase.js          # cliente Supabase
│   └── supabaseMapper.js    # QUINIELAS_ORDEN, TODOS_SORTEOS_ORDEN, mapSupabaseRow, hoyRD()
├── pages/
│   ├── Home.jsx             # vista principal (quinielas / todos los sorteos)
│   ├── Loterias.jsx         # /loterias — info de empresas loteras
│   ├── OtrosSorteos.jsx     # /otros-sorteos — lotos, kino, americanas
│   ├── Privacidad.jsx       # /privacidad
│   ├── Quinielas.jsx        # /quinielas — guía de quinielas
│   ├── SorteoDetail.jsx     # /sorteo/:sorteoId — historial de un sorteo
│   └── Terminos.jsx         # /terminos
└── utils/
    ├── logos.js             # LOGOS_EMPRESA{} y LOGOS_SORTEO{} — rutas de logos
    └── sorteoColors.js      # colores por empresa
```

---

## 🗃️ Base de Datos Supabase

**Tabla**: `resultados_verificados`

**Columnas relevantes**:
- `loteria` — nombre de la empresa (ej: `"Leidsa"`)
- `sorteo` — nombre exacto del sorteo (case-sensitive, ver abajo)
- `fecha` — formato `YYYY-MM-DD`
- `numeros` — array de números ganadores
- `tipo` — tipo de sorteo (`quiniela`, `loto-leidsa`, `kino`, etc.)

**Nombres exactos de sorteos (case-sensitive)**:

| Empresa | Sorteo |
|---------|--------|
| Nacional | `Quiniela Lotería Nacional Tarde` |
| Nacional | `Quiniela Lotería Nacional Noche` |
| Nacional | `Juega + Pega +` |
| Leidsa | `Quiniela Leidsa` |
| Leidsa | `Loto Leidsa` |
| Leidsa | `Loto Pool Leidsa` |
| Leidsa | `Pega 3 Más` |
| Leidsa | `Kino Leidsa` |
| Real | `Quiniela Real` |
| Real | `Loto Real` |
| Real | `Loto Pool Real` |
| Loteka | `Quiniela Loteka` |
| Loteka | `Mega Chance` |
| Loteka | `Loto Loteka` |
| La Primera | `Quiniela La Primera Día` |
| La Primera | `Quiniela La Primera Noche` |
| La Primera | `Loto 5+ La Primera` |
| La Suerte | `Quiniela La Suerte 12:30 PM` |
| La Suerte | `Quiniela La Suerte 6:00 PM` |
| Lotedom | `Quiniela LoteDom` |
| Lotedom | `El Quemaíto Mayor` |
| Americanas | `Quiniela New York Tarde` |
| Americanas | `Quiniela New York Noche` |
| Americanas | `Quiniela Florida Día` |
| Americanas | `Quiniela Florida Tarde` |
| Americanas | `Quiniela Florida Noche` |
| Americanas | `Mega Millions` |
| Americanas | `Powerball` ← "b" minúscula |
| Americanas | `Cash 4 Life` |
| King Lottery | `Quiniela King Lottery Día` |
| King Lottery | `Quiniela King Lottery Noche` |
| Anguila | `Quiniela Anguila 10:00 AM` |
| Anguila | `Quiniela Anguila 1:00 PM` |
| Anguila | `Quiniela Anguila 6:00 PM` |
| Anguila | `Quiniela Anguila 9:00 PM` |

---

## 🎯 Lógica de Datos

### fetchQuinielas() — 20 sorteos de quiniela
- Orden definido en `QUINIELAS_ORDEN` (supabaseMapper.js)
- Hoy: fetch últimos resultados, color verde si `fecha === hoy`
- Fecha pasada: fetch solo esa fecha, color gris siempre

### fetchTodosSorteos() — 35 sorteos (quinielas + lotos)
- Orden definido en `TODOS_SORTEOS_ORDEN` (supabaseMapper.js)
- Misma lógica de colores que fetchQuinielas

### fetchHistorial() — para SorteoDetail
- Últimos N resultados de un sorteo específico
- Color verde = hoy, gris = cualquier otra fecha

### Orden de loterías (1–10)
1. Nacional · 2. Leidsa · 3. Real · 4. Loteka · 5. La Primera
6. La Suerte · 7. LoteDom · 8. Americanas · 9. King Lottery · 10. Anguila

---

## 📺 Google AdSense

- **Publisher ID**: `ca-pub-1957659439174188`
- **ads.txt**: `public/ads.txt` → `google.com, pub-1957659439174188, DIRECT, f08c47fec0942fa0`
- **Config**: `src/config/adsense.js`
- **Activar**: cambiar `ADSENSE_APPROVED = false` → `true` y reemplazar slots con IDs reales
- **Comportamiento**: `AdBanner` retorna `null` mientras `ADSENSE_APPROVED = false` (policy compliant)

---

## 🔍 SEO

### Componentes SEO
- `SEO.jsx` — meta tags dinámicos (title, description, og:*, canonical)
- `FAQSchema.jsx` — JSON-LD `FAQPage` para Google Rich Results
- `public/robots.txt` — permite todo excepto `/admin`
- `public/sitemap.xml` — 7 URLs principales

### Páginas enriquecidas (1400–1900 palabras)
- `/quinielas` — guía completa, horarios, tipos de jugada, FAQ (6 preguntas)
- `/otros-sorteos` — lotos, kino, americanas, jackpots, FAQ (5 preguntas)
- `/loterias` — perfiles de 7 loterías dominicanas + 3 extranjeras, FAQ (5 preguntas)

### Pendiente SEO
- `og:image` no configurado (alta prioridad — mejora clicks en redes sociales)
- `sitemap.xml` usa `lastmod: 2026-04-04` (actualizar después de cambios de contenido)

---

## 🖼️ Logos

- **Ruta**: `src/assets/logos/` (22 archivos PNG)
- **Mapa por empresa**: `LOGOS_EMPRESA` en `src/utils/logos.js`
- **Mapa por sorteo**: `LOGOS_SORTEO` en `src/utils/logos.js`

---

## 🎨 BallsDisplay — Tipos soportados

`quiniela`, `pega3`, `kino`, `loto-leidsa`, `loto-loteka`, `lotopool`,
`loto-real`, `loto5plus`, `megamillions`, `powerball`, `cash4life`,
`quemaito`, `jugamas`, `megachance`

---

## 🐛 Bugs Conocidos / Pendientes

- Ajustar posición del badge "multiplicador" en Powerball (mover arriba levemente)
- Testear: navegación en historial, botones "compartir"/"avisame", reload de página

---

## 📦 Historial de Commits Recientes

```
62394d1  Agregar Schema.org FAQPage (FAQSchema.jsx + 3 páginas)
0b3a443  Enriquecer página /loterias
bc52785  Enriquecer página /otros-sorteos + /quinielas
678044a  Add ads.txt and refactor AdBanner component
db5ef5f  Primer commit
```
