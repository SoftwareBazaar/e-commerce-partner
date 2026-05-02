import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products, type ProductCategory, type Compatibility } from "@/data/products";
import { cn } from "@/lib/utils";

const categories: ("All" | ProductCategory)[] = ["All", "EA", "Indicator", "Bot", "Bundle"];
const compats: ("All" | Compatibility)[] = ["All", "MT4", "MT5", "Both"];

const Marketplace = () => {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [compat, setCompat] = useState<(typeof compats)[number]>("All");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const filtered = useMemo(() => {
    let list = products.filter((p) => (cat === "All" || p.category === cat));
    if (compat !== "All") {
      list = list.filter((p) => p.compatibility === compat || p.compatibility === "Both");
    }
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.buyPrice - b.buyPrice); break;
      case "price-desc": list = [...list].sort((a, b) => b.buyPrice - a.buyPrice); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      default: list = [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return list;
  }, [cat, compat, sort]);

  return (
    <>
      <section className="border-b border-border bg-card/30 py-14">
        <div className="container-tight text-center">
          <Badge variant="outline" className="border-primary/40 text-primary mb-3">Marketplace</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Tools that move the needle</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Browse our full catalogue of Expert Advisors, indicators, bots and bundles.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-tight">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Button
                  key={c}
                  variant={cat === c ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCat(c)}
                  className={cn(
                    cat === c
                      ? "bg-gradient-primary text-primary-foreground border-transparent"
                      : "border-border hover:border-primary hover:text-primary",
                  )}
                >
                  {c}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground mr-1">Platform:</span>
              {compats.map((c) => (
                <Button
                  key={c}
                  size="sm"
                  variant={compat === c ? "secondary" : "ghost"}
                  onClick={() => setCompat(c)}
                  className="h-8"
                >
                  {c}
                </Button>
              ))}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="ml-2 h-8 rounded-md border border-border bg-input px-2 text-xs"
              >
                <option value="featured">Featured</option>
                <option value="rating">Top rated</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No products match these filters.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Marketplace;
