import { Product, ProductCategory } from '../types/ecommerce';
import { PRODUCTS } from '../data/products';

export interface FilterOptions {
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  inStockOnly: boolean;
  searchQuery: string;
}

export const productService = {
  getAll: async (): Promise<Product[]> => {
    return [...PRODUCTS];
  },

  getBySlug: async (slug: string): Promise<Product | undefined> => {
    return PRODUCTS.find((p) => p.slug === slug);
  },

  getById: async (id: string): Promise<Product | undefined> => {
    return PRODUCTS.find((p) => p.id === id);
  },

  getByCategory: async (category: ProductCategory | 'all'): Promise<Product[]> => {
    if (category === 'all') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === category);
  },

  getFeatured: async (): Promise<Product[]> => {
    return PRODUCTS.filter((p) => p.featured);
  },

  search: async (query: string): Promise<Product[]> => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
};
