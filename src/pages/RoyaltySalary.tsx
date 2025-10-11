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
      {/* Action Buttons */}
      <div className="flex justify-center gap-6 flex-wrap">
        <Button
          variant="default"
          className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-semibold px-12 py-3 text-lg rounded-lg shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 transition-all duration-500 hover:scale-105"
        >
          My Tag
        </Button>
        <Button
          variant="outline"
          className="border-2 border-green-500/60 bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-teal-500/5 text-foreground hover:from-green-500/20 hover:via-emerald-500/10 hover:to-teal-500/10 px-12 py-3 text-lg rounded-lg transition-all duration-500 hover:scale-105 hover:border-green-500/80"
        >
          Achievers
        </Button>
        <Button
          variant="outline"
          className="border-2 border-green-500/60 bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-teal-500/5 text-foreground hover:from-green-500/20 hover:via-emerald-500/10 hover:to-teal-500/10 px-12 py-3 text-lg rounded-lg transition-all duration-500 hover:scale-105 hover:border-green-500/80"
        >
          Transactions
        </Button>
      </div>

      {/* Tag Tracker Section */}
      <div className="glass-card rounded-xl p-8 border-2 border-green-500/40 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 shadow-2xl relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>

        <div className="relative mb-6">
          <h2 className="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-lg font-medium mb-2">
            Next Distribution After
          </h2>
          <div className="flex items-center gap-2 mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
              Tag Tracker
            </h1>
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
              <span className="text-white text-sm font-bold">i</span>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-10 mb-10 flex-wrap relative">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-2 border-green-500/60 bg-gradient-to-br from-green-500/20 via-emerald-500/15 to-teal-500/10 flex items-center justify-center mb-3 shadow-2xl shadow-green-500/30 transition-all duration-500 hover:scale-110 hover:shadow-green-500/50">
              <span className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
            </div>
            <div className="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-sm font-medium">
              Days
            </div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-2 border-green-500/60 bg-gradient-to-br from-green-500/20 via-emerald-500/15 to-teal-500/10 flex items-center justify-center mb-3 shadow-2xl shadow-green-500/30 transition-all duration-500 hover:scale-110 hover:shadow-green-500/50">
              <span className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
            </div>
            <div className="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-sm font-medium">
              Hrs
            </div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-2 border-green-500/60 bg-gradient-to-br from-green-500/20 via-emerald-500/15 to-teal-500/10 flex items-center justify-center mb-3 shadow-2xl shadow-green-500/30 transition-all duration-500 hover:scale-110 hover:shadow-green-500/50">
              <span className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
            </div>
            <div className="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-sm font-medium">
              Min
            </div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-2 border-green-500/60 bg-gradient-to-br from-green-500/20 via-emerald-500/15 to-teal-500/10 flex items-center justify-center mb-3 shadow-2xl shadow-green-500/30 transition-all duration-500 hover:scale-110 hover:shadow-green-500/50">
              <span className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
            <div className="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-sm font-medium">
              Sec
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border-2 border-green-500/40 shadow-2xl relative">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-semibold relative">
            <div className="px-6 py-4 text-center">Tag</div>
            <div className="px-6 py-4 text-center">Self Pkg</div>
            <div className="px-6 py-4 text-center">Team Member</div>
          </div>

          {/* Table Body */}
          <div className="bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5">
            <div className="grid grid-cols-3 border-b border-green-500/30">
              <div className="px-6 py-4 text-center">
                <span className="text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text font-semibold text-lg">
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
