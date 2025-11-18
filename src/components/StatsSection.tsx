import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  DollarSign, 
  Gift, 
  Trophy, 
  Coins, 
  Zap 
} from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Total Users",
      value: "0",
      color: "text-blue-400"
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Staking Earning",
      value: "$0",
      color: "text-green-400"
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Royalty Earning",
      value: "$0",
      color: "text-purple-400"
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Lottery Earning", 
      value: "$0",
      color: "text-yellow-400"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Programs Earning",
      value: "$0",
      color: "text-red-400"
    },
    {
      icon: <Coins className="h-6 w-6" />,
      title: "NFT Earning",
      value: "$0",
      color: "text-indigo-400"
    }
  ];

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">CoStats</h2>
          <p className="text-muted-foreground">Live platform statistics and earnings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card border-primary/20 hover:glow-effect transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Total Users Earning - Featured */}
        <div className="mt-8">
          <Card className="glass-card border-primary glow-effect">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Total Users Earning</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">$0</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};