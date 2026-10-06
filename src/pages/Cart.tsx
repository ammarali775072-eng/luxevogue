import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../lib/utils';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';

export const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, subtotal, shipping, total, clearCart } = useCartStore();

  return (
    <div className="pt-32 pb-28 px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-[#F5F5F7]">
      <div className="border-b border-white/10 pb-8 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#D6B36A] font-mono-tabular">
            YOUR RESERVATION
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mt-2">
            SHOPPING BAG ({items.reduce((s, i) => s + i.quantity, 0)})
          </h1>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs uppercase tracking-wider text-[#9698A3] hover:text-red-400 transition-colors font-mono-tabular"
          >
            Clear All Items
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mx-auto text-[#9698A3]">
            <ShoppingBag className="w-8 h-8 opacity-30" />
          </div>
          <h3 className="font-serif-luxury text-2xl font-bold text-white">
            Your bag is currently empty
          </h3>
          <p className="text-xs text-[#9698A3] leading-relaxed">
            Discover limited atelier releases, handcrafted chronographs, and sculptural accessories.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D6B36A] text-[#08090D] text-xs uppercase font-bold tracking-widest mt-4 hover:bg-[#F3D58A] transition-colors"
          >
            <span>Explore Store</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-[#101118] border border-white/10 hover:border-[#D6B36A]/30 transition-all items-start sm:items-center"
              >
                <img
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-28 object-cover bg-[#161821] shrink-0"
                />

                <div className="flex-1 space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#9698A3] font-mono-tabular">
                    {item.product.brand}
                  </span>
                  <Link to={`/product/${item.product.slug}`}>
                    <h3 className="font-serif-luxury text-lg font-bold text-white hover:text-[#F3D58A] transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#9698A3]">
                    {item.selectedColor} · {item.selectedSize}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-white/10">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-[#9698A3] hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-mono-tabular">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-[#9698A3] hover:text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="font-mono-tabular font-bold text-[#F3D58A] text-lg w-28 text-right">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-[#9698A3] hover:text-red-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-4 p-8 bg-[#101118]/80 border border-white/10 space-y-6">
            <h3 className="font-serif-luxury text-xl font-bold uppercase tracking-wider text-white">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-[#9698A3] pb-6 border-b border-white/10">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono-tabular text-white">{formatPrice(subtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>White-Glove Insured Delivery</span>
                <span className="font-mono-tabular text-white">
                  {shipping() === 0 ? 'Complimentary' : formatPrice(shipping())}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline font-mono-tabular">
              <span className="text-sm font-semibold uppercase text-white">Estimated Total</span>
              <span className="text-2xl font-bold text-[#F3D58A]">{formatPrice(total())}</span>
            </div>

            <Link
              to="/checkout"
              className="w-full py-4 bg-[#D6B36A] hover:bg-[#F3D58A] text-[#08090D] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#9698A3]">
              <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
              <span>Complimentary insured shipping & atelier certificate</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
