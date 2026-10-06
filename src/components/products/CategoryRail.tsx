import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

import sneakerImg from '../../assets/images/luxevogue_sneaker_eclipse_1791303730840.jpg';
import watchImg from '../../assets/images/luxevogue_chronograph_noir_1791303749361.jpg';
import bagImg from '../../assets/images/luxevogue_handbag_aurelia_1791303767142.jpg';
import editorialImg from '../../assets/images/luxevogue_editorial_campaign_1791303782958.jpg';

interface CategorySlide {
  num: string;
  name: string;
  tagline: string;
  slug: string;
  image: string;
  material: string;
}

const CATEGORY_SLIDES: CategorySlide[] = [
  {
    num: "01",
    name: "SCULPTURAL SNEAKERS",
    tagline: "Aerodynamic silhouettes, carbon fiber chassis, gold titanium accents.",
    slug: "sneakers",
    image: sneakerImg,
    material: "Obsidian & Carbon"
  },
  {
    num: "02",
    name: "HAUTE HORLOGERIE",
    tagline: "Skeletonized ceramic calibers, sapphire crystals, magnetic orbital indices.",
    slug: "watches",
    image: watchImg,
    material: "Black Ceramic & 18k Gold"
  },
  {
    num: "03",
    name: "ARCHITECTURAL MAROQUINERIE",
    tagline: "Hand-sculpted French box calf leather with milled brass hardware.",
    slug: "bags",
    image: bagImg,
    material: "French Box Calf"
  },
  {
    num: "04",
    name: "FINE JOAILLERIE",
    tagline: "Infinite Torus loops and tension-set gemstones in 18k royal gold.",
    slug: "jewelry",
    image: editorialImg,
    material: "18k Recycled Gold"
  },
  {
    num: "05",
    name: "COUTURE ACCESSORIES",
    tagline: "Japanese high-density acetate eyewear and RFID-shielded leather goods.",
    slug: "accessories",
    image: watchImg,
    material: "Zeiss & Titanium"
  }
];

export const CategoryRail: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursorVariant } = useUIStore();

  return (
    <section className="relative py-28 bg-[#08090D] overflow-hidden border-t border-b border-white/[0.08]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#D6B36A] font-mono-tabular">
            CURATED PILLARS
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mt-2">
            COLLECTION HORIZONS
          </h2>
        </div>

        <p className="text-xs uppercase tracking-widest text-[#9698A3] font-mono-tabular">
          DRAG OR SCROLL HORIZONTALLY (01 — 05)
        </p>
      </div>

      {/* Horizontal Rail */}
      <div
        ref={containerRef}
        className="flex gap-8 overflow-x-auto px-6 md:px-12 pb-8 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseEnter={() => setCursorVariant('drag', 'DRAG')}
        onMouseLeave={() => setCursorVariant('default')}
      >
        {CATEGORY_SLIDES.map((cat) => (
          <Link
            key={cat.slug}
            to={`/category/${cat.slug}`}
            className="group relative flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-[60vw] h-[520px] bg-[#101118] border border-white/10 hover:border-[#D6B36A]/50 transition-all duration-500 overflow-hidden snap-center select-none"
            onMouseEnter={() => setCursorVariant('product', 'EXPLORE')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            {/* Background Image with Parallax Zoom */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-[0.7] group-hover:brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-[#08090D]/40 to-transparent" />
            </div>

            {/* Top Number & Tag */}
            <div className="relative z-10 p-8 flex items-center justify-between text-xs font-mono-tabular">
              <span className="text-3xl font-light text-[#D6B36A]">{cat.num}</span>
              <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[#F5F5F7]">
                {cat.material}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 mt-auto p-8 flex flex-col justify-end">
              <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-[#F3D58A] transition-colors uppercase">
                {cat.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#9698A3] mt-2 max-w-md line-clamp-2">
                {cat.tagline}
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-[#D6B36A] font-semibold">
                <span>View Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
