import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  DollarSign,
  Activity,
  Settings,
  TrendingUp,
  Shield,
  Database,
  Bell,
} from "lucide-react";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+12%",
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Revenue",
      value: "$234,567",
      change: "+23%",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Active Sessions",
      value: "1,543",
      change: "+5%",
      icon: Activity,
      color: "text-green-500",
    },
    {
      title: "System Health",
      value: "99.9%",
      change: "+0.1%",
      icon: Shield,
      color: "text-green-500",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Pending",
      joinDate: "2024-01-14",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      status: "Active",
      joinDate: "2024-01-13",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      status: "Inactive",
      joinDate: "2024-01-12",
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      user: "Alice Brown",
      amount: "$1,250",
      type: "Dividend",
      status: "Completed",
      date: "2024-01-15",
    },
    {
      id: 2,
      user: "Bob Green",
      amount: "$850",
      type: "Mining",
      status: "Pending",
      date: "2024-01-15",
    },
    {
      id: 3,
      user: "Charlie Red",
      amount: "$2,100",
      type: "Lottery",
      status: "Completed",
      date: "2024-01-14",
    },
    {
      id: 4,
      user: "Diana Blue",
      amount: "$675",
      type: "Royalty",
      status: "Processing",
      date: "2024-01-14",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Completed":
        return "bg-green-500/20 text-green-500 border border-green-500/30";
      case "Pending":
      case "Processing":
        return "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30";
      case "Inactive":
        return "bg-red-500/20 text-red-500 border border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-500 border border-gray-500/30";
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6">
        <Skeleton className="h-20 sm:h-24 md:h-28 w-full rounded-xl bg-green-500/10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="h-24 sm:h-28 md:h-32 w-full rounded-xl bg-green-500/10"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Skeleton className="h-80 sm:h-96 w-full rounded-xl bg-green-500/10" />
          <Skeleton className="h-80 sm:h-96 w-full rounded-xl bg-green-500/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-40 sm:h-48 w-full rounded-xl bg-green-500/10"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="glass-card rounded-xl p-4 sm:p-5 md:p-6 border-2 border-green-500/40 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/5 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 animate-pulse-slow"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 relative z-10">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text mb-1 sm:mb-2">
              Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage your platform and monitor system performance
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 flex-wrap">
            <Button
              variant="outline"
              className="gap-1 sm:gap-2 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3 border-green-500/40 bg-green-500/5 hover:bg-green-500/10"
            >
              <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              Notifications
            </Button>
            <Button
              variant="outline"
              className="gap-1 sm:gap-2 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3 border-green-500/40 bg-green-500/5 hover:bg-green-500/10"
            >
              <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 shadow-lg hover:shadow-green-500/20 hover:scale-105 transition-all duration-500"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
                {stat.value}
              </div>
              <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Users */}
        <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
              Recent Users
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Latest user registrations and activity
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-green-500/20 bg-white/5 hover:bg-green-500/5 transition-all duration-300"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="text-right ml-3">
                    <Badge className={`text-xs ${getStatusColor(user.status)}`}>
                      {user.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {user.joinDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-3 sm:mt-4 border-green-500/40 bg-green-500/5 hover:bg-green-500/10 text-xs sm:text-sm h-8 sm:h-9"
            >
              View All Users
            </Button>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
              Recent Transactions
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Latest financial activities and payments
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-green-500/20 bg-white/5 hover:bg-green-500/5 transition-all duration-300"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {transaction.user}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {transaction.type}
                    </p>
                  </div>
                  <div className="text-right ml-3">
                    <p className="text-sm font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
                      {transaction.amount}
                    </p>
                    <Badge
                      className={`text-xs mt-1 ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-3 sm:mt-4 border-green-500/40 bg-green-500/5 hover:bg-green-500/10 text-xs sm:text-sm h-8 sm:h-9"
            >
              View All Transactions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Management */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 shadow-lg hover:shadow-green-500/20 hover:scale-105 transition-all duration-500">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text flex items-center gap-2">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 space-y-2 sm:space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9 border-green-500/40 bg-green-500/5 hover:bg-green-500/10"
            >
              Manage User Roles
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9 border-green-500/40 bg-green-500/5 hover:bg-green-500/10"
            >
              User Verification
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9 border-green-500/40 bg-green-500/5 hover:bg-green-500/10"
            >
              Account Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 shadow-lg hover:shadow-green-500/20 hover:scale-105 transition-all duration-500">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text flex items-center gap-2">
              <Database className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              System Control
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 space-y-2 sm:space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9 border-green-500/40 bg-green-500/5 hover:bg-green-500/10"
            >
              Database Backup
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9 border-green-500/40 bg-green-500/5 hover:bg-green-500/10"
            >
              System Logs
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9 border-green-500/40 bg-green-500/5 hover:bg-green-500/10"
            >
              Performance Monitor
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 shadow-lg hover:shadow-green-500/20 hover:scale-105 transition-all duration-500">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text flex items-center gap-2">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 space-y-2 sm:space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9 border-green-500/40 bg-green-500/5 hover:bg-green-500/10"
            >
              Security Audit
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9 border-green-500/40 bg-green-500/5 hover:bg-green-500/10"
            >
              Access Control
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9 border-green-500/40 bg-green-500/5 hover:bg-green-500/10"
            >
              Fraud Detection
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
