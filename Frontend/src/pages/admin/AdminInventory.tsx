import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminInventory = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Inventory</h1>
        <p className="text-muted-foreground">Manage inventory</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Inventory Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Inventory management is being set up.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminInventory;
