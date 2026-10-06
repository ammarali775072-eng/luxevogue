import React from 'react';
import { Product } from '../../types/ecommerce';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  asymmetric?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, asymmetric = false }) => {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-[#9698A3] space-y-3">
        <p className="font-serif-luxury text-lg text-white">No luxury pieces match your current criteria</p>
        <p className="text-xs uppercase tracking-widest">Adjust filters or search parameters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          asymmetric={asymmetric && (index === 0 || index === 7)}
        />
      ))}
    </div>
  );
};
