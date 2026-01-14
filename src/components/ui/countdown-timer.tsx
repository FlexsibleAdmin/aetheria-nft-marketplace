import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
interface CountdownTimerProps {
  targetDate: number | Date;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}
export function CountdownTimer({ targetDate, className, size = 'md', showLabels = true }: CountdownTimerProps) {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }, [targetDate]);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    // Update immediately when targetDate changes or component mounts
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);
  const pad = (n: number) => n.toString().padStart(2, '0');
  const sizeClasses = {
    sm: 'text-sm gap-2',
    md: 'text-xl gap-3',
    lg: 'text-3xl md:text-4xl gap-4 md:gap-6'
  };
  const labelClasses = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm'
  };
  return (
    <div className={cn("flex items-center font-mono font-bold", sizeClasses[size], className)}>
      <div className="flex flex-col items-center">
        <span className="bg-secondary/30 px-2 py-1 rounded-md border border-white/5 min-w-[2ch] text-center">
          {pad(timeLeft.days)}
        </span>
        {showLabels && <span className={cn("text-muted-foreground font-sans font-normal mt-1", labelClasses[size])}>Days</span>}
      </div>
      <span className="text-muted-foreground/50 -mt-4">:</span>
      <div className="flex flex-col items-center">
        <span className="bg-secondary/30 px-2 py-1 rounded-md border border-white/5 min-w-[2ch] text-center">
          {pad(timeLeft.hours)}
        </span>
        {showLabels && <span className={cn("text-muted-foreground font-sans font-normal mt-1", labelClasses[size])}>Hours</span>}
      </div>
      <span className="text-muted-foreground/50 -mt-4">:</span>
      <div className="flex flex-col items-center">
        <span className="bg-secondary/30 px-2 py-1 rounded-md border border-white/5 min-w-[2ch] text-center">
          {pad(timeLeft.minutes)}
        </span>
        {showLabels && <span className={cn("text-muted-foreground font-sans font-normal mt-1", labelClasses[size])}>Mins</span>}
      </div>
      <span className="text-muted-foreground/50 -mt-4">:</span>
      <div className="flex flex-col items-center">
        <span className="bg-secondary/30 px-2 py-1 rounded-md border border-white/5 min-w-[2ch] text-center">
          {pad(timeLeft.seconds)}
        </span>
        {showLabels && <span className={cn("text-muted-foreground font-sans font-normal mt-1", labelClasses[size])}>Secs</span>}
      </div>
    </div>
  );
}