import { useState, useEffect } from "react";
import { UserProfileCard } from "./UserProfileCard";
import { StatsCard } from "./StatsCard";
import { ReferralCard } from "./ReferralCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useWallet } from "@/context/WalletContext";
export function Dashboard() {
  const { account } = useWallet();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const statsData = [
    {
      title: "Total Profit",
      value: "$ 24.80",
      trend: "up" as const,
      trendValue: "0",
    },
    { title: "Partner", value: "5", trend: "up" as const, trendValue: "0" },
    { title: "Total Team", value: "24", trend: "up" as const, trendValue: "0" },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 px-[5px] sm:px-6 lg:px-8 py-[5px] sm:py-6 md:py-8">
        <div className="grid grid-cols-1 gap-[5px] sm:gap-6 lg:grid-cols-2 lg:gap-8">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[5px] sm:gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-[5px] flex flex-col sm:gap-0 gap-3 sm:px-6 lg:px-8 py-[5px] sm:py-6 md:py-8 space-y-[5px] sm:space-y-6 md:space-y-8">
      {/* Top Row - UserProfileCard & ReferralCard */}
      <div className="grid grid-cols-1 gap-[5px] sm:gap-6 md:gap-8 lg:grid-cols-2 lg:gap-10">
        <UserProfileCard account={account ?? ""} />
        <ReferralCard />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 gap-[5px] sm:gap-6 md:gap-8 lg:gap-10">
        {statsData.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            trendValue={stat.trendValue}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
}
