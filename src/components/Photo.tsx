/* oxlint-disable next/no-img-element -- Images are locally optimized WebP with responsive sources; no runtime image service is needed. */
'use client';
import { useState } from 'react';
import { ImageOff } from 'lucide-react';
export function Photo({
  src,
  alt,
  className = '',
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className={`photo-unavailable ${className}`} aria-label={alt}>
        <ImageOff size={28} />
        <span>Imagem indisponível</span>
        <small>{alt}</small>
      </div>
    );
  return (
    <img
      className={className}
      src={src}
      srcSet={
        src.endsWith('.webp')
          ? `${src.replace('.webp', '-640.webp')} 640w, ${src} 1400w`
          : undefined
      }
      sizes="(max-width:760px) 100vw, 65vw"
      alt={alt}
      width="1400"
      height="1000"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
