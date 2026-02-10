import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminNotifications = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Notifications</h1>
        <p className="text-muted-foreground">Manage notifications</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Notifications Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Notifications management is being set up.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNotifications;
