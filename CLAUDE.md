# CLAUDE.md — QuinielaRD

Memoria persistente del proyecto para Claude Code.
Última actualización: 2026-04-23 (refinamiento visual — banners Quinielas, shadows, bolas 60px, stagger)

---

## 🗂️ Identificación del Proyecto

- **Ruta activa**: `C:/Projects/quiniela-rd`
- **Copia de respaldo** (no usar): `C:/Users/delun/OneDrive/Desktop/quiniela-rd`
- **GitHub remote**: `origin main` (NO `master`)
- **Deploy**: Cloudflare Pages (`npx wrangler pages deploy dist`)
- **URL producción**: `https://quinielard.com`

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite 5 + Tailwind CSS 3 |
| Router | react-router-dom v6 |
| SEO | react-helmet-async |
| Backend | Supabase (PostgreSQL) |
| Scraper | n8n self-hosted |
| Deploy | Cloudflare Pages |
| Anuncios | Google AdSense `ca-pub-1957659439174188` |
| Email | Cloudflare Email Routing → `contacto@quinielard.com` |

---

## ⚡ Comandos Frecuentes

```bash
# Desarrollo
npm run dev                          # localhost:5173

# Producción
npm run build                        # → dist/
npx wrangler pages deploy dist       # deploy a Cloudflare Pages

# og:image (regenerar si cambia el diseño)
node tools/generate-og-image.mjs    # → public/og-image.png (1200x630)

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
│   ├── Breadcrumbs.jsx      # breadcrumbs visuales + Schema.org BreadcrumbList
│   ├── DateFilter.jsx       # filtro de fecha
│   ├── FAQSchema.jsx        # JSON-LD FAQPage para Google Rich Results
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── LotteryCard.jsx      # tarjeta principal de resultado
│   ├── LotteryLogo.jsx
│   ├── Modal.jsx
│   ├── NumberBall.jsx
│   ├── ResultsGrid.jsx      # grid de LotteryCards, agrupa por empresa
│   ├── SEO.jsx              # meta tags dinámicos via Helmet (incl. og:image)
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

public/
├── ads.txt                  # Google AdSense verification
├── favicon.svg
├── og-image.png             # 1200x630, ~280KB — generado con Puppeteer
├── robots.txt
└── sitemap.xml              # 6 URLs, lastmod 2026-04-21

tools/                       # utilidades del proyecto (no se sirven al público)
├── og-image.html            # fuente del diseño del og:image (editable)
└── generate-og-image.mjs    # script Puppeteer para regenerar el PNG
```

---

## 🗃️ Base de Datos Supabase

**Proyecto:** `wpxwtxfgwavoijyyivwl`
**URL:** `https://wpxwtxfgwavoijyyivwl.supabase.co`

### Tablas principales

#### `resultados_verificados` — producción ✅
- **Filas:** ~2,640 (crece constantemente)
- **RLS:** Activado
- **Columnas clave:** `loteria`, `sorteo`, `fecha`, `numeros_principales`, `numeros_extras`, `multiplicador`, `estado_validacion`, `stable_key`, `prioridad`
- **IMPORTANTE:** `numeros` y `tipo` NO existen → usar `numeros_principales` y `estado_validacion`

#### `resultados_loterias` — raw scraper
- **Filas:** ~3,276 | **RLS:** Desactivado | No consumida por el frontend

**Flujo:** `resultados_loterias` → validación n8n → `resultados_verificados`

**Nombres exactos de sorteos (case-sensitive):** Ver tabla completa en sesión anterior o en supabaseMapper.js. Los 35 sorteos incluyen Nacional (3), Leidsa (5), Real (3), Loteka (3), La Primera (3), La Suerte (2), Lotedom (2), Americanas (9), King Lottery (2), Anguila (4).

---

## 🔍 SEO — FASE 3 COMPLETADA AL 100%

### Estado (verificado 2026-04-21)

