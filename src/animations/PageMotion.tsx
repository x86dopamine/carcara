'use client';
import { useEffect } from 'react';
export function PageMotion() {
  useEffect(() => {
    let cleanup = () => {};
    let disposed = false;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    void import('gsap').then(({ gsap }) => {
      if (disposed) return;
      const elements = document.querySelectorAll(
        '.section-heading, .about-copy, .about-photo, .impact-project, .achievement',
      );
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                entry.target,
                { y: 25, opacity: 0.4 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.7,
                  ease: 'power2.out',
                  clearProps: 'all',
                },
              );
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      elements.forEach((el) => observer.observe(el));
      cleanup = () => {
        observer.disconnect();
        gsap.killTweensOf(elements);
      };
    });
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);
  return null;
}
