import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';

interface SneakerMeshProps {
  color?: string;
  materialType?: 'matte' | 'leather' | 'metallic';
  accentColor?: string;
}

// Procedural Haute Sneaker Geometry
const ProceduralSneaker: React.FC<SneakerMeshProps> = ({
  color = '#0E0F14',
  materialType = 'matte',
  accentColor = '#D6B36A'
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: materialType === 'metallic' ? 0.2 : materialType === 'leather' ? 0.4 : 0.8,
    metalness: materialType === 'metallic' ? 0.85 : 0.15,
  }), [color, materialType]);

  const goldMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    roughness: 0.2,
    metalness: 0.95,
  }), [accentColor]);

  const carbonMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#15161C'),
    roughness: 0.35,
    metalness: 0.5,
  }), []);

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} rotation={[0.2, 0.4, 0]}>
      {/* Aerodynamic Sole Chassis */}
      <mesh position={[0, -0.6, 0]} material={carbonMat}>
        <boxGeometry args={[3.2, 0.35, 1.4]} />
      </mesh>

      {/* Dynamic Midsole Carbon Plate */}
      <mesh position={[0, -0.4, 0]} material={goldMat}>
        <boxGeometry args={[3.3, 0.08, 1.3]} />
      </mesh>

      {/* Main Upper Body */}
      <mesh position={[-0.2, -0.05, 0]} material={bodyMat}>
        <boxGeometry args={[2.5, 0.75, 1.25]} />
      </mesh>

      {/* Sweeping Toe Box */}
      <mesh position={[1.05, -0.15, 0]} rotation={[0, 0, -0.15]} material={bodyMat}>
        <coneGeometry args={[0.7, 1.1, 16]} />
      </mesh>

      {/* High-Tech Collar / Ankle Support */}
      <mesh position={[-0.7, 0.55, 0]} rotation={[0, 0, 0.2]} material={bodyMat}>
        <cylinderGeometry args={[0.55, 0.65, 0.8, 20]} />
      </mesh>

      {/* Sculpted Heel Stabilizer */}
      <mesh position={[-1.4, -0.1, 0]} material={goldMat}>
        <boxGeometry args={[0.3, 0.6, 1.3]} />
      </mesh>

      {/* Gold Lace Aglets & Top Hardware */}
      <mesh position={[0.2, 0.45, 0]} material={goldMat}>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 8]} />
      </mesh>
    </group>
  );
};

// Procedural Haute Horlogerie Watch
const ProceduralWatch: React.FC<{ color?: string; accentColor?: string }> = ({
  color = '#12131A',
  accentColor = '#D6B36A'
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  const caseMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.25,
    metalness: 0.85
  }), [color]);

  const goldMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    roughness: 0.15,
    metalness: 0.95
  }), [accentColor]);

  const dialMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0A0B0F'),
    roughness: 0.6
  }), []);

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0.1]}>
      {/* Watch Case Monobloc */}
      <mesh material={caseMat}>
        <cylinderGeometry args={[1.5, 1.5, 0.35, 32]} />
      </mesh>

      {/* Gold Bezel Ring */}
      <mesh position={[0, 0.18, 0]} material={goldMat}>
        <torusGeometry args={[1.45, 0.08, 16, 48]} />
      </mesh>

      {/* Watch Dial Inner Sunburst */}
      <mesh position={[0, 0.19, 0]} rotation={[-Math.PI / 2, 0, 0]} material={dialMat}>
        <circleGeometry args={[1.35, 32]} />
      </mesh>

      {/* Gold Watch Hands */}
      <mesh position={[0.3, 0.22, 0]} rotation={[0, 0, -0.8]} material={goldMat}>
        <boxGeometry args={[0.7, 0.04, 0.02]} />
      </mesh>
      <mesh position={[-0.2, 0.22, 0.2]} rotation={[0, 0, 1.1]} material={goldMat}>
        <boxGeometry args={[0.5, 0.03, 0.02]} />
      </mesh>

      {/* Crown Button */}
      <mesh position={[1.55, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={goldMat}>
        <cylinderGeometry args={[0.2, 0.2, 0.25, 16]} />
      </mesh>

      {/* Titanium Link Bracelet segments */}
      <mesh position={[0, -0.1, -1.8]} material={caseMat}>
        <boxGeometry args={[1.1, 0.25, 1.2]} />
      </mesh>
      <mesh position={[0, -0.1, 1.8]} material={caseMat}>
        <boxGeometry args={[1.1, 0.25, 1.2]} />
      </mesh>
    </group>
  );
};

