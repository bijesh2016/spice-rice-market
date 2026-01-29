import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  dashboardStats,
  salesData,
  orderStatusData,
  topProducts,
  mockOrders,
} from "@/data/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  const recentOrders = mockOrders.slice(0, 5);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-blue-100 text-blue-800",
      processing: "bg-amber-100 text-amber-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      refunded: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${dashboardStats.revenue.total.toLocaleString()}`}
          change={dashboardStats.revenue.change}
          changeLabel={dashboardStats.revenue.period}
          icon={DollarSign}
          iconColor="text-fresh"
          iconBgColor="bg-fresh/10"
        />
        <StatCard
          title="Total Orders"
          value={dashboardStats.orders.total}
          change={8.2}
          changeLabel="vs last month"
          icon={ShoppingCart}
          iconColor="text-primary"
          iconBgColor="bg-primary/10"
        />
        <StatCard
          title="Active Users"
          value={dashboardStats.users.active.toLocaleString()}
          change={dashboardStats.users.new}
          changeLabel="new this month"
          icon={Users}
          iconColor="text-accent"
          iconBgColor="bg-accent/10"
        />
        <StatCard
          title="Low Stock Items"
          value={dashboardStats.inventory.lowStock}
          icon={Package}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-100"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Sales Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Pie Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {orderStatusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Badge variant="secondary">{mockOrders.length} total</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                    <Badge className={getStatusColor(order.status)} variant="secondary">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Selling Products</CardTitle>
            <Badge variant="secondary">This week</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} sold</p>
                    </div>
                  </div>
                  <p className="font-medium">${product.revenue.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="border-amber-200 bg-amber-50/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="h-5 w-5" />
            Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-white p-3 border">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span>
                  <strong>Low Stock:</strong> Fresh Goat Meat (Khasi) - Only 25 units left
                </span>
              </div>
              <Badge variant="outline" className="border-amber-500 text-amber-700">
                Action Required
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white p-3 border">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span>
                  <strong>Out of Stock:</strong> Everest Meat Masala - Restock needed
                </span>
              </div>
              <Badge variant="outline" className="border-red-500 text-red-700">
                Critical
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white p-3 border">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>
                  <strong>Pending Reviews:</strong> 3 reviews awaiting moderation
                </span>
              </div>
              <Badge variant="outline" className="border-blue-500 text-blue-700">
                Review
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
