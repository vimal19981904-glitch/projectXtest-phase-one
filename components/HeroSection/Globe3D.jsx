'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GlobeMesh() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Rotate smoothly
    groupRef.current.rotation.y += 0.15 * delta;
    
    // Beautiful tilt
    groupRef.current.rotation.x = 0.2;
    groupRef.current.rotation.z = 0.1;
  });

  const R = 1.95; 

  return (
    <group ref={groupRef}>
      {/* 1. Core Sphere: Clean Dark Core to provide contrast */}
      <mesh>
        <sphereGeometry args={[R * 0.98, 32, 32]} />
        <meshStandardMaterial 
          color="#0f172a" 
          transparent={true}
          opacity={0.15}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* 2. Grid Lines: Latitude & Longitude */}
      <group opacity={0.5}>
        {[-60, -30, 0, 30, 60].map((lat) => {
          const r = Math.cos((lat * Math.PI) / 180) * R;
          const y = Math.sin((lat * Math.PI) / 180) * R;
          const points = [];
          for (let i = 0; i <= 64; i++) {
            const angle = (i / 64) * Math.PI * 2;
            points.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
          }
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          return (
            <line key={`lat-${lat}`} geometry={geometry}>
              <lineBasicMaterial color="#38bdf8" transparent opacity={0.25} />
            </line>
          );
        })}

        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const points = [];
          for (let j = 0; j <= 64; j++) {
            const lat = ((j / 64) * Math.PI * 2) - Math.PI;
            points.push(new THREE.Vector3(
              Math.cos(angle) * Math.cos(lat) * R,
              Math.sin(lat) * R,
              Math.sin(angle) * Math.cos(lat) * R
            ));
          }
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          return (
            <line key={`lon-${i}`} geometry={geometry}>
              <lineBasicMaterial color="#38bdf8" transparent opacity={0.25} />
            </line>
          );
        })}
      </group>

      {/* 3. Data Points (Floating over sphere) */}
      <points>
        <sphereGeometry args={[R * 1.01, 64, 64]} />
        <pointsMaterial
          color="#60a5fa"
          size={0.015}
          sizeAttenuation
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Basic lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#0ea5e9" />
    </group>
  );
}
