/**
 * Minimal real-world demo: One Durable Object instance per entity (User, ChatBoard), with Indexes for listing.
 */
import { IndexedEntity } from "./core-utils";
import type { User, Chat, ChatMessage, NFT, Collection } from "@shared/types";
import { MOCK_CHAT_MESSAGES, MOCK_CHATS, MOCK_USERS, MOCK_NFTS, MOCK_COLLECTIONS } from "@shared/mock-data";
// USER ENTITY: one DO instance per user
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
// CHAT BOARD ENTITY: one DO instance per chat board, stores its own messages
export type ChatBoardState = Chat & { messages: ChatMessage[] };
const SEED_CHAT_BOARDS: ChatBoardState[] = MOCK_CHATS.map(c => ({
  ...c,
  messages: MOCK_CHAT_MESSAGES.filter(m => m.chatId === c.id),
}));
export class ChatBoardEntity extends IndexedEntity<ChatBoardState> {
  static readonly entityName = "chat";
  static readonly indexName = "chats";
  static readonly initialState: ChatBoardState = { id: "", title: "", messages: [] };
  static seedData = SEED_CHAT_BOARDS;
  async listMessages(): Promise<ChatMessage[]> {
    const { messages } = await this.getState();
    return messages;
  }
  async sendMessage(userId: string, text: string): Promise<ChatMessage> {
    const msg: ChatMessage = { id: crypto.randomUUID(), chatId: this.id, userId, text, ts: Date.now() };
    await this.mutate(s => ({ ...s, messages: [...s.messages, msg] }));
    return msg;
  }
}
// NFT ENTITY
export class NFTEntity extends IndexedEntity<NFT> {
  static readonly entityName = "nft";
  static readonly indexName = "nfts";
  static readonly initialState: NFT = {
    id: "",
    title: "",
    description: "",
    image: "",
    price: 0,
    currency: "ETH",
    creator: { id: "", name: "", avatar: "", verified: false },
    collection: { id: "", name: "", coverImage: "", floorPrice: 0, volume: 0 },
    category: "Art",
    status: "buy_now",
    attributes: [],
    history: []
  };
  static seedData = MOCK_NFTS;
  async placeBid(bidder: string, amount: number): Promise<NFT> {
    return this.mutate(s => {
      if (s.status !== 'auction') throw new Error("Not an auction");
      if (amount <= s.price) throw new Error("Bid must be higher than current price");
      const newHistory = [
        {
          id: crypto.randomUUID(),
          action: 'Bid' as const,
          price: amount,
          from: bidder,
          date: Date.now()
        },
        ...s.history
      ];
      return { ...s, price: amount, history: newHistory };
    });
  }
  async buyNow(buyer: string): Promise<NFT> {
    return this.mutate(s => {
      if (s.status !== 'buy_now') throw new Error("Not for sale");
      const newHistory = [
        {
          id: crypto.randomUUID(),
          action: 'Sold' as const,
          price: s.price,
          from: s.creator.name, // Simplified: assuming creator is seller for now
          to: buyer,
          date: Date.now()
        },
        ...s.history
      ];
      // In a real app, we'd change ownership here. 
      // For this demo, we'll just record the sale and maybe delist it or mark as sold.
      // Let's just add history for now to keep it visible.
      return { ...s, history: newHistory };
    });
  }
}
// COLLECTION ENTITY
export class CollectionEntity extends IndexedEntity<Collection> {
  static readonly entityName = "collection";
  static readonly indexName = "collections";
  static readonly initialState: Collection = {
    id: "",
    name: "",
    coverImage: "",
    floorPrice: 0,
    volume: 0
  };
  static seedData = MOCK_COLLECTIONS;
}