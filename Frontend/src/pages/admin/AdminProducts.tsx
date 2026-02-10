import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminProducts = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Products</h1>
        <p className="text-muted-foreground">Manage your products</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Products Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Products management is being set up.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProducts;
