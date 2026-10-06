import { create } from 'zustand';
import { CartItem, Product } from '../types/ecommerce';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, options?: { color?: string; size?: string; quantity?: number }) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: () => number;
  shipping: () => number;
  discount: () => number;
  total: () => number;
  itemCount: () => number;
}

const STORAGE_KEY = 'luxevogue_cart';

const loadCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage quota
  }
};

export const useCartStore = create<CartState>((set, get) => ({
  items: loadCart(),

  addItem: (product, options) => {
    const selectedColor = options?.color || product.colors[0]?.name || 'Standard';
    const selectedSize = options?.size || product.sizes[0] || 'Default';
    const quantity = options?.quantity || 1;
    const itemId = `${product.id}-${selectedColor}-${selectedSize}`;

    set((state) => {
      const existing = state.items.find((i) => i.id === itemId);
      let newItems: CartItem[];
      if (existing) {
        newItems = state.items.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        newItems = [
          ...state.items,
          {
            id: itemId,
            productId: product.id,
            product,
            selectedColor,
            selectedSize,
            quantity,
            price: product.price
          }
        ];
      }
      saveCart(newItems);
      return { items: newItems };
    });
  },

  removeItem: (itemId) => {
    set((state) => {
      const newItems = state.items.filter((i) => i.id !== itemId);
      saveCart(newItems);
      return { items: newItems };
    });
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }
    set((state) => {
      const newItems = state.items.map((i) =>
        i.id === itemId ? { ...i, quantity } : i
      );
      saveCart(newItems);
      return { items: newItems };
    });
  },

  clearCart: () => {
    saveCart([]);
    set({ items: [] });
  },

  subtotal: () => {
    return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },

  shipping: () => {
    const sub = get().subtotal();
    if (sub === 0) return 0;
    return sub >= 1500 ? 0 : 50; // Free luxury white-glove shipping over $1500
  },

  discount: () => {
    return 0;
  },

  total: () => {
    return get().subtotal() + get().shipping() - get().discount();
  },

  itemCount: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  }
}));
