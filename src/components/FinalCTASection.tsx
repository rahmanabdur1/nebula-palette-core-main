import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, Users, Zap } from "lucide-react";

export const FinalCTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-accent rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-primary-glow rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-glow">
            <span className="gradient-primary bg-clip-text text-transparent">
              Register Yourself
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12">
            Full support in project incubation
          </p>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-card border-primary/20 hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Expert Support</h3>
                <p className="text-muted-foreground text-sm">
                  Dedicated team guidance throughout your journey
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-primary/20 hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Zap className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Fast Track</h3>
                <p className="text-muted-foreground text-sm">
                  Accelerated project development and launch
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-primary/20 hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Premium Access</h3>
                <p className="text-muted-foreground text-sm">
                  Exclusive access to premium features and tools
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <Button 
            size="lg" 
            className="text-xl px-12 py-8 glow-effect animate-pulse-glow group mb-8"
          >
            Apply Now
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Additional Info */}
          <div className="glass-card p-8 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">What You Get:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Project Incubation Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Technical Development Aid</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Marketing & Promotion</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Community Building</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Funding Opportunities</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Strategic Partnerships</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};