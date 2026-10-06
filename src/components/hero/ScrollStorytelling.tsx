import React, { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../lib/utils';
import { CanvasErrorBoundary } from '../three/CanvasErrorBoundary';

gsap.registerPlugin(ScrollTrigger);

// 3D Animated Story Mesh controlled by scroll progress (0 to 1)
const Story3DObject: React.FC<{ progress: number }> = ({ progress }) => {
  const group = useRef<THREE.Group>(null);
  const partSole = useRef<THREE.Mesh>(null);
  const partUpper = useRef<THREE.Mesh>(null);
  const partGoldPlate = useRef<THREE.Mesh>(null);
  const partHeel = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!group.current) return;

    // Continuous smooth rotation influenced by scroll progress
    group.current.rotation.y = progress * Math.PI * 3.5;
    group.current.rotation.x = Math.sin(progress * Math.PI * 2) * 0.35 + 0.1;
    group.current.position.y = Math.cos(progress * Math.PI * 2) * 0.25;

    // Exploded View Dynamics during 0.45 - 0.75 progress
    const explodeFactor = Math.sin(Math.PI * Math.min(1, Math.max(0, (progress - 0.35) / 0.4)));

    if (partSole.current) {
      partSole.current.position.y = -0.6 - explodeFactor * 0.9;
    }
    if (partUpper.current) {
      partUpper.current.position.y = 0.1 + explodeFactor * 0.8;
    }
    if (partGoldPlate.current) {
      partGoldPlate.current.position.z = explodeFactor * 0.7;
    }
    if (partHeel.current) {
      partHeel.current.position.x = -1.6 - explodeFactor * 0.8;
    }
  });

  const goldMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#D6B36A'),
    roughness: 0.15,
    metalness: 0.96,
  }), []);

  const noirMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0A0B0E'),
    roughness: 0.4,
    metalness: 0.2,
  }), []);

  const carbonMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#161821'),
    roughness: 0.3,
    metalness: 0.8,
  }), []);

  return (
    <group ref={group} scale={1.3}>
      {/* Sole Chassis */}
      <mesh ref={partSole} position={[0, -0.6, 0]} material={noirMat}>
        <boxGeometry args={[3.6, 0.45, 1.5]} />
      </mesh>

      {/* Gold Kinetic Plate */}
      <mesh ref={partGoldPlate} position={[0, -0.32, 0]} material={goldMat}>
        <boxGeometry args={[3.8, 0.08, 1.4]} />
      </mesh>

      {/* Main Upper Monobloc */}
      <mesh ref={partUpper} position={[-0.2, 0.1, 0]} material={carbonMat}>
        <boxGeometry args={[2.7, 0.85, 1.3]} />
      </mesh>

      {/* Toe Arc */}
      <mesh position={[1.2, -0.05, 0]} rotation={[0, 0, -0.2]} material={noirMat}>
        <coneGeometry args={[0.7, 1.4, 24]} />
      </mesh>

      {/* Heel Cage */}
      <mesh ref={partHeel} position={[-1.6, 0.1, 0]} material={goldMat}>
        <boxGeometry args={[0.35, 0.75, 1.35]} />
      </mesh>
    </group>
  );
};

