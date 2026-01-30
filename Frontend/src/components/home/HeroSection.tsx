import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-fresh blur-3xl" />
      </div>

      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/30">
              <Leaf className="h-4 w-4" />
              <span className="text-sm font-medium">Fresh Veggies Delivered 7 Days</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              One Stop Shop for All Your{" "}
              <span className="text-accent">Grocery Needs</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mx-auto lg:mx-0">
              Premium quality you'd expect at best prices you wouldn't. Authentic South Asian groceries delivered fresh to your doorstep.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 gap-2 group">
                Shop Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                View Recipes
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6">
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <Truck className="h-5 w-5 text-accent" />
                <span className="text-sm">Free Delivery $50+</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <span className="text-sm">Quality Guaranteed</span>
              </div>
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-foreground/20 animate-spin" style={{ animationDuration: "30s" }} />
              <div className="absolute inset-8 rounded-full border-2 border-dashed border-accent/30 animate-spin" style={{ animationDuration: "25s", animationDirection: "reverse" }} />
              
              {/* Center image placeholder - replace with actual product image */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-accent/20 to-fresh/20 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center space-y-2">
                  <span className="text-6xl">🍛</span>
                  <p className="text-primary-foreground/80 text-sm font-medium">Fresh & Authentic</p>
                </div>
              </div>

              {/* Floating product badges */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 right-10 bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-elevated"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🍚</span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Basmati Rice</p>
                    <p className="text-fresh text-sm font-medium">From $14.99</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-20 left-0 bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-elevated"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🥟</span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Fresh Momos</p>
                    <p className="text-fresh text-sm font-medium">From $8.99</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
