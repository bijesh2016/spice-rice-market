import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminBrands = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Brands</h1>
        <p className="text-muted-foreground">Manage brands</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Brands Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Brands management is being set up.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBrands;
