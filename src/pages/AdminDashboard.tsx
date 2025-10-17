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
  TrendingUp,
  Shield,
  Database,
  Bell,
} from "lucide-react";
import logo from "/logo.png"; // replace with your path

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const stats = [
    { title: "Total Users", value: "12,847", change: "+12%", icon: Users },
    { title: "Revenue", value: "$234,567", change: "+23%", icon: DollarSign },
    { title: "Active Sessions", value: "1,543", change: "+5%", icon: Activity },
    { title: "System Health", value: "99.9%", change: "+0.1%", icon: Shield },
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
        return "bg-blue-500/20 text-blue-500 border border-blue-500/30";
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
        <Skeleton className="h-20 sm:h-24 md:h-28 w-full rounded-xl bg-blue-500/10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="h-24 sm:h-28 md:h-32 w-full rounded-xl bg-blue-500/10"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Skeleton className="h-80 sm:h-96 w-full rounded-xl bg-blue-500/10" />
          <Skeleton className="h-80 sm:h-96 w-full rounded-xl bg-blue-500/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-40 sm:h-48 w-full rounded-xl bg-blue-500/10"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
      {/* Logo & Header */}
      <div className="flex items-center gap-2 px-4 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-700 shadow-lg shadow-blue-600/30">
          <img src={logo} alt="Logo" className="h-6 w-6 object-contain" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-500">
          Admin Dashboard
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-sky-500/5 shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500"
          >
            <CardHeader className="flex justify-between p-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-500">
                {stat.value}
              </div>
              <p className="text-xs text-blue-500 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Users & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Users */}
        <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-sky-500/5 shadow-lg">
          <CardHeader className="p-4">
            <CardTitle className="text-lg sm:text-xl text-blue-500">
              Recent Users
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Latest user registrations and activity
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-lg border border-blue-500/20 bg-white/5 hover:bg-blue-500/5 transition-all duration-300"
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
            <Button
              variant="outline"
              className="w-full mt-3 text-xs sm:text-sm h-8 border-blue-500/40 bg-blue-500/5 hover:bg-blue-500/10"
            >
              View All Users
            </Button>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-sky-500/5 shadow-lg">
          <CardHeader className="p-4">
            <CardTitle className="text-lg sm:text-xl text-blue-500">
              Recent Transactions
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Latest financial activities and payments
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-lg border border-blue-500/20 bg-white/5 hover:bg-blue-500/5 transition-all duration-300"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {tx.user}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {tx.type}
                  </p>
                </div>
                <div className="text-right ml-3">
                  <p className="text-sm font-bold text-blue-500">{tx.amount}</p>
                  <Badge
                    className={`text-xs mt-1 ${getStatusColor(tx.status)}`}
                  >
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full mt-3 text-xs sm:text-sm h-8 border-blue-500/40 bg-blue-500/5 hover:bg-blue-500/10"
            >
              View All Transactions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Management */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            title: "User Management",
            icon: <Users className="h-5 w-5 text-blue-500" />,
            buttons: [
              "Manage User Roles",
              "User Verification",
              "Account Settings",
            ],
          },
          {
            title: "System Control",
            icon: <Database className="h-5 w-5 text-blue-500" />,
            buttons: ["Database Backup", "System Logs", "Performance Monitor"],
          },
          {
            title: "Security",
            icon: <Shield className="h-5 w-5 text-blue-500" />,
            buttons: ["Security Audit", "Access Control", "Fraud Detection"],
          },
        ].map((section, idx) => (
          <Card
            key={idx}
            className="border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-sky-500/5 shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500"
          >
            <CardHeader className="p-4">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-blue-500">
                {section.icon} {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              {section.buttons.map((btn, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="w-full justify-start text-xs sm:text-sm h-8 border-blue-500/40 bg-blue-500/5 hover:bg-blue-500/10"
                >
                  {btn}
                </Button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
