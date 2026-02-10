import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Boxes,
  FolderTree,
  Tags,
  Percent,
  CreditCard,
  RotateCcw,
  Star,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Products", href: "/admin/products", icon: Package },
  { title: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { title: "Users", href: "/admin/users", icon: Users },
];

const inventoryNavItems: NavItem[] = [
  { title: "Inventory", href: "/admin/inventory", icon: Boxes },
  { title: "Categories", href: "/admin/categories", icon: FolderTree },
  { title: "Brands", href: "/admin/brands", icon: Tags },
];

const marketingNavItems: NavItem[] = [
  { title: "Discounts", href: "/admin/discounts", icon: Percent },
];

const financeNavItems: NavItem[] = [
  { title: "Payments", href: "/admin/payments", icon: CreditCard },
  { title: "Refunds", href: "/admin/refunds", icon: RotateCcw },
];

const engagementNavItems: NavItem[] = [
  { title: "Reviews", href: "/admin/reviews", icon: Star },
  { title: "Notifications", href: "/admin/notifications", icon: Bell },
];

const settingsNavItems: NavItem[] = [
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

interface NavSectionProps {
  title?: string;
  items: NavItem[];
  collapsed: boolean;
}

const NavSection = ({ title, items, collapsed }: NavSectionProps) => {
  const location = useLocation();

  return (
    <div className="px-3 py-2">
      {title && !collapsed && (
        <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
      )}
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent/50",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", collapsed && "mx-auto")} />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col border-r bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <NavLink to="/" className="flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold text-primary">KyoudaiMart</span>
          </NavLink>
        )}
        {collapsed && (
          <NavLink to="/" className="mx-auto">
            <Store className="h-6 w-6 text-primary" />
          </NavLink>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-2">
        <NavSection items={mainNavItems} collapsed={collapsed} />
        <Separator className="my-2" />
        <NavSection title="Inventory" items={inventoryNavItems} collapsed={collapsed} />
        <Separator className="my-2" />
        <NavSection title="Marketing" items={marketingNavItems} collapsed={collapsed} />
        <Separator className="my-2" />
        <NavSection title="Finance" items={financeNavItems} collapsed={collapsed} />
        <Separator className="my-2" />
        <NavSection title="Engagement" items={engagementNavItems} collapsed={collapsed} />
        <Separator className="my-2" />
        <NavSection items={settingsNavItems} collapsed={collapsed} />
      </ScrollArea>

      {/* Collapse Button */}
      <div className="border-t p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
};
