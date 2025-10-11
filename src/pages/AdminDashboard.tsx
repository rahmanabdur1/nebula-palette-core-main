import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, DollarSign, Activity, Settings, TrendingUp, Shield, Database, Bell } from "lucide-react";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);
  const stats = [
    { title: "Total Users", value: "12,847", change: "+12%", icon: Users, color: "text-primary" },
    { title: "Revenue", value: "$234,567", change: "+23%", icon: DollarSign, color: "text-success" },
    { title: "Active Sessions", value: "1,543", change: "+5%", icon: Activity, color: "text-warning" },
    { title: "System Health", value: "99.9%", change: "+0.1%", icon: Shield, color: "text-primary" },
  ];

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Pending", joinDate: "2024-01-14" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "Active", joinDate: "2024-01-13" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", status: "Inactive", joinDate: "2024-01-12" },
  ];

  const recentTransactions = [
    { id: 1, user: "Alice Brown", amount: "$1,250", type: "Dividend", status: "Completed", date: "2024-01-15" },
    { id: 2, user: "Bob Green", amount: "$850", type: "Mining", status: "Pending", date: "2024-01-15" },
    { id: 3, user: "Charlie Red", amount: "$2,100", type: "Lottery", status: "Completed", date: "2024-01-14" },
    { id: 4, user: "Diana Blue", amount: "$675", type: "Royalty", status: "Processing", date: "2024-01-14" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Completed":
        return "bg-success/20 text-success";
      case "Pending":
      case "Processing":
        return "bg-warning/20 text-warning";
      case "Inactive":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-28 w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96 w-full rounded-xl" />
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-xl p-6 border-2 border-primary/40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your platform and monitor system performance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </Button>
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Users</CardTitle>
            <CardDescription>Latest user registrations and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-lg border border-primary/20">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{user.joinDate}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Users
            </Button>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Transactions</CardTitle>
            <CardDescription>Latest financial activities and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border border-primary/20">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{transaction.user}</p>
                    <p className="text-xs text-muted-foreground">{transaction.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-success">{transaction.amount}</p>
                    <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Transactions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Management */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Manage User Roles
            </Button>
            <Button variant="outline" className="w-full justify-start">
              User Verification
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Account Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              System Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Database Backup
            </Button>
            <Button variant="outline" className="w-full justify-start">
              System Logs
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Performance Monitor
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Security Audit
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Access Control
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Fraud Detection
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;