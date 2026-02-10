import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminCategories = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Categories</h1>
        <p className="text-muted-foreground">Manage categories</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Categories Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Categories management is being set up.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCategories;
