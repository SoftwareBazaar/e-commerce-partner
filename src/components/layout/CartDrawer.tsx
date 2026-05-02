import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

export const CartDrawer = () => {
  const { items, open, setOpen, remove, total, clear } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md bg-card border-border flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" /> Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty.</p>
              <Button asChild variant="link" className="text-primary mt-2">
                <Link to="/marketplace" onClick={() => setOpen(false)}>Browse the marketplace</Link>
              </Button>
            </div>
          ) : (
            items.map((i) => (
              <div key={`${i.slug}-${i.mode}`} className="flex items-start gap-3 rounded-lg border border-border bg-background/40 p-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="border-primary/40 text-primary text-[10px]">
                      {i.category}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">
                      {i.mode === "buy" ? "Lifetime" : "Monthly"}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium leading-tight truncate">{i.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">Qty: {i.qty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">${(i.price * i.qty).toFixed(0)}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => remove(i.slug, i.mode)}
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-border pt-4 flex-col gap-3 sm:flex-col">
            <div className="flex items-center justify-between w-full">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-xl font-bold">${total.toFixed(0)}</span>
            </div>
            <Button asChild className="w-full bg-gradient-primary text-primary-foreground" size="lg">
              <Link to="/contact" onClick={() => setOpen(false)}>Contact to Purchase</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={clear} className="w-full text-muted-foreground">
              Clear cart
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
