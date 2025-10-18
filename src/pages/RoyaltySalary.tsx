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
            <Skeleton key={i} className="h-16 w-32 rounded-lg bg-blue-500/10" />
          ))}
        </div>
        <Skeleton className="h-96 w-full rounded-xl bg-blue-500/10" />
      </div>
    );
  }

  const salaryData = [
    {
      salary: "10%",
      matrix: "5+5 / ...+....",
      direct: "20 / ....",
      team: "200 / ...",
    },
    {
      salary: "20%",
      matrix: "7+7 / ...+....",
      direct: "30 / ....",
      team: "1000 / ...",
    },
    {
      salary: "30%",
      matrix: "9+9 / ...+....",
      direct: "40 / ....",
      team: "8000 / ...",
    },
    {
      salary: "40%",
      matrix: "12+12 / ...+....",
      direct: "60 / ....",
      team: "20000 / ...",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4">
      {/* Header Buttons */}
      <div className="flex justify-center gap-6 flex-wrap">
        <Button className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 text-white font-semibold px-12 py-3 text-lg rounded-lg shadow-2xl shadow-blue-500/40 hover:scale-105 transition-all duration-500">
          My Tag
        </Button>
        <Button
          variant="outline"
          className="border-2 border-blue-500/60 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-cyan-500/5 text-foreground px-12 py-3 text-lg rounded-lg hover:border-blue-500/80 hover:scale-105 transition-all duration-500"
        >
          Achievers
        </Button>
        <Button
          variant="outline"
          className="border-2 border-blue-500/60 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-cyan-500/5 text-foreground px-12 py-3 text-lg rounded-lg hover:border-blue-500/80 hover:scale-105 transition-all duration-500"
        >
          Transactions
        </Button>
      </div>

      {/* Countdown Section */}
      <div className="glass-card rounded-xl p-8 border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-cyan-500/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-cyan-500/5 animate-pulse-slow"></div>

        <div className="relative mb-6 text-center">
          <h2 className="text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-lg font-medium mb-2">
            Next Distribution After
          </h2>
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text">
            Royalty Salary
          </h1>
        </div>

        {/* Timer */}
        <div className="flex justify-center gap-8 mb-10 flex-wrap">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div key={unit} className="text-center">
              <div className="w-24 h-24 rounded-full border-2 border-blue-500/60 bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-cyan-500/10 flex items-center justify-center mb-3 shadow-2xl shadow-blue-500/30 hover:scale-110 transition-all duration-500">
                <span className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text">
                  {String(timeLeft[unit as keyof typeof timeLeft]).padStart(
                    2,
                    "0"
                  )}
                </span>
              </div>
              <p className="text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-sm font-medium">
                {unit.charAt(0).toUpperCase() + unit.slice(1, 3)}
              </p>
            </div>
          ))}
        </div>

        {/* Table Section */}
        <div className="overflow-hidden rounded-xl border-2 border-blue-500/40 shadow-2xl">
          {/* Header */}
          <div className="grid grid-cols-5 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 text-white font-semibold">
            <div className="px-6 py-4 text-center">Salary</div>
            <div className="px-6 py-4 text-center">Matrix + Global</div>
            <div className="px-6 py-4 text-center">Direct Partner</div>
            <div className="px-6 py-4 text-center">Total Team</div>
            <div className="px-6 py-4 text-center">Action</div>
          </div>

          {/* Body */}
          <div className="bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-cyan-500/5 divide-y divide-blue-500/30">
            {salaryData.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-5 text-center items-center hover:bg-blue-500/5 transition-all duration-300"
              >
                <div className="px-6 py-4 font-semibold text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text">
                  {row.salary}
                </div>
                <div className="px-6 py-4 text-white/90">{row.matrix}</div>
                <div className="px-6 py-4 text-white/90">{row.direct}</div>
                <div className="px-6 py-4 text-white/90">{row.team}</div>
                <div className="px-6 py-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-1 rounded-lg text-sm shadow-md">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoyaltySalary;
