import { OrderDetails } from '../types/ecommerce';

const ORDERS_KEY = 'luxevogue_orders';

export const orderService = {
  createOrder: async (orderData: Omit<OrderDetails, 'id' | 'date' | 'status'>): Promise<OrderDetails> => {
    // Generate luxury bespoke order identifier
    const randNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `LV-${new Date().getFullYear()}-${randNum}`;

    const newOrder: OrderDetails = {
      ...orderData,
      id: orderId,
      date: new Date().toISOString(),
      status: 'confirmed'
    };

    if (typeof window !== 'undefined') {
      try {
        const existing = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
        localStorage.setItem(ORDERS_KEY, JSON.stringify([newOrder, ...existing]));
      } catch {
        // Ignore quota
      }
    }

    return newOrder;
  },

  getOrderById: async (id: string): Promise<OrderDetails | undefined> => {
    if (typeof window === 'undefined') return undefined;
    try {
      const existing: OrderDetails[] = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      return existing.find((o) => o.id === id);
    } catch {
      return undefined;
    }
  }
};
