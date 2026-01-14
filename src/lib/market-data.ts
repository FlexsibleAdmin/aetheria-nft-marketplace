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
  history: {
    id: string;
    action: 'Listed' | 'Sold' | 'Bid';
    price: number;
    from: string;
    to?: string;
    date: number;
  }[];
}
export const CATEGORIES = ['Art', 'Photography', 'Gaming', 'Music', 'Abstract'] as const;
export const MOCK_CREATORS: Creator[] = [
  {
    id: 'c1',
    name: 'NeonDreamer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60',
    verified: true,
  },
  {
    id: 'c2',
    name: 'CyberPunk_X',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=60',
    verified: true,
  },
  {
    id: 'c3',
    name: 'PixelMaster',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60',
    verified: false,
  },
];
export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'col1',
    name: 'Ethereal Glitch',
    coverImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60',
    floorPrice: 1.2,
    volume: 450,
  },
  {
    id: 'col2',
    name: 'Neon Genesis',
    coverImage: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&auto=format&fit=crop&q=60',
    floorPrice: 0.8,
    volume: 120,
  },
  {
    id: 'col3',
    name: 'Abstract Minds',
    coverImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=60',
    floorPrice: 2.5,
    volume: 890,
  },
];
export const MOCK_NFTS: NFT[] = [
  {
    id: 'nft1',
    title: 'Cyber Samurai #042',
    description: 'A digital warrior from the neon-soaked streets of Neo-Tokyo. This piece explores the intersection of tradition and technology.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    price: 1.5,
    currency: 'ETH',
    creator: MOCK_CREATORS[0],
    collection: MOCK_COLLECTIONS[0],
    category: 'Art',
    status: 'buy_now',
    attributes: [
      { trait_type: 'Background', value: 'Neon City' },
      { trait_type: 'Weapon', value: 'Katana' },
      { trait_type: 'Rarity', value: 'Legendary' },
    ],
    history: [
      { id: 'h1', action: 'Listed', price: 1.5, from: 'NeonDreamer', date: Date.now() - 86400000 },
    ],
  },
  {
    id: 'nft2',
    title: 'Abstract Thoughts',
    description: 'Visualizing the complexity of human thought patterns through generative algorithms.',
    image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&auto=format&fit=crop&q=60',
    price: 0.8,
    currency: 'ETH',
    creator: MOCK_CREATORS[2],
    collection: MOCK_COLLECTIONS[2],
    category: 'Abstract',
    status: 'auction',
    endsAt: Date.now() + 172800000, // 2 days
    attributes: [
      { trait_type: 'Style', value: 'Generative' },
      { trait_type: 'Palette', value: 'Monochrome' },
    ],
    history: [
      { id: 'h2', action: 'Bid', price: 0.75, from: 'Collector_A', date: Date.now() - 3600000 },
      { id: 'h3', action: 'Listed', price: 0.5, from: 'PixelMaster', date: Date.now() - 172800000 },
    ],
  },
  {
    id: 'nft3',
    title: 'Neon Horizon',
    description: 'Where the digital sun never sets.',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=60',
    price: 2.1,
    currency: 'ETH',
    creator: MOCK_CREATORS[1],
    collection: MOCK_COLLECTIONS[1],
    category: 'Photography',
    status: 'buy_now',
    attributes: [
      { trait_type: 'Location', value: 'Virtual' },
      { trait_type: 'Time', value: 'Dusk' },
    ],
    history: [],
  },
  {
    id: 'nft4',
    title: 'Glitch Portrait',
    description: 'Identity in the age of surveillance.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
    price: 0.45,
    currency: 'ETH',
    creator: MOCK_CREATORS[0],
    collection: MOCK_COLLECTIONS[0],
    category: 'Art',
    status: 'buy_now',
    attributes: [],
    history: [],
  },
  {
    id: 'nft5',
    title: 'Cosmic Cube',
    description: 'A 4D object projected into 3D space.',
    image: 'https://images.unsplash.com/photo-1614730341194-75c607400070?w=800&auto=format&fit=crop&q=60',
    price: 3.0,
    currency: 'ETH',
    creator: MOCK_CREATORS[2],
    collection: MOCK_COLLECTIONS[2],
    category: 'Abstract',
    status: 'auction',
    endsAt: Date.now() + 86400000,
    attributes: [],
    history: [],
  },
  {
    id: 'nft6',
    title: 'Retro Gaming Console',
    description: 'Nostalgia for a future that never happened.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60',
    price: 0.9,
    currency: 'ETH',
    creator: MOCK_CREATORS[1],
    collection: MOCK_COLLECTIONS[1],
    category: 'Gaming',
    status: 'buy_now',
    attributes: [],
    history: [],
  },
  {
    id: 'nft7',
    title: 'Sound Wave #99',
    description: 'Visual representation of a bass drop.',
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&auto=format&fit=crop&q=60',
    price: 0.2,
    currency: 'ETH',
    creator: MOCK_CREATORS[2],
    collection: MOCK_COLLECTIONS[2],
    category: 'Music',
    status: 'buy_now',
    attributes: [],
    history: [],
  },
  {
    id: 'nft8',
    title: 'Cyber Cityscape',
    description: 'The verticality of the sprawl.',
    image: 'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=800&auto=format&fit=crop&q=60',
    price: 5.5,
    currency: 'ETH',
    creator: MOCK_CREATORS[0],
    collection: MOCK_COLLECTIONS[0],
    category: 'Art',
    status: 'auction',
    endsAt: Date.now() + 432000000,
    attributes: [],
    history: [],
  },
];