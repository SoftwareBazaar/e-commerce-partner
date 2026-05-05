import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const ref = typeof window !== "undefined" ? localStorage.getItem("ref_code") : null;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const rows = items.map((i) => ({
      user_id: user?.id ?? null,
      full_name: String(fd.get("name")),
      email: String(fd.get("email")),
      phone: String(fd.get("phone") || ""),
      product_name: i.name,
      plan: i.mode,
      amount: i.price * i.qty,
      notes: String(fd.get("notes") || ""),
      referral_code: ref || null,
    }));
    const { error } = await supabase.from("orders").insert(rows);
    setBusy(false);
    if (error) {
      toast({ title: "Could not place order", description: error.message, variant: "destructive" });
      return;
    }
    clear();
    setDone(true);
    toast({ title: "Order received", description: "We'll contact you shortly with payment & delivery details." });
  };

  if (done) {
    return (
      <section className="py-32">
        <div className="container-tight max-w-xl text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold">Order received</h1>
          <p className="mt-3 text-muted-foreground">
            Our team will reach out via email/WhatsApp with payment instructions and your download link.
          </p>
          <div className="mt-8 flex gap-2 justify-center">
            <Button onClick={() => navigate("/marketplace")} variant="outline">Keep browsing</Button>
            {user && <Button onClick={() => navigate("/dashboard")} className="bg-gradient-primary text-primary-foreground">View orders</Button>}
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="py-32">
        <div className="container-tight max-w-md text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button asChild className="mt-6 bg-gradient-primary text-primary-foreground">
            <Link to="/marketplace">Browse marketplace</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container-tight grid gap-8 lg:grid-cols-[1fr_360px] max-w-5xl">
        <form onSubmit={submit} className="space-y-5 rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
          <h1 className="font-display text-3xl font-bold">Checkout</h1>
          <p className="text-sm text-muted-foreground">Submit your order — we'll send payment & delivery instructions.</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>Full name *</Label><Input name="name" required defaultValue={user?.email?.split("@")[0]} className="mt-1.5 bg-input" /></div>
            <div><Label>Email *</Label><Input name="email" type="email" required defaultValue={user?.email ?? ""} className="mt-1.5 bg-input" /></div>
            <div className="sm:col-span-2"><Label>WhatsApp / Phone</Label><Input name="phone" className="mt-1.5 bg-input" /></div>
          </div>
          <div><Label>Notes</Label><Textarea name="notes" rows={3} placeholder="Broker, account size, anything else…" className="mt-1.5 bg-input" /></div>
          {ref && <p className="text-xs text-primary">Referral code applied: {ref}</p>}
          <Button type="submit" disabled={busy} size="lg" className="w-full bg-gradient-primary text-primary-foreground">
            {busy ? "Placing order…" : `Place order — $${total.toFixed(0)}`}
          </Button>
        </form>

        <aside className="rounded-2xl border border-border bg-gradient-card p-6 h-fit space-y-3">
          <h2 className="font-display text-lg font-bold">Order summary</h2>
          {items.map((i) => (
            <div key={`${i.slug}-${i.mode}`} className="flex justify-between text-sm border-b border-border/50 pb-2">
              <div>
                <p className="font-medium">{i.name}</p>
                <p className="text-xs text-muted-foreground">{i.mode === "buy" ? "Lifetime" : "Monthly"} × {i.qty}</p>
              </div>
              <p className="font-semibold">${(i.price * i.qty).toFixed(0)}</p>
            </div>
          ))}
          <div className="flex justify-between pt-2 font-bold">
            <span>Total</span><span className="text-gradient text-xl">${total.toFixed(0)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Checkout;
