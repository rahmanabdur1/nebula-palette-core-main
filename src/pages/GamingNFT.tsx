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
        <Skeleton className="h-32 w-full rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-lg p-6 border-2 border-primary/40">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Coming Soon: Gaming NFT
        </h1>
        <p className="text-muted-foreground">
          Explore and trade gaming NFTs in our marketplace.
        </p>
      </div>
    </div>
  );
};

export default GamingNFT;
