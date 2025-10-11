import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, User } from "lucide-react";

const SlotsDetail = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const matrixType = type === "global" ? "Future Global" : "Future Matrix";
  const totalSlots = 12;
  const activeSlots = type === "global" ? 1 : 1;

  // Generate circular diagram segments
  const renderCircularDiagram = () => {
    const segments = [];
    const colors = [
      "bg-green-500",
      "bg-emerald-500",
      "bg-teal-500",
      "bg-green-400",
      "bg-muted",
    ];

    for (let i = 0; i < 12; i++) {
      const isActive = i < activeSlots;
      const colorClass = isActive ? colors[i % colors.length] : "bg-muted";
      segments.push(
        <div
          key={i}
          className={`absolute w-full h-full ${colorClass}`}
          style={{
            clipPath: `polygon(50% 50%, ${
              50 + 50 * Math.cos(((i * 30 - 90) * Math.PI) / 180)
            }% ${50 + 50 * Math.sin(((i * 30 - 90) * Math.PI) / 180)}%, ${
              50 + 50 * Math.cos((((i + 1) * 30 - 90) * Math.PI) / 180)
            }% ${50 + 50 * Math.sin((((i + 1) * 30 - 90) * Math.PI) / 180)}%)`,
            opacity: isActive ? 1 : 0.3,
          }}
        />
      );
    }
    return segments;
  };

  const renderSlotGrid = () => {
    const slots = [];
    for (let i = 1; i <= totalSlots; i++) {
      const isActive = i <= activeSlots;
      const userName = isActive ? `User_${i}` : "Empty";
      const status = isActive ? "Active" : "Inactive";
      const amount = isActive ? Math.floor(Math.random() * 100000) : 0;

      slots.push(
        <div
          key={i}
          className={`glass-card rounded-xl p-6 border-2 transition-all duration-500
                     ${
                       isActive
                         ? "border-green-500/60 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-background hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                         : "border-muted/30 bg-background/50 opacity-60"
                     }
                     hover:scale-105`}
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className={`text-sm font-bold ${
                isActive ? "text-green-500" : "text-muted-foreground"
              }`}
            >
              Slot {i}
            </div>

            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center
                           ${
                             isActive
                               ? "bg-gradient-to-br from-green-500/30 via-emerald-500/20 to-teal-500/30"
                               : "bg-muted/20"
                           }`}
            >
              <User
                className={`w-10 h-10 ${
                  isActive ? "text-green-500" : "text-muted-foreground"
                }`}
              />
            </div>

            <div className="text-center w-full">
              <div
                className={`text-sm font-medium ${
                  isActive ? "text-green-500" : "text-muted-foreground"
                }`}
              >
                {userName}
              </div>
              {isActive && (
                <div className="text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-xs mt-1 font-semibold">
                  {amount.toLocaleString()}
                </div>
              )}
            </div>

            <div
              className={`text-xs px-3 py-1 rounded-full
                           ${
                             isActive
                               ? "bg-green-500/20 text-green-500 border border-green-500/40"
                               : "bg-muted/20 text-muted-foreground border border-muted/30"
                           }`}
            >
              {status}
            </div>
          </div>
        </div>
      );
    }
    return slots;
  };

  if (loading) {
    return (
      <div className="space-y-8 p-6">
        <Skeleton className="h-16 w-full rounded-xl bg-green-500/10" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Skeleton className="h-64 w-full rounded-xl bg-green-500/10" />
          <div className="lg:col-span-3">
            <div className="grid grid-cols-3 gap-4">
              {[...Array(12)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-48 w-full rounded-xl bg-green-500/10"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div
        className="glass-card rounded-2xl p-6 border-2 border-green-500/40 
                      bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-teal-500/5 shadow-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/slots")}
              className="border-green-500/40 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500/60 transition-all duration-500"
            >
              <ArrowLeft className="w-5 h-5 text-green-500" />
            </Button>
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text">
              {matrixType} - Detailed View
            </h1>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total Slots</div>
            <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
              {activeSlots}/{totalSlots}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side - Circular Matrix */}
        <div
          className="glass-card rounded-2xl p-8 border-2 border-green-500/40
                       bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/5
                       shadow-[0_10px_40px_rgba(34,197,94,0.3)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>
          <h3 className="text-xl font-bold text-center mb-6 text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text relative z-10">
            Slot 1
          </h3>

          <div className="relative w-48 h-48 mx-auto mb-6  z-10">
            {/* Circular diagram */}
            <div className="relative w-full h-full rounded-full overflow-hidden">
              {renderCircularDiagram()}

              {/* Center circle */}
              <div
                className="absolute inset-[35%] bg-background rounded-full border-4 border-green-500/60 
                            flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.5)]"
              >
                <User className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm relative z-10">
            <div className="flex justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <span className="text-muted-foreground">Active:</span>
              <span className="font-bold text-green-500">{activeSlots}</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <span className="text-muted-foreground">Remaining:</span>
              <span className="font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
                {totalSlots - activeSlots}
              </span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <span className="text-muted-foreground">Total Income:</span>
              <span className="font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
                262986 USDT
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Slots Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderSlotGrid()}
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div
        className="glass-card rounded-2xl p-6 border-2 border-green-500/40
                     bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-teal-500/5 shadow-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text mb-2">
              {type === "global" ? "4" : "21"} USDT
            </div>
            <div className="text-sm text-muted-foreground">Total Earned</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text mb-2">
              {activeSlots}
            </div>
            <div className="text-sm text-muted-foreground">Active Partners</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text mb-2">
              {totalSlots - activeSlots}
            </div>
            <div className="text-sm text-muted-foreground">Available Slots</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotsDetail;
