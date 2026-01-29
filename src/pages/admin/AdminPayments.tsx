import { CreditCard, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockOrders } from "@/data/mockData";
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

const AdminPayments = () => {
  const revenueData = [
    { name: "Week 1", revenue: 12400 },
    { name: "Week 2", revenue: 15800 },
    { name: "Week 3", revenue: 14200 },
    { name: "Week 4", revenue: 18600 },
  ];

  const paymentMethodData = [
    { name: "Credit Card", value: 65, color: "hsl(var(--primary))" },
    { name: "PayPal", value: 25, color: "hsl(var(--accent))" },
    { name: "Cash on Delivery", value: 10, color: "hsl(var(--muted-foreground))" },
  ];

  const paidOrders = mockOrders.filter((o) => o.paymentStatus === "paid");
  const pendingPayments = mockOrders.filter((o) => o.paymentStatus === "pending");
  const failedPayments = mockOrders.filter((o) => o.paymentStatus === "failed");
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);

  const getPaymentBadge = (status: string) => {
    const styles: Record<string, string> = {
      paid: "bg-fresh/10 text-fresh border-fresh/20",
      pending: "bg-amber-100 text-amber-800 border-amber-200",
      failed: "bg-red-100 text-red-800 border-red-200",
      refunded: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return (
      <Badge variant="outline" className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Payments</h1>
        <p className="text-muted-foreground">
          Monitor payment transactions and revenue
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-fresh" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Successful Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-fresh">{paidOrders.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-amber-600" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">{pendingPayments.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-800 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{failedPayments.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle>Revenue Trend (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`$${value}`, "Revenue"]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--fresh))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--fresh))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {paymentMethodData.map((item) => (
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

      {/* Recent Transactions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOrders.slice(0, 6).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.id} • {order.paymentMethod}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                  {getPaymentBadge(order.paymentStatus)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;
