import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="pt-32 pb-28 px-6 md:px-12 max-w-4xl mx-auto min-h-screen text-[#F5F5F7] flex flex-col items-center justify-center text-center">
      <span className="font-mono-tabular text-sm text-[#D6B36A] tracking-[0.3em] uppercase mb-4">
        404 · ATELIER UNRESOLVED
      </span>
      <h1 className="font-display font-extrabold text-6xl sm:text-8xl tracking-tight text-white mb-6 uppercase">
        LOST IN THE VOID
      </h1>
      <p className="text-sm text-[#9698A3] max-w-md mb-8">
        The requested archive coordinate does not exist or has been retired into private permanent collections.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-8 py-4 bg-[#D6B36A] hover:bg-[#F3D58A] text-[#08090D] font-bold text-xs uppercase tracking-[0.2em] transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Sanctuary</span>
      </Link>
    </div>
  );
};
