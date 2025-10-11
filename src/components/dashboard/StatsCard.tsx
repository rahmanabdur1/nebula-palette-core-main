import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  trend?: "up" | "down";
  trendValue?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  trend,
  trendValue,
  className,
}: StatsCardProps) {
  return (
    <div
      className={`glass-card rounded-xl   p-4 sm:p-4 md:p-6 lg:p-8 border-2 border-primary/30 bg-gradient-to-br from-accent/5 to-primary/5 shadow-lg hover:shadow-primary/20 transition-all duration-300 ${className}`}
    >
      <div className="space-y-2 sm:space-y-3 md:space-y-3">
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-2xl font-bold text-foreground">{value}</div>

        {trend && trendValue && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm">
              {trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span
                className={trend === "up" ? "text-success" : "text-destructive"}
              >
                {trendValue}
              </span>
            </div>

            {/* Progress bar */}
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-primary rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
