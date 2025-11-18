import techLogos from "@/assets/tech-logos.png";

export const TechPartnersSection = () => {
  const partners = [
    "Certik", "Meta", "Hindawi", "Tenderly", "Alchemy", 
    "Coinsbench", "Moralis", "InterFi", "Uniswap", 
    "PancakeSwap", "Token Pocket", "Trust Wallet", "MetaMask"
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technology <span className="gradient-primary bg-clip-text text-transparent">Partners</span>
          </h2>
          <p className="text-muted-foreground">Trusted by industry leaders</p>
        </div>

        {/* Technology Stack Showcase */}
        <div className="mb-16 text-center">
          <img 
            src={techLogos} 
            alt="Technology Partners" 
            className="mx-auto max-w-full h-auto rounded-lg opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="glass-card p-6 rounded-lg text-center hover:glow-effect transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">
                  {partner.charAt(0)}
                </span>
              </div>
              <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {partner}
              </p>
            </div>
          ))}
        </div>

        {/* Key Technologies */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-lg text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Blockchain Security</h3>
            <p className="text-muted-foreground">Enterprise-grade security with Certik audits and blockchain transparency</p>
          </div>
          
          <div className="glass-card p-8 rounded-lg text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold mb-3">DeFi Integration</h3>
            <p className="text-muted-foreground">Seamless integration with major DeFi protocols and DEX platforms</p>
          </div>
          
          <div className="glass-card p-8 rounded-lg text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-xl font-bold mb-3">NFT Ecosystem</h3>
            <p className="text-muted-foreground">Advanced NFT marketplace with gaming integration and utility</p>
          </div>
        </div>
      </div>
    </section>
  );
};