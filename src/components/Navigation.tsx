'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Brand } from './Brand';
const links = [
  ['A equipe', 'sobre'],
  ['Engenharia', 'engenharia'],
  ['Trajetória', 'trajetoria'],
  ['Além da pista', 'impacto'],
];
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener('scroll', update, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-20% 0px -55% 0px' },
    );
    document
      .querySelectorAll('section[id]')
      .forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);
  return (
    <header className={`navigation ${scrolled ? 'is-scrolled' : ''}`}>
      <a
        href="#inicio"
        className="brand-link"
        aria-label="Carcará Lux — início"
      >
        <Brand />
      </a>
      <nav aria-label="Navegação principal" className="desktop-nav">
        {links.map(([label, id]) => (
          <a
            href={`#${id}`}
            key={id}
            aria-current={active === id ? 'location' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      <a className="nav-cta" href="#parceiros">
        Acelere com a gente <ArrowUpRight size={16} />
      </a>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="menu-button" aria-label="Abrir menu">
          <Menu />
        </SheetTrigger>
        <SheetContent className="mobile-menu" showCloseButton={false}>
          <SheetTitle>
            <Brand />
          </SheetTitle>
          <SheetDescription>Explore a Carcará Lux</SheetDescription>
          <SheetClose className="menu-close" aria-label="Fechar menu">
            <X />
          </SheetClose>
          <nav aria-label="Navegação móvel">
            {[
              ['Início', 'inicio'],
              ...links,
              ['Pessoas', 'pessoas'],
              ['Galeria', 'galeria'],
              ['Parceiros', 'parceiros'],
              ['Contato', 'contato'],
            ].map(([label, id], i) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                <small>0{i + 1}</small>
                {label}
                <ArrowUpRight size={20} />
              </a>
            ))}
          </nav>
          <span className="eyebrow">RN, BRASIL / STEM RACING</span>
        </SheetContent>
      </Sheet>
    </header>
  );
}
