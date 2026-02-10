import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminPayments = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Payments</h1>
        <p className="text-muted-foreground">Manage payments</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Payments Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Payments management is being set up.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;
