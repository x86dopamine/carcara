// Unidades exclusivamente visuais. Não são dimensões nem parâmetros de fabricação.
export type EngineeringMode = 'aero' | 'design' | 'manufacturing' | 'testing';
export const sceneConfig = {
  orange: '#ff6b26',
  paint: '#17191a',
  cameraFov: 34,
  desktopDpr: 1.5,
  cameraPath: [
    [-7.2, 4.2, 7.6],
    [-1.8, 2.5, 8.9],
    [0.1, 1.4, 5.9],
    [6.6, 3.4, 7.2],
    [8.4, 4.9, 9.3],
  ] as [number, number, number][],
  inspection: {
    aero: [-6, 4.8, 8],
    design: [-0.8, 8.8, 5.5],
    manufacturing: [-0.3, 2.4, 7.4],
    testing: [6, 3, 8],
  } as Record<EngineeringMode, [number, number, number]>,
  model: {
    scale: 1,
    rotation: [0, 0, 0] as [number, number, number],
    position: [0, 0, 0] as [number, number, number],
  },
};
