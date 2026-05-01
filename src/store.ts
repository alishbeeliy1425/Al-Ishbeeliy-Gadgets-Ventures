import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  video_url?: string;
  created_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  isAdminAuth: boolean;
  setAdminAuth: (status: boolean) => void;
  siteName: string;
  setSiteName: (name: string) => void;
  siteLogo: string;
  setSiteLogo: (url: string) => void;
  adminPassword: string;
  setAdminPassword: (password: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find((item) => item.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      cartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      isAdminAuth: false,
      setAdminAuth: (status) => set({ isAdminAuth: status }),
      siteName: 'Al Ishbeeliy Gadgets',
      setSiteName: (name) => set({ siteName: name }),
      siteLogo: '',
      setSiteLogo: (url) => set({ siteLogo: url }),
      adminPassword: 'Abu Abdullah@1425',
      setAdminPassword: (password) => set({ adminPassword: password }),
    }),
    {
      name: 'al-ishbeeliy-cart',
      partialize: (state) => ({ cart: state.cart, siteName: state.siteName, siteLogo: state.siteLogo, adminPassword: state.adminPassword }),
    }
  )
);
