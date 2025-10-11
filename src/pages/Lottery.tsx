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
      <div className="glass-card rounded-xl p-8 border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 shadow-xl text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-success to-warning bg-clip-text text-transparent mb-3">META Lottery</h1>
        <p className="text-muted-foreground text-lg">Win big prizes in our daily, weekly, and mega lottery draws</p>
      </div>

      {/* Current Jackpots */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-xl p-6 border-2 border-success/30 bg-gradient-to-br from-success/10 via-card to-accent/5 shadow-lg hover:shadow-success/20 hover:scale-105 transition-all duration-300 text-center">
          <h3 className="text-success text-xl font-bold mb-4">Daily Draw</h3>
          <div className="text-5xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent mb-2">$5,000</div>
          <div className="text-muted-foreground mb-4">Next draw in 8 hours</div>
          <div className="text-success text-sm font-semibold">Ticket Price: $5</div>
        </div>
        
        <div className="glass-card rounded-xl p-6 border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-card to-accent/5 shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300 text-center">
          <h3 className="text-primary text-xl font-bold mb-4">Weekly Draw</h3>
          <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">$50,000</div>
          <div className="text-muted-foreground mb-4">Next draw in 3 days</div>
          <div className="text-primary text-sm font-semibold">Ticket Price: $25</div>
        </div>
        
        <div className="glass-card rounded-xl p-6 border-2 border-warning/30 bg-gradient-to-br from-warning/10 via-card to-accent/5 shadow-lg hover:shadow-warning/20 hover:scale-105 transition-all duration-300 text-center">
          <h3 className="text-warning text-xl font-bold mb-4">Mega Jackpot</h3>
          <div className="text-5xl font-bold bg-gradient-to-r from-warning to-success bg-clip-text text-transparent mb-2">$1,000,000</div>
          <div className="text-muted-foreground mb-4">Next draw in 12 days</div>
          <div className="text-warning text-sm font-semibold">Ticket Price: $100</div>
        </div>
      </div>

      {/* Purchase Tickets */}
      <div className="glass-card rounded-xl p-8 border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-accent/5 shadow-xl">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Purchase Lottery Tickets</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-xl p-6 border-2 border-success/30 bg-gradient-to-br from-success/5 to-card shadow-lg hover:shadow-success/20 transition-all duration-300">
            <h3 className="text-success text-xl font-bold mb-4 text-center">Daily Lottery</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">$5 / Ticket</div>
                <div className="text-muted-foreground text-sm">Max 10 tickets per person</div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button variant="outline" className="px-4 py-2 border-success/50 hover:bg-success/20 transition-all">-</Button>
                <span className="px-6 py-2 bg-muted rounded-lg font-bold text-lg">1</span>
                <Button variant="outline" className="px-4 py-2 border-success/50 hover:bg-success/20 transition-all">+</Button>
              </div>
              <Button className="w-full bg-gradient-to-r from-success to-primary hover:shadow-lg transition-all text-white font-semibold py-3">
                Buy Tickets
              </Button>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-card shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <h3 className="text-primary text-xl font-bold mb-4 text-center">Weekly Lottery</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">$25 / Ticket</div>
                <div className="text-muted-foreground text-sm">Max 5 tickets per person</div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button variant="outline" className="px-4 py-2 border-primary/50 hover:bg-primary/20 transition-all">-</Button>
                <span className="px-6 py-2 bg-muted rounded-lg font-bold text-lg">1</span>
                <Button variant="outline" className="px-4 py-2 border-primary/50 hover:bg-primary/20 transition-all">+</Button>
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all text-white font-semibold py-3">
                Buy Tickets
              </Button>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6 border-2 border-warning/30 bg-gradient-to-br from-warning/5 to-card shadow-lg hover:shadow-warning/20 transition-all duration-300">
            <h3 className="text-warning text-xl font-bold mb-4 text-center">Mega Jackpot</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">$100 / Ticket</div>
                <div className="text-muted-foreground text-sm">Max 3 tickets per person</div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button variant="outline" className="px-4 py-2 border-warning/50 hover:bg-warning/20 transition-all">-</Button>
                <span className="px-6 py-2 bg-muted rounded-lg font-bold text-lg">1</span>
                <Button variant="outline" className="px-4 py-2 border-warning/50 hover:bg-warning/20 transition-all">+</Button>
              </div>
              <Button className="w-full bg-gradient-to-r from-warning to-success hover:shadow-lg transition-all text-white font-semibold py-3">
                Buy Tickets
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* My Tickets */}
      <div className="glass-card rounded-xl p-8 border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-accent/5 shadow-xl">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">My Lottery Tickets</h2>
        
        <div className="overflow-hidden rounded-xl shadow-lg">
          <div className="grid grid-cols-5 bg-gradient-to-r from-success via-primary to-accent text-white font-semibold">
            <div className="px-6 py-4">Lottery</div>
            <div className="px-6 py-4">Ticket #</div>
            <div className="px-6 py-4">Numbers</div>
            <div className="px-6 py-4">Date</div>
            <div className="px-6 py-4">Status</div>
          </div>
          
          <div className="bg-gradient-to-br from-primary/5 via-card to-accent/5 border-2 border-primary/30">
            {[
              { lottery: "Daily", ticket: "#12345", numbers: "7-14-23-31-42", date: "2024-01-15", status: "Active" },
              { lottery: "Weekly", ticket: "#67890", numbers: "3-18-27-35-44", date: "2024-01-12", status: "Active" },
              { lottery: "Mega", ticket: "#11111", numbers: "5-12-19-28-33", date: "2024-01-10", status: "Active" },
            ].map((ticket, index) => (
              <div key={index} className="grid grid-cols-5 border-b border-primary/20 last:border-b-0 hover:bg-primary/10 transition-all">
                <div className="px-6 py-4 text-foreground font-semibold">{ticket.lottery}</div>
                <div className="px-6 py-4 text-primary font-mono">{ticket.ticket}</div>
                <div className="px-6 py-4 text-foreground font-mono">{ticket.numbers}</div>
                <div className="px-6 py-4 text-muted-foreground">{ticket.date}</div>
                <div className="px-6 py-4">
                  <span className="bg-success/20 text-success px-4 py-1.5 rounded-full text-sm font-semibold">
                    {ticket.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Winners */}
      <div className="glass-card rounded-xl p-8 border-2 border-warning/30 bg-gradient-to-br from-warning/10 via-card to-success/10 shadow-xl">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">🏆 Recent Winners</h2>
        
        <div className="space-y-4">
          {[
            { name: "User***123", prize: "$5,000", lottery: "Daily Draw", date: "2024-01-14" },
            { name: "User***456", prize: "$50,000", lottery: "Weekly Draw", date: "2024-01-07" },
            { name: "User***789", prize: "$1,000,000", lottery: "Mega Jackpot", date: "2024-01-01" },
          ].map((winner, index) => (
            <div key={index} className="flex justify-between items-center p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20 hover:shadow-lg hover:scale-102 transition-all duration-300">
              <div>
                <div className="font-bold text-foreground text-lg">{winner.name}</div>
                <div className="text-muted-foreground">{winner.lottery} - {winner.date}</div>
              </div>
              <div className="text-success font-bold text-2xl">{winner.prize}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lottery;