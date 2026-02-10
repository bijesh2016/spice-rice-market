import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminRefunds = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Refunds</h1>
        <p className="text-muted-foreground">Manage refunds</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Refunds Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Refunds management is being set up.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRefunds;