| Item | Estado |
|------|--------|
| Meta tags dinámicos (SEO.jsx) | ✅ |
| Schema FAQPage (16 preguntas, 3 páginas) | ✅ Validado Google |
| og:image 1200x630 (minimalista agresivo) | ✅ Validado Facebook |
| Twitter Card `summary_large_image` | ✅ |
| Schema BreadcrumbList (5 páginas) | ✅ Validado Google |
| sitemap.xml actualizado (lastmod 2026-04-21) | ✅ |
| robots.txt | ✅ |
| Páginas enriquecidas (1400-1900 palabras) | ✅ 3 páginas |

### Componentes SEO
- `SEO.jsx` — title, description, og:*, twitter:*, canonical + prop `image` con default
- `FAQSchema.jsx` — JSON-LD FAQPage
- `Breadcrumbs.jsx` — nav visual + JSON-LD BreadcrumbList
- `public/og-image.png` — generado con Puppeteer desde `tools/og-image.html`

### og:image
- **Diseño:** minimalista agresivo — eyebrow "RESULTADOS EN VIVO", título "QuinielaRD" 220px, línea "Nacional · Leidsa · Loteka · Real" 44px
- **Regenerar:** `node tools/generate-og-image.mjs` (requiere `puppeteer` devDependency)
- **URL producción:** `https://quinielard.com/og-image.png`

### Breadcrumbs (Breadcrumbs.jsx)
- Páginas integradas: `/quinielas`, `/loterias`, `/otros-sorteos`, `/privacidad`, `/terminos`
- Reemplazó el link "← Volver al inicio" en todas las páginas
- Acepta prop `items: [{ name, url? }]`

### sitemap.xml — 6 URLs
- `/` → priority 1.0, daily
- `/quinielas`, `/loterias`, `/otros-sorteos` → priority 0.9, weekly
- `/privacidad`, `/terminos` → priority 0.3, yearly

### Pendientes SEO (próxima fase)
- `/contacto` y `/sobre-nosotros` — para fortalecer AdSense
- Google Analytics 4 — sin instalar
- `<meta name="google-adsense-account">` — opcional (el script ya carga)

---

## 📺 Google AdSense

- **Publisher ID**: `ca-pub-1957659439174188`
- **ads.txt**: `public/ads.txt` → `google.com, pub-1957659439174188, DIRECT, f08c47fec0942fa0` ✅
- **Script**: cargado en `index.html` con `client=ca-pub-1957659439174188`
- **Config**: `src/config/adsense.js` — `ADSENSE_APPROVED = false`
- **Activar**: cambiar flag a `true` y reemplazar slots con IDs reales
- **Estado revisión**: POSTERGADA — riesgo de bloqueo 6 meses tras 2 rechazos previos
- **Estrategia**: fortalecer con /contacto y /sobre-nosotros antes de solicitar

---

## 📧 Contacto

- **Email**: `contacto@quinielard.com`
- **Servicio**: Cloudflare Email Routing (gratis)
- **Reenvío**: automático a `johndeluna1248@gmail.com`
- **DNS**: MX records + SPF TXT configurados en Cloudflare
- **Estado**: Verificado y funcional
- **Visible en**: Footer (columna "Legal") en todas las páginas
- **Crítico para AdSense**: Google puede contactar por este email

---

## 🔧 MCPs Activos en Claude Code

Configurados en `~/.claude.json` bajo `projects["C:/Projects/quiniela-rd"].mcpServers`

| MCP | Herramientas | Notas |
|-----|-------------|-------|
| `n8n-mcp` | 21 | n8n self-hosted en easypanel |
| `supabase` | 20 | Proyecto `wpxwtxfgwavoijyyivwl` |
| `github` | 26 | Repo `johndeluna1248-ai/quiniela-rd` |
| `cloudflare` | ~15 | Instalado 2026-04-21, token custom |

**Total: ~82 herramientas disponibles**

- **Backup pre-Cloudflare**: `~/.claude.json.backup-cloudflare-20260421`
- **Cloudflare token permisos**: Pages (Edit), Workers Scripts/KV (Edit), Zone/DNS (Read/Edit), Cache Purge
- **Nota n8n**: Existen v1 y v2 de "Loterías - Recopilador" activos — revisar duplicación

---

## 🎯 Lógica de Datos

