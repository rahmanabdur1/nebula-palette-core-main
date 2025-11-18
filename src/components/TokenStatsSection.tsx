import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TokenStatsSection = () => {
  const tokenData = [
    { name: "Team", percentage: 7.5, color: "#8B5CF6" },
    { name: "Staking", percentage: 9.5, color: "#06B6D4" },
    { name: "Advisors", percentage: 10.0, color: "#10B981" },
    { name: "Liquidity", percentage: 12.0, color: "#F59E0B" },
    { name: "Ecosystem", percentage: 16.0, color: "#EF4444" },
    { name: "Marketing", percentage: 15.0, color: "#EC4899" },
    { name: "Private Sale", percentage: 30.0, color: "#6366F1" }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Coin <span className="gradient-primary bg-clip-text text-transparent">Statistics</span>
          </h2>
          <p className="text-muted-foreground">Token allocation and distribution breakdown</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Chart Simulation */}
          <div className="relative">
            <div className="w-80 h-80 mx-auto relative">
              {/* Pie Chart Simulation */}
              <div className="w-full h-full rounded-full bg-gradient-primary relative overflow-hidden">
                <div className="absolute inset-8 rounded-full bg-background"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">MPS</div>
                    <div className="text-sm text-muted-foreground">Token</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-4">
            {tokenData.map((item, index) => (
              <Card key={index} className="glass-card border-primary/20 hover:border-primary/40 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-primary">{item.percentage}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Token Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card border-primary/20 text-center">
            <CardHeader>
              <CardTitle>Total Supply</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">1,000,000,000</div>
              <div className="text-sm text-muted-foreground">MPS Tokens</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-primary/20 text-center">
            <CardHeader>
              <CardTitle>Circulating Supply</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">300,000,000</div>
              <div className="text-sm text-muted-foreground">MPS Tokens</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-primary/20 text-center">
            <CardHeader>
              <CardTitle>Token Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">$0.001</div>
              <div className="text-sm text-muted-foreground">USD per MPS</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};