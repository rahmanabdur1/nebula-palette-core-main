import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Team = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "User***123",
      level: "Level 1",
      members: 8,
      volume: "$4,200",
      status: "Active",
      date: "2024-01-10",
    },
    {
      id: 2,
      name: "User***456",
      level: "Level 1",
      members: 6,
      volume: "$3,800",
      status: "Active",
      date: "2024-01-12",
    },
    {
      id: 3,
      name: "User***789",
      level: "Level 1",
      members: 4,
      volume: "$2,100",
      status: "Active",
      date: "2024-01-15",
    },
    {
      id: 4,
      name: "User***234",
      level: "Level 2",
      members: 3,
      volume: "$1,500",
      status: "Inactive",
      date: "2024-01-08",
    },
    {
      id: 5,
      name: "User***567",
      level: "Level 2",
      members: 3,
      volume: "$850",
      status: "Active",
      date: "2024-01-18",
    },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="glass-card rounded-xl p-6 border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-accent/5 shadow-lg">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Team Members
        </h2>

        <div className="overflow-hidden rounded-lg shadow">
          {/* Table Header */}
          <div className="grid grid-cols-6 bg-gradient-to-r from-primary via-success to-accent text-white font-semibold text-sm sm:text-base">
            <div className="px-4 py-3">Member</div>
            <div className="px-4 py-3">Level</div>
            <div className="px-4 py-3">Team Size</div>
            <div className="px-4 py-3">Volume</div>
            <div className="px-4 py-3">Status</div>
            <div className="px-4 py-3">Join Date</div>
          </div>

          {/* Table Rows */}
          <div className="bg-card/60">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-6 border-b border-border last:border-b-0 hover:bg-primary/10 transition-all text-sm sm:text-base"
              >
                <div className="px-4 py-3 font-semibold text-foreground">
                  {member.name}
                </div>
                <div className="px-4 py-3 text-primary">{member.level}</div>
                <div className="px-4 py-3">{member.members} members</div>
                <div className="px-4 py-3 font-semibold text-success">
                  {member.volume}
                </div>
                <div className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                      member.status === "Active"
                        ? "bg-success/20 text-success"
                        : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
                <div className="px-4 py-3 text-muted-foreground">
                  {member.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
