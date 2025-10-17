import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const CoinMining = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-28 w-full rounded-xl bg-blue-500/10" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="h-32 w-full rounded-xl bg-blue-500/10"
            />
          ))}
        </div>
        <Skeleton className="h-96 w-full rounded-xl bg-blue-500/10" />
        <Skeleton className="h-64 w-full rounded-xl bg-blue-500/10" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-xl p-6 border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-indigo-500/5 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-sky-500/5 to-indigo-500/5 animate-pulse-slow"></div>
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text mb-2 relative z-10">
          Coming Soon: Coin Mining
        </h1>
        <p className="text-muted-foreground relative z-10">
          Mine META coins and earn passive rewards through our advanced mining
          pools
        </p>
      </div>
    </div>
  );
};

export default CoinMining;