export const ScrollStorytelling: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const heroProduct = PRODUCTS[0]; // LVX Eclipse Runner
  const { addItem } = useCartStore();
  const { openCart, addToast } = useUIStore();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Compute active scene text from progress
  const getSceneDetails = () => {
    if (scrollProgress < 0.18) {
      return {
        number: "01",
        title: "DISCOVER",
        subtitle: "AERODYNAMIC EQUILIBRIUM",
        desc: "Forged at the threshold of couture aesthetics and biomechanical aerodynamics."
      };
    } else if (scrollProgress < 0.38) {
      return {
        number: "02",
        title: "CRAFTED",
        subtitle: "PRECISION ARCHITECTURE",
        desc: "Each lattice curve engineered through micro-milled aerospace grade carbon fiber."
      };
    } else if (scrollProgress < 0.62) {
      return {
        number: "03",
        title: "ANATOMY",
        subtitle: "EXPLODED DYNAMICS",
        desc: "Independent dynamic damping system paired with 18k champagne gold stabilizing plates."
      };
    } else if (scrollProgress < 0.85) {
      return {
        number: "04",
        title: "AURUM & NOIR",
        subtitle: "MATERIALITY ELEVATED",
        desc: "Deep obsidian volcanic textures contrasted with solid brushed gold accents."
      };
    } else {
      return {
        number: "05",
        title: "ATELIER REALITY",
        subtitle: "THE FINISHED MASTERPIECE",
        desc: "Ready for private acquisition. Handcrafted and individually serial-numbered."
      };
    }
  };

  const scene = getSceneDetails();
  const isFinalCard = scrollProgress > 0.82;

  const handleQuickAdd = () => {
    addItem(heroProduct);
    addToast({
      title: "Added to your bag",
      description: `${heroProduct.name} — ${formatPrice(heroProduct.price)}`,
      type: "gold"
    });
    openCart();
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[200vh] bg-[#08090D] text-[#F5F5F7]"
    >
      {/* Pinned 100vh viewport */}
      <div
        ref={pinSectionRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 md:p-14"
      >
        {/* Background Atmospheric Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#D6B36A]/5 blur-[140px] transition-all duration-700"
            style={{
              transform: `translate(-50%, -50%) scale(${1 + scrollProgress * 0.4})`
            }}
          />
        </div>

        {/* Top Header of Pinned Scene */}
        <div className="relative z-20 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-[#9698A3]">
          <div className="flex items-center gap-3">
            <span className="font-mono-tabular text-[#D6B36A] font-semibold">{scene.number}</span>
            <span className="w-8 h-[1px] bg-white/20" />
            <span className="text-[#F5F5F7]">{scene.title}</span>
          </div>
          <div className="font-mono-tabular text-right">
            <span>STORY PROGRESS {Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>

        {/* 3D Canvas in Center */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center">
          <CanvasErrorBoundary
            fallback={
              <div className="w-full h-full flex items-center justify-center opacity-40">
                <div className="w-64 h-64 rounded-full border border-[#D6B36A]/20" />
              </div>
            }
          >
            <Suspense fallback={null}>
              <Canvas
                camera={{ position: [0, 0.5, 6], fov: 40 }}
                gl={{
                  antialias: true,
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.25
                }}
              >
                <ambientLight intensity={0.4} />
                <directionalLight position={[4, 5, 4]} intensity={2.5} color="#FFF8E8" />
                <directionalLight position={[-4, 3, -4]} intensity={3.5} color="#D6B36A" />
                <directionalLight position={[0, -3, 2]} intensity={0.8} color="#22D3EE" />

                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
                  <Story3DObject progress={scrollProgress} />
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

        {/* Dynamic Editorial Floating Typography Overlay */}
        <div className="relative z-20 max-w-lg mt-auto mb-10 transition-all duration-500 pointer-events-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D6B36A] font-mono-tabular">
            {scene.subtitle}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2 mb-4 leading-tight">
            {scene.title}
          </h2>
          <p className="text-sm text-[#9698A3] leading-relaxed max-w-md">
            {scene.desc}
          </p>
        </div>

        {/* SIGNATURE TRANSITION: Transformation into Real Ecommerce Card at 85%+ */}
        <div
          className={`absolute bottom-10 right-6 md:right-14 z-30 transition-all duration-700 max-w-sm w-full ${
            isFinalCard
              ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
              : 'opacity-0 translate-y-8 pointer-events-none scale-95'
          }`}
        >
          <div className="p-6 bg-[#101118]/95 backdrop-blur-2xl border border-[#D6B36A]/40 text-[#F5F5F7] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-widest text-[#D6B36A] font-mono-tabular">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Featured Acquisition
              </span>
              <span>In Stock · Ltd Run</span>
            </div>

            <h3 className="font-serif-luxury text-xl font-bold text-white">
              {heroProduct.name}
            </h3>
            <p className="text-xs text-[#9698A3] mt-1 line-clamp-2">
              {heroProduct.shortDescription}
            </p>

            <div className="flex items-center justify-between my-4 pt-3 border-t border-white/10">
              <div>
                <span className="text-[10px] uppercase text-[#9698A3] block">Atelier Price</span>
                <span className="font-mono-tabular text-lg font-bold text-[#F3D58A]">
                  {formatPrice(heroProduct.price)}
                </span>
              </div>
              <span className="text-xs font-mono-tabular text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                White-Glove Certified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleQuickAdd}
                className="flex items-center justify-center gap-2 py-3 bg-[#D6B36A] hover:bg-[#F3D58A] text-[#08090D] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Buy Now</span>
              </button>

              <Link
                to={`/product/${heroProduct.slug}`}
                className="flex items-center justify-center gap-1.5 py-3 border border-white/20 hover:border-white text-xs uppercase tracking-wider text-white transition-colors"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
