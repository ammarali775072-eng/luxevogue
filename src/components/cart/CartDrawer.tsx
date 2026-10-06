import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { formatPrice } from '../../lib/utils';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart } = useUIStore();
  const { items, removeItem, updateQuantity, subtotal, shipping, total } = useCartStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101118]/95 backdrop-blur-2xl border-l border-white/10 flex flex-col text-[#F5F5F7] shadow-2xl animate-slide-left">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#D6B36A]" />
              <h2 className="font-serif-luxury text-lg tracking-wider uppercase">
                Your Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-[#9698A3] hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-[#9698A3]">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="font-serif-luxury text-lg tracking-wider text-white">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#9698A3] max-w-xs">
                  Experience our hand-crafted editions and sculptural releases.
                </p>
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="mt-4 px-6 py-3 border border-[#D6B36A] text-[#F3D58A] hover:bg-[#D6B36A] hover:text-[#08090D] transition-all text-xs uppercase tracking-widest font-semibold"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover bg-[#161821] shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs uppercase tracking-wider text-[#9698A3]">
                          {item.product.brand}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#9698A3] hover:text-red-400 transition-colors p-1"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="font-medium text-sm text-white mt-0.5 line-clamp-1">
                        {item.product.name}
                      </p>

                      <div className="text-[11px] text-[#9698A3] mt-1 space-x-2">
                        <span>{item.selectedColor}</span>
                        <span>·</span>
                        <span>{item.selectedSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-[#9698A3] hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono-tabular">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-[#9698A3] hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono-tabular text-sm font-semibold text-[#F3D58A]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#08090D]/50 space-y-4">
              <div className="space-y-1.5 text-xs text-[#9698A3]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono-tabular text-white">{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span>White-Glove Delivery</span>
                  <span className="font-mono-tabular text-white">
                    {shipping() === 0 ? 'Complimentary' : formatPrice(shipping())}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-semibold text-white">
                  <span>Total</span>
                  <span className="font-mono-tabular text-[#F3D58A]">{formatPrice(total())}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#9698A3]/80">
                <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
                <span>Complimentary insured shipping & atelier certificate</span>
              </div>

              <Link
                to="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-3 py-4 bg-[#D6B36A] hover:bg-[#F3D58A] text-[#08090D] text-xs uppercase font-bold tracking-[0.2em] transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
