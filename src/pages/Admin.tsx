import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ImagePlus, Pencil, Plus, Trash2, Upload } from "lucide-react";

type Product = {
  id?: string;
  slug: string;
  name: string;
  category: string;
  compatibility: string;
  short_description?: string;
  description?: string;
  buy_price: number;
  rent_price?: number | null;
  image_url?: string | null;
  featured?: boolean;
  active?: boolean;
};

const emptyProduct: Product = {
  slug: "",
  name: "",
  category: "EA",
  compatibility: "MT5",
  short_description: "",
  description: "",
  buy_price: 0,
  rent_price: null,
  image_url: "",
  featured: false,
  active: true,
};

const ProductForm = ({ initial, onDone }: { initial: Product; onDone: () => void }) => {
  const { toast } = useToast();
  const [p, setP] = useState<Product>(initial);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: false });
    setUploading(false);
    if (error) { toast({ title: "Upload failed", description: error.message, variant: "destructive" }); return; }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    setP({ ...p, image_url: data.publicUrl });
    toast({ title: "Image uploaded" });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      slug: p.slug, name: p.name, category: p.category, compatibility: p.compatibility,
      short_description: p.short_description, description: p.description,
      buy_price: Number(p.buy_price), rent_price: p.rent_price ? Number(p.rent_price) : null,
      image_url: p.image_url || null, featured: !!p.featured, active: p.active !== false,
    };
    const { error } = p.id
      ? await supabase.from("products").update(payload).eq("id", p.id)
      : await supabase.from("products").insert(payload);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: p.id ? "Product updated" : "Product created" }); onDone(); }
  };

  return (
    <form onSubmit={save} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div><Label>Slug</Label><Input required value={p.slug} onChange={(e) => setP({ ...p, slug: e.target.value })} className="mt-1 bg-input" /></div>
        <div><Label>Name</Label><Input required value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} className="mt-1 bg-input" /></div>
        <div><Label>Category</Label>
          <select value={p.category} onChange={(e) => setP({ ...p, category: e.target.value })} className="mt-1 w-full h-10 rounded-md border border-border bg-input px-3 text-sm">
            <option>EA</option><option>Indicator</option><option>Bot</option><option>Bundle</option>
          </select>
        </div>
        <div><Label>Compatibility</Label>
          <select value={p.compatibility} onChange={(e) => setP({ ...p, compatibility: e.target.value })} className="mt-1 w-full h-10 rounded-md border border-border bg-input px-3 text-sm">
            <option>MT4</option><option>MT5</option><option>Both</option>
          </select>
        </div>
        <div><Label>Buy Price ($)</Label><Input type="number" step="0.01" required value={p.buy_price} onChange={(e) => setP({ ...p, buy_price: Number(e.target.value) })} className="mt-1 bg-input" /></div>
        <div><Label>Rent Price ($/mo)</Label><Input type="number" step="0.01" value={p.rent_price ?? ""} onChange={(e) => setP({ ...p, rent_price: e.target.value ? Number(e.target.value) : null })} className="mt-1 bg-input" /></div>
      </div>

      <div>
        <Label>Product Image</Label>
        <div className="mt-1.5 flex items-center gap-3">
          {p.image_url ? (
            <img src={p.image_url} alt="" className="h-20 w-32 rounded-lg object-cover border border-border" />
          ) : (
            <div className="h-20 w-32 rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground">
              <ImagePlus className="h-6 w-6" />
            </div>
          )}
          <div className="flex-1 space-y-2">
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
            <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
              <Upload className="h-3.5 w-3.5 mr-1.5" /> {uploading ? "Uploading..." : "Upload Image"}
            </Button>
            <Input placeholder="Or paste image URL" value={p.image_url ?? ""} onChange={(e) => setP({ ...p, image_url: e.target.value })} className="bg-input text-xs" />
          </div>
        </div>
      </div>

      <div><Label>Short description</Label><Input value={p.short_description ?? ""} onChange={(e) => setP({ ...p, short_description: e.target.value })} className="mt-1 bg-input" /></div>
      <div><Label>Description</Label><Textarea rows={4} value={p.description ?? ""} onChange={(e) => setP({ ...p, description: e.target.value })} className="mt-1 bg-input" /></div>

      <div className="flex items-center gap-4 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={!!p.featured} onChange={(e) => setP({ ...p, featured: e.target.checked })} /> Featured</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={p.active !== false} onChange={(e) => setP({ ...p, active: e.target.checked })} /> Active</label>
      </div>

      <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground">{p.id ? "Save changes" : "Create product"}</Button>
    </form>
  );
};

