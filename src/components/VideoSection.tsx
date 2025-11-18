import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

export const VideoSection = () => {
  const videos = [
    {
      id: "92TF1Qc_OiQ",
      title: "Meta Pro Space Introduction",
      thumbnail: "https://img.youtube.com/vi/92TF1Qc_OiQ/maxresdefault.jpg"
    },
    {
      id: "EyJqcZd_IaQ", 
      title: "Platform Overview",
      thumbnail: "https://img.youtube.com/vi/EyJqcZd_IaQ/maxresdefault.jpg"
    },
    {
      id: "8Y0kc4WATMU",
      title: "Gaming NFTs Explained",
      thumbnail: "https://img.youtube.com/vi/8Y0kc4WATMU/maxresdefault.jpg"
    },
    {
      id: "SqPMRIAX9gI",
      title: "Token Economics",
      thumbnail: "https://img.youtube.com/vi/SqPMRIAX9gI/maxresdefault.jpg"
    },
    {
      id: "SimDYsh7LGs",
      title: "Roadmap & Future",
      thumbnail: "https://img.youtube.com/vi/SimDYsh7LGs/maxresdefault.jpg"
    }
  ];

  const openVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Platform <span className="gradient-primary bg-clip-text text-transparent">Testimonials</span>
          </h2>
          <p className="text-muted-foreground">Watch our community success stories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.slice(0, 5).map((video, index) => (
            <Card 
              key={index}
              className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => openVideo(video.id)}
            >
              <CardContent className="p-0 relative">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center glow-effect">
                      <Play className="h-6 w-6 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonial Text */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <div className="glass-card p-8 rounded-lg">
            <div className="text-6xl text-primary mb-4">"</div>
            <p className="text-xl text-muted-foreground mb-6">
              Meta Pro Space has revolutionized our approach to blockchain gaming. The platform's 
              comprehensive ecosystem and robust technology stack make it the perfect launchpad 
              for innovative gaming projects.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full"></div>
              <div>
                <div className="font-bold">Community Leader</div>
                <div className="text-sm text-muted-foreground">Early Investor</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};