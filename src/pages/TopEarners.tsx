import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TopEarners = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full rounded-lg" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-lg p-6 border-2 border-primary/40">
        <h1 className="text-2xl font-bold text-foreground mb-4">Top Earners</h1>
        <p className="text-muted-foreground">View the highest earning members in the platform.</p>
      </div>
    </div>
  );
};

export default TopEarners;