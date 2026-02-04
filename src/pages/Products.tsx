import { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductSort, SortOption } from "@/components/products/ProductSort";
import { ProductGridCard } from "@/components/products/ProductGridCard";
import { ProductListCard } from "@/components/products/ProductListCard";
import { Input } from "@/components/ui/input";
import { products, categories } from "@/data/products";

interface FilterState {
  category: string;
  brands: string[];
  priceRange: { min: number; max: number };
  dietary: {
    halal: boolean;
    vegetarian: boolean;
  };
  inStock: boolean;
}

export default function Products() {
  const { category: categoryParam } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const searchQueryParam = searchParams.get("search") || "";
  const brandParam = searchParams.get("brand") || "";
  
  const [searchQuery, setSearchQuery] = useState(searchQueryParam);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    category: categoryParam || 'all',
    brands: brandParam ? [brandParam] : [],
    priceRange: { min: 0, max: 100 },
    dietary: { halal: false, vegetarian: false },
    inStock: false,
  });

  // Update filters when URL changes
  useEffect(() => {
    if (categoryParam) {
      const validCategory = categories.find(c => c.slug === categoryParam);
      if (validCategory) {
        setFilters(prev => ({ ...prev, category: categoryParam }));
      }
    } else {
      setFilters(prev => ({ ...prev, category: 'all' }));
    }
  }, [categoryParam]);

  // Update search and brand from URL params
  useEffect(() => {
    setSearchQuery(searchQueryParam);
  }, [searchQueryParam]);

  useEffect(() => {
    if (brandParam) {
      setFilters(prev => ({ ...prev, brands: [brandParam] }));
    }
  }, [brandParam]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(p => p.categorySlug === filters.category);
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }

    // Price range filter
    result = result.filter(p => 
      p.price >= filters.priceRange.min && 
      (filters.priceRange.max >= 100 || p.price <= filters.priceRange.max)
    );

    // Dietary filters
    if (filters.dietary.halal) {
      result = result.filter(p => p.isHalal);
    }
    if (filters.dietary.vegetarian) {
      result = result.filter(p => p.isVegetarian);
    }

    // In stock filter
    if (filters.inStock) {
      result = result.filter(p => p.inStock);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-hero py-12 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4"
          >
            Our Products
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 max-w-xl mx-auto mb-6"
          >
            Discover authentic South Asian groceries, fresh produce, and premium spices
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search"
              placeholder="Search products, brands..."
              className="pl-12 h-12 bg-background/95 border-0 shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <ProductFilters 
            filters={filters}
            onFiltersChange={setFilters}
            totalProducts={products.length}
            filteredCount={filteredProducts.length}
          />

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {/* Sort Bar */}
            <ProductSort 
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              productCount={filteredProducts.length}
            />

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className={`mt-6 ${
                viewMode === 'grid' 
                  ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6' 
                  : 'flex flex-col gap-4'
              }`}>
                {filteredProducts.map((product, index) => (
                  viewMode === 'grid' ? (
                    <ProductGridCard key={product.id} product={product} index={index} />
                  ) : (
                    <ProductListCard key={product.id} product={product} index={index} />
                  )
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-2">No products found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters or search term</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
