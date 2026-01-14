import { create } from 'zustand';
import { NFT, Collection } from '@/lib/market-data';
import { api } from '@/lib/api-client';
interface MarketFilters {
  priceRange: [number, number];
  categories: string[];
  status: ('buy_now' | 'auction')[];
}
interface MarketState {
  // Data
  nfts: NFT[];
  collections: Collection[];
  isLoading: boolean;
  error: string | null;
  // Filters & UI State
  filters: MarketFilters;
  searchQuery: string;
  cart: NFT[];
  isWalletConnected: boolean;
  // Actions
  fetchMarketData: () => Promise<void>;
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
  // Initial Data State
  nfts: [],
  collections: [],
  isLoading: false,
  error: null,
  // Initial UI State
  filters: INITIAL_FILTERS,
  searchQuery: '',
  cart: [],
  isWalletConnected: false,
  // Async Actions
  fetchMarketData: async () => {
    set({ isLoading: true, error: null });
    try {
      // Fetch NFTs and Collections in parallel
      const [nftsRes, colsRes] = await Promise.all([
        api<{ items: NFT[]; next: string | null }>('/api/nfts'),
        api<{ items: Collection[]; next: string | null }>('/api/collections')
      ]);
      set({ 
        nfts: nftsRes.items, 
        collections: colsRes.items, 
        isLoading: false 
      });
    } catch (err: any) {
      console.error('Failed to fetch market data:', err);
      set({ 
        error: err.message || 'Failed to load market data', 
        isLoading: false 
      });
    }
  },
  // Sync Actions
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