import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import editorialCampaignImg from '../../assets/images/luxevogue_editorial_campaign_1791303782958.jpg';
import sneakerEclipseImg from '../../assets/images/luxevogue_sneaker_eclipse_1791303730840.jpg';
import chronographNoirImg from '../../assets/images/luxevogue_chronograph_noir_1791303749361.jpg';

export const AtelierSpotlight: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#0B0C11] text-[#F5F5F7] border-t border-b border-white/[0.08] overflow-hidden">
      {/* Background ambient gold gradient glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#D6B36A]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#D6B36A] font-mono-tabular mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CRAFTSMANSHIP MANIFESTO</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              THE ATELIER STANDARD
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#9698A3] max-w-md font-light leading-relaxed">
            Bridging aerospace engineering and Parisian haute maroquinerie. Every millimeter calibrated for lifetime permanence.
          </p>
        </div>

        {/* Feature Split Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Main Campaign Visual */}
          <div className="lg:col-span-7 relative bg-[#101118] border border-white/10 overflow-hidden group min-h-[420px] flex flex-col justify-end p-8 sm:p-12">
            <img
              src={editorialCampaignImg}
              alt="LUXEVOGUE Campaign Showcase"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-[#08090D]/50 to-transparent" />

            <div className="relative z-10 space-y-3">
              <span className="text-[11px] font-mono-tabular uppercase tracking-[0.25em] text-[#D6B36A] px-3 py-1 bg-black/60 backdrop-blur-md border border-[#D6B36A]/30 inline-block">
                AUTUMN / WINTER MMXXVI CAMPAIGN
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white leading-tight">
                Sculptural Form in Motion
              </h3>
              <p className="text-xs sm:text-sm text-[#9698A3] max-w-lg line-clamp-2">
                Minimalist tailoring layered over titanium choker collars and precision horology. Designed for nocturnal ease and quiet authority.
              </p>

              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#F3D58A] font-bold group-hover:text-white transition-colors"
                >
                  <span>Explore Campaign Gallery</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Dual Showcase Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Card 1: Horology Skeleton */}
            <div className="p-6 bg-[#101118] border border-white/10 hover:border-[#D6B36A]/40 transition-all flex items-center gap-5 group">
              <img
                src={chronographNoirImg}
                alt="Horology Detail"
                className="w-24 h-28 object-cover bg-[#161821] shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
              />
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] uppercase tracking-widest text-[#D6B36A] font-mono-tabular">
                  HAUTE HORLOGERIE
                </span>
                <h4 className="font-serif-luxury text-base font-bold text-white group-hover:text-[#F3D58A] transition-colors">
                  Monobloc Ceramic Caliber
                </h4>
                <p className="text-xs text-[#9698A3] line-clamp-2">
                  Double-domed anti-reflective sapphire crystal with hand-beveled 18k aurum bridge mechanics.
                </p>
                <Link
                  to="/category/watches"
                  className="text-[11px] font-mono-tabular uppercase tracking-wider text-white inline-flex items-center gap-1 pt-1 hover:text-[#D6B36A]"
                >
                  <span>Inspect Movement</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Card 2: Footwear Architecture */}
            <div className="p-6 bg-[#101118] border border-white/10 hover:border-[#D6B36A]/40 transition-all flex items-center gap-5 group">
              <img
                src={sneakerEclipseImg}
                alt="Footwear Detail"
                className="w-24 h-28 object-cover bg-[#161821] shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
              />
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] uppercase tracking-widest text-[#D6B36A] font-mono-tabular">
                  SCULPTURAL SNEAKERS
                </span>
                <h4 className="font-serif-luxury text-base font-bold text-white group-hover:text-[#F3D58A] transition-colors">
                  Bionic Carbon Plate Damping
                </h4>
                <p className="text-xs text-[#9698A3] line-clamp-2">
                  Aerodynamic Italian knit combined with 18k champagne gold titanium heel stabilizers.
                </p>
                <Link
                  to="/category/sneakers"
                  className="text-[11px] font-mono-tabular uppercase tracking-wider text-white inline-flex items-center gap-1 pt-1 hover:text-[#D6B36A]"
                >
                  <span>View Silhouette</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10">
          <div className="space-y-2 p-4 bg-white/[0.01] border border-white/[0.04]">
            <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-[#D6B36A]">
              <Layers className="w-4 h-4" />
              <span>01. Carbon Fiber Chassis</span>
            </div>
            <p className="text-xs text-[#9698A3] leading-relaxed">
              Aerospace composite lattices provide high torsional stiffness with near-zero gravitational mass.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-white/[0.01] border border-white/[0.04]">
            <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-[#D6B36A]">
              <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
              <span>02. 18k Royal Gold Aurum</span>
            </div>
            <p className="text-xs text-[#9698A3] leading-relaxed">
              Recycled 750/1000 precious metallurgy hallmarked and certified by independent Swiss assay offices.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-white/[0.01] border border-white/[0.04]">
            <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-[#D6B36A]">
              <Compass className="w-4 h-4 text-[#D6B36A]" />
              <span>03. French Box Calfskin</span>
            </div>
            <p className="text-xs text-[#9698A3] leading-relaxed">
              Organic vegetable-tanned French leather hand-sewn with double saddle stitching in Milan ateliers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
