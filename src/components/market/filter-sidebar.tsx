import React from 'react';
import { X, Filter } from 'lucide-react';
import { useMarketStore } from '@/store/use-market-store';
import { CATEGORIES } from '@/lib/market-data';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
export function FilterSidebar() {
  const priceRange = useMarketStore((s) => s.filters.priceRange);
  const setPriceRange = useMarketStore((s) => s.setPriceRange);
  const categories = useMarketStore((s) => s.filters.categories);
  const toggleCategory = useMarketStore((s) => s.toggleCategory);
  const status = useMarketStore((s) => s.filters.status);
  const toggleStatus = useMarketStore((s) => s.toggleStatus);
  const resetFilters = useMarketStore((s) => s.resetFilters);
  const FilterContent = () => (
    <div className="space-y-6 p-1">
      {/* Status Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-foreground">Status</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="status-buy-now" 
              checked={status.includes('buy_now')}
              onCheckedChange={() => toggleStatus('buy_now')}
            />
            <Label htmlFor="status-buy-now" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Buy Now
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="status-auction" 
              checked={status.includes('auction')}
              onCheckedChange={() => toggleStatus('auction')}
            />
            <Label htmlFor="status-auction" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              On Auction
            </Label>
          </div>
        </div>
      </div>
      <Separator />
      {/* Price Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-foreground">Price (ETH)</h3>
          <Badge variant="outline" className="text-xs font-normal">
            {priceRange[0]} - {priceRange[1]}
          </Badge>
        </div>
        <Slider
          defaultValue={[0, 10]}
          value={priceRange}
          max={20}
          step={0.1}
          onValueChange={(val) => setPriceRange(val as [number, number])}
          className="py-4"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>0 ETH</span>
          <span>20 ETH</span>
        </div>
      </div>
      <Separator />
      {/* Categories Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-foreground">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox 
                id={`cat-${cat}`} 
                checked={categories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
              />
              <Label htmlFor={`cat-${cat}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Button 
        variant="outline" 
        className="w-full mt-6" 
        onClick={resetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-border bg-background/50 backdrop-blur-sm h-[calc(100vh-4rem)] sticky top-16">
        <ScrollArea className="h-full px-4 py-6">
          <FilterContent />
        </ScrollArea>
      </aside>
      {/* Mobile Sheet */}
      <div className="lg:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full flex gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}