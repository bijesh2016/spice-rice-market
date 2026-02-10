import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminReviews = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Reviews</h1>
        <p className="text-muted-foreground">Manage reviews</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Reviews Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Reviews management is being set up.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReviews;
