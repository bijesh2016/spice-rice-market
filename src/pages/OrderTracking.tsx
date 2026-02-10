import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  ChefHat,
  CircleDot,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface TimelineStep {
  label: string;
  description: string;
  time: string;
  icon: React.ElementType;
  completed: boolean;
  active: boolean;
}

interface TrackedOrder {
  id: string;
  status: string;
  placedAt: string;
  estimatedDelivery: string;
  deliverySlot: string;
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
  address: string;
  timeline: TimelineStep[];
  driver?: { name: string; phone: string };
}

// Mock order data for demo
const mockOrders: Record<string, TrackedOrder> = {
  "KYO-2026-001": {
    id: "KYO-2026-001",
    status: "Shipped",
    placedAt: "Feb 9, 2026 at 2:30 PM",
    estimatedDelivery: "Feb 10, 2026",
    deliverySlot: "Morning (8:00 AM - 12:00 PM)",
    items: [
      { name: "Basmati Rice Premium 5kg", qty: 1, price: 12.99 },
      { name: "Organic Turmeric Powder", qty: 2, price: 4.49 },
      { name: "Fresh Paneer 500g", qty: 1, price: 6.99 },
    ],
    subtotal: 28.96,
    shipping: 0,
    vat: 3.76,
    total: 32.72,
    address: "123 Durbar Marg, Kathmandu, Bagmati Province",
    driver: { name: "Ram B.", phone: "+977-9801234567" },
    timeline: [
      { label: "Order Placed", description: "Your order has been confirmed", time: "Feb 9, 2:30 PM", icon: CheckCircle2, completed: true, active: false },
      { label: "Preparing", description: "Items are being picked & packed", time: "Feb 9, 3:15 PM", icon: ChefHat, completed: true, active: false },
      { label: "Out for Delivery", description: "Driver is on the way", time: "Feb 10, 8:45 AM", icon: Truck, completed: true, active: true },
      { label: "Delivered", description: "Enjoy your groceries!", time: "", icon: MapPin, completed: false, active: false },
    ],
  },
  "KYO-2026-002": {
    id: "KYO-2026-002",
    status: "Processing",
    placedAt: "Feb 10, 2026 at 9:00 AM",
    estimatedDelivery: "Feb 10, 2026",
    deliverySlot: "Afternoon (12:00 PM - 4:00 PM)",
    items: [
      { name: "Chicken Momo Frozen Pack", qty: 3, price: 8.99 },
      { name: "Wai Wai Noodles (Box of 30)", qty: 1, price: 15.49 },
    ],
    subtotal: 42.46,
    shipping: 3.99,
    vat: 6.04,
    total: 52.49,
    address: "45 Lakeside Road, Pokhara, Gandaki Province",
    timeline: [
      { label: "Order Placed", description: "Your order has been confirmed", time: "Feb 10, 9:00 AM", icon: CheckCircle2, completed: true, active: false },
      { label: "Preparing", description: "Items are being picked & packed", time: "Feb 10, 9:30 AM", icon: ChefHat, completed: true, active: true },
      { label: "Out for Delivery", description: "Driver will pick up soon", time: "", icon: Truck, completed: false, active: false },
      { label: "Delivered", description: "Enjoy your groceries!", time: "", icon: MapPin, completed: false, active: false },
    ],
  },
};

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    Pending: "bg-muted text-muted-foreground",
    Processing: "bg-accent/20 text-accent-foreground",
    Shipped: "bg-fresh/20 text-fresh",
    Delivered: "bg-primary/20 text-primary",
    Cancelled: "bg-destructive/20 text-destructive",
  };
  return (
    <Badge className={variants[status] || "bg-muted text-muted-foreground"}>
      {status}
    </Badge>
  );
}

export default function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<TrackedOrder | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const trimmed = orderNumber.trim().toUpperCase();
    if (mockOrders[trimmed]) {
      setTrackedOrder(mockOrders[trimmed]);
      setNotFound(false);
    } else {
      setTrackedOrder(null);
      setNotFound(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container py-8 max-w-3xl">
        {/* Page Title */}
        <div className="text-center mb-8">
          <Package className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="text-2xl font-display font-bold text-foreground">
            Track Your Order
          </h1>
          <p className="text-muted-foreground mt-1">
            Enter your order number to see real-time status updates
          </p>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-2">
          <Input
            placeholder="e.g. KYO-2026-001"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="text-base"
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" /> Track
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mb-8">
          Try: <button className="underline" onClick={() => { setOrderNumber("KYO-2026-001"); }}>KYO-2026-001</button>{" "}
          or <button className="underline" onClick={() => { setOrderNumber("KYO-2026-002"); }}>KYO-2026-002</button>
        </p>

        {notFound && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground">Order not found</p>
            <p className="text-muted-foreground text-sm mt-1">
              Please double-check your order number and try again.
            </p>
          </motion.div>
        )}

        {trackedOrder && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Status Header */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <CardTitle className="text-lg">Order {trackedOrder.id}</CardTitle>
                  <StatusBadge status={trackedOrder.status} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Placed {trackedOrder.placedAt}
                </p>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Delivery</span>
                  <span className="font-medium">{trackedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Slot</span>
                  <span className="font-medium">{trackedOrder.deliverySlot}</span>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Delivery Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-8 space-y-8">
                  {trackedOrder.timeline.map((step, i) => {
                    const Icon = step.icon;
                    const isLast = i === trackedOrder.timeline.length - 1;
                    return (
                      <div key={step.label} className="relative">
                        {/* Connector line */}
                        {!isLast && (
                          <div
                            className={`absolute left-[-20px] top-8 w-0.5 h-full ${
                              step.completed ? "bg-primary" : "bg-border"
                            }`}
                          />
                        )}
                        {/* Icon dot */}
                        <div
                          className={`absolute left-[-28px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center ${
                            step.active
                              ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                              : step.completed
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {step.active ? (
                            <CircleDot className="h-3.5 w-3.5" />
                          ) : (
                            <Icon className="h-3.5 w-3.5" />
                          )}
                        </div>
                        <div>
                          <p
                            className={`font-medium ${
                              step.completed || step.active
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {step.label}
                          </p>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                          {step.time && (
                            <p className="text-xs text-muted-foreground mt-0.5">{step.time}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Driver info */}
            {trackedOrder.driver && trackedOrder.status === "Shipped" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Driver</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{trackedOrder.driver.name}</p>
                      <p className="text-sm text-muted-foreground">{trackedOrder.driver.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trackedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>
                      {item.name} <span className="text-muted-foreground">×{item.qty}</span>
                    </span>
                    <span className="font-medium">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${trackedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{trackedOrder.shipping === 0 ? "Free" : `$${trackedOrder.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>VAT (13%)</span>
                    <span>${trackedOrder.vat.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>${trackedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm">{trackedOrder.address}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
