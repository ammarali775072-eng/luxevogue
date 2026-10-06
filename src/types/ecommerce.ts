export type ProductCategory = 
  | 'sneakers' 
  | 'bags' 
  | 'watches' 
  | 'jewelry' 
  | 'accessories' 
  | 'fashion' 
  | 'beauty' 
  | 'lifestyle';

export interface Product3DConfig {
  modelType: 'sneaker' | 'watch' | 'bag' | 'sculpture' | 'ring';
  defaultColor: string;
  defaultMaterial: 'leather' | 'titanium' | 'gold' | 'ceramic' | 'matte';
  accentColor?: string;
  scale?: number;
  rotationSpeed?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  description: string;
  shortDescription: string;
  images: string[];
  thumbnail: string;
  colors: {
    name: string;
    hex: string;
    material?: string;
  }[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  badge?: 'Limited Edition' | 'New Arrival' | 'Atelier Exclusive' | 'Signature' | 'Handcrafted' | 'Best Seller';
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  threeDConfig?: Product3DConfig;
  tags: string[];
  specs?: Record<string, string>;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  price: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}

export interface OrderDetails {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'cod' | 'jazzcash' | 'easypaisa' | 'card';
  status: 'confirmed' | 'processing' | 'shipped';
}
