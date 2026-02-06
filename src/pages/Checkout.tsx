import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  MapPin, 
  Truck, 
  CreditCard,
  ShoppingBag,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { AddressForm, AddressData } from "@/components/checkout/AddressForm";
import { DeliverySlotPicker, DeliverySlot } from "@/components/checkout/DeliverySlotPicker";
import { PaymentMethodSelect, PaymentMethod } from "@/components/checkout/PaymentMethodSelect";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type CheckoutStep = "address" | "delivery" | "payment" | "confirmation";

const steps: { id: CheckoutStep; label: string; icon: React.ElementType }[] = [
  { id: "address", label: "Address", icon: MapPin },
  { id: "delivery", label: "Delivery", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
];

const emptyAddress: AddressData = {
  fullName: "",
  phone: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
};

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("address");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Form State
  const [shippingAddress, setShippingAddress] = useState<AddressData>(emptyAddress);
  const [deliverySlot, setDeliverySlot] = useState<DeliverySlot | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

  const subtotal = getCartTotal();
  const shippingFee = subtotal >= 50 ? 0 : 5.99;

  // Redirect if cart is empty
  if (items.length === 0 && currentStep !== "confirmation") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-10 pb-8">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some items to your cart before checking out
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const validateAddress = () => {
    const { fullName, phone, email, addressLine1, city, state } = shippingAddress;
    if (!fullName || !phone || !email || !addressLine1 || !city || !state) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validateDelivery = () => {
    if (!deliverySlot?.date || !deliverySlot?.timeSlot) {
      toast.error("Please select a delivery date and time");
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === "address" && validateAddress()) {
      setCurrentStep("delivery");
    } else if (currentStep === "delivery" && validateDelivery()) {
      setCurrentStep("payment");
    } else if (currentStep === "payment" && validatePayment()) {
      handlePlaceOrder();
    }
  };

  const handleBack = () => {
    if (currentStep === "delivery") {
      setCurrentStep("address");
    } else if (currentStep === "payment") {
      setCurrentStep("delivery");
    }
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate order number
    const newOrderNumber = `KM-${Date.now().toString(36).toUpperCase()}`;
    setOrderNumber(newOrderNumber);
    
    clearCart();
    setCurrentStep("confirmation");
    setIsSubmitting(false);
  };

  const getStepIndex = (step: CheckoutStep) => {
    return steps.findIndex((s) => s.id === step);
  };

  const isStepCompleted = (step: CheckoutStep) => {
    const currentIndex = getStepIndex(currentStep);
    const stepIndex = getStepIndex(step);
    return stepIndex < currentIndex;
  };

  const isStepActive = (step: CheckoutStep) => {
    return currentStep === step;
  };

  // Confirmation Screen
  if (currentStep === "confirmation") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-lg w-full text-center">
          <CardContent className="pt-10 pb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your order. We've sent a confirmation to{" "}
              <span className="font-medium text-foreground">{shippingAddress.email}</span>
            </p>
            
            <div className="bg-muted rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="text-xl font-mono font-bold">{orderNumber}</p>
            </div>

            <div className="text-sm text-muted-foreground mb-6">
              <p>
                Delivery scheduled for{" "}
                <span className="font-medium text-foreground">
                  {deliverySlot?.date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                {" "}between{" "}
                <span className="font-medium text-foreground">
                  {deliverySlot?.timeRange}
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/products">Continue Shopping</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Checkout</h1>
              <p className="text-sm text-muted-foreground">
                {items.length} items • ${subtotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const completed = isStepCompleted(step.id);
              const active = isStepActive(step.id);

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                        completed
                          ? "bg-primary text-primary-foreground"
                          : active
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {completed ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "hidden sm:block font-medium",
                        active ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "w-12 sm:w-24 h-0.5 mx-2 sm:mx-4",
                        completed ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {currentStep === "address" && (
                    <>
                      <MapPin className="h-5 w-5" />
                      Shipping Address
                    </>
                  )}
                  {currentStep === "delivery" && (
                    <>
                      <Truck className="h-5 w-5" />
                      Delivery Schedule
                    </>
                  )}
                  {currentStep === "payment" && (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentStep === "address" && (
                  <AddressForm
                    address={shippingAddress}
                    onChange={setShippingAddress}
                  />
                )}
                {currentStep === "delivery" && (
                  <DeliverySlotPicker
                    selectedSlot={deliverySlot}
                    onSelect={setDeliverySlot}
                  />
                )}
                {currentStep === "payment" && (
                  <PaymentMethodSelect
                    selected={paymentMethod}
                    onSelect={setPaymentMethod}
                  />
                )}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-6">
              {currentStep !== "address" && (
                <Button variant="outline" onClick={handleBack} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
              <Button
                className="flex-1 gap-2"
                onClick={handleNext}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : currentStep === "payment" ? (
                  <>
                    Place Order
                    <Check className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <OrderSummary shippingFee={shippingFee} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
