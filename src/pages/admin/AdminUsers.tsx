import { useState } from "react";
import { Plus, Edit, MoreHorizontal, Shield, Ban, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "@/components/admin/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUsers, User } from "@/data/mockData";
import { format } from "date-fns";

const AdminUsers = () => {
  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      admin: "bg-purple-100 text-purple-800 border-purple-200",
      moderator: "bg-blue-100 text-blue-800 border-blue-200",
      customer: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return (
      <Badge variant="outline" className={styles[role]}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-fresh/10 text-fresh border-fresh/20",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
      suspended: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      <Badge variant="outline" className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const columns = [
    {
      key: "name",
      header: "User",
      render: (user: User) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
    },
    {
      key: "role",
      header: "Role",
      render: (user: User) => getRoleBadge(user.role),
    },
    {
      key: "status",
      header: "Status",
      render: (user: User) => getStatusBadge(user.status),
    },
    {
      key: "registeredAt",
      header: "Registered",
      sortable: true,
      render: (user: User) => (
        <span>{format(new Date(user.registeredAt), "MMM dd, yyyy")}</span>
      ),
    },
    {
      key: "orders",
      header: "Orders",
      sortable: true,
    },
    {
      key: "totalSpent",
      header: "Total Spent",
      sortable: true,
      render: (user: User) => (
        <span className="font-medium">${user.totalSpent.toFixed(2)}</span>
      ),
    },
  ];

  const actions = (user: User) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover">
        <DropdownMenuItem className="cursor-pointer">
          <Edit className="mr-2 h-4 w-4" /> Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Shield className="mr-2 h-4 w-4" /> Change Role
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user.status === "active" ? (
          <DropdownMenuItem className="cursor-pointer text-destructive">
            <Ban className="mr-2 h-4 w-4" /> Suspend User
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="cursor-pointer text-fresh">
            <UserCheck className="mr-2 h-4 w-4" /> Activate User
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // User stats
  const userStats = {
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === "active").length,
    admins: mockUsers.filter((u) => u.role === "admin").length,
    customers: mockUsers.filter((u) => u.role === "customer").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">Users</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{userStats.total}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-fresh">{userStats.active}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Admins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">{userStats.admins}</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{userStats.customers}</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <DataTable
        data={mockUsers}
        columns={columns}
        searchPlaceholder="Search users..."
        filterOptions={[
          { label: "All Users", value: "all" },
          { label: "Admins", value: "admin" },
          { label: "Moderators", value: "moderator" },
          { label: "Customers", value: "customer" },
        ]}
        actions={actions}
      />
    </div>
  );
};

export default AdminUsers;
