import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tag, Clock, Percent, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/data/products";

const offers = [
  {
    id: 'offer1',
    title: 'Spice Festival Sale',
    description: 'Get up to 25% off on all spices and masalas. Stock up on your favorites!',
    discount: '25% OFF',
    code: 'SPICE25',
    validUntil: 'Mar 31, 2026',
    categorySlug: 'spice',
    bgColor: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
    borderColor: 'border-orange-500/20',
  },
  {
    id: 'offer2',
    title: 'Rice Bonanza',
    description: 'Premium basmati rice at unbeatable prices. Limited time offer!',
    discount: '$5 OFF',
    code: 'RICE5',
    validUntil: 'Apr 15, 2026',
    categorySlug: 'rice',
    bgColor: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
    borderColor: 'border-green-500/20',
  },
  {
    id: 'offer3',
    title: 'Frozen Favorites',
    description: 'Buy 2 Get 1 Free on all frozen items including momos and ready meals.',
    discount: 'B2G1',
    code: 'FREEZE3',
    validUntil: 'Mar 20, 2026',
    categorySlug: 'fridge-freezers',
    bgColor: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    id: 'offer4',
    title: 'First Order Special',
    description: 'New to KyoudaiMart? Enjoy $5 off your first order!',
    discount: '$5 OFF',
    code: 'KYOUDAI5',
    validUntil: 'Ongoing',
    categorySlug: null,
    bgColor: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
    borderColor: 'border-purple-500/20',
  },
];

const discountedProducts = products.filter(p => p.originalPrice);

export default function Offers() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-hero py-12 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Tag className="h-8 w-8 text-primary-foreground" />
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
              Tazza Tazza Offers
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 max-w-xl mx-auto"
          >
            Fresh deals on fresh products — grab them before they're gone!
          </motion.p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Offer Cards */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-6">Current Offers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {offers.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`${offer.bgColor} ${offer.borderColor} border-2`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
                        {offer.discount}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {offer.validUntil}
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2">{offer.title}</h3>
                    <p className="text-muted-foreground mb-4">{offer.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Percent className="h-4 w-4 text-muted-foreground" />
                        <code className="bg-secondary px-3 py-1 rounded text-sm font-mono font-bold">
                          {offer.code}
                        </code>
                      </div>
                      {offer.categorySlug && (
                        <Link to={`/products/${offer.categorySlug}`}>
                          <Button variant="outline" size="sm">
                            Shop Now <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Discounted Products */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-6">Products on Sale</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {discountedProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-elevated transition-shadow">
                  <div className="relative aspect-square">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <Badge className="absolute top-2 left-2 bg-cta text-cta-foreground">
                      {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                    <h3 className="font-medium text-sm mt-1 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                      <span className="text-sm line-through text-muted-foreground">
                        ${product.originalPrice!.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
