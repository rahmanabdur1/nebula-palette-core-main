import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Ticket {
  lottery: string;
  ticket: string;
  numbers: string;
  date: string;
  status: string;
}

interface Winner {
  name: string;
  prize: string;
  lottery: string;
  date: string;
}

const Lottery = () => {
  const [loading, setLoading] = useState(true);
  const [ticketCounts, setTicketCounts] = useState({
    daily: 1,
    weekly: 1,
    mega: 1,
  });

  const myTickets: Ticket[] = [
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
  ];

  const recentWinners: Winner[] = [
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
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const increment = (type: keyof typeof ticketCounts, max: number) => {
    setTicketCounts((prev) => ({
      ...prev,
      [type]: Math.min(prev[type] + 1, max),
    }));
  };

  const decrement = (type: keyof typeof ticketCounts) => {
    setTicketCounts((prev) => ({
      ...prev,
      [type]: Math.max(prev[type] - 1, 1),
    }));
  };

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
      <div className="glass-card rounded-xl p-8 border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-indigo-500/10 shadow-2xl text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-sky-500/5 to-indigo-500/5 animate-pulse-slow"></div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 bg-clip-text text-transparent mb-3 relative z-10">
          META Lottery
        </h1>
        <p className="text-muted-foreground text-lg relative z-10">
          Win big prizes in our daily, weekly, and mega lottery draws
        </p>
      </div>

      {/* Current Jackpots */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Daily Draw", amount: "$5,000", next: "8 hours" },
          { label: "Weekly Draw", amount: "$50,000", next: "3 days" },
          { label: "Mega Jackpot", amount: "$1,000,000", next: "12 days" },
        ].map((jackpot, idx) => (
          <div
            key={idx}
            className="glass-card rounded-xl p-6 border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/15 via-sky-500/10 to-indigo-500/5 shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-500 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <h3 className="text-xl font-bold mb-4 text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text">
              {jackpot.label}
            </h3>
            <div className="text-5xl font-bold mb-2 text-transparent bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 bg-clip-text">
              {jackpot.amount}
            </div>
            <div className="text-muted-foreground mb-4">{`Next draw in ${jackpot.next}`}</div>
          </div>
        ))}
      </div>

      {/* Purchase Tickets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { type: "daily", label: "Daily Lottery", price: 5, max: 10 },
          { type: "weekly", label: "Weekly Lottery", price: 25, max: 5 },
          { type: "mega", label: "Mega Jackpot", price: 100, max: 3 },
        ].map((lottery) => (
          <div
            key={lottery.type}
            className="glass-card rounded-xl p-6 border-2 border-blue-500/40 shadow-2xl text-center relative overflow-hidden group"
          >
            <h3 className="text-xl font-bold mb-4">{lottery.label}</h3>
            <div className="text-3xl font-bold mb-2">
              ${lottery.price} / Ticket
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Button onClick={() => decrement(lottery.type as any)}>-</Button>
              <span className="px-6 py-2 rounded-lg font-bold border">
                {ticketCounts[lottery.type as keyof typeof ticketCounts]}
              </span>
              <Button
                onClick={() => increment(lottery.type as any, lottery.max)}
              >
                +
              </Button>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 hover:from-blue-600 hover:via-sky-600 hover:to-indigo-600 text-white font-semibold py-3 shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-500 hover:scale-105">
              Buy Tickets
            </Button>
          </div>
        ))}
      </div>

      {/* My Tickets */}
      <div className="glass-card rounded-xl p-8 border-2 border-blue-500/40 shadow-2xl overflow-hidden">
        <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text mb-8 text-center">
          My Lottery Tickets
        </h2>
        <div className="overflow-hidden rounded-xl shadow-2xl">
          <div className="grid grid-cols-5 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 text-white font-semibold">
            <div className="px-6 py-4">Lottery</div>
            <div className="px-6 py-4">Ticket #</div>
            <div className="px-6 py-4">Numbers</div>
            <div className="px-6 py-4">Date</div>
            <div className="px-6 py-4">Status</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/5 via-sky-500/5 to-indigo-500/5 border-2 border-blue-500/30">
            {myTickets.map((ticket, idx) => (
              <div
                key={idx}
                className="grid grid-cols-5 border-b border-blue-500/20 hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-sky-500/5 hover:to-indigo-500/5 transition-all duration-500"
              >
                <div className="px-6 py-4 font-semibold">{ticket.lottery}</div>
                <div className="px-6 py-4 font-mono text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text">
                  {ticket.ticket}
                </div>
                <div className="px-6 py-4 font-mono">{ticket.numbers}</div>
                <div className="px-6 py-4 text-muted-foreground">
                  {ticket.date}
                </div>
                <div className="px-6 py-4">
                  <span className="bg-gradient-to-r from-blue-500/20 to-sky-500/20 text-blue-500 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-500/30">
                    {ticket.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Winners */}
      <div className="glass-card rounded-xl p-8 border-2 border-blue-500/40 shadow-2xl overflow-hidden">
        <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text mb-8 text-center">
          🏆 Recent Winners
        </h2>
        <div className="space-y-4">
          {recentWinners.map((winner, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-500/10 via-sky-500/5 to-indigo-500/5 rounded-xl border border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-102 transition-all duration-500"
            >
              <div>
                <div className="font-bold text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-lg">
                  {winner.name}
                </div>
                <div className="text-muted-foreground">
                  {winner.lottery} - {winner.date}
                </div>
              </div>
              <div className="text-transparent bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text font-bold text-2xl">
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
