# QuinielaRD 🎯

Resultados de loterías dominicanas en tiempo real. Construido con React 18 + Vite + Tailwind CSS.

## Instalación

```bash
# 1. Entra a la carpeta del proyecto
cd quiniela-rd

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción en `/dist` |
| `npm run preview` | Vista previa del build de producción |

---

## Estructura del proyecto

```
quiniela-rd/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Barra superior sticky con badge "en vivo"
│   │   ├── DateFilter.jsx    # Filtros de fecha, lotería y búsqueda
│   │   ├── ResultsGrid.jsx   # Grid responsivo de tarjetas
│   │   ├── LotteryCard.jsx   # Tarjeta individual de sorteo
│   │   ├── NumberBall.jsx    # Círculo con número ganador
│   │   └── Modal.jsx         # Modal de notificación
│   ├── pages/
│   │   └── Home.jsx          # Página principal con lógica de filtros
│   ├── data/
│   │   ├── loteriesMock.js   # Lista de loterías dominicanas
│   │   └── resultsMock.js    # Sorteos mock del día (~35 sorteos)
│   ├── App.jsx               # Router + Header
│   └── index.css             # Tailwind + estilos globales
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Cómo conectar Supabase

### 1. Instala el cliente de Supabase

```bash
npm install @supabase/supabase-js
```

### 2. Crea el archivo de cliente

```js
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 3. Crea el archivo `.env.local`

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 4. Reemplaza el mock en `Home.jsx`

Busca el comentario `// TODO: Reemplazar mock con Supabase` y descomenta:

```js
import { supabase } from '../lib/supabase'

// Dentro de useEffect:
const { data, error } = await supabase
  .from('resultados_verificados')
  .select('*')
  .eq('fecha', fecha)
  .order('hora', { ascending: true })

if (!error) setResultados(data)
```

### 5. Estructura de la tabla en Supabase

```sql
create table resultados_verificados (
  id            text primary key,
  loteria_id    text not null,
  loteria_nombre text not null,
  loteria_color text not null,
  sorteo        text not null,
  hora          text not null,
  fecha         date not null,
  numeros       text[]  -- null si el sorteo está pendiente
);

-- Índice para queries por fecha
create index on resultados_verificados (fecha);
```

---

## Stack tecnológico

- **React 18** — UI reactiva con hooks
- **Vite 5** — Bundler ultrarrápido con HMR
- **Tailwind CSS 3** — Utility-first CSS
- **React Router v6** — Navegación SPA

---

## Roadmap

- [ ] Integración con Supabase Realtime para actualización automática
- [ ] Página de detalle por lotería (`/loteria/:id`)
- [ ] Historial de resultados por fecha
- [ ] Sistema de notificaciones (Email / WhatsApp)
- [ ] PWA para instalar en móvil
