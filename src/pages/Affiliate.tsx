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

  if (!user) return (
    <section className="py-32 text-center">
      <p className="text-muted-foreground">Please <Link to="/auth" className="text-primary">sign in</Link> to access the affiliate program.</p>
    </section>
  );

  return (
    <section className="py-12">
      <div className="container-tight max-w-3xl">
        <Badge variant="outline" className="border-primary/40 text-primary mb-3"><Users className="h-3 w-3 mr-1" /> Affiliate program</Badge>
        <h1 className="font-display text-4xl font-bold">Earn with NeuroAlgo</h1>
        <p className="text-muted-foreground mt-2">Share your code, earn commission on every purchase made through your link.</p>

        <div className="mt-8 rounded-2xl border border-border bg-gradient-card p-8 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground mb-6">Our affiliate program is launching soon. Be the first to know when it's available!</p>
          <p className="text-sm text-muted-foreground">We're building an amazing affiliate experience for our partners. Check back soon.</p>
        </div>
      </div>
    </section>
  );
};
export default Affiliate;
