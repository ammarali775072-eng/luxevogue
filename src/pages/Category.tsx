import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductGrid } from '../components/products/ProductGrid';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ArrowLeft } from 'lucide-react';

export const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const currentCategory = CATEGORIES.find((c) => c.slug === slug) || {
    slug: 'all',
    name: 'All Collections',
    subtitle: 'Full Atelier Spectrum'
  };

  const filteredProducts = useMemo(() => {
    if (!slug || slug === 'all') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === slug);
  }, [slug]);

  return (
    <div className="pt-32 pb-28 px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-[#F5F5F7]">
      {/* Header */}
      <div className="border-b border-white/10 pb-10 mb-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D6B36A] hover:text-white font-mono-tabular mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Collections</span>
        </Link>

        <span className="text-xs uppercase tracking-[0.3em] text-[#9698A3] font-mono-tabular block mt-2">
          {currentCategory.subtitle || 'EXCLUSIVE ARCHIVE'}
        </span>

        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white mt-2 uppercase">
          {currentCategory.name}
        </h1>

        <p className="text-sm text-[#9698A3] mt-2 max-w-xl">
          Crafted with uncompromising precision in limited serial numbers.
        </p>

        {/* Categories Navigation Pills / Tabs */}
        <div className="flex flex-wrap gap-2 mt-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all ${
                slug === cat.slug || (!slug && cat.slug === 'all')
                  ? 'bg-[#D6B36A] text-[#08090D] border-[#D6B36A] font-bold'
                  : 'bg-white/[0.02] border-white/10 text-[#9698A3] hover:border-white/30 hover:text-white'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
};
