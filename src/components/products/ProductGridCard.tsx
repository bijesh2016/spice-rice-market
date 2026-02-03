import { motion } from "framer-motion";
import { Plus, Heart, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Link } from "react-router-dom";

interface ProductGridCardProps {
  product: Product;
  index?: number;
}

export function ProductGridCard({ product, index = 0 }: ProductGridCardProps) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
    >
      {/* Image Container */}
      <Link to={`/product/${product.slug}`} className="block">
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
            {product.isHalal && (
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-xs">
                Halal
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button 
            className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-background ${inWishlist ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
          >
            <Heart className={`h-4 w-4 transition-colors ${inWishlist ? 'fill-cta text-cta' : 'text-foreground/70 hover:text-cta'}`} />
          </button>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-foreground line-clamp-2 min-h-[2.5rem] hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {product.weight && (
          <p className="text-sm text-muted-foreground">{product.weight}</p>
        )}
        
        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <Button 
            size="icon" 
            className={`h-9 w-9 rounded-full ${inCart ? 'bg-fresh hover:bg-fresh/90' : 'bg-primary hover:bg-primary/90'}`}
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
          >
            {inCart ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
