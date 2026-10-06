import React from 'react';

export const EditorialStatement: React.FC = () => {
  return (
    <section className="relative py-36 px-6 md:px-12 bg-[#08090D] overflow-hidden border-t border-b border-white/[0.08] text-[#F5F5F7]">
      {/* Background radial light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D6B36A]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
        <span className="text-xs uppercase tracking-[0.35em] text-[#D6B36A] font-mono-tabular">
          MANIFESTO MMXXVI
        </span>

        <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[1.05] text-balance">
          DESIGNED
          <br />
          FOR THOSE
          <br />
          <span className="text-[#D6B36A] font-serif-luxury font-normal italic">
            WHO NOTICE
          </span>
          <br />
          THE DETAILS.
        </h2>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#9698A3] leading-relaxed font-light">
          We reject fast consumption and mechanical redundancy. Every garment, chronograph, and structural silhouette in our atelier is an exercise in sculptural reduction, precision engineering, and enduring luxury.
        </p>

        <div className="pt-4 flex items-center justify-center gap-8 font-mono-tabular text-xs text-[#9698A3]">
          <span>HANDCRAFTED IN LIMITED RUNS</span>
          <span>·</span>
          <span>INDIVIDUALLY SERIALIZED</span>
        </div>
      </div>
    </section>
  );
};
