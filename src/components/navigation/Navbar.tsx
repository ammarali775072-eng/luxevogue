import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Sun, Moon, Menu } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { openCart, openSearch, openMobileMenu, theme, toggleTheme, setCursorVariant } = useUIStore();
  const cartCount = useCartStore((state) => state.itemCount());
  const wishlistCount = useWishlistStore((state) => state.productIds.length);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background transition trigger
      setIsScrolled(currentScrollY > 40);

      // Scroll direction reveal / hide
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          setIsVisible(false); // scrolling down
        } else if (lastScrollY - currentScrollY > 10) {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-[#08090D]/85 backdrop-blur-2xl border-b border-white/[0.08] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <Link
          to="/"
          className="group flex items-center gap-3 focus:outline-none"
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <span className="font-serif-luxury text-xl md:text-2xl font-bold tracking-[0.25em] text-[#F5F5F7] group-hover:text-[#F3D58A] transition-colors uppercase">
            LUXEVOGUE
          </span>
        </Link>

        {/* Zone 2: Navigation Links (Clean text, no pill enclosures) */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-[#9698A3]">
          <Link
            to="/shop"
            className={`transition-colors hover:text-[#F3D58A] relative py-1 ${
              location.pathname === '/shop' ? 'text-white' : ''
            }`}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            Shop
            {location.pathname === '/shop' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D6B36A]" />
            )}
          </Link>

          <Link
            to="/category/all"
            className={`transition-colors hover:text-[#F3D58A] relative py-1 ${
              location.pathname.startsWith('/category') ? 'text-white' : ''
            }`}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            Collections
            {location.pathname.startsWith('/category') && (
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D6B36A]" />
            )}
          </Link>

          <Link
            to="/shop?filter=new"
            className="transition-colors hover:text-[#F3D58A] relative py-1"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            New Arrivals
          </Link>

          <Link
            to="/about"
            className={`transition-colors hover:text-[#F3D58A] relative py-1 ${
              location.pathname === '/about' ? 'text-white' : ''
            }`}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            Atelier
            {location.pathname === '/about' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D6B36A]" />
            )}
          </Link>
        </nav>

        {/* Zone 3: Actions (Search, Wishlist, Theme Toggle, Cart, Mobile Menu) */}
        <div className="flex items-center gap-4 md:gap-6 text-[#F5F5F7]">
          {/* Search Trigger */}
          <button
            onClick={openSearch}
            className="p-2 text-[#9698A3] hover:text-[#F3D58A] transition-colors focus:outline-none"
            aria-label="Open search modal"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="relative p-2 text-[#9698A3] hover:text-[#F3D58A] transition-colors focus:outline-none hidden sm:block"
            aria-label={`View wishlist with ${wishlistCount} items`}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D6B36A]" />
            )}
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-[#9698A3] hover:text-[#F3D58A] transition-colors focus:outline-none"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            id="nav-cart-btn"
            onClick={openCart}
            className="group relative flex items-center gap-2 pl-3 pr-4 py-2 rounded-none border border-white/10 hover:border-[#D6B36A]/50 bg-white/[0.03] transition-all text-xs tracking-widest font-mono-tabular"
            aria-label={`Shopping bag with ${cartCount} items`}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <ShoppingBag className="w-4 h-4 text-[#D6B36A] group-hover:scale-110 transition-transform" />
            <span className="text-white font-medium">{cartCount}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={openMobileMenu}
            className="lg:hidden p-2 text-[#F5F5F7] hover:text-[#F3D58A] focus:outline-none"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
