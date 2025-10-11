import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Users,
  TrendingUp,
  Sliders,
  Gamepad2,
  DollarSign,
  ArrowRightLeft,
  ChevronDown,
  ChevronRight,
  Coins,
  Trophy,
  Gift,
  Pickaxe,
  Shield,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "User Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Admin Dashboard",
    url: "/admin",
    icon: Shield,
  },
  {
    title: "Level Team",
    url: "/team",
    icon: Users,
  },
  {
    title: "Programs",
    url: "/programs",
    icon: TrendingUp,
    submenu: [
      { title: "Slots", url: "/slots", icon: Sliders },
      { title: "Dividend Program", url: "/dividend-program", icon: Coins },
    ],
  },
  {
    title: "Program",
    url: "/program",
    icon: TrendingUp,
    submenu: [
      { title: "Transactions", url: "/transactions", icon: ArrowRightLeft },
      { title: "Royalty Salary", url: "/royalty-salary", icon: DollarSign },
    ],
  },
  {
    title: "Lottery",
    url: "/lottery",
    icon: Gift,
  },
  {
    title: "Coin Mining",
    url: "/coin-mining",
    icon: Pickaxe,
  },
  {
    title: "Games",
    url: "/gaming-nft",
    icon: Gamepad2,
  },
  {
    title: "Future Update",
    url: "/future-update",
    icon: Trophy,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [expandedPrograms, setExpandedPrograms] = useState(true);

  const isActive = (path: string) => location.pathname === path;
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-green-500/20 bg-gradient-to-b from-green-500/5 via-emerald-500/3 to-teal-500/5">
      <SidebarContent>
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/30">
            <Coins className="h-6 w-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-transparent bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text">
                FUTURE PRO
              </span>
              <span className="text-sm text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text font-medium">
                SPACE
              </span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.submenu ? (
                  <>
                    <SidebarMenuButton
                      onClick={() => setExpandedPrograms(!expandedPrograms)}
                      className={`relative transition-all duration-500 ${
                        item.submenu.some((sub) => isActive(sub.url))
                          ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-500 border-r-4 border-green-500 shadow-lg shadow-green-500/10"
                          : "text-muted-foreground hover:text-green-500 hover:bg-green-500/10"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && (
                        <>
                          <span className="text-base">{item.title}</span>
                          {expandedPrograms ? (
                            <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-300" />
                          ) : (
                            <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-300" />
                          )}
                        </>
                      )}
                    </SidebarMenuButton>
                    {expandedPrograms && !isCollapsed && (
                      <SidebarMenuSub>
                        {item.submenu.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <NavLink
                                to={subItem.url}
                                className={({ isActive }) =>
                                  `flex items-center gap-2 px-3 py-2 text-sm transition-all duration-500 relative overflow-hidden group ${
                                    isActive
                                      ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-500 font-medium border-r-4 border-green-500 shadow-lg shadow-green-500/10"
                                      : "text-muted-foreground hover:text-green-500 hover:bg-green-500/10"
                                  }`
                                }
                              >
                                {/* Animated background effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <subItem.icon className="h-4 w-4 relative z-10" />
                                <span className="text-base relative z-10">
                                  {subItem.title}
                                </span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </>
                ) : (
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 transition-all duration-500 relative overflow-hidden group ${
                          isActive
                            ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-500 font-medium border-r-4 border-green-500 shadow-lg shadow-green-500/10"
                            : "text-muted-foreground hover:text-green-500 hover:bg-green-500/10"
                        }`
                      }
                    >
                      {/* Animated background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <item.icon className="h-4 w-4 relative z-10" />
                      {!isCollapsed && (
                        <span className="text-base relative z-10">
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
