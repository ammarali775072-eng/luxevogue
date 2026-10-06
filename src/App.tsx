import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';
import { MobileMenu } from './components/navigation/MobileMenu';
import { CustomCursor } from './components/ui/CustomCursor';
import { Preloader } from './components/ui/Preloader';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { ToastContainer } from './components/ui/Toast';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchOverlay } from './components/search/SearchOverlay';
import { Footer } from './components/layout/Footer';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Product } from './pages/Product';
import { Category } from './pages/Category';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

import { useLenis } from './hooks/useLenis';
import { useUIStore } from './store/uiStore';

// Scroll restoration component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  // Initialize buttery smooth Lenis scrolling
  useLenis(true);
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-[#08090D] text-[#F5F5F7] relative selection:bg-[#D6B36A] selection:text-black">
      {/* Background Noise Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-30 grain-overlay" />

      {/* Top Gold Scroll Progress Bar */}
      <ScrollProgress />

      {/* Extraordinary Cinematic Initial Preloader */}
      <Preloader />

      {/* Desktop Custom Fluid Cursor */}
      <CustomCursor />

      {/* Sticky Luxury Navbar with 3-zone contract */}
      <Navbar />

      {/* Fullscreen Mobile Animated Menu */}
      <MobileMenu />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Cinematic Instant Search Overlay */}
      <SearchOverlay />

      {/* Global Toast Notification System */}
      <ToastContainer />

      {/* Scroll Restoration */}
      <ScrollToTop />

      {/* Main Routes */}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Monumental Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
