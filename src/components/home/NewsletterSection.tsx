import { motion } from "framer-motion";
import { Mail, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-warm p-8 md:p-12"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Content */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white mb-4">
                <Gift className="h-4 w-4" />
                <span className="text-sm font-medium">Get $5 OFF your first order!</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                Join Our Newsletter
              </h2>
              <p className="text-white/80 max-w-md">
                Subscribe for exclusive deals, new product alerts, and authentic recipes straight to your inbox.
              </p>
            </div>

            {/* Form */}
            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full sm:w-72 pl-12 pr-4 py-3 rounded-xl bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-white/60 mt-3 text-center sm:text-left">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
