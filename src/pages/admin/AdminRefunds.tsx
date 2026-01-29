import { RotateCcw, Check, X, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockOrders } from "@/data/mockData";
import { format } from "date-fns";

const AdminRefunds = () => {
  const refundedOrders = mockOrders.filter(
    (o) => o.paymentStatus === "refunded" || o.status === "refunded"
  );
  const pendingRefunds = mockOrders.filter(
    (o) => o.status === "cancelled" && o.paymentStatus === "paid"
  );

  const totalRefunded = refundedOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Refunds</h1>
        <p className="text-muted-foreground">
          Process and manage customer refunds
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Refunded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalRefunded.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Check className="h-4 w-4 text-fresh" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-fresh">{refundedOrders.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-800 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">{pendingRefunds.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{refundedOrders.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Refunds Queue */}
      {pendingRefunds.length > 0 && (
        <Card className="shadow-card border-amber-200 bg-amber-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <Clock className="h-5 w-5" />
              Pending Refund Requests ({pendingRefunds.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingRefunds.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg bg-white p-4 border"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                      <RotateCcw className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.id} • {format(new Date(order.date), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium text-lg">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-fresh hover:bg-fresh/90">
                        <Check className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive border-destructive">
                        <X className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Refunds */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Completed Refunds</CardTitle>
        </CardHeader>
        <CardContent>
          {refundedOrders.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <RotateCcw className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No completed refunds yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {refundedOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <RotateCcw className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.id} • {format(new Date(order.date), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800">
                      Refunded
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRefunds;
