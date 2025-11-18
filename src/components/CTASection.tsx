import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Star, Zap } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Icons */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="animate-float">
              <Rocket className="h-12 w-12 text-primary" />
            </div>
            <div className="animate-float" style={{ animationDelay: '0.5s' }}>
              <Star className="h-12 w-12 text-accent" />
            </div>
            <div className="animate-float" style={{ animationDelay: '1s' }}>
              <Zap className="h-12 w-12 text-primary-glow" />
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-glow">
            Become an early investor in the top{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Blockchain Games, NFTs and Metaverses
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Meta Pro Space: The Ultimate Blockchain Gaming Launchpad – Powering 50+ Projects with Unrivaled Success,
            Maximum ROI, and Industry-Leading Innovation!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-12 py-6 glow-effect animate-pulse-glow group"
            >
              HOW TO START
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-12 py-6 border-primary/50 hover:border-primary hover:glow-effect transition-all"
            >
              Learn More
            </Button>
          </div>

          {/* Features List */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-lg">
              <Rocket className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">50+ Projects</h3>
              <p className="text-muted-foreground">Carefully vetted blockchain gaming projects</p>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <Star className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Maximum ROI</h3>
              <p className="text-muted-foreground">Industry-leading returns on investment</p>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <Zap className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-muted-foreground">Cutting-edge blockchain technology</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};