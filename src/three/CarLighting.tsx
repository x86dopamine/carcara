import { Environment, Lightformer } from '@react-three/drei';
export function CarLighting() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <hemisphereLight args={['#e3e7eb', '#443025', 1.4]} />
      <directionalLight
        position={[-3, 6, 4]}
        intensity={3.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0005}
      />
      <spotLight
        position={[3, 4, -4]}
        intensity={65}
        color="#ff641b"
        angle={0.65}
        penumbra={1}
      />
      <Environment frames={1} resolution={128}>
        <Lightformer
          position={[0, 5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[10, 3, 1]}
          intensity={3}
        />
        <Lightformer
          position={[-3, 2, 6]}
          rotation={[0, Math.PI, 0]}
          scale={[7, 1, 1]}
          intensity={2}
        />
        <Lightformer
          position={[3, 1, -5]}
          scale={[8, 0.6, 1]}
          intensity={4}
          color="#ff7e3d"
        />
      </Environment>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.025, 0]}
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />
        <shadowMaterial transparent opacity={0.35} />
      </mesh>
    </>
  );
}
