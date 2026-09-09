'use client';
import { useEffect, useMemo } from 'react';
import { Decal, useGLTF, useTexture, RoundedBox } from '@react-three/drei';
import {
  BufferGeometry,
  Float32BufferAttribute,
  CanvasTexture,
  SRGBColorSpace,
  CatmullRomCurve3,
  Vector3,
  TubeGeometry,
  Mesh,
  MeshStandardMaterial,
} from 'three';
import { site } from '@/src/data/site';
import { sceneConfig, type EngineeringMode } from './sceneConfig';
type Ring = [number, number, number, number];
function loft(rings: Ring[], segments = 40) {
  const positions: number[] = [],
    uvs: number[] = [],
    indices: number[] = [];
  rings.forEach(([x, y, w, h], r) => {
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      positions.push(x, y + Math.sin(angle) * h, Math.cos(angle) * w);
      uvs.push(r / (rings.length - 1), i / segments);
      if (r < rings.length - 1 && i < segments) {
        const a = r * (segments + 1) + i,
          b = a + segments + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
  });
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(positions, 3));
  g.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}
function LiveryDecal({ official = false }: { official?: boolean }) {
  const textMap = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 160;
    const ctx = c.getContext('2d')!;
    ctx.clearRect(0, 0, 1024, 160);
    ctx.fillStyle = '#ff6b26';
    ctx.font = '600 91px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CARCARÁ LUX', 512, 80);
    const map = new CanvasTexture(c);
    map.colorSpace = SRGBColorSpace;
    return map;
  }, []);
  useEffect(() => () => textMap.dispose(), [textMap]);
  if (official && site.car.logoDecal)
    return <OfficialDecal url={site.car.logoDecal} />;
  return (
    <Decal
      position={[0.18, 0.63, 0.326]}
      rotation={[0, 0, 0]}
      scale={[1.34, 0.21, 0.3]}
      map={textMap}
      polygonOffsetFactor={-4}
    />
  );
}
function OfficialDecal({ url }: { url: string }) {
  const map = useTexture(url);
  return (
    <Decal
      position={[0.18, 0.63, 0.326]}
      rotation={[0, 0, 0]}
      scale={[1.34, 0.42, 0.3]}
      map={map}
      polygonOffsetFactor={-4}
    />
  );
}
function Rod({
  from,
  to,
  radius = 0.035,
}: {
  from: [number, number, number];
  to: [number, number, number];
  radius?: number;
}) {
  const { mid, q, length } = useMemo(() => {
    const a = new Vector3(...from),
      b = new Vector3(...to),
      direction = b.clone().sub(a);
    return {
      mid: a.add(b).multiplyScalar(0.5),
      q: new Mesh().quaternion.setFromUnitVectors(
        new Vector3(0, 1, 0),
        direction.clone().normalize(),
      ),
      length: direction.length(),
    };
  }, [from, to]);
  return (
    <mesh position={mid} quaternion={q}>
      <cylinderGeometry args={[radius, radius, length, 8]} />
      <meshStandardMaterial color="#24282b" metalness={0.85} roughness={0.27} />
    </mesh>
  );
}
function Wheel({
  x,
  z,
  rear = false,
  wire = false,
}: {
  x: number;
  z: number;
  rear?: boolean;
  wire?: boolean;
}) {
  const radius = rear ? 0.54 : 0.48,
    side = z > 0 ? 1 : -1;
  return (
    <group position={[x, radius, z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, rear ? 0.46 : 0.37, 48, 1]} />
        <meshStandardMaterial
          color="#101112"
          roughness={0.82}
          wireframe={wire}
        />
      </mesh>
      <mesh
        position={[0, 0, side * (rear ? 0.233 : 0.188)]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[radius * 0.72, radius * 0.72, 0.018, 32]} />
        <meshStandardMaterial
          color="#272a2c"
          metalness={0.85}
          roughness={0.22}
        />
      </mesh>
      <mesh position={[0, 0, side * (rear ? 0.249 : 0.205)]}>
        <torusGeometry args={[radius * 0.76, 0.012, 8, 64]} />
        <meshStandardMaterial
          color={sceneConfig.orange}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0, side * (rear ? 0.249 : 0.205)]}>
        <torusGeometry args={[radius * 0.49, 0.016, 8, 40]} />
        <meshStandardMaterial color="#080808" metalness={0.6} roughness={0.4} />
      </mesh>
      {Array.from({ length: 7 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 7) * radius * 0.24,
            Math.sin((i * Math.PI * 2) / 7) * radius * 0.24,
            side * (rear ? 0.25 : 0.206),
          ]}
          rotation={[0, 0, (i * Math.PI * 2) / 7]}
        >
          <boxGeometry args={[radius * 0.63, 0.033, 0.026]} />
          <meshStandardMaterial
            color="#4a4b4c"
            metalness={0.85}
            roughness={0.3}
          />
        </mesh>
      ))}
      <mesh
        position={[0, 0, side * (rear ? 0.27 : 0.23)]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.064, 0.064, 0.025, 6]} />
        <meshStandardMaterial color="#b9bfc2" metalness={1} roughness={0.25} />
      </mesh>
    </group>
  );
}
export function ConceptCar({ mode = 'aero' }: { mode?: EngineeringMode }) {
  const geometries = useMemo(
    () => ({
      body: loft([
        [-3.05, 0.32, 0.005, 0.006],
        [-2.95, 0.35, 0.1, 0.045],
        [-2.5, 0.42, 0.15, 0.08],
        [-1.8, 0.52, 0.23, 0.13],
        [-1.1, 0.62, 0.35, 0.22],
        [-0.5, 0.67, 0.42, 0.29],
        [0.2, 0.69, 0.39, 0.34],
        [0.6, 0.73, 0.34, 0.37],
        [1.1, 0.65, 0.31, 0.33],
        [1.65, 0.48, 0.24, 0.17],
        [2.2, 0.37, 0.15, 0.085],
        [2.48, 0.36, 0.02, 0.025],
      ]),
      side: loft([
        [-1.12, 0.57, 0.05, 0.02],
        [-0.97, 0.64, 0.24, 0.13],
        [-0.7, 0.62, 0.34, 0.21],
        [0, 0.57, 0.36, 0.23],
        [0.65, 0.52, 0.33, 0.2],
        [1.17, 0.43, 0.2, 0.11],
        [1.53, 0.35, 0.03, 0.025],
      ]),
      halo: new TubeGeometry(
        new CatmullRomCurve3([
          new Vector3(-0.85, 0.9, -0.3),
          new Vector3(-0.55, 1.14, -0.34),
          new Vector3(0.15, 1.18, -0.25),
          new Vector3(0.45, 1.06, 0),
          new Vector3(0.15, 1.18, 0.25),
          new Vector3(-0.55, 1.14, 0.34),
          new Vector3(-0.85, 0.9, 0.3),
        ]),
        48,
        0.035,
        10,
        false,
      ),
    }),
    [],
  );
  useEffect(
    () => () => Object.values(geometries).forEach((g) => g.dispose()),
    [geometries],
  );
  const wire = mode === 'design',
    orange = sceneConfig.orange;
  return (
    <group>
      <mesh geometry={geometries.body} castShadow>
        <meshPhysicalMaterial
          color={sceneConfig.paint}
          metalness={0.72}
          roughness={0.28}
          clearcoat={0.8}
          clearcoatRoughness={0.25}
          wireframe={wire}
        />
      </mesh>
      {[-1, 1].map((sign) => (
        <group key={sign}>
          <mesh
            position={[0, 0, sign * 0.64]}
            geometry={geometries.side}
            castShadow
          >
            <meshPhysicalMaterial
              color={mode === 'manufacturing' ? orange : '#25292a'}
              metalness={0.7}
              roughness={0.27}
              clearcoat={1}
              wireframe={wire}
            />
            {sign === 1 && <LiveryDecal official={!!site.car.logoDecal} />}
          </mesh>
          <RoundedBox
            args={[2.4, 0.065, 0.11]}
            radius={0.025}
            position={[0.1, 0.37, sign * 0.91]}
          >
            <meshStandardMaterial
              color={orange}
              metalness={0.35}
              roughness={0.35}
            />
          </RoundedBox>
          <Wheel x={-1.95} z={sign * 1.13} wire={wire} />
          <Wheel x={1.86} z={sign * 1.2} rear wire={wire} />
          {[-1.95, 1.86].map((x) => (
            <group key={x}>
              <Rod
                from={[x - 0.43, 0.42, sign * 0.32]}
                to={[x, 0.47, sign * 1.15]}
              />
              <Rod
                from={[x + 0.4, 0.37, sign * 0.32]}
                to={[x, 0.47, sign * 1.15]}
              />
              <Rod
                from={[x - 0.2, 0.65, sign * 0.23]}
                to={[x, 0.47, sign * 1.15]}
                radius={0.022}
              />
            </group>
          ))}
        </group>
      ))}
      <RoundedBox
        args={[4.1, 0.06, 1.86]}
        radius={0.08}
        position={[0.18, 0.18, 0]}
      >
        <meshStandardMaterial
          color="#17191b"
          metalness={0.55}
          roughness={0.35}
          wireframe={wire}
        />
      </RoundedBox>
      {[0, 1, 2].map((i) => (
        <group key={i}>
          <RoundedBox
            args={[0.18, 0.055, 2.62 - i * 0.1]}
            radius={0.024}
            position={[-2.83 + i * 0.17, 0.22 + i * 0.065, 0]}
            rotation={[0, 0, 0.09]}
          >
            <meshStandardMaterial
              color={i === 2 ? orange : '#25282b'}
              metalness={0.6}
              roughness={0.28}
              wireframe={wire}
            />
          </RoundedBox>
        </group>
      ))}
      {[-1, 1].map((sign) => (
        <group key={sign}>
          <RoundedBox
            args={[0.66, 0.28, 0.04]}
            radius={0.018}
            position={[-2.63, 0.28, sign * 1.31]}
          >
            <meshStandardMaterial
              color={orange}
              metalness={0.5}
              roughness={0.28}
            />
          </RoundedBox>
          <RoundedBox
            args={[0.74, 0.57, 0.055]}
            radius={0.026}
            position={[2.2, 0.98, sign * 0.99]}
          >
            <meshStandardMaterial
              color={orange}
              metalness={0.5}
              roughness={0.3}
            />
          </RoundedBox>
          <Rod
            from={[1.98, 0.37, sign * 0.32]}
            to={[2.27, 1.12, sign * 0.32]}
            radius={0.04}
          />
        </group>
      ))}
      {[0, 1].map((i) => (
        <RoundedBox
          key={i}
          args={[0.45, 0.075, 2.03]}
          radius={0.033}
          position={[2.2 + i * 0.14, 1.04 + i * 0.2, 0]}
          rotation={[0, 0, 0.12]}
        >
          <meshStandardMaterial
            color={i ? orange : '#292d30'}
            metalness={0.65}
            roughness={0.25}
            wireframe={wire}
          />
        </RoundedBox>
      ))}
      <mesh position={[-0.36, 0.938, 0]} scale={[0.59, 0.09, 0.31]}>
        <sphereGeometry args={[1, 40, 20]} />
        <meshStandardMaterial color="#030303" roughness={0.9} />
      </mesh>
      <mesh geometry={geometries.halo}>
        <meshStandardMaterial color={orange} metalness={0.7} roughness={0.26} />
      </mesh>
      <Rod from={[-0.75, 0.77, 0]} to={[-0.57, 1.12, 0]} radius={0.035} />
      <RoundedBox
        args={[1.62, 0.024, 0.075]}
        radius={0.008}
        position={[-1.98, 0.614, 0]}
        rotation={[0, 0, 0.12]}
      >
        <meshStandardMaterial color={orange} roughness={0.35} />
      </RoundedBox>
    </group>
  );
}
function ImportedCar({ url, mode }: { url: string; mode: EngineeringMode }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((o) => {
      if (o instanceof Mesh) {
        o.castShadow = true;
        o.material = Array.isArray(o.material)
          ? o.material.map((m) => m.clone())
          : o.material.clone();
      }
    });
    return c;
  }, [scene]);
  useEffect(() => {
    cloned.traverse((o) => {
      if (o instanceof Mesh) {
        const materials = Array.isArray(o.material) ? o.material : [o.material];
        materials.forEach((m) => {
          if (m instanceof MeshStandardMaterial)
            m.wireframe = mode === 'design';
        });
      }
    });
  }, [cloned, mode]);
  useEffect(
    () => () => {
      cloned.traverse((o) => {
        if (o instanceof Mesh)
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
            m.dispose(),
          );
      });
    },
    [cloned],
  );
  return <primitive object={cloned} {...sceneConfig.model} />;
}
export function CarModel({
  model,
  mode = 'aero',
}: {
  model?: string | null;
  mode?: EngineeringMode;
}) {
  return model ? (
    <ImportedCar url={model} mode={mode} />
  ) : (
    <ConceptCar mode={mode} />
  );
}
