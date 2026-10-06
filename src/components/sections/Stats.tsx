import React from 'react';

const STATS = [
  { value: "50K+", label: "Discerning Clients", sub: "Across 48 Countries" },
  { value: "120K+", label: "Atelier Deliveries", sub: "Insured White-Glove" },
  { value: "4.9 / 5", label: "Client Satisfaction", sub: "Independently Audited" },
  { value: "98%", label: "Exclusive Retention", sub: "Private Salon Members" }
];

export const Stats: React.FC = () => {
  return (
    <section className="py-24 bg-[#08090D] border-t border-b border-white/[0.08] text-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="space-y-2 border-l border-[#D6B36A]/30 pl-6"
            >
              <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#F3D58A] font-mono-tabular">
                {stat.value}
              </div>
              <div className="font-serif-luxury text-sm font-semibold tracking-wider text-white">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#9698A3] uppercase tracking-wider font-mono-tabular">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
