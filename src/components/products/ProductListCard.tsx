import { motion } from "framer-motion";
import { Plus, Heart, Star, Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Link } from "react-router-dom";

interface ProductListCardProps {
  product: Product;
  index?: number;
}

export function ProductListCard({ product, index = 0 }: ProductListCardProps) {
  const { addToCart, removeFromCart, isInCart, items, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const cartItem = items.find(i => i.product.id === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 flex"
    >
      {/* Image */}
      <Link to={`/products/${product.slug}`} className="block w-32 sm:w-48 flex-shrink-0">
        <div className="relative h-full bg-secondary/50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discount > 0 && (
              <Badge className="bg-cta text-cta-foreground font-bold text-xs">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{product.category}</p>
              <Link to={`/products/${product.slug}`}>
                <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>
            </div>
            <button 
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              onClick={() => toggleWishlist(product)}
            >
              <Heart className={`h-4 w-4 transition-colors ${inWishlist ? 'fill-cta text-cta' : 'text-muted-foreground hover:text-cta'}`} />
            </button>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2 hidden sm:block">
            {product.description}
          </p>

          {/* Rating & Tags */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
            {product.badge && (
              <Badge variant="secondary" className="text-xs">{product.badge}</Badge>
            )}
            {product.isHalal && (
              <Badge variant="outline" className="text-xs">Halal</Badge>
            )}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.weight && (
              <p className="text-xs text-muted-foreground">{product.weight}</p>
            )}
          </div>
          
          {inCart && cartItem ? (
            <div className="flex items-center gap-2">
              <Button 
                size="icon" 
                variant="outline"
                className="h-8 w-8"
                onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center font-medium">{cartItem.quantity}</span>
              <Button 
                size="icon" 
                variant="outline"
                className="h-8 w-8"
                onClick={() => addToCart(product)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <Button 
              className="gap-2 bg-primary hover:bg-primary/90"
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
            >
              <Plus className="h-4 w-4" />
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
