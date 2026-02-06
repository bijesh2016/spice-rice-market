import { CreditCard, Banknote, Smartphone, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type PaymentMethod = "card" | "cod" | "esewa" | "khalti";

interface PaymentMethodSelectProps {
  selected: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
}

const paymentMethods = [
  {
    id: "cod" as PaymentMethod,
    name: "Cash on Delivery",
    description: "Pay when you receive your order",
    icon: Banknote,
    badge: "Popular",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    id: "khalti" as PaymentMethod,
    name: "Khalti",
    description: "Pay using Khalti digital wallet",
    icon: Wallet,
    badge: null,
  },
  {
    id: "esewa" as PaymentMethod,
    name: "eSewa",
    description: "Pay using eSewa mobile wallet",
    icon: Smartphone,
    badge: null,
  },
  {
    id: "card" as PaymentMethod,
    name: "Credit/Debit Card",
    description: "Visa, Mastercard, and more",
    icon: CreditCard,
    badge: "Secure",
    badgeColor: "bg-blue-100 text-blue-700",
  },
];

export function PaymentMethodSelect({ selected, onSelect }: PaymentMethodSelectProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        All transactions are secure and encrypted
      </p>

      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selected === method.id;

          return (
            <button
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <div
                className={cn(
                  "p-3 rounded-full",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{method.name}</p>
                  {method.badge && (
                    <Badge className={cn("text-xs", method.badgeColor)}>
                      {method.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </div>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  isSelected ? "border-primary" : "border-muted-foreground/30"
                )}
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selected === "cod" && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg animate-fade-in">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Please keep exact change ready. Our delivery
            personnel may not carry change for large denominations.
          </p>
        </div>
      )}

      {(selected === "khalti" || selected === "esewa") && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg animate-fade-in">
          <p className="text-sm text-blue-800">
            You will be redirected to {selected === "khalti" ? "Khalti" : "eSewa"} to
            complete your payment after placing the order.
          </p>
        </div>
      )}
    </div>
  );
}
