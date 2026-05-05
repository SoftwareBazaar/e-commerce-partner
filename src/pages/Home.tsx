import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Bot, CheckCircle2, MessagesSquare, Rocket, Search, ShieldCheck, Sparkles, Star, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { stats, testimonials } from "@/data/site";
import { useCountUp } from "@/hooks/use-count-up";
import heroBg from "@/assets/hero-bg.jpg";

const StatItem = ({ value, label, suffix }: { value: number; label: string; suffix?: string }) => {
  const { value: v, ref } = useCountUp(value);
  return (
    <div className="text-center">
      <p className="font-display text-4xl md:text-5xl font-bold text-gradient">
        <span ref={ref}>{v.toLocaleString()}</span>{suffix}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

const Home = () => {
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroBg}
            alt=""
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
          <div className="absolute inset-0 bg-grid opacity-30" />
        </div>

        <div className="container-tight relative pt-24 pb-24 md:pt-32 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="outline" className="border-primary/40 bg-primary/5 text-primary mb-6 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Trusted by 2,400+ traders worldwide
            </Badge>

            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Trade Smarter.
              <br />
              <span className="text-gradient">Automate Everything.</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Premium Expert Advisors, indicators and trading bots — built by professionals, battle-tested on live and prop-firm accounts.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 glow-primary px-8 h-12">
                <Link to="/marketplace">
                  Browse the Marketplace <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border bg-card/40 backdrop-blur hover:border-primary hover:text-primary px-8 h-12">
                <Link to="/booking">Book a Free Consultation</Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Verified EAs</div>
              <div className="flex items-center gap-2"><MessagesSquare className="h-4 w-4 text-primary" /> 24/7 Support</div>
              <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Secure Payments</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/30">
        <div className="container-tight py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <StatItem key={s.label} value={s.value} label={s.label} suffix={s.suffix} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-24 relative">
        <div className="container-tight">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <Badge variant="outline" className="border-primary/40 text-primary mb-3">Bestsellers</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Featured Tools</h2>
              <p className="mt-2 text-muted-foreground">Hand-picked EAs and indicators our community loves.</p>
            </div>
            <Button asChild variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
              <Link to="/marketplace">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-card/30 border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-50" style={{ background: "var(--gradient-glow)" }} />
        <div className="container-tight">
          <div className="text-center mb-14">
            <Badge variant="outline" className="border-secondary/40 text-secondary mb-3">How it works</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Three steps to better trading</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Search, title: "Browse Tools", desc: "Explore our curated marketplace of EAs, indicators and bots." },
              { icon: Bot, title: "Purchase or Book", desc: "Buy outright, rent monthly, or book a 1-on-1 consultation." },
              { icon: Rocket, title: "Start Trading", desc: "Install in minutes with our setup guides and start trading smarter." },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative rounded-2xl border border-border bg-gradient-card p-8 text-center"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary font-display font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div className="mt-2 mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container-tight">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-primary/40 text-primary mb-3">Testimonials</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Traders, real results</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 6).map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-gradient-card p-6"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">"{t.text}"</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role} · {t.country}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="pb-24">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-card p-10 md:p-14 text-center"
          >
            <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-glow)" }} />
            <TrendingUp className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Can't find what you need?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Tell us your strategy and we'll build a custom Expert Advisor coded to your exact specifications.
            </p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Fixed quote up front</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Source & docs included</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Free revisions</li>
            </ul>
            <Button asChild size="lg" className="mt-8 bg-gradient-primary text-primary-foreground glow-primary px-8 h-12">
              <Link to="/custom-ea">Request a Custom EA <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
