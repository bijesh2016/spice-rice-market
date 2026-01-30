import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "rice",
    title: "Premium Rice",
    description: "Basmati, Jasmine & more",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&h=400&fit=crop",
    color: "from-amber-500/20 to-amber-600/30",
    products: 45
  },
  {
    id: "spice",
    title: "Authentic Spices",
    description: "From masalas to whole spices",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop",
    color: "from-red-500/20 to-orange-600/30",
    products: 120
  },
  {
    id: "dice",
    title: "Fresh Meat & Produce",
    description: "Halal certified meats",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&h=400&fit=crop",
    color: "from-rose-500/20 to-red-600/30",
    products: 38
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide selection of authentic South Asian groceries, from premium rice to fresh meats
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.a
              key={category.id}
              href={`/${category.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} group-hover:opacity-90 transition-opacity`} />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform group-hover:-translate-y-2 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-background/20 backdrop-blur-sm rounded-full text-xs font-medium text-white mb-3">
                    {category.products} Products
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    {category.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white font-medium text-sm group-hover:gap-3 transition-all">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
