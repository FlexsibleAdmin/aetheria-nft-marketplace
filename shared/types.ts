export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// Minimal real-world chat example types (shared by frontend and worker)
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}
// Marketplace Types
export interface Creator {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
}
export interface Collection {
  id: string;
  name: string;
  coverImage: string;
  floorPrice: number;
  volume: number;
}
export interface HistoryEvent {
  id: string;
  action: 'Listed' | 'Sold' | 'Bid';
  price: number;
  from: string;
  to?: string;
  date: number;
}
export interface NFT {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  currency: 'ETH' | 'SOL' | 'USDC';
  creator: Creator;
  collection: Collection;
  category: 'Art' | 'Photography' | 'Gaming' | 'Music' | 'Abstract';
  status: 'buy_now' | 'auction';
  endsAt?: number; // Timestamp for auction end
  attributes: { trait_type: string; value: string }[];
  history: HistoryEvent[];
}