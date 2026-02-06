import { 
  Package, 
  MapPin, 
  CreditCard, 
  Clock, 
  User,
  Mail,
  Phone,
  CheckCircle2,
  Circle,
  Truck,
  Box,
  XCircle
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Order } from "@/data/mockOrders";

interface OrderDetailDrawerProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors: Record<Order['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const paymentStatusColors: Record<Order['paymentStatus'], string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-700',
};

const timelineSteps = [
  { status: 'pending', label: 'Order Placed', icon: Circle },
  { status: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
  { status: 'processing', label: 'Processing', icon: Box },
  { status: 'shipped', label: 'Shipped', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: Package },
];

const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

export function OrderDetailDrawer({ order, open, onOpenChange }: OrderDetailDrawerProps) {
  if (!order) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const currentStatusIndex = statusOrder.indexOf(order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-xl font-bold">
                Order {order.orderNumber}
              </DrawerTitle>
              <DrawerDescription className="mt-1">
                Placed on {formatDate(order.createdAt)}
              </DrawerDescription>
            </div>
            <div className="flex gap-2">
              <Badge className={`${statusColors[order.status]} hover:${statusColors[order.status]}`}>
                {order.status}
              </Badge>
              <Badge className={`${paymentStatusColors[order.paymentStatus]} hover:${paymentStatusColors[order.paymentStatus]}`}>
                {order.paymentStatus}
              </Badge>
            </div>
          </div>
        </DrawerHeader>

        <ScrollArea className="flex-1 px-4 py-6">
          <div className="space-y-6 pb-6">
            {/* Order Timeline */}
            <section>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Order Timeline
              </h3>
              {isCancelled ? (
                <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                  <XCircle className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="font-medium text-red-700">Order Cancelled</p>
                    <p className="text-sm text-red-600">This order has been cancelled</p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex justify-between">
                    {timelineSteps.map((step, index) => {
                      const isCompleted = index <= currentStatusIndex;
                      const isCurrent = index === currentStatusIndex;
                      const StepIcon = step.icon;
                      
                      return (
                        <div key={step.status} className="flex flex-col items-center flex-1">
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center z-10
                            ${isCompleted 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted text-muted-foreground'}
                            ${isCurrent ? 'ring-4 ring-primary/20' : ''}
                          `}>
                            <StepIcon className="h-5 w-5" />
                          </div>
                          <span className={`text-xs mt-2 text-center ${isCompleted ? 'font-medium' : 'text-muted-foreground'}`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {/* Progress line */}
                  <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-muted -z-0">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(currentStatusIndex / (timelineSteps.length - 1)) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </section>

            <Separator />

            {/* Customer Info */}
            <section>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <User className="h-4 w-4" />
                Customer Information
              </h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{order.customerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{order.customerEmail}</span>
                </div>
              </div>
            </section>

            <Separator />

            {/* Shipping Address */}
            <section>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Shipping Address
              </h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-muted-foreground">{order.shippingAddress}</p>
              </div>
            </section>

            <Separator />

            {/* Order Items */}
            <section>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Order Items ({order.items.length})
              </h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            {/* Payment Info */}
            <section>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Details
              </h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium uppercase">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status</span>
                  <Badge className={`${paymentStatusColors[order.paymentStatus]} hover:${paymentStatusColors[order.paymentStatus]}`}>
                    {order.paymentStatus}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </section>

            {/* Timestamps */}
            <section className="text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Created</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Last Updated</span>
                <span>{formatDate(order.updatedAt)}</span>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
