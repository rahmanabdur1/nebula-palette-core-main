import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const slotsData = [
  { id: 1, users: 37222 },
  { id: 2, users: 37222 },
  { id: 3, users: 29673 },
  { id: 4, users: 7401 },
  { id: 5, users: 5872 },
  { id: 6, users: 1039 },
  { id: 7, users: 698 },
  { id: 8, users: 148 },
  { id: 9, users: 72 },
  { id: 10, users: 21 },
  { id: 11, users: 16 },
  { id: 12, users: 16 },
];

const DividendSlots = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-40 w-full rounded-2xl bg-muted/30 mx-auto"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
      {slotsData.map((slot, index) => (
        <div
          key={slot.id}
          className={`relative rounded-2xl p-5 md:p-6 border border-[hsl(var(--border))]
            bg-gradient-to-br from-[hsl(var(--gradient-blue-start))]/10 via-[hsl(var(--gradient-blue-mid))]/10 to-[hsl(var(--gradient-blue-end))]/10
            shadow-lg hover:shadow-[0_0_30px_hsl(var(--glow-primary))] transition-all duration-500
            flex flex-col items-center justify-center space-y-4 text-center ${
              index === 0 ? "glow-effect animate-pulse-glow" : ""
            }`}
        >
          {/* Slot Header */}
          <div className="absolute top-3 left-3 text-[hsl(var(--primary))] text-xs md:text-sm font-semibold">
            Slot {slot.id}
          </div>
          <div className="absolute top-6 left-3 text-[hsl(var(--muted-foreground))] text-[10px] md:text-xs">
            Users: {slot.users}
          </div>

          {/* Logo */}
          <img
            src="/logo.png"
            alt="Slot Logo"
            className={`w-16 h-16 md:w-20 md:h-20 object-contain ${
              index === 0
                ? "animate-float drop-shadow-[0_0_20px_hsl(var(--glow-primary))]"
                : "opacity-80"
            } mt-6`}
          />

          {/* Show dollar and button only for first slot */}
          {index === 0 && (
            <>
              <span className="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] text-glow">
                $000
              </span>
              <Button
                className="gradient-primary text-white font-bold px-4 py-1.5 md:px-6 md:py-2 rounded-lg shadow-[0_0_25px_hsl(var(--glow-primary))]
                  hover:shadow-[0_0_40px_hsl(var(--glow-secondary))] hover:scale-105 transition-all duration-300"
              >
                Claim
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default DividendSlots;
