import { CheckCircle } from "lucide-react";

export function Web3BenefitsSection() {
  const benefits = [
    {
      title: "True Asset Ownership",
      description: "Players have complete control over their digital assets through blockchain technology."
    },
    {
      title: "Interoperability",
      description: "Use your assets across multiple games and platforms within our ecosystem."
    },
    {
      title: "Play-to-Earn",
      description: "Earn real value while playing games and participating in the ecosystem."
    },
    {
      title: "Decentralized Governance", 
      description: "Community-driven decisions and transparent development processes."
    },
    {
      title: "Cross-Platform Gaming",
      description: "Seamless gaming experience across different devices and platforms."
    },
    {
      title: "Asset Monetization",
      description: "Turn your gaming skills and assets into real-world value."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-success/10 to-warning/10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-primary">Web3 Gaming</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the next generation of gaming with unprecedented opportunities 
              for players and developers in the decentralized ecosystem.
            </p>
            
            <div className="space-y-4">
              {benefits.slice(0, 3).map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            {benefits.slice(3).map((benefit) => (
              <div key={benefit.title} className="glass-card p-4 rounded-lg border border-primary/20">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}