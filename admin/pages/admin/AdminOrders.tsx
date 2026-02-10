import { Eye, MoreHorizontal, Printer, RotateCcw, X, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/admin/components/admin/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockOrders, Order } from "@/admin/data/mockData";
import { format } from "date-fns";

const AdminOrders = () => {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-blue-100 text-blue-800 border-blue-200",
      processing: "bg-amber-100 text-amber-800 border-amber-200",
      shipped: "bg-purple-100 text-purple-800 border-purple-200",
      delivered: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      refunded: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return (
      <Badge variant="outline" className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPaymentBadge = (status: string) => {
    const styles: Record<string, string> = {
      paid: "bg-fresh/10 text-fresh border-fresh/20",
      pending: "bg-amber-100 text-amber-800 border-amber-200",
      failed: "bg-red-100 text-red-800 border-red-200",
      refunded: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return (
      <Badge variant="outline" className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const columns = [
    {
      key: "id",
      header: "Order ID",
      sortable: true,
      render: (order: Order) => (
        <span className="font-mono font-medium">{order.id}</span>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (order: Order) => (
        <div>
          <p className="font-medium">{order.customer}</p>
          <p className="text-sm text-muted-foreground">{order.email}</p>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      sortable: true,
      render: (order: Order) => (
        <span>{format(new Date(order.date), "MMM dd, yyyy HH:mm")}</span>
      ),
    },
    {
      key: "items",
      header: "Items",
      render: (order: Order) => <span>{order.items} items</span>,
    },
    {
      key: "total",
      header: "Total",
      sortable: true,
      render: (order: Order) => (
        <span className="font-medium">${order.total.toFixed(2)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (order: Order) => getStatusBadge(order.status),
    },
    {
      key: "paymentStatus",
      header: "Payment",
      render: (order: Order) => getPaymentBadge(order.paymentStatus),
    },
  ];

  const actions = (order: Order) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover">
        <DropdownMenuItem className="cursor-pointer">
          <Eye className="mr-2 h-4 w-4" /> View Details
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Printer className="mr-2 h-4 w-4" /> Print Invoice
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Truck className="mr-2 h-4 w-4" /> Update Status
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <RotateCcw className="mr-2 h-4 w-4" /> Refund
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-destructive">
          <X className="mr-2 h-4 w-4" /> Cancel Order
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Order stats
  const orderStats = {
    total: mockOrders.length,
    pending: mockOrders.filter((o) => o.status === "pending").length,
    processing: mockOrders.filter((o) => o.status === "processing").length,
    delivered: mockOrders.filter((o) => o.status === "delivered").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track customer orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{orderStats.total}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{orderStats.pending}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">{orderStats.processing}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Delivered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{orderStats.delivered}</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <DataTable
        data={mockOrders}
        columns={columns}
        searchPlaceholder="Search orders..."
        filterOptions={[
          { label: "All Orders", value: "all" },
          { label: "Pending", value: "pending" },
          { label: "Processing", value: "processing" },
          { label: "Shipped", value: "shipped" },
          { label: "Delivered", value: "delivered" },
          { label: "Cancelled", value: "cancelled" },
        ]}
        actions={actions}
      />
    </div>
  );
};

export default AdminOrders;
