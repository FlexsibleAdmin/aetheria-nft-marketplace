import React, { useMemo } from 'react';
import { MarketLayout } from '@/components/layout/main-nav.tsx';
import { FilterSidebar } from '@/components/market/filter-sidebar';
import { NFTCard } from '@/components/ui/nft-card';
import { MOCK_NFTS } from '@/lib/market-data';
import { useMarketStore } from '@/store/use-market-store';
import { SearchX } from 'lucide-react';
export function MarketplacePage() {
  // Selectors - Primitive values only to prevent loops
  const priceRange = useMarketStore((s) => s.filters.priceRange);
  const categories = useMarketStore((s) => s.filters.categories);
  const status = useMarketStore((s) => s.filters.status);
  const searchQuery = useMarketStore((s) => s.searchQuery);
  // Filter Logic
  const filteredNFTs = useMemo(() => {
    return MOCK_NFTS.filter((nft) => {
      // Search
      if (searchQuery && !nft.title.toLowerCase().includes(searchQuery.toLowerCase()) && !nft.collection.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Price
      if (nft.price < priceRange[0] || nft.price > priceRange[1]) {
        return false;
      }
      // Categories
      if (categories.length > 0 && !categories.includes(nft.category)) {
        return false;
      }
      // Status
      if (status.length > 0 && !status.includes(nft.status)) {
        return false;
      }
      return true;
    });
  }, [priceRange, categories, status, searchQuery]);
  return (
    <MarketLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <FilterSidebar />
          {/* Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold font-display">Explore Assets</h1>
              <span className="text-sm text-muted-foreground">
                {filteredNFTs.length} results
              </span>
            </div>
            {filteredNFTs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredNFTs.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="p-4 bg-muted rounded-full mb-4">
                  <SearchX className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No items found</h3>
                <p className="text-muted-foreground max-w-xs mx-auto mt-2">
                  Try adjusting your filters or search query to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MarketLayout>
  );
}