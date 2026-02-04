import { BarChart3, Package, Users, ShoppingCart, TrendingUp, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Orders", value: "1,234", change: "+12%", icon: ShoppingCart },
  { label: "Products", value: "456", change: "+3%", icon: Package },
  { label: "Customers", value: "2,890", change: "+8%", icon: Users },
  { label: "Revenue", value: "$45,678", change: "+15%", icon: TrendingUp },
];

export default function Admin() {
  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Admin Header */}
      <header className="bg-background border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">KyoudaiMart Admin</h1>
              <p className="text-sm text-muted-foreground">Dashboard</p>
            </div>
          </div>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-accent">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Placeholder sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Order management coming soon...</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Inventory Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Inventory tracking coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
