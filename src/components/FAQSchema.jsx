import { Helmet } from 'react-helmet-async'

/**
 * FAQSchema.jsx
 * Componente que genera el schema.org FAQPage en formato JSON-LD
 * para que Google pueda mostrar las preguntas frecuentes como rich snippets
 * directamente en los resultados de búsqueda.
 *
 * @param {Array} faqs - Array de objetos con pregunta y respuesta
 * Ejemplo: [{ pregunta: "¿...?", respuesta: "..." }]
 */
const FAQSchema = ({ faqs = [] }) => {
  // Si no hay preguntas, no renderiza nada (evita schemas vacíos)
  if (!faqs || faqs.length === 0) return null

  // Construye el objeto JSON-LD siguiendo la especificación de schema.org
  // https://schema.org/FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.pregunta,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.respuesta
      }
    }))
  }

  // Inyecta el script JSON-LD en el <head> de la página usando Helmet
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  )
}

export default FAQSchema
