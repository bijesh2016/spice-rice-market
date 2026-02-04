import { useState, useMemo } from "react";
import { 
  Search, 
  AlertTriangle,
  Package,
  TrendingDown,
  BarChart3,
  Edit,
  Plus,
  Minus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products, categories } from "@/data/products";

type StockStatus = 'all' | 'low' | 'out' | 'healthy';

export function InventoryTracking() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState<StockStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const getStockStatus = (count: number) => {
    if (count === 0) return 'out';
    if (count < 30) return 'critical';
    if (count < 50) return 'low';
    return 'healthy';
  };

  const inventoryStats = useMemo(() => ({
    totalProducts: products.length,
    totalStock: products.reduce((sum, p) => sum + p.stockCount, 0),
    lowStock: products.filter(p => p.stockCount < 50 && p.stockCount > 0).length,
    outOfStock: products.filter(p => p.stockCount === 0).length,
  }), []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || product.categorySlug === categoryFilter;
      
      let matchesStock = true;
      if (stockFilter === 'low') {
        matchesStock = product.stockCount < 50 && product.stockCount > 0;
      } else if (stockFilter === 'out') {
        matchesStock = product.stockCount === 0;
      } else if (stockFilter === 'healthy') {
        matchesStock = product.stockCount >= 50;
      }
      
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [searchQuery, categoryFilter, stockFilter]);

  // Sort by stock (lowest first)
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => a.stockCount - b.stockCount);
  }, [filteredProducts]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Inventory</h2>
        <p className="text-muted-foreground">Track and manage stock levels</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{inventoryStats.totalProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Units</p>
                <p className="text-2xl font-bold">{inventoryStats.totalStock.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingDown className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{inventoryStats.lowStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{inventoryStats.outOfStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {inventoryStats.lowStock > 0 && (
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {products
                .filter(p => p.stockCount < 50 && p.stockCount > 0)
                .sort((a, b) => a.stockCount - b.stockCount)
                .slice(0, 6)
                .map((product) => (
                  <div 
                    key={product.id}
                    className="flex items-center gap-3 p-3 bg-background rounded-lg border"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(product.stockCount / 100) * 100} 
                          className="h-1.5 flex-1"
                        />
                        <span className="text-xs font-medium text-red-600">
                          {product.stockCount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={stockFilter} onValueChange={(v) => setStockFilter(v as StockStatus)}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Stock Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="out">Out of Stock</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Stock Levels ({sortedProducts.length} products)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.map((product) => {
                const status = getStockStatus(product.stockCount);
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium line-clamp-1">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.weight}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-24">
                          <Progress 
                            value={Math.min((product.stockCount / 200) * 100, 100)} 
                            className={`h-2 ${
                              status === 'critical' || status === 'out' ? '[&>div]:bg-red-500' :
                              status === 'low' ? '[&>div]:bg-yellow-500' :
                              '[&>div]:bg-green-500'
                            }`}
                          />
                        </div>
                        <span className={`font-bold ${
                          status === 'critical' || status === 'out' ? 'text-red-600' :
                          status === 'low' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {product.stockCount}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {status === 'out' && (
                        <Badge variant="destructive">Out of Stock</Badge>
                      )}
                      {status === 'critical' && (
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Critical</Badge>
                      )}
                      {status === 'low' && (
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Low</Badge>
                      )}
                      {status === 'healthy' && (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Healthy</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
