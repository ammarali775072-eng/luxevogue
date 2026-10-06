import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterPanel } from '../components/products/FilterPanel';
import { ProductGrid } from '../components/products/ProductGrid';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { LayoutGrid, Grid3X3, SlidersHorizontal, Search as SearchIcon } from 'lucide-react';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'all';
  const initialSort = searchParams.get('sort') || 'featured';
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState(initialSort);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
    const s = searchParams.get('sort');
    if (s) setSortBy(s);
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setSearchParams(params);
  };

  const handleReset = () => {
    setSelectedCategory('all');
    setMaxPrice(5000);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchQuery('');
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Price filter
      if (p.price > maxPrice) {
        return false;
      }
      // Stock filter
      if (inStockOnly && p.stock <= 0) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [selectedCategory, maxPrice, inStockOnly, sortBy, searchQuery]);

  return (
    <div className="pt-32 pb-28 px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-[#F5F5F7]">
      {/* Header */}
      <div className="border-b border-white/10 pb-10 mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D6B36A] font-mono-tabular">
          CATALOGUE MMXXVI
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white mt-2">
          THE COMPLETE SHOP
        </h1>
        <p className="text-sm text-[#9698A3] mt-2 max-w-xl">
          Curated pieces for modern living. Explore hand-crafted chronographs, sculptural sneakers, structural leather goods, and 18k joaillerie.
        </p>

        {/* Search bar inside shop */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="relative max-w-md w-full">
            <SearchIcon className="w-4 h-4 text-[#9698A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, material, brand..."
              className="w-full bg-[#101118] border border-white/10 pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#9698A3] focus:outline-none focus:border-[#D6B36A]"
            />
          </div>

          <button
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className="lg:hidden flex items-center justify-center gap-2 py-2.5 px-4 border border-white/20 text-xs uppercase tracking-wider text-white bg-[#101118]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#D6B36A]" />
            <span>Filter & Sort</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout: Sidebar on Desktop + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28">
            <FilterPanel
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              inStockOnly={inStockOnly}
              onInStockToggle={() => setInStockOnly(!inStockOnly)}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onReset={handleReset}
              totalCount={filteredProducts.length}
            />
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {isFilterDrawerOpen && (
          <div className="lg:hidden col-span-1 mb-6">
            <FilterPanel
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              inStockOnly={inStockOnly}
              onInStockToggle={() => setInStockOnly(!inStockOnly)}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onReset={handleReset}
              totalCount={filteredProducts.length}
            />
          </div>
        )}

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6 text-xs text-[#9698A3] font-mono-tabular">
            <span>Showing {filteredProducts.length} of {PRODUCTS.length} creations</span>
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Complimentary Global Delivery</span>
            </div>
          </div>

          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};
