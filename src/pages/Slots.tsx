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
        <div className="flex justify-center gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-20 w-40 rounded-full bg-green-500/10"
            />
          ))}
        </div>
        <div className="flex justify-center gap-8">
          <Skeleton className="h-64 w-64 rounded-2xl bg-green-500/10" />
          <Skeleton className="h-64 w-64 rounded-2xl bg-green-500/10" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-96 w-full rounded-2xl bg-green-500/10" />
          <Skeleton className="h-96 w-full rounded-2xl bg-green-500/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Badges */}
      <div className="flex justify-center gap-6 flex-wrap">
        {/* SILVER - Active */}
        <Button
          className="relative px-10 py-6 text-xl rounded-full flex flex-col items-center overflow-hidden group
                     bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 
                     text-white font-bold border-2 border-green-500/60
                     shadow-[0_8px_30px_rgba(34,197,94,0.4)]
                     hover:shadow-[0_8px_40px_rgba(34,197,94,0.6)]
                     transform hover:scale-105 transition-all duration-500"
        >
          <span className="relative z-10">SILVER</span>
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
          />
        </Button>

        {/* GOLD */}
        <Button
          onClick={() => setModalType("gold")}
          className="relative px-10 py-6 text-xl rounded-full flex flex-col items-center
                     border-2 border-green-500/50 text-green-500/80 
                     bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm hover:bg-green-500/20
                     hover:border-green-500 hover:text-green-300
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
             border-2 border-green-500/50 text-green-500/80
             bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm
             hover:bg-green-500/20 hover:border-green-500 hover:text-green-300
             transition-all duration-500"
        >
          <span>DIAMOND</span>
          <span className="text-xs text-muted-foreground mt-1">
            Coming Soon
          </span>
        </Button>
      </div>

      {/* Team Stats + Cards */}
      <div className="flex justify-center gap-8 flex-wrap">
        {/* Direct Partner Card */}
        <div
          className="glass-card rounded-2xl p-8 border-2 border-green-500/40 min-w-[250px]
                        shadow-[0_8px_30px_rgba(34,197,94,0.3)]
                        hover:shadow-[0_8px_40px_rgba(34,197,94,0.5)]
                        hover:scale-105 transition-all duration-500
                        bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>
          <h3 className="text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-2xl font-bold mb-6 text-center relative z-10">
            Direct Partner
          </h3>
          <div className="grid grid-cols-2 gap-6 relative z-10">
            <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="text-muted-foreground text-sm mb-2 font-medium">
                Active
              </div>
              <div className="text-green-500 text-3xl font-bold">1</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="text-muted-foreground text-sm mb-2 font-medium">
                Inactive
              </div>
              <div className="text-green-500 text-3xl font-bold">4</div>
            </div>
          </div>
        </div>

        {/* Total Team Card */}
        <div
          className="glass-card rounded-2xl p-8 border-2 border-green-500/40 min-w-[250px]
                        shadow-[0_8px_30px_rgba(34,197,94,0.3)]
                        hover:shadow-[0_8px_40px_rgba(34,197,94,0.5)]
                        hover:scale-105 transition-all duration-500
                        bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>
          <h3 className="text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-2xl font-bold mb-6 text-center relative z-10">
            Total Team
          </h3>
          <div className="grid grid-cols-2 gap-6 relative z-10">
            <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="text-muted-foreground text-sm mb-2 font-medium">
                Active
              </div>
              <div className="text-green-500 text-3xl font-bold">6</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="text-muted-foreground text-sm mb-2 font-medium">
                Inactive
              </div>
              <div className="text-green-500 text-3xl font-bold">18</div>
            </div>
          </div>
        </div>
      </div>

      {/* Power Matrix and Power Global */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Future Matrix */}
        <div
          className="glass-card rounded-2xl p-8 border-2 border-green-500/40
                        shadow-[0_10px_40px_rgba(34,197,94,0.4)]
                        hover:scale-[1.02] transition-all duration-500
                        bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-teal-500/5 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
              Future Matrix
            </h2>
            <div className="text-right p-4 rounded-lg bg-green-500/20 border border-green-500/40">
              <div className="text-3xl font-bold text-green-500">21</div>
              <div className="text-green-500 text-sm font-medium">USDT</div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 mb-8 relative z-10">
            {renderSlotCircles(1)}
          </div>
          <Button
            onClick={() => navigate("/slots/details")}
            className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold py-4 text-lg transition-all duration-500 hover:scale-105"
          >
            More Detail
          </Button>
        </div>

        {/* Future Global */}
        <div
          className="glass-card rounded-2xl p-8 border-2 border-green-500/40
                        shadow-[0_10px_40px_rgba(34,197,94,0.4)]
                        hover:scale-[1.02] transition-all duration-500
                        bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-teal-500/5 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
              Future Global
            </h2>
            <div className="text-right p-4 rounded-lg bg-green-500/20 border border-green-500/40">
              <div className="text-3xl font-bold text-green-500">4</div>
              <div className="text-green-500 text-sm font-medium">USDT</div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 mb-8 relative z-10">
            {renderSlotCircles(1)}
          </div>
          <Button
            onClick={() => navigate("/slots/details")}
            className="w-full bg-gradient-to-r cursor-pointer from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold py-4 text-lg transition-all duration-500 hover:scale-105"
          >
            More Detail
          </Button>
        </div>
      </div>

      {/* Coming Soon Dialog */}
      <Dialog open={!!modalType} onOpenChange={() => setModalType(null)}>
        <DialogContent className="sm:max-w-md text-center border-2 border-green-500/40 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/5">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
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
              className="mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:scale-105 transition-transform duration-500"
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
