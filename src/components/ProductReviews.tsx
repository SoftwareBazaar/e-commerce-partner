import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export const ProductReviews = ({ productId }: { productId: string }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("reviews").select("*").eq("product_id", productId).order("created_at", { ascending: false });
    setReviews(data ?? []);
  };
  useEffect(() => { load(); }, [productId]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.from("reviews").insert({
      product_id: productId, user_id: user.id, rating,
      title: String(fd.get("title") || ""), body: String(fd.get("body") || ""),
    });
    setBusy(false);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Review posted" }); (e.target as HTMLFormElement).reset(); load(); }
  };

  return (
    <section className="py-12 border-t border-border">
      <div className="container-tight max-w-3xl">
        <h2 className="font-display text-2xl font-bold mb-6">Customer Reviews ({reviews.length})</h2>

        {user ? (
          <form onSubmit={submit} className="rounded-2xl border border-border bg-gradient-card p-5 space-y-3 mb-8">
            <div>
              <Label>Your rating</Label>
              <div className="flex gap-1 mt-1.5">
                {[1,2,3,4,5].map((n) => (
                  <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                    <Star className={cn("h-6 w-6", n <= rating ? "fill-warning text-warning" : "text-muted-foreground")} />
                  </button>
                ))}
              </div>
            </div>
            <div><Label>Title</Label><Input name="title" maxLength={100} className="mt-1.5 bg-input" /></div>
            <div><Label>Your review</Label><Textarea name="body" rows={3} maxLength={1000} required className="mt-1.5 bg-input" /></div>
            <Button type="submit" disabled={busy} className="bg-gradient-primary text-primary-foreground">{busy ? "Posting…" : "Post review"}</Button>
          </form>
        ) : (
          <p className="text-sm text-muted-foreground mb-8">
            <Link to="/auth" className="text-primary">Sign in</Link> to leave a review.
          </p>
        )}

        <div className="space-y-3">
          {reviews.length === 0 && <p className="text-muted-foreground text-sm">No reviews yet — be the first.</p>}
          {reviews.map((r) => (
            <div key={r.id} className="rounded-xl border border-border bg-card/50 p-4">
              <div className="flex gap-1 mb-1">
                {Array.from({length:5}).map((_,i) => <Star key={i} className={cn("h-3.5 w-3.5", i < r.rating ? "fill-warning text-warning" : "text-muted-foreground")} />)}
              </div>
              {r.title && <p className="font-semibold">{r.title}</p>}
              <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{r.body}</p>
              <p className="text-xs text-muted-foreground mt-2">{new Date(r.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
