import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const GamingNFT = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full rounded-xl bg-blue-500/10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-64 w-full rounded-xl bg-blue-500/10"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-6 border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-indigo-500/5 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-sky-500/5 to-indigo-500/5 animate-pulse-slow"></div>
        <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text mb-4 relative z-10">
          Coming Soon: Gaming NFT
        </h1>
        <p className="text-muted-foreground relative z-10">
          Explore and trade gaming NFTs in our marketplace.
        </p>
      </div>
    </div>
  );
};

export default GamingNFT;
