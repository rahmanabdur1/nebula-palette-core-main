import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserProfileCard() {
  return (
    <div
      className="glass-card rounded-xl border-2 border-blue-500/30 
                 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-cyan-500/5 
                 shadow-xl p-3 sm:p-4 md:p-5 lg:p-6 w-full mx-auto"
    >
      <div
        className="flex flex-row items-center justify-start 
                   gap-2 sm:gap-2 md:gap-3 lg:gap-4"
      >
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-[2px] sm:p-[2px] md:p-[3px] lg:p-[4px]">
            <div className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full bg-background"></div>
          </div>

          <Avatar className="relative z-10 h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24">
            <AvatarImage src="/logo.png" alt="User Avatar" />
            <AvatarFallback className="bg-muted text-lg sm:text-xl md:text-2xl">
              RX
            </AvatarFallback>
          </Avatar>
        </div>

        {/* User Info */}
        <div className="md:flex flex-col grid grid-cols-2 justify-center space-y-[1px] p-0 m-0">
          <div className="text-[10px] sm:text-xs font-semibold text-foreground">
            ID:{" "}
            <span className="font-mono font-normal text-muted-foreground">
              1856131324
            </span>
          </div>
          <div className="text-[10px] sm:text-xs font-semibold text-foreground">
            Wallet:{" "}
            <span className="font-mono font-normal text-muted-foreground">
              0x77...0efC
            </span>
          </div>
          <div className="text-xs sm:text-sm font-semibold text-foreground">
            Username: <span className="text-blue-500 font-medium">RX T</span>
          </div>
          <div className="text-[10px] sm:text-xs font-semibold text-foreground">
            Joined on:{" "}
            <span className="font-normal text-muted-foreground">
              31/08/2024
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
