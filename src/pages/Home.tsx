import React from 'react';
import { Hero3DCanvas } from '../components/three/Hero3DCanvas';
import { HeroTypography } from '../components/hero/HeroTypography';
import { ScrollStorytelling } from '../components/hero/ScrollStorytelling';
import { AtelierSpotlight } from '../components/sections/AtelierSpotlight';
import { CategoryRail } from '../components/products/CategoryRail';
import { ProductGrid } from '../components/products/ProductGrid';
import { SignatureLuxuryObject } from '../components/sections/SignatureLuxuryObject';
import { CustomizerLab } from '../components/sections/CustomizerLab';
import { EditorialStatement } from '../components/sections/EditorialStatement';
import { Testimonials } from '../components/sections/Testimonials';
import { Stats } from '../components/sections/Stats';
import { Marquee } from '../components/sections/Marquee';
import { PRODUCTS } from '../data/products';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <div className="relative w-full bg-[#08090D] overflow-x-hidden">
      {/* 1. IMMERSIVE 3D HERO */}
      <section className="relative w-full min-h-[100svh] overflow-hidden flex items-center justify-center">
        {/* Real-Time Interactive 3D Canvas */}
        <Hero3DCanvas />
        {/* Layered Editorial Typography */}
        <HeroTypography />
      </section>

      {/* 2. PINNED 3D SCROLL STORYTELLING */}
      <ScrollStorytelling />

      {/* 2.5 ATELIER CRAFTSMANSHIP SPOTLIGHT */}
      <AtelierSpotlight />

      {/* 3. HORIZONTAL SCROLL CATEGORY RAILS */}
      <CategoryRail />

      {/* 4. EDITORIAL PRODUCT SHOWCASE */}
      <section className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#D6B36A] font-mono-tabular">
              CURATED ATELIER SELECTION
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2">
              SIGNATURE EDITIONS
            </h2>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D6B36A] hover:text-[#F3D58A] transition-colors font-mono-tabular group"
          >
            <span>View All 16 Masterpieces</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Luxury Product Grid */}
        <ProductGrid products={featuredProducts} asymmetric={true} />
      </section>

      {/* 5. SIGNATURE 3D SECTION ("THE LUXEVOGUE OBJECT") */}
      <SignatureLuxuryObject />

      {/* 6. INTERACTIVE PRODUCT LAB ("CUSTOMIZE YOUR STYLE") */}
      <CustomizerLab />

      {/* 7. EDITORIAL STATEMENT */}
      <EditorialStatement />

      {/* 8. INFINITE MARQUEE */}
      <Marquee />

      {/* 9. SOCIAL PROOF / CINEMATIC TESTIMONIALS */}
      <Testimonials />

      {/* 10. METRIC STATS */}
      <Stats />
    </div>
  );
};
