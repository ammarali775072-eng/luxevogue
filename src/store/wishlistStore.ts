import { create } from 'zustand';

interface WishlistState {
  productIds: string[];
  toggleWishlist: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const STORAGE_KEY = 'luxevogue_wishlist';

const loadWishlist = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveWishlist = (ids: string[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Ignore quota errors
  }
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  productIds: loadWishlist(),

  toggleWishlist: (productId: string) => {
    const current = get().productIds;
    const exists = current.includes(productId);
    let next: string[];

    if (exists) {
      next = current.filter((id) => id !== productId);
    } else {
      next = [...current, productId];
    }

    saveWishlist(next);
    set({ productIds: next });
    return !exists;
  },

  isInWishlist: (productId: string) => {
    return get().productIds.includes(productId);
  },

  clearWishlist: () => {
    saveWishlist([]);
    set({ productIds: [] });
  }
}));
