import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutFailed() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <Card className="border-destructive/50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
              </div>
              <CardTitle className="text-3xl text-destructive">Payment Failed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-muted-foreground">
                Unfortunately, your payment could not be processed. Your cart items are
                still saved and ready for checkout.
              </p>

              <div className="bg-destructive/5 rounded-lg p-4 border border-destructive/20">
                <p className="text-sm text-destructive font-medium">
                  Common reasons for payment failure:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Insufficient funds in your account</li>
                  <li>• Incorrect payment details</li>
                  <li>• Payment gateway timeout</li>
                  <li>• Transaction cancelled by user</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  What you can do:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Review your payment information</li>
                  <li>✓ Check your account balance</li>
                  <li>✓ Try a different payment method</li>
                  <li>✓ Contact customer support for assistance</li>
                </ul>
              </div>

              <div className="space-y-2">
                <Link to="/checkout">
                  <Button size="lg" className="w-full gap-2">
                    Try Again
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button variant="outline" size="lg" className="w-full">
                    Back to Cart
                  </Button>
                </Link>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground text-center">
                  Need help? <a href="mailto:support@kyoudaimart.com" className="text-primary hover:underline">Contact our support team</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
