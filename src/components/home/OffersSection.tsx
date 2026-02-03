import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

// Get products with discounts for the offers section
const offerProducts = products.filter(p => p.originalPrice).slice(0, 4);

export function OffersSection() {
  return (
    <section className="py-16 md:py-20 bg-cta/5">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cta">
              <Flame className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Limited Time</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Tazza Tazza Offer
            </h2>
            <p className="text-muted-foreground max-w-md">
              Fresh deals on your favorite products. Hurry, these prices won't last!
            </p>
          </div>
          <Button variant="outline" className="gap-2 group shrink-0" asChild>
            <Link to="/products">
              View All Offers
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {offerProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
