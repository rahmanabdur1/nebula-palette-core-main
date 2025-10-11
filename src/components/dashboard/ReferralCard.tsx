import { Button } from "@/components/ui/button";
import { Copy, Gift } from "lucide-react";

export function ReferralCard() {
  return (
    <div
      className="glass-card rounded-xl border-2 border-success/30 bg-gradient-to-br from-success/10 via-primary/5 to-accent/10 shadow-xl relative overflow-hidden 
                 p-4 sm:p-6 md:p-8 lg:p-10 w-full"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
          {/* Icon */}
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-gradient-primary flex-shrink-0">
            <Gift className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
          </div>

          {/* Text Section */}
          <div className="text-center sm:text-left">
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
              REFER A FRIEND
            </p>

            {/* Added Link (foresagi.io/) */}
            <p className="text-xs sm:text-sm md:text-base font-mono text-primary hover:text-primary/80 transition-colors cursor-pointer">
              foresagi.io/
            </p>

            <p className="text-[10px] sm:text-xs md:text-sm text-warning font-semibold">
              Link copied 100%
            </p>
          </div>
        </div>

        {/* Copy Button */}
        <div className="flex justify-center sm:justify-end">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-success/50 hover:bg-success/20 hover:border-success transition-all"
          >
            <Copy className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-success" />
          </Button>
        </div>
      </div>

      {/* Decorative floating bars */}
      <div className="absolute top-2 right-2 opacity-20">
        <div className="flex gap-1 sm:gap-2 md:gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-6 w-2 sm:h-8 sm:w-3 md:h-10 md:w-4 rounded-full animate-float"
              style={{
                background: `linear-gradient(45deg, hsl(var(--success)), hsl(var(--primary)))`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
