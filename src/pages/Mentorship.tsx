import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { packages } from "@/data/site";
import { cn } from "@/lib/utils";

const Mentorship = () => {
  return (
    <>
      <section className="border-b border-border bg-card/30 py-14">
        <div className="container-tight text-center">
          <Badge variant="outline" className="border-primary/40 text-primary mb-3">Mentorship</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Learn from a working trader</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            From a free discovery call to a full 8-week mentorship — pick the path that fits where you are.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-tight">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-gradient-card p-6 transition-all",
                  p.highlight
                    ? "border-primary/60 shadow-elevated"
                    : "border-border hover:border-primary/30",
                )}
              >
                {p.highlight && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground border-transparent">
                    <Sparkles className="h-3 w-3 mr-1" /> Most popular
                  </Badge>
                )}

                <h3 className="font-display text-xl font-bold">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{p.duration} · {p.delivery}</p>

                <div className="mt-4">
                  <span className="font-display text-3xl font-bold text-gradient">{p.price}</span>
                </div>

                <p className="mt-3 text-sm text-muted-foreground flex-1">{p.description}</p>

                <ul className="mt-5 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={cn(
                    "mt-6",
                    p.highlight
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-card border border-border hover:border-primary hover:text-primary",
                  )}
                  variant={p.highlight ? "default" : "outline"}
                >
                  <Link to={`/booking?package=${p.slug}`}>
                    Book now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Mentorship;
