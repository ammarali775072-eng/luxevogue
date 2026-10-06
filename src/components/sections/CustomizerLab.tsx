import React, { useState } from 'react';
import { Product3DViewer } from '../three/Product3DViewer';
import { ShoppingBag, Sparkles, Check } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../lib/utils';
import { Product } from '../../types/ecommerce';

const COLOR_OPTIONS = [
  { name: 'Obsidian Noir', hex: '#0B0C10', priceMod: 0 },
  { name: 'Pure Alabaster', hex: '#F0ECE4', priceMod: 50 },
  { name: 'Imperial Gold', hex: '#D6B36A', priceMod: 150 },
  { name: 'Titanium Silver', hex: '#B8BAC4', priceMod: 80 },
  { name: 'Crimson Vermilion', hex: '#881822', priceMod: 100 },
];

const MATERIAL_OPTIONS: { name: string; type: 'matte' | 'leather' | 'metallic'; desc: string }[] = [
  { name: 'Technical Matte', type: 'matte', desc: 'Velvet-touch hydrophobic finish' },
  { name: 'French Box Calf', type: 'leather', desc: 'Organic vegetable-tanned grain' },
  { name: 'Liquid Titanium', type: 'metallic', desc: 'Mirror-polished metallic alloy' },
];

export const CustomizerLab: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIAL_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState('US 10');

  const baseProduct = PRODUCTS[0]; // LVX Eclipse Runner
  const basePrice = baseProduct.price;
  const finalPrice = basePrice + selectedColor.priceMod;

  const { addItem } = useCartStore();
  const { openCart, addToast } = useUIStore();

  const handleAddCustomized = () => {
    const customizedProduct: Product = {
      ...baseProduct,
      id: `${baseProduct.id}-custom-${Date.now()}`,
      name: `${baseProduct.name} (Bespoke Atelier)`,
      price: finalPrice,
      shortDescription: `Custom Atelier Edition: ${selectedColor.name} in ${selectedMaterial.name}.`
    };

    addItem(customizedProduct, {
      color: selectedColor.name,
      size: selectedSize,
      quantity: 1
    });

    addToast({
      title: "Bespoke Creation Added",
      description: `${customizedProduct.name} — ${formatPrice(finalPrice)}`,
      type: "gold"
    });
    openCart();
  };

  return (
    <section className="relative py-28 bg-[#08090D] border-t border-b border-white/[0.08] text-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#D6B36A] font-mono-tabular mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ATELIER LAB</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            CUSTOMIZE YOUR STYLE
          </h2>
          <p className="text-sm text-[#9698A3] mt-3">
            Sculpt your personal edition. Calibrate finish, surface reflection, and precious hardware in real time.
          </p>
        </div>

        {/* Studio Grid: 3D Viewport on Left, Customizer Options on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#101118]/80 border border-white/10 p-6 sm:p-10">
          {/* 3D Model Display */}
          <div className="lg:col-span-7 h-[420px] sm:h-[500px] border border-white/10 bg-[#08090D]/50 relative overflow-hidden">
            <Product3DViewer
              modelType="sneaker"
              color={selectedColor.hex}
              materialType={selectedMaterial.type}
              accentColor="#D6B36A"
              fallbackImage={baseProduct.thumbnail}
              interactive={true}
            />
          </div>

          {/* Configurator Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#9698A3] font-mono-tabular">
                BASE SILHOUETTE
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                {baseProduct.name}
              </h3>
              <p className="font-mono-tabular text-xl text-[#F3D58A] font-semibold mt-1">
                {formatPrice(finalPrice)}
              </p>
            </div>

            {/* Color Finish Selection */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <label className="text-xs uppercase tracking-widest text-[#9698A3] font-mono-tabular flex justify-between">
                <span>Color Finish</span>
                <span className="text-white font-medium">{selectedColor.name}</span>
              </label>

              <div className="flex gap-3">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-9 h-9 rounded-full border-2 transition-transform relative flex items-center justify-center ${
                      selectedColor.name === c.name
                        ? 'border-[#D6B36A] scale-110 shadow-[0_0_12px_rgba(214,179,106,0.6)]'
                        : 'border-white/20 hover:border-white/50'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={`Select color ${c.name}`}
                  >
                    {selectedColor.name === c.name && (
                      <Check className={`w-3.5 h-3.5 ${c.hex === '#F0ECE4' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Texture Selection */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <label className="text-xs uppercase tracking-widest text-[#9698A3] font-mono-tabular">
                Surface Material
              </label>
              <div className="grid grid-cols-1 gap-2">
                {MATERIAL_OPTIONS.map((mat) => (
                  <button
                    key={mat.name}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`p-3 text-left border transition-all flex items-center justify-between ${
                      selectedMaterial.name === mat.name
                        ? 'border-[#D6B36A] bg-[#D6B36A]/10 text-white'
                        : 'border-white/10 bg-white/[0.02] text-[#9698A3] hover:border-white/30'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider">{mat.name}</p>
                      <p className="text-[11px] text-[#9698A3] mt-0.5">{mat.desc}</p>
                    </div>
                    {selectedMaterial.name === mat.name && (
                      <div className="w-2 h-2 rounded-full bg-[#D6B36A]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Stepper */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <label className="text-xs uppercase tracking-widest text-[#9698A3] font-mono-tabular">
                Bespoke Sizing
              </label>
              <div className="flex gap-2">
                {['US 8', 'US 9', 'US 10', 'US 11', 'US 12'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`flex-1 py-2 text-xs font-mono-tabular border transition-all ${
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

            {/* Add Customized Item CTA */}
            <button
              onClick={handleAddCustomized}
              className="w-full py-4 mt-4 bg-[#D6B36A] hover:bg-[#F3D58A] text-[#08090D] text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-colors shadow-[0_0_25px_rgba(214,179,106,0.3)]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Customized Item · {formatPrice(finalPrice)}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
