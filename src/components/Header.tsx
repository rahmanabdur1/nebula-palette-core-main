import { Search, Bell, Menu, QrCode, Copy } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-border bg-card px-6">
      <SidebarTrigger className="h-8 w-8" />
      
      <div className="flex flex-1 items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="User Id"
            className="pl-9 bg-muted border-border"
          />
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          {/* QR Code */}
          <Button variant="outline" size="icon" className="h-9 w-9">
            <QrCode className="h-4 w-4" />
          </Button>
          
          {/* Copy */}
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Copy className="h-4 w-4" />
          </Button>
          
          {/* Notifications */}
          <Button variant="outline" size="icon" className="relative h-9 w-9">
            <Bell className="h-4 w-4" />
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success"></div>
          </Button>
        </div>
      </div>
    </header>
  );
}