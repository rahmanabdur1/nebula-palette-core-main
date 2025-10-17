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
        <Skeleton className="h-32 w-full rounded-xl bg-blue-500/10" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="h-48 w-full rounded-xl bg-blue-500/10"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-xl p-6 border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-indigo-500/5 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-sky-500/5 to-indigo-500/5 animate-pulse-slow"></div>
        <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text mb-4 relative z-10">
          Future Updates
        </h1>
        <p className="text-muted-foreground relative z-10">
          Exciting new features and improvements coming soon to META PRO SPACE.
        </p>
      </div>

      {/* Upcoming Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Advanced Trading */}
        <div className="glass-card rounded-xl p-6 border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-indigo-500/5 shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h3 className="text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-xl font-bold mb-4 relative z-10">
            🚀 Advanced Trading
          </h3>
          <p className="text-muted-foreground mb-4 relative z-10">
            AI-powered trading algorithms and advanced market analysis tools.
          </p>
          <div className="text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text font-semibold relative z-10">
            Coming Q2 2024
          </div>
        </div>

        {/* NFT Marketplace */}
        <div className="glass-card rounded-xl p-6 border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-indigo-500/5 shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h3 className="text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-xl font-bold mb-4 relative z-10">
            🎮 NFT Marketplace
          </h3>
          <p className="text-muted-foreground mb-4 relative z-10">
            Trade and mint exclusive gaming NFTs with enhanced utilities.
          </p>
          <div className="text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text font-semibold relative z-10">
            Coming Q3 2024
          </div>
        </div>

        {/* Lightning Network */}
        <div className="glass-card rounded-xl p-6 border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-indigo-500/5 shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h3 className="text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-xl font-bold mb-4 relative z-10">
            ⚡ Lightning Network
          </h3>
          <p className="text-muted-foreground mb-4 relative z-10">
            Instant transactions with near-zero fees using Lightning Network.
          </p>
          <div className="text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text font-semibold relative z-10">
            Coming Q4 2024
          </div>
        </div>

        {/* Multi-Chain Support */}
        <div className="glass-card rounded-xl p-6 border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-indigo-500/5 shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h3 className="text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-xl font-bold mb-4 relative z-10">
            🌐 Multi-Chain Support
          </h3>
          <p className="text-muted-foreground mb-4 relative z-10">
            Expand to Ethereum, Polygon, and other major blockchain networks.
          </p>
          <div className="text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text font-semibold relative z-10">
            Coming 2025
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureUpdate;
