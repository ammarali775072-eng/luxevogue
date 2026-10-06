import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Heart, ShoppingBag, Compass } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useCartStore } from '../../store/cartStore';

export const MobileMenu: React.FC = () => {
  const { isMobileMenuOpen, closeMobileMenu, openCart } = useUIStore();
  const cartCount = useCartStore((state) => state.itemCount());

  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#08090D]/98 backdrop-blur-3xl text-[#F5F5F7] animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
        <span className="font-serif-luxury text-xl font-bold tracking-[0.2em] text-[#F3D58A]">
          LUXEVOGUE
        </span>
        <button
          onClick={closeMobileMenu}
          className="p-2 text-[#9698A3] hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-8 py-10 flex flex-col justify-center space-y-6">
        {[
          { label: 'Shop All', href: '/shop' },
          { label: 'Collections', href: '/category/all' },
          { label: 'Sneakers', href: '/category/sneakers' },
          { label: 'Horology', href: '/category/watches' },
          { label: 'Maroquinerie', href: '/category/bags' },
          { label: 'Fine Joaillerie', href: '/category/jewelry' },
          { label: 'Atelier & Heritage', href: '/about' },
        ].map((item, idx) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={closeMobileMenu}
            className="group flex items-center justify-between text-2xl font-serif-luxury font-medium tracking-wider text-[#F5F5F7] hover:text-[#F3D58A] transition-colors"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <span>{item.label}</span>
            <ArrowRight className="w-5 h-5 text-[#D6B36A] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>

      {/* Bottom Quick Actions */}
      <div className="p-6 border-t border-white/10 grid grid-cols-2 gap-4">
        <Link
          to="/wishlist"
          onClick={closeMobileMenu}
          className="flex items-center justify-center gap-2 py-3 border border-white/10 text-xs uppercase tracking-widest text-[#9698A3] hover:text-white"
        >
          <Heart className="w-4 h-4 text-[#D6B36A]" />
          <span>Wishlist</span>
        </Link>

        <button
          onClick={() => {
            closeMobileMenu();
            openCart();
          }}
          className="flex items-center justify-center gap-2 py-3 bg-[#D6B36A] text-[#08090D] text-xs uppercase font-bold tracking-widest"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Bag ({cartCount})</span>
        </button>
      </div>
    </div>
  );
};
