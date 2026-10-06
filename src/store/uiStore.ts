import { create } from 'zustand';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'gold';
}

interface UIState {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  theme: 'dark' | 'light';
  quality3D: 'high' | 'medium' | 'low';
  cursorVariant: 'default' | 'hover' | 'product' | 'drag' | 'magnetic';
  cursorText: string;
  soundEnabled: boolean;
  hasLoadedPreloader: boolean;
  toasts: ToastMessage[];

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  setQuality3D: (quality: 'high' | 'medium' | 'low') => void;
  setCursorVariant: (variant: 'default' | 'hover' | 'product' | 'drag' | 'magnetic', text?: string) => void;
  toggleSound: () => void;
  setHasLoadedPreloader: (loaded: boolean) => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set, get) => {
  const savedTheme = typeof window !== 'undefined' 
    ? (localStorage.getItem('luxevogue_theme') as 'dark' | 'light') || 'dark'
    : 'dark';

  return {
    isCartOpen: false,
    isSearchOpen: false,
    isMobileMenuOpen: false,
    theme: savedTheme,
    quality3D: typeof window !== 'undefined' && window.innerWidth < 768 ? 'medium' : 'high',
    cursorVariant: 'default',
    cursorText: '',
    soundEnabled: false,
    hasLoadedPreloader: false,
    toasts: [],

    openCart: () => set({ isCartOpen: true }),
    closeCart: () => set({ isCartOpen: false }),
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

    openSearch: () => set({ isSearchOpen: true }),
    closeSearch: () => set({ isSearchOpen: false }),

    openMobileMenu: () => set({ isMobileMenuOpen: true }),
    closeMobileMenu: () => set({ isMobileMenuOpen: false }),
    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

    setTheme: (theme) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('luxevogue_theme', theme);
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      set({ theme });
    },

    toggleTheme: () => {
      const next = get().theme === 'dark' ? 'light' : 'dark';
      get().setTheme(next);
    },

    setQuality3D: (quality3D) => set({ quality3D }),

    setCursorVariant: (cursorVariant, cursorText = '') => set({ cursorVariant, cursorText }),

    toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

    setHasLoadedPreloader: (hasLoadedPreloader) => set({ hasLoadedPreloader }),

    addToast: ({ title, description, type = 'gold' }) => {
      const id = `${Date.now()}-${Math.random()}`;
      set((state) => ({
        toasts: [...state.toasts, { id, title, description, type }]
      }));
      setTimeout(() => {
        get().removeToast(id);
      }, 4000);
    },

    removeToast: (id) => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }));
    }
  };
});
