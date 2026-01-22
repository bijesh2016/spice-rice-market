import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";

const categories = [
  { label: "Rice", href: "/rice" },
  { label: "Spice", href: "/spice" },
  { label: "Dice (Fresh)", href: "/dice" },
  { label: "Noodles", href: "/noodles" },
  { label: "Lentils & Beans", href: "/lentils" },
  { label: "Pantry Items", href: "/pantry" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Recipes", href: "/recipes" },
  { label: "Rewards Program", href: "/rewards" },
  { label: "Delivery Info", href: "/delivery" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faq" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <span className="font-display font-bold text-lg text-accent">K</span>
              </div>
              <div>
                <span className="font-display text-xl font-bold">Kyoudai</span>
                <span className="font-display text-xl font-bold text-accent">Mart</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Your one-stop shop for authentic South Asian groceries. Premium quality at the best prices, delivered fresh to your door.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Shop Categories</h4>
            <ul className="space-y-2">
              {categories.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-primary-foreground/70 hover:text-accent text-sm transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-primary-foreground/70 hover:text-accent text-sm transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <span className="text-primary-foreground/70 text-sm">
                  123 Grocery Lane, Fresh City, FC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a href="tel:+1234567890" className="text-primary-foreground/70 hover:text-accent text-sm transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a href="mailto:hello@kyoudaimart.com" className="text-primary-foreground/70 hover:text-accent text-sm transition-colors">
                  hello@kyoudaimart.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <span className="text-primary-foreground/70 text-sm">
                  Mon - Sun: 8:00 AM - 10:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>© 2024 KyoudaiMart. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
