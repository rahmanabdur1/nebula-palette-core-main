import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Lottery = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 px-4">
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4">
      {/* Header */}
      <div className="glass-card rounded-xl p-8 border-2 border-green-500/40 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 shadow-2xl text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent mb-3 relative z-10">
          META Lottery
        </h1>
        <p className="text-muted-foreground text-lg relative z-10">
          Win big prizes in our daily, weekly, and mega lottery draws
        </p>
      </div>

      {/* Current Jackpots */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-xl p-6 border-2 border-green-500/40 bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-teal-500/5 shadow-2xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-500 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          <h3 className="text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-xl font-bold mb-4 relative z-10">
            Daily Draw
          </h3>
          <div className="text-5xl font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent mb-2 relative z-10">
            $5,000
          </div>
          <div className="text-muted-foreground mb-4 relative z-10">
            Next draw in 8 hours
          </div>
          <div className="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-sm font-semibold relative z-10">
            Ticket Price: $5
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 border-2 border-green-500/40 bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-teal-500/5 shadow-2xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-500 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          <h3 className="text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-xl font-bold mb-4 relative z-10">
            Weekly Draw
          </h3>
          <div className="text-5xl font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent mb-2 relative z-10">
            $50,000
          </div>
          <div className="text-muted-foreground mb-4 relative z-10">
            Next draw in 3 days
          </div>
          <div className="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-sm font-semibold relative z-10">
            Ticket Price: $25
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 border-2 border-green-500/40 bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-teal-500/5 shadow-2xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-500 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          <h3 className="text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-xl font-bold mb-4 relative z-10">
            Mega Jackpot
          </h3>
          <div className="text-5xl font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent mb-2 relative z-10">
            $1,000,000
          </div>
          <div className="text-muted-foreground mb-4 relative z-10">
            Next draw in 12 days
          </div>
          <div className="text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-sm font-semibold relative z-10">
            Ticket Price: $100
          </div>
        </div>
      </div>

      {/* Purchase Tickets */}
      <div className="glass-card rounded-xl p-8 border-2 border-green-500/40 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>
        <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text mb-8 text-center relative z-10">
          Purchase Lottery Tickets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="glass-card rounded-xl p-6 border-2 border-green-500/40 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/5 shadow-2xl hover:shadow-green-500/30 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h3 className="text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-xl font-bold mb-4 text-center relative z-10">
              Daily Lottery
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">
                  $5 / Ticket
                </div>
                <div className="text-muted-foreground text-sm">
                  Max 10 tickets per person
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  className="px-4 py-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500/70 transition-all duration-500"
                >
                  -
                </Button>
                <span className="px-6 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg font-bold text-lg border border-green-500/20">
                  1
                </span>
                <Button
                  variant="outline"
                  className="px-4 py-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500/70 transition-all duration-500"
                >
                  +
                </Button>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-semibold py-3 shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 transition-all duration-500 hover:scale-105">
                Buy Tickets
              </Button>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 border-2 border-green-500/40 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/5 shadow-2xl hover:shadow-green-500/30 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h3 className="text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-xl font-bold mb-4 text-center relative z-10">
              Weekly Lottery
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">
                  $25 / Ticket
                </div>
                <div className="text-muted-foreground text-sm">
                  Max 5 tickets per person
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  className="px-4 py-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500/70 transition-all duration-500"
                >
                  -
                </Button>
                <span className="px-6 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg font-bold text-lg border border-green-500/20">
                  1
                </span>
                <Button
                  variant="outline"
                  className="px-4 py-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500/70 transition-all duration-500"
                >
                  +
                </Button>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-semibold py-3 shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 transition-all duration-500 hover:scale-105">
                Buy Tickets
              </Button>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 border-2 border-green-500/40 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/5 shadow-2xl hover:shadow-green-500/30 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h3 className="text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-xl font-bold mb-4 text-center relative z-10">
              Mega Jackpot
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">
                  $100 / Ticket
                </div>
                <div className="text-muted-foreground text-sm">
                  Max 3 tickets per person
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  className="px-4 py-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500/70 transition-all duration-500"
                >
                  -
                </Button>
                <span className="px-6 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg font-bold text-lg border border-green-500/20">
                  1
                </span>
                <Button
                  variant="outline"
                  className="px-4 py-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500/70 transition-all duration-500"
                >
                  +
                </Button>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-semibold py-3 shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 transition-all duration-500 hover:scale-105">
                Buy Tickets
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* My Tickets */}
      <div className="glass-card rounded-xl p-8 border-2 border-green-500/40 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>
        <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text mb-8 text-center relative z-10">
          My Lottery Tickets
        </h2>

        <div className="overflow-hidden rounded-xl shadow-2xl relative z-10">
          <div className="grid grid-cols-5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-semibold">
            <div className="px-6 py-4">Lottery</div>
            <div className="px-6 py-4">Ticket #</div>
            <div className="px-6 py-4">Numbers</div>
            <div className="px-6 py-4">Date</div>
            <div className="px-6 py-4">Status</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 border-2 border-green-500/30">
            {[
              {
                lottery: "Daily",
                ticket: "#12345",
                numbers: "7-14-23-31-42",
                date: "2024-01-15",
                status: "Active",
              },
              {
                lottery: "Weekly",
                ticket: "#67890",
                numbers: "3-18-27-35-44",
                date: "2024-01-12",
                status: "Active",
              },
              {
                lottery: "Mega",
                ticket: "#11111",
                numbers: "5-12-19-28-33",
                date: "2024-01-10",
                status: "Active",
              },
            ].map((ticket, index) => (
              <div
                key={index}
                className="grid grid-cols-5 border-b border-green-500/20 last:border-b-0 hover:bg-gradient-to-r hover:from-green-500/10 hover:via-emerald-500/5 hover:to-teal-500/5 transition-all duration-500 group"
              >
                <div className="px-6 py-4 text-foreground font-semibold group-hover:text-green-500 transition-colors">
                  {ticket.lottery}
                </div>
                <div className="px-6 py-4 text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text font-mono">
                  {ticket.ticket}
                </div>
                <div className="px-6 py-4 text-foreground font-mono group-hover:text-green-400 transition-colors">
                  {ticket.numbers}
                </div>
                <div className="px-6 py-4 text-muted-foreground group-hover:text-green-300 transition-colors">
                  {ticket.date}
                </div>
                <div className="px-6 py-4">
                  <span className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-500 px-4 py-1.5 rounded-full text-sm font-semibold border border-green-500/30">
                    {ticket.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Winners */}
      <div className="glass-card rounded-xl p-8 border-2 border-green-500/40 bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-teal-500/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>
        <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text mb-8 text-center relative z-10">
          🏆 Recent Winners
        </h2>

        <div className="space-y-4 relative z-10">
          {[
            {
              name: "User***123",
              prize: "$5,000",
              lottery: "Daily Draw",
              date: "2024-01-14",
            },
            {
              name: "User***456",
              prize: "$50,000",
              lottery: "Weekly Draw",
              date: "2024-01-07",
            },
            {
              name: "User***789",
              prize: "$1,000,000",
              lottery: "Mega Jackpot",
              date: "2024-01-01",
            },
          ].map((winner, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-6 bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-teal-500/5 rounded-xl border border-green-500/30 hover:shadow-2xl hover:shadow-green-500/20 hover:scale-102 transition-all duration-500 group"
            >
              <div>
                <div className="font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-lg">
                  {winner.name}
                </div>
                <div className="text-muted-foreground group-hover:text-green-400 transition-colors">
                  {winner.lottery} - {winner.date}
                </div>
              </div>
              <div className="text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text font-bold text-2xl">
                {winner.prize}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lottery;
