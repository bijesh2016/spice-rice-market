import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Users</h1>
        <p className="text-muted-foreground">Manage users</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Users management is being set up.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
