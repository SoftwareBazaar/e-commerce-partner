import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  mode: "buy" | "rent";
  category: string;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  add: (p: Product, mode: "buy" | "rent") => void;
  remove: (slug: string, mode: "buy" | "rent") => void;
  clear: () => void;
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "tt_cart_v1";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {/* ignore */}
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((p: Product, mode: "buy" | "rent") => {
    const price = mode === "rent" ? (p.rentPrice ?? p.buyPrice) : p.buyPrice;
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === p.slug && i.mode === mode);
      if (existing) {
        return prev.map((i) =>
          i.slug === p.slug && i.mode === mode ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { slug: p.slug, name: p.name, price, mode, category: p.category, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((slug: string, mode: "buy" | "rent") => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.mode === mode)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartCtx>(() => ({
    items,
    add,
    remove,
    clear,
    open,
    setOpen,
    count: items.reduce((s, i) => s + (i.qty || 0), 0),
    total: items.reduce((s, i) => s + (i.qty || 0) * (i.price || 0), 0),
  }), [items, add, remove, clear, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useCart = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
