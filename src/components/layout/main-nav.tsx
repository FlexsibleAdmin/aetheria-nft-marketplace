import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Wallet, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useMarketStore } from '@/store/use-market-store';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
export function MainNav() {
  const location = useLocation();
  const isWalletConnected = useMarketStore((s) => s.isWalletConnected);
  const connectWallet = useMarketStore((s) => s.connectWallet);
  const disconnectWallet = useMarketStore((s) => s.disconnectWallet);
  const cart = useMarketStore((s) => s.cart);
  const searchQuery = useMarketStore((s) => s.searchQuery);
  const setSearchQuery = useMarketStore((s) => s.setSearchQuery);
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/drops', label: 'Drops' },
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="font-display font-bold text-xl hidden sm:inline-block tracking-tight">
              I Love You
            </span>
          </Link>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  location.pathname === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items, collections, and accounts..."
              className="pl-9 bg-secondary/50 border-transparent focus:bg-background focus:border-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle className="relative static top-0 right-0" />
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-violet-600">
                  {cart.length}
                </Badge>
              )}
            </Button>
            {isWalletConnected ? (
              <Button
                variant="outline"
                className="hidden sm:flex border-violet-500/50 text-violet-500 hover:bg-violet-500/10"
                onClick={disconnectWallet}
              >
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                0x71...3A9
              </Button>
            ) : (
              <Button
                className="hidden sm:flex bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white border-0"
                onClick={connectWallet}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            )}
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 mt-6">
                  <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="text-lg font-medium text-foreground/80 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white"
                    onClick={isWalletConnected ? disconnectWallet : connectWallet}
                  >
                    {isWalletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
export function MarketLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.title = "I Love You";
  }, []);
  return (
    <div className="min-h-screen bg-background font-sans antialiased selection:bg-violet-500/30">
      <MainNav />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-border/40 py-8 mt-12 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built with ❤️ by Aurelia | Your AI Co-founder</p>
          <p className="mt-2">&copy; 2024 I Love You. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}