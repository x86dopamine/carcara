/* oxlint-disable next/no-img-element -- Images are locally optimized WebP with responsive sources; no runtime image service is needed. */
'use client';
import { useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight, X, Expand } from 'lucide-react';
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
import { gallery } from '@/src/data/gallery';
export function Gallery() {
  const [filter, setFilter] = useState('Tudo'),
    [selected, setSelected] = useState<string | null>(null);
  const items = gallery.filter(
      (m) => filter === 'Tudo' || m.category === filter,
    ),
    active = gallery.find((m) => m.id === selected),
    index = items.findIndex((m) => m.id === selected);
  function move(n: number) {
    if (index >= 0)
      setSelected(items[(index + n + items.length) % items.length].id);
  }
  return (
    <section id="galeria" className="section gallery-section">
      <SectionLabel number="06">DENTRO DO NOSSO MUNDO</SectionLabel>
      <Tabs value={filter} onValueChange={(v) => setFilter(String(v))}>
        <div className="section-heading">
          <h2>
            Entre a ideia
            <br />e a <em>linha de chegada.</em>
          </h2>
          <TabsList className="gallery-filters" aria-label="Filtrar galeria">
            {['Tudo', 'Equipe', 'Impacto', 'Conceito'].map((f) => (
              <TabsTrigger key={f} value={f}>
                {f}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent key={filter} value={filter} className="gallery-editorial">
          {items.map((m, i) => (
            <figure className={`gallery-item gallery-item-${i}`} key={m.id}>
              <button
                onClick={() => setSelected(m.id)}
                aria-label={`Ampliar: ${m.title}`}
              >
                <Photo src={m.src} alt={m.alt} />
                <span className="image-category">
                  {m.placeholder
                    ? 'CONCEITO ILUSTRATIVO'
                    : m.category.toUpperCase()}{' '}
                  {m.year && `/ ${m.year}`}
                </span>
                <span className="expand-image">
                  <Expand size={18} />
                </span>
              </button>
              <figcaption>
                <span>{m.title}</span>
                <ArrowUpRight size={17} />
              </figcaption>
            </figure>
          ))}
        </TabsContent>
      </Tabs>
      <Dialog open={!!active} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent
          className="lightbox"
          showCloseButton={false}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              move(1);
            }
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              move(-1);
            }
          }}
        >
          <div className="lightbox-top">
            <DialogTitle>{active?.title}</DialogTitle>
            <DialogClose aria-label="Fechar imagem" className="lightbox-close">
              <X />
            </DialogClose>
          </div>
          {active && (
            <img src={active.src} alt={active.alt} className="lightbox-image" />
          )}
          <DialogDescription>{active?.credit}</DialogDescription>
          <div className="lightbox-bottom">
            {active?.source ? (
              <a
                className="text-link"
                href={active.source.url}
                target="_blank"
                rel="noreferrer"
              >
                Fonte original <ArrowUpRight size={15} />
              </a>
            ) : (
              <span className="eyebrow">
                CONCEITO / NÃO É UM REGISTRO DA EQUIPE
              </span>
            )}
            <div className="arrow-controls">
              <button aria-label="Imagem anterior" onClick={() => move(-1)}>
                <ArrowLeft />
              </button>
              <span>
                {index + 1} / {items.length}
              </span>
              <button aria-label="Próxima imagem" onClick={() => move(1)}>
                <ArrowRight />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
