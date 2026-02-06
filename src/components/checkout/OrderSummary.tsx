import { useCart } from "@/contexts/CartContext";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, Tag } from "lucide-react";

interface OrderSummaryProps {
  shippingFee?: number;
  discount?: number;
}

export function OrderSummary({ shippingFee = 0, discount = 0 }: OrderSummaryProps) {
  const { items, getCartTotal } = useCart();
  const subtotal = getCartTotal();
  const tax = subtotal * 0.13; // 13% VAT in Nepal
  const total = subtotal + tax + shippingFee - discount;

  return (
    <div className="space-y-4">
      {/* Items */}
      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-3">
            <div className="relative">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {item.quantity}
              </Badge>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm line-clamp-2">{item.product.name}</p>
              <p className="text-xs text-muted-foreground">{item.product.weight}</p>
            </div>
            <p className="font-medium text-sm">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <Separator />

      {/* Pricing Breakdown */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground flex items-center gap-2">
            <Package className="h-4 w-4" />
            Subtotal ({items.length} items)
          </span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Delivery
          </span>
          <span className={shippingFee === 0 ? "text-green-600 font-medium" : ""}>
            {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">VAT (13%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Discount
            </span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <Separator />

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">Total</span>
        <span className="text-xl font-bold text-primary">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Free Shipping Notice */}
      {subtotal < 50 && (
        <div className="p-3 bg-muted rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            Add <span className="font-medium text-foreground">${(50 - subtotal).toFixed(2)}</span> more for free delivery
          </p>
        </div>
      )}
    </div>
  );
}
