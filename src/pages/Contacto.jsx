import Breadcrumbs from '../components/Breadcrumbs'
import SEO from '../components/SEO'

const Contacto = () => (
  <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in-up">
    <SEO
      title="Contacto | QuinielaRD — Loterías Dominicanas"
      description="Contáctanos si tienes preguntas, sugerencias o quieres reportar algún error en los resultados de loterías dominicanas en QuinielaRD."
      canonical="https://quinielard.com/contacto"
    />

    <div>
      <Breadcrumbs items={[
        { name: 'Inicio', url: '/' },
        { name: 'Contacto' }
      ]} />
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Contacto</h1>
      <p className="text-sm text-gray-500 mt-1">Estamos para ayudarte</p>
    </div>

    <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 sm:p-8 space-y-6 text-gray-700 text-sm leading-relaxed">

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">¿Tienes alguna pregunta o sugerencia?</h2>
        <p>
          Puedes escribirnos directamente al correo y con gusto te respondemos. QuinielaRD es un
          proyecto independiente y valoramos cada comentario de nuestra comunidad.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Correo electrónico</h2>
        <a
          href="mailto:contacto@quinielard.com"
          className="inline-flex items-center gap-3 bg-primary/5 border border-primary/20 text-primary font-semibold rounded-xl px-5 py-3 hover:bg-primary/10 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          contacto@quinielard.com
        </a>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">¿Encontraste un error en los resultados?</h2>
        <p>
          Si notaste un resultado incorrecto o faltante, por favor indícanos la lotería, la
          fecha y el número que crees que está mal. Lo revisamos y corregimos lo antes posible.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">Aviso importante</h2>
        <p>
          QuinielaRD es un sitio informativo. No somos un sitio oficial de ninguna lotería,
          no vendemos boletos ni participaciones. Los resultados se recopilan de fuentes públicas
          y pueden tener un breve retraso respecto a la transmisión oficial.
        </p>
      </section>

    </div>
  </main>
)

export default Contacto
