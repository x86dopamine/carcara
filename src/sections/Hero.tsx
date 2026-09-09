'use client';
import { useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { site } from '@/src/data/site';
import { CarViewport } from '@/src/three/CarViewport';
import { useCarScrollController } from '@/src/three/CarScrollController';
export function Hero() {
  const section = useRef<HTMLElement>(null),
    progress = useCarScrollController(section);
  return (
    <section ref={section} id="inicio" className="hero-runway">
      <div className="hero-stage">
        <div className="hero-kicker">
          <span>
            <i className="status-dot" /> POTÊNCIA POTIGUAR.
          </span>
          <span>RIO GRANDE DO NORTE — BRASIL</span>
        </div>
        <div className="hero-heading">
          <h1>
            CARCARÁ <em>LUX</em>
          </h1>
          <div className="hero-intro">
            <p>
              Engenharia que
              <br />
              ganha asas.
            </p>
            <span>Da primeira ideia ao último milésimo.</span>
          </div>
        </div>
        <div className="hero-visual">
          <CarViewport progress={progress} />
        </div>
        <div className="hero-side-note">
          FEITO DE IDEIAS. MOVIDO POR DESAFIOS.
        </div>
        <div className="hero-bottom">
          <a className="scroll-link" href="#sobre">
            <span className="round-arrow">
              <ArrowDown size={18} />
            </span>
            CONHEÇA NOSSO VOO
          </a>
          <span className="concept-caption">{site.car.label}</span>
          <a href="#engenharia" className="text-link">
            Explore a engenharia <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="hero-rule">
          <span />
        </div>
      </div>
    </section>
  );
}
