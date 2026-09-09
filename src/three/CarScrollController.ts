'use client';
import { useEffect, useRef } from 'react';
export function useCarScrollController(
  element: React.RefObject<HTMLElement | null>,
) {
  const progress = useRef(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = element.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const range = Math.max(1, rect.height - innerHeight);
      const simple = matchMedia(
        '(max-width: 760px), (prefers-reduced-motion: reduce)',
      ).matches;
      progress.current = simple
        ? 0
        : Math.min(1, Math.max(0, -rect.top / range));
      el.style.setProperty('--journey-progress', String(progress.current));
      el.style.setProperty(
        '--heading-opacity',
        String(Math.max(0.12, 1 - progress.current * 2)),
      );
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    update();
    return () => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      cancelAnimationFrame(frame);
    };
  }, [element]);
  return progress;
}
