import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Users,
  TrendingUp,
  Sliders,
  UserCheck,
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
  Globe,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
    <Sidebar className="border-r border-border bg-sidebar">
      <SidebarContent>
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary">
            <Coins className="h-6 w-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">
                FUTURE PRO
              </span>
              <span className="text-sm text-warning font-medium">SPACE</span>
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
                      className={`${
                        item.submenu.some((sub) => isActive(sub.url))
                          ? "bg-success/20 text-success"
                          : ""
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && (
                        <>
                          <span className="text-base">{item.title}</span>
                          {expandedPrograms ? (
                            <ChevronDown className="ml-auto h-4 w-4" />
                          ) : (
                            <ChevronRight className="ml-auto h-4 w-4" />
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
                                  `flex items-center gap-2 px-3 py-2 text-sm ${
                                    isActive
                                      ? "bg-success/20 text-success font-medium"
                                      : "text-muted-foreground hover:text-foreground"
                                  }`
                                }
                              >
                                <subItem.icon className="h-4 w-4" />
                                <span className="text-base">
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
                        `flex items-center gap-2 px-3 py-2 ${
                          isActive
                            ? "bg-success/20 text-success font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && (
                        <span className="text-base">{item.title}</span>
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
