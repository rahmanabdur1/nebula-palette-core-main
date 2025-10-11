import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const transactionData = [
  {
    amount: 5,
    type: "Package Purchased",
    slot: "Slot 1",
    user: "1856131324",
    time: "390d ago",
    trx: "0x46...ffd1",
  },
];

const Transactions = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 px-4">
        <div className="flex justify-center gap-8">
          <Skeleton className="h-16 w-48 rounded-lg" />
          <Skeleton className="h-16 w-48 rounded-lg" />
        </div>
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4">
      {/* Power Matrix and Power Global Buttons */}
      <div className="flex justify-center gap-8 flex-wrap">
        <Button
          variant="default"
          className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-semibold px-16 py-4 text-lg rounded-lg shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 transition-all duration-500 hover:scale-105"
        >
          Future Matrix
        </Button>
        <Button
          variant="outline"
          className="border-2 border-green-500/60 bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-teal-500/5 text-foreground hover:from-green-500/20 hover:via-emerald-500/10 hover:to-teal-500/10 px-16 py-4 text-lg rounded-lg transition-all duration-500 hover:scale-105 hover:border-green-500/80"
        >
          Future Global
        </Button>
      </div>

      {/* Self and Earning Tabs */}
      <div className="flex justify-center gap-6">
        <Button
          variant="default"
          className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-semibold px-12 py-3 rounded-lg shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 transition-all duration-500 hover:scale-105"
        >
          Self
        </Button>
        <Button
          variant="outline"
          className="border-2 border-green-500/60 bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-teal-500/5 text-foreground hover:from-green-500/20 hover:via-emerald-500/10 hover:to-teal-500/10 px-12 py-3 rounded-lg transition-all duration-500 hover:scale-105 hover:border-green-500/80"
        >
          Earning
        </Button>
      </div>

      {/* Transactions Table */}
      <div className="glass-card rounded-xl p-6 border-2 border-green-500/40 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 shadow-2xl relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>

        <div className="relative overflow-hidden rounded-xl border-2 border-green-500/40 shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-semibold relative">
            <div className="px-6 py-5 text-center">Amount</div>
            <div className="px-6 py-5 text-center">Type</div>
            <div className="px-6 py-5 text-center">User</div>
            <div className="px-6 py-5 text-center">Time</div>
            <div className="px-6 py-5 text-center">Trx</div>
          </div>

          {/* Table Body */}
          <div className="bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 relative">
            {transactionData.map((transaction, index) => (
              <div
                key={index}
                className="grid grid-cols-5 border-b border-green-500/30 last:border-b-0 hover:bg-gradient-to-r hover:from-green-500/10 hover:via-emerald-500/5 hover:to-teal-500/5 transition-all duration-500 group"
              >
                <div className="px-6 py-4 text-center text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text font-semibold text-lg group-hover:scale-105 transition-transform">
                  {transaction.amount}
                </div>
                <div className="px-6 py-4 text-center">
                  <div className="text-foreground font-medium group-hover:text-green-500 transition-colors">
                    {transaction.type}
                  </div>
                  <div className="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-sm font-semibold">
                    {transaction.slot}
                  </div>
                </div>
                <div className="px-6 py-4 text-center">
                  <div className="bg-gradient-to-r from-green-500/15 via-emerald-500/10 to-teal-500/5 text-foreground px-4 py-2 rounded-full font-mono text-sm border border-green-500/30 group-hover:border-green-500/60 group-hover:shadow-lg group-hover:shadow-green-500/20 transition-all duration-500">
                    {transaction.user}
                  </div>
                </div>
                <div className="px-6 py-4 text-center text-muted-foreground group-hover:text-green-400 transition-colors">
                  {transaction.time}
                </div>
                <div className="px-6 py-4 text-center">
                  <span className="text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text font-mono text-sm font-semibold group-hover:scale-105 transition-transform inline-block">
                    {transaction.trx}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8 relative">
          <Button
            variant="outline"
            className="border-2 border-green-500/60 bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-teal-500/5 text-foreground hover:from-green-500/20 hover:via-emerald-500/10 hover:to-teal-500/10 px-8 py-2 rounded-lg transition-all duration-500 hover:scale-105 hover:border-green-500/80"
          >
            Prev
          </Button>
          <Button
            variant="default"
            className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 transition-all duration-500 hover:scale-105"
          >
            1
          </Button>
          <Button
            variant="outline"
            className="border-2 border-green-500/60 bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-teal-500/5 text-foreground hover:from-green-500/20 hover:via-emerald-500/10 hover:to-teal-500/10 px-8 py-2 rounded-lg transition-all duration-500 hover:scale-105 hover:border-green-500/80"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
