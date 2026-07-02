import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <Heart className="w-16 h-16 text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-8">
              Add items to your wishlist to save them for later
            </p>
            <Link to="/products">
              <Button size="lg" className="gap-2">
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          {items.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => clearWishlist()}
              className="text-destructive hover:text-destructive"
            >
              Clear All
            </Button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wishlist Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => {
              const discount = item.originalPrice
                ? Math.round((1 - item.price / item.originalPrice) * 100)
                : 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-elevated transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <Link
                          to={`/products/${item.slug}`}
                          className="w-24 h-24 rounded-lg overflow-hidden bg-secondary/50 flex-shrink-0 hover:shadow-md transition-shadow"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1">
                          <Link to={`/products/${item.slug}`} className="hover:underline">
                            <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mb-2">{item.brand}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {discount > 0 && (
                              <Badge className="bg-cta text-cta-foreground text-xs">
                                -{discount}%
                              </Badge>
                            )}
                            {!item.inStock && (
                              <Badge variant="destructive" className="text-xs">
                                Out of Stock
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-foreground">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 justify-between">
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="p-2 hover:bg-destructive/10 rounded-lg text-destructive hover:text-destructive transition-colors"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <Button
                            size="sm"
                            onClick={() => addToCart(item, 1)}
                            disabled={!item.inStock}
                            variant={item.inStock ? "default" : "secondary"}
                            className="gap-1"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span className="hidden sm:inline">Add</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Wishlist Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="sticky top-4">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Wishlist Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Items</span>
                        <span className="font-medium">{items.length}</span>
                      </div>
                      <div className="flex justify-between text-sm pb-3 border-b">
                        <span className="text-muted-foreground">In Stock</span>
                        <span className="font-medium text-green-600">
                          {items.filter(i => i.inStock).length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground">Total Value</span>
                        <span className="text-2xl font-bold text-cta">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <p className="text-xs text-muted-foreground text-center">
                      💡 Pro tip: This wishlist helps you keep track of items you love
                    </p>
                    <Link to="/products">
                      <Button variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
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
