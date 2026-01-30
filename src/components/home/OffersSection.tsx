import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";

const offerProducts = [
  {
    id: "1",
    name: "India Gate Basmati Rice Premium",
    price: 7.99,
    originalPrice: 12.99,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    category: "Rice",
    weight: "5 Kg",
    badge: "Best Seller"
  },
  {
    id: "2",
    name: "Wai Wai Instant Noodles Pack",
    price: 4.99,
    originalPrice: 6.99,
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=400&fit=crop",
    category: "Noodles",
    weight: "Pack of 10"
  },
  {
    id: "3",
    name: "Fresh Goat Meat Curry Cut",
    price: 14.99,
    originalPrice: 19.99,
    image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=400&fit=crop",
    category: "Meat",
    weight: "1 Kg",
    badge: "Fresh"
  },
  {
    id: "4",
    name: "Organic Turmeric Powder",
    price: 3.49,
    originalPrice: 5.99,
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop",
    category: "Spice",
    weight: "200g"
  },
];

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
          <Button variant="outline" className="gap-2 group shrink-0">
            View All Offers
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
