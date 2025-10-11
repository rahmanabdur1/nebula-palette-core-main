import { Button } from "@/components/ui/button";
import { Copy, Gift } from "lucide-react";

export function ReferralCard() {
  return (
    <div className="glass-card rounded-xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 shadow-xl relative overflow-hidden p-3 sm:p-5 md:p-6 lg:p-8 w-full">
      <div className="flex  sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 md:gap-5">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Icon */}
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex-shrink-0">
            <Gift className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
          </div>

          {/* Text Section */}
          <div className="text-center sm:text-left">
            <p className="text-xs sm:text-xs md:text-sm text-muted-foreground">
              REFER A FRIEND
            </p>
            {/* Added Link (foresagi.io/) */}
            <p className="text-xs sm:text-sm md:text-base font-mono text-green-500 hover:text-green-400 transition-colors cursor-pointer">
              foresagi.io/
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm text-green-400 font-semibold">
              Link copied 100%
            </p>
          </div>
        </div>

        {/* Copy Button */}
        <div className="flex justify-center sm:justify-end mt-2 sm:mt-0">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 border-green-500/50 hover:bg-green-500/20 hover:border-green-500 transition-all"
          >
            <Copy className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-500" />
          </Button>
        </div>
      </div>

      {/* Decorative floating bars */}
      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-20">
        <div className="flex gap-1 sm:gap-1 md:gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-1 sm:h-6 sm:w-2 md:h-8 md:w-3 rounded-full animate-float"
              style={{
                background: `linear-gradient(45deg, hsl(142, 76%, 36%), hsl(142, 70%, 45%))`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
