import { Line } from '@react-three/drei';
import { useMemo } from 'react';
import type { EngineeringMode } from './sceneConfig';
export function CarAnnotations({ mode }: { mode: EngineeringMode }) {
  const curves = useMemo(
    () =>
      [-1, -0.6, 0, 0.6, 1].map((z) =>
        Array.from({ length: 35 }, (_, i) => {
          const x = -3.5 + (i / 34) * 7;
          return [x, 0.55 + Math.exp(-x * x) * 0.65, z * 1.65] as [
            number,
            number,
            number,
          ];
        }),
      ),
    [],
  );
  if (mode === 'aero')
    return (
      <group>
        {curves.map((points, i) => (
          <Line
            key={i}
            points={points}
            color="#ff782d"
            lineWidth={0.7}
            transparent
            opacity={0.45}
            dashed
            dashSize={0.13}
            gapSize={0.06}
          />
        ))}
      </group>
    );
  if (mode === 'testing')
    return (
      <group>
        {[-1.75, 1.75].map((z) => (
          <Line
            key={z}
            points={[
              [-4, 0.015, z],
              [4, 0.015, z],
            ]}
            color="#ff6b26"
            lineWidth={1}
            dashed
            dashSize={0.18}
            gapSize={0.12}
          />
        ))}
      </group>
    );
  return null;
}
