import { motion } from "framer-motion";
import { ArrowRight, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

// Get premium meat products (Dice category) or featured products
const premiumProducts = products
  .filter(p => p.categorySlug === 'dice' || p.isHalal)
  .slice(0, 4);

export function PremiumCollection() {
  return (
    <section className="py-16 md:py-20 bg-primary/5">
      <div className="container">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-12 mb-12"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-fresh/20 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                  Premium Masu Collection
                </h2>
                <p className="text-primary-foreground/80">
                  Halal certified, premium quality meats for your special occasions
                </p>
              </div>
            </div>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 group shrink-0" asChild>
              <Link to="/products/dice">
                <Sparkles className="h-4 w-4" />
                Explore Collection
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {premiumProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
