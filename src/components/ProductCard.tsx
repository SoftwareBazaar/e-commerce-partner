import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const categoryColor: Record<string, string> = {
  EA: "border-primary/40 text-primary bg-primary/5",
  Indicator: "border-secondary/40 text-secondary bg-secondary/5",
  Bot: "border-warning/40 text-warning bg-warning/5",
  Bundle: "border-primary-glow/40 text-primary-glow bg-primary/10",
};

export const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { add } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col rounded-2xl border border-border bg-gradient-card p-5 transition-all hover:border-primary/40 hover:shadow-elevated"
    >
      {/* Visual */}
      <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-muted/40 bg-grid">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-display text-5xl font-bold text-foreground/20">
                {product.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
            </div>
          </>
        )}
        {product.youtubeId && (
          <a
            href={`https://youtube.com/watch?v=${product.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur px-3 py-1.5 text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Play className="h-3 w-3" /> Demo
          </a>
        )}
        <Badge className={`absolute top-2 left-2 ${categoryColor[product.category]}`} variant="outline">
          {product.category}
        </Badge>
        <Badge variant="outline" className="absolute top-2 right-2 bg-background/70 backdrop-blur text-[10px]">
          {product.compatibility}
        </Badge>
      </div>

      <Link to={`/marketplace/${product.slug}`} className="group/title">
        <h3 className="font-display text-lg font-semibold leading-tight group-hover/title:text-primary transition-colors">
          {product.name}
        </h3>
      </Link>

      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
        {product.shortDescription}
      </p>

      <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
        <Star className="h-3.5 w-3.5 fill-warning text-warning" />
        <span className="font-medium text-foreground">{product.rating}</span>
        <span>({product.reviews})</span>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-muted-foreground">From</p>
          <p className="font-display text-2xl font-bold text-foreground">
            ${product.rentPrice ?? product.buyPrice}
            <span className="text-xs font-normal text-muted-foreground ml-1">
              {product.rentPrice ? "/mo" : ""}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button asChild variant="outline" className="flex-1 border-border hover:border-primary hover:text-primary">
          <Link to={`/marketplace/${product.slug}`}>View</Link>
        </Button>
        <Button
          onClick={() => add(product, product.rentPrice ? "rent" : "buy")}
          className="flex-1 bg-gradient-primary text-primary-foreground hover:opacity-90"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="h-4 w-4 mr-1.5" /> Add
        </Button>
      </div>
    </motion.div>
  );
};
