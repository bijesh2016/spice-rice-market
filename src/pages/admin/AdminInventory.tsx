import { AlertTriangle, Package, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/admin/DataTable";
import { mockProducts, Product } from "@/data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminInventory = () => {
  const stockMovementData = [
    { name: "Mon", in: 45, out: 32 },
    { name: "Tue", in: 52, out: 41 },
    { name: "Wed", in: 38, out: 28 },
    { name: "Thu", in: 65, out: 55 },
    { name: "Fri", in: 48, out: 62 },
    { name: "Sat", in: 72, out: 85 },
    { name: "Sun", in: 35, out: 45 },
  ];

  const getStockBadge = (status: string) => {
    const styles: Record<string, string> = {
      in_stock: "bg-fresh/10 text-fresh border-fresh/20",
      low_stock: "bg-amber-100 text-amber-800 border-amber-200",
      out_of_stock: "bg-red-100 text-red-800 border-red-200",
    };
    const labels: Record<string, string> = {
      in_stock: "In Stock",
      low_stock: "Low Stock",
      out_of_stock: "Out of Stock",
    };
    return (
      <Badge variant="outline" className={styles[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const lowStockItems = mockProducts.filter(
    (p) => p.status === "low_stock" || p.status === "out_of_stock"
  );

  const inventoryStats = {
    totalProducts: mockProducts.length,
    totalStock: mockProducts.reduce((sum, p) => sum + p.stock, 0),
    lowStock: mockProducts.filter((p) => p.status === "low_stock").length,
    outOfStock: mockProducts.filter((p) => p.status === "out_of_stock").length,
  };

  const columns = [
    {
      key: "name",
      header: "Product",
      render: (product: Product) => (
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-10 w-10 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-muted-foreground">{product.sku}</p>
          </div>
        </div>
      ),
    },
    { key: "category", header: "Category", sortable: true },
    {
      key: "stock",
      header: "Current Stock",
      sortable: true,
      render: (product: Product) => (
        <span className="font-medium">{product.stock} units</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (product: Product) => getStockBadge(product.status),
    },
    {
      key: "actions",
      header: "",
      render: () => (
        <Button variant="outline" size="sm">
          Adjust Stock
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">Inventory</h1>
          <p className="text-muted-foreground">
            Track stock levels and manage inventory
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          Bulk Stock Update
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Package className="h-4 w-4" />
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{inventoryStats.totalProducts}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-fresh" />
              Total Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{inventoryStats.totalStock.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-800 flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">{inventoryStats.lowStock}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-800 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{inventoryStats.outOfStock}</p>
          </CardContent>
        </Card>
      </div>

      {/* Stock Movement Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Stock Movement (This Week)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockMovementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="in" fill="hsl(var(--fresh))" name="Stock In" radius={[4, 4, 0, 0]} />
              <Bar dataKey="out" fill="hsl(var(--accent))" name="Stock Out" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <Card className="shadow-card border-amber-200 bg-amber-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
              Items Requiring Attention ({lowStockItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={lowStockItems}
              columns={columns}
              searchable={false}
              itemsPerPage={5}
            />
          </CardContent>
        </Card>
      )}

      {/* All Inventory */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={mockProducts}
            columns={columns}
            searchPlaceholder="Search products..."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminInventory;
