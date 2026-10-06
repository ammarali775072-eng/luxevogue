import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "STYLE SHOULD FEEL INHERENTLY PERSONAL, SCULPTURAL, AND UNCOMPROMISING.",
    author: "Elena Rostova",
    role: "Architect & Collector, Geneva",
    rating: 5,
    piece: "LVX Eclipse Runner No. 042"
  },
  {
    quote: "THE NOIR EDGE CHRONOGRAPH IS HOROLOGICAL SCULPTURE AT THE HIGHEST ALTITUDE.",
    author: "Marc-Antoine Laurent",
    role: "Creative Director, Paris",
    rating: 5,
    piece: "Noir Edge Chronograph"
  },
  {
    quote: "TACTILE PERFECTION. THE FRENCH BOX CALF LEATHER AND SOLID GOLD HARDWARE ARE UNMATCHED.",
    author: "Amina Al-Mansoor",
    role: "Haute Couture Stylist, Dubai",
    rating: 5,
    piece: "Aurelia Structural Tote"
  }
];

export const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  const t = TESTIMONIALS[current];

  return (
    <section className="py-32 bg-[#101118] border-t border-b border-white/[0.08] text-[#F5F5F7] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#D6B36A] font-mono-tabular">
            <Quote className="w-4 h-4" />
            <span>DISCERNING VOICES</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="p-3 border border-white/10 hover:border-[#D6B36A] text-[#9698A3] hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="p-3 border border-white/10 hover:border-[#D6B36A] text-[#9698A3] hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Large Cinematic Quote */}
        <div className="min-h-[220px] flex flex-col justify-between">
          <div>
            <div className="flex gap-1 text-[#F3D58A] mb-6">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <blockquote className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
              "{t.quote}"
            </blockquote>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono-tabular text-xs">
            <div>
              <span className="text-white font-semibold text-sm">{t.author}</span>
              <span className="text-[#9698A3] ml-3">{t.role}</span>
            </div>
            <span className="text-[#D6B36A] uppercase tracking-wider">{t.piece}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
