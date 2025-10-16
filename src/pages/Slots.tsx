import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Slots = () => {
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState<"gold" | "diamond" | null>(null);

  const navigate = useNavigate();
  const navigateToDetail = (type: "matrix" | "global") => {
    navigate(`/slots/${type}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
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
              ? "bg-gradient-to-br from-blue-500/90 via-sky-500/80 to-cyan-500/90 shadow-[0_0_25px_rgba(59,130,246,0.6),0_0_40px_rgba(14,165,233,0.4)] scale-110 animate-pulse-glow"
              : "border-2 border-blue-500/50 text-blue-500 bg-background/20 hover:border-blue-500 hover:text-blue-500 hover:scale-105"
          }`}
        >
          {isActive ? (
            <>
              <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-transparent font-black text-xl">
                {i}
              </span>
              <span className="text-blue-500 text-[10px] font-bold mt-0.5">
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
        <div className="flex justify-center gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-20 w-40 rounded-full bg-blue-500/10"
            />
          ))}
        </div>
        <div className="flex justify-center gap-8">
          <Skeleton className="h-64 w-64 rounded-2xl bg-blue-500/10" />
          <Skeleton className="h-64 w-64 rounded-2xl bg-blue-500/10" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-96 w-full rounded-2xl bg-blue-500/10" />
          <Skeleton className="h-96 w-full rounded-2xl bg-blue-500/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Badges */}
      <div className="flex justify-center gap-6 flex-wrap">
        {/* SILVER */}
        <Button
          className="relative px-10 py-6 text-xl rounded-full flex flex-col items-center overflow-hidden group
                     bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 
                     text-white font-bold border-2 border-blue-500/60
                     shadow-[0_8px_30px_rgba(59,130,246,0.4)]
                     hover:shadow-[0_8px_40px_rgba(59,130,246,0.6)]
                     transform hover:scale-105 transition-all duration-500"
        >
          <span className="relative z-10">SILVER</span>
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"
          />
        </Button>

        {/* GOLD */}
        <Button
          onClick={() => setModalType("gold")}
          className="relative px-10 py-6 text-xl rounded-full flex flex-col items-center
                     border-2 border-blue-500/50 text-blue-500/80 
                     bg-gradient-to-r from-blue-500/10 to-sky-500/10 backdrop-blur-sm hover:bg-blue-500/20
                     hover:border-blue-500 hover:text-blue-300
                     transition-all duration-500"
        >
          <span>GOLD</span>
          <span className="text-xs text-muted-foreground mt-1">
            Coming Soon
          </span>
        </Button>

        {/* DIAMOND */}
        <Button
          onClick={() => setModalType("diamond")}
          className="relative px-10 py-6 text-xl rounded-full flex flex-col items-center
             border-2 border-blue-500/50 text-blue-500/80
             bg-gradient-to-r from-blue-500/10 to-sky-500/10 backdrop-blur-sm
             hover:bg-blue-500/20 hover:border-blue-500 hover:text-blue-300
             transition-all duration-500"
        >
          <span>DIAMOND</span>
          <span className="text-xs text-muted-foreground mt-1">
            Coming Soon
          </span>
        </Button>
      </div>

      {/* Team Stats Cards */}
      <div className="flex justify-center gap-8 flex-wrap">
        {/* Direct Partner */}
        <div
          className="glass-card rounded-2xl p-8 border-2 border-blue-500/40 min-w-[250px]
                        shadow-[0_8px_30px_rgba(59,130,246,0.3)]
                        hover:shadow-[0_8px_40px_rgba(59,130,246,0.5)]
                        hover:scale-105 transition-all duration-500
                        bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-cyan-500/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-sky-500/5 to-cyan-500/5 animate-pulse-slow pointer-events-none"></div>
          <h3 className="text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-2xl font-bold mb-6 text-center relative z-10">
            Direct Partner
          </h3>
          <div className="grid grid-cols-2 gap-6 relative z-10">
            <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="text-muted-foreground text-sm mb-2 font-medium">
                Active
              </div>
              <div className="text-blue-500 text-3xl font-bold">1</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="text-muted-foreground text-sm mb-2 font-medium">
                Inactive
              </div>
              <div className="text-blue-500 text-3xl font-bold">4</div>
            </div>
          </div>
        </div>

        {/* Total Team */}
        <div
          className="glass-card rounded-2xl p-8 border-2 border-blue-500/40 min-w-[250px]
                        shadow-[0_8px_30px_rgba(59,130,246,0.3)]
                        hover:shadow-[0_8px_40px_rgba(59,130,246,0.5)]
                        hover:scale-105 transition-all duration-500
                        bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-cyan-500/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-sky-500/5 to-cyan-500/5 animate-pulse-slow pointer-events-none"></div>
          <h3 className="text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-2xl font-bold mb-6 text-center relative z-10">
            Total Team
          </h3>
          <div className="grid grid-cols-2 gap-6 relative z-10">
            <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="text-muted-foreground text-sm mb-2 font-medium">
                Active
              </div>
              <div className="text-blue-500 text-3xl font-bold">6</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="text-muted-foreground text-sm mb-2 font-medium">
                Inactive
              </div>
              <div className="text-blue-500 text-3xl font-bold">18</div>
            </div>
          </div>
        </div>
      </div>

      {/* Future Matrix & Global */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Future Matrix */}
        <div className="glass-card rounded-2xl p-8 border-2 border-blue-500/40 shadow-[0_10px_40px_rgba(59,130,246,0.4)] hover:scale-[1.02] transition-all duration-500 bg-gradient-to-br from-blue-500/15 via-sky-500/10 to-cyan-500/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-sky-500/5 to-cyan-500/5 animate-pulse-slow pointer-events-none"></div>
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text">
              Future Matrix
            </h2>
            <div className="text-right p-4 rounded-lg bg-blue-500/20 border border-blue-500/40">
              <div className="text-3xl font-bold text-blue-500">21</div>
              <div className="text-blue-500 text-sm font-medium">USDT</div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 mb-8 relative z-10">
            {renderSlotCircles(1)}
          </div>
          <Button
            onClick={() => navigateToDetail("matrix")}
            className="w-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 hover:from-blue-600 hover:via-sky-600 hover:to-cyan-600 text-white font-bold py-4 text-lg transition-all duration-500 hover:scale-105"
          >
            More Detail
          </Button>
        </div>

        {/* Future Global */}
        <div className="glass-card rounded-2xl p-8 border-2 border-blue-500/40 shadow-[0_10px_40px_rgba(59,130,246,0.4)] hover:scale-[1.02] transition-all duration-500 bg-gradient-to-br from-blue-500/15 via-sky-500/10 to-cyan-500/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-sky-500/5 to-cyan-500/5 animate-pulse-slow pointer-events-none"></div>
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text">
              Future Global
            </h2>
            <div className="text-right p-4 rounded-lg bg-blue-500/20 border border-blue-500/40">
              <div className="text-3xl font-bold text-blue-500">4</div>
              <div className="text-blue-500 text-sm font-medium">USDT</div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 mb-8 relative z-10">
            {renderSlotCircles(1)}
          </div>
          <Button
            onClick={() => navigateToDetail("global")}
            className="w-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 hover:from-blue-600 hover:via-sky-600 hover:to-cyan-600 text-white font-bold py-4 text-lg transition-all duration-500 hover:scale-105"
          >
            More Detail
          </Button>
        </div>
      </div>

      {/* Coming Soon Dialog */}
      <Dialog open={!!modalType} onOpenChange={() => setModalType(null)}>
        <DialogContent className="sm:max-w-md text-center border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-cyan-500/5">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text">
              {modalType === "gold" ? "Gold Slots" : "Diamond Slots"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              {modalType === "gold"
                ? "Gold Slots are coming soon! Stay tuned for exclusive rewards and higher bonuses."
                : "Diamond Slots will be available soon! The ultimate tier for premium members."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setModalType(null)}
              className="mt-4 bg-gradient-to-r from-blue-500 to-sky-500 text-white font-semibold hover:scale-105 transition-transform duration-500"
            >
              Got it!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Slots;
