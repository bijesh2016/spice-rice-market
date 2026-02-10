import { Bell, Check, Package, ShoppingCart, AlertTriangle, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
  id: string;
  type: "order" | "stock" | "review" | "user";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "order",
    title: "New Order Received",
    message: "Order #ORD-2024-009 for $89.99 from Priya Sharma",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: "n2",
    type: "stock",
    title: "Low Stock Alert",
    message: "Fresh Goat Meat (Khasi) - Only 25 units remaining",
    time: "15 minutes ago",
    read: false,
  },
  {
    id: "n3",
    type: "review",
    title: "New Review Pending",
    message: "5-star review for India Gate Basmati Rice needs moderation",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "n4",
    type: "stock",
    title: "Out of Stock",
    message: "Everest Meat Masala is now out of stock",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "n5",
    type: "user",
    title: "New User Registration",
    message: "Rajesh Kumar has created an account",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "n6",
    type: "order",
    title: "Order Delivered",
    message: "Order #ORD-2024-006 has been delivered successfully",
    time: "4 hours ago",
    read: true,
  },
];

const AdminNotifications = () => {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      order: <ShoppingCart className="h-5 w-5 text-primary" />,
      stock: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      review: <Star className="h-5 w-5 text-amber-500" />,
      user: <User className="h-5 w-5 text-blue-500" />,
    };
    return icons[type];
  };

  const getIconBg = (type: string) => {
    const colors: Record<string, string> = {
      order: "bg-primary/10",
      stock: "bg-amber-100",
      review: "bg-amber-100",
      user: "bg-blue-100",
    };
    return colors[type];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with store activities
          </p>
        </div>
        <Button variant="outline">
          <Check className="mr-2 h-4 w-4" />
          Mark All as Read
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Notifications
                {unreadCount > 0 && (
                  <Badge className="bg-cta text-cta-foreground">{unreadCount} new</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex gap-4 rounded-lg p-4 transition-colors ${
                      notification.read ? "bg-background" : "bg-primary/5 border border-primary/20"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${getIconBg(
                        notification.type
                      )}`}
                    >
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-cta" />
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <Card className="shadow-card h-fit">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="push">Push</TabsTrigger>
              </TabsList>
              <TabsContent value="email" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Orders</Label>
                    <p className="text-xs text-muted-foreground">
                      Get notified for new orders
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Low Stock Alerts</Label>
                    <p className="text-xs text-muted-foreground">
                      When products are running low
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Reviews</Label>
                    <p className="text-xs text-muted-foreground">
                      Reviews pending moderation
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Users</Label>
                    <p className="text-xs text-muted-foreground">
                      New customer registrations
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Failed Payments</Label>
                    <p className="text-xs text-muted-foreground">
                      Payment processing failures
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </TabsContent>
              <TabsContent value="push" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Orders</Label>
                    <p className="text-xs text-muted-foreground">
                      Instant push notifications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Critical Alerts</Label>
                    <p className="text-xs text-muted-foreground">
                      Out of stock, failed payments
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Daily Summary</Label>
                    <p className="text-xs text-muted-foreground">
                      End of day summary
                    </p>
                  </div>
                  <Switch />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminNotifications;
