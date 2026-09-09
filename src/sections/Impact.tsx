import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '@/src/components/SectionLabel';
import { Photo } from '@/src/components/Photo';
import { projects } from '@/src/data/projects';
export function Impact() {
  return (
    <section id="impacto" className="section impact-section">
      <SectionLabel number="05">ALÉM DA PISTA</SectionLabel>
      <div className="section-heading">
        <h2>
          O que nos move
          <br />
          <em>vai mais longe.</em>
        </h2>
        <p>
          Ideias ganham força quando
          <br />
          encontram outras pessoas.
        </p>
      </div>
      {projects.map((p) => (
        <article className="impact-project" key={p.id}>
          <figure>
            {p.image ? (
              <Photo
                src={p.image}
                alt="Encontro de profissionais técnicas industriais do RN com participação de integrantes da Carcará Lux"
              />
            ) : (
              <div className="photo-unavailable">
                Fotografia do projeto em breve.
              </div>
            )}
            <figcaption>
              Registro do encontro · {p.year} · Fonte: FIERN
            </figcaption>
          </figure>
          <div>
            <span className="eyebrow">EDUCAÇÃO / MULHERES NA INDÚSTRIA</span>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            {p.source && (
              <a
                className="text-link"
                href={p.source.url}
                target="_blank"
                rel="noreferrer"
              >
                Conheça essa história <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
