import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

/**
 * Breadcrumbs.jsx
 * Componente reutilizable que renderiza:
 * 1. Navegación visual tipo breadcrumbs (para usuarios)
 * 2. Schema.org BreadcrumbList en JSON-LD (para Google)
 *
 * @param {Array} items - Array de objetos { name, url }
 *   El último item NO debe tener url (es la página actual)
 *
 * Ejemplo de uso:
 *   <Breadcrumbs items={[
 *     { name: 'Inicio', url: '/' },
 *     { name: 'Quinielas' }  // sin url = página actual
 *   ]} />
 */
const Breadcrumbs = ({ items = [] }) => {
  // Si no hay items o solo hay uno, no renderiza nada
  if (!items || items.length < 2) return null

  // Construye el schema BreadcrumbList siguiendo spec de Schema.org
  // https://schema.org/BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      // Solo incluye item (URL) si no es el último (página actual)
      ...(item.url && {
        "item": item.url.startsWith('http')
          ? item.url
          : `https://quinielard.com${item.url}`
      })
    }))
  }

  return (
    <>
      {/* Schema JSON-LD para Google Rich Results */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Navegación visual tipo breadcrumbs */}
      <nav
        aria-label="Navegación de migas de pan"
        className="mb-6"
      >
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={index} className="flex items-center gap-2">
                {/* Separador "›" entre items (excepto antes del primero) */}
                {index > 0 && (
                  <span className="text-gray-400" aria-hidden="true">
                    ›
                  </span>
                )}

                {/* Si es el último item, mostrar como texto (no link) */}
                {isLast ? (
                  <span
                    className="font-semibold text-gray-900"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.url}
                    className="text-primary hover:underline transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumbs
