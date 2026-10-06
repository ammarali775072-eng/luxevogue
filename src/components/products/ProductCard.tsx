import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../../types/ecommerce';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUIStore } from '../../store/uiStore';
import { formatPrice } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
  asymmetric?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, asymmetric = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { openCart, addToast, setCursorVariant } = useUIStore();

  const isFavorited = isInWishlist(product.id);
  const secondaryImage = product.images[1] || product.thumbnail;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    addToast({
      title: "Added to Bag",
      description: `${product.name} — ${formatPrice(product.price)}`,
      type: "gold"
    });
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    addToast({
      title: added ? "Added to Wishlist" : "Removed from Wishlist",
      description: product.name,
      type: "info"
    });
  };

  return (
    <div
      className={`group relative flex flex-col bg-[#101118] border border-white/[0.08] hover:border-[#D6B36A]/40 transition-all duration-500 overflow-hidden ${
        asymmetric ? 'lg:col-span-2' : ''
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
        setCursorVariant('product', 'VIEW');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorVariant('default');
      }}
    >
      {/* Visual Canvas Container */}
      <Link
        to={`/product/${product.slug}`}
        className="relative w-full aspect-[4/5] overflow-hidden bg-[#161821] block"
      >
        {/* Primary Image */}
        <img
          src={product.thumbnail}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isHovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
          }`}
        />

        {/* Secondary Image on Hover */}
        <img
          src={secondaryImage}
          alt={`${product.name} view`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
            isHovered ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
          }`}
        />

        {/* Top Badges & Actions */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {product.badge ? (
            <span className="text-[10px] uppercase font-mono-tabular tracking-wider px-2 py-0.5 bg-black/70 backdrop-blur-md text-[#F3D58A] border border-[#D6B36A]/20">
              {product.badge}
            </span>
          ) : <div />}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
              isFavorited
                ? 'bg-[#D6B36A] text-[#08090D]'
                : 'bg-black/50 text-white hover:text-[#D6B36A]'
            }`}
            aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick Add Slide-up Tray */}
        <div
          className={`absolute bottom-0 inset-x-0 p-3 bg-[#08090D]/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between gap-2 transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 bg-[#D6B36A] hover:bg-[#F3D58A] text-[#08090D] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Bag</span>
          </button>

          <Link
            to={`/product/${product.slug}`}
            className="p-2 border border-white/20 text-[#F5F5F7] hover:border-white text-xs"
            aria-label="View product details"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Link>

      {/* Info Container */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#9698A3] uppercase tracking-wider mb-1">
            <span>{product.brand}</span>
            <div className="flex items-center gap-1 text-[#F3D58A]">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-mono-tabular">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <Link to={`/product/${product.slug}`}>
            <h3 className="font-serif-luxury text-sm font-semibold text-[#F5F5F7] hover:text-[#F3D58A] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-mono-tabular">
            <span className="font-semibold text-[#F3D58A] text-sm">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="line-through text-[#9698A3] text-xs">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <span className="text-[10px] uppercase tracking-widest text-[#9698A3]">
            {product.colors.length} {product.colors.length === 1 ? 'Tone' : 'Tones'}
          </span>
        </div>
      </div>
    </div>
  );
};
