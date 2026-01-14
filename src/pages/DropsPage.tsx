import React from 'react';
import { motion } from 'framer-motion';
import { MarketLayout } from '@/components/layout/main-nav.tsx';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/ui/countdown-timer';
import { Badge } from '@/components/ui/badge';
import { Calendar, Bell, ArrowRight } from 'lucide-react';
// Mock Data for Drops (Visual only)
const DROPS = [
  {
    id: 'drop1',
    title: 'Neon Genesis: Reborn',
    creator: 'CyberPunk_X',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&auto=format&fit=crop&q=80',
    date: new Date(Date.now() + 86400000 * 2), // 2 days from now
    description: 'The long-awaited sequel to the original Neon Genesis collection. 10,000 unique avatars generated from over 500 traits.',
    items: 10000,
    price: 0.08
  },
  {
    id: 'drop2',
    title: 'Ethereal Landscapes',
    creator: 'DreamWeaver',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    date: new Date(Date.now() + 86400000 * 5), // 5 days from now
    description: 'A collection of 500 hand-painted digital landscapes exploring the boundaries of virtual reality.',
    items: 500,
    price: 0.5
  },
  {
    id: 'drop3',
    title: 'Mecha-Soul',
    creator: 'RoboArtist',
    image: 'https://images.unsplash.com/photo-1614730341194-75c607400070?w=1200&auto=format&fit=crop&q=80',
    date: new Date(Date.now() + 86400000 * 12), // 12 days from now
    description: 'Do androids dream? This collection explores the consciousness of AI through abstract geometry.',
    items: 3333,
    price: 0.15
  }
];
export function DropsPage() {
  const featuredDrop = DROPS[0];
  const upcomingDrops = DROPS.slice(1);
  return (
    <MarketLayout>
      {/* Hero Section - Featured Drop */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={featuredDrop.image} 
            alt={featuredDrop.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-6"
          >
            <Badge className="bg-violet-600 hover:bg-violet-700 text-white border-0 px-4 py-1 text-sm">
              Featured Drop
            </Badge>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight text-white">
              {featuredDrop.title}
            </h1>
            <div className="flex items-center gap-3 text-lg text-white/80">
              <span className="font-medium text-cyan-400">by {featuredDrop.creator}</span>
              <span>•</span>
              <span>{featuredDrop.items.toLocaleString()} Items</span>
              <span>•</span>
              <span>{featuredDrop.price} ETH</span>
            </div>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
              {featuredDrop.description}
            </p>
            <div className="py-6">
              <p className="text-sm text-gray-400 mb-3 uppercase tracking-widest font-semibold">Dropping In</p>
              <CountdownTimer targetDate={featuredDrop.date} size="lg" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg bg-white text-black hover:bg-gray-200">
                Set Reminder <Bell className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10">
                View Collection
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Upcoming Drops Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-display font-bold">Upcoming Drops</h2>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingDrops.map((drop, index) => (
              <motion.div
                key={drop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img 
                    src={drop.image} 
                    alt={drop.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="backdrop-blur-md bg-black/50 text-white border-white/10">
                      <Calendar className="w-3 h-3 mr-1" />
                      {drop.date.toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{drop.title}</h3>
                      <p className="text-muted-foreground">by <span className="text-primary">{drop.creator}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-lg">{drop.price} ETH</p>
                      <p className="text-xs text-muted-foreground">{drop.items} Items</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground line-clamp-2">
                    {drop.description}
                  </p>
                  <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                    <CountdownTimer targetDate={drop.date} size="sm" showLabels={false} />
                    <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                      Notify Me
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MarketLayout>
  );
}