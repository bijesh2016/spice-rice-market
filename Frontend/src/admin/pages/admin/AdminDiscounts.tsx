import { useState } from "react";
import { Plus, Edit, Trash2, MoreHorizontal, Percent, Gift, Truck, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/admin/components/admin/DataTable";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockDiscounts, Discount } from "@/admin/data/mockData";
import { format } from "date-fns";

const AdminDiscounts = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getTypeBadge = (type: string) => {
    const styles: Record<string, { className: string; icon: React.ReactNode; label: string }> = {
      percentage: {
        className: "bg-primary/10 text-primary border-primary/20",
        icon: <Percent className="mr-1 h-3 w-3" />,
        label: "Percentage",
      },
      fixed: {
        className: "bg-accent/10 text-accent border-accent/20",
        icon: null,
        label: "Fixed Amount",
      },
      bogo: {
        className: "bg-purple-100 text-purple-800 border-purple-200",
        icon: <Gift className="mr-1 h-3 w-3" />,
        label: "BOGO",
      },
      free_shipping: {
        className: "bg-blue-100 text-blue-800 border-blue-200",
        icon: <Truck className="mr-1 h-3 w-3" />,
        label: "Free Shipping",
      },
    };
    const style = styles[type];
    return (
      <Badge variant="outline" className={style.className}>
        {style.icon}
        {style.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-fresh/10 text-fresh border-fresh/20",
      expired: "bg-gray-100 text-gray-800 border-gray-200",
      scheduled: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return (
      <Badge variant="outline" className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const columns = [
    {
      key: "code",
      header: "Code",
      render: (discount: Discount) => (
        <div className="flex items-center gap-2">
          <code className="rounded bg-muted px-2 py-1 font-mono font-medium">
            {discount.code}
          </code>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (discount: Discount) => getTypeBadge(discount.type),
    },
    {
      key: "value",
      header: "Value",
      render: (discount: Discount) => (
        <span className="font-medium">
          {discount.type === "percentage"
            ? `${discount.value}%`
            : discount.type === "fixed"
            ? `$${discount.value}`
            : "-"}
        </span>
      ),
    },
    {
      key: "usage",
      header: "Usage",
      render: (discount: Discount) => (
        <div className="space-y-1 w-32">
          <div className="flex justify-between text-xs">
            <span>{discount.usageCount}</span>
            <span className="text-muted-foreground">/ {discount.usageLimit}</span>
          </div>
          <Progress
            value={(discount.usageCount / discount.usageLimit) * 100}
            className="h-2"
          />
        </div>
      ),
    },
    {
      key: "validFrom",
      header: "Valid Period",
      render: (discount: Discount) => (
        <div className="text-sm">
          <p>{format(new Date(discount.validFrom), "MMM dd, yyyy")}</p>
          <p className="text-muted-foreground">
            to {format(new Date(discount.validTo), "MMM dd, yyyy")}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (discount: Discount) => getStatusBadge(discount.status),
    },
  ];

  const actions = (discount: Discount) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover">
        <DropdownMenuItem className="cursor-pointer">
          <Edit className="mr-2 h-4 w-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Copy className="mr-2 h-4 w-4" /> Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-destructive">
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">Discounts</h1>
          <p className="text-muted-foreground">
            Manage discount codes and promotions
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Discount
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle className="font-display">Create Discount Code</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="code">Discount Code</Label>
                <Input id="code" placeholder="e.g., SAVE20" className="uppercase" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Discount Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="bogo">Buy One Get One</SelectItem>
                      <SelectItem value="free_shipping">Free Shipping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <Input id="value" type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="usageLimit">Usage Limit</Label>
                  <Input id="usageLimit" type="number" placeholder="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validTo">Valid Until</Label>
                  <Input id="validTo" type="date" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-primary/90">Create Discount</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Discounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mockDiscounts.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-fresh">
              {mockDiscounts.filter((d) => d.status === "active").length}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {mockDiscounts.reduce((sum, d) => sum + d.usageCount, 0)}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Scheduled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {mockDiscounts.filter((d) => d.status === "scheduled").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Discounts Table */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <DataTable
            data={mockDiscounts}
            columns={columns}
            searchPlaceholder="Search discount codes..."
            filterOptions={[
              { label: "All", value: "all" },
              { label: "Active", value: "active" },
              { label: "Expired", value: "expired" },
              { label: "Scheduled", value: "scheduled" },
            ]}
            actions={actions}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDiscounts;
