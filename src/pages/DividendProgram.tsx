import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const DividendProgram = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const renderSlotCircles = (activeCount: number) => {
    const circles = [];
    for (let i = 1; i <= 12; i++) {
      const isActive = i <= activeCount;
      circles.push(
        <div
          key={i}
          className={`w-16 h-16 rounded-full flex flex-col items-center justify-center text-lg font-bold transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-br from-green-500/90 via-emerald-500/80 to-teal-500/90 shadow-[0_0_25px_rgba(34,197,94,0.6),0_0_40px_rgba(16,185,129,0.4)] scale-110 animate-pulse-glow"
              : "border-2 border-green-500/50 text-green-500 bg-background/20 hover:border-green-500 hover:text-green-500 hover:scale-105"
          }`}
        >
          {isActive ? (
            <>
              <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent font-black text-xl">
                {i}
              </span>
              <span className="text-green-500 text-[10px] font-bold mt-0.5">
                Active
              </span>
            </>
          ) : (
            i
          )}
        </div>
      );
    }
    return circles;
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-28 w-full rounded-xl bg-green-500/10" />
        <Skeleton className="h-96 w-full rounded-2xl bg-green-500/10" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card rounded-xl p-6 border-2 border-green-500/40 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/5 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text mb-2 relative z-10">
          Dividend Program
        </h1>
        <p className="text-muted-foreground relative z-10">
          Earn passive income through our dividend distribution system
        </p>
      </div>

      {/* Free Income Slots Section */}
      <div className="glass-card rounded-2xl p-6 border-2 border-green-500/40 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/5 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>
        <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text mb-2 relative z-10">
          Free Income Slots
        </h2>
        <p className="text-green-500 text-sm mb-6 relative z-10">
          Future / Global Dividend Distribution
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* Future Dividend Slots */}
          <div
            className="glass-card rounded-2xl p-8 border-2 border-green-500/40
                          shadow-[0_10px_40px_rgba(34,197,94,0.4)]
                          hover:shadow-[0_15px_50px_rgba(34,197,94,0.6)]
                          hover:scale-[1.02] transition-all duration-500
                          bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-teal-500/5
                          relative overflow-hidden group"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
            />

            <div className="flex justify-between items-center mb-8 relative z-10">
              <h3
                className="text-2xl font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 
                             bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
              >
                Future Dividend
              </h3>
              <div
                className="text-right p-4 rounded-lg bg-green-500/20 border border-green-500/40
                              shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                <div className="text-3xl font-bold text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
                  150
                </div>
                <div className="text-green-500 text-sm font-medium">USDT</div>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-4 mb-8 relative z-10">
              {renderSlotCircles(3)}
            </div>

            <div className="space-y-3 relative z-10">
              <Button
                className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 
                                 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600
                                 text-white font-bold py-4 text-lg
                                 shadow-[0_8px_20px_rgba(34,197,94,0.4)]
                                 hover:shadow-[0_8px_30px_rgba(34,197,94,0.6)]
                                 hover:scale-105 transition-all duration-500"
              >
                Claim Dividend
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                ⓘ BNB gas fee will be auto-deducted during claim
              </p>
            </div>
          </div>

          {/* Global Dividend Slots */}
          <div
            className="glass-card rounded-2xl p-8 border-2 border-green-500/40
                          shadow-[0_10px_40px_rgba(34,197,94,0.4)]
                          hover:shadow-[0_15px_50px_rgba(34,197,94,0.6)]
                          hover:scale-[1.02] transition-all duration-500
                          bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-teal-500/5
                          relative overflow-hidden group"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
            />

            <div className="flex justify-between items-center mb-8 relative z-10">
              <h3
                className="text-2xl font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 
                             bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
              >
                Global Dividend
              </h3>
              <div
                className="text-right p-4 rounded-lg bg-green-500/20 border border-green-500/40
                              shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                <div className="text-3xl font-bold text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
                  85
                </div>
                <div className="text-green-500 text-sm font-medium">USDT</div>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-4 mb-8 relative z-10">
              {renderSlotCircles(2)}
            </div>

            <div className="space-y-3 relative z-10">
              <Button
                className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 
                                 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600
                                 text-white font-bold py-4 text-lg
                                 shadow-[0_8px_20px_rgba(34,197,94,0.4)]
                                 hover:shadow-[0_8px_30px_rgba(34,197,94,0.6)]
                                 hover:scale-105 transition-all duration-500"
              >
                Claim Dividend
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                ⓘ BNB gas fee will be auto-deducted during claim
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DividendProgram;
