import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const RoyaltySalary = () => {
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 22,
    minutes: 31,
    seconds: 23,
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 px-4">
        {/* <div className="flex justify-center gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-40 rounded-full" />
          ))}
        </div> */}
        <div className="flex justify-center gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-32 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4">
      {/* Header Badges */}
      {/* <div className="flex justify-center gap-6 flex-wrap">
        <Button variant="default" className="bg-gradient-to-r from-warning to-warning/80 hover:from-warning/90 hover:to-warning/70 text-black font-semibold px-10 py-3 text-lg rounded-full shadow-lg shadow-warning/30 transition-all duration-300">
          Millionaire
        </Button>
        <Button variant="outline" className="border-2 border-primary/40 text-foreground hover:bg-primary/10 px-10 py-3 text-lg rounded-full transition-all duration-300">
          Billionaire
        </Button>
        <Button variant="outline" className="border-2 border-primary/40 text-foreground hover:bg-primary/10 px-10 py-3 text-lg rounded-full transition-all duration-300">
          Trillionaire
        </Button>
      </div> */}

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 flex-wrap">
        <Button
          variant="default"
          className="bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70 text-black font-semibold px-12 py-3 text-lg rounded-lg shadow-lg shadow-success/30 transition-all duration-300"
        >
          My Tag
        </Button>
        <Button
          variant="outline"
          className="border-2 border-primary/40 bg-primary/5 text-foreground hover:bg-primary/15 px-12 py-3 text-lg rounded-lg transition-all duration-300"
        >
          Achievers
        </Button>
        <Button
          variant="outline"
          className="border-2 border-primary/40 bg-primary/5 text-foreground hover:bg-primary/15 px-12 py-3 text-lg rounded-lg transition-all duration-300"
        >
          Transactions
        </Button>
      </div>

      {/* Tag Tracker Section */}
      <div className="glass-card rounded-xl p-8 border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-accent/5 shadow-xl">
        <div className="mb-6">
          <h2 className="text-success text-lg font-medium mb-2">
            Next Distribution After
          </h2>
          <div className="flex items-center gap-2 mb-6">
            <h1 className="text-3xl font-bold text-foreground">Tag Tracker</h1>
            <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
              <span className="text-black text-sm">i</span>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-10 mb-10 flex-wrap">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-4 border-success bg-gradient-to-br from-success/10 to-primary/10 flex items-center justify-center mb-3 shadow-lg shadow-success/20 transition-all duration-300 hover:scale-105">
              <span className="text-4xl font-bold text-foreground">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
            </div>
            <div className="text-muted-foreground text-sm font-medium">
              Days
            </div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-4 border-success bg-gradient-to-br from-success/10 to-primary/10 flex items-center justify-center mb-3 shadow-lg shadow-success/20 transition-all duration-300 hover:scale-105">
              <span className="text-4xl font-bold text-foreground">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
            </div>
            <div className="text-muted-foreground text-sm font-medium">Hrs</div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-4 border-success bg-gradient-to-br from-success/10 to-primary/10 flex items-center justify-center mb-3 shadow-lg shadow-success/20 transition-all duration-300 hover:scale-105">
              <span className="text-4xl font-bold text-foreground">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
            </div>
            <div className="text-muted-foreground text-sm font-medium">Min</div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-4 border-success bg-gradient-to-br from-success/10 to-primary/10 flex items-center justify-center mb-3 shadow-lg shadow-success/20 transition-all duration-300 hover:scale-105">
              <span className="text-4xl font-bold text-foreground">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
            <div className="text-muted-foreground text-sm font-medium">Sec</div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border-2 border-primary/30 shadow-lg">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-gradient-to-r from-success to-success/80 text-black font-semibold">
            <div className="px-6 py-4 text-center">Tag</div>
            <div className="px-6 py-4 text-center">Self Pkg</div>
            <div className="px-6 py-4 text-center">Team Member</div>
          </div>

          {/* Table Body */}
          <div className="bg-gradient-to-br from-card via-primary/5 to-accent/5">
            <div className="grid grid-cols-3 border-b border-primary/20">
              <div className="px-6 py-4 text-center">
                <span className="text-warning font-semibold text-lg">
                  Mars(10%)
                </span>
              </div>
              <div className="px-6 py-4 text-center">
                <span className="text-foreground font-semibold text-lg">
                  5 / 1
                </span>
              </div>
              <div className="px-6 py-4 text-center">
                <span className="text-foreground font-semibold text-lg">
                  200 / 6
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoyaltySalary;
