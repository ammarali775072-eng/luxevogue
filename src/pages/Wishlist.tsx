import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';
import { Heart, Trash2, ArrowRight } from 'lucide-react';

export const Wishlist: React.FC = () => {
  const { productIds, clearWishlist } = useWishlistStore();

  const wishlistProducts = PRODUCTS.filter((p) => productIds.includes(p.id));

  return (
    <div className="pt-32 pb-28 px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-[#F5F5F7]">
      {/* Header */}
      <div className="border-b border-white/10 pb-8 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#D6B36A] font-mono-tabular">
            PRIVATE ARCHIVE
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mt-2">
            CURATED WISHLIST ({wishlistProducts.length})
          </h1>
          <p className="text-sm text-[#9698A3] mt-2">
            Your saved editions awaiting private acquisition.
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <button
            onClick={clearWishlist}
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#9698A3] hover:text-red-400 transition-colors font-mono-tabular"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Archive</span>
          </button>
        )}
      </div>

      {/* Content */}
      {wishlistProducts.length === 0 ? (
        <div className="py-24 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mx-auto text-[#9698A3]">
            <Heart className="w-8 h-8 opacity-30" />
          </div>
          <h3 className="font-serif-luxury text-2xl font-bold text-white">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs text-[#9698A3] leading-relaxed">
            Select the heart icon on any sculptural creation to curate your private acquisition list.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D6B36A] text-[#08090D] text-xs uppercase font-bold tracking-widest mt-4 hover:bg-[#F3D58A] transition-colors"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <ProductGrid products={wishlistProducts} />
      )}
    </div>
  );
};
