import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useUIStore } from '../../store/uiStore';

export const Preloader: React.FC = () => {
  const { hasLoadedPreloader, setHasLoadedPreloader } = useUIStore();
  const [percent, setPercent] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLHeadingElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show on initial session
    if (hasLoadedPreloader || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const counter = { val: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          setHasLoadedPreloader(true);
        }
      });

      // 0% - 100% Progress interpolation
      tl.to(counter, {
        val: 100,
        duration: 2.2,
        ease: 'power3.inOut',
        onUpdate: () => {
          setPercent(Math.floor(counter.val));
        }
      }, 0);

      // 25%: Gold monogram appears
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' },
        0.5
      );

      // 50%: Brand text reveals with letter tracking
      tl.fromTo(
        brandTextRef.current,
        { opacity: 0, y: 20, letterSpacing: '0.1em' },
        { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 0.8, ease: 'power3.out' },
        1.0
      );

      // 75%: Progress line expands horizontally
      tl.fromTo(
        progressLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'expo.inOut' },
        0.4
      );

      // 100%: Screen split vertically (curtains split apart)
      tl.to([logoRef.current, brandTextRef.current, progressLineRef.current], {
        opacity: 0,
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.in'
      }, 2.4);

      tl.to(
        topCurtainRef.current,
        { yPercent: -100, duration: 1.0, ease: 'power4.inOut' },
        2.7
      );

      tl.to(
        bottomCurtainRef.current,
        { yPercent: 100, duration: 1.0, ease: 'power4.inOut' },
        2.7
      );

      tl.to(
        containerRef.current,
        { display: 'none' },
        3.7
      );
    });

    return () => ctx.revert();
  }, [hasLoadedPreloader, setHasLoadedPreloader]);

  if (hasLoadedPreloader) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto overflow-hidden bg-black select-none"
    >
      {/* Top curtain */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#08090D] z-10 border-b border-[#D6B36A]/20"
      />
      {/* Bottom curtain */}
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#08090D] z-10 border-t border-[#D6B36A]/20"
      />

      {/* Center stage content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6">
        {/* Monogram emblem */}
        <div
          ref={logoRef}
          className="w-20 h-20 rounded-full border border-[#D6B36A]/40 flex items-center justify-center mb-6 relative group shadow-[0_0_40px_rgba(214,179,106,0.15)]"
        >
          <div className="absolute inset-1 rounded-full border border-[#D6B36A]/10 animate-spin" style={{ animationDuration: '18s' }} />
          <span className="font-serif-luxury text-2xl font-bold tracking-widest text-[#F3D58A]">
            LV
          </span>
        </div>

        {/* Brand Name */}
        <h1
          ref={brandTextRef}
          className="font-display text-2xl md:text-3xl font-bold tracking-[0.35em] text-[#F5F5F7] uppercase mb-4"
        >
          LUXEVOGUE
        </h1>

        <p className="text-xs uppercase tracking-[0.3em] text-[#9698A3] mb-8 font-mono-tabular">
          Haute Horlogerie & Fashion Atelier
        </p>

        {/* Thin progress line container */}
        <div className="w-56 h-[1px] bg-white/10 relative overflow-hidden mb-4">
          <div
            ref={progressLineRef}
            className="h-full bg-gradient-to-r from-[#D6B36A] via-[#F3D58A] to-[#D6B36A] origin-left"
          />
        </div>

        {/* Numerical Counter */}
        <div className="text-xs font-mono-tabular text-[#D6B36A] tracking-widest">
          {percent < 10 ? `0${percent}` : percent} — 100%
        </div>
      </div>
    </div>
  );
};
