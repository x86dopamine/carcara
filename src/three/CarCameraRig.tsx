import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, MathUtils } from 'three';
import { sceneConfig, type EngineeringMode } from './sceneConfig';
export function CarCameraRig({
  progress,
  mode,
  inspection,
  reduced,
}: {
  progress?: React.RefObject<number>;
  mode: EngineeringMode;
  inspection: boolean;
  reduced: boolean;
}) {
  const destination = useRef(new Vector3()),
    look = useRef(new Vector3(0, 0.46, 0)),
    elapsed = useRef(0);
  useFrame(({ camera, invalidate }, delta) => {
    elapsed.current += Math.min(delta, 0.05);
    let moving = false;
    if (inspection) {
      destination.current.set(...sceneConfig.inspection[mode]);
    } else {
      const p =
          MathUtils.clamp(progress?.current || 0, 0, 1) *
          (sceneConfig.cameraPath.length - 1),
        i = Math.min(Math.floor(p), sceneConfig.cameraPath.length - 2);
      destination.current
        .set(...sceneConfig.cameraPath[i])
        .lerp(
          new Vector3(...sceneConfig.cameraPath[i + 1]),
          MathUtils.smoothstep(p - i, 0, 1),
        );
      if (!reduced && elapsed.current < 2) {
        destination.current.x -= 0.5 * (1 - elapsed.current / 2);
        moving = true;
      }
    }
    if (reduced) {
      camera.position.copy(destination.current);
    } else if (camera.position.distanceTo(destination.current) > 0.002) {
      camera.position.lerp(destination.current, 1 - Math.exp(-delta * 3.8));
      moving = true;
    }
    camera.lookAt(look.current);
    if (moving) invalidate();
  });
  return null;
}
