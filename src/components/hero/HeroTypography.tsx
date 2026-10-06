import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useMagnetic } from '../../hooks/useMagnetic';

export const HeroTypography: React.FC = () => {
  const { setCursorVariant } = useUIStore();
  const primaryBtnRef = useMagnetic<HTMLAnchorElement>(0.25);
  const secondaryBtnRef = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <div className="relative z-20 w-full min-h-[100svh] flex flex-col justify-between px-6 md:px-12 pt-32 pb-12 pointer-events-none">
      {/* Top Editorial Kicker */}
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#9698A3] pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#D6B36A] animate-ping" />
          <span className="font-mono-tabular text-[#F5F5F7]">AUTUMN / WINTER MMXXVI</span>
        </div>
        <div className="hidden md:flex items-center gap-6 font-mono-tabular">
          <span>EDITION NO. 01</span>
          <span>·</span>
          <span>MILAN • PARIS • LAHORE</span>
        </div>
      </div>

      {/* Massive Editorial Center Typography (Framing the 3D scene) */}
      <div className="my-auto text-center flex flex-col items-center justify-center select-none">
        <div className="overflow-hidden">
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#F5F5F7] leading-none uppercase">
            LUXURY
          </h1>
        </div>

        <div className="overflow-hidden my-2">
          <div className="font-serif-luxury italic text-3xl sm:text-5xl md:text-6xl text-[#D6B36A] tracking-widest font-normal">
            IN EVERY DETAIL
          </div>
        </div>

        <div className="overflow-hidden">
          <p className="font-display font-bold text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white/30 via-white/80 to-white/30 leading-none uppercase">
            VOGUE
          </p>
        </div>
      </div>

      {/* Bottom Editorial Controls & CTAs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto">
        {/* Left Subtext */}
        <div className="max-w-xs text-xs text-[#9698A3] leading-relaxed hidden sm:block">
          <p>
            An avant-garde confluence of digital craftsmanship, high horology, and sculptural footwear.
          </p>
        </div>

        {/* Center CTAs */}
        <div className="flex items-center gap-4">
          <Link
            ref={primaryBtnRef}
            to="/shop"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#D6B36A] hover:bg-[#F3D58A] text-[#08090D] font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(214,179,106,0.3)] hover:shadow-[0_0_40px_rgba(243,213,138,0.5)]"
            onMouseEnter={() => setCursorVariant('magnetic')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <span>Explore Collection</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <Link
            ref={secondaryBtnRef}
            to="/category/all"
            className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 hover:border-[#D6B36A] bg-white/[0.02] text-[#F5F5F7] hover:text-[#F3D58A] font-medium text-xs uppercase tracking-[0.2em] transition-all"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
            <span>Discover Atelier</span>
          </Link>
        </div>

        {/* Right Scroll Indicator */}
        <div className="text-right hidden sm:block">
          <span className="text-[11px] font-mono-tabular uppercase tracking-widest text-[#9698A3]">
            SCROLL TO EXPLORE
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D6B36A] mt-2 ml-auto" />
        </div>
      </div>
    </div>
  );
};
