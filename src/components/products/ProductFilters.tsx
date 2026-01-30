import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categories, brands, priceRanges } from "@/data/products";

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

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalProducts: number;
  filteredCount: number;
}

export function ProductFilters({ filters, onFiltersChange, totalProducts, filteredCount }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    dietary: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: 'all',
      brands: [],
      priceRange: { min: 0, max: 100 },
      dietary: { halal: false, vegetarian: false },
      inStock: false,
    });
  };

  const activeFilterCount = 
    (filters.category !== 'all' ? 1 : 0) +
    filters.brands.length +
    (filters.priceRange.min > 0 || filters.priceRange.max < 100 ? 1 : 0) +
    (filters.dietary.halal ? 1 : 0) +
    (filters.dietary.vegetarian ? 1 : 0) +
    (filters.inStock ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="pb-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Active Filters</span>
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-auto py-1 px-2 text-xs">
              Clear all
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.category !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {filters.category}
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ category: 'all' })} />
              </Badge>
            )}
            {filters.brands.map(brand => (
              <Badge key={brand} variant="secondary" className="gap-1">
                {brand}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => updateFilters({ brands: filters.brands.filter(b => b !== brand) })} 
                />
              </Badge>
            ))}
            {filters.dietary.halal && (
              <Badge variant="secondary" className="gap-1">
                Halal
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ dietary: { ...filters.dietary, halal: false } })} />
              </Badge>
            )}
            {filters.dietary.vegetarian && (
              <Badge variant="secondary" className="gap-1">
                Vegetarian
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ dietary: { ...filters.dietary, vegetarian: false } })} />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Categories */}
      <div>
        <button 
          className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground"
          onClick={() => toggleSection('category')}
        >
          Categories
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.category ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {expandedSections.category && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-2">
                {categories.map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => updateFilters({ category: cat.slug })}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                      filters.category === cat.slug 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs opacity-70">{cat.count}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range */}
      <div className="border-t border-border pt-4">
        <button 
          className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground"
          onClick={() => toggleSection('price')}
        >
          Price Range
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {expandedSections.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2">
                <Slider
                  value={[filters.priceRange.min, filters.priceRange.max]}
                  min={0}
                  max={50}
                  step={1}
                  onValueChange={([min, max]) => updateFilters({ priceRange: { min, max } })}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${filters.priceRange.min}</span>
                  <span>${filters.priceRange.max}+</span>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                {priceRanges.map(range => (
                  <button
                    key={range.label}
                    onClick={() => updateFilters({ priceRange: { min: range.min, max: range.max === Infinity ? 100 : range.max } })}
                    className="block w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brands */}
      <div className="border-t border-border pt-4">
        <button 
          className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground"
          onClick={() => toggleSection('brand')}
        >
          Brands
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.brand ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {expandedSections.brand && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-2">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-3 px-2 py-1.5 cursor-pointer hover:bg-secondary rounded-md transition-colors">
                    <Checkbox
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilters({ brands: [...filters.brands, brand] });
                        } else {
                          updateFilters({ brands: filters.brands.filter(b => b !== brand) });
                        }
                      }}
                    />
                    <span className="text-sm text-muted-foreground">{brand}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dietary */}
      <div className="border-t border-border pt-4">
        <button 
          className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground"
          onClick={() => toggleSection('dietary')}
        >
          Dietary
          <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.dietary ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {expandedSections.dietary && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-3 px-2 py-1.5 cursor-pointer hover:bg-secondary rounded-md transition-colors">
                  <Checkbox
                    checked={filters.dietary.halal}
                    onCheckedChange={(checked) => updateFilters({ dietary: { ...filters.dietary, halal: !!checked } })}
                  />
                  <span className="text-sm text-muted-foreground">Halal</span>
                </label>
                <label className="flex items-center gap-3 px-2 py-1.5 cursor-pointer hover:bg-secondary rounded-md transition-colors">
                  <Checkbox
                    checked={filters.dietary.vegetarian}
                    onCheckedChange={(checked) => updateFilters({ dietary: { ...filters.dietary, vegetarian: !!checked } })}
                  />
                  <span className="text-sm text-muted-foreground">Vegetarian</span>
                </label>
                <label className="flex items-center gap-3 px-2 py-1.5 cursor-pointer hover:bg-secondary rounded-md transition-colors">
                  <Checkbox
                    checked={filters.inStock}
                    onCheckedChange={(checked) => updateFilters({ inStock: !!checked })}
                  />
                  <span className="text-sm text-muted-foreground">In Stock Only</span>
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-card rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Filters</h3>
            <span className="text-xs text-muted-foreground">
              {filteredCount} of {totalProducts}
            </span>
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="lg:hidden gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
