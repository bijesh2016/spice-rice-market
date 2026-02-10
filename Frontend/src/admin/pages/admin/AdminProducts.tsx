import { useState } from "react";
import { Plus, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/admin/components/admin/DataTable";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProducts, mockCategories, mockBrands, Product } from "@/admin/data/mockData";

const AdminProducts = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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

  const columns = [
    {
      key: "image",
      header: "Product",
      render: (product: Product) => (
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-muted-foreground">{product.sku}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      sortable: true,
    },
    {
      key: "brand",
      header: "Brand",
      sortable: true,
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      render: (product: Product) => (
        <div>
          {product.salePrice ? (
            <>
              <span className="font-medium text-cta">${product.salePrice}</span>
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ${product.price}
              </span>
            </>
          ) : (
            <span className="font-medium">${product.price}</span>
          )}
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      sortable: true,
      render: (product: Product) => (
        <div className="flex items-center gap-2">
          <span>{product.stock}</span>
          {getStockBadge(product.status)}
        </div>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      sortable: true,
      render: (product: Product) => (
        <div className="flex items-center gap-1">
          <span className="text-amber-500">★</span>
          <span>{product.rating}</span>
          <span className="text-muted-foreground">({product.reviews})</span>
        </div>
      ),
    },
  ];

  const actions = (product: Product) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover">
        <DropdownMenuItem className="cursor-pointer">
          <Eye className="mr-2 h-4 w-4" /> View
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Edit className="mr-2 h-4 w-4" /> Edit
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
          <h1 className="text-3xl font-bold tracking-tight font-display">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog ({mockProducts.length} products)
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card">
            <DialogHeader>
              <DialogTitle className="font-display">Add New Product</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="basic" className="mt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="e.g., India Gate Basmati Rice" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" placeholder="e.g., RICE-IG-5KG" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {mockCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {mockBrands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product..."
                    rows={4}
                  />
                </div>
              </TabsContent>
              <TabsContent value="pricing" className="space-y-4 pt-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="price">Regular Price ($)</Label>
                    <Input id="price" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salePrice">Sale Price ($)</Label>
                    <Input id="salePrice" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight/Unit</Label>
                    <Input id="weight" placeholder="e.g., 5 KG" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="media" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Product Images</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <p className="text-muted-foreground">
                      Drag and drop images here, or click to browse
                    </p>
                    <Button variant="outline" className="mt-4">
                      Upload Images
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="inventory" className="space-y-4 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input id="stock" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lowStock">Low Stock Threshold</Label>
                    <Input id="lowStock" type="number" placeholder="10" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary/90">Save Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Table */}
      <DataTable
        data={mockProducts}
        columns={columns}
        searchPlaceholder="Search products..."
        filterOptions={[
          { label: "All Categories", value: "all" },
          ...mockCategories.map((c) => ({ label: c.name, value: c.id })),
        ]}
        actions={actions}
      />
    </div>
  );
};

export default AdminProducts;
