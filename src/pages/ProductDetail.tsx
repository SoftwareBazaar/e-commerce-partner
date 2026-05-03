import { Link, useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Check, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { slug } = useParams();
  const { products, loading } = useProducts();
  const product = products.find((p) => p.slug === slug);
  const { add } = useCart();
  const [mode, setMode] = useState<"buy" | "rent">("buy");

  if (loading) return <div className="container-tight py-32 text-center text-muted-foreground">Loading...</div>;
  if (!product) return <Navigate to="/marketplace" replace />;

  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);
  const price = mode === "rent" ? (product.rentPrice ?? product.buyPrice) : product.buyPrice;

  return (
    <>
      <section className="border-b border-border bg-card/30 py-8">
        <div className="container-tight">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
            <Link to="/marketplace"><ArrowLeft className="h-4 w-4 mr-1" /> Back to marketplace</Link>
          </Button>
        </div>
      </section>

      <section className="py-12">
        <div className="container-tight grid gap-10 lg:grid-cols-2">
          {/* Visual */}
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-gradient-card bg-grid">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="font-display text-7xl font-bold text-foreground/20">
                  {product.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
              </div>
              <Badge className="absolute top-4 left-4 border-primary/40 text-primary bg-primary/5" variant="outline">
                {product.category}
              </Badge>
            </div>
            {product.youtubeId && (
              <div className="aspect-video overflow-hidden rounded-2xl border border-border">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${product.youtubeId}`}
                  title={`${product.name} demo`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline">{product.compatibility}</Badge>
              {product.tags.map((t) => (
                <Badge key={t} variant="secondary" className="bg-muted text-muted-foreground">{t}</Badge>
              ))}
            </div>

            <h1 className="font-display text-4xl font-bold leading-tight">{product.name}</h1>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.round(product.rating) ? "fill-warning text-warning" : "text-muted-foreground")} />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Recommended pairs</p>
                <p>{product.pairs.join(", ")}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Timeframes</p>
                <p>{product.timeframes.join(", ")}</p>
              </div>
            </div>

            {/* Pricing card */}
            <div className="mt-8 rounded-2xl border border-border bg-gradient-card p-6">
              {product.rentPrice && (
                <div className="flex gap-2 mb-4 p-1 rounded-lg bg-muted/40 w-fit">
                  <button
                    onClick={() => setMode("buy")}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                      mode === "buy" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
                    )}
                  >
                    Lifetime
                  </button>
                  <button
                    onClick={() => setMode("rent")}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                      mode === "rent" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
                    )}
                  >
                    Monthly
                  </button>
                </div>
              )}

              <div className="flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold text-gradient">${price}</span>
                <span className="text-muted-foreground">{mode === "rent" ? "/month" : "one-time"}</span>
              </div>

              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Instant download after purchase</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Free updates {mode === "rent" ? "while subscribed" : "for life"}</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Setup guide & priority support</li>
              </ul>

              <div className="mt-6 flex gap-3">
                <Button onClick={() => add(product, mode)} size="lg" className="flex-1 bg-gradient-primary text-primary-foreground">
                  <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                </Button>
                <Button asChild size="lg" variant="outline" className="border-border">
                  <Link to="/contact">Contact</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 border-t border-border bg-card/30">
        <div className="container-tight max-w-3xl">
          <h2 className="font-display text-2xl font-bold mb-6">Frequently asked</h2>
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="install" className="border border-border rounded-lg px-4 bg-card">
              <AccordionTrigger>How do I install this on MT4/MT5?</AccordionTrigger>
              <AccordionContent>You'll receive a download link with a step-by-step PDF guide. Installation takes under 5 minutes.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="brokers" className="border border-border rounded-lg px-4 bg-card">
              <AccordionTrigger>Which brokers does it support?</AccordionTrigger>
              <AccordionContent>Any broker offering MT4 or MT5. We recommend ECN brokers with low spreads for best results.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="refund" className="border border-border rounded-lg px-4 bg-card">
              <AccordionTrigger>What's your refund policy?</AccordionTrigger>
              <AccordionContent>We offer a 7-day refund for monthly rentals if the tool doesn't perform as advertised.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="prop" className="border border-border rounded-lg px-4 bg-card">
              <AccordionTrigger>Is it prop-firm safe?</AccordionTrigger>
              <AccordionContent>Yes — risk parameters are fully configurable so you can match any prop-firm rule set.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16">
          <div className="container-tight">
            <h2 className="font-display text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetail;
