import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasErrorBoundary } from '../three/CanvasErrorBoundary';

const SculptureMesh: React.FC = () => {
  const torusRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.3;
      torusRef.current.rotation.y += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.4;
      ringRef.current.rotation.x += delta * 0.15;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5;
    }
  });

  const goldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#D6B36A'),
    roughness: 0.12,
    metalness: 0.98,
  }), []);

  const blackMarbleMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0D0E14'),
    roughness: 0.25,
    metalness: 0.85,
  }), []);

  const chromeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#E2E8F0'),
    roughness: 0.1,
    metalness: 0.95,
  }), []);

  return (
    <group scale={1.4}>
      {/* Outer Intertwined Torus Knot in Gold */}
      <mesh ref={torusRef} material={goldMaterial}>
        <torusKnotGeometry args={[1.2, 0.28, 128, 32, 2, 3]} />
      </mesh>

      {/* Orbiting Black Marble Ring */}
      <mesh ref={ringRef} material={blackMarbleMaterial} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.0, 0.08, 16, 64]} />
      </mesh>

      {/* Central Floating Polyhedron */}
      <mesh ref={coreRef} material={chromeMaterial}>
        <icosahedronGeometry args={[0.65, 0]} />
      </mesh>
    </group>
  );
};

export const SignatureLuxuryObject: React.FC = () => {
  return (
    <section className="relative min-h-screen py-32 bg-[#08090D] overflow-hidden flex items-center justify-center border-t border-b border-white/[0.08]">
      {/* Background Volumetric Fog/Light */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-[#D6B36A]/10 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Editorial Narrative */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#D6B36A] font-mono-tabular">
            <span className="w-2 h-2 rounded-full bg-[#D6B36A]" />
            <span>ART INSTALLATION · SIGNATURE NO. 07</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
            THE LUXEVOGUE
            <br />
            <span className="text-[#D6B36A] font-serif-luxury font-normal italic">
              MONOLITH
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#9698A3] leading-relaxed max-w-lg">
            Where metallurgy becomes sculpture. Forged through recursive algorithmic geometry, polished black obsidian basalt, and hand-burnished 18-karat royal gold. A testament to timeless craftsmanship in the digital age.
          </p>

          <div className="pt-4 grid grid-cols-3 gap-6 border-t border-white/10 font-mono-tabular text-xs">
            <div>
              <span className="text-[#9698A3] block uppercase text-[10px]">Material</span>
              <span className="text-white font-medium mt-1 block">18k Aurum & Basalt</span>
            </div>
            <div>
              <span className="text-[#9698A3] block uppercase text-[10px]">Geometry</span>
              <span className="text-white font-medium mt-1 block">Torus Knot 2,3</span>
            </div>
            <div>
              <span className="text-[#9698A3] block uppercase text-[10px]">Tolerance</span>
              <span className="text-[#D6B36A] font-medium mt-1 block">±0.002 mm</span>
            </div>
          </div>
        </div>

        {/* Right 3D Interactive Art Viewport */}
        <div className="h-[460px] sm:h-[540px] w-full relative bg-[#101118]/60 border border-white/10 backdrop-blur-xl">
          <CanvasErrorBoundary
            fallback={
              <div className="w-full h-full flex items-center justify-center text-center p-6">
                <div className="w-48 h-48 rounded-full border border-[#D6B36A]/20 flex items-center justify-center">
                  <span className="font-serif-luxury text-xl text-[#D6B36A]">LV MONOLITH</span>
                </div>
              </div>
            }
          >
            <Suspense fallback={null}>
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{
                  antialias: true,
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.3
                }}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[4, 5, 4]} intensity={2.6} color="#FFF8E7" />
                <directionalLight position={[-4, 3, -4]} intensity={3.5} color="#D6B36A" />
                <directionalLight position={[0, -3, 3]} intensity={0.9} color="#7C3AED" />

                <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
                  <SculptureMesh />
                </Float>

                <ContactShadows
                  position={[0, -2, 0]}
                  opacity={0.65}
                  scale={8}
                  blur={2.5}
                  far={4.5}
                  color="#000000"
                />
              </Canvas>
            </Suspense>
          </CanvasErrorBoundary>

          <div className="absolute top-4 right-4 text-[10px] uppercase font-mono-tabular tracking-widest text-[#9698A3] bg-black/50 px-3 py-1 border border-white/10">
            Real-Time Kinetic Sculpture
          </div>
        </div>
      </div>
    </section>
  );
};