// Procedural Torus Ring
const ProceduralRing: React.FC<{ accentColor?: string }> = ({ accentColor = '#D6B36A' }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.4;
      groupRef.current.rotation.y += delta * 0.6;
    }
  });

  const goldMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    roughness: 0.12,
    metalness: 0.98
  }), [accentColor]);

  return (
    <group ref={groupRef}>
      <mesh material={goldMat}>
        <torusGeometry args={[1.3, 0.35, 24, 64]} />
      </mesh>
      <mesh position={[0, 1.3, 0]} material={goldMat}>
        <octahedronGeometry args={[0.35]} />
      </mesh>
    </group>
  );
};

interface Product3DViewerProps {
  modelType?: 'sneaker' | 'watch' | 'ring' | 'bag' | 'sculpture';
  fallbackImage: string;
  color?: string;
  materialType?: 'matte' | 'leather' | 'metallic';
  accentColor?: string;
  interactive?: boolean;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({
  modelType = 'sneaker',
  fallbackImage,
  color = '#0E0F14',
  materialType = 'matte',
  accentColor = '#D6B36A',
  interactive = true
}) => {
  const fallbackUI = (
    <div className="w-full h-full flex items-center justify-center p-6">
      <img
        src={fallbackImage}
        alt="3D product preview"
        className="max-h-[85%] max-w-[85%] object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );

  return (
    <div className="relative w-full h-full min-h-[420px] bg-gradient-to-b from-[#101118] to-[#08090D] flex items-center justify-center overflow-hidden">
      <CanvasErrorBoundary fallback={fallbackUI}>
        <Suspense fallback={fallbackUI}>
          <Canvas
            camera={{ position: [0, 1, 5], fov: 45 }}
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.15,
              powerPreference: 'high-performance'
            }}
            className="cursor-grab active:cursor-grabbing"
          >
            {/* Studio Lighting Rig */}
            <ambientLight intensity={0.4} />
            {/* Key Light */}
            <directionalLight position={[4, 5, 4]} intensity={2.2} color="#FFF8E7" />
            {/* Rim Light for luxury definition */}
            <directionalLight position={[-4, 3, -4]} intensity={2.8} color="#D6B36A" />
            {/* Soft Fill */}
            <directionalLight position={[0, -3, 2]} intensity={0.6} color="#7C3AED" />

            <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.5}>
              {modelType === 'sneaker' && (
                <ProceduralSneaker
                  color={color}
                  materialType={materialType}
                  accentColor={accentColor}
                />
              )}

              {modelType === 'watch' && (
                <ProceduralWatch color={color} accentColor={accentColor} />
              )}

              {(modelType === 'ring' || modelType === 'sculpture' || modelType === 'bag') && (
                <ProceduralRing accentColor={accentColor} />
              )}
            </Float>

            <ContactShadows
              position={[0, -1.8, 0]}
              opacity={0.6}
              scale={8}
              blur={2.4}
              far={4}
              color="#000000"
            />

            {interactive && (
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.8}
              />
            )}
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>

      {/* Floating 3D Badge Indicator */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] uppercase font-mono-tabular tracking-widest text-[#9698A3] bg-black/40 backdrop-blur-md px-3 py-1.5 border border-white/10">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A] animate-pulse" />
        <span>Interactive 3D Studio</span>
      </div>
    </div>
  );
};
