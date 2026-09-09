import { ArrowUpRight } from 'lucide-react';
import { achievements } from '@/src/data/achievements';
export function Achievements() {
  return (
    <section
      className="achievement-section"
      aria-label="Resultados comprovados"
    >
      {achievements.map((a) => (
        <div className="achievement" key={a.id}>
          <div>
            <span className="eyebrow">
              QUANDO A ENGENHARIA ENCONTRA A PISTA
            </span>
            <div className="achievement-result">
              <span className="achievement-number">{a.number}</span>
              <div>
                <h2>{a.title}</h2>
                <p>{a.detail}</p>
              </div>
            </div>
          </div>
          <div className="achievement-side">
            <span>{a.year}</span>
            <a href={a.source.url} target="_blank" rel="noreferrer">
              Ver resultado oficial <ArrowUpRight size={17} />
            </a>
            <small>
              Categoria de velocidade.
              <br />
              Não representa a classificação geral.
            </small>
          </div>
        </div>
      ))}
    </section>
  );
}
