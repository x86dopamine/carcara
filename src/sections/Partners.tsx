/* oxlint-disable next/no-img-element -- Images are locally optimized WebP with responsive sources; no runtime image service is needed. */
import { ArrowUpRight, Camera } from 'lucide-react';
import { SectionLabel } from '@/src/components/SectionLabel';
import { Brand } from '@/src/components/Brand';
import { partners } from '@/src/data/partners';
import { site } from '@/src/data/site';
export function Partners() {
  return (
    <>
      <section id="parceiros" className="section partners-section">
        <SectionLabel number="07">QUEM ACELERA COM A GENTE</SectionLabel>
        <div className="section-heading">
          <h2>
            Grandes voos.
            <br />
            <em>Conexões reais.</em>
          </h2>
          <p>
            Investir em jovens talentos é<br />
            ajudar a construir o que vem depois.
          </p>
        </div>
        {partners.length ? (
          <div className="partner-logos">
            {partners.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className={p.background === 'light' ? 'logo-light' : ''}
              >
                <img src={p.logo} alt={p.name} loading="lazy" />
              </a>
            ))}
          </div>
        ) : (
          <p className="partners-pending">
            <span className="status-dot" />
            Espaço reservado aos parceiros oficiais. Relação em atualização.
          </p>
        )}
        <a
          className="sponsor-cta"
          href={site.instagram}
          target="_blank"
          rel="noreferrer"
        >
          <span>FAÇA PARTE DO PRÓXIMO CAPÍTULO.</span>
          <ArrowUpRight />
        </a>
      </section>
      <section id="contato" className="section contact-section">
        <div className="contact-top">
          <span className="eyebrow">
            <Camera size={17} /> DIRETO DOS BASTIDORES
          </span>
          <a href={site.instagram} target="_blank" rel="noreferrer">
            @carcaralux <ArrowUpRight size={20} />
          </a>
        </div>
        <a
          className="contact-title"
          href={site.instagram}
          target="_blank"
          rel="noreferrer"
        >
          O PRÓXIMO
          <br />
          <span>
            VOO COMEÇA <em>AQUI.</em>
          </span>
          <ArrowUpRight aria-hidden="true" />
        </a>
        <div className="contact-bottom">
          <p>
            Acompanhe a equipe, conheça os projetos
            <br />
            ou converse sobre uma parceria.
          </p>
          <a
            className="primary-button"
            href={site.email ? `mailto:${site.email}` : site.instagram}
            target={site.email ? undefined : '_blank'}
            rel="noreferrer"
          >
            {site.email ? 'Fale com a Carcará' : 'Converse pelo Instagram'}
            <ArrowUpRight size={19} />
          </a>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-main">
          <a href="#inicio" aria-label="Voltar ao início">
            <Brand />
          </a>
          <p>
            Rio Grande do Norte — Brasil
            <br />
            <span>STEM Racing</span>
          </p>
          <div>
            <a href={site.instagram} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
            <a href="#trajetoria">Nossa trajetória</a>
            <a href="#inicio">Voltar ao topo ↑</a>
          </div>
        </div>
        <div className="footer-note">
          <span>CARCARÁ LUX · ENGENHARIA QUE GANHA ASAS.</span>
          <span>
            Logo oficial aguardando envio · identificação textual provisória.
          </span>
        </div>
        <div className="speed-finish" aria-hidden="true" />
      </footer>
    </>
  );
}
