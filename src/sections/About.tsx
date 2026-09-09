import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '@/src/components/SectionLabel';
import { Photo } from '@/src/components/Photo';
import { gallery } from '@/src/data/gallery';
export function About() {
  const media = gallery[0];
  return (
    <section id="sobre" className="section about-section">
      <SectionLabel number="01">NOSSA ESSÊNCIA</SectionLabel>
      <div className="about-grid">
        <div className="about-copy">
          <h2>
            O instinto é<br />
            potiguar.
            <br />
            <em>
              O voo, sem
              <br />
              limites.
            </em>
          </h2>
          <p>
            Somos a Carcará Lux. Uma equipe do Rio Grande do Norte que
            transforma curiosidade em projeto, ideias em movimento e trabalho em
            equipe em presença na pista.
          </p>
          <p className="muted">
            Na STEM Racing, engenharia, aerodinâmica, design e comunicação se
            encontram. Cada detalhe faz parte de uma mesma ambição: ir além.
          </p>
          <a className="text-link" href="#pessoas">
            As pessoas por trás do carro <ArrowUpRight size={18} />
          </a>
        </div>
        <figure className="about-photo">
          <Photo src={media.src} alt={media.alt} />
          <div className="photo-tag">
            <span>RN / BR</span>
            <span>É DAQUI QUE A GENTE VEM.</span>
          </div>
          <figcaption>
            {media.credit}
            <a href={media.source?.url} target="_blank" rel="noreferrer">
              Registro de 2026 ↗
            </a>
          </figcaption>
        </figure>
      </div>
      <div className="identity-strip">
        <span>ENGENHARIA</span>
        <i />
        <span>IDENTIDADE</span>
        <i />
        <span>COMPETIÇÃO</span>
        <i />
        <span>CARCARÁ LUX</span>
      </div>
    </section>
  );
}
