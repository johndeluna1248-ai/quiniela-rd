/**
 * Privacidad.jsx
 * Política de Privacidad de QuinielaRD.
 */
import Breadcrumbs from '../components/Breadcrumbs'
import SEO from '../components/SEO'

const Privacidad = () => (
  <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in-up">
    <SEO
      title="Política de Privacidad | QuinielaRD"
      description="Política de privacidad de QuinielaRD. Información sobre el uso de cookies, Google AdSense y datos recopilados en nuestro sitio de resultados de loterías dominicanas."
      canonical="https://quinielard.com/privacidad"
    />

    <div>
      <Breadcrumbs items={[
        { name: 'Inicio', url: '/' },
        { name: 'Política de Privacidad' }
      ]} />
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Política de Privacidad</h1>
      <p className="text-sm text-gray-500 mt-1">Última actualización: abril 2026</p>
    </div>

    <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 sm:p-8 space-y-6 text-gray-700 text-sm leading-relaxed">

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">1. Información General</h2>
        <p>
          QuinielaRD (<strong>quinielard.com</strong>) es un sitio web informativo que muestra
          resultados de loterías dominicanas recopilados de fuentes públicas. No somos un sitio
          oficial de ninguna lotería ni vendemos boletos o participaciones.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">2. Datos que Recopilamos</h2>
        <p>QuinielaRD no solicita registro ni recopila datos personales directamente. Sin embargo, podemos recopilar de forma automática:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Información técnica del navegador (tipo, versión, idioma)</li>
          <li>Dirección IP y ubicación geográfica aproximada</li>
          <li>Páginas visitadas, tiempo de permanencia y patrones de navegación</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">3. Cookies y Tecnologías de Seguimiento</h2>
        <p>Utilizamos cookies propias y de terceros para:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Garantizar el correcto funcionamiento del sitio</li>
          <li>Analizar el tráfico y comportamiento de los usuarios</li>
          <li>Mostrar publicidad personalizada a través de Google AdSense</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">4. Google AdSense y Publicidad</h2>
        <p>
          Este sitio utiliza <strong>Google AdSense</strong> para mostrar anuncios. Google y sus
          socios publicitarios pueden utilizar cookies para mostrar anuncios basados en visitas
          previas a este u otros sitios web. Puedes optar por desactivar la publicidad
          personalizada visitando la{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"
            className="text-primary hover:underline font-medium">
            configuración de anuncios de Google
          </a>.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">5. Uso de la Información</h2>
        <p>La información recopilada se utiliza exclusivamente para:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Mejorar la experiencia del usuario en el sitio</li>
          <li>Analizar tendencias de uso y rendimiento</li>
          <li>Mostrar contenido publicitario relevante</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">6. Terceros</h2>
        <p>
          No vendemos, intercambiamos ni transferimos información personal a terceros. Esto no
          incluye socios de confianza que nos ayudan a operar el sitio (como Google), siempre que
          estas partes acuerden mantener esta información confidencial.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">7. Cambios a esta Política</h2>
        <p>
          Nos reservamos el derecho de actualizar esta política en cualquier momento. Los cambios
          se publicarán en esta misma página con la fecha de actualización correspondiente.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">8. Contacto</h2>
        <p>
          Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en:{' '}
          <a href="mailto:contacto@quinielard.com" className="text-primary hover:underline font-medium">
            contacto@quinielard.com
          </a>
        </p>
      </section>

    </div>
  </main>
)

export default Privacidad
