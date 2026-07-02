import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

interface CheckoutState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  notes: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState<CheckoutState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    notes: "",
  });

  const total = getCartTotal();
  const tax = total * 0.08;
  const finalTotal = total + tax;

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <h1 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Add items to your cart before checking out
            </p>
            <Link to="/products">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) { toast({ title: "Error", description: "First name is required" }); return false; }
    if (!formData.lastName.trim()) { toast({ title: "Error", description: "Last name is required" }); return false; }
    if (!formData.email.trim() || !formData.email.includes("@")) { toast({ title: "Error", description: "Valid email is required" }); return false; }
    if (!formData.phone.trim()) { toast({ title: "Error", description: "Phone number is required" }); return false; }
    if (!formData.address.trim()) { toast({ title: "Error", description: "Address is required" }); return false; }
    if (!formData.city.trim()) { toast({ title: "Error", description: "City is required" }); return false; }
    if (!formData.zipCode.trim()) { toast({ title: "Error", description: "ZIP code is required" }); return false; }
    return true;
  };

  const handleESewaPayment = async () => {
    if (!validateForm()) return;

    setPaymentProcessing(true);

    try {
      // Generate unique transaction ID
      const txnId = `TXN${Date.now()}`;
      setOrderId(txnId);

      // eSewa payment details
      const amount = finalTotal.toFixed(2);
      const taxAmount = tax.toFixed(2);
      const productCode = "EPAYTEST"; // Use your actual product code
      
      // Create order payload
      const orderData = {
        txnId,
        amount,
        taxAmount,
        productCode,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        notes: formData.notes,
        items: items.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
      };

      // In production, you would send this to your backend
      // For now, we'll simulate the payment process
      console.log("Order Data:", orderData);

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For production, redirect to eSewa:
      // const esewaURL = `https://esewa.com.np/epay/main?amt=${amount}&psc=${taxAmount}&prid=${productCode}&scd=EPAYTEST&su=http://localhost:5173/checkout-success&fu=http://localhost:5173/checkout-failed`;
      // window.location.href = esewaURL;

      // For demo, just show success
      setOrderPlaced(true);
      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: `Order ID: ${txnId}`,
      });
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "Unable to process payment. Please try again.",
      });
    } finally {
      setPaymentProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-12"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-4">
              Thank you for your order. You'll receive a confirmation email shortly.
            </p>
            <div className="bg-secondary/50 rounded-lg p-4 mb-8">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono font-bold text-foreground">{orderId}</p>
            </div>
            <Link to="/products">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link to="/cart" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">
                        First Name
                      </label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        disabled={paymentProcessing}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">
                        Last Name
                      </label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        disabled={paymentProcessing}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="abc@example.com"
                      disabled={paymentProcessing}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+977 1234567890"
                      disabled={paymentProcessing}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Street Address
                    </label>
                    <Input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      disabled={paymentProcessing}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">
                        City
                      </label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Kathmandu"
                        disabled={paymentProcessing}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">
                        ZIP Code
                      </label>
                      <Input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="44600"
                        disabled={paymentProcessing}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any special instructions for delivery..."
                      disabled={paymentProcessing}
                      className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center pb-4 border-b last:border-b-0">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-foreground">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Order Summary & Payment */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-cta">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Payment Methods */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm text-foreground mb-3">Payment Method</h3>
                      
                      <Button
                        onClick={handleESewaPayment}
                        disabled={paymentProcessing}
                        className="w-full gap-2 h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                        size="lg"
                      >
                        {paymentProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                        {paymentProcessing ? "Processing..." : "Pay with eSewa"}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center pt-2">
                        eSewa is a secure payment gateway. Your payment information is encrypted.
                      </p>
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="bg-secondary/50 rounded-lg p-3 mt-6">
                    <p className="text-xs text-muted-foreground">
                      ✓ Secure encrypted checkout<br/>
                      ✓ Money-back guarantee<br/>
                      ✓ Free shipping on orders
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
