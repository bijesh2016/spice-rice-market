import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Dashboard functionality is being set up.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
