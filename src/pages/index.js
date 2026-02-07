import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function Hero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroTagline}>{siteConfig.tagline}</p>
          <p className={styles.heroLead}>
            Apuntes y recursos para docentes: flujo completo desde Markdown
            hasta web, PDF y presentaciones Reveal.js.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.ctaPrimary} to="/docs/apuntes">
              Ver apuntes
            </Link>
            <Link className={styles.ctaGhost} to="/reveal/index.html">
              Ver presentacion
            </Link>
            <Link className={styles.ctaGhost} to="/pdf/apuntes.pdf">
              Descargar PDF
            </Link>
          </div>
          <div className={styles.heroMeta}>
            GitHub Pages · Docusaurus · Reveal.js · Markdown
          </div>
        </div>
        <div className={styles.heroCard}>
          <div className={styles.cardHeader}>Ruta rapida</div>
          <ol className={styles.cardList}>
            <li>Lee los apuntes</li>
            <li>Explora la presentacion</li>
            <li>Descarga el PDF</li>
            <li>Publica en GitHub Pages</li>
          </ol>
          <div className={styles.cardFooter}>
            Repositorio: bealopc/cursovibecoding
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Apuntes Vibe Coding con Markdown, Docusaurus, PDF y Reveal.js">
      <Hero />
      <main>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Heading as="h2">Contenido en una sola fuente</Heading>
            <p>
              El Markdown es la base: desde ahi se generan la web, el PDF y las
              diapositivas.
            </p>
          </div>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureTitle}>Docs</div>
              <div className={styles.featureText}>
                Navegacion por bloques, tablas y pasos guiados en Docusaurus.
              </div>
              <Link className={styles.cardLink} to="/docs/apuntes">
                Ir a apuntes
              </Link>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureTitle}>PDF</div>
              <div className={styles.featureText}>
                Descarga directa para compartir o imprimir.
              </div>
              <Link className={styles.cardLink} to="/pdf/apuntes.pdf">
                Descargar PDF
              </Link>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureTitle}>Reveal.js</div>
              <div className={styles.featureText}>
                Presentacion web lista para aula.
              </div>
              <Link className={styles.cardLink} to="/reveal/index.html">
                Abrir presentacion
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.sectionHeader}>
            <Heading as="h2">Flujo recomendado</Heading>
            <p>Un proceso simple y repetible para docentes.</p>
          </div>
          <div className={styles.timeline}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <div>
                <div className={styles.stepTitle}>Estructura</div>
                <div className={styles.stepText}>
                  Crea apuntes en Markdown y manten una fuente unica.
                </div>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <div>
                <div className={styles.stepTitle}>Publica</div>
                <div className={styles.stepText}>
                  Genera la web con Docusaurus y sube a GitHub Pages.
                </div>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <div>
                <div className={styles.stepTitle}>Reutiliza</div>
                <div className={styles.stepText}>
                  Produce PDF y presentaciones Reveal.js desde el mismo origen.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Heading as="h2">Accesos directos</Heading>
            <p>Todo en un clic para el aula o el equipo.</p>
          </div>
          <div className={styles.quickLinks}>
            <Link className={styles.quickBtn} to="/docs/apuntes">
              Abrir apuntes
            </Link>
            <Link className={styles.quickBtn} to="/reveal/index.html">
              Iniciar presentacion
            </Link>
            <Link className={styles.quickBtn} to="/pdf/apuntes.pdf">
              Descargar PDF
            </Link>
            <a className={styles.quickBtn} href="https://github.com/bealopc/cursovibecoding">
              Ver repositorio
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
