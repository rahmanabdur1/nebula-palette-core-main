import { Badge } from "@/components/ui/badge";

export function StatusCards() {
  const statuses = [
    { title: "Millionaire", status: "Active", active: true },
    { title: "Billionaire", status: "Inactive", active: false },
    { title: "AI Robot", status: "Inactive", active: false },
  ];

  return (
    <div className="glass-card rounded-lg p-4 border border-primary/20">
      <div className="grid grid-cols-3 gap-2">
        {statuses.map((item) => (
          <div key={item.title} className="text-center space-y-2">
            <div className="text-sm font-medium text-foreground">{item.title}</div>
            <Badge
              variant={item.active ? "default" : "secondary"}
              className={
                item.active
                  ? "bg-success/20 text-success border-success/50"
                  : "bg-destructive/20 text-destructive border-destructive/50"
              }
            >
              {item.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}