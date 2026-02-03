import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  Heart, 
  Star, 
  Plus, 
  Minus, 
  Check, 
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Share2
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products, Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { ProductGridCard } from "@/components/products/ProductGridCard";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const { addToCart, isInCart, items, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const cartItem = items.find((i) => i.product.id === product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  // If not enough in same category, add from other categories
  if (relatedProducts.length < 4) {
    const moreProducts = products
      .filter((p) => p.id !== product.id && !relatedProducts.includes(p))
      .slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...moreProducts);
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  const allImages = product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          <span>/</span>
          <Link 
            to={`/products/${product.categorySlug}`} 
            className="hover:text-foreground transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate">{product.name}</span>
        </nav>

        {/* Back Button */}
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Products
        </Link>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div 
              className="relative aspect-square bg-secondary/30 rounded-2xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={allImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discount > 0 && (
                  <Badge className="bg-cta text-cta-foreground font-bold text-sm">
                    -{discount}% OFF
                  </Badge>
                )}
                {product.badge && (
                  <Badge className="bg-fresh text-fresh-foreground">
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-background ${
                  inWishlist ? "text-cta" : "text-foreground/70"
                }`}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-cta" : ""}`} />
              </button>
            </motion.div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent hover:border-muted-foreground/30"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.brand} • {product.category}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.weight && (
                <p className="text-muted-foreground">{product.weight}</p>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.isHalal && (
                <Badge variant="outline" className="gap-1">
                  <Check className="h-3 w-3" /> Halal Certified
                </Badge>
              )}
              {product.isVegetarian && (
                <Badge variant="outline" className="gap-1 text-fresh border-fresh">
                  <Check className="h-3 w-3" /> Vegetarian
                </Badge>
              )}
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>

            <Separator />

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-fresh" />
                  <span className="text-fresh font-medium">In Stock</span>
                  <span className="text-muted-foreground">
                    ({product.stockCount} available)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-destructive font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              {!inCart ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    size="lg"
                    className="flex-1 gap-2"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => updateQuantity(product.id, (cartItem?.quantity || 1) - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {cartItem?.quantity || 0}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={() => addToCart(product)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="flex-1 gap-2"
                    asChild
                  >
                    <Link to="/products">
                      <Check className="h-5 w-5 text-fresh" />
                      In Cart - Continue Shopping
                    </Link>
                  </Button>
                </div>
              )}

              {/* Secondary Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart className={`h-4 w-4 ${inWishlist ? "fill-cta text-cta" : ""}`} />
                  {inWishlist ? "Saved" : "Save for Later"}
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center gap-2 p-3 rounded-lg bg-secondary/50">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">Free Delivery $50+</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-3 rounded-lg bg-secondary/50">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">Quality Guaranteed</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-3 rounded-lg bg-secondary/50">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            <TabsTrigger 
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="details"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              Product Details
            </TabsTrigger>
            <TabsTrigger 
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
            >
              Reviews ({product.reviewCount})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              <p className="text-muted-foreground mt-4">
                Experience the authentic taste of South Asian cuisine with our premium {product.name}. 
                Sourced from trusted suppliers and carefully selected to meet our high quality standards, 
                this product is perfect for your everyday cooking needs.
              </p>
              <h3 className="text-lg font-semibold mt-6 mb-3">Key Features:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Premium quality {product.category.toLowerCase()} product</li>
                <li>Authentic {product.brand} brand</li>
                <li>Perfect for traditional recipes</li>
                {product.isHalal && <li>Halal certified</li>}
                {product.isVegetarian && <li>100% Vegetarian</li>}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="mt-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Product Information</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Brand</dt>
                    <dd className="font-medium">{product.brand}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Category</dt>
                    <dd className="font-medium">{product.category}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Weight/Size</dt>
                    <dd className="font-medium">{product.weight}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">SKU</dt>
                    <dd className="font-medium uppercase">{product.id}</dd>
                  </div>
                </dl>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Dietary Information</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Halal</dt>
                    <dd className="font-medium">{product.isHalal ? "Yes" : "N/A"}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Vegetarian</dt>
                    <dd className="font-medium">{product.isVegetarian ? "Yes" : "No"}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Stock Status</dt>
                    <dd className={`font-medium ${product.inStock ? "text-fresh" : "text-destructive"}`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="text-center py-12">
              <Star className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Customer Reviews Coming Soon</h3>
              <p className="text-muted-foreground">
                Be the first to review this product!
              </p>
              <Button className="mt-4">Write a Review</Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
            <Link to="/products" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {relatedProducts.map((relatedProduct, idx) => (
              <ProductGridCard key={relatedProduct.id} product={relatedProduct} index={idx} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
