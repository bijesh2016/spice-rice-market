import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, ShoppingBag, Heart, LogOut, Edit2, Save } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  joinedDate: string;
}

export default function Account() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+977 1234567890",
    address: "123 Main Street",
    city: "Kathmandu",
    zipCode: "44600",
    joinedDate: "January 15, 2024",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  // Mock order data
  const orders = [
    {
      id: "ORD-001",
      date: "Mar 1, 2026",
      total: "$45.99",
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-002",
      date: "Feb 28, 2026",
      total: "$78.50",
      status: "Processing",
      items: 5,
    },
    {
      id: "ORD-003",
      date: "Feb 20, 2026",
      total: "$32.00",
      status: "Delivered",
      items: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">My Account</h1>
          <p className="text-muted-foreground">Manage your profile and orders</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader className="text-center pb-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-primary-foreground" />
                </div>
                <CardTitle>
                  {userData.firstName} {userData.lastName}
                </CardTitle>
                <p className="text-sm text-muted-foreground">Member since {userData.joinedDate}</p>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="break-all text-foreground">{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{userData.phone}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                    <span className="text-foreground">
                      {userData.address}<br />
                      {userData.city}, {userData.zipCode}
                    </span>
                  </div>
                </div>

                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </Button>
                )}

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 text-destructive hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Total Orders</span>
                    </div>
                    <span className="text-2xl font-bold text-foreground">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-sm text-muted-foreground">Wishlist Items</span>
                    </div>
                    <span className="text-2xl font-bold text-foreground">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">First Name</label>
                            <Input
                              name="firstName"
                              value={userData.firstName}
                              onChange={handleInputChange}
                              disabled={loading}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Last Name</label>
                            <Input
                              name="lastName"
                              value={userData.lastName}
                              onChange={handleInputChange}
                              disabled={loading}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <Input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            disabled={loading}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone</label>
                          <Input
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputChange}
                            disabled={loading}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Address</label>
                          <Input
                            name="address"
                            value={userData.address}
                            onChange={handleInputChange}
                            disabled={loading}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">City</label>
                            <Input
                              name="city"
                              value={userData.city}
                              onChange={handleInputChange}
                              disabled={loading}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">ZIP Code</label>
                            <Input
                              name="zipCode"
                              value={userData.zipCode}
                              onChange={handleInputChange}
                              disabled={loading}
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button
                            onClick={handleSave}
                            disabled={loading}
                            className="gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Save Changes
                          </Button>
                          <Button
                            onClick={() => setIsEditing(false)}
                            variant="outline"
                            disabled={loading}
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">First Name</p>
                            <p className="font-medium">{userData.firstName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Last Name</p>
                            <p className="font-medium">{userData.lastName}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{userData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{userData.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Address</p>
                          <p className="font-medium">{userData.address}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">City</p>
                            <p className="font-medium">{userData.city}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">ZIP Code</p>
                            <p className="font-medium">{userData.zipCode}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date} • {order.items} items</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">{order.total}</p>
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Link to="/products">
                    <Button variant="outline">Continue Shopping</Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
