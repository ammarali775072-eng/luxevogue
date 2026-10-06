import React, { useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';

const HeroFloatingObject: React.FC<{ mousePos: React.MutableRefObject<{ x: number; y: number }> }> = ({ mousePos }) => {
  const meshGroup = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!meshGroup.current) return;

    // Smooth idle continuous rotation
    meshGroup.current.rotation.y += delta * 0.35;

    // Subtle reaction to mouse pointer with lerping
    const targetRotX = mousePos.current.y * 0.4 + 0.15;
    const targetRotZ = -mousePos.current.x * 0.35;

    meshGroup.current.rotation.x = THREE.MathUtils.lerp(
      meshGroup.current.rotation.x,
      targetRotX,
      0.08
    );
    meshGroup.current.rotation.z = THREE.MathUtils.lerp(
      meshGroup.current.rotation.z,
      targetRotZ,
      0.08
    );
  });

  // Materials with realistic studio reflections memoized
  const goldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#D6B36A'),
    roughness: 0.18,
    metalness: 0.95,
  }), []);

  const noirMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0A0B0F'),
    roughness: 0.4,
    metalness: 0.3,
  }), []);

  const titaniumMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2A2D38'),
    roughness: 0.25,
    metalness: 0.88,
  }), []);

  return (
    <group ref={meshGroup} position={[0, 0, 0]} scale={1.25}>
      {/* Dynamic Aerodynamic Silhouette: Sneaker / Sculptural Monolith */}
      {/* Sole Chassis */}
      <mesh position={[0, -0.6, 0]} material={noirMaterial}>
        <boxGeometry args={[3.6, 0.45, 1.5]} />
      </mesh>

      {/* Titanium Midsole Wave */}
      <mesh position={[0, -0.35, 0]} material={titaniumMaterial}>
        <boxGeometry args={[3.8, 0.1, 1.4]} />
      </mesh>

      {/* Gold Trim Rail */}
      <mesh position={[0, -0.28, 0]} material={goldMaterial}>
        <boxGeometry args={[3.85, 0.05, 1.42]} />
      </mesh>

      {/* Sculpted Main Body */}
      <mesh position={[-0.2, 0.05, 0]} material={noirMaterial}>
        <boxGeometry args={[2.8, 0.85, 1.35]} />
      </mesh>

      {/* Forward Aerodynamic Wedge */}
      <mesh position={[1.2, -0.05, 0]} rotation={[0, 0, -0.2]} material={noirMaterial}>
        <coneGeometry args={[0.75, 1.4, 32]} />
      </mesh>

      {/* Architectural Ankle Collar */}
      <mesh position={[-0.8, 0.65, 0]} rotation={[0, 0, 0.18]} material={noirMaterial}>
        <cylinderGeometry args={[0.65, 0.75, 0.9, 32]} />
      </mesh>

      {/* 18k Champagne Gold Heel Cage */}
      <mesh position={[-1.6, 0.05, 0]} material={goldMaterial}>
        <boxGeometry args={[0.35, 0.75, 1.4]} />
      </mesh>

      {/* Floating Accent Torus Rings (Haute Jewelry Link) */}
      <mesh position={[0.3, 0.5, 0]} rotation={[1.2, 0.5, 0]} material={goldMaterial}>
        <torusGeometry args={[0.3, 0.04, 16, 32]} />
      </mesh>
    </group>
  );
};

export const Hero3DCanvas: React.FC = () => {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates (-1 to 1)
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
      <CanvasErrorBoundary
        fallback={
          <div className="w-full h-full flex items-center justify-center opacity-40">
            <div className="w-72 h-72 rounded-full border border-[#D6B36A]/20 blur-sm" />
          </div>
        }
      >
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0.5, 5.5], fov: 42 }}
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.2
            }}
            dpr={[1, 2]}
          >
            {/* Studio Three-Point Lighting */}
            <ambientLight intensity={0.4} />
            {/* Key Warm Directional */}
            <directionalLight position={[5, 6, 4]} intensity={2.4} color="#FFF5DF" />
            {/* Rim Light Sharp Champagne Gold */}
            <directionalLight position={[-5, 4, -5]} intensity={3.2} color="#D6B36A" />
            {/* Atmospheric Cool Rim */}
            <directionalLight position={[0, -4, 3]} intensity={0.7} color="#38BDF8" />

            <Float speed={2} rotationIntensity={0.25} floatIntensity={0.6}>
              <HeroFloatingObject mousePos={mousePos} />
            </Float>

            <ContactShadows
              position={[0, -2, 0]}
              opacity={0.65}
              scale={10}
              blur={2.5}
              far={4.5}
              color="#000000"
            />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
};
