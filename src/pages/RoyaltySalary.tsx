"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const RoyaltySalary = () => {
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 22,
    minutes: 31,
    seconds: 23,
  });

  const [activeTab, setActiveTab] = useState<"myTag" | "achievers">("myTag");

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
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
      {/* Tabs */}
      <div className="flex justify-center gap-6 flex-wrap mb-6">
        <Button
          className={`${
            activeTab === "myTag"
              ? "bg-blue-500 text-white"
              : "bg-blue-500/30 text-white/70"
          } font-semibold px-12 py-3 text-lg rounded-lg shadow-md hover:scale-105 transition-all duration-300`}
          onClick={() => setActiveTab("myTag")}
        >
          My Tag
        </Button>
        <Button
          className={`${
            activeTab === "achievers"
              ? "bg-blue-500 text-white"
              : "bg-blue-500/30 text-white/70"
          } font-semibold px-12 py-3 text-lg rounded-lg shadow-md hover:scale-105 transition-all duration-300`}
          onClick={() => setActiveTab("achievers")}
        >
          Achievers
        </Button>
      </div>

      {/* Card */}
      <div className="glass-card rounded-xl p-8 border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-cyan-500/10 shadow-2xl relative overflow-hidden">
        <div className="relative mb-6 text-center">
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text">
            Royalty Salary
          </h1>
        </div>

        {/* Countdown */}
        {activeTab === "myTag" && (
          <div className="flex justify-center gap-8 mb-10 flex-wrap">
            {["days", "hours", "minutes", "seconds"].map((unit) => (
              <div key={unit} className="text-center">
                <div className="w-24 h-24 rounded-full border-2 border-blue-500/60 bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-cyan-500/10 flex items-center justify-center mb-3 shadow-lg hover:scale-110 transition-all duration-500">
                  <span className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text">
                    {String(timeLeft[unit as keyof typeof timeLeft]).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </div>
                <p className="text-white/70 text-sm font-medium">
                  {unit.charAt(0).toUpperCase() + unit.slice(1, 3)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Achievers Table */}
        {activeTab === "achievers" && (
          <div className="overflow-hidden rounded-xl border-2 border-blue-500/40 shadow-md">
            <div className="grid grid-cols-5 bg-blue-500/90 text-white font-semibold">
              <div className="px-6 py-4 text-center">Salary</div>
              <div className="px-6 py-4 text-center">Matrix + Global</div>
              <div className="px-6 py-4 text-center">Direct Partner</div>
              <div className="px-6 py-4 text-center">Total Team</div>
              <div className="px-6 py-4 text-center">Action</div>
            </div>

            <div className="bg-blue-500/10 divide-y divide-blue-500/30">
              {salaryData.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-5 text-center items-center hover:bg-blue-500/20 transition-all duration-300 group"
                >
                  <div className="px-6 py-4 font-semibold text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text">
                    {row.salary}
                  </div>
                  <div className="px-6 py-4 text-white/90">{row.matrix}</div>
                  <div className="px-6 py-4 text-white/90">{row.direct}</div>
                  <div className="px-6 py-4 text-white/90">{row.team}</div>

                  {/* Use DialogTrigger around the View button so it reliably opens the dialog */}
                  <div className="px-6 py-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-1 rounded-lg text-sm shadow-md">
                          View
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-3xl bg-[#021C3D] text-white border-none">
                        <DialogHeader>
                          <DialogTitle className="text-center text-2xl font-bold mb-6 text-white">
                            Royalty Level — {row.salary}
                          </DialogTitle>
                        </DialogHeader>

                        <div className="flex justify-center gap-10 flex-wrap mb-6">
                          {[10, 20, 30, 40].map((percent, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col items-center gap-2"
                            >
                              {/* replace the src with your image path in public/ */}
                              <img
                                src="/logo.png"
                                alt="lock"
                                width={110}
                                height={110}
                              />
                              <p className="text-lg font-semibold">
                                ${"0".repeat(idx + 3)}
                              </p>
                              <p className="text-xl font-bold">{percent}%</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-center">
                          <DialogClose asChild>
                            <Button className="px-6 py-2 rounded-md">
                              Close
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoyaltySalary;
