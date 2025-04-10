
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/useAuth';
import {
  Calendar,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  User,
  ChevronDown,
  ChevronUp,
  Briefcase,
  UserCog
} from 'lucide-react';

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user, isAdmin, isHR } = useAuth();
  const location = useLocation();
  const [personalExpanded, setPersonalExpanded] = useState(true);
  const [officeExpanded, setOfficeExpanded] = useState(true);

  const adminNav = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Team Members",
      href: "/admin/employees",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Vacation Requests",
      href: "/admin/requests",
      icon: <ClipboardCheck className="h-5 w-5" />,
    },
    {
      title: "Calendar",
      href: "/admin/calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const employeeNav = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "My Requests",
      href: "/dashboard/requests",
      icon: <ClipboardCheck className="h-5 w-5" />,
    },
    {
      title: "Calendar",
      href: "/dashboard/calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5" />,
    },
  ];

  const hrPersonalNav = [
    {
      title: "Dashboard",
      href: "/hr/personal",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "My Requests",
      href: "/hr/personal/requests",
      icon: <ClipboardCheck className="h-5 w-5" />,
    },
    {
      title: "Profile",
      href: "/hr/personal/profile",
      icon: <User className="h-5 w-5" />,
    },
  ];

  const hrOfficeNav = [
    {
      title: "Dashboard",
      href: "/hr/office",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "User Management",
      href: "/hr/office/users",
      icon: <UserCog className="h-5 w-5" />,
    },
    {
      title: "All Requests",
      href: "/hr/office/requests",
      icon: <ClipboardCheck className="h-5 w-5" />,
    },
    {
      title: "Calendar",
      href: "/hr/office/calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
  ];

  const navItems = isAdmin ? adminNav : (isHR ? [] : employeeNav);

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-sidebar transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <Link
          to={isAdmin ? "/admin" : (isHR ? "/hr/personal" : "/dashboard")}
          className="flex items-center gap-2 font-semibold"
        >
          <Calendar className="h-6 w-6 text-vacay-600" />
          {!collapsed && <span className="text-lg font-bold">VacayHub</span>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {isHR ? (
            <>
              {/* Personal Section for HR */}
              <div className="mb-2">
                <button
                  className={cn(
                    "flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    personalExpanded && "bg-sidebar-accent/50"
                  )}
                  onClick={() => !collapsed && setPersonalExpanded(!personalExpanded)}
                >
                  <User className="h-5 w-5" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">Personal</span>
                      {personalExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </>
                  )}
                </button>
                
                {!collapsed && personalExpanded && (
                  <div className="ml-4 mt-1 border-l-2 border-sidebar-border pl-2">
                    {hrPersonalNav.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          location.pathname === item.href &&
                            "bg-sidebar-accent text-sidebar-accent-foreground"
                        )}
                      >
                        {item.icon}
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Office Section for HR */}
              <div className="mb-2">
                <button
                  className={cn(
                    "flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    officeExpanded && "bg-sidebar-accent/50"
                  )}
                  onClick={() => !collapsed && setOfficeExpanded(!officeExpanded)}
                >
                  <Briefcase className="h-5 w-5" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">Office</span>
                      {officeExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </>
                  )}
                </button>
                
                {!collapsed && officeExpanded && (
                  <div className="ml-4 mt-1 border-l-2 border-sidebar-border pl-2">
                    {hrOfficeNav.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          location.pathname === item.href &&
                            "bg-sidebar-accent text-sidebar-accent-foreground"
                        )}
                      >
                        {item.icon}
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            // Regular navigation for Admin and Employee roles
            navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  location.pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "transparent"
                )}
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </Link>
            ))
          )}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-vacay-100 flex items-center justify-center">
            <User className="h-5 w-5 text-vacay-700" />
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-medium">{user?.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={logout}
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
