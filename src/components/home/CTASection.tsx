import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Users } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary via-success to-warning relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-white/5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative container mx-auto px-6 text-center text-white">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Join the Revolution
        </h2>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
          Be part of the future of gaming. Start your Web3 gaming journey today 
          and unlock unlimited possibilities.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold">
            <Users className="mr-2 h-5 w-5" />
            Join Community
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
            <Download className="mr-2 h-5 w-5" />
            Download Now
          </Button>
        </div>
        
        {/* Social proof */}
        <div className="text-center opacity-80">
          <p className="text-lg mb-4">Trusted by gaming enthusiasts worldwide</p>
          <div className="flex justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>50,000+ Active Players</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>1,000+ Games Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>$2M+ Assets Traded</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}