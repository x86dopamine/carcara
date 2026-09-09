'use client';
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { SectionLabel } from '@/src/components/SectionLabel';
import { Photo } from '@/src/components/Photo';
import { seasons } from '@/src/data/seasons';
import { gallery } from '@/src/data/gallery';
import { CarViewport } from '@/src/three/CarViewport';
export function Journey() {
  const [selected, setSelected] = useState('2020'),
    [details, setDetails] = useState(false);
  const index = seasons.findIndex((s) => s.id === selected),
    current = seasons[index];
  function choose(value: string) {
    setSelected(value);
  }
  const runway = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (
        details ||
        !runway.current ||
        !matchMedia(
          '(min-width: 1101px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)',
        ).matches
      )
        return;
      // Keep keyboard users in control of tabs; scroll never replaces focused content.
      if (runway.current.contains(document.activeElement)) return;
      const rect = runway.current.getBoundingClientRect();
      if (rect.top > 78 || rect.bottom < innerHeight) return;
      const amount = Math.max(
        0,
        Math.min(
          0.999,
          (78 - rect.top) / Math.max(1, rect.height - innerHeight),
        ),
      );
      setSelected(
        seasons[
          Math.min(seasons.length - 1, Math.floor(amount * seasons.length))
        ].id,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      cancelAnimationFrame(frame);
    };
  }, [details]);
  return (
    <section ref={runway} id="trajetoria" className="section journey-section">
      <div className="journey-stage">
        <SectionLabel number="03">NOSSA TRAJETÓRIA</SectionLabel>
        <div className="section-heading">
          <h2>
            O mesmo instinto.
            <br />
            <em>Novos horizontes.</em>
          </h2>
          <p>
            Cada temporada deixa uma marca.
            <br />
            Cada equipe escreve o próximo capítulo.
          </p>
        </div>
        <Tabs
          value={selected}
          onValueChange={(value) => choose(String(value))}
          className="journey-tabs"
        >
          <TabsList className="season-tabs" aria-label="Ano de participação">
            {seasons.map((s) => (
              <TabsTrigger value={s.id} key={s.id} className="season-tab">
                {s.year}
                <span />
              </TabsTrigger>
            ))}
          </TabsList>
          {seasons.map((s) => (
            <TabsContent key={s.id} value={s.id} className="season-panel">
              <div className="season-art">
                <span className="season-year" aria-hidden="true">
                  {s.year}
                </span>
                {s.carModel ? (
                  <CarViewport model={s.carModel} mode="inspect" />
                ) : s.teamImage ? (
                  <Photo
                    key={s.id}
                    src={s.teamImage}
                    alt={`Equipe Carcará Lux — registro de ${s.year}`}
                  />
                ) : (
                  <div className="archive-placeholder">
                    <span className="eyebrow">ACERVO EM CONSTRUÇÃO</span>
                    <span>
                      O registro existe.
                      <br />
                      As imagens chegam em breve.
                    </span>
                  </div>
                )}
                <span className="season-flag">CARCARÁ LUX / {s.year}</span>
              </div>
              <div className="season-copy">
                <span className="eyebrow orange">{s.location}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <span className="season-competition">{s.competition}</span>
                <button className="text-link" onClick={() => setDetails(true)}>
                  Abrir capítulo <ArrowUpRight size={18} />
                </button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="timeline-footer">
          <span>
            Participações documentadas. O acervo completo está em construção.
          </span>
          <div className="arrow-controls">
            <button
              aria-label="Ano anterior"
              disabled={index === 0}
              onClick={() => choose(seasons[index - 1].id)}
            >
              <ArrowLeft size={20} />
            </button>
            <span>
              {String(index + 1).padStart(2, '0')} /{' '}
              {String(seasons.length).padStart(2, '0')}
            </span>
            <button
              aria-label="Próximo ano"
              disabled={index === seasons.length - 1}
              onClick={() => choose(seasons[index + 1].id)}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <Dialog open={details} onOpenChange={setDetails}>
          <DialogContent className="chapter-dialog" showCloseButton={false}>
            <DialogClose className="dialog-x" aria-label="Fechar capítulo">
              <X />
            </DialogClose>
            <span className="eyebrow orange">ARQUIVO / {current.year}</span>
            <DialogTitle className="dialog-title">{current.title}</DialogTitle>
            <DialogDescription>{current.description}</DialogDescription>
            <dl className="chapter-data">
              <div>
                <dt>Competição</dt>
                <dd>{current.competition}</dd>
              </div>
              <div>
                <dt>Local</dt>
                <dd>{current.location}</dd>
              </div>
              <div>
                <dt>Carro</dt>
                <dd>
                  {current.carName || 'Nome e ficha técnica a confirmar.'}
                </dd>
              </div>
              <div>
                <dt>Integrantes</dt>
                <dd>
                  {current.members.length
                    ? current.members.map((m) => m.name).join(', ')
                    : 'Elenco desta temporada a completar.'}
                </dd>
              </div>
              <div>
                <dt>Resultados</dt>
                <dd>
                  {current.results.length
                    ? current.results.join(' ')
                    : 'Resultados não incluídos no acervo disponível.'}
                </dd>
              </div>
              <div>
                <dt>Premiações</dt>
                <dd>
                  {current.awards.length
                    ? current.awards.join(' · ')
                    : 'Premiações a confirmar.'}
                </dd>
              </div>
              {current.achievements.length > 0 && (
                <div>
                  <dt>Marcos</dt>
                  <dd>{current.achievements.join(' · ')}</dd>
                </div>
              )}
              {current.designEvolution && (
                <div>
                  <dt>Evolução do design</dt>
                  <dd>{current.designEvolution}</dd>
                </div>
              )}
              {current.socialProject && (
                <div>
                  <dt>Projeto social</dt>
                  <dd>
                    <a
                      className="orange"
                      href="#impacto"
                      onClick={() => setDetails(false)}
                    >
                      Acelerando com Elas ↗
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            {current.carImage && (
              <Photo
                src={current.carImage}
                alt={`Carro da temporada ${current.year}`}
              />
            )}
            <div className="chapter-gallery">
              {current.gallery.map((id) => {
                const media = gallery.find((m) => m.id === id);
                return media ? (
                  <figure key={id}>
                    <Photo src={media.src} alt={media.alt} />
                    <figcaption>{media.credit}</figcaption>
                  </figure>
                ) : null;
              })}
            </div>
            <a
              className="text-link"
              href={current.source.url}
              target="_blank"
              rel="noreferrer"
            >
              {current.source.label}
              <ArrowUpRight size={18} />
            </a>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
