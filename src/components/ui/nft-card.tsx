import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NFT } from '@/lib/market-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMarketStore } from '@/store/use-market-store';
import { cn } from '@/lib/utils';
interface NFTCardProps {
  nft: NFT;
  className?: string;
}
export function NFTCard({ nft, className }: NFTCardProps) {
  const addToCart = useMarketStore((s) => s.addToCart);
  const cart = useMarketStore((s) => s.cart);
  const isInCart = cart.some((item) => item.id === nft.id);
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(nft);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm hover:shadow-glow transition-all duration-300",
        className
      )}
    >
      <Link to={`/asset/${nft.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={nft.image}
            alt={nft.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button 
              size="sm" 
              className="bg-white text-black hover:bg-white/90 font-semibold"
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </Button>
          </div>
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {nft.status === 'auction' && (
              <Badge variant="secondary" className="bg-black/50 backdrop-blur-md text-white border-white/20">
                Auction
              </Badge>
            )}
          </div>
          {/* Like Button */}
          <button className="absolute top-3 right-3 p-2 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-foreground truncate max-w-[180px]" title={nft.title}>
                {nft.title}
              </h3>
              <p className="text-xs text-muted-foreground">{nft.collection.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">{nft.price} {nft.currency}</p>
              {nft.status === 'auction' && (
                <p className="text-[10px] text-muted-foreground">Highest Bid</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6 border border-border">
                <AvatarImage src={nft.creator.avatar} />
                <AvatarFallback>{nft.creator.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground truncate max-w-[100px]">
                {nft.creator.name}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {nft.category}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}