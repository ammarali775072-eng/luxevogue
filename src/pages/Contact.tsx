import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Send } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useUIStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast({
      title: "Inquiry Transmitted",
      description: "An atelier concierge specialist will connect with you shortly.",
      type: "gold"
    });
  };

  return (
    <div className="pt-32 pb-28 px-6 md:px-12 max-w-6xl mx-auto min-h-screen text-[#F5F5F7]">
      <div className="border-b border-white/10 pb-10 mb-14 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D6B36A] font-mono-tabular">
          PRIVATE SALON CONCIERGE
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mt-2">
          CLIENT LIAISON
        </h1>
        <p className="text-sm text-[#9698A3] mt-2">
          Reach our private concierge for bespoke commissions, authentication assays, or private salon appointments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Salon Info */}
        <div className="lg:col-span-5 space-y-8 bg-[#101118] border border-white/10 p-8">
          <h3 className="font-serif-luxury text-xl font-bold uppercase text-white">
            Global Salons
          </h3>

          <div className="space-y-6 text-xs text-[#9698A3]">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#D6B36A] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold">Milan Atelier</p>
                <p>Via Monte Napoleone 18, 20121 Milano, Italy</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#D6B36A] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold">Lahore Salon</p>
                <p>Gulberg III, Main Boulevard, Lahore, Pakistan</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#D6B36A] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold">Direct Dispatch</p>
                <p>concierge@luxevogue.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#D6B36A] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold">Private Line</p>
                <p className="font-mono-tabular">+92 (042) 3578-9000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7 bg-[#101118] border border-white/10 p-8">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border border-[#D6B36A] flex items-center justify-center mx-auto text-[#F3D58A]">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                Message Received
              </h3>
              <p className="text-xs text-[#9698A3] max-w-sm mx-auto">
                Thank you for reaching out. A dedicated personal client advisor will respond within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif-luxury text-xl font-bold uppercase text-white mb-4">
                Send an Inquiry
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-[#9698A3] font-mono-tabular">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="Ammar Ali"
                    className="w-full bg-[#161821] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-[#9698A3] font-mono-tabular">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    defaultValue="ammarali775072@gmail.com"
                    className="w-full bg-[#161821] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#9698A3] font-mono-tabular">
                  Subject / Edition of Interest
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bespoke LVX Runner Customization or Watch Reserve"
                  className="w-full bg-[#161821] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#9698A3] font-mono-tabular">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Provide specifications, sizing inquiries, or private viewing requests..."
                  className="w-full bg-[#161821] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#D6B36A] hover:bg-[#F3D58A] text-[#08090D] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(214,179,106,0.3)]"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
