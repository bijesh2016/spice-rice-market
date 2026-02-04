import { useState, useRef, useEffect, useMemo } from "react";
import { Search, Package, Tag, Building2, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { products, categories, brands } from "@/data/products";

interface SearchSuggestion {
  type: 'product' | 'category' | 'brand';
  id: string;
  name: string;
  slug?: string;
  image?: string;
  price?: number;
  category?: string;
}

interface SearchAutocompleteProps {
  className?: string;
  placeholder?: string;
  onClose?: () => void;
  autoFocus?: boolean;
}

export function SearchAutocomplete({ 
  className = "", 
  placeholder = "Search for rice, spices, momos...",
  onClose,
  autoFocus = false
}: SearchAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Generate suggestions based on query
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    const results: SearchSuggestion[] = [];

    // Search products (limit to 5)
    const matchedProducts = products
      .filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
      .slice(0, 5)
      .map(p => ({
        type: 'product' as const,
        id: p.id,
        name: p.name,
        slug: p.slug,
        image: p.image,
        price: p.price,
        category: p.category
      }));
    results.push(...matchedProducts);

    // Search categories (limit to 3)
    const matchedCategories = categories
      .filter(c => c.slug !== 'all' && c.name.toLowerCase().includes(searchTerm))
      .slice(0, 3)
      .map(c => ({
        type: 'category' as const,
        id: c.slug,
        name: c.name,
        slug: c.slug
      }));
    results.push(...matchedCategories);

    // Search brands (limit to 3)
    const matchedBrands = brands
      .filter(b => b.toLowerCase().includes(searchTerm))
      .slice(0, 3)
      .map(b => ({
        type: 'brand' as const,
        id: b,
        name: b
      }));
    results.push(...matchedBrands);

    return results;
  }, [query]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto focus on mount if specified
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "Enter" && query.trim()) {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
      onClose?.();
    }
  };

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    switch (suggestion.type) {
      case 'product':
        navigate(`/product/${suggestion.slug}`);
        break;
      case 'category':
        navigate(`/products/${suggestion.slug}`);
        break;
      case 'brand':
        navigate(`/products?brand=${encodeURIComponent(suggestion.name)}`);
        break;
    }
    setIsOpen(false);
    setQuery("");
    onClose?.();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'product': return Package;
      case 'category': return Tag;
      case 'brand': return Building2;
      default: return Search;
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case 'product': return 'Product';
      case 'category': return 'Category';
      case 'brand': return 'Brand';
      default: return '';
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-3 rounded-full border bg-secondary/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isOpen && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background rounded-xl shadow-elevated border overflow-hidden z-50"
          >
            {suggestions.length > 0 ? (
              <div className="py-2">
                {/* Group by type */}
                {['product', 'category', 'brand'].map(type => {
                  const typeSuggestions = suggestions.filter(s => s.type === type);
                  if (typeSuggestions.length === 0) return null;

                  return (
                    <div key={type}>
                      <div className="px-4 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {type === 'product' ? 'Products' : type === 'category' ? 'Categories' : 'Brands'}
                      </div>
                      {typeSuggestions.map((suggestion) => {
                        const globalIndex = suggestions.indexOf(suggestion);
                        const Icon = getIcon(suggestion.type);
                        
                        return (
                          <button
                            key={`${suggestion.type}-${suggestion.id}`}
                            onClick={() => handleSelectSuggestion(suggestion)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                              selectedIndex === globalIndex 
                                ? "bg-secondary" 
                                : "hover:bg-secondary/50"
                            }`}
                          >
                            {suggestion.type === 'product' && suggestion.image ? (
                              <img 
                                src={suggestion.image} 
                                alt={suggestion.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                                <Icon className="h-5 w-5 text-muted-foreground" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">
                                {suggestion.name}
                              </p>
                              {suggestion.type === 'product' && (
                                <p className="text-sm text-muted-foreground">
                                  {suggestion.category} • ${suggestion.price?.toFixed(2)}
                                </p>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                              {getLabel(suggestion.type)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}

                {/* Search all button */}
                <div className="border-t mt-2 pt-2 px-2">
                  <button
                    onClick={handleSearch}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-primary hover:bg-secondary rounded-lg transition-colors"
                  >
                    <span>Search all for "{query}"</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-muted-foreground">No results found for "{query}"</p>
                <button
                  onClick={handleSearch}
                  className="mt-2 text-sm text-primary hover:underline"
                >
                  Search all products
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
