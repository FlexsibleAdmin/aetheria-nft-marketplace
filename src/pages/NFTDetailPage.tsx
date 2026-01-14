import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, MoreHorizontal, Clock, Tag, Activity } from 'lucide-react';
import { MarketLayout } from '@/components/layout/main-nav.tsx';
import { MOCK_NFTS } from '@/lib/market-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useMarketStore } from '@/store/use-market-store';
import { toast } from 'sonner';
export function NFTDetailPage() {
  const { id } = useParams<{ id: string }>();
  const addToCart = useMarketStore((s) => s.addToCart);
  const nft = useMemo(() => MOCK_NFTS.find((n) => n.id === id), [id]);
  if (!nft) {
    return (
      <MarketLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Asset not found</h1>
          <Button asChild>
            <Link to="/explore">Back to Marketplace</Link>
          </Button>
        </div>
      </MarketLayout>
    );
  }
  const handleBuy = () => {
    addToCart(nft);
    toast.success(`Added ${nft.title} to cart`);
  };
  return (
    <MarketLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/explore" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Explore
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Image */}
          <div className="space-y-6">
            <div className="aspect-square rounded-2xl overflow-hidden border border-border bg-muted relative group">
              <img 
                src={nft.image} 
                alt={nft.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" className="rounded-full backdrop-blur-md bg-black/20 text-white hover:bg-black/40">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full backdrop-blur-md bg-black/20 text-white hover:bg-black/40">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {/* Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {nft.attributes.map((attr, idx) => (
                <div key={idx} className="bg-secondary/30 rounded-lg p-3 border border-border/50 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{attr.trait_type}</p>
                  <p className="font-medium text-sm">{attr.value}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Right Column: Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link to="#" className="text-violet-500 font-medium hover:underline">
                  {nft.collection.name}
                </Link>
                {nft.status === 'auction' && <Badge variant="secondary">Auction</Badge>}
              </div>
              <h1 className="text-4xl font-display font-bold mb-4">{nft.title}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Created by</span>
                  <div className="flex items-center gap-1.5">
                    <Avatar className="w-5 h-5">
                      <AvatarImage src={nft.creator.avatar} />
                      <AvatarFallback>{nft.creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{nft.creator.name}</span>
                  </div>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Owned by</span>
                  <span className="font-medium">0x84...2B</span>
                </div>
              </div>
            </div>
            {/* Pricing Card */}
            <Card className="bg-secondary/10 border-border/60">
              <CardContent className="p-6 space-y-6">
                {nft.status === 'auction' && nft.endsAt && (
                  <div className="p-4 bg-background/50 rounded-lg border border-border/50 flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Auction ends in</p>
                      <p className="font-mono font-medium">12h 43m 20s</p>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{nft.price} {nft.currency}</span>
                    <span className="text-muted-foreground">(${(nft.price * 3200).toLocaleString()})</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button size="lg" className="flex-1 bg-violet-600 hover:bg-violet-700 text-white" onClick={handleBuy}>
                    <Tag className="w-4 h-4 mr-2" />
                    {nft.status === 'auction' ? 'Place Bid' : 'Buy Now'}
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1">
                    Make Offer
                  </Button>
                </div>
              </CardContent>
            </Card>
            {/* Tabs */}
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="history" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  History
                </TabsTrigger>
                <TabsTrigger 
                  value="description" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  Description
                </TabsTrigger>
              </TabsList>
              <TabsContent value="history" className="mt-4">
                <div className="space-y-4">
                  {nft.history.map((event) => (
                    <div key={event.id} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-secondary">
                          <Activity className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{event.action}</p>
                          <p className="text-xs text-muted-foreground">by {event.from}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{event.price} ETH</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                  {nft.history.length === 0 && (
                    <p className="text-sm text-muted-foreground py-4">No history available</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="description" className="mt-4">
                <p className="text-muted-foreground leading-relaxed">
                  {nft.description}
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MarketLayout>
  );
}