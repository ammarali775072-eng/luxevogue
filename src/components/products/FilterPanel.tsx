import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import { formatPrice } from '../../lib/utils';

interface FilterPanelProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  inStockOnly: boolean;
  onInStockToggle: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onReset: () => void;
  totalCount: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategory,
  onSelectCategory,
  maxPrice,
  onMaxPriceChange,
  inStockOnly,
  onInStockToggle,
  sortBy,
  onSortChange,
  onReset,
  totalCount
}) => {
  return (
    <div className="bg-[#101118]/80 backdrop-blur-md border border-white/[0.08] p-6 text-[#F5F5F7] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D6B36A] font-semibold">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Curated Filters ({totalCount})</span>
        </div>
        <button
          onClick={onReset}
          className="text-[11px] uppercase tracking-wider text-[#9698A3] hover:text-white flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Selection */}
      <div className="space-y-3">
        <label className="text-[11px] uppercase tracking-widest text-[#9698A3] font-mono-tabular">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-all border ${
                selectedCategory === cat.slug
                  ? 'bg-[#D6B36A] text-[#08090D] border-[#D6B36A] font-semibold'
                  : 'bg-white/[0.02] border-white/10 text-[#9698A3] hover:border-white/30 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[11px] uppercase tracking-widest font-mono-tabular">
          <span className="text-[#9698A3]">Max Price</span>
          <span className="text-[#F3D58A] font-bold">{formatPrice(maxPrice)}</span>
        </div>
        <input
          type="range"
          min="300"
          max="5000"
          step="100"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-[#D6B36A] bg-white/10 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#9698A3] font-mono-tabular">
          <span>$300</span>
          <span>$5,000+</span>
        </div>
      </div>

      {/* Sorting Dropdown */}
      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-widest text-[#9698A3] font-mono-tabular">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full bg-[#161821] border border-white/10 p-2.5 text-xs text-white uppercase tracking-wider focus:outline-none focus:border-[#D6B36A]"
        >
          <option value="featured">Featured Atelier</option>
          <option value="newest">New Arrivals</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* In-Stock Toggle */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-[#9698A3] uppercase tracking-wider">
          Available In Stock Only
        </span>
        <button
          onClick={onInStockToggle}
          className={`w-11 h-6 flex items-center p-1 rounded-full transition-colors ${
            inStockOnly ? 'bg-[#D6B36A]' : 'bg-white/10'
          }`}
          aria-label="Toggle in stock filter"
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform ${
              inStockOnly ? 'translate-x-5 bg-[#08090D]' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
