import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/data/products";
import { products as seed } from "@/data/products";

const mapRow = (r: any): Product => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  category: r.category,
  compatibility: r.compatibility,
  shortDescription: r.short_description ?? "",
  description: r.description ?? "",
  buyPrice: Number(r.buy_price),
  rentPrice: r.rent_price != null ? Number(r.rent_price) : undefined,
  rating: Number(r.rating ?? 5),
  reviews: r.reviews ?? 0,
  pairs: r.pairs ?? [],
  timeframes: r.timeframes ?? [],
  youtubeId: r.youtube_id ?? undefined,
  featured: !!r.featured,
  tags: r.tags ?? [],
  imageUrl: r.image_url ?? undefined,
});

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(seed);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("products").select("*").eq("active", true).then(({ data }) => {
      if (data && data.length) setProducts(data.map(mapRow));
      setLoading(false);
    });
  }, []);
  return { products, loading };
};
