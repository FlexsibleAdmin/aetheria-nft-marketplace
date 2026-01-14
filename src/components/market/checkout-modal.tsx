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
import { NFT } from '@/lib/market-data';
import { useMarketStore } from '@/store/use-market-store';
import { toast } from 'sonner';
import { Loader2, ShoppingCart, ShieldCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import confetti from 'canvas-confetti';
interface CheckoutModalProps {
  nft: NFT;
  isOpen: boolean;
  onClose: () => void;
}
export function CheckoutModal({ nft, isOpen, onClose }: CheckoutModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const buyNFT = useMarketStore(s => s.buyNFT);
  const currentUserId = useMarketStore(s => s.currentUserId);
  const handlePurchase = async () => {
    if (!currentUserId) {
      toast.error("Please connect your wallet first");
      return;
    }
    setIsProcessing(true);
    try {
      await buyNFT(nft.id);
      // Success effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7C3AED', '#06B6D4', '#ffffff']
      });
      toast.success(`Successfully purchased ${nft.title}!`);
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Purchase failed");
    } finally {
      setIsProcessing(false);
    }
  };
  const fees = nft.price * 0.025; // 2.5% fee
  const total = nft.price + fees;
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-cyan-500" />
            Checkout
          </DialogTitle>
          <DialogDescription>
            Complete your purchase of <span className="font-semibold text-foreground">{nft.title}</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 space-y-6">
          {/* Item Summary */}
          <div className="flex gap-4 items-center p-3 bg-secondary/20 rounded-lg border border-border/50">
            <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <img src={nft.image} alt={nft.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{nft.title}</h4>
              <p className="text-sm text-muted-foreground truncate">{nft.collection.name}</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-medium">{nft.price} {nft.currency}</p>
            </div>
          </div>
          {/* Cost Breakdown */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Item Price</span>
              <span className="font-mono">{nft.price.toFixed(3)} {nft.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Fee (2.5%)</span>
              <span className="font-mono">{fees.toFixed(3)} {nft.currency}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="font-mono text-primary">{total.toFixed(3)} {nft.currency}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-blue-500/10 p-3 rounded text-blue-400">
            <ShieldCheck className="w-4 h-4" />
            <span>This transaction is simulated on the test network.</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button 
            onClick={handlePurchase} 
            className="bg-cyan-600 hover:bg-cyan-700 text-white min-w-[120px]"
            disabled={isProcessing}
          >
            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Purchase'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}