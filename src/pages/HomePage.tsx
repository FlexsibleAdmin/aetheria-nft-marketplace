import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MarketLayout } from '@/components/layout/main-nav.tsx';
import { Button } from '@/components/ui/button';
import { NFTCard } from '@/components/ui/nft-card';
import { useMarketStore } from '@/store/use-market-store';
import { Skeleton } from '@/components/ui/skeleton';
export function HomePage() {
  // Selectors - Primitive values only
  const fetchMarketData = useMarketStore(s => s.fetchMarketData);
  const nfts = useMarketStore(s => s.nfts);
  const collections = useMarketStore(s => s.collections);
  const isLoading = useMarketStore(s => s.isLoading);
  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);
  const featuredNFTs = nfts.slice(0, 4);
  const topCollections = collections.slice(0, 3);
  return (
    <MarketLayout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
                The Future of Digital Ownership
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
                Discover, Collect, & Sell <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-500">
                  Extraordinary NFTs
                </span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Aetheria is the premier marketplace for digital artists and collectors.
              Experience the next generation of Web3 commerce.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="h-12 px-8 text-lg bg-white text-black hover:bg-white/90" asChild>
                <Link to="/explore">
                  Explore Market <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-white/10 hover:bg-white/5">
                Create Collection
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Trending Section */}
      <section className="py-20 bg-secondary/20 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-violet-500/10 rounded-lg">
                <Zap className="w-6 h-6 text-violet-500" />
              </div>
              <h2 className="text-3xl font-bold font-display">Trending Auctions</h2>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/explore">View All</Link>
            </Button>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-[300px] w-full rounded-xl" />
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredNFTs.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NFTCard nft={nft} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Top Collections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-12">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-cyan-500" />
            </div>
            <h2 className="text-3xl font-bold font-display">Top Collections</h2>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-[200px] w-full rounded-t-xl" />
                  <Skeleton className="h-[100px] w-full rounded-b-xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topCollections.map((col, index) => (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-48 rounded-t-xl overflow-hidden">
                    <img
                      src={col.coverImage}
                      alt={col.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  </div>
                  <div className="bg-card border border-t-0 border-border rounded-b-xl p-6 hover:border-primary/50 transition-colors">
                    <h3 className="text-xl font-bold mb-2">{col.name}</h3>
                    <div className="flex justify-between text-sm">
                      <div className="text-muted-foreground">
                        Floor: <span className="text-foreground font-medium">{col.floorPrice} ETH</span>
                      </div>
                      <div className="text-muted-foreground">
                        Vol: <span className="text-foreground font-medium">{col.volume} ETH</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </MarketLayout>
  );
}