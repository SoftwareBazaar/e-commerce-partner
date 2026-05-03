import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const Admin = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const refresh = async () => {
    const [p, r, b, m] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("ea_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    setProducts(p.data ?? []);
    setRequests(r.data ?? []);
    setBookings(b.data ?? []);
    setMessages(m.data ?? []);
  };

  useEffect(() => { refresh(); }, []);

  const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.from("products").insert({
      slug: String(fd.get("slug")),
      name: String(fd.get("name")),
      category: String(fd.get("category")),
      compatibility: String(fd.get("compatibility")),
      short_description: String(fd.get("short_description")),
      description: String(fd.get("description")),
      buy_price: Number(fd.get("buy_price")),
      rent_price: fd.get("rent_price") ? Number(fd.get("rent_price")) : null,
      featured: fd.get("featured") === "on",
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Product added" }); setOpen(false); refresh(); }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) refresh();
  };

  const setStatus = async (table: "ea_requests" | "bookings", id: string, status: string) => {
    await supabase.from(table).update({ status }).eq("id", id);
    refresh();
  };

  return (
    <section className="py-12">
      <div className="container-tight">
        <h1 className="font-display text-3xl font-bold mb-8">Admin Panel</h1>
        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
            <TabsTrigger value="requests">EA Requests ({requests.length})</TabsTrigger>
            <TabsTrigger value="bookings">Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="messages">Messages ({messages.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6 space-y-3">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button className="bg-gradient-primary text-primary-foreground"><Plus className="h-4 w-4" /> New Product</Button></DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader><DialogTitle>New Product</DialogTitle></DialogHeader>
                <form onSubmit={addProduct} className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div><Label>Slug</Label><Input name="slug" required className="mt-1 bg-input" /></div>
                    <div><Label>Name</Label><Input name="name" required className="mt-1 bg-input" /></div>
                    <div><Label>Category</Label>
                      <select name="category" required className="mt-1 w-full h-10 rounded-md border border-border bg-input px-3 text-sm">
                        <option>EA</option><option>Indicator</option><option>Bot</option><option>Bundle</option>
                      </select>
                    </div>
                    <div><Label>Compatibility</Label>
                      <select name="compatibility" required className="mt-1 w-full h-10 rounded-md border border-border bg-input px-3 text-sm">
                        <option>MT4</option><option>MT5</option><option>Both</option>
                      </select>
                    </div>
                    <div><Label>Buy Price</Label><Input name="buy_price" type="number" step="0.01" required className="mt-1 bg-input" /></div>
                    <div><Label>Rent Price</Label><Input name="rent_price" type="number" step="0.01" className="mt-1 bg-input" /></div>
                  </div>
                  <div><Label>Short description</Label><Input name="short_description" className="mt-1 bg-input" /></div>
                  <div><Label>Description</Label><Textarea name="description" rows={4} className="mt-1 bg-input" /></div>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" /> Featured</label>
                  <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground">Create</Button>
                </form>
              </DialogContent>
            </Dialog>
            {products.map((p) => (
              <div key={p.id} className="flex justify-between items-center rounded-xl border border-border bg-gradient-card p-4">
                <div>
                  <p className="font-semibold">{p.name} <Badge variant="outline" className="ml-2">{p.category}</Badge></p>
                  <p className="text-xs text-muted-foreground">${p.buy_price} • {p.compatibility}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteProduct(p.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="requests" className="mt-6 space-y-3">
            {requests.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-gradient-card p-4">
                <div className="flex justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{r.full_name} • {r.email}</p>
                    <p className="text-sm text-muted-foreground mt-1">{r.strategy}</p>
                    <p className="text-xs text-muted-foreground mt-2">Budget: {r.budget} • {new Date(r.created_at).toLocaleString()}</p>
                  </div>
                  <select value={r.status} onChange={(e) => setStatus("ea_requests", r.id, e.target.value)} className="h-9 rounded-md border border-border bg-input px-2 text-sm">
                    <option value="new">new</option><option value="in_progress">in_progress</option><option value="quoted">quoted</option><option value="done">done</option>
                  </select>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="bookings" className="mt-6 space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="rounded-xl border border-border bg-gradient-card p-4">
                <div className="flex justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-semibold">{b.full_name} — {b.package_slug}</p>
                    <p className="text-sm text-muted-foreground">{b.email} • {b.phone}</p>
                    <p className="text-xs text-muted-foreground mt-1">{b.preferred_date} {b.preferred_time}</p>
                  </div>
                  <select value={b.status} onChange={(e) => setStatus("bookings", b.id, e.target.value)} className="h-9 rounded-md border border-border bg-input px-2 text-sm">
                    <option value="pending">pending</option><option value="confirmed">confirmed</option><option value="completed">completed</option><option value="cancelled">cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="messages" className="mt-6 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className="rounded-xl border border-border bg-gradient-card p-4">
                <p className="font-semibold">{m.full_name} • {m.email}</p>
                {m.subject && <p className="text-sm">{m.subject}</p>}
                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{m.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{new Date(m.created_at).toLocaleString()}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Admin;
