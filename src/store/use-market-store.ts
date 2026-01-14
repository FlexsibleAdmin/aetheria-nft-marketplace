import { create } from 'zustand';
import { NFT } from '@/lib/market-data';
interface MarketFilters {
  priceRange: [number, number];
  categories: string[];
  status: ('buy_now' | 'auction')[];
}
interface MarketState {
  filters: MarketFilters;
  searchQuery: string;
  cart: NFT[];
  isWalletConnected: boolean;
  // Actions
  setPriceRange: (range: [number, number]) => void;
  toggleCategory: (category: string) => void;
  toggleStatus: (status: 'buy_now' | 'auction') => void;
  setSearchQuery: (query: string) => void;
  addToCart: (nft: NFT) => void;
  removeFromCart: (nftId: string) => void;
  clearCart: () => void;
  connectWallet: () => void;
  disconnectWallet: () => void;
  resetFilters: () => void;
}
const INITIAL_FILTERS: MarketFilters = {
  priceRange: [0, 10],
  categories: [],
  status: [],
};
export const useMarketStore = create<MarketState>((set) => ({
  filters: INITIAL_FILTERS,
  searchQuery: '',
  cart: [],
  isWalletConnected: false,
  setPriceRange: (range) => 
    set((state) => ({ filters: { ...state.filters, priceRange: range } })),
  toggleCategory: (category) =>
    set((state) => {
      const current = state.filters.categories;
      const next = current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category];
      return { filters: { ...state.filters, categories: next } };
    }),
  toggleStatus: (status) =>
    set((state) => {
      const current = state.filters.status;
      const next = current.includes(status)
        ? current.filter((s) => s !== status)
        : [...current, status];
      return { filters: { ...state.filters, status: next } };
    }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  addToCart: (nft) =>
    set((state) => {
      if (state.cart.some((item) => item.id === nft.id)) return state;
      return { cart: [...state.cart, nft] };
    }),
  removeFromCart: (nftId) =>
    set((state) => ({ cart: state.cart.filter((item) => item.id !== nftId) })),
  clearCart: () => set({ cart: [] }),
  connectWallet: () => set({ isWalletConnected: true }),
  disconnectWallet: () => set({ isWalletConnected: false }),
  resetFilters: () => set({ filters: INITIAL_FILTERS, searchQuery: '' }),
}));