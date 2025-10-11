"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const ITEMS_PER_PAGE = 3;

// Type definition for team member
interface TeamMember {
  id: number;
  name: string;
  level: string;
  members: number;
  volume: string;
  status: string;
}

const Team = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "User***123",
      level: "Level 1",
      members: 8,
      volume: "$4,200",
      status: "Active",
    },
    {
      id: 2,
      name: "User***456",
      level: "Level 1",
      members: 6,
      volume: "$3,800",
      status: "Active",
    },
    {
      id: 3,
      name: "User***789",
      level: "Level 1",
      members: 4,
      volume: "$2,100",
      status: "Active",
    },
    {
      id: 4,
      name: "User***234",
      level: "Level 2",
      members: 3,
      volume: "$1,500",
      status: "Inactive",
    },
    {
      id: 5,
      name: "User***567",
      level: "Level 2",
      members: 3,
      volume: "$850",
      status: "Active",
    },
    {
      id: 6,
      name: "User***901",
      level: "Level 3",
      members: 10,
      volume: "$5,200",
      status: "Active",
    },
  ];

  const totalPages = Math.ceil(teamMembers.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const paginatedData = teamMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <Skeleton className="h-80 sm:h-96 w-full rounded-xl bg-green-500/10" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="glass-card rounded-xl p-4 sm:p-6 border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 shadow-xl relative overflow-hidden">
        {/* Decorative floating bars */}
        <div className="absolute top-2 right-2 opacity-20">
          <div className="flex gap-1 sm:gap-2 md:gap-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-2 sm:h-8 sm:w-3 md:h-10 md:w-4 rounded-full animate-float"
                style={{
                  background: `linear-gradient(45deg, hsl(142, 76%, 36%), hsl(142, 70%, 45%))`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold  mb-4 sm:mb-6 text-center bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
          Team Members
        </h2>

        {/* Table */}
        <div className="rounded-lg shadow-lg overflow-hidden border border-green-500/20">
          {/* Header */}
          <div className="grid grid-cols-5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-semibold text-xs sm:text-sm md:text-base">
            <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">Member</div>
            <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">Level</div>
            <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">Team Size</div>
            <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">Status</div>
            <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center">
              Action
            </div>
          </div>

          {/* Rows */}
          <div className="bg-gradient-to-br from-green-50/5 to-emerald-50/5">
            {paginatedData.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-5 border-b border-green-500/10 last:border-b-0 hover:bg-green-500/10 transition-all text-xs sm:text-sm md:text-base group"
              >
                <div className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 font-semibold text-foreground truncate group-hover:text-green-600 transition-colors">
                  {member.name}
                </div>
                <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-green-500 font-medium truncate group-hover:text-green-600 transition-colors">
                  {member.level}
                </div>
                <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 truncate text-muted-foreground group-hover:text-green-500 transition-colors">
                  {member.members} members
                </div>
                <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                      member.status === "Active"
                        ? "bg-green-500/20 text-green-400 border-green-500/30 shadow-lg shadow-green-500/10"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
                <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 flex justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedMember(member);
                      setShowDetails(true);
                    }}
                    className="border-green-500/40 hover:border-green-500 bg-green-500/15 hover:bg-green-500/25 text-green-500 hover:text-green-400 transition-all flex items-center gap-1 h-7 sm:h-8 text-xs shadow-md hover:shadow-lg hover:shadow-green-500/20 group/btn"
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 group-hover/btn:scale-110 transition-transform" />
                    <span className="hidden sm:inline">View</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-1 sm:gap-2 mt-4 sm:mt-6 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-green-500/50 text-green-500 hover:bg-green-500/15 hover:border-green-500/70 hover:text-green-400 h-8 sm:h-9 px-2 sm:px-3 text-xs shadow-md transition-all"
          >
            Prev
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(i + 1)}
              className={`h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-xs transition-all ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/40"
                  : "border-green-500/40 hover:bg-green-500/10 text-green-500 hover:text-green-400 shadow-md"
              }`}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-green-500/50 text-green-500 hover:bg-green-500/15 hover:border-green-500/70 hover:text-green-400 h-8 sm:h-9 px-2 sm:px-3 text-xs shadow-md transition-all"
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent
          className="max-w-lg sm:max-w-2xl md:max-w-3xl glass-card border-2 border-green-500/40 
  bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-black/80 text-foreground
  shadow-2xl rounded-2xl  overflow-hidden flex flex-col justify-center items-center
  mx-auto my-auto fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Modal decorative bars */}
          <div className="absolute top-2 right-2 opacity-15">
            <div className="flex gap-1">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-1 rounded-full animate-float"
                  style={{
                    background: `linear-gradient(45deg, hsl(142, 76%, 36%), hsl(142, 70%, 45%))`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <DialogHeader className="text-center">
            <DialogTitle className="text-green-400 text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Level-1 Team Details
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 border border-green-500/40 rounded-lg overflow-hidden shadow-lg shadow-green-500/10">
            {/* Table Header - Center aligned */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-green-500/80 to-emerald-500/80 text-white font-semibold text-sm border-b border-green-500/40 text-center">
              <div className="px-3 py-2 border-r border-green-500/30">Sno</div>
              <div className="px-3 py-2 border-r border-green-500/30">User</div>
              <div className="px-3 py-2">JoinedOn</div>
            </div>

            {/* Table Rows */}
            {[
              { id: 1, user: "4703085537", joined: "381d ago" },
              { id: 2, user: "9648800900", joined: "395d ago" },
              { id: 3, user: "9194599446", joined: "400d ago" },
              { id: 4, user: "1542088475", joined: "401d ago" },
              { id: 5, user: "2064774007", joined: "402d ago" },
            ].map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-3 border-t border-green-500/20 text-sm text-white text-center hover:bg-green-500/15 transition group/row"
              >
                <div className="px-3 py-2 border-r border-green-500/20 group-hover/row:text-green-300 transition-colors">
                  {item.id}
                </div>
                <div className="px-3 py-2 border-r border-green-500/20 text-green-400 font-semibold group-hover/row:text-green-300 transition-colors">
                  {item.user}
                </div>
                <div className="px-3 py-2 group-hover/row:text-green-300 transition-colors">
                  {item.joined}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <DialogFooter className="flex justify-between items-center mt-3">
            <Button
              variant="outline"
              className="border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-500/70 text-xs shadow-md"
            >
              Prev
            </Button>
            <p className="text-xs text-green-400 font-semibold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
              Page: 1
            </p>
            <Button
              variant="outline"
              className="border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-500/70 text-xs shadow-md"
            >
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Team;
