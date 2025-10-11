import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Download } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-success/10"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-success to-primary rounded-full opacity-10 animate-float" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-warning rounded-full opacity-15 animate-float" style={{ animationDelay: "2s" }}></div>
      
      <div className="relative container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-success to-warning bg-clip-text text-transparent mb-6">
          Empowering The Future of <span className="text-primary">Web3 Gaming</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Revolutionize the gaming industry with our holistic ecosystem that leverages web3 technology. 
          Empower gamers and developers with seamless interaction, e-sport engagement, and asset monetization.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white px-8 py-6 text-lg">
            <Play className="mr-2 h-5 w-5" />
            Start Gaming
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button variant="outline" size="lg" className="border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg">
            <Download className="mr-2 h-5 w-5" />
            Download Launcher
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">1000+</div>
            <div className="text-sm text-muted-foreground">Active Games</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success">50K+</div>
            <div className="text-sm text-muted-foreground">Players</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning">$2M+</div>
            <div className="text-sm text-muted-foreground">Assets Traded</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-destructive">500+</div>
            <div className="text-sm text-muted-foreground">Developers</div>
          </div>
        </div>
      </div>
    </section>
  );
}