import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Coins, GamepadIcon, Store } from "lucide-react";

export function EcosystemSection() {
  const ecosystemParts = [
    {
      icon: GamepadIcon,
      title: "Game Launcher",
      description: "Discover and play thousands of Web3 games",
      features: ["Game Library", "Cloud Saves", "Cross-Platform"]
    },
    {
      icon: Store,
      title: "Asset Market",
      description: "Trade gaming assets with real value", 
      features: ["NFT Trading", "Asset Verification", "Secure Transactions"]
    },
    {
      icon: Coins,
      title: "DeFi Integration",
      description: "Earn, stake, and invest your gaming rewards",
      features: ["Yield Farming", "Staking Pools", "Liquidity Mining"]
    },
    {
      icon: Code,
      title: "Developer Tools",
      description: "Build the next generation of Web3 games",
      features: ["Unity SDK", "API Access", "Smart Contracts"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Complete Gaming <span className="text-primary">Ecosystem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform brings together all aspects of Web3 gaming in one unified ecosystem, 
            creating unprecedented value for players, developers, and the community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ecosystemParts.map((part, index) => (
            <div key={part.title} className="relative">
              {/* Connection line */}
              {index < ecosystemParts.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-primary z-10"></div>
              )}
              
              <div className="glass-card p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 h-full">
                <div className="bg-gradient-primary p-3 rounded-full w-fit mb-4">
                  <part.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-foreground">{part.title}</h3>
                <p className="text-muted-foreground mb-4">{part.description}</p>
                
                <ul className="space-y-2">
                  {part.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white px-8 py-6 text-lg">
            Explore Ecosystem
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}