import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '@/src/components/SectionLabel';
import { Photo } from '@/src/components/Photo';
import { team } from '@/src/data/team';
import { site } from '@/src/data/site';
export function People() {
  return (
    <section id="pessoas" className="section people-section">
      <SectionLabel number="04">QUEM FAZ ACONTECER</SectionLabel>
      <div className="section-heading">
        <h2>
          Nenhum voo
          <br />
          se faz <em>sozinho.</em>
        </h2>
        <p>
          Antes de um carro, uma equipe.
          <br />
          Pessoas que somam perspectivas e<br />
          aprendem a construir juntas.
        </p>
      </div>
      {team.length ? (
        <div className="member-grid">
          {team.map((m) => (
            <article className="member" key={m.id}>
              {m.photo ? (
                <Photo src={m.photo} alt={m.name} />
              ) : (
                <div className="member-placeholder">Retrato em breve</div>
              )}
              <div>
                <span className="eyebrow">{m.role}</span>
                <h3>{m.name}</h3>
                <p>{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="roster-pending">
          <span className="roster-mark" aria-hidden="true">
            CL<span>+</span>
          </span>
          <div>
            <span className="eyebrow orange">ELENCO ATUAL</span>
            <h3>Novas histórias. Os mesmos laços.</h3>
            <p>
              Os perfis e as funções dos integrantes serão apresentados após a
              confirmação da equipe.
            </p>
            <a
              className="text-link"
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
            >
              Conheça nosso dia a dia <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
