import { Card, CardContent } from "@/components/ui/card";

export const PartnersSection = () => {
  const partners = [
    { name: "Certik", logo: "🛡️", description: "Blockchain Security Audit" },
    { name: "Meta", logo: "🔵", description: "Metaverse Integration" },
    { name: "Hindawi", logo: "📚", description: "Research & Development" },
    { name: "Tenderly", logo: "🔧", description: "Smart Contract Monitoring" },
    { name: "Alchemy", logo: "⚗️", description: "Blockchain Infrastructure" },
    { name: "Coinsbench", logo: "📈", description: "Market Analysis" },
    { name: "Moralis", logo: "⚡", description: "Web3 Development" },
    { name: "InterFi", logo: "🌐", description: "DeFi Solutions" },
    { name: "Uniswap", logo: "🦄", description: "Decentralized Exchange" },
    { name: "PancakeSwap", logo: "🥞", description: "BSC DEX Platform" },
    { name: "Token Pocket", logo: "💼", description: "Multi-Chain Wallet" },
    { name: "Trust Wallet", logo: "🔐", description: "Secure Wallet" },
    { name: "MetaMask", logo: "🦊", description: "Web3 Wallet" },
    { name: "MPS", logo: "🚀", description: "Native Platform" }
  ];

  return (
    <section id="partners" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="gradient-primary bg-clip-text text-transparent">Partners</span>
          </h2>
          <p className="text-muted-foreground">Collaborating with industry leaders for maximum impact</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {partners.map((partner, index) => (
            <Card 
              key={index}
              className="glass-card border-primary/20 hover:border-primary/40 hover:glow-effect transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {partner.logo}
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {partner.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {partner.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partnership Benefits */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Strategic Alliances</h3>
            <p className="text-muted-foreground">Building strong partnerships with leading blockchain companies</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🌐</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Global Network</h3>
            <p className="text-muted-foreground">Expanding our reach through international collaborations</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Innovation Hub</h3>
            <p className="text-muted-foreground">Fostering innovation through collaborative development</p>
          </div>
        </div>
      </div>
    </section>
  );
};