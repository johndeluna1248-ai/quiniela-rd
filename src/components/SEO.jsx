/**
 * SEO.jsx
 * Componente reutilizable para meta tags dinámicos con react-helmet-async.
 */
import { Helmet } from 'react-helmet-async'

const SEO = ({ title, description, keywords, canonical }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {keywords && <meta name="keywords" content={keywords} />}
    {canonical && <link rel="canonical" href={canonical} />}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {canonical && <meta property="og:url" content={canonical} />}
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </Helmet>
)

export default SEO
