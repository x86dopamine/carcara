/* oxlint-disable next/no-img-element -- Images are locally optimized WebP with responsive sources; no runtime image service is needed. */
'use client';
import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Box, Image as ImageIcon } from 'lucide-react';
import { site } from '@/src/data/site';
import type { EngineeringMode } from './sceneConfig';
const Scene = lazy(() => import('./CarScene'));
class SceneBoundary extends Component<
  { children: React.ReactNode; onFailure: () => void },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.error ? null : this.props.children;
  }
}
export function CarViewport({
  model = site.car.model,
  mode = 'hero',
  engineeringMode = 'aero',
  progress,
}: {
  model?: string | null;
  mode?: 'hero' | 'inspect';
  engineeringMode?: EngineeringMode;
  progress?: React.RefObject<number>;
}) {
  const root = useRef<HTMLDivElement>(null),
    [visible, setVisible] = useState(false),
    [enabled, setEnabled] = useState(false),
    [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false),
    [reduced, setReduced] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)'),
      mobile = matchMedia('(max-width: 760px)');
    const update = () => {
      setReduced(preference.matches);
      const data = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection?.saveData;
      setEnabled(!mobile.matches && !preference.matches && !data);
    };
    update();
    preference.addEventListener('change', update);
    mobile.addEventListener('change', update);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (!entry.isIntersecting) setReady(false);
      },
      { rootMargin: '40px' },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', update);
      mobile.removeEventListener('change', update);
    };
  }, []);
  const onReady = useCallback(() => setReady(true), []),
    onFailure = useCallback(() => {
      setFailed(true);
      setReady(false);
    }, []);
  useEffect(() => {
    if (!enabled || !visible || ready || failed) return;
    const timeout = setTimeout(onFailure, 20000);
    return () => clearTimeout(timeout);
  }, [enabled, visible, ready, failed, onFailure]);
  return (
    <div
      ref={root}
      className={`car-viewport ${mode === 'hero' ? 'car-viewport-hero' : ''}`}
    >
      <img
        className={`car-poster ${ready && enabled && !failed ? 'poster-hidden' : ''}`}
        src={site.car.poster}
        srcSet="/images/car-concept-640.webp 640w, /images/car-concept.webp 1400w"
        sizes="(max-width:760px) 100vw, 90vw"
        alt={
          model
            ? 'Prévia ilustrativa; o modelo oficial aparece ao carregar a visualização 3D.'
            : 'Conceito ilustrativo Formula preto e laranja. Não é o carro oficial da equipe.'
        }
        width="1400"
        height="789"
        fetchPriority={mode === 'hero' ? 'high' : 'auto'}
        loading={mode === 'hero' ? 'eager' : 'lazy'}
      />
      {enabled && visible && !failed && (
        <div
          className={`scene-canvas ${ready ? 'scene-ready' : ''}`}
          aria-hidden="true"
        >
          <SceneBoundary onFailure={onFailure}>
            <Suspense fallback={null}>
              <Scene
                model={model}
                mode={engineeringMode}
                inspection={mode === 'inspect'}
                progress={progress}
                reduced={reduced}
                onReady={onReady}
                onFailure={onFailure}
              />
            </Suspense>
          </SceneBoundary>
        </div>
      )}
      <div className="viewport-control">
        {failed ? (
          <span className="eyebrow">Visualização leve ativa</span>
        ) : (
          <button
            className="scene-toggle"
            aria-pressed={enabled}
            onClick={() => {
              setReady(false);
              setEnabled(!enabled);
            }}
          >
            {enabled ? <ImageIcon size={14} /> : <Box size={14} />}{' '}
            {enabled ? 'Usar modo leve' : 'Ativar visualização 3D'}
          </button>
        )}
        {enabled && visible && !ready && !failed && (
          <output className="scene-loading">
            <i />
            Preparando 3D
          </output>
        )}
      </div>
    </div>
  );
}
