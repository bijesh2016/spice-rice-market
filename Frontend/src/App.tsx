
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";

import Index from "./pages/Index";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";

// Admin imports
import {AdminLayout} from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminBrands from "./pages/admin/AdminBrands";
import AdminDiscounts from "./pages/admin/AdminDiscounts";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminRefunds from "./pages/admin/AdminRefunds";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster/>
            <Sonner/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/products/:slug" element={<Products/>}/>
                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminLayout/>}>
                        <Route index element={<AdminDashboard/>}/>
                        <Route path="products" element={<AdminProducts/>}/>
                        <Route path="orders" element={<AdminOrders/>}/>
                        <Route path="users" element={<AdminUsers/>}/>
                        <Route path="inventory" element={<AdminInventory/>}/>
                        <Route path="categories" element={<AdminCategories/>}/>
                        <Route path="brands" element={<AdminBrands/>}/>
                        <Route path="discounts" element={<AdminDiscounts/>}/>
                        <Route path="payments" element={<AdminPayments/>}/>
                        <Route path="refunds" element={<AdminRefunds/>}/>
                        <Route path="reviews" element={<AdminReviews/>}/>
                        <Route path="notifications" element={<AdminNotifications/>}/>
                        <Route path="settings" element={<AdminSettings/>}/>
                    </Route>

                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </TooltipProvider>

        <CartProvider>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:slug" element={<Products />} />

                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </CartProvider>
    </QueryClientProvider>
);

export default App;