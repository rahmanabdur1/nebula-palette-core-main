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
      "bg-success",
      "bg-warning", 
      "bg-primary",
      "bg-purple-500",
      "bg-muted"
    ];
    
    for (let i = 0; i < 12; i++) {
      const isActive = i < activeSlots;
      const colorClass = isActive ? colors[i % colors.length] : "bg-muted";
      segments.push(
        <div
          key={i}
          className={`absolute w-full h-full ${colorClass}`}
          style={{
            clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((i * 30 - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((i * 30 - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos(((i + 1) * 30 - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin(((i + 1) * 30 - 90) * Math.PI / 180)}%)`,
            opacity: isActive ? 1 : 0.3
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
          className={`glass-card rounded-xl p-6 border-2 transition-all duration-300
                     ${isActive 
                       ? "border-success/60 bg-gradient-to-br from-success/20 to-background hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]" 
                       : "border-muted/30 bg-background/50 opacity-60"
                     }
                     hover:scale-105`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className={`text-sm font-bold ${isActive ? "text-success" : "text-muted-foreground"}`}>
              Slot {i}
            </div>
            
            <div className={`w-20 h-20 rounded-full flex items-center justify-center
                           ${isActive 
                             ? "bg-gradient-to-br from-success/30 to-primary/30" 
                             : "bg-muted/20"
                           }`}>
              <User className={`w-10 h-10 ${isActive ? "text-success" : "text-muted-foreground"}`} />
            </div>

            <div className="text-center w-full">
              <div className={`text-sm font-medium ${isActive ? "text-success" : "text-muted-foreground"}`}>
                {userName}
              </div>
              {isActive && (
                <div className="text-xs text-warning mt-1">
                  {amount.toLocaleString()}
                </div>
              )}
            </div>
            
            <div className={`text-xs px-3 py-1 rounded-full
                           ${isActive 
                             ? "bg-success/20 text-success border border-success/40" 
                             : "bg-muted/20 text-muted-foreground border border-muted/30"
                           }`}>
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
        <Skeleton className="h-16 w-full rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Skeleton className="h-64 w-full rounded-xl" />
          <div className="lg:col-span-3">
            <div className="grid grid-cols-3 gap-4">
              {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
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
      <div className="glass-card rounded-2xl p-6 border-2 border-primary/40 
                      bg-gradient-to-r from-primary/20 via-background to-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/slots")}
              className="border-primary/40 hover:bg-primary/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-success to-warning 
                         bg-clip-text text-transparent">
              {matrixType} - Detailed View
            </h1>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total Slots</div>
            <div className="text-2xl font-bold text-primary">{activeSlots}/{totalSlots}</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side - Circular Matrix */}
        <div className="glass-card rounded-2xl p-8 border-2 border-primary/40
                       bg-gradient-to-br from-primary/20 via-background to-background
                       shadow-[0_10px_40px_rgba(59,130,246,0.3)]">
          <h3 className="text-xl font-bold text-center mb-6 text-primary">
            Slot 1
          </h3>
          
          <div className="relative w-48 h-48 mx-auto mb-6">
            {/* Circular diagram */}
            <div className="relative w-full h-full rounded-full overflow-hidden">
              {renderCircularDiagram()}
              
              {/* Center circle */}
              <div className="absolute inset-[35%] bg-background rounded-full border-4 border-primary/60 
                            flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                <User className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-3 rounded-lg bg-success/10 border border-success/30">
              <span className="text-muted-foreground">Active:</span>
              <span className="font-bold text-success">{activeSlots}</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-muted/10 border border-muted/30">
              <span className="text-muted-foreground">Remaining:</span>
              <span className="font-bold text-warning">{totalSlots - activeSlots}</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
              <span className="text-muted-foreground">Total Income:</span>
              <span className="font-bold text-primary">262986 USDT</span>
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
      <div className="glass-card rounded-2xl p-6 border-2 border-primary/40
                     bg-gradient-to-r from-primary/10 via-background to-background">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-lg bg-success/10 border border-success/30">
            <div className="text-3xl font-bold text-success mb-2">
              {type === "global" ? "4" : "21"} USDT
            </div>
            <div className="text-sm text-muted-foreground">Total Earned</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-warning/10 border border-warning/30">
            <div className="text-3xl font-bold text-warning mb-2">{activeSlots}</div>
            <div className="text-sm text-muted-foreground">Active Partners</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/30">
            <div className="text-3xl font-bold text-primary mb-2">{totalSlots - activeSlots}</div>
            <div className="text-sm text-muted-foreground">Available Slots</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotsDetail;