const Admin = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  const refresh = async () => {
    const [p, r, b, m, o, bp, ns] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("ea_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
      supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }),
    ]);
    setProducts(p.data ?? []);
    setRequests(r.data ?? []);
    setBookings(b.data ?? []);
    setMessages(m.data ?? []);
    setOrders(o.data ?? []);
    setPosts(bp.data ?? []);
    setSubs(ns.data ?? []);
  };

  useEffect(() => { refresh(); }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else refresh();
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    refresh();
  };

  const savePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      slug: String(fd.get("slug")),
      title: String(fd.get("title")),
      excerpt: String(fd.get("excerpt") || ""),
      body: String(fd.get("body")),
      cover_url: String(fd.get("cover_url") || "") || null,
      published: fd.get("published") === "on",
    };
    const { error } = editingPost?.id
      ? await supabase.from("blog_posts").update(payload).eq("id", editingPost.id)
      : await supabase.from("blog_posts").insert(payload);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Saved" }); setEditingPost(null); refresh(); }
  };

  const setStatus = async (table: "ea_requests" | "bookings" | "orders", id: string, status: string) => {
    await supabase.from(table).update({ status }).eq("id", id);
    refresh();
  };

  return (
    <section className="py-12">
      <div className="container-tight">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Manage products, requests, bookings and messages.</p>
          </div>
          <Button onClick={() => setEditing(emptyProduct)} className="bg-gradient-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-1.5" /> New Product
          </Button>
        </div>

        <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing?.id ? "Edit Product" : "New Product"}</DialogTitle></DialogHeader>
            {editing && <ProductForm initial={editing} onDone={() => { setEditing(null); refresh(); }} />}
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingPost} onOpenChange={(o) => !o && setEditingPost(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editingPost?.id ? "Edit Post" : "New Post"}</DialogTitle></DialogHeader>
            {editingPost && (
              <form onSubmit={savePost} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div><Label>Slug</Label><Input name="slug" required defaultValue={editingPost.slug} className="mt-1 bg-input" /></div>
                  <div><Label>Title</Label><Input name="title" required defaultValue={editingPost.title} className="mt-1 bg-input" /></div>
                </div>
                <div><Label>Cover image URL</Label><Input name="cover_url" defaultValue={editingPost.cover_url ?? ""} className="mt-1 bg-input" /></div>
                <div><Label>Excerpt</Label><Input name="excerpt" defaultValue={editingPost.excerpt ?? ""} className="mt-1 bg-input" /></div>
                <div><Label>Body (markdown / plain text)</Label><Textarea name="body" required rows={10} defaultValue={editingPost.body ?? ""} className="mt-1 bg-input font-mono text-xs" /></div>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="published" defaultChecked={editingPost.published} /> Published</label>
                <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground">Save post</Button>
              </form>
            )}
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="products">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
            <TabsTrigger value="orders">Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="requests">EA Requests ({requests.length})</TabsTrigger>
            <TabsTrigger value="bookings">Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="messages">Messages ({messages.length})</TabsTrigger>
            <TabsTrigger value="blog">Blog ({posts.length})</TabsTrigger>
            <TabsTrigger value="subs">Subscribers ({subs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6 space-y-3">
            {products.length === 0 && <p className="text-muted-foreground text-sm">No products yet — click "New Product" to add one.</p>}
            {products.map((p) => (
              <div key={p.id} className="flex justify-between items-center gap-3 rounded-xl border border-border bg-gradient-card p-4">
                <div className="flex items-center gap-3 min-w-0">
                  {p.image_url ? (
                    <img src={p.image_url} alt="" className="h-14 w-20 rounded-lg object-cover border border-border" />
                  ) : (
                    <div className="h-14 w-20 rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground"><ImagePlus className="h-4 w-4" /></div>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{p.name} <Badge variant="outline" className="ml-1">{p.category}</Badge>{p.featured && <Badge className="ml-1 bg-primary/20 text-primary border-primary/40">Featured</Badge>}</p>
                    <p className="text-xs text-muted-foreground">${p.buy_price} • {p.compatibility} • /{p.slug}</p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => setEditing(p)} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteProduct(p.id)} aria-label="Delete"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="requests" className="mt-6 space-y-3">
            {requests.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-gradient-card p-4">
                <div className="flex justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{r.full_name} • {r.email}</p>
                    <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{r.strategy}</p>
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

          <TabsContent value="orders" className="mt-6 space-y-3">
            {orders.length === 0 && <p className="text-muted-foreground text-sm">No orders yet.</p>}
            {orders.map((o) => (
              <div key={o.id} className="rounded-xl border border-border bg-gradient-card p-4">
                <div className="flex justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-semibold">{o.product_name} <Badge variant="outline" className="ml-1">{o.plan}</Badge></p>
                    <p className="text-sm text-muted-foreground">{o.full_name} • {o.email} • {o.phone}</p>
                    <p className="text-xs text-muted-foreground mt-1">${Number(o.amount || 0).toFixed(0)} {o.referral_code && `• ref: ${o.referral_code}`} • {new Date(o.created_at).toLocaleString()}</p>
                    {o.notes && <p className="text-xs mt-1 whitespace-pre-wrap">{o.notes}</p>}
                  </div>
                  <select value={o.status} onChange={(e) => setStatus("orders", o.id, e.target.value)} className="h-9 rounded-md border border-border bg-input px-2 text-sm">
                    <option value="pending">pending</option><option value="paid">paid</option><option value="delivered">delivered</option><option value="cancelled">cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="blog" className="mt-6 space-y-3">
            <Button onClick={() => setEditingPost({ slug: "", title: "", body: "", excerpt: "", cover_url: "", published: false })} className="bg-gradient-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-1.5" /> New Post
            </Button>
            {posts.length === 0 && <p className="text-muted-foreground text-sm">No posts yet.</p>}
            {posts.map((p) => (
              <div key={p.id} className="flex justify-between items-center gap-3 rounded-xl border border-border bg-gradient-card p-4">
                <div className="min-w-0">
                  <p className="font-semibold truncate">{p.title} {p.published ? <Badge className="ml-1 bg-primary/20 text-primary border-primary/40">Published</Badge> : <Badge variant="outline" className="ml-1">Draft</Badge>}</p>
                  <p className="text-xs text-muted-foreground">/{p.slug} • {new Date(p.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => setEditingPost(p)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => deletePost(p.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="subs" className="mt-6 space-y-2">
            {subs.length === 0 && <p className="text-muted-foreground text-sm">No subscribers yet.</p>}
            {subs.map((s) => (
              <div key={s.id} className="flex justify-between rounded-lg border border-border bg-card/40 p-3 text-sm">
                <span>{s.email}</span>
                <span className="text-muted-foreground text-xs">{new Date(s.created_at).toLocaleDateString()} • {s.source}</span>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Admin;
