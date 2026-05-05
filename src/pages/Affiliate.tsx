import { useEffect, useState } from "react";
import { Copy, Link2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Affiliate = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [aff, setAff] = useState<any | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("affiliates").select("*").eq("user_id", user.id).maybeSingle().then(({ data }) => setAff(data));
  }, [user]);

  useEffect(() => {
    if (!aff) return;
    supabase.from("orders").select("*").eq("referral_code", aff.code).order("created_at", { ascending: false })
      .then(({ data }) => setOrders(data ?? []));
  }, [aff]);

  const enroll = async () => {
    if (!user) return;
    setBusy(true);
    const code = (user.email?.split("@")[0] || "ref").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 10) + Math.random().toString(36).slice(2, 6);
    const { data, error } = await supabase.from("affiliates").insert({ user_id: user.id, code }).select().maybeSingle();
    setBusy(false);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else setAff(data);
  };

  if (!user) return (
    <section className="py-32 text-center">
      <p className="text-muted-foreground">Please <Link to="/auth" className="text-primary">sign in</Link> to access the affiliate program.</p>
    </section>
  );

  const link = aff ? `${window.location.origin}/?ref=${aff.code}` : "";
  const earned = orders.reduce((s, o) => s + Number(o.amount || 0), 0) * (aff?.commission_pct ?? 15) / 100;

  return (
    <section className="py-12">
      <div className="container-tight max-w-3xl">
        <Badge variant="outline" className="border-primary/40 text-primary mb-3"><Users className="h-3 w-3 mr-1" /> Affiliate program</Badge>
        <h1 className="font-display text-4xl font-bold">Earn with NeuroAlgo</h1>
        <p className="text-muted-foreground mt-2">Share your code, earn commission on every purchase made through your link.</p>

        {!aff ? (
          <div className="mt-8 rounded-2xl border border-border bg-gradient-card p-8 text-center">
            <p className="text-muted-foreground mb-4">Join our affiliate program and start earning today.</p>
            <Button onClick={enroll} disabled={busy} size="lg" className="bg-gradient-primary text-primary-foreground">
              {busy ? "Creating…" : "Enroll now"}
            </Button>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-gradient-card p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Commission</p>
                <p className="font-display text-3xl font-bold mt-1">{aff.commission_pct}%</p>
              </div>
              <div className="rounded-xl border border-border bg-gradient-card p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Referred orders</p>
                <p className="font-display text-3xl font-bold mt-1">{orders.length}</p>
              </div>
              <div className="rounded-xl border border-border bg-gradient-card p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Estimated earnings</p>
                <p className="font-display text-3xl font-bold text-gradient mt-1">${earned.toFixed(0)}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-gradient-card p-6">
              <p className="text-sm font-semibold mb-2 flex items-center gap-2"><Link2 className="h-4 w-4 text-primary" /> Your referral link</p>
              <div className="flex gap-2">
                <Input readOnly value={link} className="bg-input font-mono text-xs" />
                <Button onClick={() => { navigator.clipboard.writeText(link); toast({ title: "Copied!" }); }} variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Code: <span className="text-primary font-mono">{aff.code}</span></p>
            </div>

            {orders.length > 0 && (
              <div>
                <h2 className="font-display text-lg font-bold mb-3">Recent referred orders</h2>
                <div className="space-y-2">
                  {orders.map((o) => (
                    <div key={o.id} className="flex justify-between rounded-lg border border-border bg-card/40 p-3 text-sm">
                      <div>
                        <p className="font-medium">{o.product_name}</p>
                        <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${Number(o.amount).toFixed(0)}</p>
                        <Badge variant="outline" className="text-[10px]">{o.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
export default Affiliate;
