import { Star, Check, X, MessageSquare, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockReviews, Review } from "@/admin/data/mockData";
import { format } from "date-fns";

const AdminReviews = () => {
  const pendingReviews = mockReviews.filter((r) => r.status === "pending");
  const approvedReviews = mockReviews.filter((r) => r.status === "approved");
  const averageRating =
    mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: mockReviews.filter((r) => r.rating === rating).length,
    percentage:
      (mockReviews.filter((r) => r.rating === rating).length / mockReviews.length) *
      100,
  }));

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-amber-100 text-amber-800 border-amber-200",
      approved: "bg-fresh/10 text-fresh border-fresh/20",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      <Badge variant="outline" className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Reviews</h1>
        <p className="text-muted-foreground">
          Moderate and manage customer reviews
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" />
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
              {renderStars(Math.round(averageRating))}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Total Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mockReviews.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-800 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Pending Moderation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">{pendingReviews.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Check className="h-4 w-4 text-fresh" />
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-fresh">{approvedReviews.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Rating Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ratingDistribution.map((item) => (
                <div key={item.rating} className="flex items-center gap-3">
                  <span className="w-12 text-sm font-medium">{item.rating} star</span>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-sm text-muted-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Reviews */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Pending Reviews
              {pendingReviews.length > 0 && (
                <Badge className="bg-amber-100 text-amber-800">
                  {pendingReviews.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingReviews.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <Check className="mx-auto h-12 w-12 mb-4 text-fresh opacity-50" />
                <p>All reviews have been moderated!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <div key={review.id} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {review.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{review.customer}</p>
                          <p className="text-sm text-muted-foreground">
                            {review.productName}
                          </p>
                          <div className="mt-1">{renderStars(review.rating)}</div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(review.date), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <p className="mt-3 text-sm">{review.comment}</p>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="bg-fresh hover:bg-fresh/90">
                        <Check className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive border-destructive"
                      >
                        <X className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* All Reviews */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <div
                key={review.id}
                className="flex items-start justify-between py-4 border-b last:border-0"
              >
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {review.customer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{review.customer}</p>
                      {getStatusBadge(review.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.productName}</p>
                    <div className="mt-1">{renderStars(review.rating)}</div>
                    <p className="mt-2 text-sm">{review.comment}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(review.date), "MMM dd, yyyy")}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReviews;