- `fetchQuinielas()` — 20 sorteos, orden en `QUINIELAS_ORDEN`
- `fetchTodosSorteos()` — 35 sorteos, orden en `TODOS_SORTEOS_ORDEN`
- `fetchHistorial()` — historial de un sorteo para SorteoDetail
- Color verde = hoy (`fecha === hoyRD()`), gris = fecha pasada

**Orden de loterías (1–10):** Nacional · Leidsa · Real · Loteka · La Primera · La Suerte · LoteDom · Americanas · King Lottery · Anguila

---

## 🎨 BallsDisplay — Tipos soportados

`quiniela`, `pega3`, `kino`, `loto-leidsa`, `loto-loteka`, `lotopool`,
`loto-real`, `loto5plus`, `megamillions`, `powerball`, `cash4life`,
`quemaito`, `jugamas`, `megachance`

---

## 🎨 Convenciones de UI

### Cards (`LotteryCard`)
- Elevación vía Tailwind: `shadow-card` + `hover:shadow-card-hover` (definidos en `tailwind.config.js` con tinte slate-900 transparente). NO usar `boxShadow` inline ni handlers JS de hover.
- Borde: `1px solid rgba(15, 23, 42, 0.06)` + `borderLeft: 4px solid {color empresa}` (signature visual).
- Lift de hover: `hover:-translate-y-1` (4px).

### Bolas (`BallsDisplay`)
- **Quinielas** (`tipo === 'quiniela'`): `ballSize=60` — pasado desde `LotteryCard`.
- **Resto** (pega3, megachance, lotos, americanas, jugamas): `48px` default de la vista card.
- **Kino**: `44px` propio. **Quemaíto**: `72px` propio. **SorteoDetail** (historial): `36px` hardcoded.
- `fontSize` del número se ajusta automáticamente al tamaño (tabla en `BallsDisplay.jsx:46-51`).

### Agrupación por compañía (`ResultsGrid`)
- Prop `agruparPorCompania` (bool) → renderiza `SectionHeader` (banner con gradiente + logo) por cada `loteria_orden`.
- Tab **Quinielas** y tab **Todos** agrupan cuando **no hay filtro por empresa**.
- Filtro activo (`?empresa=leidsa`) → una sola compañía → no se agrupa.

### Animación de entrada (stagger)
- Clase: `.stagger-item` en `src/index.css`.
- Delay: `Math.min(i, 10) * 110ms` (cap en i=10 para evitar esperas largas con muchas cards).
- Duración `0.6s`, easing `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutExpo), `translateY(24px)` → `0`.
- Respeta `@media (prefers-reduced-motion: reduce)` → cards aparecen instantáneas.
- **Importante**: la clase Tailwind `animate-fade-in-up` (usada en 17 sitios: páginas, DateFilter, Modal, loading states) es **independiente** — no modificar `tailwind.config.js` al afinar stagger.

---

## 🐛 Bugs Conocidos

- Badge "multiplicador" en Powerball — ajustar posición (mover levemente hacia arriba)
- Testear: navegación historial, botones "compartir"/"avisame", reload

---

## 📦 Historial de Commits

```
e38e29c  Breadcrumbs visuales + Schema.org BreadcrumbList (5 páginas)
41d3746  Sitemap.xml: fechas 2026-04-21 + prioridades ajustadas
e0603f6  og-image optimizado WhatsApp (línea loterías 44px)
f99c63e  og-image inicial: generación Puppeteer + integración SEO.jsx
e431982  CLAUDE.md con memoria persistente del proyecto
62394d1  Schema.org FAQPage (FAQSchema.jsx + 3 páginas)
0b3a443  /loterias enriquecida (~1900 palabras)
bc52785  /otros-sorteos + /quinielas enriquecidas
678044a  ads.txt + AdBanner refactor
db5ef5f  Primer commit (v1.0)
```

---

## ✅ Exactitud del Documento

Verificado contra la base de datos vía Supabase MCP el 2026-04-20.

Columnas confirmadas en `resultados_verificados`:
`id`, `stable_key`, `loteria`, `sorteo`, `fecha`, `numeros_principales`,
`numeros_extras`, `multiplicador`, `estado_validacion`, `coincidencias`,
`fuentes_total`, `fuentes_auditadas`, `adn_por_fuente`, `numeros_texto`,
`prioridad`, `created_at`, `updated_at`
