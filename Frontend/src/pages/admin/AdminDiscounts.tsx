import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDiscounts = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Discounts</h1>
        <p className="text-muted-foreground">Manage discounts</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Discounts Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Discounts management is being set up.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDiscounts;
