import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock } from "lucide-react";

export const RoadmapSection = () => {
  const roadmapItems = [
    { date: "March 09, 2024", title: "Creation Date", status: "completed" },
    { date: "March 11, 2024", title: "Power Matrix Program", status: "completed" },
    { date: "May 01, 2024", title: "Power Global Program", status: "completed" },
    { date: "May 15, 2024", title: "MPS Gaming NFT's", status: "completed" },
    { date: "June 05, 2024", title: "Millionaire Royalty Program", status: "completed" },
    { date: "August 10, 2024", title: "Lottery Jackpot", status: "completed" },
    { date: "Nov 01, 2024", title: "MPS Coin Mining", status: "completed" },
    { date: "Dec 20, 2024", title: "MPS Android App", status: "current" },
    { date: "Jan 22, 2025", title: "X-Power Matrix Part-1", status: "upcoming" },
    { date: "Feb 05, 2025", title: "MPS Token Airdrop", status: "upcoming" },
    { date: "March 10, 2025", title: "X-Power Matrix Part-2", status: "upcoming" },
    { date: "April 2025", title: "X-Power Global Program", status: "upcoming" },
    { date: "April 2025", title: "Billionaire Royalty Program", status: "upcoming" },
    { date: "July 2025", title: "AI Robot Staking Project", status: "upcoming" },
    { date: "August 2025", title: "MUSD Airdrop", status: "upcoming" },
    { date: "Q4 2025", title: "Gaming Project", status: "upcoming" },
    { date: "Q1 2026", title: "2X-Power Global Program", status: "upcoming" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "current":
        return <Clock className="h-5 w-5 text-primary animate-pulse" />;
      default:
        return <Calendar className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-400/30 bg-green-400/5";
      case "current":
        return "border-primary glow-effect";
      default:
        return "border-primary/20";
    }
  };

  return (
    <section id="roadmap" className="py-24 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-primary bg-clip-text text-transparent">Roadmap</span>
          </h2>
          <p className="text-muted-foreground">Our journey and upcoming milestones</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-primary transform md:-translate-x-0.5"></div>

            <div className="space-y-8">
              {roadmapItems.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1.5 md:-translate-x-1.5 z-10">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
                  </div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-8 md:text-right' : 'md:ml-8'} md:w-1/2`}>
                    <Card className={`glass-card ${getStatusColor(item.status)} transition-all duration-300 hover:scale-105`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm text-primary font-medium">{item.date}</div>
                          {getStatusIcon(item.status)}
                        </div>
                        <h3 className="text-lg font-bold">{item.title}</h3>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};