import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { formatPrice } from '../../lib/utils';
import { Product } from '../../types/ecommerce';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      setResults([]);
      return;
    }

    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
    setResults(filtered.slice(0, 6));
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#08090D]/95 backdrop-blur-3xl flex flex-col p-6 md:p-12 animate-fade-in text-[#F5F5F7]">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between mb-8">
        <span className="font-serif-luxury text-sm tracking-[0.2em] text-[#D6B36A] uppercase">
          Curated Search
        </span>
        <button
          onClick={closeSearch}
          className="p-2 text-[#9698A3] hover:text-white transition-colors"
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Search Input */}
      <div className="max-w-4xl mx-auto w-full">
        <div className="relative border-b-2 border-white/20 focus-within:border-[#D6B36A] transition-colors pb-4 flex items-center gap-4">
          <Search className="w-7 h-7 text-[#D6B36A]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the collection..."
            className="w-full bg-transparent text-xl md:text-3xl font-serif-luxury text-[#F5F5F7] placeholder-[#9698A3]/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#9698A3] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Collections if empty query */}
        {!query && (
          <div className="mt-12 space-y-6">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#9698A3]">
              Curated Categories
            </h4>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => {
                    closeSearch();
                    navigate(`/category/${cat.slug}`);
                  }}
                  className="px-4 py-2 border border-white/10 hover:border-[#D6B36A] text-xs uppercase tracking-wider text-[#F5F5F7] transition-all bg-white/[0.02]"
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="pt-6">
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#9698A3] mb-4">
                Trending Searches
              </h4>
              <div className="flex flex-wrap gap-2 text-sm text-[#9698A3]">
                {['Eclipse Runner', 'Skeleton Chronograph', 'Torus Gold Ring', 'French Box Calf'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="hover:text-[#F3D58A] transition-colors text-xs underline underline-offset-4 mr-4"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Results */}
        {query && (
          <div className="mt-8 overflow-y-auto max-h-[60vh] space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#9698A3] mb-2">
              Found {results.length} piece{results.length === 1 ? '' : 's'}
            </div>

            {results.length === 0 ? (
              <div className="py-12 text-center text-[#9698A3] text-sm">
                No matching luxury editions found for "{query}".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      closeSearch();
                      navigate(`/product/${product.slug}`);
                    }}
                    className="flex items-center gap-4 p-3 bg-white/[0.02] border border-white/10 hover:border-[#D6B36A]/50 transition-all cursor-pointer group"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 object-cover bg-[#161821] shrink-0"
                    />
                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#9698A3]">
                        {product.brand}
                      </span>
                      <h4 className="text-sm font-medium text-white group-hover:text-[#F3D58A] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs font-mono-tabular text-[#D6B36A] mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9698A3] group-hover:text-white group-hover:translate-x-1 transition-all mr-2" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
