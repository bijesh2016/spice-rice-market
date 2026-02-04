import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { SearchAutocomplete } from "@/components/search/SearchAutocomplete";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tazza Tazza Offer", href: "/products?offer=true", highlight: true },
  { label: "Rice", href: "/products/rice" },
  { label: "Spice", href: "/products/spice" },
  { label: "Dice", href: "/products/dice" },
  { 
    label: "Best Sellers", 
    href: "/products?featured=true",
    dropdown: ["Meat & Poultry", "Frozen Foods", "Snacks", "Beverages"]
  },
  { 
    label: "Fridge & Freezers", 
    href: "/products/fridge-freezers",
    dropdown: ["Frozen Momos", "Ice Cream", "Frozen Vegetables", "Ready Meals"]
  },
  { label: "Noodles", href: "/products/noodles" },
  { label: "Lentils & Beans", href: "/products/lentils-beans" },
  { 
    label: "Pantry Items", 
    href: "/products",
    dropdown: ["Cooking Oil", "Flour", "Sugar & Jaggery", "Canned Goods"]
  },
  { label: "Recipes", href: "/recipes" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <>
      {/* Promo Banner */}
      <div className="bg-gradient-warm text-cta-foreground py-2 px-4">
        <div className="container flex items-center justify-center gap-2 text-sm font-medium">
          <Gift className="h-4 w-4" />
          <span>Get $5 OFF your first order! Use code: KYOUDAI5</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-soft">
        <div className="container">
          {/* Top Row - Logo, Search, Actions */}
          <div className="flex items-center justify-between py-4 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">K</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-xl font-bold text-primary">Kyoudai</span>
                <span className="font-display text-xl font-bold text-accent">Mart</span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <SearchAutocomplete className="w-full" />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Search */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setMobileSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Account */}
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <User className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.span 
                    key={cartCount}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-cta text-cta-foreground text-xs font-bold flex items-center justify-center"
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </motion.span>
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Navigation Row - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 pb-3 overflow-x-auto">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`
                    flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${item.highlight 
                      ? "bg-cta/10 text-cta hover:bg-cta/20" 
                      : "text-foreground/80 hover:text-foreground hover:bg-secondary"
                    }
                  `}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="h-3 w-3" />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-background rounded-lg shadow-elevated border py-2 z-50"
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem}
                          to={`${item.href}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
                        >
                          {subItem}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b shadow-elevated overflow-hidden"
          >
            <nav className="container py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`
                    block px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${item.highlight 
                      ? "bg-cta/10 text-cta" 
                      : "text-foreground/80 hover:text-foreground hover:bg-secondary"
                    }
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden"
          >
            <div className="container py-4">
              <div className="flex items-center gap-2 mb-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setMobileSearchOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
                <span className="font-medium">Search</span>
              </div>
              <SearchAutocomplete 
                autoFocus 
                onClose={() => setMobileSearchOpen(false)} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <CartSidebar open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
