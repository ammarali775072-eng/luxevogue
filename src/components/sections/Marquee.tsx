import React from 'react';

const WORDS_ROW_1 = [
  "LUXURY", "CRAFT", "HOROLOGY", "ATELIER", "SCULPTURAL", "EDITION MMXXVI", "QUALITY", "DETAIL", "PRECISION"
];

const WORDS_ROW_2 = [
  "STYLE HAS NO LIMITS", "PARIS", "MILAN", "LAHORE", "AERODYNAMICS", "BESPOKE", "LIMITED EDITION", "18K AURUM", "OBSIDIAN"
];

export const Marquee: React.FC = () => {
  return (
    <div className="py-14 bg-[#08090D] border-t border-b border-white/[0.08] overflow-hidden select-none space-y-4">
      {/* Row 1: Forward */}
      <div className="overflow-hidden whitespace-nowrap flex group">
        <div className="animate-marquee flex items-center gap-12 font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-[0.2em] text-white/20 group-hover:text-white/40 transition-colors">
          {[...WORDS_ROW_1, ...WORDS_ROW_1].map((word, idx) => (
            <React.Fragment key={idx}>
              <span className={idx % 2 === 1 ? "text-stroke-gold" : ""}>{word}</span>
              <span className="text-[#D6B36A] text-lg">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse */}
      <div className="overflow-hidden whitespace-nowrap flex group">
        <div className="animate-marquee-reverse flex items-center gap-12 font-serif-luxury text-2xl sm:text-4xl italic tracking-[0.25em] text-[#D6B36A]/30 group-hover:text-[#D6B36A]/60 transition-colors">
          {[...WORDS_ROW_2, ...WORDS_ROW_2].map((word, idx) => (
            <React.Fragment key={idx}>
              <span>{word}</span>
              <span className="text-white/20 text-sm">/</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
