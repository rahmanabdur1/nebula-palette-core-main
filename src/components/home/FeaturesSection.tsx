import { Gamepad2, Wallet, TrendingUp, Users, Shield, Zap } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Gamepad2,
      title: "Gaming Launcher",
      description: "Access thousands of Web3 games through our unified launcher platform with seamless gameplay experience.",
      gradient: "from-primary to-success"
    },
    {
      icon: Wallet,
      title: "Digital Asset Ownership",
      description: "True ownership of in-game assets, characters, and items through blockchain technology and NFTs.",
      gradient: "from-success to-warning"
    },
    {
      icon: TrendingUp,
      title: "Asset Marketplace",
      description: "Trade, buy, and sell your gaming assets in our decentralized marketplace with real value.",
      gradient: "from-warning to-destructive"
    },
    {
      icon: Users,
      title: "Community & E-Sports",
      description: "Join competitive gaming communities, participate in tournaments, and climb leaderboards.",
      gradient: "from-destructive to-primary"
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "All transactions are secured by blockchain technology ensuring transparency and safety.",
      gradient: "from-primary to-warning"
    },
    {
      icon: Zap,
      title: "Developer Tools",
      description: "Comprehensive SDK and APIs for developers to integrate Web3 features into their games.",
      gradient: "from-success to-destructive"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Revolutionary Gaming <span className="text-primary">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the cutting-edge features that make our Web3 gaming ecosystem unique and powerful.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="glass-card p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
            >
              <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${feature.gradient} mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}