import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gamepad2, Coins, Shield, TrendingUp } from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Gaming NFTs",
      description: "Revolutionary gaming NFTs that bridge virtual and real world value"
    },
    {
      icon: <Coins className="h-8 w-8" />,
      title: "Token Economy",
      description: "Comprehensive token ecosystem with staking, mining and rewards"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Platform",
      description: "Enterprise-grade security with blockchain transparency"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "High ROI",
      description: "Maximum return on investment with proven track record"
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Gamifying of the{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              metaverse
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            NFTs and the metaverse are the future, but investing in the space isn't easy. We make it simple.
          </p>
          <Button size="lg" className="glow-effect">
            Registration
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="text-primary mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};