import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminOrders = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Orders</h1>
        <p className="text-muted-foreground">Manage orders</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Orders Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Orders management is being set up.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
