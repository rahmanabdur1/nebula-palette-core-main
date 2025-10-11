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
              ? "bg-gradient-to-br from-success/90 via-primary/80 to-warning/90 shadow-[0_0_25px_rgba(34,197,94,0.6),0_0_40px_rgba(59,130,246,0.4)] scale-110 animate-pulse-glow"
              : "border-2 border-primary/50 text-primary bg-background/20 hover:border-primary hover:text-primary hover:scale-105"
          }`}
        >
          {isActive ? (
            <>
              <span className="bg-gradient-to-r from-warning via-success to-primary bg-clip-text text-transparent font-black text-xl">
                {i}
              </span>
              <span className="text-success text-[10px] font-bold mt-0.5">
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
        <Skeleton className="h-28 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card rounded-xl p-6 border-2 border-primary/40">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Dividend Program
        </h1>
        <p className="text-muted-foreground">
          Earn passive income through our dividend distribution system
        </p>
      </div>

      {/* Free Income Slots Section */}
      <div className="glass-card rounded-2xl p-6 border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-background to-background">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Free Income Slots
        </h2>
        <p className="text-success text-sm mb-6">
          Future / Global Dividend Distribution
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Future Dividend Slots */}
          <div
            className="glass-card rounded-2xl p-8 border-2 border-primary/40
                          shadow-[0_10px_40px_rgba(59,130,246,0.4)]
                          hover:shadow-[0_15px_50px_rgba(59,130,246,0.6)]
                          hover:scale-[1.02] transition-all duration-300
                          bg-gradient-to-br from-primary/20 via-background to-background
                          relative overflow-hidden group"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
            />

            <div className="flex justify-between items-center mb-8 relative z-10">
              <h3
                className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary 
                             bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              >
                Future Dividend
              </h3>
              <div
                className="text-right p-4 rounded-lg bg-success/20 border border-success/40
                              shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                <div className="text-3xl font-bold text-success drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
                  150
                </div>
                <div className="text-success text-sm font-medium">USDT</div>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-4 mb-8 relative z-10">
              {renderSlotCircles(3)}
            </div>

            <div className="space-y-3 relative z-10">
              <Button
                className="w-full bg-gradient-to-r from-success via-success/90 to-success 
                                 hover:from-success/90 hover:via-success hover:to-success/90
                                 text-black font-bold py-4 text-lg
                                 shadow-[0_8px_20px_rgba(34,197,94,0.4)]
                                 hover:shadow-[0_8px_30px_rgba(34,197,94,0.6)]
                                 hover:scale-105 transition-all duration-300"
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
            className="glass-card rounded-2xl p-8 border-2 border-primary/40
                          shadow-[0_10px_40px_rgba(59,130,246,0.4)]
                          hover:shadow-[0_15px_50px_rgba(59,130,246,0.6)]
                          hover:scale-[1.02] transition-all duration-300
                          bg-gradient-to-br from-primary/20 via-background to-background
                          relative overflow-hidden group"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
            />

            <div className="flex justify-between items-center mb-8 relative z-10">
              <h3
                className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary 
                             bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              >
                Global Dividend
              </h3>
              <div
                className="text-right p-4 rounded-lg bg-success/20 border border-success/40
                              shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                <div className="text-3xl font-bold text-success drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
                  85
                </div>
                <div className="text-success text-sm font-medium">USDT</div>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-4 mb-8 relative z-10">
              {renderSlotCircles(2)}
            </div>

            <div className="space-y-3 relative z-10">
              <Button
                className="w-full bg-gradient-to-r from-success via-success/90 to-success 
                                 hover:from-success/90 hover:via-success hover:to-success/90
                                 text-black font-bold py-4 text-lg
                                 shadow-[0_8px_20px_rgba(34,197,94,0.4)]
                                 hover:shadow-[0_8px_30px_rgba(34,197,94,0.6)]
                                 hover:scale-105 transition-all duration-300"
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
