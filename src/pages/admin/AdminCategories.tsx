import { useState } from "react";
import { Plus, Edit, Trash2, MoreHorizontal, FolderTree } from "lucide-react";
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
import { mockCategories, Category } from "@/data/mockData";

const AdminCategories = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const columns = [
    {
      key: "name",
      header: "Category",
      render: (category: Category) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FolderTree className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{category.name}</p>
            <p className="text-sm text-muted-foreground">/{category.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: "productCount",
      header: "Products",
      sortable: true,
      render: (category: Category) => (
        <span className="font-medium">{category.productCount}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (category: Category) => (
        <Badge
          variant="outline"
          className={
            category.status === "active"
              ? "bg-fresh/10 text-fresh border-fresh/20"
              : "bg-gray-100 text-gray-800 border-gray-200"
          }
        >
          {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
        </Badge>
      ),
    },
  ];

  const actions = (category: Category) => (
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
          <h1 className="text-3xl font-bold tracking-tight font-display">Categories</h1>
          <p className="text-muted-foreground">
            Organize products into categories
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle className="font-display">Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="categoryName">Category Name</Label>
                <Input id="categoryName" placeholder="e.g., Rice" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" placeholder="e.g., rice" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="active">Active</Label>
                <Switch id="active" defaultChecked />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-primary/90">Save Category</Button>
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
              Total Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mockCategories.length}</p>
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
              {mockCategories.filter((c) => c.status === "active").length}
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
              {mockCategories.reduce((sum, c) => sum + c.productCount, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Table */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <DataTable
            data={mockCategories}
            columns={columns}
            searchPlaceholder="Search categories..."
            actions={actions}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCategories;
