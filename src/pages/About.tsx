import React from 'react';
import editorialImg from '../assets/images/luxevogue_editorial_campaign_1791303782958.jpg';
import { SignatureLuxuryObject } from '../components/sections/SignatureLuxuryObject';
import { Stats } from '../components/sections/Stats';

export const About: React.FC = () => {
  return (
    <div className="pt-32 pb-28 px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-[#F5F5F7]">
      {/* Hero Header */}
      <div className="border-b border-white/10 pb-12 mb-16 text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.35em] text-[#D6B36A] font-mono-tabular">
          HERITAGE & MANIFESTO
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white mt-3 uppercase">
          THE LUXEVOGUE ATELIER
        </h1>
        <p className="text-sm sm:text-base text-[#9698A3] mt-4 leading-relaxed font-light">
          Founded on the philosophy that style transcends ephemeral novelty. We unite haute horology, sculptural footwear, architectural leatherwork, and digital art installations into single timeless creations.
        </p>
      </div>

      {/* Editorial Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#D6B36A] font-mono-tabular">
            01 · MATERIAL INTEGRITY
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold text-white">
            Uncompromising Metallurgy & French Leathercraft
          </h2>
          <p className="text-sm text-[#9698A3] leading-relaxed">
            Every millimeter of our work undergoes exhaustive material stress testing. We source French box calfskins from century-old family tanneries, 18-karat recycled royal gold certified by Swiss assay authorities, and aerospace grade titanium.
          </p>
          <p className="text-sm text-[#9698A3] leading-relaxed">
            Rather than producing thousands of identical garments, each silhouette is produced in serialized batches of strictly 50 to 200 pieces worldwide.
          </p>
        </div>

        <div className="h-[480px] bg-[#101118] border border-white/10 overflow-hidden">
          <img
            src={editorialImg}
            alt="LUXEVOGUE Editorial Campaign"
            className="w-full h-full object-cover filter brightness-90"
          />
        </div>
      </div>

      {/* 3D Sculpture Installation */}
      <SignatureLuxuryObject />

      {/* Stats Proof */}
      <Stats />
    </div>
  );
};
