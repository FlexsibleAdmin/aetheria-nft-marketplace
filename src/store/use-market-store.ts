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
  currentUserId: string | null; // Mock wallet address/ID
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
  // Transaction Actions
  buyNFT: (nftId: string) => Promise<void>;
  placeBid: (nftId: string, amount: number) => Promise<void>;
}
const INITIAL_FILTERS: MarketFilters = {
  priceRange: [0, 10],
  categories: [],
  status: [],
};
const MOCK_WALLET_ID = "0x71C...3A9";
export const useMarketStore = create<MarketState>((set, get) => ({
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
  currentUserId: null,
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
  connectWallet: () => set({ isWalletConnected: true, currentUserId: MOCK_WALLET_ID }),
  disconnectWallet: () => set({ isWalletConnected: false, currentUserId: null }),
  resetFilters: () => set({ filters: INITIAL_FILTERS, searchQuery: '' }),
  // Transaction Actions
  buyNFT: async (nftId: string) => {
    const { currentUserId, nfts } = get();
    if (!currentUserId) throw new Error("Wallet not connected");
    try {
      const updatedNFT = await api<NFT>(`/api/nfts/${nftId}/buy`, {
        method: 'POST',
        body: JSON.stringify({ buyer: currentUserId })
      });
      // Update local state
      set({
        nfts: nfts.map(n => n.id === nftId ? updatedNFT : n)
      });
    } catch (error) {
      console.error("Buy failed:", error);
      throw error;
    }
  },
  placeBid: async (nftId: string, amount: number) => {
    const { currentUserId, nfts } = get();
    if (!currentUserId) throw new Error("Wallet not connected");
    try {
      const updatedNFT = await api<NFT>(`/api/nfts/${nftId}/bid`, {
        method: 'POST',
        body: JSON.stringify({ bidder: currentUserId, amount })
      });
      // Update local state
      set({
        nfts: nfts.map(n => n.id === nftId ? updatedNFT : n)
      });
    } catch (error) {
      console.error("Bid failed:", error);
      throw error;
    }
  }
}));