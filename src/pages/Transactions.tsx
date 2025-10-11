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
        {/* <div className="flex justify-center gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-40 rounded-full" />
          ))}
        </div> */}
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
      {/* Header Badges */}
      {/* <div className="flex justify-center gap-6 flex-wrap">
        <Button variant="default" className="bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70 text-black font-semibold px-10 py-3 text-lg rounded-full shadow-lg shadow-success/30 transition-all duration-300">
          Millionaire
        </Button>
        <Button variant="outline" className="border-2 border-primary/40 text-foreground hover:bg-primary/10 px-10 py-3 text-lg rounded-full transition-all duration-300">
          Billionaire
        </Button>
        <Button variant="outline" className="border-2 border-primary/40 text-foreground hover:bg-primary/10 px-10 py-3 text-lg rounded-full transition-all duration-300">
          Trillionaire
        </Button>
      </div> */}

      {/* Power Matrix and Power Global Buttons */}
      <div className="flex justify-center gap-8 flex-wrap">
        <Button
          variant="default"
          className="bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70 text-black font-semibold px-16 py-4 text-lg rounded-lg shadow-lg shadow-success/30 transition-all duration-300"
        >
          Future Matrix
        </Button>
        <Button
          variant="outline"
          className="border-2 border-primary/40 bg-primary/5 text-foreground hover:bg-primary/15 px-16 py-4 text-lg rounded-lg transition-all duration-300"
        >
          Future Global
        </Button>
      </div>

      {/* Self and Earning Tabs */}
      <div className="flex justify-center gap-6">
        <Button
          variant="default"
          className="bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70 text-black font-semibold px-12 py-3 rounded-lg shadow-lg shadow-success/30 transition-all duration-300"
        >
          Self
        </Button>
        <Button
          variant="outline"
          className="border-2 border-primary/40 bg-primary/5 text-foreground hover:bg-primary/15 px-12 py-3 rounded-lg transition-all duration-300"
        >
          Earning
        </Button>
      </div>

      {/* Transactions Table */}
      <div className="glass-card rounded-xl p-6 border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-accent/5 shadow-xl">
        <div className="overflow-hidden rounded-xl border-2 border-primary/30 shadow-lg">
          {/* Table Header */}
          <div className="grid grid-cols-5 bg-gradient-to-r from-success to-success/80 text-black font-semibold">
            <div className="px-6 py-5 text-center">Amount</div>
            <div className="px-6 py-5 text-center">Type</div>
            <div className="px-6 py-5 text-center">User</div>
            <div className="px-6 py-5 text-center">Time</div>
            <div className="px-6 py-5 text-center">Trx</div>
          </div>

          {/* Table Body */}
          <div className="bg-gradient-to-br from-card via-primary/5 to-accent/5">
            {transactionData.map((transaction, index) => (
              <div
                key={index}
                className="grid grid-cols-5 border-b border-primary/20 last:border-b-0"
              >
                <div className="px-6 py-4 text-center text-foreground font-semibold text-lg">
                  {transaction.amount}
                </div>
                <div className="px-6 py-4 text-center">
                  <div className="text-foreground font-medium">
                    {transaction.type}
                  </div>
                  <div className="text-success text-sm">{transaction.slot}</div>
                </div>
                <div className="px-6 py-4 text-center">
                  <div className="bg-muted/30 text-foreground px-4 py-2 rounded-full font-mono text-sm">
                    {transaction.user}
                  </div>
                </div>
                <div className="px-6 py-4 text-center text-muted-foreground">
                  {transaction.time}
                </div>
                <div className="px-6 py-4 text-center">
                  <span className="text-success font-mono text-sm">
                    {transaction.trx}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            className="border-2 border-primary/40 bg-primary/5 text-foreground hover:bg-primary/15 px-8 py-2 rounded-lg transition-all duration-300"
          >
            Prev
          </Button>
          <Button
            variant="default"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-6 py-2 rounded-lg shadow-lg shadow-primary/30 transition-all duration-300"
          >
            1
          </Button>
          <Button
            variant="outline"
            className="border-2 border-primary/40 bg-primary/5 text-foreground hover:bg-primary/15 px-8 py-2 rounded-lg transition-all duration-300"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
