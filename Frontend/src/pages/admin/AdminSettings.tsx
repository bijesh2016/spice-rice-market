import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Settings</h1>
        <p className="text-muted-foreground">Manage settings</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Settings Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Settings management is being set up.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
