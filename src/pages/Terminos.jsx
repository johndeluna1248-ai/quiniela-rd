/**
 * Terminos.jsx
 * Términos de Uso de QuinielaRD.
 */
import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import SEO from '../components/SEO'

const Terminos = () => (
  <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in-up">
    <SEO
      title="Términos de Uso | QuinielaRD"
      description="Términos y condiciones de uso de QuinielaRD, sitio informativo de resultados de loterías dominicanas."
      canonical="https://quinielard.com/terminos"
    />

    <div>
      <Breadcrumbs items={[
        { name: 'Inicio', url: '/' },
        { name: 'Términos y Condiciones' }
      ]} />
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Términos de Uso</h1>
      <p className="text-sm text-gray-500 mt-1">Última actualización: abril 2026</p>
    </div>

    <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 sm:p-8 space-y-6 text-gray-700 text-sm leading-relaxed">

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">1. Aceptación de los Términos</h2>
        <p>
          Al acceder y utilizar QuinielaRD (<strong>quinielard.com</strong>), aceptas cumplir con
          estos términos de uso. Si no estás de acuerdo con alguno de ellos, te pedimos que no
          utilices el sitio.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">2. Naturaleza del Servicio</h2>
        <p>
          QuinielaRD es un sitio web informativo que muestra resultados de loterías dominicanas
          recopilados de fuentes públicas. <strong>No somos un sitio oficial</strong> de ninguna
          lotería dominicana ni estamos afiliados a ninguna entidad de lotería.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>No vendemos boletos ni participaciones de lotería</li>
          <li>No aceptamos apuestas ni pagos de ningún tipo</li>
          <li>No garantizamos premios ni resultados</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">3. Exactitud de la Información</h2>
        <p>
          Hacemos nuestro mejor esfuerzo para mostrar resultados correctos y actualizados. Sin
          embargo, los resultados mostrados son de carácter informativo y <strong>no tienen
          validez oficial</strong>. Para verificar resultados oficiales, consulta directamente
          con la lotería correspondiente.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">4. Limitación de Responsabilidad</h2>
        <p>
          QuinielaRD no será responsable por daños directos, indirectos, incidentales o
          consecuentes que surjan del uso o la imposibilidad de uso de este sitio, incluyendo
          pero no limitándose a:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Errores o inexactitudes en los resultados mostrados</li>
          <li>Interrupciones del servicio o problemas técnicos</li>
          <li>Decisiones tomadas basándose en la información del sitio</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">5. Publicidad</h2>
        <p>
          Este sitio utiliza <strong>Google AdSense</strong> para mostrar anuncios publicitarios.
          Estos anuncios pueden utilizar cookies para personalizar el contenido mostrado. Al
          utilizar el sitio, aceptas la presencia de publicidad y el uso de cookies asociadas.
          Consulta nuestra{' '}
          <Link to="/privacidad" className="text-primary hover:underline font-medium">
            Política de Privacidad
          </Link>{' '}
          para más detalles.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">6. Propiedad Intelectual</h2>
        <p>
          El diseño, logotipo y contenido original de QuinielaRD están protegidos por derechos de
          autor. Los nombres y logotipos de las loterías pertenecen a sus respectivos propietarios
          y se utilizan con fines informativos.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">7. Uso Aceptable</h2>
        <p>Al utilizar QuinielaRD, te comprometes a:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>No utilizar el sitio con fines ilegales</li>
          <li>No intentar acceder de forma no autorizada a los sistemas del sitio</li>
          <li>No realizar scraping masivo o automatizado sin autorización</li>
          <li>No reproducir el contenido del sitio sin permiso</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">8. Modificaciones</h2>
        <p>
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Las
          modificaciones entrarán en vigor al ser publicadas en esta página. El uso continuado
          del sitio después de los cambios constituye la aceptación de los nuevos términos.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">9. Contacto</h2>
        <p>
          Para cualquier consulta sobre estos términos, escríbenos a:{' '}
          <a href="mailto:contacto@quinielard.com" className="text-primary hover:underline font-medium">
            contacto@quinielard.com
          </a>
        </p>
      </section>

    </div>
  </main>
)

export default Terminos
