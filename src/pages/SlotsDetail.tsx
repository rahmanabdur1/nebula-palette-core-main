import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const slotsData = [
  { id: 1, users: 289985, price: 5 },
  { id: 2, users: 37222, price: 6, active: true },
  { id: 3, users: 29673, price: 16 },
  { id: 4, users: 7401, price: 35 },
  { id: 5, users: 5872, price: 99 },
  { id: 6, users: 1039, price: 198 },
  { id: 7, users: 698, price: 400 },
  { id: 8, users: 148, price: 850 },
  { id: 9, users: 72, price: 1700 },
  { id: 10, users: 21, price: 3100 },
  { id: 11, users: 16, price: 6200 },
  { id: 12, users: 16, price: 10800 },
];

const SlotsDetail = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderCircularDiagram = () => {
    const totalSegments = 12;
    const activeSegments = 8;
    const colors = ["#00FF7F", "#8A2BE2", "#FFD700"];
    const segments = [];

    for (let i = 0; i < totalSegments; i++) {
      const isActive = i < activeSegments;
      const color = isActive ? colors[i % colors.length] : "#333";
      segments.push(
        <div
          key={i}
          className="absolute w-full h-full"
          style={{
            clipPath: `polygon(50% 50%, ${
              50 + 50 * Math.cos(((i * 30 - 90) * Math.PI) / 180)
            }% ${50 + 50 * Math.sin(((i * 30 - 90) * Math.PI) / 180)}%, ${
              50 + 50 * Math.cos((((i + 1) * 30 - 90) * Math.PI) / 180)
            }% ${50 + 50 * Math.sin((((i + 1) * 30 - 90) * Math.PI) / 180)}%)`,
            backgroundColor: color,
            opacity: isActive ? 0.9 : 0.15,
          }}
        />
      );
    }
    return segments;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
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

          {/* Top-right price for all except slot 1 */}
          {index !== 0 && (
            <div className="absolute top-3 right-3 text-[hsl(var(--foreground))] font-bold text-sm md:text-base">
              ${slot.price}
            </div>
          )}

          {/* Users count */}
          <div
            className={`absolute top-6 left-3 font-semibold text-[10px] md:text-xs ${
              index === 0
                ? "text-purple-500"
                : "text-[hsl(var(--muted-foreground))]"
            }`}
          >
            Users: {slot.users}
          </div>

          {/* Slot 1 circular diagram */}
          {index === 0 ? (
            <div className="relative w-36 h-36 mb-2">
              {renderCircularDiagram()}
            </div>
          ) : (
            <img
              src="/logo.png"
              alt="Slot Logo"
              className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-80 mt-6"
            />
          )}

          {/* Price display only for slot 1 */}
          {index === 0 && (
            <span className="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] text-glow">
              ${slot.price}
            </span>
          )}

          {/* Activate button only for slot 2 */}
          {slot.id === 2 && (
            <Button
              className="gradient-primary text-white font-bold px-4 py-1.5 md:px-6 md:py-2 rounded-lg shadow-[0_0_25px_hsl(var(--glow-primary))] 
              hover:shadow-[0_0_40px_hsl(var(--glow-secondary))] hover:scale-105 transition-all duration-300"
            >
              Activate
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SlotsDetail;
