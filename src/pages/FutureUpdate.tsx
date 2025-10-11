import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FutureUpdate = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-lg p-6 border-2 border-primary/40">
        <h1 className="text-2xl font-bold text-foreground mb-4">Future Updates</h1>
        <p className="text-muted-foreground">Exciting new features and improvements coming soon to META PRO SPACE.</p>
      </div>

      {/* Upcoming Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6 border-2 border-primary/40">
          <h3 className="text-success text-xl font-bold mb-4">🚀 Advanced Trading</h3>
          <p className="text-muted-foreground mb-4">AI-powered trading algorithms and advanced market analysis tools.</p>
          <div className="text-success font-semibold">Coming Q2 2024</div>
        </div>
        
        <div className="glass-card rounded-xl p-6 border-2 border-primary/40">
          <h3 className="text-primary text-xl font-bold mb-4">🎮 NFT Marketplace</h3>
          <p className="text-muted-foreground mb-4">Trade and mint exclusive gaming NFTs with enhanced utilities.</p>
          <div className="text-primary font-semibold">Coming Q3 2024</div>
        </div>
        
        <div className="glass-card rounded-xl p-6 border-2 border-primary/40">
          <h3 className="text-warning text-xl font-bold mb-4">⚡ Lightning Network</h3>
          <p className="text-muted-foreground mb-4">Instant transactions with near-zero fees using Lightning Network.</p>
          <div className="text-warning font-semibold">Coming Q4 2024</div>
        </div>
        
        <div className="glass-card rounded-xl p-6 border-2 border-primary/40">
          <h3 className="text-accent text-xl font-bold mb-4">🌐 Multi-Chain Support</h3>
          <p className="text-muted-foreground mb-4">Expand to Ethereum, Polygon, and other major blockchain networks.</p>
          <div className="text-accent font-semibold">Coming 2025</div>
        </div>
      </div>
    </div>
  );
};

export default FutureUpdate;