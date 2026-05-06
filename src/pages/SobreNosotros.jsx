import Breadcrumbs from '../components/Breadcrumbs'
import SEO from '../components/SEO'

const SobreNosotros = () => (
  <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in-up">
    <SEO
      title="Sobre Nosotros | QuinielaRD — Resultados de Loterías Dominicanas"
      description="Conoce más sobre QuinielaRD, tu fuente confiable de resultados de loterías dominicanas en tiempo real. Descubre cómo recopilamos y publicamos los sorteos."
      canonical="https://quinielard.com/sobre-nosotros"
    />

    <div>
      <Breadcrumbs items={[
        { name: 'Inicio', url: '/' },
        { name: 'Sobre Nosotros' }
      ]} />
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Sobre Nosotros</h1>
      <p className="text-sm text-gray-500 mt-1">Conoce QuinielaRD</p>
    </div>

    <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 sm:p-8 space-y-6 text-gray-700 text-sm leading-relaxed">

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">¿Qué es QuinielaRD?</h2>
        <p>
          <strong>QuinielaRD</strong> es un sitio web dominicano que consolida los resultados de
          las principales loterías del país en un solo lugar. Nació con el objetivo de ofrecer una
          experiencia rápida, clara y sin complicaciones para quienes buscan los números ganadores
          del día.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">¿Qué loterías cubrimos?</h2>
        <p>
          Publicamos <strong>33 sorteos</strong> de las principales loterías dominicanas e internacionales:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
          {[
            { empresa: 'Lotería Nacional', sorteos: 'Quiniela Tarde, Quiniela Noche, Juega + Pega +' },
            { empresa: 'Leidsa', sorteos: 'Quiniela, Loto, Loto Pool, Pega 3 Más, Kino' },
            { empresa: 'Lotería Real', sorteos: 'Quiniela Real, Loto Real, Loto Pool Real' },
            { empresa: 'Loteka', sorteos: 'Quiniela, Loto Loteka, Mega Chance' },
            { empresa: 'La Primera', sorteos: 'Quiniela Día, Quiniela Noche, Loto 5+' },
            { empresa: 'La Suerte', sorteos: 'Quiniela 12:30 PM, Quiniela 6:00 PM' },
            { empresa: 'LoteDom', sorteos: 'Quiniela LoteDom, El Quemaíto Mayor' },
            { empresa: 'King Lottery', sorteos: 'Quiniela Día, Quiniela Noche' },
            { empresa: 'Anguila', sorteos: '4 sorteos diarios (10 AM, 1 PM, 6 PM, 9 PM)' },
            { empresa: 'New York', sorteos: 'Quiniela Tarde, Quiniela Noche' },
            { empresa: 'Florida', sorteos: 'Quiniela Tarde, Quiniela Noche' },
            { empresa: 'Americanas', sorteos: 'Powerball, Mega Millions' },
          ].map(({ empresa, sorteos }) => (
            <div key={empresa} className="flex flex-col py-1 border-b border-gray-100 last:border-0">
              <span className="font-semibold text-gray-800">{empresa}</span>
              <span className="text-gray-500">{sorteos}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">¿Cómo obtenemos los resultados?</h2>
        <p>
          Los resultados son recopilados automáticamente de las fuentes oficiales públicas de cada
          lotería mediante sistemas automatizados. Esto nos permite publicarlos poco después de que
          se transmiten oficialmente. Si detectas algún error o retraso, puedes{' '}
          <a href="/contacto" className="text-primary hover:underline font-medium">contactarnos</a>.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">Nuestra misión</h2>
        <p>
          Ser la referencia más confiable y accesible para los dominicanos que siguen los resultados
          de loterías. Mantenemos el sitio simple, rápido y sin necesidad de registro ni datos
          personales.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900">Aviso legal</h2>
        <p>
          QuinielaRD no es un sitio oficial de ninguna lotería ni empresa relacionada. No vendemos
          boletos, participaciones ni garantizamos la exactitud de los resultados mostrados. La
          información publicada tiene fines exclusivamente informativos.
        </p>
      </section>

    </div>
  </main>
)

export default SobreNosotros
