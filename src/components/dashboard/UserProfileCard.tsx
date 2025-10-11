import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserProfileCard() {
  return (
    <div
      className="glass-card rounded-xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 shadow-xl 
                    p-4 sm:p-4 md:p-6 lg:p-8
                    w-full  mx-auto "
    >
      <div className="flex flex-col items-center space-y-4 sm:space-y-4 md:space-y-3">
        {/* Avatar with gradient ring */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-[2px] sm:p-[3px] md:p-[4px] lg:p-[5px]">
            <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 rounded-full bg-background"></div>
          </div>
          <Avatar className="relative z-10 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-muted text-xl sm:text-2xl md:text-3xl">
              RX
            </AvatarFallback>
          </Avatar>
        </div>

        {/* User Info */}
        <div className="text-center space-y-1 sm:space-y-2 md:space-y-3">
          <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
            ID :{" "}
            <span className="text-foreground font-mono break-all">
              1856131324
            </span>
          </div>
          <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
            Wallet :{" "}
            <span className="text-foreground font-mono break-all">
              0x77...0efC
            </span>
          </div>
          <div className="text-base sm:text-lg md:text-xl font-semibold text-foreground">
            Name : <span className="text-green-500">RX T</span>
          </div>
          <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
            Joined on : <span className="text-foreground">31/08/2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}
