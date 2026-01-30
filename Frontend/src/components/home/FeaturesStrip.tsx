import { motion } from "framer-motion";
import { Truck, Clock, ShieldCheck, CreditCard } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders over $50"
  },
  {
    icon: Clock,
    title: "Same Day Delivery",
    description: "Order before 2 PM"
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "100% fresh products"
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Multiple options"
  },
];

export function FeaturesStrip() {
  return (
    <section className="py-8 bg-primary">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-primary-foreground">{feature.title}</h4>
                <p className="text-sm text-primary-foreground/70">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
