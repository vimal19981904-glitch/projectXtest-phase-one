'use client';

import { Canvas } from '@react-three/fiber';
import Globe3D from './Globe3D';

export default function GlobeCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      style={{ width: '600px', height: '600px', display: 'block', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Globe3D />
    </Canvas>
  );
}
