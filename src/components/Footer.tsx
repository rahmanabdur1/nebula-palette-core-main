import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-primary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
              Meta Pro Space
            </div>
            <p className="text-muted-foreground max-w-md">
              The Ultimate Blockchain Gaming Launchpad – Powering 50+ Projects with 
              Unrivaled Success, Maximum ROI, and Industry-Leading Innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#home" className="block text-muted-foreground hover:text-primary transition-colors">Home</a>
              <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#roadmap" className="block text-muted-foreground hover:text-primary transition-colors">Roadmap</a>
              <a href="#partners" className="block text-muted-foreground hover:text-primary transition-colors">Partners</a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Whitepaper</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Documentation</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">FAQs</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary/20" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm">
            © 2024 Meta Pro Space. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};