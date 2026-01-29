import { useState } from "react";
import { Plus, Edit, Trash2, MoreHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/admin/DataTable";
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
import { Switch } from "@/components/ui/switch";
import { mockBrands, Brand } from "@/data/mockData";

const AdminBrands = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const columns = [
    {
      key: "name",
      header: "Brand",
      render: (brand: Brand) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-2xl">
            {brand.logo}
          </div>
          <span className="font-medium">{brand.name}</span>
        </div>
      ),
    },
    {
      key: "productCount",
      header: "Products",
      sortable: true,
      render: (brand: Brand) => (
        <span className="font-medium">{brand.productCount}</span>
      ),
    },
    {
      key: "featured",
      header: "Featured",
      render: (brand: Brand) =>
        brand.featured ? (
          <Badge className="bg-accent/10 text-accent border-accent/20">
            <Star className="mr-1 h-3 w-3 fill-current" />
            Featured
          </Badge>
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
  ];

  const actions = (brand: Brand) => (
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
          <Star className="mr-2 h-4 w-4" /> Toggle Featured
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
          <h1 className="text-3xl font-bold tracking-tight font-display">Brands</h1>
          <p className="text-muted-foreground">
            Manage product brands and manufacturers
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Brand
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle className="font-display">Add New Brand</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="brandName">Brand Name</Label>
                <Input id="brandName" placeholder="e.g., India Gate" />
              </div>
              <div className="space-y-2">
                <Label>Brand Logo</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <Button variant="outline" size="sm">
                    Upload Logo
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured Brand</Label>
                <Switch id="featured" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-primary/90">Save Brand</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Brands
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mockBrands.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Featured
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-accent">
              {mockBrands.filter((b) => b.featured).length}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {mockBrands.reduce((sum, b) => sum + b.productCount, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Brands Table */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <DataTable
            data={mockBrands}
            columns={columns}
            searchPlaceholder="Search brands..."
            actions={actions}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBrands;
