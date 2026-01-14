import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NFT } from '@/lib/market-data';
import { useMarketStore } from '@/store/use-market-store';
import { toast } from 'sonner';
import { Loader2, Gavel } from 'lucide-react';
interface BidModalProps {
  nft: NFT;
  isOpen: boolean;
  onClose: () => void;
}
export function BidModal({ nft, isOpen, onClose }: BidModalProps) {
  const [amount, setAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const placeBid = useMarketStore(s => s.placeBid);
  const currentUserId = useMarketStore(s => s.currentUserId);
  const minBid = nft.price + 0.01; // Minimum increment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserId) {
      toast.error("Please connect your wallet first");
      return;
    }
    const bidAmount = parseFloat(amount);
    if (isNaN(bidAmount) || bidAmount <= nft.price) {
      toast.error(`Bid must be higher than current price (${nft.price} ${nft.currency})`);
      return;
    }
    setIsSubmitting(true);
    try {
      await placeBid(nft.id, bidAmount);
      toast.success("Bid placed successfully!");
      onClose();
      setAmount('');
    } catch (error: any) {
      toast.error(error.message || "Failed to place bid");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gavel className="w-5 h-5 text-violet-500" />
            Place a Bid
          </DialogTitle>
          <DialogDescription>
            You are bidding on <span className="font-semibold text-foreground">{nft.title}</span>.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current Price</span>
              <span className="font-mono font-medium">{nft.price} {nft.currency}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Minimum Bid</span>
              <span className="font-mono font-medium">{minBid.toFixed(2)} {nft.currency}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bid-amount">Your Bid</Label>
            <div className="relative">
              <Input
                id="bid-amount"
                type="number"
                step="0.01"
                min={minBid}
                placeholder={`Enter ${minBid.toFixed(2)} or more`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 font-mono"
                required
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                Ξ
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-violet-600 hover:bg-violet-700 text-white min-w-[100px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Place Bid'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}