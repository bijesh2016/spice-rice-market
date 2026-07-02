import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const txnId = searchParams.get("oid");
  const refId = searchParams.get("refId");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verify payment with backend
    const verifyPayment = async () => {
      try {
        // In production, call your backend endpoint to verify the transaction
        // const response = await fetch(`/api/verify-payment?txnId=${txnId}&refId=${refId}`);
        // const data = await response.json();
        
        setLoading(false);
      } catch (error) {
        console.error("Verification error:", error);
        setLoading(false);
      }
    };

    if (txnId) {
      verifyPayment();
    } else {
      setLoading(false);
    }
  }, [txnId, refId]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-3xl">Payment Successful!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-muted-foreground">
                Thank you for your purchase. Your order has been confirmed and you'll
                receive a confirmation email shortly.
              </p>

              {txnId && (
                <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                  <p className="text-xs text-muted-foreground">Transaction ID</p>
                  <p className="font-mono font-bold text-foreground break-all">{txnId}</p>
                  {refId && (
                    <>
                      <p className="text-xs text-muted-foreground pt-2">Reference ID</p>
                      <p className="font-mono font-bold text-foreground break-all">{refId}</p>
                    </>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground mb-2">Next Steps:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Check your email for order confirmation</li>
                  <li>✓ Track your order status in your account</li>
                  <li>✓ Expected delivery: 3-5 business days</li>
                </ul>
              </div>

              <Link to="/products">
                <Button size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
