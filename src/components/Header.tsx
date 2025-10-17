import { Search, Bell, Menu, QrCode, Copy } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-blue-500/20 bg-gradient-to-r from-blue-500/5 via-indigo-500/3 to-cyan-500/5 px-6 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-cyan-500/10 animate-pulse-slow opacity-50"></div>

      <div className="relative z-10 flex flex-1 items-center gap-4">
        {/* Sidebar Trigger */}
        <SidebarTrigger className="h-9 w-9 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 hover:border-blue-500/50 text-blue-500 transition-all duration-500 hover:scale-105" />

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500" />
          <Input
            placeholder="User Id"
            className="pl-9 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-500/30 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 text-foreground transition-all duration-500"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          {/* QR Code */}
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 hover:border-blue-500/50 text-blue-500 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <QrCode className="h-4 w-4" />
          </Button>

          {/* Copy */}
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 hover:border-blue-500/50 text-blue-500 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <Copy className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <Button
            variant="outline"
            size="icon"
            className="relative h-10 w-10 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 hover:border-blue-500/50 text-blue-500 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <Bell className="h-4 w-4" />
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/40"></div>
          </Button>
        </div>
      </div>
    </header>
  );
}
