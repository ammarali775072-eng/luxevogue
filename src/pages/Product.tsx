import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product3DViewer } from '../components/three/Product3DViewer';
import { PRODUCTS } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useUIStore } from '../store/uiStore';
import { formatPrice } from '../lib/utils';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  Truck,
  Check,
  ArrowLeft,
  Box,
  Image as ImageIcon
} from 'lucide-react';

export const Product: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'3d' | 'gallery'>('3d');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  React.useEffect(() => {
    setSelectedColor(product.colors[0]?.name || 'Standard');
    setSelectedSize(product.sizes[0] || 'Default');
    setActiveImageIndex(0);
    setQuantity(1);
  }, [product.id]);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { openCart, addToast } = useUIStore();

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, {
      color: selectedColor,
      size: selectedSize,
      quantity
    });

    addToast({
      title: "Added to your bag",
      description: `${product.name} (${selectedColor}, ${selectedSize})`,
      type: "gold"
    });
    openCart();
  };

  const handleBuyNow = () => {
    addItem(product, {
      color: selectedColor,
      size: selectedSize,
      quantity
    });
    navigate('/checkout');
  };

  const handleWishlist = () => {
    const added = toggleWishlist(product.id);
    addToast({
      title: added ? "Added to Wishlist" : "Removed from Wishlist",
      description: product.name,
      type: "info"
    });
  };

  return (
    <div className="pt-32 pb-28 px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-[#F5F5F7]">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9698A3] mb-8 font-mono-tabular">
        <Link to="/shop" className="hover:text-white flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Shop</span>
        </Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-white">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#D6B36A] truncate">{product.name}</span>
      </div>

      {/* Main Grid: Left Visualizer + Right Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Visual Showcase (3D Viewer + High-Res Gallery) */}
        <div className="lg:col-span-7 space-y-4 sticky top-28">
          {/* Viewer Mode Switcher */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('3d')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                  activeTab === '3d'
                    ? 'bg-[#D6B36A] text-[#08090D] font-bold'
                    : 'text-[#9698A3] hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D Studio</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                  activeTab === 'gallery'
                    ? 'bg-[#D6B36A] text-[#08090D] font-bold'
                    : 'text-[#9698A3] hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Editorial Gallery</span>
              </button>
            </div>

            <span className="text-[11px] font-mono-tabular text-[#9698A3]">
              {activeTab === '3d' ? '360° Drag Inspection' : `Image ${activeImageIndex + 1} of ${product.images.length}`}
            </span>
          </div>

          {/* Main Display Port */}
          <div className="h-[460px] sm:h-[580px] bg-[#101118] border border-white/10 relative overflow-hidden">
            {activeTab === '3d' ? (
              <Product3DViewer
                modelType={product.threeDConfig?.modelType || 'sneaker'}
                fallbackImage={product.thumbnail}
                accentColor="#D6B36A"
                interactive={true}
              />
            ) : (
              <img
                src={product.images[activeImageIndex] || product.thumbnail}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Gallery Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImageIndex(idx);
                  setActiveTab('gallery');
                }}
                className={`w-20 h-24 border overflow-hidden shrink-0 transition-all ${
                  activeTab === 'gallery' && activeImageIndex === idx
                    ? 'border-[#D6B36A] scale-105'
                    : 'border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-8 bg-[#101118]/70 backdrop-blur-xl border border-white/10 p-8">
          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#9698A3] font-mono-tabular mb-2">
              <span>{product.brand}</span>
              <div className="flex items-center gap-1 text-[#F3D58A]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold">{product.rating.toFixed(1)}</span>
                <span className="text-[#9698A3]">({product.reviewCount} client reviews)</span>
              </div>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mt-3 font-mono-tabular">
              <span className="text-2xl font-bold text-[#F3D58A]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm line-through text-[#9698A3]">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-[#9698A3] leading-relaxed border-t border-b border-white/10 py-4 font-light">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs uppercase tracking-widest font-mono-tabular">
              <span className="text-[#9698A3]">Palette Finish</span>
              <span className="text-white font-medium">{selectedColor}</span>
            </div>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-9 h-9 rounded-full border-2 transition-transform relative flex items-center justify-center ${
                    selectedColor === c.name
                      ? 'border-[#D6B36A] scale-110 shadow-[0_0_12px_rgba(214,179,106,0.5)]'
                      : 'border-white/20 hover:border-white/50'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={`Select color ${c.name}`}
                >
                  {selectedColor === c.name && (
                    <Check className={`w-3.5 h-3.5 ${c.hex === '#F3EDE2' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs uppercase tracking-widest font-mono-tabular">
              <span className="text-[#9698A3]">Atelier Sizing</span>
              <span className="text-[#D6B36A]">Size Guide</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-2 text-xs font-mono-tabular border transition-all ${
                    selectedSize === sz
                      ? 'border-[#D6B36A] bg-[#D6B36A] text-[#08090D] font-bold'
                      : 'border-white/10 hover:border-white/30 text-[#9698A3]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Purchase Actions (Add to Bag, Buy Now, Wishlist) */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="grid grid-cols-6 gap-3">
              <button
                onClick={handleAddToCart}
                className="col-span-5 py-4 bg-[#D6B36A] hover:bg-[#F3D58A] text-[#08090D] text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(214,179,106,0.3)]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={handleWishlist}
                className={`col-span-1 border flex items-center justify-center transition-colors ${
                  isFavorited
                    ? 'border-[#D6B36A] bg-[#D6B36A] text-[#08090D]'
                    : 'border-white/20 text-white hover:border-[#D6B36A]'
                }`}
                aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 border border-white/30 hover:border-white text-xs uppercase tracking-[0.2em] font-medium text-white transition-all bg-white/[0.02]"
            >
              Direct Atelier Checkout
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-[#9698A3]">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-[#D6B36A] shrink-0" />
              <span>Complimentary insured shipping on orders over $1,500</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-[#D6B36A] shrink-0" />
              <span>Handcrafted certificate of authenticity & warranty included</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4 text-[#D6B36A] shrink-0" />
              <span>30-day discreet returns & atelier exchange policy</span>
            </div>
          </div>

          {/* Technical Specifications Sheet */}
          {product.specs && (
            <div className="pt-6 border-t border-white/10 space-y-2">
              <h4 className="text-xs uppercase tracking-widest text-white font-mono-tabular mb-3">
                Material Specifications
              </h4>
              {Object.entries(product.specs).map(([label, val]) => (
                <div key={label} className="flex justify-between text-xs py-1 border-b border-white/[0.04]">
                  <span className="text-[#9698A3]">{label}</span>
                  <span className="text-white font-medium text-right">{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
