import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tazza Tazza Offer", href: "/offers", highlight: true },
  { label: "Rice", href: "/products/rice" },
  { label: "Spice", href: "/products/spice" },
  { label: "Dice", href: "/products/dice" },
  { 
    label: "Best Sellers", 
    href: "/products/best-sellers",
    dropdown: [
      { label: "Meat & Poultry", href: "/products/dice" },
      { label: "Frozen Foods", href: "/products/fridge-freezers" },
      { label: "Snacks", href: "/products/noodles" },
      { label: "All Products", href: "/products" },
    ]
  },
  { 
    label: "Fridge & Freezers", 
    href: "/products/fridge-freezers",
    dropdown: [
      { label: "Frozen Momos", href: "/products/fridge-freezers" },
      { label: "Ice Cream", href: "/products/fridge-freezers" },
      { label: "Frozen Vegetables", href: "/products/fridge-freezers" },
      { label: "All Frozen", href: "/products/fridge-freezers" },
    ]
  },
  { label: "Noodles", href: "/products/noodles" },
  { label: "Lentils & Beans", href: "/products/lentils-beans" },
  { 
    label: "Pantry Items", 
    href: "/products/pantry",
    dropdown: [
      { label: "Cooking Oil", href: "/products/pantry" },
      { label: "Flour", href: "/products/pantry" },
      { label: "Sugar & Jaggery", href: "/products/pantry" },
      { label: "All Pantry", href: "/products/pantry" },
    ]
  },
  { label: "Recipes", href: "/recipes" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [cartCount] = useState(3);

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
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for rice, spices, momos..."
                  className="w-full pl-11 pr-4 py-3 rounded-full border bg-secondary/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Search */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>

              {/* Account */}
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <User className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-cta text-cta-foreground text-xs font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
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
                          key={subItem.label}
                          to={subItem.href}
                          className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
                        >
                          {subItem.label}
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
    </>
  );
}
