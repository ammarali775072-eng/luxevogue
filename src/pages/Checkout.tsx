import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { orderService } from '../services/orderService';
import { formatPrice } from '../lib/utils';
import { Check, ShieldCheck, ArrowRight, ArrowLeft, CreditCard, Sparkles, Building, Landmark } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, shipping, total, clearCart } = useCartStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [orderConfirmedId, setOrderConfirmedId] = useState<string>('');
  const [confirmedTotal, setConfirmedTotal] = useState<number>(0);

  // Customer form details
  const [formData, setFormData] = useState({
    firstName: 'Ammar',
    lastName: 'Ali',
    email: 'ammarali775072@gmail.com',
    phone: '+92 300 1234567',
    address: 'Atelier Avenue, Phase 5, DHA',
    city: 'Lahore',
    postalCode: '54000',
    country: 'Pakistan',
    paymentMethod: 'card' as 'card' | 'cod' | 'jazzcash' | 'easypaisa'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalOrder = async () => {
    const finalOrderTotal = total();
    const newOrder = await orderService.createOrder({
      items,
      subtotal: subtotal(),
      shipping: shipping(),
      discount: 0,
      total: finalOrderTotal,
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      paymentMethod: formData.paymentMethod,
    });

    setConfirmedTotal(finalOrderTotal);
    setOrderConfirmedId(newOrder.id);
    clearCart();
    setStep(4);

    // Trigger celebration gold confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D6B36A', '#F3D58A', '#FFFFFF']
      });
    } catch {
      // Confetti fallback
    }
  };

  // If bag is empty and not on confirmation step
  if (items.length === 0 && step !== 4) {
    return (
      <div className="pt-40 pb-28 px-6 text-center max-w-md mx-auto text-[#F5F5F7]">
        <h2 className="font-serif-luxury text-2xl font-bold mb-3">No Items in Bag</h2>
        <p className="text-xs text-[#9698A3] mb-6">Your shopping bag is empty. Explore our collection before checking out.</p>
        <Link to="/shop" className="px-6 py-3 bg-[#D6B36A] text-[#08090D] text-xs uppercase font-bold tracking-widest">
          Explore Shop
        </Link>
      </div>
    );
  }

  // STEP 4: SUCCESS CONFIRMATION STATE
  if (step === 4) {
    return (
      <div className="pt-32 pb-28 px-6 md:px-12 max-w-4xl mx-auto min-h-screen text-[#F5F5F7] flex flex-col items-center justify-center text-center animate-fade-in">
        {/* Rotating 3D style Gold Checkmark Badge */}
        <div className="w-24 h-24 rounded-full border-2 border-[#D6B36A] flex items-center justify-center mb-8 relative shadow-[0_0_50px_rgba(214,179,106,0.4)] animate-bounce">
          <div className="absolute inset-1 rounded-full border border-[#D6B36A]/20" />
          <Check className="w-12 h-12 text-[#F3D58A]" />
        </div>

        <span className="text-xs uppercase tracking-[0.35em] text-[#D6B36A] font-mono-tabular">
          ORDER ACQUISITION CONFIRMED
        </span>

        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold tracking-tight text-white mt-3 mb-4">
          WELCOME TO LUXEVOGUE
        </h1>

        <div className="p-6 bg-[#101118] border border-white/10 max-w-md w-full mb-8 text-left space-y-3 font-mono-tabular text-xs">
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-[#9698A3]">Acquisition Reference:</span>
            <span className="text-[#F3D58A] font-bold">{orderConfirmedId}</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-[#9698A3]">Client Recipient:</span>
            <span className="text-white">{formData.firstName} {formData.lastName}</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-[#9698A3]">Settlement Method:</span>
            <span className="text-white uppercase">{formData.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#9698A3]">Total Carriage:</span>
            <span className="text-[#F3D58A] font-bold">{formatPrice(confirmedTotal)}</span>
          </div>
        </div>

        <p className="text-sm text-[#9698A3] max-w-md mb-8">
          A confirmation dispatch with private tracking and your certificate of authenticity has been sent to <span className="text-white font-medium">{formData.email}</span>.
        </p>

        <Link
          to="/shop"
          className="px-8 py-4 bg-[#D6B36A] hover:bg-[#F3D58A] text-[#08090D] font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(214,179,106,0.3)]"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-28 px-6 md:px-12 max-w-6xl mx-auto min-h-screen text-[#F5F5F7]">
      {/* Steps Progress Indicator */}
      <div className="max-w-2xl mx-auto mb-14">
        <div className="flex items-center justify-between text-xs font-mono-tabular">
          {[
            { num: 1, label: 'Details' },
            { num: 2, label: 'Shipping' },
            { num: 3, label: 'Payment' }
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  step >= s.num
                    ? 'bg-[#D6B36A] text-[#08090D]'
                    : 'border border-white/20 text-[#9698A3]'
                }`}
              >
                {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
              </div>
              <span className={`uppercase tracking-wider ${step >= s.num ? 'text-white' : 'text-[#9698A3]'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="h-[2px] bg-white/10 mt-4 relative">
          <div
            className="h-full bg-[#D6B36A] transition-all duration-300"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Step Form */}
        <div className="lg:col-span-7 bg-[#101118] border border-white/10 p-8 space-y-6">
          {/* STEP 1: DETAILS */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-serif-luxury text-2xl font-bold uppercase tracking-wider text-white">
                Step 01: Client Details
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#9698A3] font-mono-tabular">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-[#161821] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#9698A3] font-mono-tabular">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-[#161821] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#9698A3] font-mono-tabular">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#161821] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#9698A3] font-mono-tabular">
                  Phone / Mobile
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-[#161821] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-4 bg-[#D6B36A] hover:bg-[#F3D58A] text-[#08090D] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors mt-6"
              >
                <span>Continue to Shipping</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: SHIPPING */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif-luxury text-2xl font-bold uppercase tracking-wider text-white">
                  Step 02: Delivery Destination
                </h2>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs uppercase text-[#9698A3] hover:text-white flex items-center gap-1 font-mono-tabular"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#9698A3] font-mono-tabular">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-[#161821] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#9698A3] font-mono-tabular">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#161821] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#9698A3] font-mono-tabular">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full bg-[#161821] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#9698A3] font-mono-tabular">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full bg-[#161821] border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#D6B36A]"
                >
                  <option value="Pakistan">Pakistan (Domestic White-Glove)</option>
                  <option value="United States">United States (Express Air)</option>
                  <option value="United Kingdom">United Kingdom (Express Air)</option>
                  <option value="United Arab Emirates">United Arab Emirates (Air Courier)</option>
                </select>
              </div>

              <button
                onClick={() => setStep(3)}
                className="w-full py-4 bg-[#D6B36A] hover:bg-[#F3D58A] text-[#08090D] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors mt-6"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif-luxury text-2xl font-bold uppercase tracking-wider text-white">
                  Step 03: Payment Settlement
                </h2>
                <button
                  onClick={() => setStep(2)}
                  className="text-xs uppercase text-[#9698A3] hover:text-white flex items-center gap-1 font-mono-tabular"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              {/* Payment Selectors */}
              <div className="space-y-3">
                {[
                  { id: 'card', name: 'Debit / Credit Card (Stripe Encrypted)', icon: CreditCard, desc: 'Visa, Mastercard, Amex, UnionPay' },
                  { id: 'cod', name: 'Cash on Delivery (White-Glove)', icon: Building, desc: 'Inspect upon arrival with courier verification' },
                  { id: 'jazzcash', name: 'JazzCash Wallet / QR', icon: Landmark, desc: 'Instant mobile settlement' },
                  { id: 'easypaisa', name: 'Easypaisa Direct', icon: Sparkles, desc: 'Fast mobile account transfer' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: m.id as any })}
                    className={`w-full p-4 border text-left flex items-start justify-between transition-all ${
                      formData.paymentMethod === m.id
                        ? 'border-[#D6B36A] bg-[#D6B36A]/10 text-white'
                        : 'border-white/10 bg-white/[0.02] text-[#9698A3] hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <m.icon className="w-5 h-5 text-[#D6B36A]" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-white">{m.name}</p>
                        <p className="text-[11px] text-[#9698A3] mt-0.5">{m.desc}</p>
                      </div>
                    </div>
                    {formData.paymentMethod === m.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D6B36A] mt-1" />
                    )}
                  </button>
                ))}
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="p-4 border border-white/10 bg-[#08090D]/50 space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-[#9698A3] font-mono-tabular">Card Number</label>
                    <input
                      type="text"
                      placeholder="•••• •••• •••• 4242"
                      defaultValue="4242 •••• •••• 1024"
                      className="w-full bg-[#161821] border border-white/10 p-2.5 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase text-[#9698A3] font-mono-tabular">Expiry</label>
                      <input type="text" placeholder="MM/YY" defaultValue="12/28" className="w-full bg-[#161821] border border-white/10 p-2 text-xs text-white" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-[#9698A3] font-mono-tabular">CVC</label>
                      <input type="text" placeholder="CVC" defaultValue="894" className="w-full bg-[#161821] border border-white/10 p-2 text-xs text-white" />
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleFinalOrder}
                className="w-full py-4 bg-[#D6B36A] hover:bg-[#F3D58A] text-[#08090D] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(214,179,106,0.3)] mt-6"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Acquisition · {formatPrice(total())}</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary Review */}
        <div className="lg:col-span-5 bg-[#101118]/80 border border-white/10 p-8 space-y-6">
          <h3 className="font-serif-luxury text-xl font-bold uppercase tracking-wider text-white">
            Items in Acquisition ({items.reduce((s, i) => s + i.quantity, 0)})
          </h3>

          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-20 object-cover bg-[#161821] shrink-0"
                />
                <div className="flex-1">
                  <h4 className="text-xs font-semibold text-white line-clamp-1">{item.product.name}</h4>
                  <p className="text-[11px] text-[#9698A3]">Qty: {item.quantity} · {item.selectedColor}</p>
                  <p className="font-mono-tabular text-xs text-[#F3D58A] mt-1">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 space-y-2 text-xs text-[#9698A3]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono-tabular text-white">{formatPrice(subtotal())}</span>
            </div>
            <div className="flex justify-between">
              <span>White-Glove Insured Delivery</span>
              <span className="font-mono-tabular text-white">{shipping() === 0 ? 'Complimentary' : formatPrice(shipping())}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-semibold text-white">
              <span>Total Acquisition</span>
              <span className="font-mono-tabular text-[#F3D58A]">{formatPrice(total())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
