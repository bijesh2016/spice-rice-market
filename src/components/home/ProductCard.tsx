import { motion } from "framer-motion";
import { Plus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    badge?: string;
    weight?: string;
  };
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-secondary/50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <Badge className="bg-cta text-cta-foreground font-bold">
              -{discount}%
            </Badge>
          )}
          {product.badge && (
            <Badge className="bg-fresh text-fresh-foreground">
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
          <Heart className="h-4 w-4 text-foreground/70 hover:text-cta transition-colors" />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="w-full bg-primary hover:bg-primary/90 gap-2" size="sm">
            <Plus className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
        <h3 className="font-semibold text-foreground line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        {product.weight && (
          <p className="text-sm text-muted-foreground">{product.weight}</p>
        )}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
