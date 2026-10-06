import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowRight, Check } from 'lucide-react';
import { useLenis } from '../../hooks/useLenis';
import { useUIStore } from '../../store/uiStore';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { scrollTo } = useLenis();
  const { addToast } = useUIStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    addToast({
      title: "Welcome to LUXEVOGUE Atelier",
      description: "You have been registered for private preview access.",
      type: "gold"
    });
    setEmail('');
  };

  const handleBackToTop = () => {
    scrollTo(0, { duration: 1.5 });
  };

  return (
    <footer className="bg-[#050608] text-[#F5F5F7] pt-24 pb-12 border-t border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Newsletter Section */}
        <div className="pb-20 border-b border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#D6B36A] font-mono-tabular">
              PRIVATE REGISTRY
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              JOIN THE WORLD OF LUXEVOGUE
            </h3>
            <p className="text-xs sm:text-sm text-[#9698A3] mt-2 max-w-md">
              Receive private salon invitations, preview upcoming archival drops, and access bespoke concierge allocation.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="relative max-w-md w-full">
            <div className="flex border-b border-white/20 focus-within:border-[#D6B36A] transition-colors pb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                disabled={subscribed}
                required
                className="w-full bg-transparent text-sm text-[#F5F5F7] placeholder-[#9698A3]/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="px-4 text-xs font-bold uppercase tracking-widest text-[#D6B36A] hover:text-[#F3D58A] flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {subscribed ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Check className="w-4 h-4" /> Enrolled
                  </span>
                ) : (
                  <>
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
            <p className="text-[10px] text-[#9698A3]/60 mt-2 font-mono-tabular">
              Strict privacy protection. Unsubscribe anytime.
            </p>
          </form>
        </div>

        {/* Directory Grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/10 text-xs">
          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury uppercase tracking-widest text-white text-sm font-semibold">
              Collections
            </h4>
            <ul className="space-y-2.5 text-[#9698A3]">
              <li><Link to="/category/sneakers" className="hover:text-[#F3D58A] transition-colors">Sculptural Footwear</Link></li>
              <li><Link to="/category/watches" className="hover:text-[#F3D58A] transition-colors">Haute Horlogerie</Link></li>
              <li><Link to="/category/bags" className="hover:text-[#F3D58A] transition-colors">Leather Maroquinerie</Link></li>
              <li><Link to="/category/jewelry" className="hover:text-[#F3D58A] transition-colors">Fine Joaillerie</Link></li>
              <li><Link to="/shop?sort=newest" className="hover:text-[#F3D58A] transition-colors">New Releases</Link></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury uppercase tracking-widest text-white text-sm font-semibold">
              Concierge
            </h4>
            <ul className="space-y-2.5 text-[#9698A3]">
              <li><Link to="/contact" className="hover:text-[#F3D58A] transition-colors">Client Service</Link></li>
              <li><Link to="/contact" className="hover:text-[#F3D58A] transition-colors">White-Glove Shipping</Link></li>
              <li><Link to="/contact" className="hover:text-[#F3D58A] transition-colors">Authenticity Assays</Link></li>
              <li><Link to="/contact" className="hover:text-[#F3D58A] transition-colors">Bespoke Inquiries</Link></li>
              <li><Link to="/contact" className="hover:text-[#F3D58A] transition-colors">Returns & Exchange</Link></li>
            </ul>
          </div>

          {/* Atelier Heritage */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury uppercase tracking-widest text-white text-sm font-semibold">
              Maison
            </h4>
            <ul className="space-y-2.5 text-[#9698A3]">
              <li><Link to="/about" className="hover:text-[#F3D58A] transition-colors">Atelier Manifesto</Link></li>
              <li><Link to="/about" className="hover:text-[#F3D58A] transition-colors">Material Science</Link></li>
              <li><Link to="/about" className="hover:text-[#F3D58A] transition-colors">Sustainability</Link></li>
              <li><Link to="/about" className="hover:text-[#F3D58A] transition-colors">Press & Editorial</Link></li>
              <li><Link to="/about" className="hover:text-[#F3D58A] transition-colors">Private Salons</Link></li>
            </ul>
          </div>

          {/* Social Presence */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury uppercase tracking-widest text-white text-sm font-semibold">
              Presence
            </h4>
            <ul className="space-y-2.5 text-[#9698A3]">
              <li><a href="#instagram" className="hover:text-[#F3D58A] transition-colors">Instagram @luxevogue</a></li>
              <li><a href="#tiktok" className="hover:text-[#F3D58A] transition-colors">TikTok Atelier</a></li>
              <li><a href="#pinterest" className="hover:text-[#F3D58A] transition-colors">Pinterest Archive</a></li>
              <li><a href="#editorial" className="hover:text-[#F3D58A] transition-colors">Vogue Runway MMXXVI</a></li>
            </ul>
          </div>
        </div>

        {/* Massive Brand Typographic Monument */}
        <div className="pt-16 pb-8 text-center select-none">
          <h2 className="font-display font-extrabold text-[12vw] tracking-tighter leading-none text-white/[0.04] uppercase">
            LUXEVOGUE
          </h2>
        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] font-mono-tabular text-[#9698A3]">
          <div>
            <span>© 2026 LUXEVOGUE ATELIER. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Charter</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Carriage</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Security Protocol</span>
          </div>

          {/* Back to top with Lenis */}
          <button
            onClick={handleBackToTop}
            className="flex items-center gap-2 p-2.5 border border-white/10 hover:border-[#D6B36A] text-[#9698A3] hover:text-[#F3D58A] transition-all"
            aria-label="Back to top of page"
          >
            <span className="uppercase tracking-widest text-[10px]">Ascend</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
