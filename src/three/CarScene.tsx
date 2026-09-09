'use client';
import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { CarModel } from './CarModel';
import { CarCameraRig } from './CarCameraRig';
import { CarLighting } from './CarLighting';
import { CarAnnotations } from './CarAnnotations';
import { sceneConfig, type EngineeringMode } from './sceneConfig';
function SceneReady({ onReady }: { onReady: () => void }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const frame = requestAnimationFrame(onReady);
    const wake = () => invalidate();
    window.addEventListener('scroll', wake, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', wake);
    };
  }, [invalidate, onReady]);
  return null;
}
export default function CarScene({
  model,
  mode = 'aero',
  inspection = false,
  progress,
  reduced = false,
  onReady,
  onFailure,
}: {
  model?: string | null;
  mode?: EngineeringMode;
  inspection?: boolean;
  progress?: React.RefObject<number>;
  reduced?: boolean;
  onReady: () => void;
  onFailure: () => void;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, sceneConfig.desktopDpr]}
      frameloop="demand"
      camera={{
        position: sceneConfig.cameraPath[0],
        fov: sceneConfig.cameraFov,
        near: 0.1,
        far: 250,
      }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', onFailure, {
          once: true,
        });
      }}
      fallback={null}
    >
      <Suspense fallback={null}>
        <CarLighting />
        <CarModel model={model} mode={inspection ? mode : 'aero'} />
        {inspection && <CarAnnotations mode={mode} />}
        <CarCameraRig
          progress={progress}
          mode={mode}
          inspection={inspection}
          reduced={reduced}
        />
        <SceneReady onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
